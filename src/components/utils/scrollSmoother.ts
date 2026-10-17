import { ScrollSmoother } from "gsap-trial/ScrollSmoother";

let smootherInstance: ScrollSmoother | null = null;

export const setSmootherInstance = (instance: ScrollSmoother | null) => {
  smootherInstance = instance;
};

export const getSmootherInstance = (): ScrollSmoother | null => {
  return smootherInstance;
};
