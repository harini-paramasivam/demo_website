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
  accessibilityEmail: 'accessibility@velvorasolutions.com',
  phone: '+91 9500834236',
  address: '450/90, Indra Nagar, Pathirikuppam, Cuddalore, Tamilnadu – 606302',
  hours: 'Mon to Fri, 9:30 AM to 6:30 PM IST',
  linkedinCompany: 'https://www.linkedin.com/company/118444302/',
  aboutLine: 'Velvora Solutions: ePublishing, XML, and Digital Accessibility Services.',
  description:
    'Velvora Solutions delivers ePublishing, XML, digital accessibility, AI automation, website development, software development, data analytics, and digital marketing services for publishers, universities, enterprises, and government organizations worldwide.',
  accessibilityStatement:
    'Velvora Solutions is committed to making our website accessible to everyone, including people with disabilities. We aim to conform to WCAG 2.2 Level AA. If you have difficulty using any part of this site or need content in another format, please contact us at accessibility@velvorasolutions.com and we will respond promptly.',
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
    quote: 'Transform manuscripts into digital experiences…',
    desc: 'From XML conversion to EPUB accessibility, we make publishing seamless and future‑ready.',
    icon: 'BookOpen',
    tag: 'Publishing & Formats',
    to: '/services/epublishing'
  },
  {
    title: 'Accessibility Services',
    quote: 'Designing content that includes everyone…',
    desc: 'We remediate PDFs, Office files, and websites to meet global accessibility standards.',
    icon: 'FileCheck2',
    tag: 'WCAG 2.2 & PDF/UA',
    to: '/services/digital-accessibility'
  },
  {
    title: 'Web & Software Development',
    quote: 'Build smarter, faster, accessible applications…',
    desc: 'Our teams deliver scalable, modern solutions tailored to enterprises, publishers, and universities.',
    icon: 'Code',
    tag: 'Web & Enterprise Tech',
    to: '/services'
  },
  {
    title: 'AI Automation',
    quote: 'Automate workflows, amplify innovation…',
    desc: 'We harness AI to reduce manual effort, accelerate publishing, and unlock new efficiencies.',
    icon: 'Bot',
    tag: 'AI Workflows & NLP',
    to: '/services'
  },
  {
    title: 'Data Analytics',
    quote: 'Turn data into decisions…',
    desc: 'From predictive models to dashboards, we help organizations see insights clearly and act confidently.',
    icon: 'BarChart3',
    tag: 'BI & Predictive Analytics',
    to: '/services'
  },
  {
    title: 'Digital Marketing',
    quote: 'Reach audiences with authentic impact…',
    desc: 'SEO, campaigns, and analytics crafted by diverse voices to drive measurable growth.',
    icon: 'Megaphone',
    tag: 'SEO & Global Growth',
    to: '/contact'
  },
  {
    title: 'Training Services',
    quote: 'Training designed for impact…',
    desc: 'Practical sessions that prepare you for global projects and industries.',
    icon: 'GraduationCap',
    tag: 'Workshops & Certifications',
    to: '/services/accessibility-training-and-consulting'
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
    badge: 'JATS · BITS · EPUB 3'
  },
  {
    id: 'content-services',
    title: 'Content Services',
    desc: 'Typesetting, math, metadata, OCR, captioning, and transcription for print and digital content.',
    btnText: 'Explore Content Services',
    to: '/services/typesetting-and-design',
    icon: 'Layers',
    tag: 'End-to-End Production',
    badge: 'LaTeX · MathML · OCR'
  },
  {
    id: 'digital-accessibility',
    title: 'Digital Accessibility',
    desc: 'Accessible EPUB, web, PDF, Word, PowerPoint, and Excel files that meet WCAG, PDF/UA, and Section 508, plus training and consulting.',
    btnText: 'Explore Digital Accessibility',
    to: '/services/digital-accessibility',
    icon: 'FileCheck2',
    tag: 'Universal Inclusion',
    badge: 'WCAG 2.2 · PDF/UA · Section 508'
  },
  {
    id: 'it-services',
    title: 'IT Services',
    desc: 'AI automation, website development, software development, data analytics, and digital marketing that cut manual work, build smarter applications, transform data into insights, and help your content reach the right audience.',
    btnText: 'Explore IT Services',
    to: '/services',
    icon: 'Cpu',
    tag: 'Enterprise Engineering',
    badge: 'AI Automation · Software · Data'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'SEO, social media, paid campaigns, content marketing, and analytics to amplify your reach and maximize engagement.',
    btnText: 'Explore Digital Marketing',
    to: '/contact',
    icon: 'Megaphone',
    tag: 'Audience Amplification',
    badge: 'SEO · Content · Multi-Channel'
  },
  {
    id: 'training-development',
    title: 'Training and Skill Development',
    desc: 'Workshops, certification support, and hands‑on sessions in accessibility, publishing workflows, XML, AI automation, software development, data analytics, and digital marketing. We help your team build practical skills, stay current with evolving standards, and apply best practices directly to real projects.',
    btnText: 'Explore Training',
    to: '/services/accessibility-training-and-consulting',
    icon: 'GraduationCap',
    tag: 'Hands-on Capacity Building',
    badge: 'CPACC Prep · Workflows · Tooling'
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
    to: '/services'
  },
  {
    id: 'government',
    industry: 'Government and Public Sector',
    headline: 'Compliance with accessibility regulations.',
    desc: 'Audit, remediate, and maintain citizen-facing portals and statutory public documents with complete VPAT / ACR documentation and zero compliance gaps.',
    icon: 'Landmark',
    tag: 'Public Administration',
    highlights: ['Section 508 & ADA', 'VPAT / ACR Reports', 'Public Forms Remediation', 'Screen Reader QA'],
    to: '/contact'
  }
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
      { label: 'Careers', to: '/about/careers' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'ePublishing Services', to: '/services/epublishing' },
      { label: 'XML Services', to: '/services/xml' },
      { label: 'Digital Accessibility (EPUB 2 & 3, Web, PDF, Word, PowerPoint, Excel)', to: '/services/digital-accessibility' },
      { label: 'Typesetting and Design', to: '/services/typesetting-and-design' },
      { label: 'Math and Equation Typesetting', to: '/services/math-and-equation-typesetting' },
      { label: 'Metadata, Indexing and Taxonomy', to: '/services/metadata-indexing-and-taxonomy' },
      { label: 'OCR and Digitization', to: '/services/ocr-and-digitization' },
      { label: 'Captioning, Transcription and Audio Description', to: '/services/captioning-transcription-and-audio-description' },
      { label: 'Accessibility Training and Consulting', to: '/services/accessibility-training-and-consulting' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'News & Events', to: '/resources/news-events' },
      { label: 'Case Studies', to: '/resources/case-studies' },
      { label: 'Client Testimonials', to: '/resources/client-testimonials' },
    ],
  },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

