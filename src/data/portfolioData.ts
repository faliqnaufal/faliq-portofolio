import {
  ProfileInfo,
  ProjectDetail,
  EducationItem,
  ExperienceItem,
  SpeakingEngagement,
  PublicationItem,
  AchievementItem,
  SkillGroup,
  ToolItem,
  LanguageItem
} from '../types';

export const PROFILE_DATA: ProfileInfo = {
  name: 'Faliq Naufal',
  tagline: 'Digital Marketer, Brand Strategist & Entrepreneurship Graduate',
  subTagline: 'Bridging strategic business analysis, high-converting creative visuals, and data-driven digital growth.',
  summary: 'Entrepreneurship graduate with experience across digital marketing, brand strategy, social media, and business development. Worked on marketplace optimization, digital campaigns, content strategy, and creative execution, with selected content reaching over 100K views. Experienced in research, project collaboration, and organizational leadership.',
  email: 'faliqnaufal000@gmail.com',
  phone: '+62 813-1220-6619',
  whatsappLink: 'https://wa.me/6281312206619?text=Hello%20Faliq%20Naufal,%20I%20would%20like%20to%20connect%20and%20discuss%20a%20potential%20opportunity.',
  linkedin: 'https://linkedin.com/in/faliqnaufal',
  instagram: 'https://instagram.com/faliqnaufal_',
  instagramHandle: '@faliqnaufal_',
  location: 'Bandung City, West Java, Indonesia',
  gpa: '3.71',
  degree: 'Bachelor of Entrepreneurship (S.Bns)',
  university: 'Universitas Pendidikan Indonesia (UPI)'
};

