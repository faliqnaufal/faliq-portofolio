export interface AvatarConfig {
  imageUrl: string;
  zoom: number; // 0.6 to 3.0
  offsetX: number; // -80 to +80
  offsetY: number; // -80 to +80
}

export interface CustomImageConfig {
  url: string;
  zoom: number; // 0.5 to 3.0
  offsetX: number; // -80 to +80
  offsetY: number; // -80 to +80
  customName?: string;
  updatedAt?: string;
}

export interface ProfileInfo {
  name: string;
  tagline: string;
  subTagline: string;
  summary: string;
  email: string;
  phone: string;
  whatsappLink: string;
  linkedin: string;
  instagram: string;
  instagramHandle: string;
  portfolioUrl?: string;
  location: string;
  gpa: string;
  degree: string;
  university: string;
}

export type ProjectCategory = 'all' | 'digital-marketing' | 'branding-design' | 'research-publication' | 'business-consulting';

export interface ProjectMediaItem {
  id?: string;
  title: string;
  caption: string;
  image: string;
  tag?: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  client: string;
  role: string;
  period: string;
  heroImage: string;
  badgeColor: string;
  accentColor: string;
  shortDescription: string;
  fullOverview: string;
  challenge: string;
  solution: string;
  keyMetrics: { label: string; value: string; note?: string }[];
  deliverables: string[];
  toolsUsed: string[];
  gallery?: ProjectMediaItem[];
  testimonialOrFeedback?: { quote: string; author: string; role: string };
  links?: { label: string; url: string; primary?: boolean }[];
}

export interface EducationItem {
  id?: string;
  degree: string;
  major?: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  maxGpa?: string;
  honors?: string;
  status?: string;
  description?: string;
  coursework?: string[];
  thesis?: {
    title: string;
    focus: string;
    method: string;
    significance: string;
  };
  highlights?: string[];
  keyHighlights?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  category: 'professional' | 'organizational' | 'additional';
  categoryLabel: string;
  summary?: string;
  metrics?: string;
  keyStats?: { label: string; value: string }[];
  description?: string[];
  bulletPoints?: string[];
  keyAchievement?: string;
  tags: string[];
  deliverables?: string[];
  gallery?: ProjectMediaItem[];
}

export interface SpeakingItem {
  id: string;
  topic: string;
  event: string;
  type: string;
  year: string;
  role: string;
  description: string;
  takeaway: string;
  badgeText: string;
}

export type SpeakingEngagement = SpeakingItem;

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  accreditation: string;
  type?: string;
  year: string;
  doiOrUrl?: string;
  abstract: string;
  methodology?: string;
  significance?: string;
  authors?: string[];
  coAuthors?: string[];
  keyFindings?: string[];
  keywords?: string[];
  toolsUsed?: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  organizer?: string;
  year: string;
  category: string;
  description: string;
  badge?: string;
  verifiedBadge?: string;
  highlight?: string;
  amount?: string;
}

export interface SkillDetail {
  name: string;
  level?: number | string;
  levelLabel?: string;
  description?: string;
  highlight?: boolean;
}

export interface SkillItem {
  name: string;
  level?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export interface SkillGroup {
  category: string;
  description?: string;
  skills: SkillDetail[] | string[];
}

export interface ToolItem {
  name: string;
  category: string;
  level?: string;
  icon?: string;
  highlight?: string;
}

export interface LanguageItem {
  language: string;
  proficiency?: string;
  level?: string;
  score?: string;
  type?: string;
  flag?: string;
}
