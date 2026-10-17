import "./styles/About.css";
import { FaGraduationCap, FaCode, FaServer, FaBrain } from "react-icons/fa6";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Computer Science Engineering student at Chitkara University
          maintaining an 8.77 CGPA, driven by a strong passion for software
          engineering and rigorous problem-solving. My technical focus spans Data
          Structures &amp; Algorithms, full-stack web applications, RESTful APIs,
          database design, and applied machine learning.
        </p>

        <div className="about-details">
          <div className="about-card">
            <div className="about-card-icon-title">
              <FaGraduationCap className="about-icon" />
              <span className="about-card-badge">Education</span>
            </div>
            <h4>B.E. Computer Science Engineering</h4>
            <span className="about-card-text">
              Chitkara University, Punjab &bull; 2024–2028 &bull; <strong>CGPA: 8.77</strong>
            </span>
          </div>

          <div className="about-card">
            <div className="about-card-icon-title">
              <FaCode className="about-icon" />
              <span className="about-card-badge">Algorithms &amp; DSA</span>
            </div>
            <h4>Problem Solving &amp; Core CS</h4>
            <span className="about-card-text">
              Data Structures &bull; Java &bull; Python &bull; C++ &bull; Active on LeetCode
            </span>
          </div>

          <div className="about-card">
            <div className="about-card-icon-title">
              <FaServer className="about-icon" />
              <span className="about-card-badge">Full-Stack &amp; Data</span>
            </div>
            <h4>APIs &amp; Database Systems</h4>
            <span className="about-card-text">
              React &bull; Node &bull; Express &bull; Flask &bull; PostgreSQL &bull; MongoDB &bull; Redis
            </span>
          </div>

          <div className="about-card">
            <div className="about-card-icon-title">
              <FaBrain className="about-icon" />
              <span className="about-card-badge">Innovation &amp; AI</span>
            </div>
            <h4>Applied ML &amp; Hackathons</h4>
            <span className="about-card-text">
              5+ Hackathons &bull; Codex 2.0 Top 100 &bull; Scikit-learn &bull; FastAPI Observability
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

