import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingContext";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/progressUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const containerEl = canvasDiv.current;
    if (!containerEl) return;

    const rect = containerEl.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    containerEl.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.z = 10;
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let loadedCharacter: THREE.Object3D | null = null;
    let hoverCleanup: (() => void) | undefined;
    let animFrameId: number;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    const onResize = () => {
      if (loadedCharacter) {
        handleResize(renderer, camera, canvasDiv, loadedCharacter);
      }
    };
    window.addEventListener("resize", onResize);

    loadCharacter().then((gltf) => {
      if (gltf) {
        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          hoverCleanup = animations.hover(gltf, hoverDivRef.current);
        }
        mixer = animations.mixer;
        const charScene = gltf.scene;
        loadedCharacter = charScene;
        setChar(charScene);
        headBone =
          charScene.getObjectByName("spine.006") ||
          charScene.getObjectByName("spine006") ||
          null;
        screenLight =
          charScene.getObjectByName("screenlight") || null;

        progress.loaded().then(() => {
          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
      }
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    let debounce: ReturnType<typeof setTimeout> | undefined;
    let touchMoveHandler: ((e: TouchEvent) => void) | null = null;
    let touchTarget: HTMLElement | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      touchTarget = element;
      debounce = setTimeout(() => {
        touchMoveHandler = (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }));
        element?.addEventListener("touchmove", touchMoveHandler);
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }
      renderer.render(scene, camera);
    };
    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(debounce);
      if (hoverCleanup) {
        hoverCleanup();
      }
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);

      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (touchTarget && touchMoveHandler) {
        touchTarget.removeEventListener("touchmove", touchMoveHandler);
      }

      scene.clear();
      renderer.dispose();
      if (containerEl.contains(renderer.domElement)) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, [setLoading]);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
