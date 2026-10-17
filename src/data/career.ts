export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
}

export interface MilestoneItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tag: string;
}

export const educationData: EducationItem = {
  degree: "BE in Computer Science Engineering",
  institution: "Chitkara University",
  location: "Punjab, India",
  period: "August 2024 – July 2028",
  cgpa: "8.77",
  highlights: [
    "Comprehensive computer science foundations in DSA, OOP, OS, DBMS & Computer Networks",
    "Active participation in campus technical clubs and university coding hackathons",
    "Maintaining high academic standing with an 8.77 CGPA",
  ],
};

export const achievementsData: AchievementItem[] = [
  {
    id: "hackathons",
    title: "5+ Hackathons Participated",
    category: "Competitive Development",
    description:
      "Rapidly prototyped and presented functional software solutions under strict time constraints in regional and national hackathons.",
    badge: "Hackathons",
  },
  {
    id: "codex",
    title: "Top 100 at Codex 2.0",
    category: "Coding Competition",
    description:
      "Ranked among the top 100 participants in Codex 2.0, demonstrating sharp algorithmic problem-solving speed and algorithmic accuracy.",
    badge: "Top 100",
  },
  {
    id: "code-parliament",
    title: "Qualified for Round 3: Code Parliament Hackathon",
    category: "Chitkara University",
    description:
      "Advanced through competitive screening and multi-stage evaluation rounds at Chitkara University's Code Parliament Hackathon.",
    badge: "Round 3 Finalist",
  },
  {
    id: "sports-club",
    title: "Sports Club Member (2025)",
    category: "Extracurricular & Leadership",
    description:
      "Active member of the university sports club, fostering team coordination, disciplined work ethics, and collaborative spirit.",
    badge: "Active Member",
  },
];

export const careerData: MilestoneItem[] = [
  {
    id: "milestone-1",
    role: "BE Computer Science Engineering",
    company: "Chitkara University, Punjab",
    period: "2024 - 2028",
    description:
      "Pursuing Bachelor of Engineering with an 8.77 CGPA. Deepening expertise in Data Structures, Java, Algorithms, Database Systems, and Object-Oriented Design.",
    tag: "Education",
  },
  {
    id: "milestone-2",
    role: "Hackathon Competitor & Builder",
    company: "5+ Hackathons • Codex 2.0 Top 100",
    period: "2024 - 2025",
    description:
      "Built production-ready projects in fast-paced hackathons. Ranked in Top 100 at Codex 2.0 and reached Round 3 of the Code Parliament Hackathon at Chitkara University.",
    tag: "Achievements",
  },
  {
    id: "milestone-3",
    role: "Aspiring Software Engineer",
    company: "Full-Stack • Machine Learning • LeetCode",
    period: "NOW",
    description:
      "Actively building high-impact full-stack and AI observability tools (Kharcha Tracker, Quick AI, TraceLens), solving DSA problems on LeetCode, and preparing for software engineering opportunities.",
    tag: "Current Focus",
  },
];
