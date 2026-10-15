import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
        parseInt(window.getComputedStyle(box[0]).padding) / 2 || 0;
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
          {[...Array(6)].map((_value, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>Project Name</h4>
                    <p>Category</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>Javascript, TypeScript, React, Threejs</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
