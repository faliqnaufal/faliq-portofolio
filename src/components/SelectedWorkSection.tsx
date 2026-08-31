import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Images,
  Eye
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectDetail } from '../types';
import { GalleryModalData } from './ProjectGalleryModal';
import { AdjustableImage } from './AdjustableImage';
import { useImageStore } from '../context/ImageStoreContext';

// Authentic Raja Premium Logo Vector (Matching official brand identity from rajapremium4.png)
export const RajaPremiumBrandLogo: React.FC<{ className?: string }> = ({ className = "h-10" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 380 90"
        className="h-full w-auto max-w-full drop-shadow-xs select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Crown centered on R */}
        <path
          d="M32 17 L38 8 L44 17 L50 10 L51 22 H25 L26 10 L32 17Z"
          fill="#0A1128"
        />
        {/* R letter body */}
        <path
          d="M26 26 H42 C51.5 26 57 31.5 57 39.5 C57 47 51 51.5 43.5 53.5 L58 72 H47 L33.5 55 H32 V72 H26 V26 Z M32 31.5 V50 H41.5 C46.5 50 50.5 46.5 50.5 40.5 C50.5 34.5 46.5 31.5 41.5 31.5 H32 Z"
          fill="#0A1128"
        />
        {/* Underline Swoosh crossing R */}
        <path
          d="M17 52 C26 52 35 56 46 64 C56 71.5 64 74.5 73 74.5 C64 73 54 68 44 60.5 C34 53 25 50.5 17 52 Z"
          fill="#0A1128"
        />
        {/* Wordmark: aja Premium in high contrast Serif */}
        <text
          x="72"
          y="68"
          fill="#0A1128"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="48"
          fontWeight="800"
          letterSpacing="0.2px"
        >
          aja Premium
        </text>
      </svg>
    </div>
  );
};

// Authentic Jupiter Roastery Brand Logo (Faithful vector matching uploaded logo jupiter.png)
export const JupiterRoasteryBrandLogo: React.FC<{ className?: string }> = ({ className = "h-10" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 380 96"
        className="h-full w-auto max-w-full drop-shadow-2xs select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Planet Emblem */}
        <g transform="translate(2, 0)">
          {/* Outer circle boundary ring */}
          <circle
            cx="48"
            cy="48"
            r="43"
            stroke="#000000"
            strokeWidth="7"
            fill="none"
          />

          {/* Atmospheric Waves & Great Red Spot Storm Clip */}
          <g clipPath="url(#jupiter-planet-emblem-clip)">
            {/* Top Band */}
            <path
              d="M 6 36 C 26 28, 52 34, 90 20"
              stroke="#000000"
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Upper-Middle Band */}
            <path
              d="M 6 52 C 28 44, 58 48, 90 36"
              stroke="#000000"
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Lower-Middle Band */}
            <path
              d="M 8 68 C 30 60, 56 60, 72 64"
              stroke="#000000"
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cyclone Swirl / Great Red Spot */}
            <path
              d="M 18 82 C 40 74, 56 72, 68 70 C 78 68, 86 76, 80 84 C 74 90, 62 88, 64 78 C 66 70, 76 72, 76 78"
              stroke="#000000"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Bottom Band */}
            <path
              d="M 30 92 C 48 88, 66 92, 80 96"
              stroke="#000000"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          <defs>
            <clipPath id="jupiter-planet-emblem-clip">
              <circle cx="48" cy="48" r="39.5" />
            </clipPath>
          </defs>
        </g>

        {/* Wordmark: JUPITER / ROASTERY */}
        <text
          x="110"
          y="43"
          fill="#000000"
          fontFamily="'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="39"
          fontWeight="900"
          letterSpacing="2.8px"
        >
          JUPITER
        </text>
        <text
          x="110"
          y="83"
          fill="#000000"
          fontFamily="'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="35"
          fontWeight="900"
          letterSpacing="5.2px"
        >
          ROASTERY
        </text>
      </svg>
    </div>
  );
};

// Clean Authentic Brand Logo Display
interface BrandLogoDisplayProps {
  projectId: string;
  defaultLogo: React.ReactNode;
  brandName: string;
}

