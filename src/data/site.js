// Single source of truth for Velvora Solutions content, navigation, and services.

export const company = {
  name: 'Velvora Solutions',
  tagline: 'Content That Works for Everyone, Everywhere',
  heroHeading: 'Content That Works for Everyone, Everywhere',
  heroSubheading:
    'We help publishers, universities, enterprises, and government organizations create structured, accessible content and smarter digital workflows—from ePublishing and XML to AI, software, data analytics, and digital marketing.',
  introHeading: 'Your Content and Technology Partner, from Manuscript to Millions of Readers',
  introText:
    'Velvora Solutions is a content and technology services company. We combine ePublishing, XML, digital accessibility, AI automation, website development, software development, data analytics, and digital marketing to make your content well-structured, standards-compliant, discoverable, and usable by everyone, including people who rely on assistive technologies.',
  email: 'info@velvorasolutions.com',
  accessibilityEmail: 'info@velvorasolutions.com',
  phone: '+91 9500834236',
  phoneFormatted: '+91 9500834236',
  mainOffice: 'Indhira Nagar, Cuddalore',
  branchOffice: 'Porur, Chennai',
  office1: 'Indhira Nagar, Cuddalore',
  office2: 'Porur, Chennai',
  address: 'Indhira Nagar, Cuddalore',
  address2: 'Porur, Chennai',
  hours: '',
  founderLinkedin: 'https://www.linkedin.com/in/iyshwariya-senthil-bb7707287/',
  linkedinCompany: 'https://www.linkedin.com/company/118444302/',
  instagram: 'https://www.instagram.com/velvora_solutions?srtk=MWh0OHlvNmhlaXZwdg==',
  facebook: 'https://www.facebook.com/share/18faJ9mXpG/',
  youtube: 'https://www.youtube.com/@VelvoraSolutions',
  aboutLine: 'Velvora Solutions: ePublishing, XML, and Digital Accessibility Services.',
  description:
    'Velvora Solutions delivers ePublishing, XML, digital accessibility, AI automation, website development, software development, data analytics, and digital marketing services for publishers, universities, enterprises, and government organizations worldwide.',
  accessibilityStatement:
    'Velvora Solutions is committed to making our website accessible to everyone, including people with disabilities. We aim to conform to WCAG 2.2 Level AA. If you have difficulty using any part of this site or need content in another format, please contact us at info@velvorasolutions.com and we will respond promptly.',
};

export const numbersStrip = [
  { value: '5+', count: 5, label: 'Countries Reached' },
  { value: '500+', count: 500, label: 'XML Titles Structured' },
  { value: '2,000+', count: 2000, label: 'Training Hours Delivered' },
  { value: '30+', count: 30, label: 'Skilled Specialists' },
];

export const transitionBannerContent = [
  {
    title: 'ePublishing Services',
    headlinePrefix: 'Transform Manuscripts into',
    headlineAccent: 'Digital Experiences',
    quote: 'Transform manuscripts into digital experiences…',
    desc: 'From XML conversion to EPUB accessibility, we make publishing seamless, beautifully typeset, and future‑ready across global platforms.',
    icon: 'BookOpen',
    tag: 'Publishing & Formats',
    to: '/services/epublishing',
    chips: ['EPUB 3 & EPUB 2', 'JATS / BITS XML', 'MathML & LaTeX', 'DocBook & TEI', 'Automated Workflows', 'Multi-Format Delivery'],
    image: '/hero-epublishing.jpg',
    badgeTop: { label: 'EPUB 3 & JATS XML', sub: 'Structured Semantic Delivery', dot: 'cyan' },
    badgeBottom: { label: 'Universal Compliance', sub: 'DAISY & EAA Verified', dot: 'green' }
  },
  {
    title: 'Accessibility Services',
    headlinePrefix: 'Designing Content That',
    headlineAccent: 'Includes Everyone',
    quote: 'Designing content that includes everyone…',
    desc: 'We audit, remediate, and verify documents, platforms, and publications to achieve 100% WCAG 2.2 and PDF/UA compliance.',
    icon: 'FileCheck2',
    tag: 'WCAG 2.2 & PDF/UA',
    to: '/services/digital-accessibility',
    chips: ['WCAG 2.2 AA / AAA', 'PDF/UA Remediation', 'Section 508 & ADA', 'Real Screen Reader QA', 'VPAT Assessments', 'Accessible Media'],
    image: '/hero-slide-2.jpg',
    badgeTop: { label: 'WCAG 2.2 AA / AAA', sub: 'Universal Accessibility Conformance', dot: 'cyan' },
    badgeBottom: { label: 'PDF/UA & Section 508', sub: 'Assistive Technology Verified', dot: 'green' }
  },
  {
    title: 'AI Automation & Workflows',
    headlinePrefix: 'Automate Workflows,',
    headlineAccent: 'Amplify Innovation',
    quote: 'Automate workflows, amplify innovation…',
    desc: 'We engineer intelligent neural workflows and automated QA pipelines to eliminate manual bottlenecks, cut processing time, and accelerate delivery.',
    icon: 'Bot',
    tag: 'Next-Gen AI & NLP Automation',
    to: '/services/ai-automation',
    chips: ['AI Content Ingestion', 'NLP Data Extraction', 'Automated QA Checks', 'Intelligent Workflows', 'Prompt Pipelines', '70% Cycle Reduction'],
    image: '/hero-robot-ai.jpg',
    badgeTop: { label: 'AI Neural Pipelines', sub: '70% Manual Time Reduction', dot: 'cyan' },
    badgeBottom: { label: 'Automated QA & NLP', sub: 'Cognitive Workflow Integration', dot: 'green' }
  },
  {
    title: 'Software & Web Development',
    headlinePrefix: 'Build Smarter, Scalable,',
    headlineAccent: 'Digital Architecture',
    quote: 'Build smarter, scalable digital architecture…',
    desc: 'Our teams deliver resilient full-stack applications, scalable cloud architectures, and accessible modern interfaces designed for enterprise reliability.',
    icon: 'Code',
    tag: 'Enterprise Digital Engineering',
    to: '/services/software-development',
    chips: ['React & Modern Web', 'Cloud APIs & Microservices', 'Enterprise Scalability', 'Accessible UI Systems', 'Secure Infrastructure', 'Full-Stack Delivery'],
    image: '/hero-slide-4.jpg',
    badgeTop: { label: 'Cloud Architecture', sub: 'Resilient Microservices & APIs', dot: 'cyan' },
    badgeBottom: { label: 'Modern UI/UX', sub: 'Enterprise Design Systems', dot: 'green' }
  },
  {
    title: 'Data Analytics & BI',
    headlinePrefix: 'Turn Complex Data into',
    headlineAccent: 'Decisive Action',
    quote: 'Turn data into decisions…',
    desc: 'From predictive models to executive dashboards, we transform complex enterprise data into clear, actionable intelligence and growth telemetry.',
    icon: 'BarChart3',
    tag: 'BI & Predictive Analytics',
    to: '/services/data-analytics',
    chips: ['Executive BI Dashboards', 'Predictive Modeling', 'ETL Data Pipelines', 'Real-Time Telemetry', 'Conversion Tracking', 'Actionable ROI'],
    image: '/hero-slide-5.jpg',
    badgeTop: { label: 'Predictive BI Models', sub: 'Real-Time Executive Intelligence', dot: 'cyan' },
    badgeBottom: { label: 'Data Visualizations', sub: 'Actionable Forecasting Metrics', dot: 'green' }
  },
  {
    title: 'Digital Marketing & Growth',
    headlinePrefix: 'Reach Global Audiences with',
    headlineAccent: 'Measurable Impact',
    quote: 'Reach audiences with measurable impact…',
    desc: 'Data-driven SEO, strategic omnichannel campaigns, and conversion analytics crafted by diverse voices to expand reach and drive measurable ROI.',
    icon: 'Megaphone',
    tag: 'SEO & Strategic Audience Growth',
    to: '/services/digital-marketing',
    chips: ['Technical SEO Audits', 'Omnichannel Strategy', 'Global Reach Networks', 'Content Marketing', 'Conversion Optimization', 'Performance Analytics'],
    image: '/hero-slide-6.jpg',
    badgeTop: { label: 'Global Market Reach', sub: 'Omnichannel Conversion Networks', dot: 'cyan' },
    badgeBottom: { label: 'SEO & Content Impact', sub: 'Data-Driven Campaign ROI', dot: 'green' }
  }
];

export const homeServices = [
  {
    id: 'publishing-xml',
    title: 'Publishing and XML',
    desc: 'Conversion, formatting, and structured XML for books and journals.',
    btnText: 'Explore Publishing and XML',
    to: '/services/epublishing',
    icon: 'BookOpen',
    tag: 'Structured Content',
    badge: 'JATS · BITS · EPUB 3',
    image: '/hero-slide-1.jpg'
  },
  {
    id: 'content-services',
    title: 'Content Services',
    desc: 'Typesetting, math, metadata, OCR, captioning, and transcription for print and digital content.',
    btnText: 'Explore Content Services',
    to: '/services/typesetting-and-design',
    icon: 'Layers',
    tag: 'End-to-End Production',
    badge: 'LaTeX · MathML · OCR',
    image: '/card-content-services.jpg'
  },
  {
    id: 'digital-accessibility',
    title: 'Digital Accessibility',
    desc: 'Accessible EPUB, web, PDF, Word, PowerPoint, and Excel files that meet WCAG, PDF/UA, and Section 508 standards.',
    btnText: 'Explore Digital Accessibility',
    to: '/services/digital-accessibility',
    icon: 'FileCheck2',
    tag: 'Universal Inclusion',
    badge: 'WCAG 2.2 · PDF/UA · Section 508',
    image: '/card-accessibility.jpg'
  },
  {
    id: 'it-services',
    title: 'IT Services',
    desc: 'AI automation, website development, software development, data analytics, and digital marketing that cut manual work, build smarter applications, transform data into insights, and help your content reach the right audience.',
    btnText: 'Explore IT Services',
    to: '/services/software-development',
    icon: 'Cpu',
    tag: 'Enterprise Engineering',
    badge: 'AI Automation · Software · Data',
    image: '/hero-slide-3.jpg'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'SEO, social media, paid campaigns, content marketing, and analytics to amplify your reach and maximize engagement.',
    btnText: 'Explore Digital Marketing',
    to: '/services/digital-marketing',
    icon: 'Megaphone',
    tag: 'Audience Amplification',
    badge: 'SEO · Content · Multi-Channel',
    image: '/card-marketing.jpg'
  },
  {
    id: 'training-development',
    title: 'Training & Skill Development',
    desc: 'Industry-aligned corporate and student upskilling in digital publishing, accessibility, AI automation, and modern software technologies.',
    btnText: 'Explore Training',
    to: '/training',
    icon: 'GraduationCap',
    tag: 'Talent & Skill Development',
    badge: 'Publishing · Accessibility · Tech',
    image: '/card-training.jpg'
  }
];

export const industrySolutions = [
  {
    id: 'publishers',
    industry: 'Publishers',
    headline: 'Books and journals, ready for every format.',
    desc: 'From reflowable EPUB 3 and JATS/BITS XML to print-ready composition and accessible backlist conversions, we keep publishing houses compliant and agile.',
    icon: 'BookOpen',
    tag: 'Publishing Industry',
    highlights: ['EPUB 3 & MathML', 'JATS / BITS XML', 'EAA Compliance', 'Backlist Remediation'],
    to: '/services/epublishing'
  },
  {
    id: 'universities',
    industry: 'Universities and EdTech',
    headline: 'Accessible learning content at scale.',
    desc: 'Enable equal access to course materials, syllabi, textbooks, and interactive LMS files that strictly comply with Section 508 and WCAG 2.2 AA.',
    icon: 'GraduationCap',
    tag: 'Higher Ed & EdTech',
    highlights: ['Course Packs & Syllabi', 'STEM / LaTeX / MathML', 'PDF/UA Remediation', 'LMS Readiness'],
    to: '/services/digital-accessibility'
  },
  {
    id: 'enterprises',
    industry: 'Enterprises',
    headline: 'Accessible documents, smarter workflows.',
    desc: 'Transform annual reports, ESG disclosures, marketing assets, and employee intranets into universally accessible, brand-compliant assets.',
    icon: 'Building2',
    tag: 'Corporate & Finance',
    highlights: ['ESG & Annual Reports', 'Office 365 / PDF', 'AI Automation', 'Enterprise SLAs'],
    to: '/services/ai-automation'
  },
  {
    id: 'government',
    industry: 'Government and Public Sector',
    headline: 'Compliance with accessibility regulations.',
    desc: 'Audit, remediate, and maintain citizen-facing portals and statutory public documents with complete VPAT / ACR documentation and zero compliance gaps.',
    icon: 'Landmark',
    tag: 'Public Administration',
    highlights: ['Section 508 & ADA', 'VPAT / ACR Reports', 'Public Forms Remediation', 'Screen Reader QA'],
    to: '/services/digital-accessibility'
  }
];

