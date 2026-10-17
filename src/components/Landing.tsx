import { PropsWithChildren, useEffect, useState } from "react";
import { MdArrowOutward, MdSchool } from "react-icons/md";
import "./styles/Landing.css";
import { personalData } from "../data/personal";
import { getSmootherInstance } from "./utils/scrollSmoother";

const animatedRoles = [
  "Software Engineer",
  "CSE Student",
  "Full-Stack Developer",
  "Problem Solver & Builder",
];

const Landing = ({ children }: PropsWithChildren) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % animatedRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (targetId: string) => {
    const smoother = getSmootherInstance();
    if (smoother && window.innerWidth > 1024) {
      smoother.scrollTo(targetId, true, "top top");
    } else {
      const el = document.querySelector(targetId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        {/* Left Content Column */}
        <div className="hero-content-col">
          <h2 className="hero-greeting">Hello! I'm</h2>

          <h1 className="hero-name">
            {personalData.firstName} <span>{personalData.lastName}</span>
          </h1>

          {/* Reserved height animated role heading (32-44px) */}
          <div className="hero-role-container">
            <div className="hero-role-track" aria-live="polite">
              {animatedRoles.map((role, idx) => (
                <h3
                  key={idx}
                  className={`hero-role-item ${idx === roleIndex ? "active" : ""}`}
                >
                  {role}
                </h3>
              ))}
            </div>
          </div>

          {/* Role Badges (14-17px) */}
          <div className="hero-badges-wrap">
            <span className="hero-pill">BE Computer Science</span>
            <span className="hero-pill">Full-Stack &amp; DSA</span>
            <span className="hero-pill">Applied AI/ML</span>
          </div>

          {/* Introduction Paragraph (16-19px, line-height: 1.6) */}
          <p className="hero-bio">
            Computer Science Engineering undergraduate at Chitkara University (8.77 CGPA)
            passionate about building scalable full-stack applications, mastering Data
            Structures &amp; Algorithms, and developing intelligent software systems.
          </p>

          {/* CTA Buttons (16-18px) */}
          <div className="hero-cta-wrap">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#work");
              }}
              className="hero-btn hero-btn-primary"
              data-cursor="disable"
            >
              <span>View Projects</span>
              <MdArrowOutward />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              className="hero-btn hero-btn-secondary"
              data-cursor="disable"
            >
              <span>Contact Me</span>
            </a>
          </div>

          {/* University & Achievements Card (Title: 18-22px, Badges: 14-16px) */}
          <div className="hero-university-card">
            <div className="uni-card-header">
              <div className="uni-card-icon-wrap">
                <MdSchool className="uni-icon" />
              </div>
              <div className="uni-card-title-group">
                <h4 className="uni-card-title">Chitkara University</h4>
                <span className="uni-card-sub">
                  BE Computer Science Engineering &bull; 2024–2028
                </span>
              </div>
            </div>
            <div className="uni-card-badges">
              <span className="uni-chip highlight">
                <strong>8.77</strong> CGPA
              </span>
              <span className="uni-chip">
                <strong>5+</strong> Hackathons
              </span>
              <span className="uni-chip">
                <strong>Top 100</strong> Codex 2.0
              </span>
              <span className="uni-chip">
                <strong>Round 3</strong> Code Parliament
              </span>
            </div>
          </div>
        </div>

        {/* Right Visual Area (For mobile/embedded children) */}
        <div className="hero-visual-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Landing;


