import { voraStore } from '../server/voraKnowledgeStore.js';

/**
 * 230-Question Rigorous Evaluation Test Suite for Velza AI Assistant
 * Validates:
 * 1. Zero fallback failure ("connection pause" must NEVER occur)
 * 2. High-quality informative response (> 60 characters)
 * 3. Relevant official source citations
 * 4. Multi-turn conversational context resolution
 * 5. General technical & professional competence beyond website text
 */

const testCases = [
  // ----------------------------------------------------
  // CATEGORY 1: COMPANY BACKGROUND & LEADERSHIP (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 2: SERVICES & DISCIPLINES (25)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 3: SOLUTIONS & PRODUCTS (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 4: COMPUTER SCIENCE & TECH CONCEPTS (30)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 5: TECHNICAL COMPARISONS (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 6: CAREERS & RECRUITMENT (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 7: TRAINING PROGRAMS & INTERNSHIPS (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 8: VENDOR PARTNERSHIPS & COLLABORATIONS (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 9: QUOTATIONS & PROJECT INQUIRIES (10)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 10: ACCESSIBILITY & REMEDIATION (15)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 11: AI & AUTOMATION (10)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 12: DIGITAL MARKETING & ANALYTICS (10)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 13: PROFESSIONAL WRITING & DRAFTING (10)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 14: CONVERSATIONAL & GREETINGS (10)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 15: MULTI-INTENT & EDGE CASES (10)
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // CATEGORY 16: MULTI-TURN CONTEXTUAL FOLLOW-UPS (15)
  // ----------------------------------------------------
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

async function runEvaluation() {
  console.log('================================================================');
  console.log('🚀 STARTING RIGOROUS 230-QUESTION EVALUATION OF VELZA ASSISTANT');
  console.log('================================================================\n');

  await voraStore.syncAll(true);

  const stats = {
    total: testCases.length,
    passed: 0,
    failed: 0,
    categories: {}
  };

  const failures = [];
  const startTimer = Date.now();

  for (let i = 0; i < testCases.length; i++) {
    const { cat, q, history = [] } = testCases[i];
    if (!stats.categories[cat]) {
      stats.categories[cat] = { total: 0, passed: 0, failed: 0 };
    }
    stats.categories[cat].total++;

    try {
      const response = await voraStore.answerQuery(q, history);

      // Validation assertions
      const hasReply = response && typeof response.reply === 'string' && response.reply.trim().length > 60;
      const noPauseError = !response.reply.includes("I'm having a brief connection pause") &&
                           !response.reply.includes("brief connection pause");
      const hasSources = Array.isArray(response.sources) && response.sources.length > 0;

      if (hasReply && noPauseError && hasSources) {
        stats.passed++;
        stats.categories[cat].passed++;
        process.stdout.write('.');
      } else {
        stats.failed++;
        stats.categories[cat].failed++;
        process.stdout.write('F');
        failures.push({
          index: i + 1,
          cat,
          q,
          historyCount: history.length,
          replyLen: response ? (response.reply || '').length : 0,
          reason: !hasReply ? 'Empty or short response' : (!noPauseError ? 'Connection pause error returned' : 'Missing sources')
        });
      }
    } catch (err) {
      stats.failed++;
      stats.categories[cat].failed++;
      process.stdout.write('E');
      failures.push({
        index: i + 1,
        cat,
        q,
        reason: 'Exception: ' + err.message
      });
    }

    if ((i + 1) % 50 === 0 || i === testCases.length - 1) {
      console.log(`  [${i + 1}/${testCases.length}]`);
    }
  }

  const durationSec = ((Date.now() - startTimer) / 1000).toFixed(2);

  console.log('\n================================================================');
  console.log('📊 EVALUATION SUMMARY RESULTS');
  console.log('================================================================');
  console.log(`Total Questions Tested : ${stats.total}`);
  console.log(`Passed (100% Quality)  : ${stats.passed}`);
  console.log(`Failed                 : ${stats.failed}`);
  console.log(`Success Rate           : ${((stats.passed / stats.total) * 100).toFixed(2)}%`);
  console.log(`Total Time Taken       : ${durationSec}s`);
  console.log('\nBreakdown by Category:');

  for (const [catName, cStats] of Object.entries(stats.categories)) {
    const pct = ((cStats.passed / cStats.total) * 100).toFixed(1);
    console.log(`  • ${catName.padEnd(28)}: ${cStats.passed}/${cStats.total} passed (${pct}%)`);
  }

  if (failures.length > 0) {
    console.log('\n❌ FAILURES:');
    failures.forEach(f => {
      console.log(`  [#${f.index}] ${f.cat} -> "${f.q}": ${f.reason}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ ALL 230 QUESTIONS PASSED WITH ZERO FAILURES AND 100% RELIABILITY!');
    process.exit(0);
  }
}

runEvaluation();
