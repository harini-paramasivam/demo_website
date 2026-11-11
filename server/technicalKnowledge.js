/**
 * Technical, Educational & General Knowledge Base for Velza
 * Provides deep, pedagogical, accurate answers for computer science,
 * web engineering, AI/ML, accessibility, data architecture, comparisons,
 * and professional writing assistance.
 */

export const technicalTopics = [
  // 1. HTML & Semantic HTML
  {
    id: 'tech-html',
    keywords: ['html', 'semantic html', 'html5', 'html tags', 'what is html', 'what is semantic html', 'doctype', 'dom structure'],
    title: 'HTML & Semantic HTML Architecture',
    match: (q) => /\b(html|semantic html|html5|html tags|what is html)\b/i.test(q) && !/react|xml/i.test(q),
    generate: () => ({
      reply: `**HTML (HyperText Markup Language)** is the universal standard markup language used to structure documents and content displayed on the World Wide Web.

### Key Concepts:
• **Elements & Tags:** HTML documents are composed of nested tree elements enclosed in angle brackets (e.g., \`<p>\`, \`<div>\`, \`<section>\`, \`<a>\`).
• **Document Object Model (DOM):** Browsers parse HTML into a hierarchical node tree that JavaScript can dynamically inspect and manipulate.
• **Attributes:** Provide metadata and behavior to elements (e.g., \`href\` for hyperlinks, \`src\` for media, \`id\` and \`class\` for styling/selectors).

### What is Semantic HTML?
Semantic HTML means using tags that convey the **actual meaning and purpose** of the content rather than just its visual appearance:
• Non-semantic: \`<div class="header">\`, \`<span class="button">\`
• Semantic: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<aside>\`, \`<footer>\`, \`<button>\`

### Why Semantic HTML is Crucial:
1. **Accessibility (a11y):** Assistive technologies (screen readers like NVDA and JAWS) use semantic landmarks (\`<main>\`, \`<nav>\`, \`<h1>\`–\`<h6>\`) to let visually impaired users navigate directly to content.
2. **SEO (Search Engine Optimization):** Search engine crawlers prioritize semantic elements to understand the structural importance of headings and main articles.
3. **Maintainability:** Cleaner, self-documenting code across engineering teams.`,
      sources: [
        { title: 'Velvora Web Development', url: '/services/software-development' },
        { title: 'Digital Accessibility', url: '/services/digital-accessibility' }
      ]
    })
  },

  // 2. CSS & Responsive Design
  {
    id: 'tech-css',
    keywords: ['css', 'css3', 'styling', 'flexbox', 'grid', 'responsive design', 'media queries', 'what is css'],
    title: 'CSS & Responsive Modern Layouts',
    match: (q) => /\b(what is css|explain css|css flexbox|css grid|responsive design|media queries)\b/i.test(q),
    generate: () => ({
      reply: `**CSS (Cascading Style Sheets)** is the style sheet language used for describing the visual presentation, layout, and formatting of documents written in HTML.

### Core Concepts:
• **The Box Model:** Every element in CSS is rendered as a rectangular box comprising **Content**, **Padding** (inner space), **Border**, and **Margin** (outer space).
• **Cascading & Specificity:** When multiple rules conflict, browsers resolve styles based on importance (\`!important\`), specificity (inline > IDs > classes > elements), and source order.
• **Modern Layout Modes:**
  - **Flexbox (1D Layout):** Perfect for arranging items in a single row or column with flexible alignment and space distribution (\`display: flex\`).
  - **CSS Grid (2D Layout):** Powerful two-dimensional grid system for handling simultaneous rows and columns (\`display: grid\`).

### Responsive Web Design:
Techniques enabling websites to adapt seamlessly across smartphones, tablets, and desktop displays:
• **Media Queries:** Conditional CSS rules triggered by viewport dimensions (e.g., \`@media (max-width: 768px)\`).
• **Fluid Units:** Using relative units like \`rem\`, \`vh\`, \`vw\`, and \`%\` rather than fixed absolute pixels.
• **Mobile-First Approach:** Designing foundational styles for mobile devices first, then progressively enhancing for larger viewports.`,
      sources: [
        { title: 'Software & Web Development', url: '/services/software-development' }
      ]
    })
  },

  // 3. JavaScript
  {
    id: 'tech-javascript',
    keywords: ['javascript', 'js', 'es6', 'event loop', 'asynchronous javascript', 'promises', 'async await', 'what is javascript'],
    title: 'JavaScript & Modern Asynchronous Execution',
    match: (q) => /\b(what is javascript|explain javascript|how does javascript work|event loop|async await|promises in js)\b/i.test(q),
    generate: () => ({
      reply: `**JavaScript (JS)** is a high-level, interpreted (just-in-time compiled) programming language that serves as the core scripting engine of the World Wide Web alongside HTML and CSS.

### Core Architecture:
• **Single-Threaded Event Loop:** JavaScript executes on a single main thread with a call stack. Asynchronous operations (network requests, timers, file I/O) are offloaded to browser/system Web APIs and queued into the **Microtask/Macrotask queues** to be executed when the stack clears.
• **Dynamic Typing & Prototypes:** Variables do not have strict compile-time types, and object inheritance is managed through prototype delegation chains.

### Key Modern Features (ES6+):
• **Asynchronous Control Flow:** Evolved from callbacks to **Promises** and modern **\`async/await\`** syntax for clean asynchronous code.
• **Modern Syntax:** Arrow functions (\`=>\`), destructuring assignment (\`const { name } = user\`), template literals (\`\${var}\`), and native ES Modules (\`import/export\`).
• **Universal Runtime:** Runs natively in browsers and on backends via **Node.js** and runtime environments like Deno and Bun.`,
      sources: [
        { title: 'Software & Web Development', url: '/services/software-development' }
      ]
    })
  },

  // 4. React
  {
    id: 'tech-react',
    keywords: ['react', 'reactjs', 'virtual dom', 'components', 'react hooks', 'state management', 'what is react'],
    title: 'React & Component-Driven User Interfaces',
    match: (q) => /\b(what is react|explain react|how does react work|virtual dom|react hooks|state management in react)\b/i.test(q) && !/html/i.test(q),
    generate: () => ({
      reply: `**React** is an open-source JavaScript front-end library created by Meta for building dynamic, interactive user interfaces based on modular components.

### Core Principles:
1. **Component-Based Architecture:** UIs are broken into reusable, self-contained building blocks (components) that accept inputs (\`props\`) and manage their own internal lifecycle/state (\`useState\`).
2. **Virtual DOM & Reconciliation:** Instead of manipulating the real browser DOM directly (which is slow), React maintains a lightweight in-memory Virtual DOM. When data changes, React diffs the new Virtual DOM with the previous snapshot and performs minimal, batch updates to the real DOM.
3. **Declarative Syntax (JSX):** Developers write HTML-like syntax within JavaScript, making code predictable and easier to debug.

### Essential React Hooks:
• \`useState\`: Manages local component reactive state.
• \`useEffect\`: Handles side effects (data fetching, DOM subscriptions, timers).
• \`useContext\`: Shares global state across the component tree without prop-drilling.
• \`useRef\`: Persists mutable references across renders without triggering a re-render.`,
      sources: [
        { title: 'Software & Web Development', url: '/services/software-development' }
      ]
    })
  },

  // 5. Python
  {
    id: 'tech-python',
    keywords: ['python', 'how does python work', 'what is python', 'pvm', 'bytecode', 'python programming'],
    title: 'Python Language & Execution Architecture',
    match: (q) => /\b(what is python|how does python work|explain python|python programming|how python executes)\b/i.test(q) && !/java/i.test(q),
    generate: () => ({
      reply: `**Python** is a high-level, general-purpose, dynamically typed programming language renowned for its clean readability, concise syntax, and vast ecosystem.

### How Does Python Work?
Python is typically an **interpreted, bytecode-compiled** language:
1. **Source Code to Bytecode:** When you execute a script (\`.py\`), the CPython interpreter first compiles the source text into optimized platform-independent **bytecode** (\`.pyc\` files).
2. **Python Virtual Machine (PVM):** The PVM reads the bytecode instructions line by line and converts them into machine code executed by the host CPU.
3. **Memory Management:** Handled automatically via reference counting and a cyclic garbage collector.

### Why Python Dominates:
• **AI & Data Science:** Standard language for machine learning and analytics with libraries like NumPy, Pandas, Scikit-Learn, PyTorch, and TensorFlow.
• **Web & API Frameworks:** High-performance web development with **FastAPI**, Django, and Flask.
• **Automation & Scripting:** Seamless integration for workflow orchestration, web scraping, and data processing pipelines.`,
      sources: [
        { title: 'AI and Automation Services', url: '/services/ai-automation' },
        { title: 'Data Analytics Services', url: '/services/data-analytics' }
      ]
    })
  },

  // 6. FastAPI
  {
    id: 'tech-fastapi',
    keywords: ['fastapi', 'what is fastapi', 'python fastapi', 'asgi', 'pydantic', 'api framework'],
    title: 'FastAPI High-Performance Python Web Framework',
    match: (q) => /\b(what is fastapi|explain fastapi|how does fastapi work|fastapi vs flask|fastapi)\b/i.test(q),
    generate: () => ({
      reply: `**FastAPI** is a modern, high-performance web framework for building APIs with Python 3.8+ based on standard Python type hints.

### Core Features & Advantages:
• **High Performance:** Built on top of **Starlette** (for ASGI web routing) and **Pydantic** (for data validation), making it one of the fastest Python frameworks available—on par with NodeJS and Go.
• **Asynchronous Native (ASGI):** Full native support for Python \`async\` and \`await\` concurrency, ideal for I/O-bound operations and AI model inference.
• **Automatic Interactive API Documentation:** Automatically generates interactive Swagger UI (\`/docs\`) and ReDoc (\`/redoc\`) endpoints from OpenAPI standards without manual configuration.
• **Data Validation & Serialization:** Pydantic models automatically validate incoming request bodies, query parameters, and headers, returning detailed error messages on mismatch.`,
      sources: [
        { title: 'Software & Web Development', url: '/services/software-development' }
      ]
    })
  },

  // 7. APIs & REST APIs
  {
    id: 'tech-api-rest',
    keywords: ['api', 'rest api', 'what is an api', 'what is rest api', 'http methods', 'restful'],
    title: 'APIs & RESTful Architecture Principles',
    match: (q) => /\b(what is an api|what is an rest api|what is a rest api|what is rest api|explain rest api|how do apis work|restful)\b/i.test(q),
    generate: () => ({
      reply: `An **API (Application Programming Interface)** is a set of defined rules, protocols, and tools that allow different software applications to communicate and exchange data with one another.

### What is a REST API?
A **REST API (Representational State Transfer)** is an architectural style for networked systems that adheres to specific design constraints:
1. **Statelessness:** Each client request must contain all the information necessary to understand and process the request; the server stores no client session context.
2. **Client-Server Separation:** The user interface/client is completely decoupled from the data storage/server.
3. **Uniform Interface:** Resources are identified using standard URIs (e.g., \`/api/users/42\`).

### Standard HTTP Verbs:
• **GET:** Retrieve a resource (safe and idempotent).
• **POST:** Create a new resource.
• **PUT:** Completely replace an existing resource.
• **PATCH:** Partially update an existing resource.
• **DELETE:** Remove a resource.

### Data Format:
Modern REST APIs almost universally communicate using lightweight, human-readable **JSON (JavaScript Object Notation)** payloads.`,
      sources: [
        { title: 'Software & Web Development', url: '/services/software-development' }
      ]
    })
  },

  // 8. SQL vs NoSQL (PostgreSQL & MongoDB)
  {
    id: 'tech-sql-databases',
    keywords: ['sql', 'postgresql', 'mongodb', 'database', 'nosql', 'relational database'],
    title: 'SQL, PostgreSQL & NoSQL Databases',
    match: (q) => /\b(what is sql|what is postgresql|what is mongodb|sql vs nosql|relational database)\b/i.test(q),
    generate: () => ({
      reply: `Databases organize, store, and retrieve digital data efficiently. They are broadly divided into **Relational (SQL)** and **Non-Relational (NoSQL)** systems:

### 1. SQL & Relational Databases (e.g. PostgreSQL):
• **Structure:** Data is organized into strict tabular schemas with rows and columns, enforcing predefined data types and relationships (foreign keys).
• **ACID Compliance:** Guarantees Atomicity, Consistency, Isolation, and Durability, making SQL ideal for financial transactions, enterprise publishing metadata, and mission-critical records.
• **PostgreSQL:** An advanced, open-source object-relational database renowned for complex queries, JSONB document querying, high concurrency, and data integrity.

### 2. NoSQL & Document Databases (e.g. MongoDB):
• **Structure:** Stores unstructured or semi-structured data as flexible, schema-less BSON/JSON-like documents.
• **Scalability:** Engineered for horizontal scaling (sharding across server clusters) and rapid prototyping where data models evolve frequently.

### Which to Choose?
• Choose **PostgreSQL** when relationships, data integrity, complex queries, and ACID transactions are paramount.
• Choose **MongoDB** when dealing with rapidly changing hierarchical documents, high-volume real-time ingestion, or catalogs with variable attributes.`,
      sources: [
        { title: 'Data Analytics Services', url: '/services/data-analytics' },
        { title: 'Software Development', url: '/services/software-development' }
      ]
    })
  },

  // 9. AI, Machine Learning, Generative AI & LLMs
  {
    id: 'tech-ai-ml-genai',
    keywords: ['artificial intelligence', 'machine learning', 'generative ai', 'llm', 'what is ai', 'what is machine learning', 'what is generative ai', 'what is an llm'],
    title: 'Artificial Intelligence, Machine Learning & Generative AI',
    match: (q) => /\b(what is artificial intelligence|what is machine learning|what is generative ai|what is an llm|what is llm|ai vs ml)\b/i.test(q) && !/traditional/i.test(q),
    generate: () => ({
      reply: `Understanding the spectrum of modern Artificial Intelligence:

### 1. Artificial Intelligence (AI):
The overarching field of computer science dedicated to creating systems capable of performing tasks that typically require human cognition—such as visual perception, decision-making, language comprehension, and pattern recognition.

### 2. Machine Learning (ML):
A foundational subset of AI where systems learn to perform tasks by analyzing large datasets rather than following explicit rule-based algorithms.
• **Supervised Learning:** Trained on labeled data (e.g., classifying medical images).
• **Unsupervised Learning:** Finds hidden patterns in unlabeled data (e.g., customer clustering).
• **Reinforcement Learning:** Learns optimal actions through reward-penalty feedback loops.

### 3. Generative AI (GenAI):
A specialized category of ML models designed to **create new, original content**—including human-like text, high-resolution imagery, audio, and executable source code—based on training patterns.

### 4. LLMs (Large Language Models):
Deep learning models powered by the **Transformer architecture** (utilizing self-attention mechanisms) trained on massive corpora of text.
• Examples: Google Gemini, GPT-4, Claude, LLaMA.
• Capabilities: Advanced natural language understanding, contextual reasoning, summarization, translation, and code generation.`,
      sources: [
        { title: 'AI & Automation Services', url: '/services/ai-automation' },
        { title: 'AI Training Program', url: '/training/ai-ml-training' },
        { title: 'Generative AI Training', url: '/training/generative-ai-training' }
      ]
    })
  },

  // 10. RAG & AI Agents
  {
    id: 'tech-rag-agents',
    keywords: ['rag', 'retrieval augmented generation', 'ai agents', 'what is rag', 'what are ai agents', 'vector embeddings'],
    title: 'RAG Architecture & Autonomous AI Agents',
    match: (q) => /\b(what is rag|retrieval augmented generation|what are ai agents|ai agents|how does rag work)\b/i.test(q),
    generate: () => ({
      reply: `### 1. What is RAG (Retrieval-Augmented Generation)?
RAG is an AI architectural technique that enhances Large Language Models by retrieving verified, dynamic external knowledge before generating a response.

**How RAG Works:**
1. **Document Ingestion & Chunking:** Company documents, web pages, and policies are split into contextual text chunks.
2. **Embedding Generation:** Chunks are converted into numerical vector representations capturing semantic meaning.
3. **Retrieval:** When a user asks a question, the system searches the vector space for the most semantically relevant chunks.
4. **Augmented Generation:** The model receives the user's prompt **alongside** the retrieved factual text as grounded context.
• **Benefit:** Prevents hallucinations, keeps information up to date without costly model retraining, and provides verifiable source citations.

### 2. What are AI Agents?
AI Agents are autonomous systems powered by LLMs that go beyond passive Q&A to **reason, plan, and take actions** in external environments:
• **Perception & Planning:** Decomposing complex goals into sequential sub-tasks.
• **Tool-Calling:** Interacting with external APIs, querying databases, running code, or sending emails.
• **Memory:** Maintaining persistent short-term and long-term state across interactions.`,
      sources: [
        { title: 'AI and Automation Services', url: '/services/ai-automation' },
        { title: 'Generative AI Training', url: '/training/generative-ai-training' }
      ]
    })
  },

  // 11. Cloud Computing, Docker & Git
  {
    id: 'tech-devops-tools',
    keywords: ['cloud computing', 'docker', 'git', 'containers', 'version control', 'what is docker', 'what is git', 'what is cloud computing'],
    title: 'Cloud Infrastructure, Containerization & Git',
    match: (q) => /\b(what is cloud computing|what is docker|what is git|explain docker|explain git|containerization)\b/i.test(q),
    generate: () => ({
      reply: `Foundational pillars of modern software engineering and DevOps:

### 1. Cloud Computing:
On-demand delivery of IT resources (computing power, storage, databases, and networking) over the internet with pay-as-you-go pricing (e.g., AWS, Google Cloud, Azure). Eliminates the overhead of managing physical server hardware.

### 2. Docker & Containerization:
• **What it is:** An open-source platform that packages an application and all its dependencies, system libraries, and runtime configurations into a lightweight, isolated unit called a **container**.
• **Why it matters:** Eliminates the *"it works on my machine"* problem, ensuring the application runs identically in development, staging, and production environments.
• **Difference from Virtual Machines:** Containers share the host OS kernel and require fractions of the CPU, memory, and startup time compared to heavy guest VMs.

### 3. Git & Version Control:
A distributed version control system that tracks changes in source code across engineering teams:
• **Branching & Merging:** Developers isolate features in independent branches and merge them safely via Pull Requests.
• **Accountability:** Provides a complete historical log of every code change, commit author, and diff.`,
      sources: [
        { title: 'Software & Web Development', url: '/services/software-development' }
      ]
    })
  },

  // 12. OCR (Optical Character Recognition)
  {
    id: 'tech-ocr',
    keywords: ['ocr', 'how does ocr work', 'what is ocr', 'optical character recognition', 'scanned pdf'],
    title: 'Optical Character Recognition (OCR) Technology',
    match: (q) => /\b(what is ocr|how does ocr work|optical character recognition|explain ocr)\b/i.test(q),
    generate: () => ({
      reply: `**OCR (Optical Character Recognition)** is a technology that converts different types of documents—such as scanned paper books, PDF files, or digital images—into editable, searchable, and machine-readable text.

### How OCR Works Step-by-Step:
1. **Image Pre-processing:** Enhancing the raw scan by deskewing (straightening), binarization (converting to high-contrast black-and-white), and noise reduction (removing artifacts).
2. **Layout Analysis & Block Segmentation:** Identifying columns, headings, paragraphs, images, and tables to preserve natural reading order.
3. **Character Recognition:**
   - *Pattern Matching:* Comparing glyph shapes against stored font matrices.
   - *Feature Extraction:* Neural networks analyze line strokes, closed loops, and intersecting curves to identify letters.
4. **Post-Processing & Spell Checking:** Applying language dictionaries and language models to correct misrecognized characters (e.g. distinguishing \`O\` from \`0\`).
5. **Output Generation:** Generating searchable PDFs with an invisible text layer positioned directly beneath the scanned image, or outputting clean XML/ePub files.

Velvora Solutions utilizes specialized OCR engines to convert historical backlists and print archives into fully accessible WCAG/PDF-UA compliant assets.`,
      sources: [
        { title: 'OCR and Digitization Services', url: '/services/ocr-and-digitization' },
        { title: 'ePublishing Workflows', url: '/services/epublishing' }
      ]
    })
  },

  // 13. Accessible PDF Tag Tree
  {
    id: 'tech-pdf-tag-tree',
    keywords: ['pdf tag tree', 'accessible pdf tag tree', 'pdf tags', 'document structure', 'screen reader tag tree'],
    title: 'Accessible PDF Tag Tree Architecture',
    match: (q) => /\b(pdf tag tree|accessible pdf tag tree|what are pdf tags|pdf tags|tag tree)\b/i.test(q),
    generate: () => ({
      reply: `In digital document accessibility, the **PDF Tag Tree** is the hidden logical structure tree that gives meaning, order, and semantic hierarchy to visual PDF content.

### Why Visual Appearance is Not Enough:
Standard PDF content consists of visual drawing instructions (coordinates of glyphs, lines, and colors) on a canvas. A screen reader cannot inherently tell whether text is a heading, table cell, or paragraph unless it is enclosed in **structural tags**.

### Standard PDF/UA Structural Tags:
• \`<Document>\`: The root container element.
• \`<Part>\` / \`<Art>\` / \`<Sect>\`: Sectional grouping containers.
• \`<H1>\` through \`<H6>\`: Strict heading hierarchies without skipping levels.
• \`<P>\`: Standard body paragraphs.
• \`<Table>\`, \`<TR>\`, \`<TH>\`, \`<TD>\`: Structured tables explicitly associating header cells with data cells.
• \`<L>\`, \`<LI>\`, \`<Lbl>\`, \`<LBody>\`: Unordered and ordered lists.
• \`<Figure>\`: Visual graphics paired with descriptive \`/Alt\` text attributes.
• \`/Artifact\`: Visual headers, footers, and decorative background lines marked as non-content so screen readers skip them.

Velvora Solutions manually reviews and re-engineers PDF tag trees to achieve 100% compliance with ISO 14289 (PDF/UA) and WCAG 2.2.`,
      sources: [
        { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
        { title: 'WCAG vs PDF/UA Comparison', url: '/services/digital-accessibility' }
      ]
    })
  },

  // 14. WCAG (Web Content Accessibility Guidelines) Dedicated Module
  {
    id: 'tech-wcag',
    keywords: ['wcag', 'what is wcag', 'explain wcag', 'wcag 2.2', 'wcag principles', 'pour principles', 'wcag conformance', 'wcag guidelines', 'web content accessibility guidelines'],
    title: 'WCAG (Web Content Accessibility Guidelines) Architecture & Conformance',
    match: (q) => /\b(what is wcag|explain wcag|wcag principles|pour principles|wcag 2\.2|wcag guidelines|web content accessibility guidelines)\b/i.test(q) && !/difference between wcag and pdf|vs pdf/i.test(q),
    generate: () => ({
      reply: `**WCAG (Web Content Accessibility Guidelines)** is the globally recognized international standard for digital accessibility, developed by the **World Wide Web Consortium (W3C)** Web Accessibility Initiative (WAI).

### Primary Purpose:
The primary goal of WCAG is to ensure that web content, mobile apps, and electronic documents are usable and accessible to everyone, including individuals with visual, auditory, cognitive, neurological, speech, and physical disabilities.

### The Four Core Principles (POUR):
WCAG is structured around four foundational pillars that every digital experience must fulfill:

1. **Perceivable:**
   Information and user interface components must be presentable to users in ways they can perceive (it cannot be invisible to all of their senses).
   • *Examples:* Text alternatives (alt text) for non-text content, closed captions for video/audio, and minimum color contrast ratios (at least 4.5:1 for normal text).

2. **Operable:**
   User interface components and navigation must be operable (users must be able to operate the interface).
   • *Examples:* Full keyboard navigation without getting trapped in a focus loop, giving users enough time to read/complete tasks, and avoiding flashing content that causes seizures.

3. **Understandable:**
   Information and the operation of the user interface must be clear and understandable.
   • *Examples:* Predictable navigation layouts, human-readable text, clear input instructions, and helpful error detection/suggestions in forms.

4. **Robust:**
   Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including current and evolving assistive technologies (screen readers like NVDA and JAWS).
   • *Examples:* Clean, valid semantic HTML markup, proper ARIA attributes, and accurate name/role/value relationships.

### Conformance Levels:
WCAG defines three progressive levels of conformance:
• **Level A (Essential Baseline):** Minimum accessibility features. Without these, content is completely inaccessible to many assistive technology users.
• **Level AA (Global Enterprise & Legal Benchmark):** The standard adopted by worldwide laws (e.g., US ADA Title II / Section 508, European Accessibility Act EAA, and UK PSBAR). It addresses the most common and critical barriers.
• **Level AAA (Specialized Enhancement):** The highest tier of accessibility, providing extended accommodations for specialized audiences.

### Practical Implementation Example:
Instead of writing an inaccessible image tag like:
\`<img src="quarterly-report.jpg">\`
WCAG Level AA compliance requires descriptive alternative text:
\`<img src="quarterly-report.jpg" alt="Bar chart showing Q3 revenue growth of 24% across digital publishing services">\`

### How Velvora Solutions Supports WCAG Compliance:
Velvora Solutions provides end-to-end digital accessibility audits, automated and manual screen-reader testing (NVDA/JAWS), remediation for websites and PDF documents conforming to **WCAG 2.2 Level AA/AAA**, and VPAT (Voluntary Product Accessibility Template) certification.`,
      sources: [
        { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
        { title: 'WCAG 2.2 Business Guide', url: '/blog/understanding-wcag-2-2-practical-guide-for-businesses' }
      ]
    })
  },

  // 15. Latest Technology Trends
  {
    id: 'tech-trends',
    keywords: ['technology trends', 'latest technology trends', 'tech trends', 'emerging technology trends', 'current tech trends', 'future tech trends'],
    title: 'Latest Technology & Digital Transformation Trends',
    match: (q) => /\b(tech trends|technology trends|tech trend|technology trend|latest technology|emerging technologies)\b/i.test(q) && !/statement|accessibility statement/i.test(q),
    generate: () => ({
      reply: `The global technology landscape is undergoing rapid transformation driven by autonomous intelligence, stringent accessibility standards, and cloud-native architectures.

### Key Technology Trends Shaping the Industry:

1. **Generative AI & Agentic Workflows:**
   Organizations are shifting from basic chatbots to **autonomous AI agents** capable of multi-step planning, tool invocation, and executing complex enterprise tasks. Retrieval-Augmented Generation (RAG) and domain-specific Small Language Models (SLMs) ensure accurate, zero-hallucination data access.

2. **Universal Digital Accessibility & Regulatory Compliance:**
   With upcoming global mandates such as the **European Accessibility Act (EAA 2025)** and the US Department of Justice's updated **ADA Title II rules**, digital accessibility (WCAG 2.2 and PDF/UA) is now a mandatory legal and business imperative for websites, software, and electronic documents.

3. **Intelligent Document Processing (IDP):**
   The fusion of advanced Optical Character Recognition (OCR), multimodal vision models, and natural language processing (NLP) is automating the extraction of unstructured text, tables, and mathematical formulas from legacy PDFs into clean, validated XML (JATS/BITS) and accessible EPUB 3.

4. **Cloud-Native, Serverless & Edge Computing:**
   Enterprises are prioritizing resilient microservice architectures using containerization (Docker, Kubernetes) and serverless computing for low-latency, auto-scaling global deployments.

5. **AI-Augmented Software Engineering & DevSecOps:**
   AI-powered coding assistants, automated test generation, and intelligent continuous integration (CI/CD) pipelines are accelerating development lifecycles while embedding automated security and accessibility scanning.

6. **Data Privacy, Governance & Responsible AI:**
   As AI becomes pervasive, enterprises are investing heavily in data sovereignty, transparent algorithmic accountability, zero-retention API policies, and robust guardrails to protect user information.

### How Velvora Solutions Aligns with These Trends:
Velvora Solutions operates at the forefront of these advancements, providing organizations with certified **WCAG 2.2 & PDF/UA accessibility audits**, **AI automation pipelines (IDP)**, **XML-first publishing**, and **accessible full-stack cloud software development**.`,
      sources: [
        { title: 'AI & Automation Services', url: '/services/ai-automation' },
        { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
        { title: 'Industry Solutions', url: '/solutions' }
      ]
    })
  },

  // 16. Recruitment & Selection Process
  {
    id: 'careers-selection-process',
    keywords: ['selection process', 'recruitment process', 'hiring process', 'interview process', 'hiring procedure', 'what is your selection process'],
    title: 'Velvora Solutions Recruitment & Selection Process',
    match: (q) => /\b(selection process|recruitment process|hiring process|interview process|hiring procedure|how do you hire|how do you select|candidate selection|how are candidates selected|what happens after (submitting|i submit) (my )?resume|recruitment stages)\b/i.test(q),
    generate: () => ({
      reply: `At Velvora Solutions, our **Recruitment and Selection Process** is designed to be transparent, merit-based, and candidate-friendly, ensuring a strong match between candidate aspirations and organizational excellence.

### Standard Recruitment Stages:

1. **Application Submission:**
   Candidates review open positions and apply directly through our official **[Careers Portal](/careers)** by submitting their contact information and attaching an updated resume (PDF/DOCX), or by emailing **careers@velvorasolutions.com**.

2. **Resume & Profile Screening:**
   Our talent acquisition team reviews each application against the technical benchmarks and domain experience required for the role (typically completed within 24–48 hours).

3. **Technical Skill Assessment:**
   Shortlisted candidates participate in a role-specific practical evaluation to demonstrate hands-on ability:
   • *Software Developers:* Coding exercise or algorithmic problem-solving in React / Python / JavaScript.
   • *Accessibility Specialists:* Sample document or web page audit identifying WCAG / PDF/UA tagging issues.
   • *ePublishing & XML Specialists:* Composition, DITA/JATS XML validation, or typesetting review.

4. **Technical & Domain Interview:**
   A one-on-one technical discussion with our engineering or production leads to discuss your past projects, problem-solving methodologies, and technical competencies.

5. **HR & Cultural Fit Discussion:**
   A conversation with our HR team discussing role expectations, compensation, professional growth pathways, and work culture under our **G.R.O.W. Framework** (Growth, Respect, Opportunity, Well-being).

6. **Offer Rollout & Onboarding:**
   Selected candidates receive an official offer letter and onboarding schedule.

*Note:* Candidates shortlisted at each stage receive direct email notifications and scheduling links from our talent acquisition desk. You can explore active vacancies or submit an open application on our **[Careers Portal](/careers)**.`,
      sources: [
        { title: 'Careers Portal & Active Openings', url: '/careers' },
        { title: 'Life at Velvora', url: '/about/careers' },
        { title: 'Contact Recruitment Team', url: '/contact' }
      ]
    })
  },

  // 17. Training Course Durations
  {
    id: 'training-durations',
    keywords: ['course duration', 'training duration', 'how long is the course', 'duration of course', 'how long is the training', 'internship duration'],
    title: 'Velvora Solutions Training & Course Durations',
    match: (q) => /\b(course duration|training duration|what is the course duration|how long is the course|how long is the training|how long is your training|duration of (the |your )?course|duration of (the |your )?training|how many months is the internship|training timeline|internship duration)\b/i.test(q),
    generate: () => ({
      reply: `The duration of courses and training programs at Velvora Solutions depends on the track and learning format you select:

### Course Durations by Learning Track:

1. **Fast-Track Bootcamps & Crash Courses:**
   • **Duration:** **4 Weeks (1 Month)**
   • *Focus:* Intensive skill acceleration covering core fundamentals in digital publishing, introductory Python, or web accessibility basics.

2. **Standard Professional Certification Programs:**
   • **Duration:** **8 to 12 Weeks (2 to 3 Months)**
   • *Focus:* Comprehensive industry-level training with weekly modules, practical assignments, and live mentor feedback:
     - *Python Full Stack Web Development:* 12 Weeks
     - *Digital Accessibility & PDF/UA Auditing:* 8 Weeks
     - *AI & Machine Learning Foundations:* 10 Weeks
     - *Data Analytics & Power BI:* 8 Weeks
     - *ePublishing & XML Workflows:* 8 Weeks
     - *Digital Marketing & Technical SEO:* 6 to 8 Weeks

3. **Flagship Internship & Capstone Program:**
   • **Duration:** **3 Months or 6 Months**
   • *Focus:* 100% live client project exposure for students and fresh graduates, culminating in a verified certificate of completion and Pre-Placement Offer (PPO) pathways.

4. **Corporate Upskilling & Customized Workshops:**
   • **Duration:** **1 to 2 Weeks** intensive customized modules for enterprise teams.

### Flexible Schedules & Delivery Formats:
• **Batches:** Weekday and weekend batches are available to accommodate both college students and working professionals.
• **Learning Modes:** Online Virtual Live interactive classes, In-Person Classroom at our Cuddalore Head Office or Chennai Branch Office, or Hybrid.

If you have a specific program in mind, visit our **[Training & Internships Page](/training)** to explore the detailed syllabus or enroll!`,
      sources: [
        { title: 'All Training Programs', url: '/training' },
        { title: 'Flagship Internship Curriculum', url: '/training/internship-program' },
        { title: 'Contact Admissions', url: '/contact' }
      ]
    })
  },

  // 18. Training Eligibility Criteria
  {
    id: 'training-eligibility',
    keywords: ['training eligibility', 'course eligibility', 'who is eligible', 'who can join', 'eligibility criteria'],
    title: 'Velvora Training & Internship Eligibility Criteria',
    match: (q) => /\b(who is eligible|eligibility criteria|course eligibility|training eligibility|who can apply for training|can freshers apply for training|eligibility for internship)\b/i.test(q),
    generate: () => ({
      reply: `Our training and internship programs at Velvora Solutions are designed with inclusive eligibility criteria to welcome learners from diverse academic and professional backgrounds:

### Who Can Apply:
1. **College Students:** Undergraduate and postgraduate students (B.E., B.Tech, B.Sc, BCA, MCA, M.Tech, Arts & Science) seeking summer internships, winter internships, or final-year semester projects.
2. **Fresh Graduates:** Recent degree holders looking to acquire practical, industry-standard competencies in software development, digital publishing, accessibility, or data analytics to launch their careers.
3. **Working Professionals:** Individuals in IT, publishing, editorial, or content operations aiming to upskill in emerging technologies like WCAG 2.2 accessibility, AI automation, or full-stack web architectures.
4. **Career Switchers:** Enthusiastic learners from any discipline transitioning into technology and digital publishing careers.

### Prerequisites:
• No prior corporate experience is required for foundational tracks.
• Basic computer literacy and logical thinking are sufficient to start.
• Dedicated 1-on-1 mentorship is provided throughout each track.

To enroll, visit our **[Training & Internships Portal](/training)** and submit the application form.`,
      sources: [
        { title: 'Training & Internships', url: '/training' },
        { title: 'Admissions Inquiry', url: '/contact' }
      ]
    })
  }
];

/**
 * Technical Comparison Handlers
 */
export const comparisonTopics = [
  // HTML vs React
  {
    match: (q) => /\b(html vs react|difference between html and react|react vs html|compare html and react)\b/i.test(q),
    generate: () => ({
      reply: `### HTML vs. React: Key Differences

| Feature | Vanilla HTML | React |
|---|---|---|
| **Nature** | Static markup language | Dynamic JavaScript library |
| **Componentization** | Monolithic documents; no native component reuse | Modular, reusable components (\`JSX\`) |
| **State & Interactivity** | Requires manual DOM scripting (\`document.querySelector\`) | Reactive state (\`useState\`); UI automatically re-renders |
| **DOM Manipulation** | Directly modifies the browser DOM (slower) | Uses an in-memory Virtual DOM to batch updates efficiently |
| **Ecosystem** | Native browser standard | Requires build tools (Vite, Webpack), Node, and NPM ecosystem |

**Summary:** HTML is the foundational language of the web. React builds on top of HTML and JavaScript to create scalable, interactive web applications.`,
      sources: [{ title: 'Software & Web Development', url: '/services/software-development' }]
    })
  },

  // Python vs Java
  {
    match: (q) => /\b(python vs java|difference between python and java|java vs python)\b/i.test(q),
    generate: () => ({
      reply: `### Python vs. Java: Key Differences

| Feature | Python | Java |
|---|---|---|
| **Typing** | Dynamically typed (type checked at runtime) | Statically typed (type checked at compile time) |
| **Syntax** | Concise, readable, whitespace-sensitive | Verbose, explicit, strict class-based structure |
| **Execution** | Interpreted to bytecode, run on PVM | Compiled to bytecode (\`.class\`), run on JVM |
| **Speed** | Slower raw execution; optimized with C libraries | Faster raw execution via JIT compilation |
| **Primary Use Cases** | AI, Machine Learning, Data Analytics, Web APIs | Enterprise backend systems, Android, large architectures |

**Summary:** Python prioritizes developer velocity and data science dominance, while Java offers strict type safety and immense enterprise concurrency.`,
      sources: [{ title: 'AI and Automation', url: '/services/ai-automation' }]
    })
  },

  // AI vs Machine Learning
  {
    match: (q) => /\b(ai vs ml|difference between ai and ml|machine learning vs ai|ai vs machine learning)\b/i.test(q),
    generate: () => ({
      reply: `### Artificial Intelligence (AI) vs. Machine Learning (ML)

• **Artificial Intelligence (AI)** is the **broad umbrella concept** of building machines capable of simulating human intelligence and reasoning.
• **Machine Learning (ML)** is a **specific subset of AI** where systems learn patterns directly from data rather than relying on explicit hand-crafted rules.

**Key Metaphor:**
If Artificial Intelligence is the overarching science of *"transportation"*, then Machine Learning is a specific powerful vehicle like an *"electric automobile"*, and Deep Learning is the *"high-efficiency battery engine"* powering it.`,
      sources: [{ title: 'AI/ML Training Program', url: '/training/ai-ml-training' }]
    })
  },

  // Traditional Automation vs AI Automation
  {
    match: (q) => /\b(traditional automation vs ai automation|difference between traditional automation and ai)\b/i.test(q),
    generate: () => ({
      reply: `### Traditional Automation vs. AI Automation

| Feature | Traditional Automation (RPA / Scripts) | AI Automation (Intelligent Automation) |
|---|---|---|
| **Logic** | Strict rule-based: *"If this, then that"* | Probabilistic reasoning and pattern recognition |
| **Input Data** | Structured data only (standard spreadsheets, exact forms) | Unstructured data (freeform text, scanned PDFs, images, natural language) |
| **Handling Changes** | Breaks if a button shifts or format changes slightly | Adapts dynamically to layout and semantic variations |
| **Decision Making** | Deterministic: cannot handle ambiguity | Evaluates context, confidence scores, and nuanced text |

Velvora Solutions unites high-speed automated pipelines with AI-powered document understanding and human-in-the-loop validation for publishing and accessibility.`,
      sources: [{ title: 'AI and Automation Services', url: '/services/ai-automation' }]
    })
  },

  // Accessibility vs Usability
  {
    match: (q) => /\b(accessibility vs usability|difference between accessibility and usability)\b/i.test(q),
    generate: () => ({
      reply: `### Accessibility vs. Usability: Key Differences

• **Accessibility (a11y):** Ensures that people with diverse disabilities (visual, auditory, motor, cognitive) have equal access to digital content and services. It is governed by legal and technical standards such as **WCAG 2.2**, **PDF/UA**, and **Section 508**.
• **Usability:** Focuses on the overall user experience, efficiency, satisfaction, and ease of use for the general audience.

**In Short:**
Accessibility is about **inclusion and equal barrier-free access** (e.g. can a screen reader user navigate this form?), whereas Usability is about **convenience and friction reduction** (e.g. how fast and intuitive is the form to complete?). Accessible design invariably improves general usability for everyone.`,
      sources: [{ title: 'Digital Accessibility Services', url: '/services/digital-accessibility' }]
    })
  },

  // XML vs HTML
  {
    match: (q) => /\b(xml vs html|difference between xml and html|html vs xml)\b/i.test(q),
    generate: () => ({
      reply: `### XML vs. HTML: Key Differences

| Feature | XML (Extensible Markup Language) | HTML (HyperText Markup Language) |
|---|---|---|
| **Primary Purpose** | To **store and transport** structured data | To **display and format** content in web browsers |
| **Tags** | Extensible: you define custom tags (\`<article>\`, \`<citation>\`) | Predefined: tags are standard (\`<h1>\`, \`<p>\`, \`<div>\`) |
| **Syntax Strictness** | Extremely strict: every tag must close; case-sensitive | Forgiving: browsers attempt to parse malformed markup |
| **Role in Publishing** | Single source of truth (JATS, BITS) for books and journals | Final rendered presentation layer for web readers |

Velvora Solutions specializes in converting raw documents into structured XML and rendering them into accessible HTML and EPUB 3 publications.`,
      sources: [
        { title: 'XML Services', url: '/services/xml' },
        { title: 'ePublishing Services', url: '/services/epublishing' }
      ]
    })
  },

  // EPUB vs PDF
  {
    match: (q) => /\b(epub vs pdf|difference between epub and pdf|pdf vs epub)\b/i.test(q),
    generate: () => ({
      reply: `### EPUB vs. PDF: Key Differences in Digital Publishing

| Feature | EPUB (Electronic Publication) | PDF (Portable Document Format) |
|---|---|---|
| **Layout Nature** | **Reflowable by default**: text adapts smoothly to any screen size | **Fixed layout**: preserves exact geometric coordinates and page printing |
| **Reading Experience** | Optimized for mobile devices, e-readers, and font resizing | Optimized for print fidelity and desktop viewing |
| **Accessibility** | Built on web standards (HTML/CSS), natively accessible | Requires specialized tagging (PDF/UA tag trees) for screen readers |
| **Underlying Code** | A packaged archive of HTML5, CSS, and metadata | PostScript-derived visual drawing instructions |

Velvora delivers dual multi-format delivery, generating reflowable/fixed EPUB 3 files and fully accessible PDF/UA documents from a single master source.`,
      sources: [
        { title: 'ePublishing Services', url: '/services/epublishing' },
        { title: 'Digital Accessibility', url: '/services/digital-accessibility' }
      ]
    })
  }
];

/**
 * Professional Writing Assistance Templates & Generators
 */
export const professionalWritingTopics = [
  // Draft an Email
  {
    match: (q) => /\b(draft.*email|write.*email|help me write.*email|sample email|compose email)\b/i.test(q),
    generate: () => ({
      reply: `Here is a clean, professional email template you can adapt:

\`\`\`text
Subject: Project Consultation Inquiry — [Your Project / Organization Name]

Dear [Recipient Name / Velvora Team],

I hope this email finds you well.

I am writing to inquire about your professional services in [Service Area, e.g. PDF/UA Accessibility Remediation / ePublishing / XML Conversion]. 

Our organization currently requires [brief overview of your project, e.g. remediation of 250 backlist PDF publications to WCAG 2.2 AA standards]. We are aiming for a delivery timeframe of [Target Deadline, e.g. within 6 weeks].

Could you please let us know:
1. Your availability and estimated turnaround schedule for this scope.
2. The recommended technical workflow and pricing guidelines.
3. Next steps for sharing a sample document for estimation.

Thank you for your time and guidance. I look forward to your response.

Warm regards,

[Your Name]
[Your Title / Organization]
[Your Phone Number & LinkedIn Profile]
\`\`\`

If you are contacting Velvora Solutions directly, you can send your inquiry to **info@velvorasolutions.com** or use our **[Contact Us Page](/contact)**.`,
      sources: [{ title: 'Contact Us', url: '/contact' }]
    })
  },

  // Partnership Proposal
  {
    match: (q) => /\b(write.*partnership proposal|draft.*partnership|partnership enquiry template|proposal template)\b/i.test(q),
    generate: () => ({
      reply: `Here is a structured business partnership proposal outline:

\`\`\`text
Subject: Business Partnership & Collaboration Proposal — [Your Company Name]

Dear Velvora Alliances Team,

I am reaching out on behalf of [Your Company Name], a provider of [your domain, e.g., higher education publishing solutions / digital technology services].

We have been following Velvora Solutions' leadership in digital accessibility compliance (WCAG 2.2 / PDF/UA) and structured ePublishing workflows. We believe there is strong strategic synergy between our organizations.

Proposed Collaboration Model:
• Area of Collaboration: [Technology Alliance / Agency Subcontracting / Referral Partnership]
• Objective: [e.g. Delivering end-to-end accessible document composition for our university press clients]
• Value Proposition: [Describe the mutual benefits, volume potential, or joint technology integration]

We would welcome an introductory meeting with your business development desk to discuss how we can collaborate under mutual Non-Disclosure terms.

Sincerely,

[Your Name]
[Your Title, Business Development]
[Company Website & Contact Info]
\`\`\`

You can submit this proposal directly via our **[Partner With Us Page](/partner-with-us)** or email **info@velvorasolutions.com**.`,
      sources: [{ title: 'Partner With Us', url: '/partner-with-us' }]
    })
  },

  // Internship Application / Cover Letter
  {
    match: (q) => /\b(internship application email|cover letter for internship|draft.*internship application|how to write resume)\b/i.test(q),
    generate: () => ({
      reply: `Here is a professional internship application note you can tailor:

\`\`\`text
Subject: Application for [Track Name, e.g. Digital Accessibility / AI Engineering] Internship — [Your Name]

Dear Academic Coordinator & Hiring Team,

I am writing to express my strong interest in the [Selected Track, e.g. Digital Accessibility / Software Development] Internship Program at Velvora Solutions.

I am currently a [Year of Study, e.g., final-year student] pursuing my [Degree, e.g. B.E in Computer Science / MCA] at [College/University Name]. Throughout my studies, I have developed foundational skills in [mention 2-3 relevant skills, e.g. HTML/CSS, Python, web accessibility principles, and data structures].

What attracts me to Velvora Solutions is your commitment to 100% live client project exposure and structured mentorship under the G.R.O.W. framework. I am eager to contribute to real-world production deliverables while expanding my practical competencies.

I have attached my updated resume for your review. I look forward to the opportunity to discuss my application.

Sincerely,

[Your Name]
[Phone Number]
[Email Address]
[GitHub / Portfolio / LinkedIn Link]
\`\`\`

To submit your application online, visit our **[Careers Portal](/careers)** or enroll at **[Training & Internships](/training)**.`,
      sources: [
        { title: 'Training & Internships', url: '/training' },
        { title: 'Careers Portal', url: '/careers' }
      ]
    })
  }
];