export const QUICK_STATS = [
  { label: 'Cumulative GPA', value: '3.71 / 4.00', note: 'Universitas Pendidikan Indonesia' },
  { label: 'Global Certifications', value: '79+', note: 'Coursera PPDKM Program' },
  { label: 'Competitive Grants Won', value: 'IDR 65M+', note: 'PPK Ormawa & SME Recovery' },
  { label: 'Reels Viral Reach', value: '100K+ views', note: 'Organic Social Traction' }
];

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    id: 'jupiter-roastery',
    title: 'Jupiter Roastery Marketplace & Ads Optimization',
    subtitle: 'Storefront Revamp, Catalog Architecture & Shopee GMV Max Campaigns',
    category: 'digital-marketing',
    categoryLabel: 'Digital Marketing & Ads',
    client: 'Jupiter Roastery',
    role: 'Digital Marketing Intern',
    period: 'Aug 2025 – Nov 2025',
    heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    accentColor: 'from-amber-500 to-orange-600',
    shortDescription: 'Designed 40+ marketplace visual assets, optimized 30+ coffee product listings across Shopee, Tokopedia, and TOCO, and produced high-performing short video concepts for Shopee Ads GMV Max.',
    fullOverview: 'As a Digital Marketing Intern at Jupiter Roastery, spearheaded the end-to-end revamp of the online marketplace presence. Developed modular storefront banners, standardized product copywriting with high-intent SEO keywords, and produced weekly short-form video assets to maximize conversion on paid ad spend.',
    challenge: 'The storefront had fragmented visual consistency, suboptimal search indexing across Shopee and Tokopedia, and required weekly creative video variations for paid advertising campaigns.',
    solution: 'Engineered a 6+ modular design template system, rebuilt title and SEO tags for 30+ SKUs, and produced 3 short-form videos weekly to drive high engagement in Shopee Ads GMV Max campaigns.',
    keyMetrics: [
      { label: 'Visual Assets Created', value: '40+', note: 'Shopee, Tokopedia, & TOCO' },
      { label: 'SKU Listings Optimized', value: '30+', note: 'SEO title, copywriting & tags' },
      { label: 'Promotional Banners', value: '20+', note: 'Seasonal discount campaigns' },
      { label: 'Modular Template System', value: '6+ Systems', note: 'Reusable team workflow' }
    ],
    deliverables: [
      'Desktop & Mobile Marketplace Storefront Banners',
      'Hero Product Showcase Infographics & Feature Cards',
      'Short-form Video Scripts & Concepts for Shopee Video & Reels',
      'Modular Canva & Photoshop Brand Asset Guidelines'
    ],
    toolsUsed: ['Shopee Seller Center', 'Tokopedia Merchant', 'Canva', 'Adobe Photoshop', 'CapCut', 'Shopee Ads GMV Max'],
    gallery: [
      {
        title: 'Shopee & Tokopedia Storefront Hero Banners',
        caption: 'Modular promotional banners engineered with brand color palettes and seasonal offer discounts for Shopee & Tokopedia.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
        tag: 'Storefront Design'
      },
      {
        title: '30+ SKU Catalog Infographic Architecture',
        caption: 'Standardized product detail infocards highlighting flavor notes, altitude origin, and roast profile for 30+ SKUs.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
        tag: 'Product Infographics'
      }
    ]
  },
  {
    id: 'rajapremium-social-media',
    title: 'RajaPremium.id Social Media Growth & Viral Strategy',
    subtitle: 'Data-Driven Content Calendars & 100K+ Viral Reels Execution',
    category: 'digital-marketing',
    categoryLabel: 'Social Media & Creative Strategy',
    client: 'RajaPremium.id',
    role: 'Graphic Designer & Social Media Specialist',
    period: 'Jul 2025 – Sep 2025',
    heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    accentColor: 'from-purple-500 to-indigo-600',
    shortDescription: 'Formulated monthly content roadmaps with 24 video briefs and 3 feed designs/week, achieving 3 viral Instagram Reels with 100,000+ views and 1,000+ new followers in under a month.',
    fullOverview: 'Built social media traction from the ground up for RajaPremium.id through rigorous audience persona research, engaging hook-based storytelling, and cohesive aesthetic grid curation across Instagram and TikTok.',
    challenge: 'Establishing quick brand authority and organic audience trust in a highly competitive digital subscription market with zero initial momentum.',
    solution: 'Designed a balanced 3-pillar content matrix (Educational Price Comparisons, Step-by-Step Activation Guides, and Relatable Entertainment Hooks) paired with fast-paced video edits and trending audio.',
    keyMetrics: [
      { label: 'Viral Reels Views', value: '100K+', note: '3 separate reels surpassed 100k views' },
      { label: 'New Instagram Followers', value: '1,000+', note: 'Grown organically in < 1 month' },
      { label: 'TikTok Community', value: '200+ Fans', note: 'Achieved in < 2 weeks' },
      { label: 'Monthly Video Briefs', value: '24 Briefs', note: 'Production-ready scripts' }
    ],
    deliverables: [
      'Comprehensive Multi-Platform Social Media Content Calendar',
      '3x Weekly Interactive Carousel & Static Feed Designs',
      'Viral Short-form Video Scripts with Storyboards & Retention Hooks',
      'Visual Identity Kit (Typography, Color Palette & Tone of Voice)'
    ],
    toolsUsed: ['Adobe Illustrator', 'Adobe Photoshop', 'CapCut Pro', 'Meta Business Suite', 'TikTok Analytics', 'Notion'],
    gallery: [
      {
        title: '100K+ Viral Instagram Reels Video Asset',
        caption: '3 dedicated short-form video hooks that surpassed 100,000+ organic views each within 30 days of launch.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
        tag: 'Viral Reels Proof'
      },
      {
        title: 'Instagram Feed Aesthetics & Carousel Grids',
        caption: '3x weekly carousel and educational infographics designed with modern typography and structured value delivery.',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop',
        tag: 'Feed Design'
      }
    ]
  }
];

export const EDUCATION_DATA: EducationItem = {
  institution: 'Universitas Pendidikan Indonesia (UPI)',
  degree: 'Bachelor of Entrepreneurship (S.Bns)',
  major: 'Entrepreneurship & Business Innovation',
  period: 'Sep 2022 – Jun 2026',
  gpa: '3.71',
  maxGpa: '4.00',
  honors: 'Graduated with Honors • PPK Ormawa National Grant Winner',
  location: 'Tasikmalaya, West Java',
  coursework: [
    'Design Thinking & Business Innovation',
    'Strategic Marketing Management',
    'Start-Up Development & Scaling',
    'Technology Entrepreneurship',
    'Brand Management & Commercialization',
    'Consulting Business Project'
  ],
  keyHighlights: [
    'Achieved a 3.71 / 4.00 GPA with an undergraduate thesis focused on Gen Z e-commerce switching intention.',
    'Elected President of the Entrepreneurship Student Association (HIMA) and Co-Founded a national student body.',
    'Completed 79 international professional certifications through the Coursera PPDKM scholarship initiative.'
  ]
};

