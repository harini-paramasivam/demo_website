export const caseStudies = [
  {
    slug: 'wcag-accessibility',
    id: 'case-wcag-accessibility',
    title: 'University & Enterprise WCAG 2.2 and PDF/UA Compliance',
    subtitle: 'Remediating 45,000+ Higher-Education Course Assets & Corporate Reports to Ironclad Accessibility Standards',
    shortTitle: 'WCAG 2.2 & PDF/UA Accessibility Remediation',
    category: 'Digital Accessibility',
    categoryLabel: 'Accessibility Compliance',
    clientType: 'Leading Research University & Enterprise Healthcare Network',
    industry: 'Higher Education & Healthcare',
    timeline: '8-Month Phased Rollout',
    standardsComplied: [
      'WCAG 2.2 Level AA / AAA',
      'PDF/UA (ISO 14289-1)',
      'ADA Title II & Section 508',
      'EN 301 549 (EU Mandate)'
    ],
    techStack: [
      'PAC 2024 PDF Accessibility Checker',
      'Adobe Acrobat Pro DC Structural Editor',
      'Freedom Scientific JAWS 2024',
      'NVDA Screen Reader Assistive Suite',
      'Apple VoiceOver & iOS Accessibility',
      'W3C MathML Validation Engine',
      'VPAT 2.4 Conformance Documentation'
    ],
    heroStats: [
      { value: '45,000+', label: 'Documents Remediated' },
      { value: '100%', label: 'PDF/UA & WCAG Conformance' },
      { value: '0', label: 'Legal Non-Compliance Notices' },
      { value: '4.9/5', label: 'Screen Reader User Rating' }
    ],
    summary: 'How Velvora Solutions audited, tagged, and remediated over 45,000 complex academic course documents, syllabi, scientific research papers, and corporate healthcare filings to achieve 100% PDF/UA and WCAG 2.2 AA conformance ahead of strict statutory deadlines.',
    challenge: {
      headline: 'The Challenge: Massive Backlog of Inaccessible STEM & Healthcare Assets',
      overview: 'The institution faced strict statutory compliance mandates under ADA Title II, Section 508, and state-level digital accessibility legislation. An internal audit revealed that over 85% of existing digital assets failed baseline accessibility standards, locking out students with visual, motor, and cognitive impairments.',
      painPoints: [
        'Untagged and poorly scanned legacy PDF course packs with no underlying heading hierarchy or text layer.',
        'Extensive complex STEM equations in scientific papers missing MathML or programmatic semantic tags.',
        'High-density data tables without row/column headers, making assistive navigation with JAWS and NVDA impossible.',
        'Thousands of technical charts, medical diagrams, and laboratory schematics lacking descriptive contextual alt-text.',
        'Rigid procurement and state audit timelines creating immense institutional and legal liability.'
      ]
    },
    solution: {
      headline: 'The Solution: Cognitive AI Ingestion Combined with Certified Human-in-the-Loop Remediation',
      overview: 'Velvora deployed a dedicated accessibility engineering task force led by IAAP-certified specialists (WAS/CPACC). Leveraging our proprietary automated structural parser alongside manual dual-pass remediation, every document was engineered for native screen reader usability.',
      phases: [
        {
          phase: 'Phase 01',
          name: 'Automated Pre-Flight & Structural Audit',
          desc: 'High-speed algorithmic ingestion analyzed 45,000+ files using PAC 2024, Adobe Accessibility Checker, and custom Schematron validators to catalog reading-order defects, color-contrast failures, and untagged figures.'
        },
        {
          phase: 'Phase 02',
          name: 'Tag Tree Architecture & Reading Order Reconstruction',
          desc: 'Our engineers manually rebuilt PDF logical structure trees from scratch: proper H1-H6 semantic hierarchies, nested list structures, artifact separation, and logical reading order alignment.'
        },
        {
          phase: 'Phase 03',
          name: 'Complex Tables, MathML & Expert Alt-Text Authoring',
          desc: 'Subject-matter experts authored deep pedagogical alt-text for intricate medical diagrams and converted raster equations into programmatic MathML with spoken audio rendering tags.'
        },
        {
          phase: 'Phase 04',
          name: 'Dual-Pass Assistive Technology Testing & VPAT Delivery',
          desc: 'Every batch underwent live testing using JAWS 2024, NVDA, and VoiceOver by certified accessibility auditors before final VPAT 2.4 (Section 508 / WCAG) documentation was issued.'
        }
      ]
    },
    results: {
      headline: 'Measurable Outcomes: 100% Audit Clearance & Universal Inclusivity',
      metrics: [
        { stat: '100%', title: 'Audit Pass Rate', desc: 'Zero syntax or structural errors across rigorous PAC 2024 and Adobe Acrobat pre-flight checks.' },
        { stat: '3.5x', title: 'Accelerated Velocity', desc: 'Hybrid automated-human pipeline processed 5,500+ documents monthly without quality degradation.' },
        { stat: '0', title: 'Compliance Violations', desc: 'Full institutional clearance achieved with court-defensible VPAT 2.4 reports.' },
        { stat: '12,000+', title: 'Students Impacted', desc: 'Seamless daily access enabled for students utilizing assistive screen-reading technologies.' }
      ]
    },
    testimonial: {
      quote: 'Velvora’s team did not just fix our tags — they fundamentally transformed how accessible learning happens across our university. Their assistive technology validation gave our legal and academic leadership complete confidence.',
      author: 'Dr. Arthur Sterling',
      role: 'Associate Vice Chancellor of Academic Technology',
      organization: 'State University System Network'
    },
    keyTakeaways: [
      'Automated checkers identify only ~30% of accessibility barriers; certified human assistive-tech validation is essential.',
      'Complex data tables and STEM equations require subject-matter specialists to write meaningful pedagogical descriptions.',
      'Establishing a court-defensible VPAT trail insulates educational and corporate enterprises from regulatory penalties.'
    ],
    relatedSlug: 'epublishing-transformation'
  },
  {
    slug: 'epublishing-transformation',
    id: 'case-epublishing-transformation',
    title: 'Transforming a 5,000-Title Back-Catalogue into Accessible EPUB 3',
    subtitle: 'End-to-End Modernization from Legacy Print PDFs and EPUB 2 into Verified EPUB Accessibility 1.1 Publications',
    shortTitle: '5,000-Title EPUB 3 Accessibility Transformation',
    category: 'ePublishing & Conversion',
    categoryLabel: 'Digital Publishing',
    clientType: 'Major Academic Press & Commercial Educational Publisher',
    industry: 'Academic & Trade Publishing',
    timeline: '6 Months (Delivered 3 Weeks Early)',
    standardsComplied: [
      'EPUB 3.3 Specification',
      'EPUB Accessibility 1.1',
      'WCAG 2.2 Level AA',
      'Daisy Ace & EPUBCheck 5.1 Validated'
    ],
    techStack: [
      'Ace by DAISY Accessibility Checker',
      'EPUBCheck 5.1 Command-Line Harness',
      'Adobe InDesign CC Export Pipeline',
      'Thorium Reader Accessible Desktop UI',
      'Amazon Kindle Previewer 3.7',
      'Apple Books iOS / macOS Rendering Engine',
      'W3C EPUB 3.3 Schematron QA',
      'ONIX & Schema.org Discovery Metadata'
    ],
    heroStats: [
      { value: '5,000+', label: 'Titles Transformed' },
      { value: '99.8%', label: 'First-Pass EPUBCheck Pass' },
      { value: '3 Weeks', label: 'Ahead of Regulatory Deadline' },
      { value: '100%', label: 'Ace by DAISY Certification' }
    ],
    summary: 'A premier international publishing house faced strict European Accessibility Act (EAA 2025) compliance deadlines across its 5,000-title backlist. Velvora engineered a high-velocity migration pipeline that converted static print files and legacy EPUB 2 assets into reflowable, semantically rich EPUB 3 editions.',
    challenge: {
      headline: 'The Challenge: Approaching Global Deadlines with Fragmented Legacy Files',
      overview: 'With the European Accessibility Act taking effect, our client needed its entire active sales catalogue updated to EPUB Accessibility 1.1. Their existing repository consisted of outdated EPUB 2 builds, QuarkXPress archives, and print-only InDesign files with broken markup.',
      painPoints: [
        'Over 5,000 titles locked in outdated EPUB 2 format lacking navigation documents (nav.xhtml).',
        'Missing accessibility metadata (schema:accessMode, accessibilityFeature, accessibilityHazard).',
        'Hardcoded typography and non-reflowable layouts that broke on modern e-readers and mobile devices.',
        'Inconsistent CSS styling causing severe reading-order distortions on Apple Books, Kindle, and Kobo.',
        'Tight commercial schedule: failure to meet the deadline would mean removal from key European retail channels.'
      ]
    },
    solution: {
      headline: 'The Solution: Automated XML/XHTML Normalization & DAISY Ace Validation Pipeline',
      overview: 'Velvora built an automated conversion harness combining Python-based packaging scripts with precision typographical editorial review. Every publication was upgraded to semantic HTML5, equipped with complete accessibility metadata, and certified through DAISY Ace validation.',
      phases: [
        {
          phase: 'Phase 01',
          name: 'Batch Deconstruction & EPUB 2 Disassembly',
          desc: 'Automated unpackers decompiled legacy EPUB 2 archives, extracted core content markup, and audited embedded assets against current W3C HTML5 standards.'
        },
        {
          phase: 'Phase 02',
          name: 'HTML5 Semantic Transformation & Navigation Architecture',
          desc: 'Replaced antiquated div/span tag structures with semantic <article>, <section>, <header>, and ARIA landmarks. Built comprehensive nav.xhtml documents and hierarchical landmarks.'
        },
        {
          phase: 'Phase 03',
          name: 'Accessibility Metadata Injection & Alt-Text Enhancement',
          desc: 'Injected W3C and ONIX-compliant accessibility discovery metadata into the OPF package file and verified all illustrations with comprehensive descriptive captions.'
        },
        {
          phase: 'Phase 04',
          name: 'Multi-Device Validation & EPUBCheck Verification',
          desc: 'Every file was verified with zero errors using EPUBCheck 5.1 and DAISY Ace, followed by manual device testing on Kindle Oasis, Apple Books (iOS/macOS), and Thorium Reader.'
        }
      ]
    },
    results: {
      headline: 'Measurable Outcomes: Global Distribution Readiness & Zero Retail Rejections',
      metrics: [
        { stat: '99.8%', title: 'Validation Rate', desc: 'Flawless pass rate across EPUBCheck and DAISY Ace on initial delivery.' },
        { stat: '3 Weeks', title: 'Ahead of Schedule', desc: 'Complete 5,000-title archive delivered well in advance of retail channel embargoes.' },
        { stat: '0', title: 'Retail Delistings', desc: 'Zero rejections or quality flags across Amazon Kindle, Apple Books, and Kobo.' },
        { stat: '100%', title: 'Future-Proof Scalability', desc: 'Clean semantic structure enables instant automated conversion into web or app formats.' }
      ]
    },
    testimonial: {
      quote: 'Converting 5,000 titles seemed like an insurmountable mountain before we engaged Velvora. Their technical precision, communication cadence, and zero-defect delivery allowed us to beat our deadline by three full weeks.',
      author: 'Marcus Vance',
      role: 'Director of Global Digital Production',
      organization: 'International Academic Publishing Group'
    },
    keyTakeaways: [
      'Migrating from EPUB 2 to EPUB 3 requires strict HTML5 semantic normalization and landmark structure.',
      'Embedded schema metadata is essential for modern educational searchability and retail accessibility badges.',
      'Automated script validation combined with device hardware testing guarantees zero retail distributor bounce-backs.'
    ],
    relatedSlug: 'wcag-accessibility'
  },
  {
    slug: 'xml-journal-conversion',
    id: 'case-xml-journal-conversion',
    title: 'High-Volume Scholarly Journal JATS / BITS XML Conversion',
    subtitle: 'Structuring 12,000+ Multi-Disciplinary Scholarly Articles into PubMed Central & CrossRef-Compliant JATS XML',
    shortTitle: '12,000+ Scholarly Articles XML Conversion',
    category: 'XML & Data Services',
    categoryLabel: 'Content Transformation',
    clientType: 'International Scientific & Medical Journal Society',
    industry: 'Scientific, Technical & Medical (STM) Publishing',
    timeline: '4 Months Continuous Deployment',
    standardsComplied: [
      'JATS (NISO Z39.96-2021) DTD / Schema',
      'BITS (Book Interchange Tag Suite)',
      'MathML 3.0 Standard',
      'CrossRef DOI & PubMed Central Validation'
    ],
    techStack: [
      'NISO JATS 1.3 DTD Parser & Validator',
      'BITS Tag Suite Automation Pipeline',
      'MathML 3.0 MathJax Conversion Engine',
      'CrossRef REST API DOI Resolver',
      'PubMed Central (PMC) Pre-flight Suite',
      'Saxon XSLT 3.0 Content Transformer',
      'ISO Schematron Quality Rule Engine',
      'Oxygen XML Enterprise Authoring Tools'
    ],
    heroStats: [
      { value: '12,000+', label: 'Articles Converted' },
      { value: '99.98%', label: 'Character & Formula Accuracy' },
      { value: '100%', label: 'PMC & CrossRef Acceptance' },
      { value: '40%', label: 'Faster Publishing Cycles' }
    ],
    summary: 'A distinguished scholarly society publisher needed its 15-year retrospective archive and active monthly journal pipeline transformed into structured JATS XML. Velvora implemented an automated XML-first conversion pipeline delivering 99.98% formula accuracy and immediate indexation in PubMed Central.',
    challenge: {
      headline: 'The Challenge: Disparate Author Word Files, Unstructured Citations & Complex MathML',
      overview: 'The publisher received manuscripts in dozens of author-supplied Word, LaTeX, and unstructured PDF formats. Unstructured reference citations, disparate figure numbering, and intricate multiline STEM equations caused chronic editorial bottlenecks and delayed PubMed Central indexing.',
      painPoints: [
        'Authors submitted manuscripts with inconsistent typographical styles and non-standard symbols.',
        'Over 12,000 historic articles locked in flat PDF formats without extractable citation metadata.',
        'Extensive inline and display mathematical formulas breaking when exported to standard markup.',
        'CrossRef DOI registration and PubMed Central deposit rejections due to subtle DTD syntax errors.',
        'Manual proofreading cycles slowing publication velocity to over 6 weeks per quarterly volume.'
      ]
    },
    solution: {
      headline: 'The Solution: Proprietary Parser Harness, MathML Translation & Schematron Rules',
      overview: 'Velvora engineered an automated conversion architecture tailored to the publisher’s custom DTD requirements. Word and PDF inputs were parsed, citation references were matched against CrossRef APIs, and mathematical formulas were converted into pristine MathML.',
      phases: [
        {
          phase: 'Phase 01',
          name: 'Input Normalization & Optical Recognition',
          desc: 'High-precision layout parsers stripped proprietary styling and extracted raw textual content, author affiliations, ORCIDs, and abstracts into structured intermediary JSON.'
        },
        {
          phase: 'Phase 02',
          name: 'Automated MathML Conversion & Formula Validation',
          desc: 'LaTeX expressions and Word Equation Editor objects were converted into fully compliant MathML 3.0 markup with visual rendering verification.'
        },
        {
          phase: 'Phase 03',
          name: 'Reference Linking & CrossRef DOI Integration',
          desc: 'Automated resolvers matched unstructured bibliographic citations against live CrossRef APIs, injecting permanent hyperlinked DOIs into every reference tag.'
        },
        {
          phase: 'Phase 04',
          name: 'Strict Schematron Quality Assurance & Delivery',
          desc: 'Custom Schematron validation pipelines enforced over 120 editorial business rules, guaranteeing 100% compliance with NISO JATS 1.3 DTD prior to deposit.'
        }
      ]
    },
    results: {
      headline: 'Measurable Outcomes: 40% Accelerated Production & Instant Indexation',
      metrics: [
        { stat: '99.98%', title: 'Character Accuracy', desc: 'Near-zero character error rate across complex scientific symbols, Greek letters, and formulas.' },
        { stat: '40%', title: 'Faster Time-to-Market', desc: 'Publishing cycle reduced from 6 weeks to under 18 days from manuscript acceptance.' },
        { stat: '100%', title: 'First-Pass PMC Deposit', desc: 'Zero rejection rate upon submission to the National Library of Medicine (PMC).' },
        { stat: '12,000+', title: 'Articles Backlisted', desc: 'Entire retrospective journal archive fully searchable, cited, and discoverable online.' }
      ]
    },
    testimonial: {
      quote: 'Velvora’s XML expertise is truly unparalleled in the STM publishing industry. Their MathML rendering precision and automated CrossRef citation matching cut our editorial turnaround in half.',
      author: 'Dr. Rebecca Thorne',
      role: 'Managing Editor-in-Chief',
      organization: 'Global Society of Biochemical Research'
    },
    keyTakeaways: [
      'Single-source JATS XML eliminates duplicate production effort across web, print, and mobile formats.',
      'Automated CrossRef citation resolution improves journal impact factor through persistent bibliographic hyperlinking.',
      'Rigorous Schematron business rules ensure 100% first-pass acceptance by PubMed Central and major indexing databases.'
    ],
    relatedSlug: 'epublishing-transformation'
  }
];

export function getCaseStudyBySlug(slug) {
  if (!slug) return null;
  return caseStudies.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function getAllCaseStudies() {
  return caseStudies;
}
