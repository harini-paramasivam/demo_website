// Single source of truth for navigation and company facts.
// Facts come from https://www.velvorasolutions.com/. Anything not found there is marked `verified: false`.

export const company = {
  name: 'Velvora Solutions',
  tagline: 'Innovate · Solve · Elevate',
  email: 'info@velvorasolutions.com',
  linkedinCompany: 'https://www.linkedin.com/company/118444302/',
  // phone and postal address: not published on the official site -> intentionally omitted
  description:
    'Velvora Solutions is a technology-driven company delivering accessible, high-quality digital solutions: PDF accessibility remediation, web development, AI-powered solutions, digital services and IT consulting.',
};

export const founder = {
  name: 'Iyshwariya Senthil',
  role: 'Founder & CEO',
  bio: 'Passionate about technology, AI automation, web development, and accessibility solutions. Focused on building modern digital experiences and scalable digital services for global businesses.',
  linkedin: 'https://www.linkedin.com/in/iyshwariya-senthil-bb7707287/',
};

export const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    items: [
      { label: 'Company Overview', to: '/about/company-overview' },
      { label: 'Our Team', to: '/about/our-team' },
      { label: 'Careers', to: '/about/careers' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'Publishing & ePublishing', to: '/services/publishing-epublishing' },
      { label: 'Document Accessibility', to: '/services/document-accessibility' },
      { label: 'Website Accessibility', to: '/services/website-accessibility' },
      { label: 'AI Automation', to: '/services/ai-automation' },
      { label: 'Software Development', to: '/services/software-development' },
      { label: 'Data Analytics', to: '/services/data-analytics' },
      { label: 'Digital Marketing', to: '/services/digital-marketing' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'News & Events', to: '/resources/news-events' },
      { label: 'Case Studies', to: '/resources/case-studies' },
      { label: 'Client Testimonials', to: '/resources/client-testimonials' },
      { label: 'Guides & Insights', to: '/resources/guides-insights' },
    ],
  },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

export const accessibilityProcess = [
  'Document Analysis',
  'OCR & Structure Detection',
  'Accessibility Remediation',
  'Alt Text & Table Fixes',
  'PAC Validation',
  'Screen Reader Testing',
  'Quality Assurance',
  'Final Delivery',
];

/**
 * Services. `verified: true` means the capabilities below are listed on the official website.
 * `verified: false` pages show a visible "to be confirmed" notice and only reuse closely related, verified capabilities.
 */
