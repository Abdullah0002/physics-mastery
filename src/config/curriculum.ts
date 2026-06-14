// =============================================================================
// Complete Physics Curriculum — Class 11 & 12
// Includes weightage, key topics, and formula counts
// =============================================================================

export interface ChapterMeta {
  slug: string;
  title: string;
  class: "XI" | "XII";
  order: number;
  weightage: {
    jeeMain: number;    // %
    jeeAdvanced: number;
    neet: number;
  };
  keyTopics: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD" | "ADVANCED";
  estimatedHours: number;
  formulaCount: number;
}

export const CLASS_11_CHAPTERS: ChapterMeta[] = [
  {
    slug: "units-and-dimensions",
    title: "Units & Dimensions",
    class: "XI",
    order: 1,
    weightage: { jeeMain: 3, jeeAdvanced: 2, neet: 2 },
    keyTopics: [
      "SI Units", "Dimensional Analysis", "Error Analysis",
      "Significant Figures", "Applications of Dimensions",
    ],
    difficulty: "EASY",
    estimatedHours: 6,
    formulaCount: 15,
  },
  {
    slug: "vectors",
    title: "Vectors",
    class: "XI",
    order: 2,
    weightage: { jeeMain: 3, jeeAdvanced: 3, neet: 2 },
    keyTopics: [
      "Vector Addition", "Dot Product", "Cross Product",
      "Unit Vectors", "Resolution of Vectors", "Lami's Theorem",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 8,
    formulaCount: 20,
  },
  {
    slug: "kinematics",
    title: "Kinematics",
    class: "XI",
    order: 3,
    weightage: { jeeMain: 7, jeeAdvanced: 6, neet: 5 },
    keyTopics: [
      "Motion in 1D", "Motion in 2D", "Projectile Motion",
      "Relative Motion", "Graphs of Motion", "Circular Motion Basics",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 14,
    formulaCount: 30,
  },
  {
    slug: "laws-of-motion",
    title: "Laws of Motion",
    class: "XI",
    order: 4,
    weightage: { jeeMain: 8, jeeAdvanced: 7, neet: 6 },
    keyTopics: [
      "Newton's Laws", "Free Body Diagrams", "Pseudo Force",
      "Constraint Motion", "Pulley Systems", "Banking of Roads",
    ],
    difficulty: "HARD",
    estimatedHours: 16,
    formulaCount: 25,
  },
  {
    slug: "friction",
    title: "Friction",
    class: "XI",
    order: 5,
    weightage: { jeeMain: 4, jeeAdvanced: 3, neet: 3 },
    keyTopics: [
      "Static & Kinetic Friction", "Angle of Friction", "Angle of Repose",
      "Friction on Inclined Plane", "Rolling Friction",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 8,
    formulaCount: 12,
  },
  {
    slug: "circular-motion",
    title: "Circular Motion",
    class: "XI",
    order: 6,
    weightage: { jeeMain: 4, jeeAdvanced: 4, neet: 3 },
    keyTopics: [
      "Centripetal Force", "Vertical Circular Motion", "Conical Pendulum",
      "Vehicle on Curved Road", "Centrifugal Force",
    ],
    difficulty: "HARD",
    estimatedHours: 10,
    formulaCount: 18,
  },
  {
    slug: "work-power-energy",
    title: "Work, Power & Energy",
    class: "XI",
    order: 7,
    weightage: { jeeMain: 8, jeeAdvanced: 7, neet: 6 },
    keyTopics: [
      "Work-Energy Theorem", "Conservation of Energy", "Power",
      "Spring Force", "Elastic & Inelastic Collisions", "Potential Energy Curves",
    ],
    difficulty: "HARD",
    estimatedHours: 14,
    formulaCount: 28,
  },
  {
    slug: "center-of-mass",
    title: "Center of Mass",
    class: "XI",
    order: 8,
    weightage: { jeeMain: 5, jeeAdvanced: 5, neet: 3 },
    keyTopics: [
      "COM of Rigid Bodies", "Conservation of Momentum", "Rocket Propulsion",
      "Impulse", "Collision in 2D", "Coefficient of Restitution",
    ],
    difficulty: "HARD",
    estimatedHours: 12,
    formulaCount: 22,
  },
  {
    slug: "rotational-mechanics",
    title: "Rotational Mechanics",
    class: "XI",
    order: 9,
    weightage: { jeeMain: 8, jeeAdvanced: 10, neet: 5 },
    keyTopics: [
      "Moment of Inertia", "Torque", "Angular Momentum",
      "Rolling Motion", "Parallel Axis Theorem", "Perpendicular Axis Theorem",
    ],
    difficulty: "ADVANCED",
    estimatedHours: 20,
    formulaCount: 40,
  },
  {
    slug: "gravitation",
    title: "Gravitation",
    class: "XI",
    order: 10,
    weightage: { jeeMain: 5, jeeAdvanced: 5, neet: 4 },
    keyTopics: [
      "Newton's Law of Gravitation", "Kepler's Laws", "Orbital Velocity",
      "Escape Velocity", "Gravitational Field & Potential", "Satellites",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 10,
    formulaCount: 25,
  },
  {
    slug: "properties-of-matter",
    title: "Properties of Matter",
    class: "XI",
    order: 11,
    weightage: { jeeMain: 4, jeeAdvanced: 3, neet: 5 },
    keyTopics: [
      "Elasticity", "Stress & Strain", "Young's Modulus",
      "Surface Tension", "Viscosity", "Fluid Statics",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 10,
    formulaCount: 30,
  },
  {
    slug: "thermal-physics",
    title: "Thermal Physics",
    class: "XI",
    order: 12,
    weightage: { jeeMain: 5, jeeAdvanced: 4, neet: 6 },
    keyTopics: [
      "Temperature Scales", "Thermal Expansion", "Calorimetry",
      "Heat Transfer", "Newton's Law of Cooling", "Blackbody Radiation",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 10,
    formulaCount: 28,
  },
  {
    slug: "kinetic-theory-of-gases",
    title: "Kinetic Theory of Gases (KTG)",
    class: "XI",
    order: 13,
    weightage: { jeeMain: 4, jeeAdvanced: 3, neet: 5 },
    keyTopics: [
      "Ideal Gas Equation", "RMS Speed", "Mean Free Path",
      "Degrees of Freedom", "Equipartition Theorem", "Molecular Speeds",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 8,
    formulaCount: 22,
  },
  {
    slug: "thermodynamics",
    title: "Thermodynamics",
    class: "XI",
    order: 14,
    weightage: { jeeMain: 6, jeeAdvanced: 6, neet: 6 },
    keyTopics: [
      "First Law of Thermodynamics", "Isothermal & Adiabatic Processes",
      "Second Law", "Carnot Cycle", "Entropy", "PV Diagrams",
    ],
    difficulty: "HARD",
    estimatedHours: 12,
    formulaCount: 30,
  },
  {
    slug: "simple-harmonic-motion",
    title: "Simple Harmonic Motion (SHM)",
    class: "XI",
    order: 15,
    weightage: { jeeMain: 5, jeeAdvanced: 5, neet: 4 },
    keyTopics: [
      "SHM Equations", "Simple Pendulum", "Spring-Mass System",
      "Energy in SHM", "Superposition of SHMs", "Damped Oscillations",
    ],
    difficulty: "HARD",
    estimatedHours: 12,
    formulaCount: 32,
  },
  {
    slug: "waves",
    title: "Waves",
    class: "XI",
    order: 16,
    weightage: { jeeMain: 4, jeeAdvanced: 5, neet: 4 },
    keyTopics: [
      "Wave Equation", "Stationary Waves", "Beats",
      "Superposition Principle", "Wave Speed", "Resonance",
    ],
    difficulty: "HARD",
    estimatedHours: 10,
    formulaCount: 25,
  },
  {
    slug: "sound-waves",
    title: "Sound Waves",
    class: "XI",
    order: 17,
    weightage: { jeeMain: 4, jeeAdvanced: 4, neet: 5 },
    keyTopics: [
      "Doppler Effect", "Organ Pipes", "Intensity & Loudness",
      "Echo & Reverberation", "Ultrasound", "Vibrations in Strings",
    ],
    difficulty: "HARD",
    estimatedHours: 10,
    formulaCount: 22,
  },
];

export const CLASS_12_CHAPTERS: ChapterMeta[] = [
  {
    slug: "electrostatics",
    title: "Electrostatics",
    class: "XII",
    order: 1,
    weightage: { jeeMain: 9, jeeAdvanced: 10, neet: 8 },
    keyTopics: [
      "Coulomb's Law", "Electric Field", "Gauss's Law",
      "Electric Potential", "Dipoles", "Conductors & Insulators",
    ],
    difficulty: "HARD",
    estimatedHours: 18,
    formulaCount: 45,
  },
  {
    slug: "capacitance",
    title: "Capacitance",
    class: "XII",
    order: 2,
    weightage: { jeeMain: 6, jeeAdvanced: 6, neet: 5 },
    keyTopics: [
      "Capacitors", "Parallel Plate Capacitor", "Dielectrics",
      "Series & Parallel Combinations", "Energy in Capacitor", "Van de Graaff",
    ],
    difficulty: "HARD",
    estimatedHours: 12,
    formulaCount: 30,
  },
  {
    slug: "current-electricity",
    title: "Current Electricity",
    class: "XII",
    order: 3,
    weightage: { jeeMain: 8, jeeAdvanced: 7, neet: 8 },
    keyTopics: [
      "Ohm's Law", "Kirchhoff's Laws", "Wheatstone Bridge",
      "Potentiometer", "Meter Bridge", "EMF & Internal Resistance",
    ],
    difficulty: "HARD",
    estimatedHours: 16,
    formulaCount: 35,
  },
  {
    slug: "magnetism",
    title: "Magnetism & Moving Charges",
    class: "XII",
    order: 4,
    weightage: { jeeMain: 8, jeeAdvanced: 8, neet: 7 },
    keyTopics: [
      "Biot-Savart Law", "Ampere's Law", "Magnetic Force",
      "Hall Effect", "Cyclotron", "Bar Magnets & Earth's Magnetism",
    ],
    difficulty: "HARD",
    estimatedHours: 16,
    formulaCount: 40,
  },
  {
    slug: "electromagnetic-induction",
    title: "Electromagnetic Induction (EMI)",
    class: "XII",
    order: 5,
    weightage: { jeeMain: 7, jeeAdvanced: 8, neet: 6 },
    keyTopics: [
      "Faraday's Law", "Lenz's Law", "Motional EMF",
      "Self & Mutual Inductance", "Eddy Currents", "Transformer Basics",
    ],
    difficulty: "ADVANCED",
    estimatedHours: 16,
    formulaCount: 35,
  },
  {
    slug: "alternating-current",
    title: "Alternating Current (AC)",
    class: "XII",
    order: 6,
    weightage: { jeeMain: 5, jeeAdvanced: 5, neet: 4 },
    keyTopics: [
      "AC Circuits", "LCR Series Circuit", "Resonance",
      "Power in AC", "Transformers", "Impedance & Phase",
    ],
    difficulty: "HARD",
    estimatedHours: 12,
    formulaCount: 28,
  },
  {
    slug: "electromagnetic-waves",
    title: "Electromagnetic Waves",
    class: "XII",
    order: 7,
    weightage: { jeeMain: 3, jeeAdvanced: 2, neet: 3 },
    keyTopics: [
      "Maxwell's Equations (qualitative)", "EM Spectrum",
      "Properties of EM Waves", "Intensity & Energy Density",
    ],
    difficulty: "EASY",
    estimatedHours: 4,
    formulaCount: 12,
  },
  {
    slug: "ray-optics",
    title: "Ray Optics",
    class: "XII",
    order: 8,
    weightage: { jeeMain: 8, jeeAdvanced: 8, neet: 10 },
    keyTopics: [
      "Reflection", "Refraction", "Total Internal Reflection",
      "Lenses", "Mirrors", "Optical Instruments", "Prism",
    ],
    difficulty: "HARD",
    estimatedHours: 16,
    formulaCount: 40,
  },
  {
    slug: "wave-optics",
    title: "Wave Optics",
    class: "XII",
    order: 9,
    weightage: { jeeMain: 5, jeeAdvanced: 6, neet: 5 },
    keyTopics: [
      "Huygens' Principle", "Young's Double Slit", "Interference",
      "Diffraction", "Polarization", "Coherence",
    ],
    difficulty: "HARD",
    estimatedHours: 12,
    formulaCount: 30,
  },
  {
    slug: "modern-physics",
    title: "Modern Physics",
    class: "XII",
    order: 10,
    weightage: { jeeMain: 8, jeeAdvanced: 9, neet: 8 },
    keyTopics: [
      "Photoelectric Effect", "Bohr's Model", "X-Rays",
      "de Broglie Hypothesis", "Nuclear Physics", "Radioactivity",
    ],
    difficulty: "ADVANCED",
    estimatedHours: 20,
    formulaCount: 50,
  },
  {
    slug: "dual-nature",
    title: "Dual Nature of Matter & Radiation",
    class: "XII",
    order: 11,
    weightage: { jeeMain: 4, jeeAdvanced: 4, neet: 4 },
    keyTopics: [
      "Photon Model", "de Broglie Wavelength", "Davisson-Germer",
      "Electron Microscope", "Uncertainty Principle",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 8,
    formulaCount: 20,
  },
  {
    slug: "atoms",
    title: "Atoms",
    class: "XII",
    order: 12,
    weightage: { jeeMain: 4, jeeAdvanced: 4, neet: 5 },
    keyTopics: [
      "Rutherford Model", "Bohr's Model", "Spectral Lines",
      "Hydrogen Spectrum", "Energy Levels", "Ionization Energy",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 8,
    formulaCount: 22,
  },
  {
    slug: "nuclei",
    title: "Nuclei",
    class: "XII",
    order: 13,
    weightage: { jeeMain: 4, jeeAdvanced: 4, neet: 5 },
    keyTopics: [
      "Nuclear Binding Energy", "Mass Defect", "Fission & Fusion",
      "Radioactivity", "Half-Life", "Nuclear Reactions",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 8,
    formulaCount: 20,
  },
  {
    slug: "semiconductors",
    title: "Semiconductors",
    class: "XII",
    order: 14,
    weightage: { jeeMain: 4, jeeAdvanced: 2, neet: 6 },
    keyTopics: [
      "p-n Junction", "Diode", "Transistor", "Logic Gates",
      "Zener Diode", "LED & Photodiode",
    ],
    difficulty: "MEDIUM",
    estimatedHours: 10,
    formulaCount: 15,
  },
  {
    slug: "communication-systems",
    title: "Communication Systems",
    class: "XII",
    order: 15,
    weightage: { jeeMain: 2, jeeAdvanced: 1, neet: 2 },
    keyTopics: [
      "Modulation", "AM & FM", "Bandwidth",
      "Sky Wave & Space Wave", "Antennas",
    ],
    difficulty: "EASY",
    estimatedHours: 4,
    formulaCount: 10,
  },
];

export const ALL_CHAPTERS = [...CLASS_11_CHAPTERS, ...CLASS_12_CHAPTERS];

export const CHAPTER_MAP = Object.fromEntries(
  ALL_CHAPTERS.map((ch) => [ch.slug, ch])
);

export const HIGH_WEIGHTAGE_CHAPTERS = ALL_CHAPTERS
  .filter((ch) => ch.weightage.jeeMain >= 6 || ch.weightage.jeeAdvanced >= 6)
  .sort((a, b) => b.weightage.jeeAdvanced - a.weightage.jeeAdvanced);
