import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CustomImageConfig } from '../types';
import {
  getAllImagesFromIndexedDb,
  saveImageToIndexedDb,
  deleteImageFromIndexedDb,
  clearAllImagesFromIndexedDb
} from '../utils/imageDb';
import { compressImageFile, optimizeDataUrl } from '../utils/imageCompressor';

interface ImageStoreContextType {
  isOwnerMode: boolean;
  setOwnerMode: (enabled: boolean) => void;
  toggleOwnerMode: () => void;
  lockOwnerMode: () => void;
  verifyAndUnlockOwnerMode: (password: string) => boolean;
  changeOwnerPassword: (newPassword: string) => void;
  isAdminAuthModalOpen: boolean;
  openAdminAuthModal: () => void;
  closeAdminAuthModal: () => void;
  isLockedForDeploy: boolean;
  setIsLockedForDeploy: (locked: boolean) => void;
  images: Record<string, CustomImageConfig>;
  isStorageReady: boolean;
  getImageConfig: (id: string, defaultUrl: string) => CustomImageConfig;
  updateImageConfig: (id: string, config: Partial<CustomImageConfig> & { url?: string }) => Promise<void>;
  compressAndSetImage: (id: string, file: File, currentZoom?: number, currentOffsetX?: number, currentOffsetY?: number) => Promise<CustomImageConfig>;
  resetImageConfig: (id: string) => Promise<void>;
  resetAllImages: () => Promise<void>;
  exportConfigJson: () => string;
  importConfigJson: (json: string) => Promise<boolean>;
  activeEditingImageId: string | null;
  openImageEditor: (id: string, defaultUrl: string, label?: string) => void;
  closeImageEditor: () => void;
  editorModalState: {
    isOpen: boolean;
    id: string;
    defaultUrl: string;
    label: string;
  } | null;
}

const STORAGE_KEY_IMAGES = 'faliq_portfolio_custom_images_v2';
const STORAGE_KEY_SESSION_AUTH = 'faliq_portfolio_admin_auth_session';
const STORAGE_KEY_ADMIN_PASSWORD = 'faliq_portfolio_admin_password';
const DEFAULT_PASSWORD = 'faliq2026';
const DEFAULT_PHOTO_CONFIG_URL = `${import.meta.env.BASE_URL}portfolio-photos-config.json`;

const normalizeConfigUrls = (config: Record<string, CustomImageConfig>): Record<string, CustomImageConfig> => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return Object.fromEntries(
    Object.entries(config).map(([key, value]) => {
      const url = typeof value?.url === 'string' ? value.url : '';
      const isAbsolute = /^(?:data:|blob:|https?:\/\/|\/)/i.test(url);
      const normalizedUrl = url && !isAbsolute
        ? `${baseUrl}${url.replace(/^\.\//, '')}`
        : url;

      return [key, { ...value, url: normalizedUrl }];
    })
  );
};

const ImageStoreContext = createContext<ImageStoreContextType | undefined>(undefined);

