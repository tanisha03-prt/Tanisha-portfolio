import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { applyFemaleDeveloperStyling } from "./femaleCharacter";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async (): Promise<GLTF | null> => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      return await new Promise<GLTF | null>((resolve, reject) => {
        loader.load(
          blobUrl,
          async (gltf) => {
            URL.revokeObjectURL(blobUrl);
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: THREE.Object3D) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            // Transform into stunning female developer wearing stylish glasses
            applyFemaleDeveloperStyling(character);

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();

            const footR =
              character.getObjectByName("foot.R") ||
              character.getObjectByName("footR");
            const footL =
              character.getObjectByName("foot.L") ||
              character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            URL.revokeObjectURL(blobUrl);
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { loadCharacter };
};

export default setCharacter;
