import * as THREE from "three";

/**
 * Transforms the 3D character into a modern, confident, friendly female developer
 * wearing stylish glasses, with a beautiful hairstyle, refined outfit, and glowing skin.
 */
export function applyFemaleDeveloperStyling(character: THREE.Object3D): void {
  // 1. Find key bones and nodes
  const headBone =
    character.getObjectByName("spine.006") ||
    character.getObjectByName("spine006") ||
    null;

  // 2. Hide or replace existing male hair
  const existingHair = character.getObjectByName("hair");
  if (existingHair) {
    existingHair.visible = false;
  }

  // 3. Refine Skin Material
  const skinMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf6d5c6),
    roughness: 0.58,
    metalness: 0.02,
    clearcoat: 0.25,
    clearcoatRoughness: 0.35,
    reflectivity: 0.45,
  });

  // 4. Modern Dark/Neutral Developer Outfit Materials
  const shirtMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x181724), // Sleek charcoal/navy developer sweater
    roughness: 0.82,
    metalness: 0.08,
    clearcoat: 0.08,
  });

  const pantMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x13121b), // Tailored dark trousers
    roughness: 0.88,
    metalness: 0.04,
  });

  const shoeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x221f2d), // Modern minimalist developer sneakers
    roughness: 0.7,
    metalness: 0.15,
  });

  // Apply materials to existing mesh parts
  character.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const name = mesh.name.toLowerCase();

      if (
        name.includes("body") ||
        name.includes("shirt") ||
        mesh.name === "Cube.002"
      ) {
        mesh.material = shirtMaterial;
      } else if (name.includes("pant") || mesh.name === "Cube.004") {
        mesh.material = pantMaterial;
      } else if (
        name.includes("shoe") ||
        name.includes("sole") ||
        mesh.name === "Cylinder.005" ||
        mesh.name === "Cylinder.008"
      ) {
        mesh.material = shoeMaterial;
      } else if (
        name.includes("neck") ||
        name.includes("ear") ||
        name.includes("hand") ||
        mesh.name === "Plane.005" ||
        mesh.name === "Plane.003" ||
        mesh.name === "Mesh.002"
      ) {
        mesh.material = skinMaterial;
      }
    }
  });

  // If head bone is available, attach female hair, stylish glasses, and eyelashes
  if (headBone) {
    // A. STYLISH GLASSES
    const glassesGroup = createDeveloperGlasses();
    headBone.add(glassesGroup);

    // B. FEMALE HAIRSTYLE
    const hairGroup = createFemaleHairstyle();
    headBone.add(hairGroup);

    // C. FEMININE EYELASHES & EYEBROW REFINEMENT
    const eyelashGroup = createFeminineLashes();
    headBone.add(eyelashGroup);
  }
}

/**
 * Creates modern, designer spectacles/glasses:
 * - Rounded-square / soft-hexagonal dark titanium rims
 * - Bridge sitting accurately on the nose
 * - Nose pads
 * - Temple arms extending over the ears
 * - Clear reflective glass lenses catching purple & cyan rim reflections
 */