export const BrandLogoDisplay: React.FC<BrandLogoDisplayProps> = ({
  projectId,
  defaultLogo,
  brandName
}) => {
  const { getImageConfig } = useImageStore();
  const storageKey = `project-logo-${projectId}`;
  const config = getImageConfig(storageKey, '');
  const customLogoUrl = config.url || '';
  const currentZoom = typeof config.zoom === 'number' && !isNaN(config.zoom) ? config.zoom : 1.0;

  return (
    <div className="relative flex items-center justify-center p-2 select-none pointer-events-none">
      <div
        style={{
          transform: `scale(${currentZoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.15s ease-out'
        }}
        className="flex items-center justify-center"
      >
        {customLogoUrl ? (
          <img
            src={customLogoUrl}
            alt={`${brandName} Logo`}
            className="max-h-12 sm:max-h-14 max-w-full object-contain pointer-events-none drop-shadow-2xs"
          />
        ) : (
          <div className="pointer-events-none">
            {defaultLogo}
          </div>
        )}
      </div>
    </div>
  );
};

interface SelectedWorkSectionProps {
  onSelectProject: (project: ProjectDetail) => void;
  onOpenGallery: (data: GalleryModalData) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onSelectProject,
  onOpenGallery
}) => {
  return (
    <section id="work" className="py-24 relative bg-[#f5f5f7]">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Project Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
              Selected Works
            </h2>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-xl">
              Featured commercial case studies highlighting marketplace GMV Max optimization and organic viral social media growth. Each project includes full documentation and visual deliverables.
            </p>
          </div>

          <div className="text-xs text-[#6e6e73] font-medium hidden sm:block">
            <span>2 Flagship Case Studies</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {PROJECTS_DATA.map((project, idx) => {
            const isRajaPremium = project.id === 'rajapremium-social-media';
            const isJupiter = project.id === 'jupiter-roastery';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group rounded-3xl bg-white border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-black/[0.12] transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Project Card Header Visual Banner with Customized Brand Styling */}
                <div 
                  className={`relative h-52 sm:h-56 p-6 flex flex-col justify-between overflow-hidden border-b transition-colors cursor-pointer ${
                    isRajaPremium
                      ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F6F8FC] to-[#ECF1F8] border-black/[0.06]'
                      : isJupiter
                        ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F8F9FB] to-[#ECEEF3] border-black/[0.06]'
                        : 'bg-gradient-to-br from-[#ebecee] via-[#e5e5ea] to-[#d8d8de] border-black/[0.04]'
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  {/* Decorative background glow */}
                  <div
                    className={`absolute -right-8 -top-8 w-44 h-44 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 ${
                      isRajaPremium
                        ? 'bg-[#0071e3]/10'
                        : isJupiter
                          ? 'bg-black/[0.04]'
                          : 'bg-[#0071e3]/10'
                    }`}
                  />
                  
                  {/* Category & Period Tags */}
                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.06] text-[#1d1d1f] text-xs font-bold shadow-2xs">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/5 text-[#6e6e73] text-xs font-semibold">
                      {project.period}
                    </span>
                  </div>

                  {/* Centered Brand Logo Slot with Clean Display */}
                  <div className="z-10 flex items-center justify-center my-auto py-1.5 pointer-events-none">
                    <BrandLogoDisplay
                      projectId={project.id}
                      brandName={project.client}
                      defaultLogo={
                        isRajaPremium ? (
                          <RajaPremiumBrandLogo className="h-10 sm:h-12" />
                        ) : isJupiter ? (
                          <JupiterRoasteryBrandLogo className="h-10 sm:h-12" />
                        ) : (
                          <div className="text-xl font-bold text-[#1d1d1f]">{project.client}</div>
                        )
                      }
                    />
                  </div>

                  {/* Main Metric / Hero Highlight Stat */}
                  <div className="z-10 flex items-center justify-between">
                    <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.06] shadow-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#0071e3]" />
                      <span className="text-xs font-extrabold text-[#1d1d1f]">
                        {project.keyMetrics[0]?.value || 'Highlight Metric'}
                      </span>
                      <span className="text-[11px] text-[#6e6e73] font-medium hidden sm:inline">
                        {project.keyMetrics[0]?.label}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-white text-[#1d1d1f] flex items-center justify-center shadow-sm group-hover:bg-[#0071e3] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Project Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                
                <div className="space-y-3 cursor-pointer" onClick={() => onSelectProject(project)}>
                  <div>
                    <div className="text-xs font-semibold text-[#0071e3] uppercase tracking-wider">
                      {project.role} • {project.client}
                    </div>
                    <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight mt-0.5 group-hover:text-[#0071e3] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#424245] leading-relaxed line-clamp-2 font-normal">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Project Documentation Gallery Preview Strip */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#1d1d1f] flex items-center gap-1.5 uppercase tracking-wider">
                        <Images className="w-3.5 h-3.5 text-[#0071e3]" />
                        <span>Visual Documentation Preview</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenGallery({
                            title: project.title,
                            subtitle: `${project.client} • ${project.role}`,
                            category: project.categoryLabel,
                            period: project.period,
                            items: project.gallery || []
                          });
                        }}
                        className="text-[11px] font-bold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All ({project.gallery.length})</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {project.gallery.map((item, gIdx) => (
                        <div
                          key={gIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenGallery({
                              title: project.title,
                              subtitle: `${project.client} • ${project.role}`,
                              category: project.categoryLabel,
                              period: project.period,
                              items: project.gallery || [],
                              initialIndex: gIdx
                            });
                          }}
                          className="group/thumb relative aspect-video rounded-xl overflow-hidden bg-black/5 border border-black/[0.06] cursor-pointer hover:border-[#0071e3]/40 transition-all"
                          title={item.title}
                        >
                          <AdjustableImage
                            id={`project-${project.id}-gallery-${gIdx}`}
                            defaultSrc={item.image}
                            alt={item.title}
                            label={`${project.client} - ${item.title}`}
                            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools & Interactive Case Study trigger */}
                <div className="space-y-4 pt-4 border-t border-black/[0.05]">
                  <div className="flex flex-wrap gap-1.5">
                    {project.toolsUsed.slice(0, 4).map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-black/[0.03] text-[11px] font-medium text-[#424245] border border-black/[0.04]"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.toolsUsed.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-black/[0.02] text-[10px] font-medium text-[#86868b]">
                        +{project.toolsUsed.length - 4} more
                      </span>
                    )}
                  </div>

                  <div 
                    onClick={() => onSelectProject(project)}
                    className="flex items-center justify-between text-xs text-[#0071e3] font-bold group-hover:underline cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Case Study &amp; Strategy</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>

            </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
