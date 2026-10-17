export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tools: string;
  techBadges: string[];
  description: string;
  image: string;
  github: string;
  live?: string;
  link?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "kharcha-tracker",
    number: "01",
    title: "Kharcha Tracker",
    category: "Full-Stack Web Application",
    tools: "React.js, Express.js, MongoDB, JWT, Mongoose, Recharts",
    techBadges: ["React.js", "Express.js", "MongoDB", "JWT", "Mongoose", "Recharts"],
    description:
      "A full-stack expense tracker for logging expenses, organizing categories, and visualizing spending patterns. Includes authentication, REST APIs, and spending analytics.",
    image: "/images/react.webp",
    github: "https://github.com/tanisha03-prt",
    link: "https://github.com/tanisha03-prt",
  },
  {
    id: "quick-ai",
    number: "02",
    title: "Quick AI",
    category: "AI SaaS Platform",
    tools: "React, Node.js, Express.js, Gemini API, Clerk, PostgreSQL",
    techBadges: ["React", "Node.js", "Express.js", "Gemini API", "Clerk", "PostgreSQL"],
    description:
      "An AI SaaS platform that brings AI-powered utilities into one dashboard. Integrates the Gemini API, uses Clerk authentication and protected routes, and uses PostgreSQL for data storage.",
    image: "/images/next.webp",
    github: "https://github.com/tanisha03-prt",
    link: "https://github.com/tanisha03-prt",
  },
  {
    id: "heart-disease-prediction",
    number: "03",
    title: "Heart Disease Prediction System",
    category: "Machine Learning & Healthcare",
    tools: "Python, Flask, Pandas, NumPy, Scikit-learn",
    techBadges: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn"],
    description:
      "A machine learning application that predicts heart disease risk from clinical parameters. Includes preprocessing, exploratory data analysis, feature engineering, model training, and evaluation using accuracy, precision, recall, and a confusion matrix.",
    image: "/images/node.webp",
    github: "https://github.com/tanisha03-prt",
    link: "https://github.com/tanisha03-prt",
  },
  {
    id: "tracelens",
    number: "04",
    title: "TraceLens",
    category: "AI Observability & Forensics",
    tools: "Python, FastAPI",
    techBadges: ["Python", "FastAPI", "AI Observability", "Pipeline Tracing"],
    description:
      "An observability and failure-forensics tool for multi-step AI pipelines. It traces intermediate steps, records execution information, helps identify where failures originate, and supports building a growing evaluation dataset.",
    image: "/images/next.webp",
    github: "https://github.com/tanisha03-prt",
    link: "https://github.com/tanisha03-prt",
  },
];