export const services = [
  {
    slug: 'publishing-epublishing',
    title: 'Publishing & ePublishing',
    icon: 'BookOpen',
    short: 'Scanned-document cleanup, OCR correction and structured digital conversion for content teams and publishers.',
    intro: 'Velvora supports publishers and content owners with the document-processing groundwork digital publishing depends on: OCR, structure detection and structured digital conversion.',
    verified: false,
    capabilities: [
      ['OCR & document processing', 'Scanned document cleanup, OCR correction, and structured digital conversion.'],
      ['Document automation', 'Digital workflow and document automation solutions.'],
      ['Accessible output', 'Pairs with Velvora’s PDF accessibility remediation so published files are usable by everyone.'],
    ],
    note: 'The official website does not yet describe dedicated ePublishing services (for example EPUB production). Confirm the final service scope before launch.',
  },
  {
    slug: 'document-accessibility',
    title: 'Document Accessibility',
    icon: 'FileCheck2',
    short: 'PDF accessibility remediation aligned with WCAG and PDF/UA, backed by manual quality assurance.',
    intro: 'Professional PDF accessibility services that combine AI-assisted workflows with manual quality assurance, so documents work for assistive technology users.',
    verified: true,
    capabilities: [
      ['Tagged PDFs', 'Tag structure, reading-order correction and table remediation.'],
      ['Alt text creation', 'Descriptive alternative text for images and figures.'],
      ['Validation', 'PAC validation and screen reader QA.'],
      ['Standards alignment', 'Accessibility workflows aligned with WCAG and PDF/UA.'],
    ],
    showProcess: true,
    note: 'The official website describes PDF remediation. Support for Word, PowerPoint, Excel or EPUB is not stated and should be confirmed before it is added here.',
  },
  {
    slug: 'website-accessibility',
    title: 'Website Accessibility',
    icon: 'Globe',
    short: 'Accessibility testing and screen reader QA for inclusive digital experiences.',
    intro: 'Accessibility testing, screen reader QA and compliance verification, together with Velvora’s responsive web development.',
    verified: false,
    capabilities: [
      ['Accessibility & QA testing', 'Accessibility testing, screen reader QA and compliance verification.'],
      ['Responsive web development', 'Modern responsive websites, business websites, landing pages and web applications.'],
    ],
    note: 'Website-specific accessibility audits are not described on the official website. Confirm scope before launch.',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    icon: 'Bot',
    short: 'AI-powered workflows, automation tools and productivity solutions built with Python.',
    intro: 'AI-powered workflows and automation tools that make repetitive document and business processes faster and more scalable.',
    verified: true,
    capabilities: [
      ['AI-assisted workflows', 'Smart automation for faster, scalable accessibility remediation.'],
      ['Python tooling', 'Custom Python-based tools for productivity, automation and document workflows.'],
      ['AI document processing', 'AI-assisted document processing and workflow automation.'],
    ],
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    icon: 'Code',
    short: 'Responsive websites, web applications, backend solutions and custom IT services.',
    intro: 'Modern web development and custom IT services, from business websites and landing pages to web applications and backend solutions.',
    verified: true,
    capabilities: [
      ['Web development', 'Responsive websites, business websites, landing pages and web applications.'],
      ['Custom IT services', 'Technology support, workflow optimization, backend solutions and digital transformation services.'],
      ['Python development', 'Custom automation solutions, Python development and digital support services.'],
    ],
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    icon: 'BarChart3',
    short: 'Data analytics service details are being finalised.',
    intro: 'This page is ready for Velvora’s data analytics and reporting service content.',
    verified: false,
    capabilities: [],
    note: 'No data analytics service is described on the official website. Add verified content here before launch.',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'Megaphone',
    short: 'Digital marketing service details are being finalised.',
    intro: 'This page is ready for Velvora’s digital marketing service content.',
    verified: false,
    capabilities: [],
    note: 'No digital marketing service is described on the official website. Add verified content here before launch.',
  },
];

export const resourceHubs = [
  { slug: 'guides-insights', title: 'Guides & Insights', icon: 'Lightbulb', to: '/resources/guides-insights', text: 'Practical guidance on document accessibility, standards and automation.' },
  { slug: 'news-events', title: 'News & Events', icon: 'Newspaper', to: '/resources/news-events', text: 'Company announcements and upcoming events.' },
  { slug: 'case-studies', title: 'Case Studies', icon: 'FolderOpen', to: '/resources/case-studies', text: 'Project overviews, approaches and verified outcomes.' },
  { slug: 'client-testimonials', title: 'Client Testimonials', icon: 'Quote', to: '/resources/client-testimonials', text: 'Feedback shared by clients with their permission.' },
];

// Content collections. Add real items here; empty arrays render a clear empty state.
export const content = {
  'guides-insights': { title: 'Guides & Insights', intro: 'Guides on document accessibility, standards and AI-assisted workflows.', empty: 'No guides have been published yet.', items: [] },
  'news-events': { title: 'News & Events', intro: 'Announcements and events from Velvora Solutions.', empty: 'No news or events have been published yet.', items: [] },
  'case-studies': { title: 'Case Studies', intro: 'Project overviews with the challenge, services delivered, approach and verified outcomes.', empty: 'No case studies have been published yet.', items: [] },
  'client-testimonials': { title: 'Client Testimonials', intro: 'Feedback from Velvora’s clients, published with their permission.', empty: 'No client testimonials have been published yet.', items: [] },
  blog: { title: 'Blog', intro: 'Articles from the Velvora team.', empty: 'No blog posts have been published yet.', items: [] },
};
/* Item shape (example):
   { title, summary, date: 'YYYY-MM-DD', tag, href: '/blog/slug' }
   Case study items may also carry: challenge, services, approach, outcome */
