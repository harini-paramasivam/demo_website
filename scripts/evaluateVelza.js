import { voraStore } from '../server/voraKnowledgeStore.js';

/**
 * MASTER EVALUATION & REGRESSION SUITE FOR VELZA AI ASSISTANT
 * 
 * Part 1: 5x Consistency Testing on the 6 Critical Bug Reproduction Scenarios (30 runs)
 * Part 2: Sequential Cross-Domain Conversation Flow (Contamination Check)
 * Part 3: Phrasing & Natural Language Variations (12 runs)
 * Part 4: Broad 235-Question Suite across all 16 Real-World Visitor Categories
 * 
 * Total: 284 Evaluated Tests
 */

// 6 Core Mandatory Tests to be run 5 times each
const coreReproductionTests = [
  {
    id: 'BUG-1: Company Overview',
    intent: 'COMPANY_ABOUT',
    q: 'What does your company do?',
    history: [],
    mustInclude: ['Velvora Solutions', 'Digital Accessibility', 'ePublishing'],
    mustNotInclude: ["I don't have verified records", "connection pause"],
    expectedSource: '/about/company-overview'
  },
  {
    id: 'BUG-2: WCAG Deep Dive',
    intent: 'STANDARDS_WCAG',
    q: 'What is WCAG?',
    history: [],
    mustInclude: ['Web Content Accessibility Guidelines', 'POUR', 'Perceivable', 'Operable', 'Understandable', 'Robust'],
    mustNotInclude: ['### WCAG vs PDF/UA', "connection pause"],
    expectedSource: '/services/digital-accessibility'
  },
  {
    id: 'BUG-3: Selection Process',
    intent: 'CAREER_SELECTION_PROCESS',
    q: 'What is your selection process?',
    history: [],
    mustInclude: ['Recruitment', 'Screening', 'Technical', 'Careers Portal'],
    mustNotInclude: ['### AI and Automation Services', "connection pause"],
    expectedSource: '/careers'
  },
  {
    id: 'BUG-4: Course Duration',
    intent: 'TRAINING_DURATION',
    q: 'What is the course duration?',
    history: [],
    mustInclude: ['4 Weeks', '8 to 12 Weeks', '3 Months or 6 Months'],
    mustNotInclude: ['connection pause'],
    expectedSource: '/training'
  },
  {
    id: 'BUG-5: Vendor Partnership after Internship History',
    intent: 'VENDOR_PARTNERSHIP_AFTER_INTERNSHIP',
    q: 'How do I apply for vendor partnership?',
    history: [
      { role: 'user', content: 'What internship programs do you have?' },
      { role: 'assistant', content: 'Our Flagship Internship Program offers 3 to 6 months hands-on projects.' }
    ],
    mustInclude: ['Partner With Us', 'collaboration', 'Vendor'],
    mustNotInclude: ['G.R.O.W. Framework', 'student internship', 'internship curriculum', 'connection pause'],
    expectedSource: '/partner-with-us'
  },
  {
    id: 'BUG-6: Latest Technology Trends',
    intent: 'TECH_TRENDS',
    q: 'What are the latest technology trends?',
    history: [],
    mustInclude: ['Generative AI', 'Agentic Workflows', 'Accessibility', 'Cloud-Native'],
    mustNotInclude: ['### Accessibility Statement', "connection pause"],
    expectedSource: '/services/ai-automation'
  }
];

// Cross-Domain Sequential Conversation Flow (verifies zero context leakage between turns)
const crossDomainFlow = [
  { q: 'Tell me about your internship program', expectedDomain: 'internship' },
  { q: 'What does your company do?', expectedDomain: 'company-overview' },
  { q: 'How do I apply for vendor partnership?', expectedDomain: 'vendor-partnership' },
  { q: 'What is WCAG?', expectedDomain: 'wcag-education' },
  { q: 'What is your selection process?', expectedDomain: 'selection-process' },
  { q: 'What is the course duration?', expectedDomain: 'course-duration' },
  { q: 'What are the latest technology trends?', expectedDomain: 'tech-trends' }
];

// Phrasing & Natural Language Variations
const variationTests = [
  { q: 'what does your company do?', expectedTopic: 'company' },
  { q: 'what does velvora do?', expectedTopic: 'company' },
  { q: 'tell me about your company business', expectedTopic: 'company' },
  { q: 'explain wcag principles', expectedTopic: 'wcag' },
  { q: 'what are pour principles in wcag?', expectedTopic: 'wcag' },
  { q: 'what is your hiring procedure?', expectedTopic: 'selection' },
  { q: 'how do you select candidates?', expectedTopic: 'selection' },
  { q: 'what happens after submitting my resume?', expectedTopic: 'selection' },
  { q: 'how long is the training course?', expectedTopic: 'duration' },
  { q: 'what is the duration of your training?', expectedTopic: 'duration' },
  { q: 'how can our agency register as a vendor partner?', expectedTopic: 'vendor' },
  { q: 'current emerging tech trends in 2025', expectedTopic: 'trends' }
];