function createDeveloperGlasses(): THREE.Group {
  const glasses = new THREE.Group();
  glasses.name = "female_developer_glasses";

  // Frame Material: Sleek dark obsidian metallic
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x1a1824),
    roughness: 0.22,
    metalness: 0.88,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
  });

  // Lens Material: High-transmission glass with subtle cyan/purple reflection
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xe8f4ff),
    transmission: 0.94,
    opacity: 0.35,
    transparent: true,
    roughness: 0.04,
    metalness: 0.1,
    ior: 1.52,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 0.7,
  });

  const eyeDistance = 0.435; // Matches eyebrow_L/R local spacing
  const glassesY = 1.35;
  const glassesZ = 1.035;
  const tubeRadius = 0.022;

  // 1. Left & Right Rims
  [-1, 1].forEach((side) => {
    const rimCurve = new THREE.CurvePath<THREE.Vector3>();
    const w = 0.26;
    const h = 0.21;
    const r = 0.07; // Corner radius for modern rounded rectangle

    const p0 = new THREE.Vector3(-w + r, -h, 0);
    const p1 = new THREE.Vector3(w - r, -h, 0);
    const p2 = new THREE.Vector3(w, -h + r, 0);
    const p3 = new THREE.Vector3(w, h - r, 0);
    const p4 = new THREE.Vector3(w - r, h, 0);
    const p5 = new THREE.Vector3(-w + r, h, 0);
    const p6 = new THREE.Vector3(-w, h - r, 0);
    const p7 = new THREE.Vector3(-w, -h + r, 0);

    rimCurve.add(new THREE.LineCurve3(p0, p1));
    rimCurve.add(new THREE.QuadraticBezierCurve3(p1, new THREE.Vector3(w, -h, 0), p2));
    rimCurve.add(new THREE.LineCurve3(p2, p3));
    rimCurve.add(new THREE.QuadraticBezierCurve3(p3, new THREE.Vector3(w, h, 0), p4));
    rimCurve.add(new THREE.LineCurve3(p4, p5));
    rimCurve.add(new THREE.QuadraticBezierCurve3(p5, new THREE.Vector3(-w, h, 0), p6));
    rimCurve.add(new THREE.LineCurve3(p6, p7));
    rimCurve.add(new THREE.QuadraticBezierCurve3(p7, new THREE.Vector3(-w, -h, 0), p0));

    const rimGeo = new THREE.TubeGeometry(rimCurve, 40, tubeRadius, 10, true);
    const rimMesh = new THREE.Mesh(rimGeo, frameMaterial);
    rimMesh.position.set(side * eyeDistance, glassesY, glassesZ);
    glasses.add(rimMesh);

    // Lens
    const lensShape = new THREE.Shape();
    lensShape.moveTo(-w + r, -h);
    lensShape.lineTo(w - r, -h);
    lensShape.quadraticCurveTo(w, -h, w, -h + r);
    lensShape.lineTo(w, h - r);
    lensShape.quadraticCurveTo(w, h, w - r, h);
    lensShape.lineTo(-w + r, h);
    lensShape.quadraticCurveTo(-w, h, -w, h - r);
    lensShape.lineTo(-w, -h + r);
    lensShape.quadraticCurveTo(-w, -h, -w + r, -h);

    const lensGeo = new THREE.ShapeGeometry(lensShape);
    const lensMesh = new THREE.Mesh(lensGeo, lensMaterial);
    lensMesh.position.set(side * eyeDistance, glassesY, glassesZ - 0.005);
    glasses.add(lensMesh);
  });

  // 2. Nose Bridge
  const bridgeCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-eyeDistance + 0.24, glassesY + 0.05, glassesZ - 0.01),
    new THREE.Vector3(0, glassesY + 0.1, glassesZ + 0.02),
    new THREE.Vector3(eyeDistance - 0.24, glassesY + 0.05, glassesZ - 0.01)
  );
  const bridgeGeo = new THREE.TubeGeometry(bridgeCurve, 16, tubeRadius * 0.85, 8, false);
  const bridgeMesh = new THREE.Mesh(bridgeGeo, frameMaterial);
  glasses.add(bridgeMesh);

  // 3. Temple Arms extending past the ears
  [-1, 1].forEach((side) => {
    const startX = side * (eyeDistance + 0.25);
    const startY = glassesY + 0.02;
    const startZ = glassesZ - 0.03;

    const templeCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(startX, startY, startZ),
      new THREE.Vector3(side * 0.9, startY - 0.02, 0.6),
      new THREE.Vector3(side * 1.05, startY - 0.06, 0.2),
      new THREE.Vector3(side * 1.03, startY - 0.14, -0.12) // Ear hook
    );

    const templeGeo = new THREE.TubeGeometry(templeCurve, 24, tubeRadius * 0.75, 8, false);
    const templeMesh = new THREE.Mesh(templeGeo, frameMaterial);
    glasses.add(templeMesh);

    // Nose pads
    const padGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.06, 8);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(side * 0.15, glassesY - 0.02, glassesZ - 0.02);
    pad.rotation.z = side * 0.4;
    glasses.add(pad);
  });

  return glasses;
}

/**
 * Creates a chic, voluminous female developer hairstyle:
 * - Contoured main crown with natural volume
 * - Soft layered side bangs framing the forehead & temples
 * - Graceful strands cascading past cheeks, neck, and onto the shoulders
 * - Multi-tonal espresso/dark brunette color with lustrous purple/cyan sheen
 */
