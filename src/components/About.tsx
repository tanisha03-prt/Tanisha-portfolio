import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Computer Science Engineering student at Chitkara University
          with a strong passion for problem-solving and software engineering. My
          journey centers on mastering Java and Data Structures &amp; Algorithms,
          building practical full-stack projects, and exploring modern AI/ML and
          system design.
        </p>
        <div className="about-details">
          <div className="about-card">
            <span className="about-card-badge">Education</span>
            <h4>B.E. Computer Science Engineering</h4>
            <span className="about-card-text">Chitkara University</span>
          </div>
          <div className="about-card">
            <span className="about-card-badge">Core Focus</span>
            <h4>Full-Stack &amp; Algorithms</h4>
            <span className="about-card-text">
              Java &bull; DSA &bull; AI/ML &bull; System Design
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
