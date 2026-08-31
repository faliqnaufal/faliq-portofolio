import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SpeakingSection } from './components/SpeakingSection';
import { PublicationSection } from './components/PublicationSection';
import { AchievementsSection } from './components/AchievementsSection';
import { SkillsToolsSection } from './components/SkillsToolsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectGalleryModal, GalleryModalData } from './components/ProjectGalleryModal';
import { UniversalImageEditorModal } from './components/UniversalImageEditorModal';
import { OwnerToolbar } from './components/OwnerToolbar';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ImageStoreProvider, useImageStore } from './context/ImageStoreContext';
import { ProjectDetail } from './types';

function PortfolioApp() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [activeGalleryData, setActiveGalleryData] = useState<GalleryModalData | null>(null);
  const { isAdminAuthModalOpen, closeAdminAuthModal, isStorageReady } = useImageStore();

  if (!isStorageReady) {
    return <div className="min-h-screen bg-[#f5f5f7]" aria-label="Memuat portofolio" />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Sticky Blurred Apple-Style Navbar with customized avatar & quick customizer */}
      <Navbar
        onOpenCVModal={() => setIsCVModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative">
        
        {/* 1. Hero Section */}
        <HeroSection
          onOpenCVModal={() => setIsCVModalOpen(true)}
        />

        {/* 2. Selected Work / Case Studies Section with Project Gallery Preview */}
        <SelectedWorkSection
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenGallery={(data) => setActiveGalleryData(data)}
        />

        {/* 3. About Me Section */}
        <AboutSection onOpenCVModal={() => setIsCVModalOpen(true)} />

        {/* 4. Education Section */}
        <EducationSection />

        {/* 5. Experience Section with Documentation Gallery Previews */}
        <ExperienceSection
          onOpenGallery={(data) => setActiveGalleryData(data)}
        />

        {/* 6. Speaking Engagements Section */}
        <SpeakingSection />

        {/* 7. Publication Section */}
        <PublicationSection />

        {/* 8. Achievements Section */}
        <AchievementsSection />

        {/* 9. Skills & Tools Section */}
        <SkillsToolsSection />

        {/* 10. Contact Section */}
        <ContactSection onOpenCVModal={() => setIsCVModalOpen(true)} />

      </main>

      {/* Footer */}
      <Footer onOpenCVModal={() => setIsCVModalOpen(true)} />

      {/* Floating Owner / Public Mode Switcher Toolbar */}
      <OwnerToolbar />

      {/* Universal Image & Zoom Editor Modal */}
      <UniversalImageEditorModal />

      {/* Secret Admin Authentication Modal */}
      <AnimatePresence>
        {isAdminAuthModalOpen && (
          <AdminAuthModal
            isOpen={isAdminAuthModalOpen}
            onClose={closeAdminAuthModal}
          />
        )}
      </AnimatePresence>

      {/* Printable / Interactive CV Modal */}
      <AnimatePresence>
        {isCVModalOpen && (
          <CVModal
            isOpen={isCVModalOpen}
            onClose={() => setIsCVModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Interactive Project Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Interactive Full-Screen Documentation & Project Lightbox Gallery */}
      <AnimatePresence>
        {activeGalleryData && (
          <ProjectGalleryModal
            galleryData={activeGalleryData}
            onClose={() => setActiveGalleryData(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export function App() {
  return (
    <ImageStoreProvider>
      <PortfolioApp />
    </ImageStoreProvider>
  );
}

export default App;