export const EXPERIENCES_DATA: ExperienceItem[] = [
  // Professional Experience
  {
    id: 'exp-jupiter',
    category: 'professional',
    categoryLabel: 'Professional Experience',
    company: 'Jupiter Roastery',
    role: 'Digital Marketing Intern',
    location: 'Tasikmalaya, West Java',
    period: 'Aug 2025 – Nov 2025',
    type: 'Internship / On-site',
    summary: 'Spearheaded marketplace visual assets, catalog optimization, and Shopee Ads GMV Max campaigns for an artisan coffee roastery.',
    bulletPoints: [
      'Engineered 40+ marketplace visual assets and 20+ promotional banners for Shopee, Tokopedia, and TOCO while maintaining strict brand consistency.',
      'Optimized 30+ coffee product SKU listings and scripted/produced 3 short-form videos weekly in support of Shopee Ads GMV Max campaigns.',
      'Developed 6+ reusable design template systems, enhancing cross-team creative workflow efficiency and turnaround times.'
    ],
    keyStats: [
      { value: '40+', label: 'Marketplace Assets' },
      { value: '30+', label: 'SKU Listings Optimized' },
      { value: '6+', label: 'Reusable Template Systems' }
    ],
    tags: ['Digital Marketing', 'Shopee Ads GMV Max', 'Tokopedia Merchant', 'SEO Copywriting', 'Short-form Video', 'Canva', 'Photoshop'],
    gallery: [
      {
        title: 'Shopee & Tokopedia Storefront Banners',
        caption: 'Engineered promotional banners with seasonal vouchers and high-contrast coffee brand visual identity.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
        tag: 'Storefront Campaign'
      },
      {
        title: '30+ Product SKU Listing Architecture',
        caption: 'Optimized coffee bean packaging infocards with taste notes, roast level, and altitude details.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
        tag: 'Catalog SEO'
      },
      {
        title: 'Shopee Ads GMV Max Video Production',
        caption: 'Produced high-engagement short-form video assets weekly for paid advertising funnels.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
        tag: 'Paid Ads Creative'
      }
    ]
  },
  {
    id: 'exp-rajapremium',
    category: 'professional',
    categoryLabel: 'Professional Experience',
    company: 'RajaPremium.id',
    role: 'Graphic Designer & Social Media Specialist',
    location: 'Remote',
    period: 'Jul 2025 – Sep 2025',
    type: 'Contract / Remote',
    summary: 'Led social media content strategy, viral Reels production, and brand identity for a digital subscription provider.',
    bulletPoints: [
      'Formulated monthly social media calendars, 24 video briefs/month, and 3 feed designs/week across Instagram and TikTok.',
      'Grew the Instagram community to 1,000+ followers in under a month and TikTok to 200+ followers in less than two weeks.',
      'Produced 3 high-impact Instagram Reels that each achieved over 100,000+ organic views.'
    ],
    keyStats: [
      { value: '100K+', label: 'Organic Views / Reels (3x)' },
      { value: '1,000+', label: 'Followers Gained < 1 Month' },
      { value: '24', label: 'Video Briefs / Month' }
    ],
    tags: ['Social Media Strategy', 'Instagram Reels', 'TikTok Growth', 'Graphic Design', 'Retention Hooks', 'CapCut Pro'],
    gallery: [
      {
        title: 'Viral Instagram Reels (100K+ Views)',
        caption: 'High-retention video hooks that drove over 100,000 organic views on Instagram Reels.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
        tag: 'Viral Video Content'
      },
      {
        title: 'Educational Carousel & Feed Layout Grid',
        caption: 'Structured 3x weekly carousel templates breaking down digital subscription activation steps.',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop',
        tag: 'Carousel Design'
      },
      {
        title: 'Monthly Editorial Calendar & Analytics',
        caption: 'Curated 24 monthly briefs and tracked organic audience acquisition surges in real-time.',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
        tag: 'Analytics & Strategy'
      }
    ]
  },
  {
    id: 'exp-siloka',
    category: 'professional',
    categoryLabel: 'Professional Experience',
    company: 'Siloka Group',
    role: 'Graphic Design Intern',
    location: 'Tasikmalaya, West Java',
    period: 'Feb 2025 – Apr 2025',
    type: 'Internship / On-site',
    summary: 'Designed in-store visual merchandising, POS menu displays, and visual event coverage for retail coffee branches.',
    bulletPoints: [
      'Designed 12 bespoke coffee board displays for signature and manual brew menu lineups.',
      'Provided end-to-end visual documentation and promotional collateral for two major corporate events.',
      'Upheld consistent visual merchandising standards and promotional placement across 4 branch locations.'
    ],
    keyStats: [
      { value: '12', label: 'Coffee Board Displays' },
      { value: '4', label: 'Standardized Branch Outlets' },
      { value: '2', label: 'Major Events Covered' }
    ],
    tags: ['Visual Merchandising', 'Menu Board Design', 'Event Media Coverage', 'Retail Branding', 'Illustrator'],
    gallery: [
      {
        title: '12 In-Store Printed Coffee Boards',
        caption: 'Handcrafted typographic menu signage for signature drinks and manual brew offerings across 4 branch outlets.',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop',
        tag: 'Menu Board Signage'
      },
      {
        title: 'POS Merchandising & Seasonal Standees',
        caption: 'Physical point-of-sale tabletop promotions and seasonal standees crafted for outlet customer flow.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
        tag: 'Retail Merchandising'
      },
      {
        title: 'Corporate Event Photography & Video Recap',
        caption: 'Full-scope event media coverage and post-event marketing recap assets for 2 major Siloka Group corporate gatherings.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
        tag: 'Event Documentation'
      }
    ]
  },
  {
    id: 'exp-kemenkop',
    category: 'professional',
    categoryLabel: 'Professional Experience',
    company: 'Ministry of Cooperatives & SMEs RI x EntreDev',
    role: 'Book Layout Designer',
    location: 'Remote',
    period: 'Jun 2024 – Nov 2024',
    type: 'National Initiative / Remote',
    summary: 'Managed typography and layout design for two national entrepreneurship handbooks totaling 207 pages.',
    bulletPoints: [
      'Formatted and structured the complete editorial layout for two national-level entrepreneurship handbooks totaling 207 pages.',
      'Standardized typography hierarchies, redrew complex business model flowcharts, and ensured print-ready production standards.'
    ],
    keyStats: [
      { value: '207', label: 'Total Pages Formatted' },
      { value: '2', label: 'National Book Handbooks' }
    ],
    tags: ['Editorial Design', 'Book Layouting', 'Typography', 'Microsoft Word Pro', 'Canva', 'Kemenkop UKM'],
    gallery: [
      {
        title: '207-Page National Handbook Editorial Spreads',
        caption: 'Formatted 2 complete book volumes with standardized margin grids, headers, and academic hierarchy standards.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop',
        tag: 'Editorial Layout'
      },
      {
        title: 'Business Framework & Workflow Diagrams',
        caption: 'Redrew 50+ business incubation frameworks, matrix charts, and policy guidelines for enhanced visual clarity.',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop',
        tag: 'Diagram Redesign'
      },
      {
        title: 'Ministry of Cooperatives & SMEs Handbooks Cover',
        caption: 'Print-ready typography and cover art delivered for nationwide university business incubator distribution.',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop',
        tag: 'Publication Cover'
      }
    ]
  },

  // Additional / Consulting Experience
  {
    id: 'exp-vecta',
    category: 'additional',
    categoryLabel: 'Additional Experience',
    company: 'Vecta Creative',
    role: 'Freelance Graphic Designer',
    location: 'Tasikmalaya, West Java',
    period: 'May 2025 – Jun 2025',
    type: 'Freelance',
    summary: 'Crafted tailored social media designs and marketing graphics for local lifestyle and F&B client brands.',
    bulletPoints: [
      'Delivered 11 bespoke social media designs for Cikospace and Bebee Thaitea.',
      'Tailored visual aesthetics to match individual client brand guidelines and target audience preferences.'
    ],
    tags: ['Freelance Design', 'Brand Identity', 'Social Media Feeds', 'Client Relationship'],
    gallery: [
      {
        title: 'Cikospace Social Media Campaign Visuals',
        caption: 'Custom social media carousel and promotional poster designs tailored for coworking and creative lifestyle spaces.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
        tag: 'Social Media Feeds'
      },
      {
        title: 'Bebee Thaitea Brand Promotional Collateral',
        caption: 'Vibrant F&B promotional flyers and digital banner sets optimized for mobile audience engagement.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1000&auto=format&fit=crop',
        tag: 'F&B Marketing Assets'
      }
    ]
  },
  {
    id: 'exp-innovation-hub',
    category: 'additional',
    categoryLabel: 'Additional Experience',
    company: 'Innovation Hub',
    role: 'Public Relations & Design',
    location: 'Tasikmalaya, West Java',
    period: 'Mar 2023 – Dec 2024',
    type: 'Campus Hub',
    summary: 'Mentored students and spearheaded public communication initiatives for a campus business incubation center.',
    bulletPoints: [
      'Mentored ~30 students weekly on utilizing digital design tools to construct business prototypes and marketing collateral.',
      'Designed promotional materials for entrepreneurship workshops, innovation seminars, and university press releases.'
    ],
    keyStats: [
      { value: '30+', label: 'Students Mentored Weekly' }
    ],
    tags: ['Public Relations', 'Mentorship', 'Prototyping', 'Design Thinking', 'Business Modeling'],
    gallery: [
      {
        title: 'Student Mentorship & Prototyping Workshop',
        caption: 'Weekly mentorship sessions guiding 30+ students on Canva, Figma, and design thinking frameworks.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
        tag: 'Mentorship Workshop'
      },
      {
        title: 'Innovation Hub Event Collateral & Seminars',
        caption: 'Visual identity and promotional posters designed for university innovation summits and entrepreneurship seminars.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
        tag: 'Seminar Posters'
      }
    ]
  },
  {
    id: 'exp-enakinaja',
    category: 'additional',
    categoryLabel: 'Additional Experience',
    company: 'Enakinaja F&B',
    role: 'Marketing Consultant',
    location: 'Tasikmalaya, West Java',
    period: 'Feb 2024 – Jun 2024',
    type: 'Consultancy Project',
    summary: 'Conducted marketing audits and devised digital strategy revamps for a local culinary venture.',
    bulletPoints: [
      'Formulated an end-to-end marketing mix blueprint and revitalized the brand’s social media content cadence.',
      'Boosted Instagram account reach and interaction insights by 30% over a 5-month engagement.'
    ],
    keyStats: [
      { value: '+30%', label: 'Account Reach Surge' }
    ],
    tags: ['Marketing Strategy', 'Brand Advisory', 'Instagram Growth', 'F&B Marketing'],
    gallery: [
      {
        title: '+30% Instagram Account Reach Growth Data',
        caption: 'Account insights overview documenting the 30% surge in organic reach and user engagement over 5 months.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        tag: 'Analytics Growth'
      },
      {
        title: 'F&B Marketing Mix & Persona Mapping',
        caption: 'Customer journey mapping and promotional combo pricing strategy designed for the culinary venture.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
        tag: 'Brand Consulting'
      }
    ]
  },

  // Organizational & Leadership Experience
  {
    id: 'exp-iesa',
    category: 'organizational',
    categoryLabel: 'Organizational Leadership',
    company: 'Indonesia Entrepreneurship Student Association (I-ESA)',
    role: 'Co-Founder',
    location: 'National (Indonesia)',
    period: 'Oct 2024 – Jul 2025',
    type: 'National Student Association',
    summary: 'Co-founded the premier national entrepreneurship student body alongside student leaders from top Indonesian universities.',
    bulletPoints: [
      'Co-founded I-ESA alongside student delegates from BINUS University, IPB University, and Institut Teknologi Bandung (ITB), gathering 100+ attendees at the inaugural assembly.',
      'Formally inaugurated the association at Universitas Amikom Yogyakarta, attended by delegates representing 35 universities nationwide across offline and virtual formats.'
    ],
    keyStats: [
      { value: '35', label: 'Universities Represented' },
      { value: '150+', label: 'Inaugural Delegates' },
      { value: 'Top 4', label: 'Founding Universities (UPI, ITB, BINUS, IPB)' }
    ],
    tags: ['Strategic Leadership', 'Co-Founder', 'National Networking', 'Cross-Campus Collaboration', 'Conference Organization'],
    gallery: [
      {
        title: 'National Inauguration at Universitas Amikom Yogyakarta',
        caption: 'Official launch of I-ESA bringing together student delegates representing 35 universities across Indonesia.',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
        tag: 'National Summit'
      },
      {
        title: 'Founding Universities Strategic Consensus Meeting',
        caption: 'High-level planning session with entrepreneurship student leaders from UPI, ITB, BINUS, and IPB.',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop',
        tag: 'Founding Assembly'
      },
      {
        title: 'Cross-Campus Entrepreneurship Network Forum',
        caption: 'Keynote and collaborative working groups fostering inter-university startup ventures and incubator partnerships.',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
        tag: 'Delegate Forum'
      }
    ]
  },
  {
    id: 'exp-hima-upi',
    category: 'organizational',
    categoryLabel: 'Organizational Leadership',
    company: 'Association of Entrepreneurship Students (HIMA Kewirausahaan) UPI',
    role: 'President / Ketua Umum',
    location: 'Tasikmalaya, West Java',
    period: 'Jan 2024 – Dec 2024',
    type: 'Campus Leadership',
    summary: 'Led an executive board of 60+ committee members across 9 departments and 20+ divisions, executing 40+ strategic programs.',
    bulletPoints: [
      'Led 60+ executive members across 9 departments, successfully orchestrating 40+ strategic initiatives and winning the prestigious "HIMA of the Year" accolade.',
      'Established partnerships across 30+ academic programs and generated IDR 13M+ in net revenue through business ventures and corporate sponsorships.',
      'Grew official Instagram followers by 490 and raised average post engagement from 40 to 150 likes within 12 months.'
    ],
    keyStats: [
      { value: '60+', label: 'Executive Members Led' },
      { value: '40+', label: 'Programs Executed' },
      { value: 'IDR 13M+', label: 'Revenue Generated' },
      { value: 'HIMA of the Year', label: 'Flagship Accolade' }
    ],
    tags: ['Organizational Leadership', 'Team Governance', 'Fundraising', 'Event Planning', 'Public Relations'],
    gallery: [
      {
        title: '60+ Executive Cabinet Inauguration & Governance',
        caption: 'Led the entire executive board of 9 departments across 40+ high-impact strategic campus programs.',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop',
        tag: 'Executive Cabinet'
      },
      {
        title: 'National Entrepreneurship Festival & SME Summit',
        caption: 'Flagship annual festival connecting student entrepreneurs with local business owners and corporate sponsors.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
        tag: 'Entrepreneur Festival'
      },
      {
        title: '"HIMA of the Year" Award Accolade Ceremony',
        caption: 'Honored with the top student association award in recognition of outstanding governance, financial growth, and impact.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop',
        tag: 'Award Recognition'
      }
    ]
  }
];

