import { MdArrowOutward, MdCopyright, MdMailOutline, MdLocationOn } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { TbNotes } from "react-icons/tb";
import "./styles/Contact.css";
import { personalData } from "../data/personal";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <p className="contact-tagline">
          Interested in working together, discussing software engineering roles, or connecting?
        </p>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Direct Email</h4>
            <p>
              <a
                href={`mailto:${personalData.email}`}
                data-cursor="disable"
                className="contact-email-link"
                aria-label={`Send an email to ${personalData.email}`}
              >
                <MdMailOutline className="contact-inline-icon" />
                {personalData.email}
              </a>
            </p>

            <h4>Location</h4>
            <p className="contact-location-text">
              <MdLocationOn className="contact-inline-icon" />
              {personalData.location} (Chitkara University)
            </p>

            {personalData.resumeUrl && (
              <div className="contact-resume-wrap">
                <h4>Resume</h4>
                <p>
                  <a
                    href={personalData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    className="contact-resume-link"
                  >
                    <TbNotes className="contact-inline-icon" />
                    Download Resume
                  </a>
                </p>
              </div>
            )}
          </div>

          <div className="contact-box">
            <h4>Professional Profiles</h4>
            <a
              href={personalData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
              aria-label="LinkedIn profile"
            >
              <span className="contact-social-label">
                <FaLinkedinIn /> LinkedIn
              </span>
              <MdArrowOutward />
            </a>
            <a
              href={personalData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
              aria-label="GitHub profile"
            >
              <span className="contact-social-label">
                <FaGithub /> GitHub
              </span>
              <MdArrowOutward />
            </a>
            <a
              href={personalData.socials.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
              aria-label="LeetCode profile"
            >
              <span className="contact-social-label">
                <SiLeetcode /> LeetCode
              </span>
              <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2>
              Designed &amp; Built <br /> by <span>{personalData.name}</span>
            </h2>
            <p className="contact-role-subtext">
              {personalData.headline}
            </p>
            <h5>
              <MdCopyright /> {new Date().getFullYear()} {personalData.name}. All rights reserved.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

