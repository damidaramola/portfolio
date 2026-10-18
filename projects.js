// Edit this file to update the site. Every section is rendered from the data below.

const PROFILE = {
  name: "Dami Daramola",
  role: "Software Engineer",
  tagline: "I'm a software engineer who enjoys turning curiosity into execution.",
  resume: "", // e.g. "resume.pdf" (put the file in this folder). Leave empty to hide the button.
  links: {
    github: "https://github.com/damidaramola",
    linkedin: "www.linkedin.com/in/dami-daramola", // e.g. "https://www.linkedin.com/in/your-handle". Leave empty to hide.
  },
  // About section paragraphs. Empty hides the section. To bring it back, use:
  // about: ["I'm a software engineer who enjoys turning curiosity into execution."],
  about: [],
};

// tags: the technologies shown under the project name.
// featured: true moves a project to the top of the list.
// image: a screenshot of the landing page, saved in the images folder.
// The project name links to demo if set, otherwise repo. Leave either empty to hide that link.
const PROJECTS = [
  {
    title: "Canvas Corner",
    image: "images/canvas-corner.png",
    description:
      "A community hub for painters to showcase their artwork, discover inspiration and grow their network, from beginners to professionals",
    tags: ["React.js", "Django", "RESTFramework", "HTML", "CSS", "PostgreSQL"],
    repo: "https://github.com/damidaramola/canvas-corner",
    demo: "",
    featured: true,
  },
  {
    title: "Festive Fun",
    image: "images/canvas-corner2.png",
    description: "A guide to the world's best music festivals and events, with practical tips and outfit ideas for young festival-goers",
    tags: ["Python", "Django", "HTML", "CSS", "Bootstrap", "SQL"],
    repo: "https://github.com/damidaramola",
    demo: "",
    featured: true,
  },
  {
    title: "Memory Card Game",
    image: "images/card-game.png",
    description: "Find the Queen of Diamonds: a four-round card game where each correct pick from the shuffled deck earns points",
    tags: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/damidaramola",
    demo: "",
  },

];

const SKILLS = {
  Languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS"],
  Frameworks: ["React.js", "Django", "Flask", "Symfony", "Bootstrap"],
  "APIs & Testing": ["REST APIs", "Postman", "Swagger", "Xdebug"],
  "DevOps & Infrastructure": ["Docker", "Containerisation", "Virtualisation", "CI/CD", "Linux", "GitHub","AWS","Kubernetes"],
  "Data & AI": ["Snowflake", "Tableau", "LLMs", "FastMCP", "Claude Code"],
  Practices: ["OOP", "Authentication", "Authorisation", "Miro"],
};

// Most recent first. An empty array hides the section.
// points (optional): bullet points under each role, e.g. points: ["Built X", "Led Y"].
const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Apple",
    period: "2025 – Present",
  
  },
  {
    role: "Software Engineer Intern",
    org: "KPMG",
    period: "2023 – 2023",
  },
];
