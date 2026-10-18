import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projectsData } from "../data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Work = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    const calculateTranslateX = () => {
      const box = document.getElementsByClassName("work-box");
      if (!box || box.length === 0) return 0;
      const workContainer = document.querySelector(".work-container");
      if (!workContainer) return 0;
      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement
        ? box[0].parentElement.getBoundingClientRect().width
        : window.innerWidth;
      const padding =
        parseInt(window.getComputedStyle(box[0]).padding, 10) / 2 || 0;
      return Math.max(
        0,
        rect.width * box.length - (rectLeft + parentWidth) + padding
      );
    };

    mm.add("(min-width: 1025px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${calculateTranslateX()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work-desktop",
        },
      });

      timeline.to(".work-flex", {
        x: () => -calculateTranslateX(),
        ease: "none",
      });
    });

    mm.add("(max-width: 1024px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${calculateTranslateX()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work-mobile",
        },
      });

      timeline.to(".work-flex", {
        x: () => -calculateTranslateX(),
        ease: "none",
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projectsData.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p className="work-category">{project.category}</p>
                  </div>
                </div>

                <p className="work-description">{project.description}</p>

                <div className="work-tech-badges">
                  {project.techBadges.map((badge, idx) => (
                    <span className="work-badge" key={idx}>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="work-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-github-link"
                    data-cursor="disable"
                  >
                    View Code on GitHub
                  </a>
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link || project.github}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