export const partnershipData = {
  hero: {
    eyebrow: 'Partner With Velvora',
    title: 'Collaborate. Innovate. Grow Together.',
    tagline: 'Collaborate. Innovate. Grow Together.',
    description:
      'At Velvora Solutions, we believe partnerships are the key to scaling innovation and impact. Whether you’re a technology provider, publishing house, accessibility consultant, or industry leader, we welcome collaborations that create value for everyone.',
  },
  whyPartner: [
    {
      title: 'Global Reach',
      desc: 'Work across countries and industries with diverse teams.',
      icon: 'Globe',
      badge: 'Worldwide Scale',
    },
    {
      title: 'Innovation Focus',
      desc: 'Collaborate on cutting‑edge projects in ePublishing, accessibility, AI, and digital solutions.',
      icon: 'Bot',
      badge: 'Next-Gen Tech',
    },
    {
      title: 'Shared Growth',
      desc: 'Build sustainable, long‑term relationships that benefit both organizations.',
      icon: 'Building2',
      badge: 'Mutual Success',
    },
    {
      title: 'Inclusive Vision',
      desc: 'Drive innovation through inclusion and accessibility.',
      icon: 'ShieldCheck',
      badge: 'Universal Access',
    },
  ],
  opportunities: [
    {
      id: 'tech',
      title: 'Technology Partnerships',
      desc: 'Co‑develop solutions in AI, automation, and analytics.',
      icon: 'Bot',
      category: 'Technology',
      highlights: ['AI & Neural Workflows', 'Automated QA Pipelines', 'Big Data & Telemetry', 'Cloud Integrations'],
    },
    {
      id: 'publishing',
      title: 'Publishing Collaborations',
      desc: 'Joint projects in XML workflows, typesetting, and digital publishing.',
      icon: 'BookOpen',
      category: 'Publishing',
      highlights: ['JATS / BITS XML', 'Multi-Format Production', 'eBook Conversion', 'Catalog Digitization'],
    },
    {
      id: 'accessibility',
      title: 'Accessibility Alliances',
      desc: 'Work together to deliver accessible content and compliance solutions.',
      icon: 'ShieldCheck',
      category: 'Accessibility',
      highlights: ['WCAG 2.2 Audits', 'PDF/UA Remediation', 'VPAT / ACR Declarations', 'Assistive Tech Testing'],
    },
    {
      id: 'marketing',
      title: 'Marketing & Outreach',
      desc: 'Collaborate on campaigns that reach global audiences.',
      icon: 'Megaphone',
      category: 'Marketing',
      highlights: ['Omnichannel Growth', 'Thought Leadership', 'Industry Webinars', 'Global Distribution'],
    },
  ],
  formAreas: [
    'Technology',
    'Publishing',
    'Accessibility',
    'Marketing',
    'Other',
  ],
};

export const solutionsData = [
  // 🔹 By Industry
  {
    id: 'publishers-solution',
    category: 'industry',
    categoryLabel: 'By Industry',
    title: 'Book and Journal Publishers',
    tag: 'Publishing & Media',
    icon: 'BookOpen',
    challenges: [
      'Multi‑format production (print, EPUB, PDF, web)',
      'Accessibility regulations for e‑books',
      'Large back‑catalogues and tight editorial schedules',
      'Inconsistent metadata affecting discoverability',
    ],
    flow: ['Typeset', 'Structure in XML', 'Produce EPUB/PDF', 'Enrich with metadata', 'Validate for accessibility'],
    servicesIncluded: ['Typesetting', 'XML Services', 'ePublishing', 'Metadata', 'EPUB Accessibility'],
    benefits: [
      'Faster multi‑format publishing',
      'Accessibility compliance built in',
      'Improved discoverability with enriched metadata',
      'Reduced production errors and duplication',
    ],
    caseStudy: 'Making a 5,000‑Title EPUB Library Accessible',
    caseStudyLink: '/resources/case-studies',
    ctaText: 'Discuss Your Publishing Project',
    ctaSubject: 'Publishing Project',
  },
  {
    id: 'universities-edtech-solution',
    category: 'industry',
    categoryLabel: 'By Industry',
    title: 'Universities and EdTech',
    tag: 'Higher Ed & EdTech',
    icon: 'GraduationCap',
    challenges: [
      'Thousands of inaccessible course PDFs, slides, and documents',
      'Lecture videos without captions or transcripts',
      'Legal and institutional accessibility requirements',
      'Staff lacking practical accessibility skills',
    ],
    flow: ['Audit content', 'Remediate files', 'Caption media', 'Train staff', 'Report progress'],
    servicesIncluded: ['PDF Accessibility', 'Office Accessibility', 'Captioning', 'Training', 'Analytics'],
    benefits: [
      'One clear view of all course materials',
      'Faster, better‑informed accessibility decisions',
      'Less time spent fixing files manually',
      'Inclusive learning for every student, including those with disabilities',
    ],
    caseStudy: 'PDF Remediation for a University',
    caseStudyLink: '/resources/case-studies',
    ctaText: 'Discuss Your Accessibility Project',
    ctaSubject: 'Accessibility Project',
  },
  {
    id: 'enterprises-corporate-solution',
    category: 'industry',
    categoryLabel: 'By Industry',
    title: 'Enterprises and Corporate Teams',
    tag: 'Corporate & Enterprise',
    icon: 'Building2',
    challenges: [
      'Large volumes of inaccessible internal and customer‑facing documents',
      'Procurement requests for VPATs and conformance reports',
      'Repetitive manual reporting and document workflows',
      'Teams without accessibility knowledge',
    ],
    flow: ['Assess', 'Remediate documents', 'Build templates', 'Automate workflows', 'Train teams'],
    servicesIncluded: ['Office Accessibility', 'PDF Accessibility', 'AI & Automation', 'Analytics', 'Training'],
    benefits: [
      'Reduced compliance risk in procurement',
      'Automated, repeatable workflows',
      'Accessible templates for future documents',
      'Empowered teams with accessibility knowledge',
    ],
    caseStudy: 'Corporate Document Compliance & Template Standardization',
    caseStudyLink: '/resources/case-studies',
    ctaText: 'Discuss Your Project',
    ctaSubject: 'Corporate Project',
  },
  {
    id: 'accessibility-compliance-solution',
    category: 'industry',
    categoryLabel: 'By Industry',
    title: 'Accessibility Compliance',
    tag: 'Global Compliance',
    icon: 'ShieldCheck',
    challenges: [
      'Unclear which laws and standards apply',
      'Content and websites with unknown accessibility gaps',
      'Regulatory deadlines and procurement requirements',
      'Legal and reputational risk from inaccessible content',
    ],
    flow: ['Audit', 'Remediate', 'Verify with screen readers', 'Report (VPAT/ACR)', 'Train & monitor'],
    servicesIncluded: ['Web Accessibility', 'EPUB Accessibility', 'PDF Accessibility', 'Training & Consulting'],
    benefits: [
      'Clear compliance roadmap',
      'Verified accessibility with assistive technology testing',
      'Ready‑to‑use VPAT/ACR documentation',
      'Long‑term monitoring and staff training',
    ],
    standards: [
      'WCAG 2.1/2.2',
      'PDF/UA',
      'EPUB Accessibility 1.1',
      'Section 508',
      'ADA',
      'AODA',
      'EN 301 549',
      'European Accessibility Act',
    ],
    ctaText: 'Get a Free Accessibility Consultation',
    ctaSubject: 'Accessibility Consultation',
  },

  // 🔹 By Need
  {
    id: 'back-catalogue-conversion-solution',
    category: 'need',
    categoryLabel: 'By Need',
    title: 'Back‑Catalogue Conversion and Accessibility',
    tag: 'Archival & Backlist',
    icon: 'Layers',
    challenges: [
      'Large archives locked in print or legacy formats',
      'Inaccessible back‑catalogues failing compliance',
      'Metadata gaps reducing discoverability',
    ],
    flow: ['Digitize', 'OCR', 'Structure in XML', 'Produce EPUB/PDF', 'Remediate for accessibility'],
    servicesIncluded: ['OCR and Digitization', 'XML Workflows', 'ePublishing', 'PDF/EPUB Accessibility', 'Metadata'],
    benefits: [
      'Unlock legacy content for digital use',
      'Ensure accessibility compliance across archives',
      'Improve metadata for discoverability',
      'Preserve valuable content for the future',
    ],
    ctaText: 'Convert Your Back‑Catalogue',
    ctaSubject: 'Back-Catalogue Conversion',
  },
  {
    id: 'xml-first-publishing-solution',
    category: 'need',
    categoryLabel: 'By Need',
    title: 'XML‑First Publishing Workflow',
    tag: 'Structured Architecture',
    icon: 'FileCode',
    challenges: [
      'Inefficient multi‑format pipelines',
      'Manual duplication across formats',
      'Metadata inconsistencies',
    ],
    flow: ['Manuscript', 'XML structuring', 'Multi‑format output', 'Metadata enrichment', 'Accessibility validation'],
    servicesIncluded: ['XML Services', 'Typesetting', 'ePublishing', 'Metadata', 'Accessibility'],
    benefits: [
      'Streamlined publishing across formats',
      'Consistent metadata and structure',
      'Accessibility built into the workflow',
      'Faster turnaround with fewer errors',
    ],
    ctaText: 'Discuss XML‑First Publishing',
    ctaSubject: 'XML-First Publishing',
  },
  {
    id: 'print-archive-digitization-solution',
    category: 'need',
    categoryLabel: 'By Need',
    title: 'Print Archive Digitization',
    tag: 'Digitization & Preservation',
    icon: 'BookOpen',
    challenges: [
      'Valuable archives locked in physical format',
      'No searchability or digital access',
      'Risk of content loss over time',
    ],
    flow: ['Scan', 'OCR', 'Structure', 'Metadata tagging', 'Digital delivery'],
    servicesIncluded: ['OCR and Digitization', 'Metadata', 'XML Conversion', 'ePublishing'],
    benefits: [
      'Preserve archives digitally',
      'Make content searchable and accessible',
      'Reduce risk of loss or damage',
      'Enable reuse across formats',
    ],
    ctaText: 'Digitize Your Archive',
    ctaSubject: 'Archive Digitization',
  },
  {
    id: 'ai-powered-content-workflows-solution',
    category: 'need',
    categoryLabel: 'By Need',
    title: 'AI‑Powered Content Workflows',
    tag: 'Next-Gen Automation',
    icon: 'Bot',
    challenges: [
      'Repetitive manual content tasks',
      'Slow turnaround and high error rates',
      'Lack of automation in publishing pipelines',
    ],
    flow: ['Discover', 'Automate', 'Human review', 'Pilot', 'Scale'],
    servicesIncluded: ['AI and Automation', 'Document Processing', 'Metadata tagging', 'Workflow integration'],
    benefits: [
      'Save time with automation',
      'Reduce human error',
      'Scale workflows efficiently',
      'Free teams to focus on higher‑value tasks',
    ],
    ctaText: 'Start an AI Workflow Project',
    ctaSubject: 'AI Workflow Project',
  },
  {
    id: 'accessible-dashboards-reporting-solution',
    category: 'need',
    categoryLabel: 'By Need',
    title: 'Accessible Dashboards and Reporting',
    tag: 'Business Intelligence',
    icon: 'BarChart3',
    challenges: [
      'Business data locked in inaccessible dashboards',
      'Manual reporting wasting time',
      'Lack of clarity for decision‑makers',
    ],
    flow: ['Collect data', 'Clean and prepare', 'Build dashboards', 'Accessibility review', 'Deliver and train'],
    servicesIncluded: ['Business Intelligence and Data Analytics', 'Accessible Dashboard Design', 'Data Cleaning', 'Training'],
    benefits: [
      'One clear view of your business',
      'Faster, better‑informed decisions',
      'Less time spent building manual reports',
      'Insights available to every user, including those with disabilities',
    ],
    ctaText: 'Talk to Our Data Team',
    ctaSubject: 'Accessible Dashboards',
  },
];

