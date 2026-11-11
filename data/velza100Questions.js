/**
 * MASTER 100-QUESTION TEST DATASET FOR VELZA AI ASSISTANT
 * 
 * Strict Category Distribution:
 * - Company information: 8
 * - Services: 12
 * - Solutions: 8
 * - Technical and IT knowledge: 10
 * - PDF accessibility and WCAG: 10
 * - ePublishing and XML: 8
 * - AI and automation: 8
 * - Careers and recruitment: 8
 * - Internships and training: 8
 * - Vendor and business partnerships: 6
 * - Customer enquiries and quotations: 5
 * - General knowledge and conversational questions: 5
 * - Multi-intent and contextual questions: 4
 * TOTAL = 100
 */

export const velza100Questions = [
  // --------------------------------------------------------------------------
  // 1. COMPANY INFORMATION (8 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q001',
    category: 'Company information',
    q: 'What does Velvora Solutions do?',
    history: [],
    expectedIntent: 'COMPANY_ABOUT',
    expectedSource: '/about/company-overview',
    mustInclude: ['Velvora Solutions', 'Digital Accessibility', 'ePublishing'],
    mustNotInclude: ["I don't have verified records", 'connection pause'],
    isUnavailableInfo: false,
    notes: 'Direct company overview'
  },
  {
    id: 'Q002',
    category: 'Company information',
    q: 'Who founded Velvora Solutions and who is the CEO?',
    history: [],
    expectedIntent: 'COMPANY_LEADERSHIP',
    expectedSource: '/about/company-overview',
    mustInclude: ['Iyshwariya Senthil'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Leadership inquiry'
  },
  {
    id: 'Q003',
    category: 'Company information',
    q: 'Where are your company offices located?',
    history: [],
    expectedIntent: 'COMPANY_LOCATIONS',
    expectedSource: '/contact',
    mustInclude: ['Cuddalore', 'Chennai'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Office addresses and locations'
  },
  {
    id: 'Q004',
    category: 'Company information',
    q: 'What is Velvora\'s core mission and vision?',
    history: [],
    expectedIntent: 'COMPANY_MISSION',
    expectedSource: '/about/company-overview',
    mustInclude: ['mission', 'vision', 'accessibility'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Mission and long-term vision'
  },
  {
    id: 'Q005',
    category: 'Company information',
    q: 'What are the core values that guide Velvora Solutions?',
    history: [],
    expectedIntent: 'COMPANY_VALUES',
    expectedSource: '/about/company-overview',
    mustInclude: ['G.R.O.W', 'values'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Corporate values and GROW framework'
  },
  {
    id: 'Q006',
    category: 'Company information',
    q: 'What industries and client sectors does your company serve?',
    history: [],
    expectedIntent: 'COMPANY_INDUSTRIES',
    expectedSource: '/about/company-overview',
    mustInclude: ['publishers', 'universities', 'enterprises'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Target industry sectors'
  },
  {
    id: 'Q007',
    category: 'Company information',
    q: 'What is your company\'s net profit margin for the last fiscal year?',
    history: [],
    expectedIntent: 'COMPANY_FINANCIAL_UNAVAILABLE',
    expectedSource: '/contact',
    mustInclude: ['private', 'confidential'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Unavailable private financial info -> honest disclaimer'
  },
  {
    id: 'Q008',
    category: 'Company information',
    q: 'how did velvora started and wht makes u diffrnt from othr tech companys?',
    history: [],
    expectedIntent: 'COMPANY_ABOUT_TYPOS',
    expectedSource: '/about/company-overview',
    mustInclude: ['Velvora Solutions', 'Iyshwariya Senthil'],
    mustNotInclude: ["I don't have verified records", 'connection pause'],
    isUnavailableInfo: false,
    notes: 'Typo-heavy background & differentiator inquiry'
  },

  // --------------------------------------------------------------------------
  // 2. SERVICES (12 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q009',
    category: 'Services',
    q: 'What services do you provide?',
    history: [],
    expectedIntent: 'SERVICES_OVERVIEW',
    expectedSource: '/services',
    mustInclude: ['Publishing', 'Accessibility', 'AI', 'Software'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Overview of all 6 service disciplines'
  },
  {
    id: 'Q010',
    category: 'Services',
    q: 'Explain your digital accessibility services.',
    history: [],
    expectedIntent: 'SERVICE_ACCESSIBILITY',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['WCAG', 'PDF/UA', 'Section 508'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Accessibility & remediation capabilities'
  },
  {
    id: 'Q011',
    category: 'Services',
    q: 'What is ePublishing and what ebook formats do you produce?',
    history: [],
    expectedIntent: 'SERVICE_EPUBLISHING',
    expectedSource: '/services/epublishing',
    mustInclude: ['EPUB 3', 'reflowable', 'fixed-layout'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'ePublishing & eBook distribution'
  },
  {
    id: 'Q012',
    category: 'Services',
    q: 'Tell me about your XML publishing and schema conversion services.',
    history: [],
    expectedIntent: 'SERVICE_XML',
    expectedSource: '/services/xml',
    mustInclude: ['JATS', 'BITS', 'DITA'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Structured XML conversion & schemas'
  },
  {
    id: 'Q013',
    category: 'Services',
    q: 'What software and web development services do you offer?',
    history: [],
    expectedIntent: 'SERVICE_SOFTWARE_DEV',
    expectedSource: '/services/software-development',
    mustInclude: ['React', 'Python', 'microservices'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Full-stack software engineering'
  },
  {
    id: 'Q014',
    category: 'Services',
    q: 'What are your AI and automation capabilities?',
    history: [],
    expectedIntent: 'SERVICE_AI_AUTOMATION',
    expectedSource: '/services/ai-automation',
    mustInclude: ['Intelligent Document Processing', 'NLP'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'AI pipelines and IDP'
  },
  {
    id: 'Q015',
    category: 'Services',
    q: 'What data analytics and business intelligence services are available?',
    history: [],
    expectedIntent: 'SERVICE_DATA_ANALYTICS',
    expectedSource: '/services/data-analytics',
    mustInclude: ['Power BI', 'dashboards', 'ETL'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Data visualization and analytics'
  },
  {
    id: 'Q016',
    category: 'Services',
    q: 'Do you offer digital marketing and SEO services?',
    history: [],
    expectedIntent: 'SERVICE_DIGITAL_MARKETING',
    expectedSource: '/services/digital-marketing',
    mustInclude: ['SEO', 'Core Web Vitals'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Technical SEO and marketing'
  },
  {
    id: 'Q017',
    category: 'Services',
    q: 'What is MathML and equation typesetting in your content services?',
    history: [],
    expectedIntent: 'SERVICE_CONTENT_MATHML',
    expectedSource: '/services',
    mustInclude: ['MathML', 'LaTeX', 'STEM'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Mathematical equation typesetting'
  },
  {
    id: 'Q018',
    category: 'Services',
    q: 'Can you convert legacy paper documents or microfilm to searchable digital text?',
    history: [],
    expectedIntent: 'SERVICE_CONTENT_OCR',
    expectedSource: '/services',
    mustInclude: ['OCR', 'digitization'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Legacy scanning & OCR digitization'
  },
  {
    id: 'Q019',
    category: 'Services',
    q: 'Do you manufacture physical computer chips or assemble hardware components?',
    history: [],
    expectedIntent: 'SERVICE_OUT_OF_SCOPE_HARDWARE',
    expectedSource: '/services',
    mustInclude: ['do not provide', 'hardware'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Hardware manufacturing out-of-scope guardrail'
  },
  {
    id: 'Q020',
    category: 'Services',
    q: 'Can you provide fixed-layout EPUB for children\'s illustrated books with audio read-aloud?',
    history: [],
    expectedIntent: 'SERVICE_EPUBLISHING_FIXED',
    expectedSource: '/services/epublishing',
    mustInclude: ['fixed-layout', 'EPUB', 'read-aloud'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Childrens interactive fixed-layout EPUB'
  },

  // --------------------------------------------------------------------------
  // 3. SOLUTIONS (8 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q021',
    category: 'Solutions',
    q: 'What solutions does Velvora offer?',
    history: [],
    expectedIntent: 'SOLUTIONS_OVERVIEW',
    expectedSource: '/solutions',
    mustInclude: ['XML-First', 'PDF Accessibility', 'Solutions'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Overview of industry solutions'
  },
  {
    id: 'Q022',
    category: 'Solutions',
    q: 'Explain the XML-First Publishing Workflow solution.',
    history: [],
    expectedIntent: 'SOLUTION_XML_WORKFLOW',
    expectedSource: '/solutions',
    mustInclude: ['XML-First', 'JATS', 'BITS'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Automated XML publishing pipeline'
  },
  {
    id: 'Q023',
    category: 'Solutions',
    q: 'Tell me about your End-to-End PDF Accessibility Compliance solution.',
    history: [],
    expectedIntent: 'SOLUTION_ACCESSIBILITY',
    expectedSource: '/solutions',
    mustInclude: ['WCAG 2.2', 'PDF/UA', 'ISO 14289'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Enterprise accessibility compliance suite'
  },
  {
    id: 'Q024',
    category: 'Solutions',
    q: 'What is your AI-Powered Content Processing solution?',
    history: [],
    expectedIntent: 'SOLUTION_AI_CONTENT',
    expectedSource: '/solutions',
    mustInclude: ['Intelligent Document Processing', 'OCR', 'NLP'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Cognitive IDP content processing'
  },
  {
    id: 'Q025',
    category: 'Solutions',
    q: 'Explain the STEM and Mathematical Publishing Pipeline.',
    history: [],
    expectedIntent: 'SOLUTION_STEM_PIPELINE',
    expectedSource: '/solutions',
    mustInclude: ['STEM', 'MathML', 'LaTeX'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'STEM composition pipeline'
  },
  {
    id: 'Q026',
    category: 'Solutions',
    q: 'Which solution should an educational publisher choose for high-volume textbook conversion?',
    history: [],
    expectedIntent: 'SOLUTION_ADVISORY',
    expectedSource: '/solutions',
    mustInclude: ['XML-First', 'EPUB 3', 'accessibility'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Publisher solution recommendation'
  },
  {
    id: 'Q027',
    category: 'Solutions',
    q: 'How do your solutions reduce costs and turnaround time for enterprise clients?',
    history: [],
    expectedIntent: 'SOLUTION_BENEFITS',
    expectedSource: '/solutions',
    mustInclude: ['automation', 'turnaround', 'cost'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Value proposition and efficiency'
  },
  {
    id: 'Q028',
    category: 'Solutions',
    q: 'What proprietary quantum computing algorithms do your solutions utilize?',
    history: [],
    expectedIntent: 'SOLUTION_QUANTUM_UNAVAILABLE',
    expectedSource: '/solutions',
    mustInclude: ['do not utilize', 'quantum'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Unavailable quantum tech -> honest disclaimer'
  },

  // --------------------------------------------------------------------------
  // 4. TECHNICAL AND IT KNOWLEDGE (10 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q029',
    category: 'Technical and IT knowledge',
    q: 'What is semantic HTML and why does it matter for accessibility?',
    history: [],
    expectedIntent: 'TECH_SEMANTIC_HTML',
    expectedSource: '/services/software-development',
    mustInclude: ['Semantic HTML', 'screen readers', '<main>'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Semantic HTML and assistive tech'
  },
  {
    id: 'Q030',
    category: 'Technical and IT knowledge',
    q: 'Explain CSS Flexbox vs CSS Grid.',
    history: [],
    expectedIntent: 'TECH_CSS_LAYOUTS',
    expectedSource: '/services/software-development',
    mustInclude: ['Flexbox', 'Grid', 'one-dimensional', 'two-dimensional'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'CSS Flexbox vs Grid comparison'
  },
  {
    id: 'Q031',
    category: 'Technical and IT knowledge',
    q: 'How does the JavaScript event loop handle asynchronous tasks?',
    history: [],
    expectedIntent: 'TECH_JS_EVENT_LOOP',
    expectedSource: '/services/software-development',
    mustInclude: ['Event Loop', 'call stack', 'Microtask'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'JavaScript asynchronous execution'
  },
  {
    id: 'Q032',
    category: 'Technical and IT knowledge',
    q: 'What is React and how does the Virtual DOM work?',
    history: [],
    expectedIntent: 'TECH_REACT_VDOM',
    expectedSource: '/services/software-development',
    mustInclude: ['React', 'Virtual DOM', 'reconciliation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'React Virtual DOM diffing'
  },
  {
    id: 'Q033',
    category: 'Technical and IT knowledge',
    q: 'What is the difference between HTML and React?',
    history: [],
    expectedIntent: 'TECH_COMPARE_HTML_REACT',
    expectedSource: '/services/software-development',
    mustInclude: ['HTML', 'React', 'component'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'HTML vs React comparison'
  },
  {
    id: 'Q034',
    category: 'Technical and IT knowledge',
    q: 'What is FastAPI and why is it used for modern Python APIs?',
    history: [],
    expectedIntent: 'TECH_FASTAPI',
    expectedSource: '/services/software-development',
    mustInclude: ['FastAPI', 'ASGI', 'Pydantic'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'FastAPI modern Python architecture'
  },
  {
    id: 'Q035',
    category: 'Technical and IT knowledge',
    q: 'What is the difference between SQL and NoSQL databases?',
    history: [],
    expectedIntent: 'TECH_SQL_NOSQL',
    expectedSource: '/services/software-development',
    mustInclude: ['SQL', 'NoSQL', 'relational', 'schema'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Database architecture comparison'
  },
  {
    id: 'Q036',
    category: 'Technical and IT knowledge',
    q: 'What is Retrieval-Augmented Generation (RAG) and why is it used in enterprise AI?',
    history: [],
    expectedIntent: 'TECH_RAG',
    expectedSource: '/services/ai-automation',
    mustInclude: ['Retrieval-Augmented Generation', 'hallucination', 'vector'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'RAG enterprise AI architecture'
  },
  {
    id: 'Q037',
    category: 'Technical and IT knowledge',
    q: 'What is Docker containerization and how does it help deployment?',
    history: [],
    expectedIntent: 'TECH_DOCKER',
    expectedSource: '/services/software-development',
    mustInclude: ['Docker', 'container', 'isolation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Docker containerization & DevOps'
  },
  {
    id: 'Q038',
    category: 'Technical and IT knowledge',
    q: 'What is Git and how does branch merging work?',
    history: [],
    expectedIntent: 'TECH_GIT',
    expectedSource: '/services/software-development',
    mustInclude: ['Git', 'version control', 'branch'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Git version control & branches'
  },

  // --------------------------------------------------------------------------
  // 5. PDF ACCESSIBILITY AND WCAG (10 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q039',
    category: 'PDF accessibility and WCAG',
    q: 'What is WCAG?',
    history: [],
    expectedIntent: 'STANDARDS_WCAG',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['Web Content Accessibility Guidelines', 'W3C', 'POUR'],
    mustNotInclude: ['### WCAG vs PDF/UA', 'connection pause'],
    isUnavailableInfo: false,
    notes: 'WCAG definition and principles'
  },
  {
    id: 'Q040',
    category: 'PDF accessibility and WCAG',
    q: 'What are the four POUR principles of digital accessibility?',
    history: [],
    expectedIntent: 'STANDARDS_POUR',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['Perceivable', 'Operable', 'Understandable', 'Robust'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'POUR principles breakdown'
  },
  {
    id: 'Q041',
    category: 'PDF accessibility and WCAG',
    q: 'What is the difference between WCAG 2.2 Level A, Level AA, and Level AAA?',
    history: [],
    expectedIntent: 'STANDARDS_WCAG_LEVELS',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['Level A', 'Level AA', 'Level AAA'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'WCAG conformance levels'
  },
  {
    id: 'Q042',
    category: 'PDF accessibility and WCAG',
    q: 'What is PDF/UA (ISO 14289) and how does it differ from WCAG?',
    history: [],
    expectedIntent: 'STANDARDS_WCAG_VS_PDFUA',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['PDF/UA', 'ISO 14289', 'WCAG'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'PDF/UA vs WCAG comparison'
  },
  {
    id: 'Q043',
    category: 'PDF accessibility and WCAG',
    q: 'What is a tagged PDF and what is the PDF logical tag tree?',
    history: [],
    expectedIntent: 'STANDARDS_TAG_TREE',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['tag tree', 'reading order', '<Document>'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'PDF structure tree and tags'
  },
  {
    id: 'Q044',
    category: 'PDF accessibility and WCAG',
    q: 'What is Section 508 and who does it apply to?',
    history: [],
    expectedIntent: 'STANDARDS_SECTION_508',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['Section 508', 'Rehabilitation Act', 'federal'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'US Section 508 accessibility law'
  },
  {
    id: 'Q045',
    category: 'PDF accessibility and WCAG',
    q: 'What are the most common PDF accessibility errors found in documents?',
    history: [],
    expectedIntent: 'STANDARDS_COMMON_ERRORS',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['reading order', 'alt text', 'contrast'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Common accessibility remediation flaws'
  },
  {
    id: 'Q046',
    category: 'PDF accessibility and WCAG',
    q: 'How should alternative text (alt text) be written for complex scientific charts?',
    history: [],
    expectedIntent: 'STANDARDS_ALT_TEXT',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['alt text', 'data', 'chart'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Scientific chart alt text principles'
  },
  {
    id: 'Q047',
    category: 'PDF accessibility and WCAG',
    q: 'Can automated accessibility checkers catch 100% of WCAG violations?',
    history: [],
    expectedIntent: 'STANDARDS_AUTOMATED_VS_MANUAL',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['automated', 'manual', 'screen reader'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Need for human QA alongside checkers'
  },
  {
    id: 'Q048',
    category: 'PDF accessibility and WCAG',
    q: 'What is a VPAT and do you provide Voluntary Product Accessibility Templates?',
    history: [],
    expectedIntent: 'STANDARDS_VPAT',
    expectedSource: '/services/digital-accessibility',
    mustInclude: ['VPAT', 'Voluntary Product Accessibility Template'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'VPAT statement generation'
  },

  // --------------------------------------------------------------------------
  // 6. EPUBLISHING AND XML (8 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q049',
    category: 'ePublishing and XML',
    q: 'What is the difference between EPUB 3 and PDF?',
    history: [],
    expectedIntent: 'EPUB_COMPARE_EPUB_PDF',
    expectedSource: '/services/epublishing',
    mustInclude: ['EPUB', 'PDF', 'reflowable'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'EPUB3 vs PDF comparison'
  },
  {
    id: 'Q050',
    category: 'ePublishing and XML',
    q: 'What is reflowable vs fixed-layout EPUB?',
    history: [],
    expectedIntent: 'EPUB_REFLOWABLE_VS_FIXED',
    expectedSource: '/services/epublishing',
    mustInclude: ['reflowable', 'fixed-layout'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'EPUB layout formats'
  },
  {
    id: 'Q051',
    category: 'ePublishing and XML',
    q: 'What is the difference between XML and HTML?',
    history: [],
    expectedIntent: 'XML_COMPARE_XML_HTML',
    expectedSource: '/services/xml',
    mustInclude: ['XML', 'HTML', 'data', 'presentation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'XML vs HTML comparison'
  },
  {
    id: 'Q052',
    category: 'ePublishing and XML',
    q: 'What are JATS XML and BITS XML used for in academic publishing?',
    history: [],
    expectedIntent: 'XML_JATS_BITS',
    expectedSource: '/services/xml',
    mustInclude: ['JATS', 'BITS', 'journal'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Academic journal XML standards'
  },
  {
    id: 'Q053',
    category: 'ePublishing and XML',
    q: 'What is DITA XML and what are its advantages for technical documentation?',
    history: [],
    expectedIntent: 'XML_DITA',
    expectedSource: '/services/xml',
    mustInclude: ['DITA', 'modular', 'reuse'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'DITA XML topic-based authoring'
  },
  {
    id: 'Q054',
    category: 'ePublishing and XML',
    q: 'How do you validate EPUB files against EPUBCheck and Ace by DAISY?',
    history: [],
    expectedIntent: 'EPUB_VALIDATION',
    expectedSource: '/services/epublishing',
    mustInclude: ['EPUBCheck', 'Ace by DAISY', 'validation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'EPUB quality assurance'
  },
  {
    id: 'Q055',
    category: 'ePublishing and XML',
    q: 'What are Schematron and DTD/XSD validation in XML workflows?',
    history: [],
    expectedIntent: 'XML_SCHEMATRON_VALIDATION',
    expectedSource: '/services/xml',
    mustInclude: ['Schematron', 'schema', 'validation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Business rule XML validation'
  },
  {
    id: 'Q056',
    category: 'ePublishing and XML',
    q: 'What is MathML and how does it ensure equations are readable by screen readers?',
    history: [],
    expectedIntent: 'XML_MATHML_A11Y',
    expectedSource: '/services',
    mustInclude: ['MathML', 'screen reader', 'equation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Accessible MathML markup'
  },

  // --------------------------------------------------------------------------
  // 7. AI AND AUTOMATION (8 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q057',
    category: 'AI and automation',
    q: 'What is Intelligent Document Processing (IDP)?',
    history: [],
    expectedIntent: 'AI_IDP_DEFINITION',
    expectedSource: '/services/ai-automation',
    mustInclude: ['Intelligent Document Processing', 'OCR', 'NLP'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'IDP definition and pipeline'
  },
  {
    id: 'Q058',
    category: 'AI and automation',
    q: 'What are the latest technology trends?',
    history: [],
    expectedIntent: 'AI_TECH_TRENDS',
    expectedSource: '/services/ai-automation',
    mustInclude: ['Generative AI', 'Agentic Workflows', 'Accessibility', 'Cloud-Native'],
    mustNotInclude: ['### Accessibility Statement', 'connection pause'],
    isUnavailableInfo: false,
    notes: 'Latest global technology trends'
  },
  {
    id: 'Q059',
    category: 'AI and automation',
    q: 'How does AI automation improve business efficiency?',
    history: [],
    expectedIntent: 'AI_BUSINESS_EFFICIENCY',
    expectedSource: '/services/ai-automation',
    mustInclude: ['efficiency', 'automation', 'error'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'AI operational ROI'
  },
  {
    id: 'Q060',
    category: 'AI and automation',
    q: 'What is the difference between Traditional Automation (RPA) and AI Automation?',
    history: [],
    expectedIntent: 'AI_RPA_VS_AI',
    expectedSource: '/services/ai-automation',
    mustInclude: ['RPA', 'AI', 'rule-based', 'cognitive'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'RPA vs AI comparison'
  },
  {
    id: 'Q061',
    category: 'AI and automation',
    q: 'Can AI completely automate PDF accessibility tagging without human review?',
    history: [],
    expectedIntent: 'AI_ACCESSIBILITY_LIMITS',
    expectedSource: '/services/ai-automation',
    mustInclude: ['human', 'validation', 'accuracy'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Human-in-the-loop AI validation'
  },
  {
    id: 'Q062',
    category: 'AI and automation',
    q: 'What are Autonomous AI Agents and how do agentic workflows operate?',
    history: [],
    expectedIntent: 'AI_AUTONOMOUS_AGENTS',
    expectedSource: '/services/ai-automation',
    mustInclude: ['AI Agents', 'autonomous', 'tools'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Agentic workflows and reasoning'
  },
  {
    id: 'Q063',
    category: 'AI and automation',
    q: 'How do you prevent hallucinations in generative AI and enterprise chatbots?',
    history: [],
    expectedIntent: 'AI_HALLUCINATION_PREVENTION',
    expectedSource: '/services/ai-automation',
    mustInclude: ['RAG', 'grounding', 'hallucination'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Enterprise RAG grounding'
  },
  {
    id: 'Q064',
    category: 'AI and automation',
    q: 'Do you have an AI model that can predict lottery winning numbers?',
    history: [],
    expectedIntent: 'AI_LOTTERY_UNAVAILABLE',
    expectedSource: '/services/ai-automation',
    mustInclude: ['cannot predict', 'lottery'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Unavailable / implausible AI claim -> honest disclaimer'
  },

  // --------------------------------------------------------------------------
  // 8. CAREERS AND RECRUITMENT (8 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q065',
    category: 'Careers and recruitment',
    q: 'How can I submit my resume for a job?',
    history: [],
    expectedIntent: 'CAREERS_RESUME_SUBMIT',
    expectedSource: '/careers',
    mustInclude: ['Careers Portal', 'resume', 'careers@velvorasolutions.com'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Online and email resume submission'
  },
  {
    id: 'Q066',
    category: 'Careers and recruitment',
    q: 'What is your selection process?',
    history: [],
    expectedIntent: 'CAREERS_SELECTION_PROCESS',
    expectedSource: '/careers',
    mustInclude: ['Recruitment', 'Screening', 'Technical', 'HR'],
    mustNotInclude: ['### AI and Automation Services', 'connection pause'],
    isUnavailableInfo: false,
    notes: 'Candidate recruitment & evaluation stages'
  },
  {
    id: 'Q067',
    category: 'Careers and recruitment',
    q: 'What career openings are currently available at Velvora Solutions?',
    history: [],
    expectedIntent: 'CAREERS_OPENINGS',
    expectedSource: '/careers',
    mustInclude: ['Careers', 'openings'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Active job openings'
  },
  {
    id: 'Q068',
    category: 'Careers and recruitment',
    q: 'Are freshers eligible to apply for jobs at Velvora?',
    history: [],
    expectedIntent: 'CAREERS_FRESHER_ELIGIBILITY',
    expectedSource: '/careers',
    mustInclude: ['freshers', 'entry-level', 'training'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Fresher job eligibility'
  },
  {
    id: 'Q069',
    category: 'Careers and recruitment',
    q: 'What is the exact starting salary for an entry-level software engineer?',
    history: [],
    expectedIntent: 'CAREERS_SALARY_INQUIRY',
    expectedSource: '/careers',
    mustInclude: ['compensation', 'interview', 'evaluation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Salary finalized during HR round -> honest explanation'
  },
  {
    id: 'Q070',
    category: 'Careers and recruitment',
    q: 'What email should I send my CV to for job applications?',
    history: [],
    expectedIntent: 'CAREERS_EMAIL_CHANNEL',
    expectedSource: '/careers',
    mustInclude: ['careers@velvorasolutions.com'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Recruitment email address'
  },
  {
    id: 'Q071',
    category: 'Careers and recruitment',
    q: 'Do you offer remote, hybrid, or in-person work options for employees?',
    history: [],
    expectedIntent: 'CAREERS_WORK_MODES',
    expectedSource: '/careers',
    mustInclude: ['Remote', 'Hybrid', 'In-Person'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Work arrangements'
  },
  {
    id: 'Q072',
    category: 'Careers and recruitment',
    q: 'hwo can i submt my resme for jb?',
    history: [],
    expectedIntent: 'CAREERS_RESUME_TYPOS',
    expectedSource: '/careers',
    mustInclude: ['Careers Portal', 'resume'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Extreme typo-resilience in recruitment query'
  },

  // --------------------------------------------------------------------------
  // 9. INTERNSHIPS AND TRAINING (8 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q073',
    category: 'Internships and training',
    q: 'What training programs do you offer?',
    history: [],
    expectedIntent: 'TRAINING_PROGRAMS_LIST',
    expectedSource: '/training',
    mustInclude: ['Training', 'ePublishing', 'AI', 'Accessibility'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'List of all 8 training tracks'
  },
  {
    id: 'Q074',
    category: 'Internships and training',
    q: 'What is the course duration?',
    history: [],
    expectedIntent: 'TRAINING_DURATIONS',
    expectedSource: '/training',
    mustInclude: ['4 Weeks', '8 to 12 Weeks', '3 Months or 6 Months'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Course duration breakdown'
  },
  {
    id: 'Q075',
    category: 'Internships and training',
    q: 'Who is eligible to apply for your training and internship programs?',
    history: [],
    expectedIntent: 'TRAINING_ELIGIBILITY',
    expectedSource: '/training',
    mustInclude: ['Students', 'Graduates', 'Professionals'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Eligibility criteria'
  },
  {
    id: 'Q076',
    category: 'Internships and training',
    q: 'Tell me about the Flagship Internship Program and what projects students work on.',
    history: [],
    expectedIntent: 'TRAINING_FLAGSHIP_INTERNSHIP',
    expectedSource: '/training/internship-program',
    mustInclude: ['Flagship Internship', 'live client project', 'PPO'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Internship program details'
  },
  {
    id: 'Q077',
    category: 'Internships and training',
    q: 'Explain your Python Full Stack Web Development training curriculum.',
    history: [],
    expectedIntent: 'TRAINING_PYTHON_CURRICULUM',
    expectedSource: '/training',
    mustInclude: ['Python', 'FastAPI', 'React', 'SQL'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Python full stack syllabus'
  },
  {
    id: 'Q078',
    category: 'Internships and training',
    q: 'Do you guarantee 100% government job placement after completing the course?',
    history: [],
    expectedIntent: 'TRAINING_GOVT_PLACEMENT_DISCLAIMER',
    expectedSource: '/training',
    mustInclude: ['do not guarantee', 'PPO'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'No government placement guarantee -> honest disclaimer'
  },
  {
    id: 'Q079',
    category: 'Internships and training',
    q: 'Do students receive an official certificate after finishing the internship?',
    history: [],
    expectedIntent: 'TRAINING_CERTIFICATE',
    expectedSource: '/training',
    mustInclude: ['Certificate', 'Letter of Recommendation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Certificate of completion'
  },
  {
    id: 'Q080',
    category: 'Internships and training',
    q: 'What are the delivery modes for training (online, classroom, hybrid)?',
    history: [],
    expectedIntent: 'TRAINING_DELIVERY_MODES',
    expectedSource: '/training',
    mustInclude: ['Online', 'In-person', 'Hybrid'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Online, classroom, and hybrid delivery'
  },

  // --------------------------------------------------------------------------
  // 10. VENDOR AND BUSINESS PARTNERSHIPS (6 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q081',
    category: 'Vendor and business partnerships',
    q: 'How do I apply for vendor partnership?',
    history: [],
    expectedIntent: 'PARTNERSHIP_VENDOR_APPLY',
    expectedSource: '/partner-with-us',
    mustInclude: ['Partner With Us', 'collaboration', 'Vendor'],
    mustNotInclude: ['student internship', 'connection pause'],
    isUnavailableInfo: false,
    notes: 'Vendor partnership process'
  },
  {
    id: 'Q082',
    category: 'Vendor and business partnerships',
    q: 'Can digital agencies or publishers collaborate with Velvora Solutions?',
    history: [],
    expectedIntent: 'PARTNERSHIP_MODELS',
    expectedSource: '/partner-with-us',
    mustInclude: ['Subcontractors', 'Alliance', 'Referral'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Collaboration models'
  },
  {
    id: 'Q083',
    category: 'Vendor and business partnerships',
    q: 'Do you offer white-label subcontracting services for agencies?',
    history: [],
    expectedIntent: 'PARTNERSHIP_WHITE_LABEL',
    expectedSource: '/partner-with-us',
    mustInclude: ['white-label', 'subcontracting', 'composition'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Agency white-label subcontracting'
  },
  {
    id: 'Q084',
    category: 'Vendor and business partnerships',
    q: 'Do you sign Non-Disclosure Agreements (NDAs) before discussing project partnerships?',
    history: [],
    expectedIntent: 'PARTNERSHIP_NDA',
    expectedSource: '/partner-with-us',
    mustInclude: ['Non-Disclosure Agreements', 'NDA', 'confidentiality'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'NDA protection for partners'
  },
  {
    id: 'Q085',
    category: 'Vendor and business partnerships',
    q: 'What is the email or link to submit a formal vendor proposal?',
    history: [],
    expectedIntent: 'PARTNERSHIP_SUBMISSION_CHANNEL',
    expectedSource: '/partner-with-us',
    mustInclude: ['info@velvorasolutions.com', 'Partner With Us'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Proposal submission channels'
  },
  {
    id: 'Q086',
    category: 'Vendor and business partnerships',
    q: 'Can our university or research lab form an academic alliance with Velvora?',
    history: [],
    expectedIntent: 'PARTNERSHIP_ACADEMIC',
    expectedSource: '/partner-with-us',
    mustInclude: ['collaboration', 'Partner With Us'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Academic research & training alliances'
  },

  // --------------------------------------------------------------------------
  // 11. CUSTOMER ENQUIRIES AND QUOTATIONS (5 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q087',
    category: 'Customer enquiries and quotations',
    q: 'How can I request a quotation for a project?',
    history: [],
    expectedIntent: 'QUOTATION_REQUEST_WORKFLOW',
    expectedSource: '/contact',
    mustInclude: ['Contact Us Page', 'info@velvorasolutions.com', 'proposal'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Project quotation request workflow'
  },
  {
    id: 'Q088',
    category: 'Customer enquiries and quotations',
    q: 'What information should I provide to get an accurate project cost estimate?',
    history: [],
    expectedIntent: 'QUOTATION_ESTIMATE_DETAILS',
    expectedSource: '/contact',
    mustInclude: ['Service Required', 'Volume', 'Deadline', 'Sample'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Details required for quotation scoping'
  },
  {
    id: 'Q089',
    category: 'Customer enquiries and quotations',
    q: 'What is the exact fixed cost per page for PDF accessibility remediation?',
    history: [],
    expectedIntent: 'QUOTATION_PRICING_PER_PAGE',
    expectedSource: '/contact',
    mustInclude: ['complexity', 'quote', 'customized'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Variable page complexity -> honest quote explanation'
  },
  {
    id: 'Q090',
    category: 'Customer enquiries and quotations',
    q: 'What is the expected turnaround time for receiving a project proposal?',
    history: [],
    expectedIntent: 'QUOTATION_TURNAROUND_TIMELINE',
    expectedSource: '/contact',
    mustInclude: ['24–48 hours', 'proposal'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Estimation turnaround timeline'
  },
  {
    id: 'Q091',
    category: 'Customer enquiries and quotations',
    q: 'How can I contact your sales or support team?',
    history: [],
    expectedIntent: 'CONTACT_CHANNELS',
    expectedSource: '/contact',
    mustInclude: ['info@velvorasolutions.com', '+91 9500834236'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Direct phone, email, and contact form'
  },

  // --------------------------------------------------------------------------
  // 12. GENERAL KNOWLEDGE AND CONVERSATIONAL (5 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q092',
    category: 'General knowledge and conversational questions',
    q: 'Hello, good morning!',
    history: [],
    expectedIntent: 'CONVERSATIONAL_GREETING',
    expectedSource: '/services',
    mustInclude: ['Velza', 'Velvora Solutions'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Greeting & introductory prompt'
  },
  {
    id: 'Q093',
    category: 'General knowledge and conversational questions',
    q: 'Who are you and what is your name?',
    history: [],
    expectedIntent: 'CONVERSATIONAL_IDENTITY',
    expectedSource: '/about/company-overview',
    mustInclude: ['Velza', 'AI assistant'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Chatbot identity'
  },
  {
    id: 'Q094',
    category: 'General knowledge and conversational questions',
    q: 'Can you draft a business email requesting a quotation for PDF remediation?',
    history: [],
    expectedIntent: 'PROFESSIONAL_DRAFT_EMAIL',
    expectedSource: '/contact',
    mustInclude: ['Subject:', 'Dear', 'remediation'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Professional business email drafting'
  },
  {
    id: 'Q095',
    category: 'General knowledge and conversational questions',
    q: 'Can you perform open-heart surgery or prescribe medicine?',
    history: [],
    expectedIntent: 'OUT_OF_SCOPE_MEDICAL',
    expectedSource: '/services',
    mustInclude: ['do not provide', 'medical'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: true,
    notes: 'Medical out-of-scope domain boundary'
  },
  {
    id: 'Q096',
    category: 'General knowledge and conversational questions',
    q: 'Thank you for your help, Velza!',
    history: [],
    expectedIntent: 'CONVERSATIONAL_COURTESY',
    expectedSource: '/services',
    mustInclude: ['welcome', 'assist'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Polite thank you / courtesy closing'
  },

  // --------------------------------------------------------------------------
  // 13. MULTI-INTENT AND CONTEXTUAL QUESTIONS (4 questions)
  // --------------------------------------------------------------------------
  {
    id: 'Q097',
    category: 'Multi-intent and contextual questions',
    q: 'What should I do if I want to work with your company?',
    history: [],
    expectedIntent: 'MULTI_INTENT_WORK_WITH_US',
    expectedSource: '/contact',
    mustInclude: ['Client', 'Partner', 'Career'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Disambiguates client vs partner vs job seeker'
  },
  {
    id: 'Q098',
    category: 'Multi-intent and contextual questions',
    q: 'I need both PDF accessibility and ePublishing services for my organization.',
    history: [],
    expectedIntent: 'MULTI_INTENT_ACCESSIBILITY_EPUBLISHING',
    expectedSource: '/services',
    mustInclude: ['PDF accessibility', 'ePublishing'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Combined dual-service inquiry'
  },
  {
    id: 'Q099',
    category: 'Multi-intent and contextual questions',
    q: 'Tell me more about the second one.',
    history: [
      { role: 'user', content: 'What services do you provide?' },
      { 
        role: 'assistant', 
        content: "We provide:\n1. Publishing and XML Services\n2. Content Services (Typesetting, MathML, OCR)\n3. Digital Accessibility\n4. AI Automation\n5. Software Development\n6. Data Analytics" 
      }
    ],
    expectedIntent: 'CONTEXTUAL_ORDINAL_FOLLOWUP',
    expectedSource: '/services',
    mustInclude: ['Content Services', 'Typesetting'],
    mustNotInclude: ['connection pause'],
    isUnavailableInfo: false,
    notes: 'Ordinal follow-up resolution from previous list'
  },
  {
    id: 'Q100',
    category: 'Multi-intent and contextual questions',
    q: 'How do I apply for vendor partnership?',
    history: [
      { role: 'user', content: 'Tell me about student internships' },
      { role: 'assistant', content: 'We offer a Flagship Internship Program for college students and freshers.' }
    ],
    expectedIntent: 'CONTAMINATION_GUARD_VENDOR_AFTER_INTERNSHIP',
    expectedSource: '/partner-with-us',
    mustInclude: ['Partner With Us', 'Vendor', 'collaboration'],
    mustNotInclude: ['student internship', 'G.R.O.W. Framework', 'connection pause'],
    isUnavailableInfo: false,
    notes: 'Zero contamination: vendor partnership query after internship turn'
  }
];
