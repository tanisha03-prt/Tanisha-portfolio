import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import {
  FaCode,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaWrench,
  FaBrain,
} from "react-icons/fa6";
import "./styles/TechStack.css";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const skillCategories = [
  {
    category: "Languages",
    icon: FaCode,
    skills: ["Java", "Python", "JavaScript", "SQL"],
  },
  {
    category: "Frontend",
    icon: FaLaptopCode,
    skills: ["HTML", "CSS", "React", "Bootstrap"],
  },
  {
    category: "Backend",
    icon: FaServer,
    skills: ["Node.js", "Express", "Flask"],
  },
  {
    category: "Database",
    icon: FaDatabase,
    skills: ["MySQL"],
  },
  {
    category: "Tools & Workflow",
    icon: FaWrench,
    skills: ["Git", "GitHub", "VS Code"],
  },
  {
    category: "Core Concepts",
    icon: FaBrain,
    skills: ["DSA", "DBMS", "Machine Learning", "System Design"],
  },
];

type TechStackProps = {
  isDesktopView?: boolean;
};

const TechStack = ({ isDesktopView = true }: TechStackProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workEl = document.getElementById("work");
      if (workEl) {
        const threshold = workEl.getBoundingClientRect().top;
        setIsActive(scrollY > threshold);
      }
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="techstack">
      <div className="tech-header">
        <h2 className="tech-title">
          My <span>Tech Stack</span>
        </h2>
        <p className="tech-subtitle">
          Core languages, frameworks, developer tools, and foundational concepts
        </p>
      </div>

      {isDesktopView && (
        <div className="tech-canvas-wrapper">
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
            className="tech-canvas"
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={
                    materials[Math.floor(Math.random() * materials.length)]
                  }
                  isActive={isActive}
                />
              ))}
            </Physics>
            <Environment
              files="/models/char_enviorment.hdr"
              environmentIntensity={0.5}
              environmentRotation={[0, 4, 2]}
            />
            <EffectComposer enableNormalPass={false}>
              <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
            </EffectComposer>
          </Canvas>
          <div className="tech-canvas-hint">
            Interactive 3D Physics &bull; Move cursor to repel
          </div>
        </div>
      )}

      <div className="tech-skills-container">
        {skillCategories.map((cat, idx) => (
          <div className="tech-skill-card" key={idx}>
            <div className="tech-card-header">
              <div className="tech-card-icon-wrap">
                <cat.icon className="tech-card-icon" />
              </div>
              <h3 className="tech-card-title">{cat.category}</h3>
            </div>
            <div className="tech-skill-pills">
              {cat.skills.map((skill, sIdx) => (
                <span className="tech-pill" key={sIdx}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