export const SPEAKING_ENGAGEMENTS: SpeakingEngagement[] = [
  {
    id: 'spk-assetup',
    event: 'ASSETUP! 2026',
    role: 'Keynote Speaker',
    topic: 'Design for Impact',
    year: '2026',
    type: 'Visual Strategy & Impact Workshop',
    description: 'Delivered an intensive workshop on leveraging design psychology, visual hierarchy, and strategic storytelling to drive commercial conversion and brand credibility.',
    takeaway: 'Impact-driven design frameworks, persuasive typography hierarchies, and real-world campaign case studies.',
    badgeText: 'Design & Visual Strategy'
  },
  {
    id: 'spk-leaderpreneur',
    event: 'Leaderpreneur 2025',
    role: 'Keynote Speaker',
    topic: 'Leadership is Influence: Learn, Execute & Evaluate',
    year: '2025',
    type: 'Leadership & Entrepreneurial Mindset',
    description: 'Shared transformational leadership principles on managing a 60+ person organization, aligning shared vision, and cultivating disciplined execution.',
    takeaway: 'The 3L Framework: Learn (team needs analysis), Execute (standardization & delegation), and Evaluate (objective metric tracking).',
    badgeText: 'Leadership & Execution'
  },
  {
    id: 'spk-upgrading',
    event: 'Upgrading 2025',
    role: 'Guest Speaker',
    topic: 'The Power of Organizational Synergy: Aligning People, Vision, and Growth',
    year: '2025',
    type: 'Organizational Development Seminar',
    description: 'Analyzed strategic frameworks for harmonizing cross-departmental operations in fast-paced student organizations and early-stage ventures.',
    takeaway: 'Conflict-resolution techniques, clear accountability matrices, and fostering a high-trust collaborative culture.',
    badgeText: 'Team Synergy'
  },
  {
    id: 'spk-apski',
    event: 'APSKI International Conference & Seminar 2025',
    role: 'Co-Presenter & Founding Representative',
    topic: 'The Growth & Impact of Entrepreneurship Education: Launching of I-ESA',
    year: '2025',
    type: 'International Academic Conference',
    description: 'Co-presented the formal launch of the Indonesia Entrepreneurship Student Association (I-ESA) alongside founding university representatives before deans, academics, and international education delegates.',
    takeaway: 'Bridging academic research with actionable student-led startup ecosystems across higher education institutions.',
    badgeText: 'International Conference'
  }
];

