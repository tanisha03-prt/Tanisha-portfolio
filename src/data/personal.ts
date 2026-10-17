export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  headline: string;
  subheadline: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    duration: string;
    cgpa: string;
    details: string;
  };
  email: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    leetcode: string;
  };
  resumeUrl?: string;
  bio: string;
}

export const personalData: PersonalInfo = {
  name: "Tanisha Singh",
  firstName: "TANISHA",
  lastName: "SINGH",
  headline: "Computer Science Engineering Student | Aspiring Software Engineer",
  subheadline: "Passionate about Full-Stack Systems, DSA, Databases & Applied AI",
  education: {
    degree: "BE in Computer Science Engineering",
    institution: "Chitkara University",
    location: "Punjab, India",
    duration: "August 2024 – July 2028",
    cgpa: "8.77",
    details:
      "Focused on Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, and Machine Learning.",
  },
  email: "tanishasingh0302@gmail.com",
  location: "Punjab, India",
  socials: {
    github: "https://github.com/tanisha03-prt",
    linkedin: "https://linkedin.com/in/tanisha-singh-51b610352",
    leetcode: "https://leetcode.com/u/tanisha_singh8603",
  },
  resumeUrl: undefined, // Only enabled when actual resume PDF file is uploaded
  bio: "I am a Computer Science Engineering student at Chitkara University (CGPA 8.77) with an active focus on software engineering, problem-solving, and building production-ready applications. From developing full-stack web platforms and backend APIs to training predictive machine learning models, I combine strong computer science fundamentals with hands-on development and hackathon-tested teamwork.",
};