export const teamMembers = [
  {
    name: 'Iyshwariya Senthil',
    designation: 'Founder / Managing Director',
    bio: 'Iyshwariya Senthil has 10+ years of experience in publishing and accessibility and leads our strategic operations. She is passionate about digital inclusion and scalable publishing workflows.',
    alt: 'Portrait of Iyshwariya Senthil, Founder / Managing Director',
  },
  {
    name: 'Rajesh Kumar',
    designation: 'Head of Accessibility',
    bio: 'Rajesh has 9+ years of experience in accessibility audits and remediation and leads our Digital Accessibility department. He is certified in CPACC and WAS, specializing in WCAG 2.2 and screen reader testing.',
    alt: 'Portrait of Rajesh Kumar, Head of Accessibility',
  },
  {
    name: 'Priya Raman',
    designation: 'Head of Production',
    bio: 'Priya has 8+ years of experience in publishing and typesetting workflows and leads our Production team. She oversees ePublishing, LaTeX/MathML conversion, and multi-format delivery with rigorous QA.',
    alt: 'Portrait of Priya Raman, Head of Production',
  },
  {
    name: 'Anand Natarajan',
    designation: 'Head of Operations',
    bio: 'Anand has 11+ years of experience in operations, XML architectures, and client delivery and leads our Operations division. He ensures seamless timelines and enterprise data security across every project.',
    alt: 'Portrait of Anand Natarajan, Head of Operations',
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
    whoItsFor: 'Book publishers, journal publishers, educational publishers, authors, and corporate content teams.',
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
    whyItMatters: [
      { title: 'Reach more readers', desc: 'Include people with visual, hearing, motor, and cognitive disabilities.' },
      { title: 'Meet legal requirements', desc: 'Laws such as the ADA, Section 508, AODA, and the European Accessibility Act increasingly require accessible content, including e-books.' },
      { title: 'Better for everyone', desc: 'Clear structure improves search, navigation, and usability.' },
      { title: 'Strengthen your brand', desc: 'Show that your organization values inclusion.' },
    ],
    faqs: [
      { q: 'What is the difference between an accessibility audit and remediation?', a: 'An audit finds and documents issues. Remediation fixes them. We offer both, together or separately.' },
      { q: 'Do you use only automated tools?', a: 'No. Automated tools catch only a portion of issues. We always add manual review and assistive technology testing.' },
      { q: 'Can you make our existing back-catalogue accessible?', a: 'Yes. We handle both new content and large back-catalogue projects in bulk.' },
      { q: 'Which standards do you follow?', a: 'WCAG 2.1 and 2.2, PDF/UA, EPUB Accessibility 1.1, Section 508, and other regional standards, depending on your needs.' },
      { q: 'Do you provide an accessibility report?', a: 'Yes. Every project includes a report, and we can prepare a VPAT or ACR on request.' },
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
      { q: 'Can you work to our existing template?', a: 'Yes. We can follow your existing templates and style guides, or design new ones.' },
      { q: 'Which software do you use?', a: 'We work in Adobe InDesign, LaTeX, and other industry tools, depending on your needs.' },
      { q: 'Can the same files be used for EPUB and accessible PDF?', a: 'Yes. We build files with clean structure and styles so they convert smoothly to other formats.' },
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
      { q: 'Why is MathML important for accessibility?', a: 'MathML describes the structure of an equation, so screen readers and Braille tools can read it. Equations saved as images cannot be read in the same way.' },
      { q: 'Can you convert our old image-based equations?', a: 'Yes. We rebuild them as editable LaTeX or MathML.' },
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
      { q: 'Do you provide indexing for non-English books?', a: 'Please ask us. We will confirm language availability for your project.' },
      { q: 'Can you clean up our existing metadata?', a: 'Yes. We audit and correct metadata across your catalogue and align it to the standards you need.' },
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
      { q: 'Is OCR alone enough to make a document accessible?', a: 'No. OCR gives you text, but a document also needs correct structure, reading order, and alternative text to be truly accessible. We handle those steps too.' },
      { q: 'Can you handle poor quality or old documents?', a: 'Yes. Our team can work with faded, damaged, or complex material. We will review samples first.' },
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
      { q: 'What is the difference between captions and subtitles?', a: 'Captions include dialogue and important sounds, such as music or laughter, for people who cannot hear the audio. Subtitles usually translate or transcribe only the speech.' },
      { q: 'What is audio description?', a: 'Audio description is spoken narration of important visual information, such as actions, scenes, and on-screen text, for people who cannot see the video.' },
    ],
  },
  {
    slug: 'accessibility-training-and-consulting',
    title: 'Accessibility Training and Consulting',
    pageTitle: 'Accessibility Training and Consulting | Velvora Solutions',
    metaDesc: 'Hands-on accessibility training, workshops, and expert consulting for publishers, universities, and organizations. Build accessibility skills inside your team.',
    heading: 'Accessibility Training and Consulting: Build Skills That Last',
    icon: 'GraduationCap',
    short: 'Practical workshops and expert advice to build accessibility skills inside your team.',
    buttonText: 'Book a Training Consultation',
    overview:
      "Remediation fixes today's files. Training helps your team create accessible content from the start. Velvora's accessibility experts offer practical, role-based training and consulting that help organizations build in-house skills, reduce rework, and meet accessibility goals with confidence.",
    trainingPrograms: [
      { name: '1. Accessibility Fundamentals', desc: 'Introduction to disability, assistive technology, and the principles of accessible design. Ideal for all staff.' },
      { name: '2. Accessible Word, PowerPoint and Excel', desc: 'Hands-on workshop covering styles, headings, alt text, tables, reading order, and checkers.' },
      { name: '3. Accessible PDF', desc: 'Tagging, reading order, forms, and PDF/UA checks using Adobe Acrobat and PAC.' },
      { name: '4. EPUB Accessibility', desc: 'Creating accessible EPUB 3 files, accessibility metadata, and EPUB Accessibility 1.1 requirements.' },
      { name: '5. Web Accessibility for Designers and Developers', desc: 'WCAG 2.2, semantic HTML, ARIA, keyboard support, colour contrast, and testing.' },
      { name: '6. Writing Alt Text and Image Descriptions', desc: 'How to describe images, charts, diagrams, and maps clearly and usefully.' },
      { name: '7. Accessibility for Publishers and Editors', desc: 'Workflow changes, author guidelines, vendor requirements, and how to prepare for accessibility regulations.' },
      { name: '8. Screen Reader Experience Workshop', desc: 'Live demonstrations using JAWS, NVDA, and VoiceOver, so your team can see and hear how users experience content.' },
    ],
    trainingFormats: [
      'Live online sessions',
      'On-site workshops',
      'Recorded self-paced modules',
      'Custom, role-based programs for your tools and workflows',
      'Train-the-trainer programs',
    ],
    consultingServices: [
      { title: 'Accessibility Maturity Assessment', desc: 'A review of your current policies, workflows, and gaps.' },
      { title: 'Accessibility Roadmap and Strategy', desc: 'A practical plan with priorities, timelines, and responsibilities.' },
      { title: 'Workflow Integration', desc: 'Building accessibility into your editorial, production, and procurement processes.' },
      { title: 'Author and Vendor Guidelines', desc: 'Clear instructions for contributors and suppliers.' },
      { title: 'Template Development', desc: 'Accessible Word, PowerPoint, Excel, and InDesign templates.' },
      { title: 'Compliance Support', desc: 'Guidance on WCAG, Section 508, ADA, AODA, EN 301 549, and the European Accessibility Act.' },
      { title: 'VPAT / ACR Preparation', desc: 'Accessibility Conformance Reports for sales and procurement.' },
      { title: 'Accessibility Policy and Statement Drafting', desc: 'Formal accessibility commitments and web statements.' },
    ],
    whoItsFor: 'Publishers, editorial teams, designers, developers, content authors, instructional designers, HR and procurement teams, and leadership.',
    whatParticipantsGet: [
      'Practical skills they can use the same day',
      'Checklists, templates, and reference guides',
      'Certificate of participation [optional]',
      'Follow-up support for questions',
    ],
    whyVelvora: [
      'Trainers who do accessibility work every day, not just teach it',
      'Real examples from publishing and enterprise projects',
      'Training tailored to your tools and workflows',
      'Clear next steps after every session',
    ],
    faqs: [
      { q: 'Do participants need any prior knowledge?', a: 'No. We offer beginner, intermediate, and advanced sessions.' },
      { q: 'Can you customize the training for our team?', a: 'Yes. We tailor content to your roles, tools, and content types.' },
      { q: 'Do you offer follow-up support?', a: 'Yes. We can provide Q&A sessions, document reviews, and ongoing consulting.' },
    ],
  },
];

export const resourceHubs = [
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
    title: 'What Our Clients Say',
    intro: 'Sample placeholders only. Please replace with real, approved testimonials.',
    empty: 'No client testimonials published yet.',
    items: [
      {
        quote: 'Velvora delivered accessible EPUB files that passed every check. Their team is responsive and truly understands accessibility.',
        author: 'Head of Digital Production',
        role: 'Leading Academic Publisher',
        company: 'Academic & Trade Imprints',
      },
      {
        quote: 'Their XML conversion quality and turnaround helped us launch on schedule.',
        author: 'Managing Editor',
        role: 'Scientific & Technical Journal',
        company: 'Scholarly Society',
      },
      {
        quote: 'We trusted Velvora with our PDF remediation and were impressed by their attention to detail.',
        author: 'Accessibility Coordinator',
        role: 'Director of Disability Support',
        company: 'Higher Education University',
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