export const PUBLICATION_DATA: PublicationItem = {
  id: 'sinta-3-journal',
  title: 'Quasi-Moderasi Variety seeking dalam Hubungan Deal proneness dan Switching intention pada Konsumen Gen Z E-commerce Fashion',
  journal: 'Nationally Accredited Journal of Management & Business (SINTA 3)',
  accreditation: 'SINTA 3 Accredited Scientific Journal',
  authors: ['Faliq Naufal', 'UPI Entrepreneurship Research Team'],
  year: '2025 / 2026',
  type: 'Peer-Reviewed Scientific Journal (SINTA 3)',
  abstract: 'This study investigates the effect of Deal Proneness on Switching Intention with Variety Seeking as a Quasi-Moderating variable among Generation Z fashion e-commerce shoppers in Indonesia. Findings offer actionable retention insights for digital marketing managers navigating high customer volatility in discount-heavy retail environments.',
  keywords: ['Deal Proneness', 'Switching Intention', 'Variety Seeking', 'Quasi-Moderation', 'Gen Z Consumers', 'Fashion E-Commerce'],
  toolsUsed: ['SPSS Statistical Software', 'SmartPLS SEM Modeling', 'Quantitative Survey Method'],
  keyFindings: [
    'Deal proneness (sensitivity to promotional discounts) significantly accelerates platform switching intention among Gen Z online shoppers.',
    'Variety seeking functions as a proven quasi-moderator, compounding the urge to switch platforms when competing offers are introduced.',
    'Fashion e-commerce brands must balance price discounts with gamified loyalty loops and personalized recommendations to curtail churn rates.'
  ]
};

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-coursera',
    title: '79 International Coursera Professional Certifications',
    organizer: 'Coursera x Indonesian Ministry of Education (PPDKM Program)',
    year: '2023 – 2025',
    category: 'certification',
    highlight: '79 Verified Credentials',
    description: 'Completed 79 professional courses and specializations across digital marketing, business analytics, startup leadership, project management, and tech tools.',
    badge: 'International Credentials'
  },
  {
    id: 'ach-ppk-ormawa',
    title: 'IDR 35 Million National Grant — PPK Ormawa (PRODIGI Project)',
    organizer: 'Ministry of Education, Culture, Research, and Technology RI',
    year: '2024',
    category: 'funding',
    amount: 'IDR 35,000,000',
    highlight: 'National Competitive Grant',
    description: 'Secured national competitive funding for the PRODIGI village digitization and community empowerment initiative through the prestigious PPK Ormawa program.',
    badge: 'National Grant Winner'
  },
  {
    id: 'ach-sumedang',
    title: 'Post-Earthquake SME Economic Recovery Task Force (IDR 30M Grant)',
    organizer: 'Universitas Pendidikan Indonesia Community Grant Fund',
    year: '2024',
    category: 'funding',
    amount: 'IDR 30,000,000',
    highlight: 'University Community Grant',
    description: 'Selected as a core team researcher for an IDR 30M grant dedicated to economic rehabilitation and digital marketing enablement for disaster-impacted SMEs in Sumedang.',
    badge: 'Community Impact Project'
  },
  {
    id: 'ach-competitions',
    title: 'Presenter for DClass (P2MW) & Motobile (International Pitching)',
    organizer: 'P2MW Kemendikbudristek & Podomoro University',
    year: '2024 – 2025',
    category: 'competition',
    highlight: 'National & Global Pitch Finalist',
    description: 'Presented startup venture "DClass" at the national P2MW business program and pitched "Motobile" at Podomoro University’s international startup pitching competition.',
    badge: 'Pitching Finalist'
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Digital Marketing & Growth',
    description: 'Formulating end-to-end growth campaigns, social channel strategy, and consumer analytics.',
    skills: [
      { name: 'Social Media Strategy & Viral Growth', level: 88, levelLabel: 'Advanced', description: 'Content matrices, viral video hooks, audience retention' },
      { name: 'Brand Strategy & Visual Positioning', level: 85, levelLabel: 'Advanced', description: 'Tone of voice, brand kits, aesthetic coherence' },
      { name: 'Marketplace Operations & Store SEO', level: 75, levelLabel: 'Intermediate', description: 'Shopee Seller Center, Tokopedia Merchant, catalog management' },
      { name: 'Quantitative Research & SEM-PLS', level: 72, levelLabel: 'Intermediate', description: 'SmartPLS, SPSS regression, consumer behavior surveys' },
      { name: 'Team Governance & Leadership', level: 94, levelLabel: 'Expert', description: 'Led 60+ executives, executed 40+ strategic programs' }
    ]
  },
  {
    category: 'Creative Design & Editorial',
    description: 'Executing high-fidelity visual design, multi-page publication layouts, and retail merchandising.',
    skills: [
      { name: 'Social Media Design & Carousels', level: 92, levelLabel: 'Expert', description: 'Engagement carousels, ad creatives, feed branding' },
      { name: 'Editorial Layout & Book Design', level: 88, levelLabel: 'Advanced', description: '200+ page handbooks, precise typography systems' },
      { name: 'Retail Visual Merchandising', level: 85, levelLabel: 'Advanced', description: 'Coffee board displays, standees, POP collateral' },
      { name: 'Short-Form Video Production', level: 82, levelLabel: 'Advanced', description: 'Scripting, pacing, CapCut Pro editing & audio sync' }
    ]
  }
];