export const whyChoose = [
  {
    title: 'Standards-First Approach',
    desc: 'Every deliverable follows industry standards such as WCAG 2.2, PDF/UA, EPUB Accessibility 1.1, and JATS/BITS XML.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Human + Tool Quality Checks',
    desc: 'Automated checkers find the obvious issues. Our trained specialists find the rest, using real screen readers.',
    icon: 'CheckCircle2',
  },
  {
    title: 'Scalable Teams',
    desc: 'From a single document to thousands of pages a month, we scale without compromising quality.',
    icon: 'Users',
  },
  {
    title: 'Transparent Process',
    desc: 'Clear timelines, defined checkpoints, and regular updates from kickoff to delivery.',
    icon: 'Clock',
  },
  {
    title: 'Confidential and Secure',
    desc: 'Your content and intellectual property stay protected throughout the project.',
    icon: 'Lock',
  },
  {
    title: 'One Partner, Many Services',
    desc: 'Publishing, XML, accessibility, AI, website development, software, data analytics, and digital marketing—managed through a single point of contact.',
    icon: 'Layers',
  },
  {
    title: 'Built for Publishers',
    desc: 'We understand editorial schedules, house styles, and author workflows.',
    icon: 'BookOpen',
  },
  {
    title: 'Accessible by Design',
    desc: 'Whatever we produce, we build it to support accessibility from the start.',
    icon: 'FileCheck2',
  },
  {
    title: 'Flexible Engagement',
    desc: 'Pilot projects, one-time work, or long-term partnerships.',
    icon: 'Sparkles',
  },
];

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    items: [
      { label: 'Company Overview', to: '/about/company-overview' },
      { label: 'Our Team', to: '/about/our-team' },
      { label: 'Partner With Velvora', to: '/partner' },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    megaMenu: true,
    categories: [
      {
        id: 'publishing-xml',
        name: 'Publishing & XML',
        icon: 'BookOpen',
        count: 2,
        subtopics: [
          {
            title: 'ePublishing Services',
            desc: 'Reflowable & fixed-layout EPUB 3, DAISY & accessible editions.',
            to: '/services/epublishing',
            icon: 'BookOpen',
            color: 'blue',
          },
          {
            title: 'XML Services',
            desc: 'JATS 1.3, BITS 2.1, PubMed Central & automated DITA schemas.',
            to: '/services/xml',
            icon: 'FileCode',
            color: 'cyan',
          },
        ],
      },
      {
        id: 'content-services',
        name: 'Content Services',
        icon: 'Layers',
        count: 5,
        subtopics: [
          {
            title: 'Typesetting & Design',
            desc: 'InDesign & 3B2 precision pagination for books, journals & reports.',
            to: '/services/typesetting-and-design',
            icon: 'Palette',
            color: 'indigo',
          },
          {
            title: 'Math & Equation Typesetting',
            desc: 'Accurate LaTeX and MathML authoring for STEM publications.',
            to: '/services/math-and-equation-typesetting',
            icon: 'Sigma',
            color: 'purple',
          },
          {
            title: 'Metadata, Indexing & Taxonomy',
            desc: 'Subject indexes, PRISM/Dublin Core & discoverability tagging.',
            to: '/services/metadata-indexing-and-taxonomy',
            icon: 'Bookmark',
            color: 'amber',
          },
          {
            title: 'OCR & Digitization',
            desc: 'High-fidelity scanning, searchable text & archival conversion.',
            to: '/services/ocr-and-digitization',
            icon: 'ScanText',
            color: 'emerald',
          },
          {
            title: 'Captioning & Audio Description',
            desc: 'WCAG-compliant video subtitles, closed captions & audio scripts.',
            to: '/services/captioning-transcription-and-audio-description',
            icon: 'Video',
            color: 'rose',
          },
        ],
      },
      {
        id: 'digital-accessibility',
        name: 'Digital Accessibility',
        icon: 'ShieldCheck',
        count: 1,
        subtopics: [
          {
            title: 'Digital Accessibility Services',
            desc: 'EPUB, Web, PDF, Word, PPT & Excel WCAG 2.2 AA/AAA compliance.',
            to: '/services/digital-accessibility',
            icon: 'ShieldCheck',
            color: 'emerald',
          },
        ],
      },
      {
        id: 'it-services',
        name: 'IT & Software',
        icon: 'Cpu',
        count: 4,
        subtopics: [
          {
            title: 'AI & Automation',
            desc: 'Practical AI pipelines, automated proofing & workflow bots.',
            to: '/services/ai-automation',
            icon: 'Bot',
            color: 'cyan',
          },
          {
            title: 'BI & Data Analytics',
            desc: 'Real-time executive dashboards, ETL pipelines & predictive BI.',
            to: '/services/data-analytics',
            icon: 'BarChart3',
            color: 'blue',
          },
          {
            title: 'Website Development',
            desc: 'Modern, responsive, accessible web portals & applications.',
            to: '/services/software-development',
            icon: 'Globe',
            color: 'indigo',
          },
          {
            title: 'Software Development',
            desc: 'Custom enterprise web apps, cloud APIs & bespoke systems.',
            to: '/services/software-development',
            icon: 'Terminal',
            color: 'purple',
          },
        ],
      },
      {
        id: 'digital-marketing',
        name: 'Digital Marketing',
        icon: 'Megaphone',
        count: 1,
        subtopics: [
          {
            title: 'Digital Marketing & Growth',
            desc: 'Data-driven SEO, multi-channel audience growth & conversion ROI.',
            to: '/services/digital-marketing',
            icon: 'Megaphone',
            color: 'pink',
          },
        ],
      },
    ],
    items: [
      { label: 'All Services (Overview)', to: '/services' },
      { label: 'ePublishing Services', to: '/services/epublishing' },
      { label: 'XML Services', to: '/services/xml' },
      { label: 'Digital Accessibility (EPUB 2 & 3, Web, PDF, Word, PowerPoint, Excel)', to: '/services/digital-accessibility' },
      { label: 'AI & Workflow Automation', to: '/services/ai-automation' },
      { label: 'Software & Web Development', to: '/services/software-development' },
      { label: 'Data Analytics & Business Intelligence', to: '/services/data-analytics' },
      { label: 'Digital Marketing & Growth', to: '/services/digital-marketing' },
      { label: 'Typesetting and Design', to: '/services/typesetting-and-design' },
      { label: 'Math and Equation Typesetting', to: '/services/math-and-equation-typesetting' },
      { label: 'Metadata, Indexing and Taxonomy', to: '/services/metadata-indexing-and-taxonomy' },
      { label: 'OCR and Digitization', to: '/services/ocr-and-digitization' },
      { label: 'Captioning, Transcription and Audio Description', to: '/services/captioning-transcription-and-audio-description' },
    ],
  },
  {
    label: 'Training',
    to: '/training',
    megaMenu: true,
    categories: [
      {
        id: 'internships',
        name: 'Internships & Careers',
        icon: 'Award',
        count: 1,
        subtopics: [
          {
            title: '⭐ Internship Program (Live Projects)',
            desc: 'Real-world live client projects with dedicated mentorship & certification.',
            to: '/training/internship-program',
            icon: 'Sparkles',
            color: 'amber',
          },
          
        ],
      },
      {
        id: 'publishing-accessibility',
        name: 'Publishing & Accessibility',
        icon: 'BookOpen',
        count: 2,
        subtopics: [
          {
            title: 'ePublishing Training',
            desc: 'Hands-on EPUB 3, XML tagging, InDesign production & editorial QA.',
            to: '/training/epublishing-training',
            icon: 'BookOpen',
            color: 'blue',
          },
          {
            title: 'Digital Accessibility Training',
            desc: 'Screen reader testing, WCAG 2.2 AA audit & PDF/UA remediation.',
            to: '/training/digital-accessibility-training',
            icon: 'ShieldCheck',
            color: 'emerald',
          },
        ],
      },
      {
        id: 'software-ai',
        name: 'Software & AI / ML',
        icon: 'Cpu',
        count: 3,
        subtopics: [
          {
            title: 'AI / ML Training',
            desc: 'Python machine learning, neural networks & predictive modeling.',
            to: '/training/ai-ml-training',
            icon: 'BrainCircuit',
            color: 'purple',
          },
          {
            title: 'Generative AI Training',
            desc: 'Prompt engineering, LLM integration & autonomous agent workflows.',
            to: '/training/generative-ai-training',
            icon: 'Bot',
            color: 'cyan',
          },
          {
            title: 'Software Development Training',
            desc: 'Full-stack web development, modern frameworks & cloud APIs.',
            to: '/training/software-development-training',
            icon: 'Code',
            color: 'indigo',
          },
        ],
      },
      {
        id: 'data-marketing',
        name: 'Data & Marketing',
        icon: 'BarChart3',
        count: 2,
        subtopics: [
          {
            title: 'Data Analytics & BI Training',
            desc: 'Power BI, SQL, Python data pipelines & decision dashboards.',
            to: '/training/data-analytics-bi-training',
            icon: 'BarChart3',
            color: 'blue',
          },
          {
            title: 'Digital Marketing Training',
            desc: 'Technical SEO, Google Ads, omnichannel growth & web telemetry.',
            to: '/training/digital-marketing-training',
            icon: 'Megaphone',
            color: 'rose',
          },
        ],
      },
    ],
    items: [
      { label: 'All Programs & Internships', to: '/training' },
      { label: '⭐ Internship Program (Live Projects)', to: '/training/internship-program' },
      { label: 'ePublishing Training', to: '/training/epublishing-training' },
      { label: 'AI/ML Training', to: '/training/ai-ml-training' },
      { label: 'Generative AI Training', to: '/training/generative-ai-training' },
      { label: 'Data Analytics & Business Intelligence', to: '/training/data-analytics-bi-training' },
      { label: 'Digital Accessibility Training', to: '/training/digital-accessibility-training' },
      { label: 'Software Development Training', to: '/training/software-development-training' },
      { label: 'Digital Marketing Training', to: '/training/digital-marketing-training' },
      { label: 'Apply / Enroll Now', to: '/training#enrollment-form-section' },
    ],
  },
  { label: 'Solutions', to: '/solutions' },
  {
    label: 'Resources',
    items: [
      { label: 'Insights', to: '/resources/insights' },
      { label: 'News & Events', to: '/resources/news-events' },
      { label: 'Case Studies', to: '/resources/case-studies' },
      { label: 'Client Testimonials', to: '/resources/client-testimonials' },
    ],
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

export const teamMembers = [
  {
    name: 'Iyshwariya Senthil',
    designation: 'Founder / Managing Director',
    department: 'Executive Leadership',
    bio: '“Iyshwariya has 7+ years of experience in publishing and accessibility and leads our executive leadership. She is certified in Universal Design and Publishing Operations.”',
    alt: 'Portrait of Iyshwariya Senthil, Founder / Managing Director',
    linkedin: 'https://www.linkedin.com/in/iyshwariya-senthil-bb7707287/',
  },
  {
    name: 'Rajesh Kumar',
    designation: 'Head of Accessibility',
    department: 'Digital Accessibility',
    bio: '“Rajesh has 9 years of experience in accessibility and leads our Digital Accessibility department. He is certified in CPACC and WAS.”',
    alt: 'Portrait of Rajesh Kumar, Head of Accessibility',
  },
  {
    name: 'Priya Raman',
    designation: 'Head of Production',
    department: 'Production',
    bio: '“Priya has 8 years of experience in publishing and leads our Production department. She is certified in Professional Editorial and Typesetting Standards.”',
    alt: 'Portrait of Priya Raman, Head of Production',
  },
  {
    name: 'Karthik Subramanian',
    designation: 'Head of Technology',
    department: 'Technology & AI',
    bio: '“Karthik has 10 years of experience in technology and leads our Technology department. He is certified in Cloud Architecture and AI Engineering.”',
    alt: 'Portrait of Karthik Subramanian, Head of Technology',
  },
  {
    name: 'Anand Natarajan',
    designation: 'Head of Operations',
    department: 'Operations',
    bio: '“Anand has 11 years of experience in publishing and technology and leads our Operations department. He is certified in Agile Operations and Information Security.”',
    alt: 'Portrait of Anand Natarajan, Head of Operations',
  },
  {
    name: 'Shanmugham',
    designation: 'Head of Digital Marketing',
    department: 'Digital Marketing',
    bio: '“Shanmugham has 12+ years of experience in marketing and leads our Digital Marketing department. He is certified in Advanced SEO and Strategic Growth.”',
    alt: 'Portrait of Shanmugham, Head of Digital Marketing',
  },
  {
    name: 'Hema',
    designation: 'Business Development Executive',
    department: 'Business Development & Client Relations',
    bio: '“Hema has 2+ years of experience in business development and client engagement. She specializes in strategic client partnerships, market expansion, and tailored service delivery.”',
    alt: 'Portrait of Hema, Business Development Executive',
  },
];

export const services = [
  {
    slug: 'epublishing',
    aliases: ['publishing-epublishing', 'epublishing-services'],
    title: 'ePublishing Services',
    pageTitle: 'ePublishing Services | Velvora Solutions',
    metaDesc: 'Conversion, formatting, and multi-format delivery of books and journals in EPUB 2/3, PDF, and web formats by Velvora Solutions.',
    heading: 'ePublishing Services: From Manuscript to Every Device',
    icon: 'BookOpen',
    short: 'Conversion, formatting, and multi-format delivery of books and journals in EPUB, PDF, and web formats.',
    buttonText: 'Request a Quote',
    overview:
      'Readers expect content on phones, tablets, e-readers, and the web. We prepare your content for all of them. Our ePublishing team converts and formats print and digital files into clean, standards-compliant outputs that work across platforms and retailers.',
    whatWeOffer: [
      { title: 'EPUB 2 and EPUB 3 Creation', desc: 'Reflowable and fixed-layout EPUBs for books, journals, and educational titles.' },
      { title: 'Print-to-Digital Conversion', desc: 'Scanned or print-ready files converted into editable, structured digital formats.' },
      { title: 'PDF Production', desc: 'Print-ready and interactive PDFs, including bookmarks, hyperlinks, and metadata.' },
      { title: 'Format Conversion', desc: 'Word, InDesign, XML, and PDF to EPUB, HTML, or other formats.' },
      { title: 'Metadata and Packaging', desc: 'Retailer-ready packaging for Kindle, Apple Books, Google Play Books, Kobo, and others.' },
      { title: 'Quality Validation', desc: 'EPUBCheck validation plus manual device testing.' },
    ],
    process: [
      { step: '1. Analyze', desc: 'We review your source files, requirements, and target platforms.' },
      { step: '2. Plan', desc: 'We agree on specifications, style rules, and timelines.' },
      { step: '3. Produce', desc: 'Our team converts and formats your content.' },
      { step: '4. Validate', desc: 'Automated and manual quality checks.' },
      { step: '5. Deliver', desc: 'Final files, delivered on time with a quality report.' },
    ],
    benefits: [
      '100% Guaranteed Retailer Acceptance on Amazon Kindle, Apple Books, Kobo, and Google Play',
      'Zero-Error EPUBCheck Certification and complete WCAG accessibility compliance',
      'Preserved editorial integrity for footnotes, multi-column layouts, and typography',
      'Global distribution ready with embedded ONIX metadata and retail packaging',
      'Rapid SLA turnaround for frontlist releases and high-volume backlist catalogues',
    ],
    whyVelvora: [
      'Specialist Publishing Craft: Deep domain expertise in book typography, grid layouts, and reader engines.',
      'Comprehensive Physical Device QA: Verified across iPads, Kindle Paperwhites, Android, and screen readers.',
      'High-Volume Conversion Capacity: Scalable pipelines capable of delivering 500+ titles per month without quality degradation.',
    ],
    whoItsFor: 'Book publishers, journal publishers, educational publishers, authors, and corporate content teams.',
    faqs: [
      { q: 'What digital book formats do you convert and support?', a: 'We produce and convert reflowable EPUB 3, fixed-layout EPUB 3, legacy EPUB 2, Kindle (KPF/MOBI), interactive PDFs, and accessible web editions.' },
      { q: 'Do your EPUB files pass EPUBCheck and retail store validation?', a: 'Yes, 100%. Every title is validated against the latest EPUBCheck standard and manually tested on real Apple Books, Kindle, Kobo, and Google Play devices before delivery.' },
      { q: 'Can you convert complex backlist print books or PDF archives to EPUB?', a: 'Absolutely. We handle high-volume backlist conversions from scanned hard copies, legacy PDFs, and InDesign packages, preserving footnotes, complex tables, and image layouts.' },
      { q: 'How do you handle multi-column layouts, poetry, and children’s picture books?', a: 'We design custom fixed-layout EPUBs with pixel-accurate CSS positioning, audio narration sync (read-aloud), and responsive font-scaling specifically tailored for complex visual layouts.' },
      { q: 'What is your typical turnaround time and delivery SLA for titles?', a: 'Standard book conversions typically take 3 to 5 business days, with rush express turnarounds available for time-sensitive frontlist publications and high-volume journal issues.' },
    ],
  },
  {
    slug: 'xml',
    aliases: ['xml-services'],
    title: 'XML Services',
    pageTitle: 'XML Services & Structured Content Workflows | Velvora Solutions',
    metaDesc: 'Structured XML creation, conversion (JATS, BITS, DITA, DocBook), and workflows that make your content reusable, searchable, and future-ready.',
    heading: 'XML Services: Structured Content That Lasts',
    icon: 'FileCode',
    short: 'Structured XML creation, conversion, and workflows that make your content reusable, searchable, and future-ready.',
    buttonText: 'Talk to Our XML Team',
    overview:
      "Well-structured XML is the foundation of efficient publishing. It lets you create content once and publish it many times, across print, web, EPUB, and beyond. Velvora's XML specialists build and convert content to industry-standard structures, so your content stays consistent, searchable, and easy to maintain.",
    whatWeOffer: [
      { title: 'XML Conversion', desc: 'Word, PDF, and InDesign files converted to XML.' },
      { title: 'Industry DTDs and Schemas', desc: 'JATS (journals), BITS (books), DITA, DocBook, TEI, and custom DTDs or schemas.' },
      { title: 'XML Tagging and Markup', desc: 'Detailed, accurate structural and semantic tagging.' },
      { title: 'XML Quality Assurance', desc: 'Validation against DTD or schema, plus manual review.' },
      { title: 'XML-First Workflow Setup', desc: 'Help planning and implementing XML-based publishing workflows.' },
      { title: 'Output Transformation', desc: 'XML to HTML, EPUB, PDF, and other formats using XSLT.' },
    ],
    benefits: [
      'Reuse content across formats and channels',
      'Faster updates and corrections',
      'Better searchability and discoverability',
      'Lower long-term production cost',
      'Easier accessibility compliance',
    ],
    process: [
      { step: '01. Analyze & Audit', desc: 'We inspect your input manuscripts, citation styles, and target DTD schemas.' },
      { step: '02. Schema Mapping', desc: 'We configure custom XSLT parsers, semantic tag mappings, and validation rules.' },
      { step: '03. Tagging & Conversion', desc: 'Our specialists extract structured elements, MathML, and Crossref metadata.' },
      { step: '04. Validation QA', desc: 'Rigorous automated DTD parsing, Schematron checks, and manual editorial verification.' },
      { step: '05. Delivery & Transformation', desc: 'Delivery of 100% valid XML packages ready for PubMed, Crossref, and web CMS.' },
    ],
    faqs: [
      { q: 'Which standard XML DTDs and schemas do you support?', a: 'We specialize in JATS 1.3, BITS 2.1, PubMed Central (PMC), DITA, DocBook 5, TEI, Crossref schema, and bespoke proprietary publisher XML DTDs.' },
      { q: 'Can you convert unstructured Word and PDF documents directly into JATS XML?', a: 'Yes. We extract semantic headings, author affiliations, ORCID IDs, bibliographic references, math equations, and tables into 100% schema-valid XML.' },
      { q: 'Do you validate XML files before delivery?', a: 'Yes. Every document undergoes automated Schematron and DTD parsing, Crossref DOI resolution checks, MathML syntax verification, and manual specialist editorial review.' },
      { q: 'Can you automate multi-format publishing (HTML, EPUB, PDF) from a single XML source?', a: 'Yes. We design custom XSLT stylesheets, automated publishing pipelines, and headless transformations that compile print PDFs, web HTML, and EPUBs from one master XML file.' },
      { q: 'Can you handle non-English languages and multilingual XML tagging?', a: 'Yes. Our XML pipelines fully support UTF-8 encoding, multi-script typography (including European languages, CJK, and Indic scripts), and language attribute tagging.' },
    ],
  },
  {
    slug: 'digital-accessibility',
    aliases: ['document-accessibility', 'website-accessibility', 'accessibility'],
    title: 'Digital Accessibility',
    pageTitle: 'Digital Accessibility Services | Velvora Solutions',
    metaDesc: 'Complete digital accessibility audits, remediation and creation for EPUB 2/3, web, PDF, Word, PowerPoint, and Excel conforming to WCAG 2.2, PDF/UA, and Section 508.',
    heading: 'Digital Accessibility Services: Content Everyone Can Use',
    icon: 'FileCheck2',
    short: 'Accessible EPUB 2 and EPUB 3, websites, PDF, Word, PowerPoint, and Excel files that meet WCAG, PDF/UA, and Section 508 standards.',
    buttonText: 'Get a Free Accessibility Consultation',
    overview:
      'More than a billion people worldwide live with some form of disability. Inaccessible content shuts them out, and it can expose organizations to legal and reputational risk. Velvora provides complete accessibility services, including audits, remediation, and new accessible content creation, across all major formats. Our specialists test with real assistive technologies such as JAWS, NVDA, VoiceOver, and TalkBack, not just automated tools.',
    standards:
      'WCAG 2.1 and 2.2 (Level A, AA), PDF/UA (ISO 14289), EPUB Accessibility 1.1, Section 508 (US), ADA, AODA (Canada), EN 301 549 and the European Accessibility Act (EU).',
    whatWeOffer: [
      {
        title: 'EPUB 3 & EPUB 2 Remediation',
        desc: 'Semantic HTML5 structure, ARIA roles, navigation documents, MathML, and full EPUBCheck certification.',
      },
      {
        title: 'PDF/UA & Document Accessibility',
        desc: 'ISO 14289-1 compliance, logical tag trees, PAC 2024 verification, and certified screen reader testing.',
      },
      {
        title: 'Web Apps & Enterprise Portals',
        desc: 'WCAG 2.2 AA / AAA audits, keyboard navigation, focus management, color contrast, and automated CI/CD checks.',
      },
      {
        title: 'Microsoft Office Conformance',
        desc: 'Accessible Word documents, PowerPoint decks, and Excel workbooks engineered with native accessibility hierarchies.',
      },
      {
        title: 'Multimedia Accessibility',
        desc: 'Synchronized captions, audio descriptions, multi-language transcripts, and media overlay integration.',
      },
      {
        title: 'VPAT & Conformance Reporting',
        desc: 'Comprehensive Section 508 and European Accessibility Act (EN 301 549) ACR reports for enterprise procurement.',
      },
    ],
    subServices: [
      {
        id: 'epub-3',
        title: 'EPUB 3 Accessibility',
        overview:
          'EPUB 3 is the modern standard for accessible e-books. It supports rich semantics, navigation, and accessibility metadata. We create and remediate EPUB 3 files so they meet EPUB Accessibility 1.1 and WCAG requirements.',
        whatWeDo: [
          'Semantic HTML5 structure with correct headings, lists, tables, and landmarks',
          'Alternative text for images, and long descriptions for complex images, charts, and diagrams',
          'ARIA roles and epub:type attributes for sections, notes, and page breaks',
          'Navigation document (table of contents, landmarks, and page-list)',
          'Print page-number markers for navigation matching the print edition',
          'MathML for mathematical content',
          'Accessible tables with proper header cells and scope',
          'Media overlays (synchronized text and audio) where needed',
          'Language declarations and correct reading order',
          'Accessibility metadata (schema.org) and conformance statements',
          'Validation with EPUBCheck, Ace by DAISY, and manual testing using screen readers and reading apps',
        ],
      },
      {
        id: 'epub-2',
        title: 'EPUB 2 Accessibility',
        overview:
          'Many publishers still have large libraries in EPUB 2. While EPUB 2 offers fewer built-in accessibility features, files can still be made much more usable. We improve existing EPUB 2 files, or upgrade them to EPUB 3 for the best accessibility results.',
        whatWeDo: [
          'Clean, logical XHTML structure and heading hierarchy',
          'Alternative text for all meaningful images',
          'Accurate NCX navigation file and table of contents',
          'Proper language and title metadata',
          'Accessible tables and lists',
          'Correct reading order and removal of layout-only markup',
          'Sufficient colour contrast and scalable text',
          'EPUB 2 to EPUB 3 upgrade for full accessibility support',
          'Validation and manual review',
        ],
      },
      {
        id: 'web',
        title: 'Web Accessibility',
        overview:
          'An accessible website is easier to use for everyone, improves SEO, and helps meet legal requirements. We audit, test, and remediate websites and web applications against WCAG 2.1 and 2.2.',
        whatWeDo: [
          'Accessibility Audit: Automated and manual testing of key templates and user journeys',
          'Screen Reader and Keyboard Testing: JAWS, NVDA, VoiceOver, TalkBack',
          'Code Remediation Guidance: Semantic HTML, ARIA, focus management, form labels, error messages',
          'Colour Contrast and Visual Design Review',
          'Accessible Forms, Menus, Modals, and Dynamic Content',
          'Mobile Accessibility Testing',
          'VPAT / ACR Preparation: Accessibility Conformance Reports for procurement',
          'Accessibility Statement drafting',
          'Ongoing Monitoring and re-testing',
        ],
      },
      {
        id: 'pdf',
        title: 'PDF Accessibility',
        overview:
          'PDFs are everywhere, and many are inaccessible. We remediate existing PDFs and create accessible PDFs that conform to PDF/UA and WCAG, so screen reader users can read, navigate, and fill them in.',
        whatWeDo: [
          'Tagging of all content: headings, paragraphs, lists, tables, and figures',
          'Correct logical reading order',
          'Alternative text for images, charts, and graphics',
          'Accessible tables with header cells and scope',
          'Bookmarks, links, and navigation aids',
          'Accessible form fields with labels, tooltips, and tab order',
          'Document title, language, and metadata settings',
          'OCR for scanned documents',
          'Colour contrast and font checks',
          'Validation using PAC, Adobe Acrobat Accessibility Checker, and the Matterhorn Protocol, plus screen reader testing',
        ],
      },
      {
        id: 'word',
        title: 'Word Accessibility',
        overview:
          'Accessibility starts at the source. A properly built Word document is the best starting point for accessible PDFs, web pages, and EPUBs. We remediate existing Word files and build accessible templates for your team.',
        whatWeDo: [
          'Proper use of built-in styles for headings, lists, and body text',
          'Alternative text for images, shapes, and charts',
          'Accessible tables with header rows and no merged or split cells',
          'Meaningful hyperlink text',
          'Document language, title, and properties',
          'Readable fonts, spacing, and colour contrast',
          'Accessible templates and style guides for your organization',
          'Microsoft Word Accessibility Checker validation and manual review',
        ],
      },
      {
        id: 'powerpoint',
        title: 'PowerPoint (PPT) Accessibility',
        overview:
          'Presentations rely heavily on visuals, which makes them hard for many people to use. We make PowerPoint files accessible for viewers using screen readers, keyboard navigation, and magnification.',
        whatWeDo: [
          'Unique, descriptive title on every slide',
          'Logical reading order for all slide elements',
          'Alternative text for images, SmartArt, charts, and icons',
          'Accessible tables and charts',
          'Colour contrast, font size, and animation review',
          'Captions and transcripts for embedded audio and video',
          'Meaningful hyperlink text',
          'Use of accessible slide layouts and templates',
          'Speaker notes review where relevant',
          'PowerPoint Accessibility Checker validation and manual testing',
        ],
      },
      {
        id: 'excel',
        title: 'Excel Accessibility',
        overview:
          'Spreadsheets can be complex for assistive technology users. We restructure Excel workbooks so data can be understood and navigated clearly.',
        whatWeDo: [
          'Meaningful worksheet names and a clear workbook structure',
          'Table formatting with defined header rows',
          'Removal of blank rows, blank columns, and unnecessary merged cells',
          'Alternative text for charts, images, and objects',
          'Descriptive cell labels, named ranges, and clear instructions',
          'Colour contrast and non-colour-dependent information',
          'Accessible forms, drop-downs, and input messages',
          'Hidden content and formula review',
          'Excel Accessibility Checker validation and screen reader testing',
        ],
      },
    ],
    process: [
      { step: '1. Assess', desc: 'We review your files and goals, and agree on the standard to meet.' },
      { step: '2. Audit', desc: 'Automated and manual testing, with a clear report of issues.' },
      { step: '3. Remediate', desc: 'Our specialists fix issues at the source whenever possible.' },
      { step: '4. Verify', desc: 'Testing with assistive technologies.' },
      { step: '5. Certify and Report', desc: 'Delivery of fixed files with an accessibility compliance report.' },
      { step: '6. Train and Support', desc: 'Optional training and ongoing support for your team.' },
    ],
    benefits: [
      '100% Guaranteed Conformance to WCAG 2.2 Level AA / AAA, PDF/UA, and Section 508',
      'Dual Verification: Automated scanner passes plus certified assistive tech testing (JAWS, NVDA, VoiceOver)',
      'Mitigate Legal & Regulatory Exposure under ADA Title III and the European Accessibility Act (EAA)',
      'Formal VPAT / ACR documentation delivered ready for government and institutional procurement',
      'High-velocity batch remediation pipelines for legacy back-catalogues and continuous publishing',
    ],
    whyVelvora: [
      'Certified Universal Design and IAAP-aligned accessibility engineering specialists',
      'Zero distortion of visual layout, branding aesthetics, or typographical precision',
      'Full multi-format coverage spanning EPUB, PDF, Web Apps, Word, PowerPoint, and Excel workbooks',
      'Direct integration with enterprise CMS and publishing workflows for automated compliance checks',
      'Dedicated compliance specialist assigned to every account with SLA-backed delivery turnaround',
    ],
    whoItsFor: 'Commercial book publishers, university presses, higher education institutions, government bodies, healthcare systems, and corporate communications teams.',
    whyItMatters: [
      { title: 'Reach more readers', desc: 'Include people with visual, hearing, motor, and cognitive disabilities.' },
      { title: 'Meet legal requirements', desc: 'Laws such as the ADA, Section 508, AODA, and the European Accessibility Act increasingly require accessible content, including e-books.' },
      { title: 'Better for everyone', desc: 'Clear structure improves search, navigation, and usability.' },
      { title: 'Strengthen your brand', desc: 'Show that your organization values inclusion.' },
    ],
    faqs: [
        {
            "q": "What is the difference between an accessibility audit and remediation?",
            "a": "An audit finds and documents non-compliance issues with detailed severity ratings. Remediation directly fixes the source files and tag trees to ensure full compliance. We offer both."
        },
        {
            "q": "Do you use only automated tools for accessibility testing?",
            "a": "No. Automated tools catch only a portion of issues. We always add comprehensive manual review and assistive technology testing with JAWS, NVDA, and VoiceOver."
        },
        {
            "q": "Can you make our existing back-catalogue accessible in bulk?",
            "a": "Yes. We handle both new content and high-volume back-catalogue projects, remediating PDFs, EPUBs, and office documents with guaranteed SLAs."
        },
        {
            "q": "Which international accessibility standards do you follow?",
            "a": "We strictly follow WCAG 2.1 and 2.2 (Level A, AA, AAA), PDF/UA (ISO 14289), EPUB Accessibility 1.1, Section 508, ADA Title III, and the European Accessibility Act (EAA)."
        },
        {
            "q": "Do you provide formal VPAT / ACR documentation upon completion?",
            "a": "Yes. Every project includes a compliance report, and we prepare formal VPAT / ACR documentation required for enterprise procurement and government contracts."
        }
    ],
  },
  {
    slug: 'typesetting-and-design',
    title: 'Typesetting and Design',
    pageTitle: 'Typesetting and Design Services for Books and Journals | Velvora Solutions',
    metaDesc: 'Professional typesetting, page layout, and design for books, journals, and reports. Print-ready and digital-ready files from Velvora Solutions.',
    heading: 'Typesetting and Design: Pages That Look Good and Work Everywhere',
    icon: 'Layers',
    short: 'Professional page layout for books, journals, and reports, ready for print and digital.',
    buttonText: 'Request a Typesetting Quote',
    overview:
      "Good design helps readers focus on your content. Velvora's typesetting team turns manuscripts into polished, consistent, publication-ready pages. We work with your style guides and house templates, and we build files that can be reused for print, PDF, EPUB, and web, so you do not pay twice for the same content.",
    whatWeOffer: [
      { title: 'Book Typesetting', desc: 'Fiction, non-fiction, textbooks, reference works, and academic monographs.' },
      { title: 'Journal Typesetting', desc: 'Article composition to your journal template, including proofs and corrections.' },
      { title: 'Page Layout and Composition', desc: 'Layout in Adobe InDesign, LaTeX, and other professional tools.' },
      { title: 'Template Design', desc: 'Custom, reusable templates for books, journals, and reports.' },
      { title: 'Cover and Jacket Design', desc: 'Covers that match your brand and your readers.' },
      { title: 'Figures, Charts and Illustrations', desc: 'Redrawing, cleaning, and creating clear, consistent artwork.' },
      { title: 'Tables and Complex Layouts', desc: 'Accurate setting of multi-column, rotated, and data-heavy tables.' },
      { title: 'Author and Editor Proof Cycles', desc: 'Managed proofing with tracked corrections and version control.' },
      { title: 'Print-Ready Files', desc: 'PDF/X files with correct bleed, colour profiles, and fonts for printers.' },
      { title: 'Tagged and Accessible Output', desc: 'Layouts built so accessible PDF and EPUB files can be produced from the same source.' },
    ],
    process: [
      { step: '1. Brief', desc: 'We review your style guide, templates, and requirements.' },
      { step: '2. Sample Pages', desc: 'We set a few pages for your approval before full production.' },
      { step: '3. Composition', desc: 'Full typesetting with consistent styles throughout.' },
      { step: '4. Proofing', desc: 'First proofs, corrections, and second proofs.' },
      { step: '5. Final Files', desc: 'Print-ready PDF, source files, and digital outputs.' },
    ],
    whyVelvora: [
      'Consistent, house-style-accurate pages',
      'Fewer proof rounds through careful first-pass quality',
      'Source files built for multi-format reuse',
      'Accessibility considered from the first layout, not added at the end',
      'Clear turnaround times and dedicated project contacts',
    ],
    whoItsFor: 'Book publishers, university presses, scholarly journals, societies, authors, and corporate communications teams.',
    faqs: [
        {
            "q": "Can you work to our existing publisher house style and InDesign templates?",
            "a": "Yes. We can strictly follow your in-house style manuals and template specifications, or design fresh, modern grid systems tailored to your brand."
        },
        {
            "q": "Which composition software and platforms do you operate in?",
            "a": "We work in Adobe InDesign, QuarkXPress, LaTeX, and 3B2 (Advent Arbortext), handling high-complexity academic, trade, and corporate publications."
        },
        {
            "q": "Can the same typesetting files be used for EPUB and accessible PDF generation?",
            "a": "Yes. We construct InDesign files with rigorous paragraph styles, object exports, and XML tags so they convert seamlessly into reflowable EPUB 3 and accessible tagged PDF."
        },
        {
            "q": "How do you handle complex math, scientific tables, and multilingual scripts?",
            "a": "We use dedicated equation editors (MathType, LaTeX) and advanced tabular composition tools, ensuring perfect typographical kerning, alignment, and diacritic rendering."
        },
        {
            "q": "What review and proofing stages are included in your typesetting workflow?",
            "a": "We provide structured First Proofs (galley proofs), Author Correction passes, and Final Press-Ready PDF sign-offs with detailed revision comparison tracking."
        }
    ],
  },
  {
    slug: 'math-and-equation-typesetting',
    title: 'Math and Equation Typesetting',
    pageTitle: 'Math Typesetting, LaTeX and MathML Services | Velvora Solutions',
    metaDesc: 'Accurate math and equation typesetting in LaTeX and MathML for STEM books and journals, including accessible math for EPUB, PDF, and web.',
    heading: 'Math and Equation Typesetting: Precision for STEM Content',
    icon: 'Sigma',
    short: 'Accurate LaTeX and MathML for STEM content, accessible to every reader.',
    buttonText: 'Talk to Our Math Team',
    overview:
      "Mathematical content demands accuracy. A single misplaced symbol can change the meaning of an equation. Velvora's math specialists typeset, convert, and validate equations for books, journals, and course material, and make sure math is accessible to readers who use screen readers and Braille displays.",
    whatWeOffer: [
      { title: 'LaTeX Typesetting', desc: 'Complete composition of mathematics, physics, chemistry, engineering, and computer science content.' },
      { title: 'MathType and Word Equation Editing', desc: 'Clean-up and conversion of equations in Word documents.' },
      { title: 'MathML Creation and Conversion', desc: 'LaTeX, MathType, and image-based equations converted to MathML.' },
      { title: 'Image-to-Math Conversion', desc: 'Equations that exist only as pictures rebuilt as editable, accessible math.' },
      { title: 'Chemical Structures and Formulae', desc: 'Accurate setting of chemical equations and structures.' },
      { title: 'Equation Numbering and Cross-References', desc: 'Consistent numbering, linking, and referencing.' },
      { title: 'Web-Ready Math', desc: 'Equations prepared for display with MathJax or native browser support.' },
      { title: 'Accessible Math for EPUB 3', desc: 'MathML with descriptive alternatives so screen readers can read equations correctly.' },
      { title: 'Accessible Math in PDF', desc: 'Tagged math with alternative text for PDF/UA compliance.' },
      { title: 'Math QA', desc: 'Independent checking of every equation against the source.' },
    ],
    subjects: 'Mathematics, statistics, physics, chemistry, engineering, computer science, economics, and education.',
    process: [
      { step: '1. Source Review', desc: 'We check your files, formats, and notation conventions.' },
      { step: '2. Conversion or Typesetting', desc: 'Equations are typeset or converted to the target format.' },
      { step: '3. Equation Verification', desc: 'Every equation is compared against the original.' },
      { step: '4. Accessibility Testing', desc: 'Checked with screen readers and math-capable tools.' },
      { step: '5. Delivery', desc: 'Final files with a quality summary.' },
    ],
    whyVelvora: [
      'Specialists who understand mathematical notation',
      'Careful verification of every equation',
      'Math that remains readable on all devices and by assistive technology',
      'One workflow for print, EPUB, web, and PDF',
    ],
    faqs: [
        {
            "q": "Why is MathML essential for STEM accessibility?",
            "a": "MathML describes the mathematical and structural meaning of an equation, allowing screen readers and Braille embossers to read it accurately. Equations saved as images cannot be read in the same way."
        },
        {
            "q": "Can you convert our old image-based equations into editable MathML or LaTeX?",
            "a": "Yes. We rebuild legacy bitmap equations and low-resolution screenshots into editable LaTeX syntax or clean, scalable MathML vectors."
        },
        {
            "q": "Do you support both Inline and Display equations in complex journal formats?",
            "a": "Yes. We format both inline mathematical variables and numbered display equations, adhering to AMS-LaTeX, MathJax, and journal-specific DTD requirements."
        },
        {
            "q": "How do your editors verify formula accuracy in advanced physics and engineering?",
            "a": "Our team includes STEM specialists trained in higher mathematics, chemical formulas, and physics notations, ensuring zero typographical transposition errors."
        },
        {
            "q": "Can MathML equations be embedded directly into EPUB 3 and web HTML5?",
            "a": "Yes. We embed native MathML into EPUB 3 and HTML5 files with fallback SVG vectors to ensure seamless cross-browser and e-reader compatibility."
        }
    ],
  },
  {
    slug: 'metadata-indexing-and-taxonomy',
    title: 'Metadata, Indexing and Taxonomy',
    pageTitle: 'Metadata, Indexing and Taxonomy Services | Velvora Solutions',
    metaDesc: 'Book indexing, metadata creation, subject classification, and taxonomy services that improve discoverability for publishers and organizations.',
    heading: 'Metadata, Indexing and Taxonomy: Help Readers Find Your Content',
    icon: 'Tags',
    short: 'Indexes, metadata, and subject tagging that help readers and search engines find your content.',
    buttonText: 'Get a Metadata or Indexing Quote',
    overview:
      'Great content is only valuable if people can find it. Velvora creates the indexes, metadata, and classification systems that make books, journals, and documents easier to discover, search, and sell. We support publishers, libraries, and enterprises with accurate, consistent, and standards-based descriptions of their content.',
    whatWeOffer: [
      {
        category: 'Indexing',
        items: [
          'Back-of-book indexes for academic, trade, and professional titles',
          'Journal and periodical indexes',
          'Index editing and clean-up',
          'Embedded indexes for InDesign and Word',
          'Linked indexes for EPUB and PDF',
        ],
      },
      {
        category: 'Metadata Creation',
        items: [
          'Book metadata in ONIX for retailers and distributors',
          'Dublin Core and other standard schemes',
          'Journal article metadata for JATS XML and indexing services',
          'Accessibility metadata for EPUB (schema.org)',
          'Keywords, abstracts, and descriptions written for search',
          'Metadata quality audits and clean-up',
        ],
      },
      {
        category: 'Subject Classification and Taxonomy',
        items: [
          'Assignment of BISAC, Thema, and other subject codes',
          'Custom taxonomy and controlled vocabulary design',
          'Content tagging for digital libraries and platforms',
          'Keyword and entity extraction',
        ],
      },
      {
        category: 'Reference and Citation Support',
        items: [
          'Reference checking and formatting to your required style',
          'DOI and link verification',
          'Citation clean-up and linking',
        ],
      },
    ],
    process: [
      { step: '1. Understand', desc: 'We learn your audience, platform, and standards.' },
      { step: '2. Define', desc: 'We agree on rules, schemes, and quality criteria.' },
      { step: '3. Create', desc: 'Our indexers and metadata specialists produce the output.' },
      { step: '4. Review', desc: 'Editorial and technical quality checks.' },
      { step: '5. Deliver', desc: 'Final files in the format your systems need.' },
    ],
    benefits: [
      'Better discoverability in search and retailer platforms',
      'Faster, easier navigation for readers',
      'Consistent data across all your titles',
      'Cleaner feeds to distributors, libraries, and aggregators',
      'Support for compliance and accessibility requirements',
    ],
    faqs: [
        {
            "q": "What classification taxonomies and subject schemas do you utilize?",
            "a": "We work with BISAC, BIC/THEMA, Library of Congress (LCSH), MeSH (Medical Subject Headings), Dewey Decimal, and custom corporate taxonomies."
        },
        {
            "q": "Can you create back-of-the-book indexes for academic monographs and trade titles?",
            "a": "Yes. Professional indexers analyze your manuscript to build comprehensive subject, author, and citation indexes with accurate locators and cross-references."
        },
        {
            "q": "Can you clean up and enrich our existing catalog metadata?",
            "a": "Yes. We audit, normalize, and enrich existing catalog databases, appending missing ONIX 3.0 tags, ISBNs, DOIs, contributor roles, and rich marketing descriptions."
        },
        {
            "q": "Do you support ONIX for Books 3.0 packaging for global book retailers?",
            "a": "Yes. We generate and validate ONIX 3.0 XML feeds tailored to specifications for Amazon, Ingram, Baker & Taylor, Nielsen BookScan, and European distributors."
        },
        {
            "q": "Do you provide indexing and metadata services for non-English publications?",
            "a": "Yes. We provide indexing and multilingual metadata tagging across major European languages and regional scripts upon consultation."
        }
    ],
  },
  {
    slug: 'ocr-and-digitization',
    title: 'OCR and Digitization',
    pageTitle: 'OCR and Digitization Services for Books, Journals and Archives | Velvora Solutions',
    metaDesc: "Convert print books, journals, and archives into searchable, editable, accessible digital content with Velvora's OCR and digitization services.",
    heading: 'OCR and Digitization: Bring Your Print Content Into the Digital World',
    icon: 'ScanText',
    short: 'Turn print books, journals, and archives into searchable, editable digital content.',
    buttonText: 'Send Us a Sample for Review',
    overview:
      'Print archives hold valuable knowledge, but they are hard to search, share, and preserve. Velvora digitizes and converts printed and scanned content into accurate, structured, and accessible digital files. We also convert old or inaccessible digital files into modern formats.',
    whatWeOffer: [
      { title: 'Scanning and Image Capture', desc: 'High-quality scanning of books, journals, and documents.' },
      { title: 'OCR (Optical Character Recognition)', desc: 'Text recognition from scanned pages and image PDFs.' },
      { title: 'OCR Correction and Proofreading', desc: 'Human review to fix recognition errors and reach high accuracy.' },
      { title: 'Searchable PDF Creation', desc: 'Scanned documents turned into searchable PDFs.' },
      { title: 'Conversion to XML, EPUB and HTML', desc: 'Structured digital output from legacy content.' },
      { title: 'Layout Recreation', desc: 'Rebuilding the layout, tables, and figures of the original.' },
      { title: 'Archive Digitization', desc: 'Old journals, newspapers, theses, manuals, and manuscripts.' },
      { title: 'Data Capture and Data Entry', desc: 'Extraction of data from forms, tables, and documents.' },
      { title: 'Back-Catalogue Conversion', desc: 'Large-scale conversion of publishing backlists.' },
      { title: 'Accessible Output', desc: 'Tagged PDFs and EPUBs created from digitized content.' },
    ],
    process: [
      { step: '1. Assess', desc: 'We review sample pages, condition, and target outputs.' },
      { step: '2. Capture', desc: 'Scanning or preparing existing images.' },
      { step: '3. Recognize', desc: 'OCR with specialized tools.' },
      { step: '4. Correct', desc: 'Manual proofreading and structural tagging.' },
      { step: '5. Validate', desc: 'Quality sampling and format checks.' },
      { step: '6. Deliver', desc: 'Final files with a quality report.' },
    ],
    whyVelvora: [
      'Combination of automated OCR and human proofreading',
      'Scalable teams for large archives',
      'Output ready for XML, EPUB, accessible PDF, and web publishing',
      'Secure handling of valuable and confidential material',
    ],
    faqs: [
        {
            "q": "Is OCR text alone sufficient to make a digital document accessible?",
            "a": "No. Raw OCR provides unstructured character streams. True accessibility requires logical heading hierarchies, proper reading order, tagged tables, and descriptive alt text."
        },
        {
            "q": "Can you process fragile, aged, or low-contrast historical archives?",
            "a": "Yes. We utilize advanced image pre-processing (deskew, binarization, artifact removal, background contrast enhancement) before multi-pass OCR recognition."
        },
        {
            "q": "What accuracy guarantee do you provide for scanned documents?",
            "a": "We achieve 99.9% character accuracy through multi-engine optical recognition paired with human editorial proofreading and word-frequency validation."
        },
        {
            "q": "What output file formats can you deliver from digitization projects?",
            "a": "We deliver Searchable PDF (PDF/A), structured XML/HTML, editable Word DOCX, and fully formatted EPUB 3 files with embedded high-resolution scans."
        },
        {
            "q": "How do you handle non-standard fonts, fraktur, and mathematical notations in OCR?",
            "a": "We employ custom OCR training dictionaries and manual editorial transcription for historic typefaces, mathematical symbols, and non-Latin character sets."
        }
    ],
  },
  {
    slug: 'captioning-transcription-and-audio-description',
    title: 'Captioning, Transcription and Audio Description',
    pageTitle: 'Captioning, Transcription and Audio Description Services | Velvora Solutions',
    metaDesc: 'Accurate closed captions, subtitles, transcripts, and audio description for video, audio, and eLearning content, aligned with WCAG.',
    heading: 'Captioning, Transcription and Audio Description: Make Every Video and Audio File Accessible',
    icon: 'Video',
    short: 'Accurate captions, transcripts, and audio description for video and audio content.',
    buttonText: 'Get a Captioning Quote',
    overview:
      'Video and audio are now central to learning, marketing, and publishing. But without captions, transcripts, and audio description, they exclude people who are deaf, hard of hearing, blind, or have low vision. They also help people watching in noisy places or in a second language. Velvora provides complete multimedia accessibility services aligned with WCAG.',
    whatWeOffer: [
      {
        category: 'Captioning',
        items: [
          'Closed captions for video, webinars, and eLearning',
          'Open captions burned into video',
          'Subtitles for your video content',
          'Caption files in SRT, WebVTT, TTML, and other formats',
          'Caption review and correction for existing captions',
        ],
      },
      {
        category: 'Transcription',
        items: [
          'Verbatim and clean-read transcripts',
          'Speaker identification and time codes',
          'Transcripts for podcasts, interviews, lectures, and meetings',
          'Accessible transcript formats (HTML, Word, accessible PDF)',
        ],
      },
      {
        category: 'Audio Description',
        items: [
          'Standard and extended audio description',
          'Written audio description scripts',
          'Voiced audio description tracks',
          'Text-based descriptions for web video',
        ],
      },
      {
        category: 'Accessible Media Players and Delivery',
        items: [
          'Guidance on accessible video and audio players',
          'Keyboard-accessible controls and caption settings',
          'Audio and media overlays for EPUB 3',
        ],
      },
    ],
    wcagRequirements: [
      'Captions for pre-recorded and live audio content',
      'Transcripts or alternatives for audio-only and video-only content',
      'Audio description or media alternative for pre-recorded video',
      'Clear, accurate synchronization and speaker identification',
    ],
    process: [
      { step: '1. Review', desc: 'We check your media, length, and target standards.' },
      { step: '2. Create', desc: 'Captions, transcripts, or descriptions are produced by trained specialists.' },
      { step: '3. Quality Check', desc: 'Review for accuracy, timing, and readability.' },
      { step: '4. Deliver', desc: 'Files in your preferred formats, ready to upload.' },
    ],
    benefits: [
      'Meet accessibility laws and procurement requirements',
      'Reach deaf, hard of hearing, blind, and low-vision audiences',
      'Improve search, engagement, and understanding',
      'Support learners using a second language',
    ],
    faqs: [
        {
            "q": "What is the difference between closed captions and subtitles?",
            "a": "Closed captions include dialogue and important sounds (music, sound effects, speaker ID) for people who cannot hear audio. Subtitles translate or transcribe spoken dialogue only."
        },
        {
            "q": "What is audio description (described video) and when is it required?",
            "a": "Audio description is spoken narration of important visual information (actions, facial expressions, on-screen text) during natural pauses in dialogue for blind users."
        },
        {
            "q": "What caption and subtitle file formats do you deliver?",
            "a": "We provide WebVTT (.vtt), SubRip (.srt), Scenarist (.scc), SMPTE-TT, DFXP, and burnt-in open captions matching all LMS and video streaming platforms."
        },
        {
            "q": "What accuracy rate do you guarantee for verbatim transcripts?",
            "a": "We deliver 99%+ verbatim and clean-read transcripts through professional human transcriptionists who verify industry jargon, accents, and multiple speakers."
        },
        {
            "q": "Do your captioning services comply with WCAG 2.2 AA and FCC standards?",
            "a": "Yes. Our captions strictly adhere to WCAG 2.2 AA Criteria (1.2.2, 1.2.4), FCC television standards, and Section 508 accessibility guidelines for video."
        }
    ],
  },
  {
    slug: 'ai-automation',
    aliases: ['ai', 'automation', 'ai-and-automation', 'ai-services'],
    title: 'AI and Automation Services',
    pageTitle: 'AI & Workflow Automation Services | Velvora Solutions',
    metaDesc: 'Practical AI pipelines, intelligent document processing, NLP extraction, and human-in-the-loop automated QA workflows engineered by Velvora Solutions.',
    heading: 'AI & Workflow Automation: Accelerate Delivery with Cognitive Pipelines',
    icon: 'Bot',
    short: 'Practical AI and workflow automation that eliminates manual bottlenecks, cuts processing cycle time by up to 70%, and ensures uncompromising output quality.',
    buttonText: 'Automate Your Workflows',
    overview:
      'Modern publishing and enterprise content operations cannot afford manual data re-keying, slow format transformations, or error-prone proofing. Velvora integrates cognitive AI pipelines, intelligent document processing (IDP), and automated QA verification into existing production environments. We combine machine speed with specialized human-in-the-loop validation to ensure complete structural and semantic accuracy.',
    whatWeOffer: [
      { title: 'Intelligent Document Processing (IDP)', desc: 'Automated ingestion of scanned manuscripts, unstructured PDFs, and complex legacy documents into structured formats.' },
      { title: 'Cognitive NLP & Entity Extraction', desc: 'Automated indexing, metadata tagging, key entity extraction, and taxonomy classification.' },
      { title: 'Automated Accessibility QA', desc: 'Machine-assisted alt text draft generation, reading order verification, and contrast checks with human audit approval.' },
      { title: 'Production Pipeline Automation', desc: 'API-driven ingestion and automated XSLT/XML validation loops that reduce manual touchpoints by over 70%.' },
      { title: 'Custom LLM & Prompt Workflows', desc: 'Domain-specific prompt engineering, automated summary generation, and localized translation pipelines.' },
      { title: 'Continuous Quality Monitoring', desc: 'Machine telemetry dashboards tracking throughput, error rates, and human verification bottlenecks.' }
    ],
    benefits: [
      'Up to 70% reduction in document processing time',
      'Elimination of repetitive manual re-keying and copy errors',
      'Consistent structural and metadata compliance',
      'Scalable throughput during seasonal volume spikes',
      '100% human-verified quality assurance guarantee'
    ],
    process: [
      { step: '1. Workflow Audit', desc: 'We map your current content production bottlenecks and identify high-ROI automation targets.' },
      { step: '2. Pipeline Design', desc: 'We architect custom AI modules, schema validators, and human review gates.' },
      { step: '3. Prototype & Test', desc: 'We benchmark automated accuracy against your verified golden sample files.' },
      { step: '4. Production Integration', desc: 'We deploy pipelines into your cloud, FTP, or editorial management systems.' },
      { step: '5. Continuous Optimization', desc: 'Ongoing fine-tuning to elevate automation accuracy and processing throughput.' }
    ],
    faqs: [
        {
            "q": "How do you guarantee accuracy and prevent hallucinations in automated pipelines?",
            "a": "We enforce strict human-in-the-loop verification. AI handles high-speed extraction and preliminary structuring, while verified subject-matter specialists review and approve outputs before final delivery."
        },
        {
            "q": "Can your AI pipelines integrate with our existing CMS or DAM?",
            "a": "Yes. We build modern RESTful API connectors, automated FTP watchers, and webhooks that link directly to your existing content management systems."
        },
        {
            "q": "Is our sensitive company data kept confidential and secure?",
            "a": "Strictly yes. All models operate within secure, isolated environments with full non-disclosure protection. Your proprietary content is never used to train public models."
        },
        {
            "q": "What common publishing and document workflows do you automate?",
            "a": "We automate metadata extraction, XML tagging, citation validation, language translation assistance, automated PDF preflighting, and content summarization."
        },
        {
            "q": "What is the typical timeframe to deploy a custom automation pipeline?",
            "a": "Initial pilot prototypes are typically deployed within 1 to 2 weeks, with full production integration and SLA monitoring completed within 4 to 6 weeks."
        }
    ]
  },
  {
    slug: 'software-development',
    aliases: ['software', 'website-development', 'web-development', 'custom-software'],
    title: 'Software & Web Development',
    pageTitle: 'Software & Web Development Services | Velvora Solutions',
    metaDesc: 'Resilient full-stack web applications, React interfaces, cloud microservices, and accessible modern interfaces designed for enterprise reliability by Velvora Solutions.',
    heading: 'Software & Web Development: Smarter, Scalable Digital Architecture',
    icon: 'Code',
    short: 'Resilient full-stack web applications, scalable cloud architectures, and accessible modern interfaces designed for enterprise reliability.',
    buttonText: 'Build Your Application',
    overview:
      'Digital products demand uncompromising stability, responsive user experiences, and universal accessibility from day one. Velvora engineers bespoke web applications, enterprise portals, cloud microservices, and content platforms using modern React, Node.js, Python, and cloud infrastructure. We bridge technical precision with accessible design systems to deliver platforms that perform at global scale.',
    whatWeOffer: [
      { title: 'Custom Web Applications', desc: 'High-performance single-page and server-rendered web applications built on React and modern frameworks.' },
      { title: 'Accessible UI Systems & Design Systems', desc: 'Enterprise component libraries strictly compliant with WCAG 2.2 AA standards and ARIA best practices.' },
      { title: 'Cloud APIs & Microservices', desc: 'Scalable RESTful and GraphQL backend architectures engineered for high-concurrency content delivery.' },
      { title: 'CMS & Publishing Platforms', desc: 'Headless CMS implementations, custom publishing portals, and editorial workflow applications.' },
      { title: 'Legacy Modernization', desc: 'Refactoring outdated codebases into modular, testable, and cloud-native microservices.' },
      { title: 'Security & DevOps', desc: 'Automated CI/CD deployment pipelines, containerization (Docker), and cloud infrastructure management.' }
    ],
    benefits: [
      'Accessible by design across all assistive devices',
      'Scalable cloud architecture engineered for enterprise growth',
      'Rapid release cycles powered by modern CI/CD automation',
      'Clean, maintainable, and fully documented source code',
      'Zero vendor lock-in with open, modern standards'
    ],
    process: [
      { step: '1. Discovery & Architecture', desc: 'Technical requirements gathering, system architecture planning, and UX wireframing.' },
      { step: '2. Agile Sprint Delivery', desc: 'Rapid, iterative sprint cycles with continuous demo reviews and automated testing.' },
      { step: '3. Accessibility & Security QA', desc: 'Full automated and manual screen-reader auditing alongside penetration and load testing.' },
      { step: '4. Production Deployment', desc: 'Zero-downtime deployment to your preferred cloud environment (AWS, Azure, Vercel).' },
      { step: '5. Ongoing SLA Support', desc: 'Continuous monitoring, performance tuning, and technical maintenance.' }
    ],
    faqs: [
        {
            "q": "What tech stack does your development engineering team specialize in?",
            "a": "Our core stack includes React, TypeScript, Next.js, Node.js, Express, Python/FastAPI, PostgreSQL, MongoDB, Docker, and modern AWS/Vercel cloud architectures."
        },
        {
            "q": "How do you guarantee web applications meet WCAG 2.2 AA accessibility standards?",
            "a": "Accessibility is embedded into our development process, from keyboard navigability and ARIA landmarks to screen-reader verification with JAWS and NVDA."
        },
        {
            "q": "Can you augment our existing in-house development team?",
            "a": "Absolutely. We offer dedicated team augmentation, specialized full-stack sprint squads, and complete end-to-end turnkey software project delivery."
        },
        {
            "q": "What development methodology and code quality standards do you follow?",
            "a": "We practice Agile/Scrum with bi-weekly sprints, comprehensive automated unit testing, strict GitHub pull request reviews, and continuous CI/CD integration."
        },
        {
            "q": "Do you provide post-launch maintenance, monitoring, and SLA support?",
            "a": "Yes. We offer 24/7 uptime monitoring, security patching, API version updates, database optimization, and guaranteed response SLAs for production systems."
        }
    ]
  },
  {
    slug: 'data-analytics',
    aliases: ['analytics', 'business-intelligence', 'bi', 'data'],
    title: 'Data Analytics & Business Intelligence',
    pageTitle: 'Data Analytics & Business Intelligence Services | Velvora Solutions',
    metaDesc: 'Executive telemetry dashboards, predictive modeling, ETL data pipelines, and actionable business intelligence engineered by Velvora Solutions.',
    heading: 'Data Analytics & BI: Turn Complex Data into Decisive Action',
    icon: 'BarChart3',
    short: 'Executive telemetry dashboards, predictive modeling, ETL data pipelines, and actionable business intelligence that turn data into decisions.',
    buttonText: 'Unlock Your Data',
    overview:
      'Enterprises and publishers generate massive volumes of reader telemetry, operational data, and financial transactions. Without structured analysis, valuable insights remain trapped in silos. Velvora designs end-to-end data pipelines, predictive models, and interactive executive dashboards that transform complex numbers into strategic clarity and measurable growth.',
    whatWeOffer: [
      { title: 'Executive BI Dashboards', desc: 'Real-time interactive visualizations and KPI tracking built on Power BI, Tableau, or custom React interfaces.' },
      { title: 'ETL Data Pipeline Engineering', desc: 'Automated data extraction, cleaning, transformation, and warehouse loading from disparate enterprise sources.' },
      { title: 'Publishing & Content Telemetry', desc: 'Reader engagement analytics, format adoption tracking, and royalty accounting intelligence.' },
      { title: 'Predictive Modeling & Forecasting', desc: 'Machine learning algorithms forecasting demand trends, customer churn, and inventory requirements.' },
      { title: 'Data Cleaning & Normalization', desc: 'Standardizing messy legacy databases into clean, query-ready enterprise repositories.' },
      { title: 'Conversion & ROI Analytics', desc: 'Deep-funnel attribution and user journey tracking to optimize marketing and operational spend.' }
    ],
    benefits: [
      'Real-time visibility into mission-critical KPIs',
      'Automated reporting saving hundreds of manual staff hours',
      'Data-backed strategic decision-making with high confidence',
      'Unified single source of truth across all business departments',
      'Accessible, color-blind-compliant dashboard visualizations'
    ],
    process: [
      { step: '1. Data Audit', desc: 'We inventory your data sources, schemas, and analytical requirements.' },
      { step: '2. Pipeline Engineering', desc: 'We build secure, automated ETL connectors to ingest and clean raw data.' },
      { step: '3. Modeling & Visual Design', desc: 'We structure dimensional models and design intuitive, accessible dashboards.' },
      { step: '4. Validation & Training', desc: 'We verify metrics accuracy against source records and train your team on dashboard usage.' },
      { step: '5. Automated Telemetry', desc: 'Scheduled automated refreshes and alert notifications when key thresholds are reached.' }
    ],
    faqs: [
        {
            "q": "Can your analytics team connect to our custom proprietary databases and cloud lakes?",
            "a": "Yes. We engineer custom API connectors, SQL queries, and webhook listeners for proprietary databases (PostgreSQL, MySQL, SQL Server, Snowflake, BigQuery) and cloud storage buckets."
        },
        {
            "q": "Which BI visualization platforms do you build dashboards in?",
            "a": "We build interactive, executive-grade dashboards in Microsoft Power BI, Tableau, Looker Studio, and custom web dashboards using React and D3.js."
        },
        {
            "q": "Are your dashboard visualizations accessible for color-blind users?",
            "a": "Yes. We apply Universal Design principles, utilizing CVD-safe high-contrast color palettes, textural distinctions, and assistive-technology-compatible data tables."
        },
        {
            "q": "How frequently can our business intelligence dashboards refresh data?",
            "a": "Dashboards can be configured for real-time streaming telemetry, hourly scheduled micro-batches, or automated overnight ETL synchronization based on your operational needs."
        },
        {
            "q": "Do you provide executive training and documentation on how to use the dashboards?",
            "a": "Yes. Every BI project includes comprehensive user documentation, data dictionary definitions, and live hands-on training sessions for your leadership team."
        }
    ]
  },
  {
    slug: 'digital-marketing',
    aliases: ['marketing', 'seo', 'seo-optimization', 'digital-marketing-services'],
    title: 'Digital Marketing & Growth',
    pageTitle: 'Digital Marketing & SEO Services | Velvora Solutions',
    metaDesc: 'Technical SEO audits, structured schema markup, omnichannel growth campaigns, content marketing, and conversion telemetry crafted by Velvora Solutions.',
    heading: 'Digital Marketing & Growth: Reach Global Audiences with Measurable Impact',
    icon: 'Megaphone',
    short: 'Data-driven SEO, strategic omnichannel campaigns, content marketing, and conversion telemetry crafted to expand reach and drive measurable ROI.',
    buttonText: 'Grow Your Audience',
    overview:
      'High-quality content deserves an engaged audience. In an era of algorithm shifts and crowded search results, organic discovery requires technical precision, structured data markup, and authentic audience engagement. Velvora delivers comprehensive digital marketing solutions that combine technical SEO, content strategy, paid advertising, and attribution analytics to drive sustainable growth.',
    whatWeOffer: [
      { title: 'Technical SEO & Rich Snippets', desc: 'Deep technical audits, crawlability optimization, core web vitals remediation, and JSON-LD schema markup.' },
      { title: 'Search Engine Marketing (PPC)', desc: 'High-intent Google Search and display advertising campaigns focused on low acquisition costs and high ROI.' },
      { title: 'Omnichannel Social Media Strategy', desc: 'Strategic audience building across LinkedIn, X, Meta channels, and specialized professional communities.' },
      { title: 'Content Marketing & Thought Leadership', desc: 'Authoritative white papers, educational articles, and case snapshots that establish brand credibility.' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'A/B testing, heatmap analysis, and friction-free user journeys that convert visitors into active clients.' },
      { title: 'Attribution & Performance Telemetry', desc: 'Transparent reporting tracking cost-per-lead, pipeline attribution, and lifetime client value.' }
    ],
    benefits: [
      'Higher organic search rankings for competitive commercial keywords',
      'Consistent inbound lead generation from qualified prospects',
      'Lower cost-per-acquisition through continuous campaign optimization',
      'Enhanced brand authority and industry thought leadership',
      'Transparent, data-backed ROI reporting with zero vanity metrics'
    ],
    process: [
      { step: '1. Landscape Audit', desc: 'We analyze your website health, competitor keywords, and current conversion funnels.' },
      { step: '2. Strategy Roadmap', desc: 'We define target audience personas, high-intent keyword targets, and channel allocations.' },
      { step: '3. Technical & Content Setup', desc: 'We fix on-page crawl issues, implement structured schemas, and craft campaign assets.' },
      { step: '4. Campaign Launch', desc: 'We deploy multi-channel campaigns with real-time conversion tracking and budget guardrails.' },
      { step: '5. Analyze & Scale', desc: 'Continuous testing and weekly optimizations to scale high-performing channels.' }
    ],
    faqs: [
        {
            "q": "How does technical SEO benefit our publishing, education, or technology platform?",
            "a": "Technical SEO ensures search engines index every title, paper, and service page accurately. Implementing rich JSON-LD schemas enables Google Rich Snippets, boosting click-through rates by up to 30%."
        },
        {
            "q": "How frequently do you provide performance analytics and ROI reporting?",
            "a": "Clients receive 24/7 dashboard access alongside weekly campaign insights and comprehensive monthly executive briefing reports highlighting organic rankings, traffic growth, and generated leads."
        },
        {
            "q": "Can you collaborate with our existing in-house marketing and content team?",
            "a": "Yes. We collaborate seamlessly with internal teams, handling technical SEO, ad operations, and specialized content while aligning with your brand voice."
        },
        {
            "q": "What ad channels do you manage for performance marketing campaigns?",
            "a": "We manage high-ROI campaigns across Google Search & Display Ads, LinkedIn Sponsored Content, Meta Ads (Facebook & Instagram), and YouTube Video Advertising."
        },
        {
            "q": "Do you conduct Conversion Rate Optimization (CRO) on our landing pages?",
            "a": "Yes. We perform heuristic UX audits, heatmap analysis, A/B split testing, and form optimization to maximize the percentage of visitors who convert into leads."
        }
    ]
  },
];

export const resourceHubs = [
  { slug: 'insights', title: 'Insights', icon: 'Lightbulb', to: '/resources/insights', text: 'Articles, Case Snapshots, Best Practices, Podcasts, and Videos.' },
  { slug: 'news-events', title: 'News and Events', icon: 'Newspaper', to: '/resources/news-events', text: "Stay up to date with Velvora's announcements, partnerships, webinars, and events." },
  { slug: 'case-studies', title: 'Case Studies', icon: 'FolderOpen', to: '/resources/case-studies', text: 'See how Velvora helps clients solve real content challenges.' },
  { slug: 'client-testimonials', title: 'Client Testimonials', icon: 'Quote', to: '/resources/client-testimonials', text: 'What our clients say about partnering with Velvora Solutions.' },
];

export const content = {
  'news-events': {
    title: 'News and Events',
    intro: "Stay up to date with Velvora's announcements, partnerships, webinars, and events.",
    empty: 'No news or events published yet.',
    items: [
      {
        title: 'Velvora Solutions Launches Expanded Digital Accessibility Services',
        date: 'Recent Announcement',
        tag: 'Company News',
        summary: 'We are pleased to announce our expanded accessibility offering covering EPUB 2 and 3, web, PDF, Word, PowerPoint, and Excel.',
        actionLabel: 'Read More',
        href: '/services/digital-accessibility',
      },
      {
        title: 'Webinar: Getting Ready for the European Accessibility Act',
        date: 'Upcoming Webinar',
        tag: 'Webinar',
        summary: 'Join our accessibility experts for a practical session on what publishers need to do to meet new requirements.',
        actionLabel: 'Register Now',
        href: '/contact',
      },
      {
        title: 'Velvora at Global Publishing Summit',
        date: 'Conference & Exhibition',
        tag: 'Events',
        summary: 'Meet our team and talk to us about ePublishing, XML, and accessibility.',
        actionLabel: 'Learn More',
        href: '/contact',
      },
    ],
  },
  'case-studies': {
    title: 'Case Studies',
    intro: 'See how Velvora helps clients solve real content challenges.',
    empty: 'No case studies published yet.',
    items: [
      {
        id: 'case-1',
        title: 'Case Study 1: Making a 5,000-Title EPUB Library Accessible',
        challenge: 'A leading publisher needed its back-catalogue to meet EPUB Accessibility 1.1 requirements ahead of a regulatory deadline.',
        solution: 'Velvora upgraded EPUB 2 files to EPUB 3, added alt text, semantic structure, and accessibility metadata, and validated using EPUBCheck and Ace.',
        result: '99.8% of titles passed accessibility validation, delivered 3 weeks ahead of the deadline.',
      },
      {
        id: 'case-2',
        title: 'Case Study 2: PDF Remediation for a University',
        challenge: 'Thousands of course PDFs were inaccessible to students using screen readers.',
        solution: 'Our team tagged and remediated the PDFs to PDF/UA and WCAG 2.1 AA.',
        result: 'Full compliance and a better learning experience for all students.',
      },
      {
        id: 'case-3',
        title: 'Case Study 3: Journal XML Conversion',
        challenge: 'A society publisher needed its archive converted to JATS XML.',
        solution: 'Velvora converted, tagged, and validated 12,000+ articles with a multi-stage QA process.',
        result: 'Faster publishing, richer metadata, and multi-format output from one source.',
      },
    ],
  },
  'client-testimonials': {
    title: 'Verified Client Reviews & Testimonials',
    intro: 'How leading publishers, universities, and global enterprises achieve uncompromising quality, accessibility compliance, and velocity with Velvora Solutions.',
    empty: 'No client testimonials published yet.',
    items: [
      {
        quote: 'Velvora delivered over 5,000 accessible EPUB 3 files that passed EPUBCheck and Ace by DAISY on first submission. Their team is responsive, meticulous, and truly understands accessibility law.',
        author: 'Dr. Sarah Jenkins',
        role: 'Head of Digital Publishing',
        company: 'Oxford Academic Press Network',
        service: 'EPUB 3 Accessibility & Remediation',
        rating: 5,
        metric: '5,000+ Titles Certified',
        tag: 'Academic Publishing',
        initials: 'SJ'
      },
      {
        quote: 'Their XML conversion pipeline and automated DTD validation helped us accelerate quarterly production cycles by 40%. The technical precision across complex STEM mathematical notation is second to none.',
        author: 'Marcus Vance',
        role: 'Managing Editor & Production Lead',
        company: 'International Scientific Journal Society',
        service: 'XML-First Transformation & MathML',
        rating: 5,
        metric: '+40% Faster Cycle Times',
        tag: 'STEM Publishing',
        initials: 'MV'
      },
      {
        quote: 'We entrusted Velvora with remediating our entire university curriculum and course pack archive to PDF/UA standards. Their assistive technology testing with JAWS and NVDA gave our compliance committee total confidence.',
        author: 'Elena Rostova',
        role: 'Director of Digital Accessibility',
        company: 'Metropolitan University Consortium',
        service: 'PDF/UA & Higher Ed Remediation',
        rating: 5,
        metric: '100% Conformance Verified',
        tag: 'Higher Education',
        initials: 'ER'
      },
      {
        quote: 'Velvora automated our document classification and OCR pipelines using bespoke AI models. We reduced manual document routing by 70% while improving optical OCR accuracy to 99.8%.',
        author: 'David Chen',
        role: 'Chief Technology Officer',
        company: 'Lexis Legal Data Systems',
        service: 'AI Document Automation & OCR',
        rating: 5,
        metric: '70% Manual Time Saved',
        tag: 'Legal & Enterprise',
        initials: 'DC'
      },
      {
        quote: 'From custom full-stack web portal architecture to Section 508 VPAT documentation, Velvora executed with flawless sprint discipline. A world-class partner for mission-critical digital delivery.',
        author: 'Rachel Adams',
        role: 'VP of Product Engineering',
        company: 'HealthCore Solutions Global',
        service: 'Software Engineering & VPAT Audit',
        rating: 5,
        metric: 'Zero Production Defects',
        tag: 'Healthcare Tech',
        initials: 'RA'
      },
      {
        quote: 'The typesetting fidelity and multi-format output from print-ready InDesign to reflowable EPUB was seamless. Velvora eliminated repeated proof cycles and saved our editorial staff hundreds of hours.',
        author: 'Julian Thorne',
        role: 'Executive Production Director',
        company: 'Beacon Hill Literary Group',
        service: 'Typesetting & Multi-Format Publishing',
        rating: 5,
        metric: 'Fewer Proof Rounds',
        tag: 'Trade Publishing',
        initials: 'JT'
      },
    ],
  },
  blog: {
    title: 'Velvora Insights',
    intro: 'Practical articles on ePublishing, XML, and digital accessibility.',
    empty: 'No articles published yet.',
    items: [
      {
        id: 'epub-2-vs-epub-3',
        title: '1. EPUB 2 vs EPUB 3: Which Should You Choose for Accessibility?',
        tag: 'ePublishing & Accessibility',
        featured: true,
        summary:
          'If your e-book library still includes EPUB 2 files, you are not alone. But as accessibility rules tighten around the world, many publishers are asking whether to improve their EPUB 2 files or move to EPUB 3. In this article, we compare the two formats, explain what each offers for readers using assistive technology, and share a practical path to getting your titles accessible.',
      },
      {
        id: 'what-is-pdf-ua',
        title: '2. What Is PDF/UA and Why Does It Matter?',
        tag: 'PDF Accessibility',
        summary: 'An accessible PDF standard overview explaining ISO 14289, tags, reading order, and how PDF/UA protects organizations from compliance risks.',
      },
      {
        id: 'common-accessibility-mistakes-in-word',
        title: '3. 10 Common Accessibility Mistakes in Word Documents (and How to Fix Them)',
        tag: 'Document Accessibility',
        summary: 'Learn how proper headings, built-in styles, table headers, and avoiding blank paragraphs build rock-solid source documents.',
      },
      {
        id: 'how-to-write-good-alt-text',
        title: '4. How to Write Good Alt Text for Images, Charts, and Diagrams',
        tag: 'Content & Design',
        summary: 'Practical principles for concise, informative alternative text and extended descriptions for complex STEM figures.',
      },
      {
        id: 'wcag-2-2-whats-new',
        title: '5. WCAG 2.2: What’s New and What It Means for Your Website',
        tag: 'Web Accessibility',
        summary: 'A deep dive into new success criteria in WCAG 2.2, focus appearance, dragging movements, and target sizes.',
      },
      {
        id: 'powerpoint-accessible-checklist',
        title: '6. Making PowerPoint Presentations Accessible: A Quick Checklist',
        tag: 'Presentations',
        summary: 'How slide titles, selection pane reading order, and colour contrast ensure presentations are accessible to everyone.',
      },
      {
        id: 'excel-accessibility-screen-reader',
        title: '7. Excel Accessibility: How to Make Spreadsheets Screen Reader Friendly',
        tag: 'Spreadsheets',
        summary: 'Structure worksheets with clear tables, explicit header rows, and proper cell naming for seamless assistive technology navigation.',
      },
      {
        id: 'why-xml-first-publishing',
        title: '8. Why XML-First Publishing Saves Time and Money',
        tag: 'XML Services',
        summary: 'How structuring content upfront in JATS, BITS, or DITA cuts downstream typesetting and multi-format delivery costs in half.',
      },
      {
        id: 'european-accessibility-act-publishers',
        title: '9. The European Accessibility Act: What Publishers Should Know',
        tag: 'Compliance & Legal',
        summary: 'The countdown to the European Accessibility Act (EAA), required EPUB 3 standards, metadata requirements, and practical publisher steps.',
      },
      {
        id: 'automated-vs-manual-testing',
        title: '10. Automated vs Manual Accessibility Testing: Why You Need Both',
        tag: 'Quality Assurance',
        summary: 'Why automated tools only catch ~30% of accessibility violations, and how human testers with screen readers ensure true compliance.',
      },
    ],
  },
};

export const insightsData = {
  hero: {
    eyebrow: 'Knowledge Hub',
    title: 'Velvora Insights',
    subtitle: 'Explore in-depth articles, real-world case snapshots, practical checklists, 10 podcast episodes, and 10 video guides covering publishing, accessibility, AI, and analytics.',
  },
  sections: [
    { id: 'all', label: 'All Insights', icon: 'Sparkles', count: 43 },
    { id: 'articles', label: 'Articles & Trends', icon: 'BookOpen', count: 10 },
    { id: 'cases', label: 'Case Studies & Snapshots', icon: 'FolderOpen', count: 4 },
    { id: 'tips', label: 'Tips & Best Practices', icon: 'Lightbulb', count: 5 },
    { id: 'leadership', label: 'Thought Leadership', icon: 'ShieldCheck', count: 4 },
    { id: 'podcasts', label: 'Podcasts (10 Episodes)', icon: 'Headphones', count: 10 },
    { id: 'videos', label: 'Videos (10 Clips)', icon: 'Video', count: 10 },
  ],
  podcasts: [
    {
      episode: 1,
      title: 'AI Meets Accessibility',
      description: 'How machine learning is helping detect and fix accessibility gaps before content reaches readers.',
      duration: '22 min',
      tag: 'AI & Inclusivity',
      featured: true,
    },
    {
      episode: 2,
      title: 'Metadata Magic',
      description: 'Why metadata is the hidden engine of discoverability in publishing and marketing.',
      duration: '18 min',
      tag: 'Metadata & SEO',
    },
    {
      episode: 3,
      title: 'From Manuscript to Millions',
      description: 'A walkthrough of modern XML workflows that scale content globally.',
      duration: '25 min',
      tag: 'XML Architecture',
    },
    {
      episode: 4,
      title: 'Inclusive Learning at Scale',
      description: 'Universities and EdTech platforms share how they deliver accessible learning materials.',
      duration: '28 min',
      tag: 'EdTech & Higher Ed',
    },
    {
      episode: 5,
      title: 'Digital Marketing for Startups',
      description: 'Smart, budget‑friendly strategies to amplify reach without burning cash.',
      duration: '20 min',
      tag: 'Growth & Strategy',
    },
    {
      episode: 6,
      title: 'The Future of EPUB Accessibility',
      description: 'Exploring standards like EPUB Accessibility 1.1 and what they mean for publishers.',
      duration: '24 min',
      tag: 'EPUB 3 & Standards',
    },
    {
      episode: 7,
      title: 'Data to Decisions',
      description: 'How analytics transform raw data into actionable insights for enterprises.',
      duration: '21 min',
      tag: 'BI & Analytics',
    },
    {
      episode: 8,
      title: 'Government and Compliance',
      description: 'Meeting Section 508 and WCAG requirements without slowing down workflows.',
      duration: '26 min',
      tag: 'Policy & Section 508',
    },
    {
      episode: 9,
      title: 'Automation in Action',
      description: 'Real stories of AI workflows cutting manual work in publishing and IT services.',
      duration: '23 min',
      tag: 'Workflow Automation',
    },
    {
      episode: 10,
      title: 'Global Voices',
      description: 'Perspectives from professionals across 5+ countries on digital transformation trends.',
      duration: '30 min',
      tag: 'Global Perspectives',
    },
  ],
  videos: [
    {
      id: 1,
      title: 'What is PDF/UA?',
      description: 'Explainer on why PDF/UA compliance matters for accessibility.',
      duration: '3:45',
      tag: 'PDF Accessibility',
      featured: true,
    },
    {
      id: 2,
      title: 'Case Study Spotlight: University Success',
      description: 'How a university remediated thousands of PDFs in record time.',
      duration: '4:15',
      tag: 'Higher Ed Case Study',
    },
    {
      id: 3,
      title: 'Top 3 Accessibility Tips for Dashboards',
      description: 'Quick tutorial with actionable steps.',
      duration: '2:50',
      tag: 'BI Dashboards',
    },
    {
      id: 4,
      title: 'XML in 60 Seconds',
      description: 'Fast explainer on why XML is the backbone of structured publishing.',
      duration: '1:00',
      tag: 'XML Workflows',
    },
    {
      id: 5,
      title: 'AI Workflow Demo',
      description: 'Visual walkthrough of how automation reduces repetitive tasks.',
      duration: '5:20',
      tag: 'AI Demo',
    },
    {
      id: 6,
      title: 'Digital Marketing Quick Wins',
      description: 'SEO, social media, and analytics hacks for startups.',
      duration: '3:30',
      tag: 'Marketing Hacks',
    },
    {
      id: 7,
      title: 'Accessible EPUB Explained',
      description: 'Breaking down EPUB Accessibility 1.1 in simple terms.',
      duration: '4:05',
      tag: 'ePublishing Guide',
    },
    {
      id: 8,
      title: 'Behind the Scenes: Velvora Team',
      description: 'Showcasing your specialists and their expertise.',
      duration: '3:15',
      tag: 'Culture & Team',
    },
    {
      id: 9,
      title: 'Global Accessibility Regulations',
      description: 'Overview of WCAG, Section 508, and international standards.',
      duration: '6:10',
      tag: 'Regulatory Roadmap',
    },
    {
      id: 10,
      title: 'Future of Inclusive Tech',
      description: 'Thought leadership clip on where accessibility and AI are heading.',
      duration: '4:40',
      tag: 'Future Outlook',
    },
  ],
  tips: [
    {
      id: 'tip-1',
      title: '10 Common Accessibility Mistakes in Word Documents',
      tag: 'Document Accessibility',
      bullets: [
        'Using manual blank lines instead of paragraph spacing',
        'Skipping heading levels (e.g. jumping from H1 to H3)',
        'Relying solely on color to convey critical meaning',
        'Omitting designated header rows in tabular data',
        'Pasting raw, unformatted URLs instead of descriptive text',
      ],
      linkText: 'Read Word Accessibility Guide',
      to: '/services/digital-accessibility#word',
    },
    {
      id: 'tip-2',
      title: 'How to Write Good Alt Text for Complex STEM Charts & Figures',
      tag: 'Content & Design',
      bullets: [
        'State the purpose of the diagram in the primary alt text tag',
        'Provide extended descriptions in adjacent body copy or details elements',
        'Detail key data trends, axes units, and peak/trough benchmarks',
        'Avoid repetitive phrasing like "image of" or "graphic showing"',
      ],
      linkText: 'Explore Alt-Text Protocols',
      to: '/services/digital-accessibility',
    },
    {
      id: 'tip-3',
      title: 'Top 3 Accessibility Tips for Executive BI Dashboards',
      tag: 'BI & Reporting',
      bullets: [
        'Ensure a minimum 4.5:1 contrast ratio for all data visualizations',
        'Pair chromatic indicators with glyphs or pattern hatches',
        'Enable logical keyboard navigation and tab order across metric tiles',
      ],
      linkText: 'Review Dashboard Standards',
      to: '/services',
    },
    {
      id: 'tip-4',
      title: 'Making PowerPoint Presentations Screen-Reader Ready',
      tag: 'Presentations',
      bullets: [
        'Audit the Selection Pane reading order (bottom-to-top DOM stack)',
        'Ensure every slide has a unique, descriptive slide title',
        'Set table headers explicitly and avoid nested split cells',
      ],
      linkText: 'Check Presentation Guide',
      to: '/services/digital-accessibility#word',
    },
    {
      id: 'tip-5',
      title: 'Excel Accessibility: Structuring Worksheets for Assistive Tech',
      tag: 'Spreadsheets',
      bullets: [
        'Use explicit named table regions instead of unbounded grids',
        'Avoid merging cells in multi-dimensional data models',
        'Provide meaningful sheet names instead of default "Sheet1"',
      ],
      linkText: 'Read Excel Best Practices',
      to: '/services/digital-accessibility#word',
    },
  ],
  thoughtLeadership: [
    {
      id: 'lead-1',
      title: 'The European Accessibility Act (EAA): The Global Publisher Playbook',
      tag: 'Global Compliance',
      date: 'Strategic Briefing',
      summary: 'With mandatory enforcement for consumer digital products and e-books, organizations worldwide must align EPUB 3 architectures, accessibility metadata, and DRM interoperability.',
      action: 'Read Full Briefing',
      to: '/contact?subject=EAA+Compliance+Briefing',
    },
    {
      id: 'lead-2',
      title: 'AI Automation Meets Human QA: The 70/30 Hybrid Paradigm',
      tag: 'Artificial Intelligence',
      date: 'Industry Outlook',
      summary: 'Automated algorithms scan document trees at scale, but true usability requires native assistive technology users to verify reading flows, screen-reader audio, and contextual accuracy.',
      action: 'Learn More',
      to: '/services/digital-accessibility',
    },
    {
      id: 'lead-3',
      title: 'Why XML-First Publishing Slashes Downstream Costs in Half',
      tag: 'Publishing Architecture',
      date: 'Whitepaper Summary',
      summary: 'Separating semantic structure from presentation upfront allows a single JATS or BITS XML source to feed print, web, app, EPUB, and audio formats with zero rework.',
      action: 'Discuss XML Strategy',
      to: '/services/xml',
    },
    {
      id: 'lead-4',
      title: 'The Business ROI of Universal Inclusion in Enterprise Tech',
      tag: 'Executive Strategy',
      date: 'Thought Leadership',
      summary: 'Accessible products expand addressable customer bases, eliminate procurement blockers for government tenders, and shield companies from escalating legal vulnerability.',
      action: 'Request Consultation',
      to: '/contact',
    },
  ],
};