// Broad 235-Question Suite across 16 Categories
const broadCategoryTests = [
  // CATEGORY 1: COMPANY BACKGROUND & LEADERSHIP (15)
  { cat: 'Company & Leadership', q: 'What is Velvora Solutions?' },
  { cat: 'Company & Leadership', q: 'Tell me about the history and background of Velvora Solutions.' },
  { cat: 'Company & Leadership', q: 'Who founded Velvora Solutions and who are the leaders?' },
  { cat: 'Company & Leadership', q: 'Who is the CEO of Velvora Solutions?' },
  { cat: 'Company & Leadership', q: 'What is Velvora Solutions mission statement?' },
  { cat: 'Company & Leadership', q: 'What is Velvoras long-term vision?' },
  { cat: 'Company & Leadership', q: 'What are the core corporate values of Velvora Solutions?' },
  { cat: 'Company & Leadership', q: 'What makes Velvora Solutions different from other tech companies?' },
  { cat: 'Company & Leadership', q: 'What industries does Velvora Solutions serve?' },
  { cat: 'Company & Leadership', q: 'What is Velvoras overall business approach?' },
  { cat: 'Company & Leadership', q: 'What are the key technical capabilities of Velvora Solutions?' },
  { cat: 'Company & Leadership', q: 'Where are Velvoras corporate offices located?' },
  { cat: 'Company & Leadership', q: 'How does Velvora ensure data security and confidentiality?' },
  { cat: 'Company & Leadership', q: 'Can you give an overview of your management team?' },
  { cat: 'Company & Leadership', q: 'How can an enterprise initiate a business relationship with Velvora?' },

  // CATEGORY 2: SERVICES & DISCIPLINES (25)
  { cat: 'Services & Disciplines', q: 'What services do you provide?' },
  { cat: 'Services & Disciplines', q: 'Can you list all 6 core service disciplines at Velvora?' },
  { cat: 'Services & Disciplines', q: 'Explain your PDF accessibility services.' },
  { cat: 'Services & Disciplines', q: 'What is ePublishing and how does Velvora help publishers?' },
  { cat: 'Services & Disciplines', q: 'Explain your XML publishing and content conversion services.' },
  { cat: 'Services & Disciplines', q: 'What software development capabilities do you have?' },
  { cat: 'Services & Disciplines', q: 'Tell me about your AI automation services.' },
  { cat: 'Services & Disciplines', q: 'What data analytics and business intelligence solutions do you offer?' },
  { cat: 'Services & Disciplines', q: 'Do you provide web development services?' },
  { cat: 'Services & Disciplines', q: 'What digital marketing services do you offer?' },
  { cat: 'Services & Disciplines', q: 'What is MathML conversion and how do you handle complex STEM documents?' },
  { cat: 'Services & Disciplines', q: 'Do you support legacy print to digital conversion?' },
  { cat: 'Services & Disciplines', q: 'How do you perform document remediation for educational institutions?' },
  { cat: 'Services & Disciplines', q: 'Can you handle enterprise-scale EPUB3 conversion projects?' },
  { cat: 'Services & Disciplines', q: 'What content management and DITA XML services are available?' },
  { cat: 'Services & Disciplines', q: 'Do you build custom web applications and full-stack portals?' },
  { cat: 'Services & Disciplines', q: 'Can you integrate AI chatbots and predictive models into our software?' },
  { cat: 'Services & Disciplines', q: 'What tools and stacks do you use for software development?' },
  { cat: 'Services & Disciplines', q: 'Do you offer SEO optimization and performance marketing?' },
  { cat: 'Services & Disciplines', q: 'How do your data visualization dashboards work?' },
  { cat: 'Services & Disciplines', q: 'What quality assurance workflows do you apply to ePublishing?' },
  { cat: 'Services & Disciplines', q: 'Can you remediate scanned documents that lack digital text?' },
  { cat: 'Services & Disciplines', q: 'Do you offer Section 508 compliance verification for government agencies?' },
  { cat: 'Services & Disciplines', q: 'What is interactive fixed-layout vs reflowable EPUB?' },
  { cat: 'Services & Disciplines', q: 'How does Velvora deliver end-to-end digital transformation?' },

  // CATEGORY 3: SOLUTIONS & PRODUCTS (15)
  { cat: 'Solutions & Products', q: 'Can you explain your solutions?' },
  { cat: 'Solutions & Products', q: 'What enterprise solutions does Velvora offer?' },
  { cat: 'Solutions & Products', q: 'What is your Intelligent Document Processing (IDP) solution?' },
  { cat: 'Solutions & Products', q: 'Tell me about the Enterprise Accessibility Suite.' },
  { cat: 'Solutions & Products', q: 'What is the Automated XML Publishing Pipeline?' },
  { cat: 'Solutions & Products', q: 'Explain your Custom Cloud ERP & SaaS Platforms.' },
  { cat: 'Solutions & Products', q: 'What is the Business Intelligence & Predictive Analytics Engine?' },
  { cat: 'Solutions & Products', q: 'What is the Omnichannel Digital Growth Engine?' },
  { cat: 'Solutions & Products', q: 'Which solution is right for a bank needing accessible statements?' },
  { cat: 'Solutions & Products', q: 'Which solution should a textbook publisher choose for interactive ebooks?' },
  { cat: 'Solutions & Products', q: 'How do your solutions reduce operational costs for companies?' },
  { cat: 'Solutions & Products', q: 'What is the implementation timeline for enterprise solutions?' },
  { cat: 'Solutions & Products', q: 'Can your solutions integrate with our existing CRM and databases?' },
  { cat: 'Solutions & Products', q: 'Are your software solutions cloud-native or on-premise?' },
  { cat: 'Solutions & Products', q: 'How do your AI solutions handle sensitive corporate data?' },

  // CATEGORY 4: TECHNICAL & COMPUTER SCIENCE (30)
  { cat: 'Technical & CS', q: 'What is HTML and how does semantic HTML work?' },
  { cat: 'Technical & CS', q: 'Explain semantic HTML tags and why they matter for accessibility.' },
  { cat: 'Technical & CS', q: 'What is CSS and how does CSS Flexbox differ from CSS Grid?' },
  { cat: 'Technical & CS', q: 'Explain the CSS Box Model.' },
  { cat: 'Technical & CS', q: 'What is JavaScript and how does the JS event loop work?' },
  { cat: 'Technical & CS', q: 'Explain synchronous vs asynchronous JavaScript and Promises.' },
  { cat: 'Technical & CS', q: 'What is React and how does the Virtual DOM function?' },
  { cat: 'Technical & CS', q: 'Explain React hooks like useState, useEffect, and useMemo.' },
  { cat: 'Technical & CS', q: 'What is Python and why is it popular in software and AI?' },
  { cat: 'Technical & CS', q: 'How does the Python Virtual Machine execute bytecode?' },
  { cat: 'Technical & CS', q: 'What is FastAPI and how does it compare to Flask?' },
  { cat: 'Technical & CS', q: 'Explain ASGI, Pydantic, and async endpoints in FastAPI.' },
  { cat: 'Technical & CS', q: 'What is an API and how does RESTful architecture work?' },
  { cat: 'Technical & CS', q: 'What are the main HTTP methods and status codes in REST APIs?' },
  { cat: 'Technical & CS', q: 'What is SQL and how does relational database management work?' },
  { cat: 'Technical & CS', q: 'What is the difference between SQL and NoSQL databases like MongoDB?' },
  { cat: 'Technical & CS', q: 'Explain ACID compliance in relational database management systems.' },
  { cat: 'Technical & CS', q: 'What is Artificial Intelligence and Machine Learning?' },
  { cat: 'Technical & CS', q: 'What are Large Language Models (LLMs) and how are they trained?' },
  { cat: 'Technical & CS', q: 'What is Retrieval-Augmented Generation (RAG) and why is it important?' },
  { cat: 'Technical & CS', q: 'What are AI Agents and autonomous agentic workflows?' },
  { cat: 'Technical & CS', q: 'What is Docker and containerization in modern DevOps?' },
  { cat: 'Technical & CS', q: 'Explain Git version control, branching, and pull requests.' },
  { cat: 'Technical & CS', q: 'What is cloud computing with AWS, Azure, and Google Cloud?' },
  { cat: 'Technical & CS', q: 'What is OCR technology and how does Optical Character Recognition work?' },
  { cat: 'Technical & CS', q: 'Explain the logical structure and Tag Tree architecture of a PDF.' },
  { cat: 'Technical & CS', q: 'What is tokenization and vector embeddings in AI pipelines?' },
  { cat: 'Technical & CS', q: 'How does CI/CD automation work in modern software engineering?' },
  { cat: 'Technical & CS', q: 'What is responsive web design and mobile-first approach?' },
  { cat: 'Technical & CS', q: 'What is WebSockets and how does real-time communication work?' },

  // CATEGORY 5: COMPARISONS (15)
  { cat: 'Comparisons', q: 'What is the difference between HTML and React?' },
  { cat: 'Comparisons', q: 'Compare HTML vs React.js.' },
  { cat: 'Comparisons', q: 'What is the difference between Python and Java?' },
  { cat: 'Comparisons', q: 'Compare Python vs Java for backend development.' },
  { cat: 'Comparisons', q: 'What is the difference between Artificial Intelligence and Machine Learning?' },
  { cat: 'Comparisons', q: 'Compare AI vs ML.' },
  { cat: 'Comparisons', q: 'What is the difference between Traditional Automation and AI Automation?' },
  { cat: 'Comparisons', q: 'Compare RPA with intelligent AI automation workflows.' },
  { cat: 'Comparisons', q: 'What is the difference between Digital Accessibility and Usability?' },
  { cat: 'Comparisons', q: 'Compare Accessibility vs Usability.' },
  { cat: 'Comparisons', q: 'What is the difference between XML and HTML?' },
  { cat: 'Comparisons', q: 'Compare XML vs HTML in data modeling and presentation.' },
  { cat: 'Comparisons', q: 'What is the difference between EPUB and PDF?' },
  { cat: 'Comparisons', q: 'Compare EPUB3 vs Accessible PDF for digital publishing.' },
  { cat: 'Comparisons', q: 'What is the difference between WCAG and PDF/UA?' },

  // CATEGORY 6: CAREERS & RECRUITMENT (15)
  { cat: 'Careers & Recruitment', q: 'How can I submit my resume?' },
  { cat: 'Careers & Recruitment', q: 'What are the current career openings at Velvora Solutions?' },
  { cat: 'Careers & Recruitment', q: 'Are you hiring PDF accessibility specialists?' },
  { cat: 'Careers & Recruitment', q: 'Do you have openings for full stack software developers?' },
  { cat: 'Careers & Recruitment', q: 'What is the recruitment and interview process like?' },
  { cat: 'Careers & Recruitment', q: 'Can freshers apply for software or publishing jobs at Velvora?' },
  { cat: 'Careers & Recruitment', q: 'What email address should I send my CV to for careers?' },
  { cat: 'Careers & Recruitment', q: 'Do you offer remote or hybrid work opportunities?' },
  { cat: 'Careers & Recruitment', q: 'What qualifications do you look for in document remediation specialists?' },
  { cat: 'Careers & Recruitment', q: 'Where is the careers page on the website?' },
  { cat: 'Careers & Recruitment', q: 'How long does HR take to review job applications?' },
  { cat: 'Careers & Recruitment', q: 'Are there graphic design or UI/UX positions open?' },
  { cat: 'Careers & Recruitment', q: 'Do you offer career growth and continuous learning for employees?' },
  { cat: 'Careers & Recruitment', q: 'How can I prepare for a technical interview at Velvora?' },
  { cat: 'Careers & Recruitment', q: 'What should I do if I want to work with your company?' },

  // CATEGORY 7: TRAINING & INTERNSHIPS (15)
  { cat: 'Training & Internships', q: 'What training programs do you offer?' },
  { cat: 'Training & Internships', q: 'Are internships available at Velvora Solutions?' },
  { cat: 'Training & Internships', q: 'Explain your Python Full Stack Web Development training program.' },
  { cat: 'Training & Internships', q: 'What is the curriculum for your PDF Accessibility & Document Remediation course?' },
  { cat: 'Training & Internships', q: 'Do you provide ePublishing and XML Conversion training?' },
  { cat: 'Training & Internships', q: 'Tell me about the AI & Machine Learning Foundations training program.' },
  { cat: 'Training & Internships', q: 'What is included in the Data Analytics & Business Intelligence training?' },
  { cat: 'Training & Internships', q: 'Explain the Digital Marketing & SEO Strategy training course.' },
  { cat: 'Training & Internships', q: 'What is the duration of your training programs?' },
  { cat: 'Training & Internships', q: 'Do students receive recognized certificates after training?' },
  { cat: 'Training & Internships', q: 'Are there hands-on live industry projects during internships?' },
  { cat: 'Training & Internships', q: 'Who is eligible to apply for Velvoras internship programs?' },
  { cat: 'Training & Internships', q: 'How can college students register for summer or winter internships?' },
  { cat: 'Training & Internships', q: 'Do you provide 1-on-1 mentorship during the courses?' },
  { cat: 'Training & Internships', q: 'Where can I find detailed training syllabus on your website?' },

  // CATEGORY 8: VENDOR & PARTNERSHIPS (15)
  { cat: 'Vendor & Partnerships', q: 'How do I apply for vendor partnership?' },
  { cat: 'Vendor & Partnerships', q: 'Can I collaborate with your company?' },
  { cat: 'Vendor & Partnerships', q: 'What are the partnership models available at Velvora?' },
  { cat: 'Vendor & Partnerships', q: 'Can digital agencies outsource accessibility remediation to Velvora?' },
  { cat: 'Vendor & Partnerships', q: 'How do technology partnerships work with your team?' },
  { cat: 'Vendor & Partnerships', q: 'What is the process to become an approved supplier or vendor?' },
  { cat: 'Vendor & Partnerships', q: 'Do you sign Non-Disclosure Agreements (NDAs) before partnerships?' },
  { cat: 'Vendor & Partnerships', q: 'What credentials should an agency provide to partner with Velvora?' },
  { cat: 'Vendor & Partnerships', q: 'Where can I submit a partnership proposal?' },
  { cat: 'Vendor & Partnerships', q: 'Can publishers partner with Velvora for long-term book conversion?' },
  { cat: 'Vendor & Partnerships', q: 'Do you offer white-label services for enterprise partners?' },
  { cat: 'Vendor & Partnerships', q: 'What email should business partners write to?' },
  { cat: 'Vendor & Partnerships', q: 'How quickly does the partnerships team evaluate new proposals?' },
  { cat: 'Vendor & Partnerships', q: 'Can university labs collaborate with Velvora on AI research?' },
  { cat: 'Vendor & Partnerships', q: 'What are the benefits of partnering with Velvora Solutions?' },

  // CATEGORY 9: QUOTATIONS & INQUIRIES (10)
  { cat: 'Quotations & Inquiries', q: 'How can I request a quotation?' },
  { cat: 'Quotations & Inquiries', q: 'What information is needed to get a project estimate?' },
  { cat: 'Quotations & Inquiries', q: 'How much does it cost to remediate a 500-page PDF document?' },
  { cat: 'Quotations & Inquiries', q: 'How do you price ePublishing and book conversion services?' },
  { cat: 'Quotations & Inquiries', q: 'What is the turnaround time for a custom software quotation?' },
  { cat: 'Quotations & Inquiries', q: 'Can I get a volume discount for ongoing document remediation?' },
  { cat: 'Quotations & Inquiries', q: 'Where is the project inquiry form on your website?' },
  { cat: 'Quotations & Inquiries', q: 'Can we schedule an introductory discovery call with your engineers?' },
  { cat: 'Quotations & Inquiries', q: 'Do you charge by page or by hourly rate for accessibility?' },
  { cat: 'Quotations & Inquiries', q: 'Who do I contact for urgent enterprise RFP submissions?' },

  // CATEGORY 10: ACCESSIBILITY & REMEDIATION (15)
  { cat: 'Accessibility & Remediation', q: 'What is WCAG 2.2 and what are its conformance levels (A, AA, AAA)?' },
  { cat: 'Accessibility & Remediation', q: 'What is PDF/UA (ISO 14289) and why is it mandatory for accessible PDFs?' },
  { cat: 'Accessibility & Remediation', q: 'What is Section 508 and who does it apply to in the United States?' },
  { cat: 'Accessibility & Remediation', q: 'What is the European Accessibility Act (EAA) requirement?' },
  { cat: 'Accessibility & Remediation', q: 'What is document remediation and why is it needed?' },
  { cat: 'Accessibility & Remediation', q: 'What are the most common PDF accessibility errors?' },
  { cat: 'Accessibility & Remediation', q: 'Why is logical reading order critical for screen reader users?' },
  { cat: 'Accessibility & Remediation', q: 'How do you remediate complex multi-column tables in PDFs?' },
  { cat: 'Accessibility & Remediation', q: 'What is alternative text (alt text) and how should it be written?' },
  { cat: 'Accessibility & Remediation', q: 'Can automated tools fix all PDF accessibility issues on their own?' },
  { cat: 'Accessibility & Remediation', q: 'Why is human expert testing necessary alongside automated checkers?' },
  { cat: 'Accessibility & Remediation', q: 'What tools do you use for accessibility validation like PAC 2024 and Acrobat?' },
  { cat: 'Accessibility & Remediation', q: 'How do you handle color contrast compliance in digital documents?' },
  { cat: 'Accessibility & Remediation', q: 'What are artifact tags in PDF document structure?' },
  { cat: 'Accessibility & Remediation', q: 'Do you provide VPAT (Voluntary Product Accessibility Template) reports?' },

  // CATEGORY 11: AI & AUTOMATION (10)
  { cat: 'AI & Automation', q: 'Tell me more about your AI automation services.' },
  { cat: 'AI & Automation', q: 'How does AI improve business operational efficiency?' },
  { cat: 'AI & Automation', q: 'What is Intelligent Document Processing and how does it extract data?' },
  { cat: 'AI & Automation', q: 'Can AI automatically tag PDFs for accessibility?' },
  { cat: 'AI & Automation', q: 'What are the limitations of AI in document accessibility remediation?' },
  { cat: 'AI & Automation', q: 'How does human-in-the-loop validation improve AI pipelines?' },
  { cat: 'AI & Automation', q: 'Can you build custom LLM-powered customer service agents?' },
  { cat: 'AI & Automation', q: 'How do you prevent hallucinations in enterprise RAG systems?' },
  { cat: 'AI & Automation', q: 'What frameworks do you use for AI automation (LangChain, LlamaIndex, etc.)?' },
  { cat: 'AI & Automation', q: 'How can small businesses benefit from AI automation?' },

  // CATEGORY 12: DIGITAL MARKETING & ANALYTICS (10)
  { cat: 'Marketing & Analytics', q: 'What digital marketing services does Velvora provide?' },
  { cat: 'Marketing & Analytics', q: 'How do you approach search engine optimization (SEO)?' },
  { cat: 'Marketing & Analytics', q: 'What is technical SEO and website performance optimization?' },
  { cat: 'Marketing & Analytics', q: 'How do data analytics help in making business decisions?' },
  { cat: 'Marketing & Analytics', q: 'What data visualization tools do you work with like Power BI or Tableau?' },
  { cat: 'Marketing & Analytics', q: 'How do you track conversion rates and user behavior?' },
  { cat: 'Marketing & Analytics', q: 'What is content marketing in the digital publishing industry?' },
  { cat: 'Marketing & Analytics', q: 'How do you optimize landing pages for higher conversions?' },
  { cat: 'Marketing & Analytics', q: 'What is omnichannel marketing strategy?' },
  { cat: 'Marketing & Analytics', q: 'Can you integrate Google Analytics 4 and Tag Manager for our website?' },

  // CATEGORY 13: PROFESSIONAL WRITING & DRAFTING (10)
  { cat: 'Professional Writing', q: 'Can you draft a business email requesting a quotation for PDF remediation?' },
  { cat: 'Professional Writing', q: 'Draft an email inquiry for enterprise software development.' },
  { cat: 'Professional Writing', q: 'Draft a partnership proposal for collaborating with Velvora.' },
  { cat: 'Professional Writing', q: 'Write a proposal outline to become an agency subcontractor with Velvora.' },
  { cat: 'Professional Writing', q: 'Can you write a cover letter applying for an internship at Velvora?' },
  { cat: 'Professional Writing', q: 'Draft an email applying for a software developer position.' },
  { cat: 'Professional Writing', q: 'Help me draft an email asking about training program details.' },
  { cat: 'Professional Writing', q: 'Draft an inquiry email for ePublishing and XML conversion.' },
  { cat: 'Professional Writing', q: 'Draft a professional follow-up email after submitting a proposal.' },
  { cat: 'Professional Writing', q: 'Write a template for requesting a Non-Disclosure Agreement (NDA).' },

  // CATEGORY 14: CONVERSATIONAL & GREETINGS (10)
  { cat: 'Conversational', q: 'Hello!' },
  { cat: 'Conversational', q: 'Good morning, who are you?' },
  { cat: 'Conversational', q: 'What can you help me with?' },
  { cat: 'Conversational', q: 'What is your name?' },
  { cat: 'Conversational', q: 'Are you a human or an AI assistant?' },
  { cat: 'Conversational', q: 'Thank you for your help!' },
  { cat: 'Conversational', q: 'How are you today?' },
  { cat: 'Conversational', q: 'Bye, see you later.' },
  { cat: 'Conversational', q: 'Can you speak in English?' },
  { cat: 'Conversational', q: 'Tell me about Velza assistant.' },

  // CATEGORY 15: MULTI-INTENT & EDGE CASES (10)
  { cat: 'Multi-Intent & Edge', q: 'I need both PDF accessibility and ePublishing services for my book.' },
  { cat: 'Multi-Intent & Edge', q: 'Can you provide software development and also train our staff?' },
  { cat: 'Multi-Intent & Edge', q: 'What are your contact details, phone number and email address?' },
  { cat: 'Multi-Intent & Edge', q: 'How can I contact your team?' },
  { cat: 'Multi-Intent & Edge', q: 'Can I do heart surgery or medical treatments at Velvora?' }, // Out of scope
  { cat: 'Multi-Intent & Edge', q: 'Do you assemble physical computer hardware and motherboards?' }, // Out of scope
  { cat: 'Multi-Intent & Edge', q: 'Can I book a commercial flight ticket on your site?' }, // Out of scope
  { cat: 'Multi-Intent & Edge', q: 'whaat servces do u provde?' }, // Spelling mistakes
  { cat: 'Multi-Intent & Edge', q: 'hwo can i submt my resme for jb?' }, // Extreme typos
  { cat: 'Multi-Intent & Edge', q: 'Tell me about your blogs and knowledge hub.' },

  // CATEGORY 16: MULTI-TURN CONTEXTUAL FOLLOW-UPS (15)
  {
    cat: 'Contextual Follow-up',
    q: 'Tell me more about the second one.',
    history: [
      { role: 'user', content: 'What services do you provide?' },
      { role: 'assistant', content: 'We provide:\n1. PDF Accessibility\n2. ePublishing Services\n3. XML Publishing\n4. AI Automation\n5. Software Development\n6. Data Analytics' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'Explain the first one in detail.',
    history: [
      { role: 'user', content: 'What are your core services?' },
      { role: 'assistant', content: 'Our disciplines include:\n1. PDF Accessibility\n2. ePublishing Services' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'What about option 3?',
    history: [
      { role: 'user', content: 'What services do you offer?' },
      { role: 'assistant', content: '1. PDF Accessibility\n2. ePublishing\n3. XML Publishing\n4. AI Automation' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'How can I apply?',
    history: [
      { role: 'user', content: 'What career opportunities do you have?' },
      { role: 'assistant', content: 'We have openings for PDF Accessibility Specialists, Full Stack Developers, and QA Analysts.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'How can I apply?',
    history: [
      { role: 'user', content: 'Tell me about your Python Full Stack training course.' },
      { role: 'assistant', content: 'Our Python course covers Python, FastAPI, React, SQL, and Git.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'How do I apply?',
    history: [
      { role: 'user', content: 'Can our agency partner with you?' },
      { role: 'assistant', content: 'We welcome vendor partnerships, agency subcontracting, and technology alliances.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'What are its benefits?',
    history: [
      { role: 'user', content: 'What is ePublishing?' },
      { role: 'assistant', content: 'ePublishing converts traditional manuscripts into digital formats like EPUB and MOBI.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'Why is it important?',
    history: [
      { role: 'user', content: 'Tell me about PDF accessibility.' },
      { role: 'assistant', content: 'PDF accessibility ensures digital documents are usable by people with disabilities and assistive tech.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'Can your company provide it?',
    history: [
      { role: 'user', content: 'I need XML publishing workflows for my journals.' },
      { role: 'assistant', content: 'XML workflows structure content with semantic tags for multi-channel distribution.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'Can your company provide it?',
    history: [
      { role: 'user', content: 'What is React and how does it build user interfaces?' },
      { role: 'assistant', content: 'React is a component-based frontend library developed by Meta.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'Where are you located?',
    history: [
      { role: 'user', content: 'Who is Velvora Solutions?' },
      { role: 'assistant', content: 'Velvora Solutions is a premier technology services company.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'How can I contact your team?',
    history: [
      { role: 'user', content: 'What training programs do you offer?' },
      { role: 'assistant', content: 'We offer training in Python, Accessibility, AI, and Data Analytics.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'Tell me more about the fourth service.',
    history: [
      { role: 'user', content: 'List your main services.' },
      { role: 'assistant', content: '1. PDF Accessibility\n2. ePublishing\n3. XML Conversion\n4. AI Automation\n5. Software Development' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'How do I submit my resume for that?',
    history: [
      { role: 'user', content: 'Do you have full stack developer jobs?' },
      { role: 'assistant', content: 'Yes, we are actively hiring Full Stack Developers with React and Python skills.' }
    ]
  },
  {
    cat: 'Contextual Follow-up',
    q: 'How can I request a quotation for this?',
    history: [
      { role: 'user', content: 'We have 200 documents that need Section 508 remediation.' },
      { role: 'assistant', content: 'We offer full-cycle Section 508 and PDF/UA remediation services.' }
    ]
  }
];

async function runMasterSuite() {
  console.log('========================================================================');
  console.log('🚀 RUNNING MASTER 284-TEST SUITE FOR VELZA ASSISTANT');
  console.log('========================================================================\n');

  await voraStore.syncAll(true);

  let passedTests = 0;
  let totalTests = 0;
  const failureList = [];
  const startTimer = Date.now();

  // Part 1: 5x Consistency on 6 Core Bugs (30 runs)
  console.log('▶ [1/4] Running 6 Core Bug Repro Scenarios (5x iterations = 30 runs)...');
  for (const t of coreReproductionTests) {
    for (let iter = 1; iter <= 5; iter++) {
      totalTests++;
      const res = await voraStore.answerQuery(t.q, t.history);
      const reply = res.reply || '';
      const sources = res.sources || [];

      let ok = true;
      let failureReason = '';

      for (const inc of t.mustInclude) {
        if (!reply.toLowerCase().includes(inc.toLowerCase())) {
          ok = false;
          failureReason = `Missing required text: "${inc}"`;
          break;
        }
      }

      if (ok) {
        for (const notInc of t.mustNotInclude) {
          if (reply.toLowerCase().includes(notInc.toLowerCase())) {
            ok = false;
            failureReason = `Contaminated with prohibited text: "${notInc}"`;
            break;
          }
        }
      }

      if (ok && t.expectedSource) {
        const hasExpectedSource = sources.some(s => s.url.includes(t.expectedSource));
        if (!hasExpectedSource) {
          ok = false;
          failureReason = `Expected source link ${t.expectedSource} not found`;
        }
      }

      if (ok) {
        passedTests++;
        process.stdout.write('.');
      } else {
        process.stdout.write('F');
        failureList.push({ test: `${t.id} [Run ${iter}/5]`, q: t.q, reason: failureReason });
      }
    }
  }
  console.log(' [30/30 Complete]');

  // Part 2: Cross-Domain Sequential Conversation Flow
  console.log('\n▶ [2/4] Running Sequential Cross-Domain Conversation Flow (Contamination Check)...');
  const runningHistory = [];
  for (let i = 0; i < crossDomainFlow.length; i++) {
    totalTests++;
    const step = crossDomainFlow[i];
    const res = await voraStore.answerQuery(step.q, runningHistory);
    const reply = res.reply || '';

    runningHistory.push({ role: 'user', content: step.q });
    runningHistory.push({ role: 'assistant', content: reply.slice(0, 150) });

    let ok = true;
    let reason = '';

    if (step.expectedDomain === 'vendor-partnership') {
      if (reply.includes('G.R.O.W.') || reply.includes('student internship')) {
        ok = false;
        reason = 'Contaminated with previous internship context';
      }
    } else if (step.expectedDomain === 'selection-process') {
      if (reply.includes('AI and Automation Services')) {
        ok = false;
        reason = 'Returned AI Automation instead of Selection Process';
      }
    } else if (step.expectedDomain === 'course-duration') {
      if (!reply.includes('Weeks') && !reply.includes('Months')) {
        ok = false;
        reason = 'Failed to answer duration directly';
      }
    }

    if (ok) {
      passedTests++;
      process.stdout.write('.');
    } else {
      process.stdout.write('F');
      failureList.push({ test: `Cross-Domain Step ${i + 1}`, q: step.q, reason });
    }
  }
  console.log(' [7/7 Complete]');

  // Part 3: Phrasing & Natural Language Variations
  console.log('\n▶ [3/4] Running Phrasing & Natural Language Variations (12 runs)...');
  for (const v of variationTests) {
    totalTests++;
    const res = await voraStore.answerQuery(v.q);
    const reply = res.reply || '';

    let ok = reply.length > 80 && !reply.includes("connection pause");
    if (v.expectedTopic === 'company' && !reply.includes('Velvora Solutions')) ok = false;
    if (v.expectedTopic === 'wcag' && !reply.includes('WCAG')) ok = false;
    if (v.expectedTopic === 'selection' && !reply.includes('Recruitment') && !reply.includes('Screening')) ok = false;
    if (v.expectedTopic === 'duration' && !reply.includes('Weeks') && !reply.includes('Months')) ok = false;
    if (v.expectedTopic === 'vendor' && !reply.includes('Partner')) ok = false;
    if (v.expectedTopic === 'trends' && !reply.includes('Technology Trends') && !reply.includes('AI')) ok = false;

    if (ok) {
      passedTests++;
      process.stdout.write('.');
    } else {
      process.stdout.write('F');
      failureList.push({ test: `Variation: ${v.expectedTopic}`, q: v.q, reason: 'Failed to answer relevant topic' });
    }
  }
  console.log(' [12/12 Complete]');

  // Part 4: Broad 235-Question Evaluation Suite
  console.log('\n▶ [4/4] Running Broad 235-Question Real-World Domain Suite...');
  for (let i = 0; i < broadCategoryTests.length; i++) {
    totalTests++;
    const { cat, q, history = [] } = broadCategoryTests[i];

    const res = await voraStore.answerQuery(q, history);
    const hasReply = res && typeof res.reply === 'string' && res.reply.trim().length > 60;
    const noPauseError = !res.reply.includes("connection pause");
    const hasSources = Array.isArray(res.sources) && res.sources.length > 0;

    if (hasReply && noPauseError && hasSources) {
      passedTests++;
      process.stdout.write('.');
    } else {
      process.stdout.write('F');
      failureList.push({
        test: `Broad [${cat}]`,
        q,
        reason: !hasReply ? 'Short/Empty' : (!noPauseError ? 'Connection Pause' : 'No Sources')
      });
    }

    if ((i + 1) % 50 === 0 || i === broadCategoryTests.length - 1) {
      console.log(`  [${i + 1}/${broadCategoryTests.length}]`);
    }
  }

  const durationSec = ((Date.now() - startTimer) / 1000).toFixed(2);

  console.log('\n========================================================================');
  console.log('📊 MASTER EVALUATION RESULTS');
  console.log('========================================================================');
  console.log(`Total Tests Run        : ${totalTests}`);
  console.log(`Passed                 : ${passedTests}`);
  console.log(`Failed                 : ${totalTests - passedTests}`);
  console.log(`Success Rate           : ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  console.log(`Total Execution Time   : ${durationSec}s`);

  if (failureList.length > 0) {
    console.log('\n❌ DETECTED FAILURES:');
    failureList.forEach(f => console.log(`  • [${f.test}] "${f.q}": ${f.reason}`));
    process.exit(1);
  } else {
    console.log('\n✅ 100% PERFECT PASS ACROSS ALL 284 REAL-WORLD TESTS!');
    process.exit(0);
  }
}

runMasterSuite();