export const TOOLS_DATA: ToolItem[] = [
  // Marketing & Commerce
  { name: 'Shopee Seller Center', category: 'Marketing', icon: 'Shopee', highlight: 'Marketplace Operations & Store Management' },
  { name: 'Tokopedia Merchant', category: 'Marketing', icon: 'Tokopedia', highlight: 'Storefront & Catalog Architecture' },
  { name: 'Meta Business Suite', category: 'Marketing', icon: 'Meta', highlight: 'Instagram & Facebook Campaign Publishing' },
  { name: 'TikTok Analytics', category: 'Marketing', icon: 'TikTok', highlight: 'Audience Insights & Content Trend Spotting' },

  // Design & Video
  { name: 'Canva Pro', category: 'Design & Video', icon: 'Canva', highlight: 'Rapid Prototyping & Modular Design' },
  { name: 'Adobe Photoshop', category: 'Design & Video', icon: 'Photoshop', highlight: 'Photo Retouching & Marketing Banners' },
  { name: 'Adobe Illustrator', category: 'Design & Video', icon: 'Illustrator', highlight: 'Vector Graphics & Brand Identity Systems' },
  { name: 'CapCut Pro', category: 'Design & Video', icon: 'CapCut', highlight: 'Short Video Editing & Retention Pacing' },
  { name: 'Microsoft Word Pro', category: 'Design & Video', icon: 'Word', highlight: 'Advanced Multi-Page Editorial Layouting' },

  // Data & Research
  { name: 'SPSS Statistics', category: 'Data & Research', icon: 'SPSS', highlight: 'Quantitative Regression & Instrument Testing' },
  { name: 'SmartPLS (SEM)', category: 'Data & Research', icon: 'SmartPLS', highlight: 'Structural Equation Modeling & Moderation' },
  { name: 'Google Workspace', category: 'Data & Research', icon: 'GoogleWorkspace', highlight: 'Sheets, Docs, Slides, Drive Collaboration' },

  // AI & Productivity
  { name: 'Google AI Studio', category: 'AI & Productivity', icon: 'GoogleAIStudio', highlight: 'Prompt Prototyping, Multimodal AI & App Development' },
  { name: 'ChatGPT Plus', category: 'AI & Productivity', icon: 'ChatGPT', highlight: 'Prompt Engineering & Copy Strategy' },
  { name: 'Claude AI', category: 'AI & Productivity', icon: 'Claude', highlight: 'Analytical Synthesis & Long-Form Reasoning' },
  { name: 'Google Gemini', category: 'AI & Productivity', icon: 'Gemini', highlight: 'Multimodal Research & Brainstorming' },
  { name: 'NotebookLM', category: 'AI & Productivity', icon: 'NotebookLM', highlight: 'Grounded Document Insights & Synthesis' },
  { name: 'Perplexity AI', category: 'AI & Productivity', icon: 'Perplexity', highlight: 'Deep Fact-Checking & Web Grounding' }
];

export const LANGUAGES_DATA: LanguageItem[] = [
  {
    language: 'Bahasa Indonesia',
    level: 'Native Proficiency',
    type: 'Native',
    flag: '🇮🇩'
  },
  {
    language: 'English',
    level: 'B2 Upper-Intermediate',
    score: 'PTESOL Score: 487',
    type: 'B2 Upper-Intermediate',
    flag: '🇬🇧'
  }
];