export const ImageStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isStorageReady, setIsStorageReady] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  // Owner Edit Mode: strictly locked (false) by default for public visitors
  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      const sessionAuth = sessionStorage.getItem(STORAGE_KEY_SESSION_AUTH);
      return sessionAuth === 'true';
    } catch {
      return false;
    }
  });

  const [isLockedForDeploy, setIsLockedForDeploy] = useState<boolean>(() => !isOwnerMode);

  // Deployed JSON is the canonical photo baseline for every visitor.
  // Browser storage is only used for owner-side draft edits.
  const [defaultImages, setDefaultImages] = useState<Record<string, CustomImageConfig>>({});
  const [images, setImages] = useState<Record<string, CustomImageConfig>>({});

  const [editorModalState, setEditorModalState] = useState<{
    isOpen: boolean;
    id: string;
    defaultUrl: string;
    label: string;
  } | null>(null);

  // 1. Load the deployed JSON first. It is the permanent, shared baseline.
  // If this tab is already in owner mode, browser-only draft edits are layered on top.
  useEffect(() => {
    let isMounted = true;

    const initializeImages = async () => {
      let bundledImages: Record<string, CustomImageConfig> = {};

      try {
        const response = await fetch(DEFAULT_PHOTO_CONFIG_URL, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Photo config request failed with ${response.status}`);
        }
        bundledImages = normalizeConfigUrls(await response.json());
      } catch (err) {
        console.warn('Could not load deployed photo configuration:', err);
      }

      let nextImages = { ...bundledImages };

      // Owner drafts remain local and never replace the deployed JSON for public visitors.
      if (isOwnerMode) {
        try {
          const saved = localStorage.getItem(STORAGE_KEY_IMAGES)
            || localStorage.getItem('faliq_portfolio_custom_images_v1');
          if (saved) {
            nextImages = { ...nextImages, ...normalizeConfigUrls(JSON.parse(saved)) };
          }
        } catch (err) {
          console.warn('Could not load owner photo drafts from localStorage:', err);
        }

        try {
          const idbImages = await getAllImagesFromIndexedDb();
          if (idbImages && Object.keys(idbImages).length > 0) {
            nextImages = { ...nextImages, ...normalizeConfigUrls(idbImages) };
          }
        } catch (err) {
          console.warn('Could not load owner photo drafts from IndexedDB:', err);
        }
      }

      if (isMounted) {
        setDefaultImages(bundledImages);
        setImages(nextImages);
        setIsStorageReady(true);
      }
    };

    initializeImages();

    return () => {
      isMounted = false;
    };
    // Only initialize once. Owner-mode changes should not discard current draft edits.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save lock & session states
  useEffect(() => {
    try {
      if (isOwnerMode) {
        sessionStorage.setItem(STORAGE_KEY_SESSION_AUTH, 'true');
      } else {
        sessionStorage.removeItem(STORAGE_KEY_SESSION_AUTH);
      }
    } catch {
      // ignore
    }
  }, [isOwnerMode]);

  // Secret shortcut: Ctrl + Shift + E or Cmd + Shift + E, or URL ?admin=true
  useEffect(() => {
    // 1. Check URL parameters on mount
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || urlParams.get('owner') === 'true' || urlParams.get('edit') === 'true') {
        setIsAdminAuthModalOpen(true);
      }
    } catch {
      // ignore
    }

    // 2. Keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        if (isOwnerMode) {
          // If already unlocked, toggle or notify
          setIsOwnerMode(false);
        } else {
          setIsAdminAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOwnerMode]);

  const verifyAndUnlockOwnerMode = (password: string): boolean => {
    try {
      const storedPass = localStorage.getItem(STORAGE_KEY_ADMIN_PASSWORD) || DEFAULT_PASSWORD;
      if (password === storedPass) {
        setIsOwnerMode(true);
        setIsLockedForDeploy(false);
        try {
          sessionStorage.setItem(STORAGE_KEY_SESSION_AUTH, 'true');
        } catch {
          // ignore
        }
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  };

  const changeOwnerPassword = (newPassword: string) => {
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_PASSWORD, newPassword);
    } catch {
      // ignore
    }
  };

  const lockOwnerMode = () => {
    setIsOwnerMode(false);
    setIsLockedForDeploy(true);
    try {
      sessionStorage.removeItem(STORAGE_KEY_SESSION_AUTH);
    } catch {
      // ignore
    }
  };

  const toggleOwnerMode = () => {
    if (isOwnerMode) {
      lockOwnerMode();
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const openAdminAuthModal = () => setIsAdminAuthModalOpen(true);
  const closeAdminAuthModal = () => setIsAdminAuthModalOpen(false);

  const getImageConfig = useCallback((id: string, defaultUrl: string): CustomImageConfig => {
    // 1. Direct ID lookup
    const existing = images[id];
    if (existing && existing.url) {
      return {
        url: existing.url,
        zoom: existing.zoom ?? 1.0,
        offsetX: existing.offsetX ?? 0,
        offsetY: existing.offsetY ?? 0,
        customName: existing.customName,
        updatedAt: existing.updatedAt
      };
    }

    // 2. Synchronized lookup by defaultUrl fallback (if this source image was changed anywhere else)
    if (defaultUrl) {
      const urlKey = `url_${defaultUrl}`;
      const urlConfig = images[urlKey];
      if (urlConfig && urlConfig.url) {
        return {
          url: urlConfig.url,
          zoom: urlConfig.zoom ?? 1.0,
          offsetX: urlConfig.offsetX ?? 0,
          offsetY: urlConfig.offsetY ?? 0,
          customName: urlConfig.customName,
          updatedAt: urlConfig.updatedAt
        };
      }
    }

    return {
      url: defaultUrl,
      zoom: 1.0,
      offsetX: 0,
      offsetY: 0
    };
  }, [images]);

  const updateImageConfig = async (id: string, config: Partial<CustomImageConfig> & { url?: string }) => {
    let finalUrl = config.url;

    // If a large base64 url is provided without pre-compression, optimize it
    if (finalUrl && finalUrl.startsWith('data:image/') && finalUrl.length > 300000) {
      try {
        finalUrl = await optimizeDataUrl(finalUrl, { maxWidth: 1600, maxHeight: 1600, quality: 0.88 });
      } catch (err) {
        console.warn('Could not optimize data URL:', err);
      }
    }

    // Check if currently editing modal knows the defaultUrl for global synchronization
    const activeDefaultUrl = editorModalState?.id === id ? editorModalState.defaultUrl : null;
    const urlKey = activeDefaultUrl ? `url_${activeDefaultUrl}` : null;

    setImages((prev) => {
      const current = prev[id] || (urlKey && prev[urlKey]) || {
        url: finalUrl || '',
        zoom: 1.0,
        offsetX: 0,
        offsetY: 0
      };

      const updated: CustomImageConfig = {
        url: finalUrl !== undefined ? finalUrl : current.url,
        zoom: config.zoom !== undefined ? config.zoom : current.zoom,
        offsetX: config.offsetX !== undefined ? config.offsetX : current.offsetX,
        offsetY: config.offsetY !== undefined ? config.offsetY : current.offsetY,
        customName: config.customName ?? current.customName,
        updatedAt: new Date().toISOString()
      };

      const nextImages = {
        ...prev,
        [id]: updated,
        ...(urlKey ? { [urlKey]: updated } : {})
      };

      // Save to IndexedDB asynchronously (reliable, never quotas)
      saveImageToIndexedDb(id, updated).catch((e) => console.warn('IDB Save error:', e));
      if (urlKey) {
        saveImageToIndexedDb(urlKey, updated).catch((e) => console.warn('IDB Save error for URL key:', e));
      }

      // Attempt to save to LocalStorage for instant bootstrap
      try {
        localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(nextImages));
      } catch {
        // Quota exceeded in localStorage is fine because IndexedDB already stored it!
      }

      return nextImages;
    });
  };

  /**
   * Helper that compresses an uploaded file on-the-fly, updates memory and IndexedDB
   */
  const compressAndSetImage = async (
    id: string,
    file: File,
    currentZoom: number = 1.0,
    currentOffsetX: number = 0,
    currentOffsetY: number = 0
  ): Promise<CustomImageConfig> => {
    const compressed = await compressImageFile(file, {
      maxWidth: 1600,
      maxHeight: 1600,
      quality: 0.88,
      format: 'image/jpeg'
    });

    const activeDefaultUrl = editorModalState?.id === id ? editorModalState.defaultUrl : null;
    const urlKey = activeDefaultUrl ? `url_${activeDefaultUrl}` : null;

    const newConfig: CustomImageConfig = {
      url: compressed.dataUrl,
      zoom: currentZoom,
      offsetX: currentOffsetX,
      offsetY: currentOffsetY,
      customName: file.name,
      updatedAt: new Date().toISOString()
    };

    setImages((prev) => {
      const nextImages = {
        ...prev,
        [id]: newConfig,
        ...(urlKey ? { [urlKey]: newConfig } : {})
      };

      // Durable save in IndexedDB
      saveImageToIndexedDb(id, newConfig).catch((e) => console.warn('IDB Save error:', e));
      if (urlKey) {
        saveImageToIndexedDb(urlKey, newConfig).catch((e) => console.warn('IDB Save error for URL key:', e));
      }

      // Try LocalStorage
      try {
        localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(nextImages));
      } catch {
        // ignore
      }

      return nextImages;
    });

    return newConfig;
  };

  const resetImageConfig = async (id: string) => {
    const activeDefaultUrl = editorModalState?.id === id ? editorModalState.defaultUrl : null;
    const urlKey = activeDefaultUrl ? `url_${activeDefaultUrl}` : null;

    setImages((prev) => {
      const copy = { ...prev };

      if (defaultImages[id]) {
        copy[id] = defaultImages[id];
      } else {
        delete copy[id];
      }

      if (urlKey) {
        if (defaultImages[urlKey]) {
          copy[urlKey] = defaultImages[urlKey];
        } else {
          delete copy[urlKey];
        }
      }

      // Remove owner draft overrides from IndexedDB. The deployed JSON remains intact.
      deleteImageFromIndexedDb(id).catch((e) => console.warn('IDB Delete error:', e));
      if (urlKey) {
        deleteImageFromIndexedDb(urlKey).catch((e) => console.warn('IDB Delete error:', e));
      }

      try {
        localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(copy));
      } catch {
        // ignore
      }

      return copy;
    });
  };

  const resetAllImages = async () => {
    setImages(defaultImages);
    await clearAllImagesFromIndexedDb();
    try {
      localStorage.removeItem(STORAGE_KEY_IMAGES);
      localStorage.removeItem('faliq_portfolio_custom_images_v1');
      localStorage.removeItem('faliq_portfolio_avatar_img');
      localStorage.removeItem('faliq_portfolio_avatar_config');
    } catch {
      // ignore
    }
  };

  const exportConfigJson = (): string => {
    return JSON.stringify(images, null, 2);
  };

  const importConfigJson = async (json: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(json);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        const normalized = normalizeConfigUrls(parsed as Record<string, CustomImageConfig>);
        setImages(normalized);
        // Imported JSON is an owner-side draft until it is committed to the repository and redeployed.
        for (const key of Object.keys(normalized)) {
          if (normalized[key] && typeof normalized[key] === 'object') {
            await saveImageToIndexedDb(key, normalized[key]);
          }
        }
        try {
          localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(normalized));
        } catch {
          // ignore
        }
        return true;
      }
    } catch {
      // invalid JSON
    }
    return false;
  };

  const openImageEditor = (id: string, defaultUrl: string, label: string = 'Foto') => {
    setEditorModalState({
      isOpen: true,
      id,
      defaultUrl,
      label
    });
  };

  const closeImageEditor = () => {
    setEditorModalState(null);
  };

  return (
    <ImageStoreContext.Provider
      value={{
        isOwnerMode,
        setOwnerMode: setIsOwnerMode,
        toggleOwnerMode,
        lockOwnerMode,
        verifyAndUnlockOwnerMode,
        changeOwnerPassword,
        isAdminAuthModalOpen,
        openAdminAuthModal,
        closeAdminAuthModal,
        isLockedForDeploy,
        setIsLockedForDeploy,
        images,
        isStorageReady,
        getImageConfig,
        updateImageConfig,
        compressAndSetImage,
        resetImageConfig,
        resetAllImages,
        exportConfigJson,
        importConfigJson,
        activeEditingImageId: editorModalState?.id || null,
        openImageEditor,
        closeImageEditor,
        editorModalState
      }}
    >
      {children}
    </ImageStoreContext.Provider>
  );
};

export const useImageStore = () => {
  const context = useContext(ImageStoreContext);
  if (!context) {
    throw new Error('useImageStore must be used within an ImageStoreProvider');
  }
  return context;
};
