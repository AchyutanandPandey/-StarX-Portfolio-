export const profile = {
  name: "AN Pandey",
  role: "Full Stack Developer",
  tagline: "I build modern, fast and user-friendly web & mobile experiences that make an impact.",
  location: "India",
  email: "startechnoloyx@gmail.com",
  phoneDisplay: "+91 XXXXX XXXXX",
  resume: "/AN-Pandey-Resume.pdf",
  socials: {
    github: "https://github.com/AchyutanandPandey",
    linkedin: "https://www.linkedin.com/in/an-pandey-462276222?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    email: "mailto:startechnoloyx@gmail.com",
  },
};

export const skills = [
  {
    group: "Frontend",
    items: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "js" },
      { name: "React", icon: "react" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Python", icon: "python" },
      { name: "Django", icon: "django" },
      { name: "REST API", icon: "api" },
      { name: "Node.js", icon: "node" },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongo" },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Docker", icon: "docker" },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "StarX Store",
    category: "Web",
    tech: ["React", "Django", "MongoDB"],
    description: "Modern e-commerce experience with product browsing, cart, checkout-ready flows and a scalable backend structure.",
    featured: true,
    status: "upcoming",
    demo: "",
    github: "https://github.com/AchyutanandPandey",
    image: "/projects/starx-store-demo.png",
    overview: "A full-stack e-commerce concept designed to cover the customer journey from discovery to checkout. The current portfolio build presents the UI direction while the production deployment is planned next.",
    highlights: ["Responsive product catalogue", "Cart and checkout-ready flow", "Django API architecture", "Database-backed product model"],
    build: "React frontend + Django backend + MongoDB data layer, with reusable product, cart and order patterns ready to expand.",
  },
  {
    id: 2,
    title: "NextGen Mock Test",
    category: "Web",
    tech: ["React", "Django", "SQLite"],
    description: "Browser-based mock-test platform with subject-wise MCQs, timer, review, results and performance tracking.",
    featured: true,
    status: "live",
    demo: "https://achyutanandpandey.github.io/NextGen-Mock-Test/",
    github: "https://github.com/AchyutanandPandey",
    image: "/projects/nextgen-mock-test-demo.png",
    overview: "A practical exam-practice platform focused on a distraction-free test flow. Students can answer MCQs, mark questions for review, finish with a timer and inspect performance after submission.",
    highlights: ["Subject-wise MCQ workflow", "Countdown timer and review state", "Result and performance analysis", "Password-protected admin direction"],
    build: "React handles the browser experience while Django/SQLite support the structured content and backend-ready architecture.",
  },
  {
    id: 3,
    title: "AI Study Assistant",
    category: "AI",
    tech: ["Python", "FastAPI", "OpenAI"],
    description: "AI-powered study assistant demo for asking questions, summarising notes and solving learning problems.",
    featured: true,
    status: "upcoming",
    demo: "",
    github: "https://github.com/AchyutanandPandey",
    image: "/projects/ai-study-assistant-demo.png",
    overview: "A focused learning workspace concept for students who want one place to ask questions, simplify notes and generate revision support with AI.",
    highlights: ["Question and answer workspace", "Note summarisation flow", "Revision-friendly responses", "API-ready AI provider layer"],
    build: "Python/FastAPI provides the service layer with an AI integration point. The portfolio currently presents the intended UI while the live product is planned later.",
  },
];

export const experience = [
  {
    year: "2026 — Present",
    title: "Developer / Freelancer",
    company: "Independent",
    text: "Building practical web applications, APIs and responsive user interfaces.",
  },
];

export const education = [
  {
    year: "2026",
    title: "B.Tech / Computer Science",
    institute: "Chaudhary Charan Singh University Campus, Meerut",
  },
  {
    year: "2025",
    title: "Diploma / Computer Science",
    institute: "Government Polytechnic College, Katai Joya JP Nagar",
  },
  {
    year: "2024",
    title: "Internship / Fullstack Developer",
    institute: "Campus Buddy Institue Rohini Sector 07 Delhi 83",
  },
];
export const certificates = [
  { title: "Web Development", issuer: "CAMPUS BUDDY Rohini Sector 07 Delhi 83", year: "2024" },
  { title: "Python Programming with Django", issuer: "CAMPUS BUDDY Rohini Sector 07 Delhi 83", year: "2024" },
];
export const services = [
  { icon: "Globe", title: "Website Development", text: "Responsive websites and modern frontend experiences." },
  { icon: "Smartphone", title: "Mobile App Development", text: "Mobile-first products and API-connected applications." },
  { icon: "Server", title: "Backend Development", text: "Secure APIs, authentication and database-driven systems." },
  { icon: "ShoppingCart", title: "E-Commerce Development", text: "Catalog, cart, checkout, order and admin workflows." },
];
export const posts = [
  { title: "How I designed StarX Store's customer flow", tag: "E-Commerce", date: "Aug 2026", text: "From product discovery to checkout-ready interactions, the important part is reducing friction while keeping the architecture easy to grow." },
  { title: "Building a mock-test experience that feels simple", tag: "React", date: "Aug 2026", text: "Timers, review states, question navigation and result analysis need a clear state model before they need more UI." },
  { title: "What I learned from building with Django", tag: "Django", date: "Jul 2026", text: "A maintainable backend starts with clear models, predictable endpoints and validation instead of pushing everything into frontend logic." },
  { title: "Designing an AI study assistant", tag: "AI", date: "Jul 2026", text: "AI products become more useful when prompts, context, response states and user actions are treated as one experience." },
  { title: "Responsive layouts without overcomplicating CSS", tag: "UI/UX", date: "Jul 2026", text: "Flexible grids, sensible spacing and a small set of breakpoints can cover most portfolio and product layouts cleanly." },
  { title: "Why I keep project data separate from React UI", tag: "React", date: "Jun 2026", text: "Keeping projects, services and profile content in data modules makes the interface easier to update without repeating component code." },
  { title: "Git and GitHub habits that help my projects", tag: "Git", date: "Jun 2026", text: "Small commits, meaningful repository structure and clear README files make it much easier to return to a project later." },
  { title: "From portfolio idea to complete full-stack build", tag: "Full Stack", date: "Jun 2026", text: "A polished portfolio is more than a homepage: it needs content hierarchy, project proof, responsive behavior and a working contact path." },
];
