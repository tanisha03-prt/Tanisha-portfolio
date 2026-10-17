import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  // Dedicated Electric Purple Rim Light from back-left
  const purpleRimLight = new THREE.DirectionalLight(0xbf55ec, 0);
  purpleRimLight.position.set(-10, 15, -10);
  scene.add(purpleRimLight);

  // Dedicated Vibrant Cyan Rim Light from back-right
  const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 0);
  cyanRimLight.position.set(10, 15, -10);
  scene.add(cyanRimLight);

  // Soft Front Fill Light for face and spectacles clarity
  const frontFillLight = new THREE.DirectionalLight(0xffeedd, 0);
  frontFillLight.position.set(0, 14, 16);
  scene.add(frontFillLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: THREE.Object3D | null) {
    if (!screenLight) {
      pointLight.intensity = 0;
      return;
    }
    const mesh = screenLight as THREE.Mesh;
    if (
      mesh.material &&
      "opacity" in mesh.material &&
      "emissiveIntensity" in mesh.material
    ) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat.opacity > 0.9) {
        pointLight.intensity = (mat.emissiveIntensity ?? 1) * 20;
      } else {
        pointLight.intensity = 0;
      }
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.64,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1,
      duration: duration,
      ease: ease,
    });
    gsap.to(purpleRimLight, {
      intensity: 2.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(cyanRimLight, {
      intensity: 2.4,
      duration: duration,
      ease: ease,
    });
    gsap.to(frontFillLight, {
      intensity: 0.75,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
