import "./styles/Career.css";
import { careerData, educationData, achievementsData } from "../data/career";
import {
  FaGraduationCap,
  FaTrophy,
  FaLaptopCode,
  FaMedal,
  FaPeopleGroup,
} from "react-icons/fa6";
import { MdLocationOn, MdDateRange } from "react-icons/md";

const getAchievementIcon = (id: string) => {
  switch (id) {
    case "hackathons":
      return <FaLaptopCode />;
    case "codex":
      return <FaTrophy />;
    case "code-parliament":
      return <FaMedal />;
    case "sports-club":
      return <FaPeopleGroup />;
    default:
      return <FaTrophy />;
  }
};

const Career = () => {
  return (
    <div className="career-section section-container" id="education">
      <div className="career-container">
        <h2>
          Education <span>&amp;</span>
          <br /> Achievements
        </h2>

        {/* GSAP-controlled Experience Timeline */}
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerData.map((item) => (
            <div className="career-info-box" key={item.id}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.period}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Phase 8: Elegant Education Section */}
        <div className="education-block">
          <div className="edu-achieve-header">
            <h3>
              Academic <span>Foundation</span>
            </h3>
            <p>Formal Computer Science Engineering education and academic standing</p>
          </div>

          <div className="education-card">
            <div className="edu-card-left">
              <div className="edu-icon-badge">
                <FaGraduationCap />
              </div>
              <div>
                <h4>{educationData.degree}</h4>
                <div className="edu-institution">{educationData.institution}</div>
                <div className="edu-meta">
                  <span>
                    <MdLocationOn /> {educationData.location}
                  </span>
                  <span>
                    <MdDateRange /> {educationData.period}
                  </span>
                </div>
              </div>
            </div>

            <div className="edu-card-right">
              <div className="cgpa-badge">
                <span className="cgpa-number">{educationData.cgpa}</span>
                <span className="cgpa-label">Cumulative GPA</span>
              </div>
            </div>
          </div>

          <div className="edu-highlights-list">
            {educationData.highlights.map((highlight, idx) => (
              <div className="edu-highlight-item" key={idx}>
                <span className="highlight-bullet">&bull;</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 8: Compact Achievements Section */}
        <div className="achievements-block">
          <div className="edu-achieve-header">
            <h3>
              Key <span>Achievements</span>
            </h3>
            <p>Verified competitive programming, hackathon milestones, and campus leadership</p>
          </div>

          <div className="achievements-grid">
            {achievementsData.map((ach) => (
              <div className="achievement-card" key={ach.id}>
                <div className="ach-card-top">
                  <div className="ach-icon-wrap">
                    {getAchievementIcon(ach.id)}
                  </div>
                  <span className="ach-badge">{ach.badge}</span>
                </div>
                <h4>{ach.title}</h4>
                <span className="ach-category">{ach.category}</span>
                <p>{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