function createFemaleHairstyle(): THREE.Group {
  const hair = new THREE.Group();
  hair.name = "female_developer_hair";

  // Hair material: Rich dark espresso brunette with silky sheen
  const hairMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x1c151a),
    roughness: 0.38,
    metalness: 0.15,
    clearcoat: 0.65,
    clearcoatRoughness: 0.22,
    reflectivity: 0.55,
  });

  // 1. Crown / Top Volume (Head cap with gentle feminine shape)
  const crownGeo = new THREE.SphereGeometry(1.08, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.62);
  crownGeo.scale(1.02, 1.06, 1.08);
  const crownMesh = new THREE.Mesh(crownGeo, hairMaterial);
  crownMesh.position.set(0, 1.48, -0.04);
  crownMesh.rotation.x = -0.08;
  hair.add(crownMesh);

  // 2. Back & Cascading Lower Locks (flowing behind neck and shoulders)
  const backGeo = new THREE.CylinderGeometry(1.02, 1.18, 1.15, 32, 8, true);
  backGeo.scale(1.02, 1.0, 0.95);
  const backMesh = new THREE.Mesh(backGeo, hairMaterial);
  backMesh.position.set(0, 0.85, -0.15);
  backMesh.rotation.x = -0.12;
  hair.add(backMesh);

  // 3. Swept Front Bangs (Side-parted elegant curve across the upper forehead)
  const bangCurve1 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.4, 2.15, 0.68),
    new THREE.Vector3(0.1, 2.05, 0.98),
    new THREE.Vector3(0.65, 1.82, 0.95),
    new THREE.Vector3(0.98, 1.38, 0.72)
  );
  const bangGeo1 = new THREE.TubeGeometry(bangCurve1, 24, 0.14, 12, false);
  const bang1 = new THREE.Mesh(bangGeo1, hairMaterial);
  hair.add(bang1);

  const bangCurve2 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-0.35, 2.18, 0.65),
    new THREE.Vector3(-0.62, 1.95, 0.88),
    new THREE.Vector3(-0.85, 1.65, 0.85),
    new THREE.Vector3(-0.95, 1.35, 0.68)
  );
  const bangGeo2 = new THREE.TubeGeometry(bangCurve2, 24, 0.12, 12, false);
  const bang2 = new THREE.Mesh(bangGeo2, hairMaterial);
  hair.add(bang2);

  // 4. Side Strands Framing Cheeks & Temples (Left & Right)
  [-1, 1].forEach((side) => {
    // Front cheek-framing lock
    const lockCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(side * 0.88, 1.82, 0.45),
      new THREE.Vector3(side * 0.98, 1.45, 0.68),
      new THREE.Vector3(side * 0.92, 1.05, 0.58),
      new THREE.Vector3(side * 0.82, 0.65, 0.42)
    );
    const lockGeo = new THREE.TubeGeometry(lockCurve, 20, 0.11, 10, false);
    const lock = new THREE.Mesh(lockGeo, hairMaterial);
    hair.add(lock);

    // Shoulder-cascading lock
    const shoulderCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(side * 0.95, 1.65, 0.2),
      new THREE.Vector3(side * 1.12, 1.15, 0.15),
      new THREE.Vector3(side * 1.08, 0.72, 0.22),
      new THREE.Vector3(side * 0.88, 0.35, 0.35)
    );
    const shoulderGeo = new THREE.TubeGeometry(shoulderCurve, 24, 0.13, 10, false);
    const shoulderLock = new THREE.Mesh(shoulderGeo, hairMaterial);
    hair.add(shoulderLock);
  });

  return hair;
}

/**
 * Creates subtle, refined feminine eyelashes & contoured upper lids
 * to give the face friendly, expressive eyes.
 */
function createFeminineLashes(): THREE.Group {
  const lashes = new THREE.Group();
  lashes.name = "female_eyelashes";

  const lashMat = new THREE.MeshStandardMaterial({
    color: 0x0f0b12,
    roughness: 0.3,
    metalness: 0.1,
  });

  const eyeDistance = 0.435;
  const eyeY = 1.39;
  const eyeZ = 1.01;

  [-1, 1].forEach((side) => {
    // Upper eyelid contour curve with delicate wing
    const lashCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(side * (eyeDistance - 0.18), eyeY - 0.02, eyeZ),
      new THREE.Vector3(side * eyeDistance, eyeY + 0.05, eyeZ + 0.01),
      new THREE.Vector3(side * (eyeDistance + 0.21), eyeY + 0.02, eyeZ - 0.01)
    );
    const lashGeo = new THREE.TubeGeometry(lashCurve, 16, 0.018, 6, false);
    const lashMesh = new THREE.Mesh(lashGeo, lashMat);
    lashes.add(lashMesh);
  });

  return lashes;
}
