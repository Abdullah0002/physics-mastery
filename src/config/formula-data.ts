export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface Formula {
  id: string;
  title: string;
  latex: string;
  description: string;
  variables: FormulaVariable[];
  chapterSlug: string;
  chapterTitle: string;
  tags: string[];
}

export const FORMULAS: Formula[] = [
  // ── Kinematics ────────────────────────────────────────────────
  {
    id: "kin-1",
    title: "First Equation of Motion",
    latex: "v = u + at",
    description: "Velocity after time t under uniform acceleration.",
    variables: [
      { symbol: "v", meaning: "Final velocity (m/s)" },
      { symbol: "u", meaning: "Initial velocity (m/s)" },
      { symbol: "a", meaning: "Acceleration (m/s²)" },
      { symbol: "t", meaning: "Time (s)" },
    ],
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    tags: ["motion", "velocity", "acceleration"],
  },
  {
    id: "kin-2",
    title: "Second Equation of Motion",
    latex: "s = ut + \\frac{1}{2}at^2",
    description: "Displacement under uniform acceleration.",
    variables: [
      { symbol: "s", meaning: "Displacement (m)" },
      { symbol: "u", meaning: "Initial velocity (m/s)" },
      { symbol: "a", meaning: "Acceleration (m/s²)" },
      { symbol: "t", meaning: "Time (s)" },
    ],
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    tags: ["motion", "displacement", "acceleration"],
  },
  {
    id: "kin-3",
    title: "Third Equation of Motion",
    latex: "v^2 = u^2 + 2as",
    description: "Velocity-displacement relation under uniform acceleration.",
    variables: [
      { symbol: "v", meaning: "Final velocity (m/s)" },
      { symbol: "u", meaning: "Initial velocity (m/s)" },
      { symbol: "a", meaning: "Acceleration (m/s²)" },
      { symbol: "s", meaning: "Displacement (m)" },
    ],
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    tags: ["motion", "velocity", "displacement"],
  },
  {
    id: "kin-4",
    title: "Range of Projectile",
    latex: "R = \\frac{u^2 \\sin 2\\theta}{g}",
    description: "Horizontal range of a projectile launched at angle θ.",
    variables: [
      { symbol: "R", meaning: "Range (m)" },
      { symbol: "u", meaning: "Initial speed (m/s)" },
      { symbol: "\\theta", meaning: "Launch angle" },
      { symbol: "g", meaning: "Gravitational acceleration (9.8 m/s²)" },
    ],
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    tags: ["projectile", "range", "angle"],
  },

  // ── Laws of Motion ────────────────────────────────────────────
  {
    id: "dyn-1",
    title: "Newton's Second Law",
    latex: "\\vec{F} = m\\vec{a}",
    description: "Net force equals mass times acceleration.",
    variables: [
      { symbol: "\\vec{F}", meaning: "Net force (N)" },
      { symbol: "m", meaning: "Mass (kg)" },
      { symbol: "\\vec{a}", meaning: "Acceleration (m/s²)" },
    ],
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    tags: ["force", "mass", "newton"],
  },
  {
    id: "dyn-2",
    title: "Friction Force",
    latex: "f = \\mu N",
    description: "Friction force proportional to normal reaction.",
    variables: [
      { symbol: "f", meaning: "Friction force (N)" },
      { symbol: "\\mu", meaning: "Coefficient of friction (dimensionless)" },
      { symbol: "N", meaning: "Normal force (N)" },
    ],
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    tags: ["friction", "normal force"],
  },
  {
    id: "dyn-3",
    title: "Impulse-Momentum Theorem",
    latex: "J = \\Delta p = F \\cdot \\Delta t",
    description: "Impulse equals change in momentum.",
    variables: [
      { symbol: "J", meaning: "Impulse (N·s)" },
      { symbol: "\\Delta p", meaning: "Change in momentum (kg·m/s)" },
      { symbol: "F", meaning: "Average force (N)" },
      { symbol: "\\Delta t", meaning: "Time interval (s)" },
    ],
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    tags: ["impulse", "momentum"],
  },

  // ── Work, Energy & Power ─────────────────────────────────────
  {
    id: "wep-1",
    title: "Work Done by a Force",
    latex: "W = Fd\\cos\\theta",
    description: "Work done when force is at angle θ to displacement.",
    variables: [
      { symbol: "W", meaning: "Work (J)" },
      { symbol: "F", meaning: "Force magnitude (N)" },
      { symbol: "d", meaning: "Displacement (m)" },
      { symbol: "\\theta", meaning: "Angle between F and d" },
    ],
    chapterSlug: "work-energy-power",
    chapterTitle: "Work, Energy & Power",
    tags: ["work", "energy", "force"],
  },
  {
    id: "wep-2",
    title: "Kinetic Energy",
    latex: "KE = \\frac{1}{2}mv^2",
    description: "Energy possessed by a body due to its motion.",
    variables: [
      { symbol: "KE", meaning: "Kinetic energy (J)" },
      { symbol: "m", meaning: "Mass (kg)" },
      { symbol: "v", meaning: "Speed (m/s)" },
    ],
    chapterSlug: "work-energy-power",
    chapterTitle: "Work, Energy & Power",
    tags: ["kinetic energy", "velocity"],
  },
  {
    id: "wep-3",
    title: "Work-Energy Theorem",
    latex: "W_{net} = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2",
    description: "Net work done equals change in kinetic energy.",
    variables: [
      { symbol: "W_{net}", meaning: "Net work done (J)" },
      { symbol: "v", meaning: "Final speed (m/s)" },
      { symbol: "u", meaning: "Initial speed (m/s)" },
    ],
    chapterSlug: "work-energy-power",
    chapterTitle: "Work, Energy & Power",
    tags: ["work-energy", "theorem"],
  },
  {
    id: "wep-4",
    title: "Power",
    latex: "P = \\frac{W}{t} = Fv",
    description: "Rate of doing work; also force times velocity.",
    variables: [
      { symbol: "P", meaning: "Power (W)" },
      { symbol: "W", meaning: "Work (J)" },
      { symbol: "t", meaning: "Time (s)" },
      { symbol: "v", meaning: "Velocity (m/s)" },
    ],
    chapterSlug: "work-energy-power",
    chapterTitle: "Work, Energy & Power",
    tags: ["power", "velocity"],
  },

  // ── Circular Motion ──────────────────────────────────────────
  {
    id: "cm-1",
    title: "Centripetal Acceleration",
    latex: "a_c = \\frac{v^2}{r} = \\omega^2 r",
    description: "Acceleration directed toward the center of circular path.",
    variables: [
      { symbol: "a_c", meaning: "Centripetal acceleration (m/s²)" },
      { symbol: "v", meaning: "Tangential speed (m/s)" },
      { symbol: "r", meaning: "Radius (m)" },
      { symbol: "\\omega", meaning: "Angular velocity (rad/s)" },
    ],
    chapterSlug: "circular-motion",
    chapterTitle: "Circular Motion",
    tags: ["centripetal", "circular"],
  },
  {
    id: "cm-2",
    title: "Centripetal Force",
    latex: "F_c = \\frac{mv^2}{r} = m\\omega^2 r",
    description: "Net inward force maintaining circular motion.",
    variables: [
      { symbol: "F_c", meaning: "Centripetal force (N)" },
      { symbol: "m", meaning: "Mass (kg)" },
      { symbol: "v", meaning: "Speed (m/s)" },
      { symbol: "r", meaning: "Radius (m)" },
    ],
    chapterSlug: "circular-motion",
    chapterTitle: "Circular Motion",
    tags: ["centripetal", "force"],
  },
  {
    id: "cm-3",
    title: "Relation: v, ω, r",
    latex: "v = r\\omega",
    description: "Tangential speed equals radius times angular velocity.",
    variables: [
      { symbol: "v", meaning: "Tangential speed (m/s)" },
      { symbol: "r", meaning: "Radius (m)" },
      { symbol: "\\omega", meaning: "Angular velocity (rad/s)" },
    ],
    chapterSlug: "circular-motion",
    chapterTitle: "Circular Motion",
    tags: ["angular velocity", "speed"],
  },

  // ── Gravitation ──────────────────────────────────────────────
  {
    id: "grav-1",
    title: "Newton's Law of Gravitation",
    latex: "F = \\frac{Gm_1 m_2}{r^2}",
    description: "Gravitational force between two point masses.",
    variables: [
      { symbol: "F", meaning: "Gravitational force (N)" },
      { symbol: "G", meaning: "6.674 × 10⁻¹¹ N·m²/kg²" },
      { symbol: "m_1, m_2", meaning: "Masses (kg)" },
      { symbol: "r", meaning: "Separation (m)" },
    ],
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    tags: ["gravity", "newton"],
  },
  {
    id: "grav-2",
    title: "Orbital Speed",
    latex: "v_o = \\sqrt{\\frac{GM}{r}}",
    description: "Speed required for circular orbit at radius r.",
    variables: [
      { symbol: "v_o", meaning: "Orbital speed (m/s)" },
      { symbol: "G", meaning: "Gravitational constant" },
      { symbol: "M", meaning: "Mass of central body (kg)" },
      { symbol: "r", meaning: "Orbital radius (m)" },
    ],
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    tags: ["orbital", "satellite"],
  },
  {
    id: "grav-3",
    title: "Escape Velocity",
    latex: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}",
    description: "Minimum speed to escape a planet's gravitational field.",
    variables: [
      { symbol: "v_e", meaning: "Escape velocity (m/s)" },
      { symbol: "R", meaning: "Radius of planet (m)" },
      { symbol: "g", meaning: "Surface gravity (m/s²)" },
    ],
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    tags: ["escape", "planet"],
  },
  {
    id: "grav-4",
    title: "Kepler's Third Law",
    latex: "T^2 \\propto r^3 \\quad \\Rightarrow \\quad \\frac{T^2}{r^3} = \\frac{4\\pi^2}{GM}",
    description: "Square of orbital period proportional to cube of orbital radius.",
    variables: [
      { symbol: "T", meaning: "Orbital period (s)" },
      { symbol: "r", meaning: "Semi-major axis (m)" },
    ],
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    tags: ["kepler", "orbital period"],
  },

  // ── Electrostatics ───────────────────────────────────────────
  {
    id: "es-1",
    title: "Coulomb's Law",
    latex: "F = k\\frac{q_1 q_2}{r^2}, \\quad k = \\frac{1}{4\\pi\\varepsilon_0}",
    description: "Electrostatic force between two point charges.",
    variables: [
      { symbol: "F", meaning: "Electrostatic force (N)" },
      { symbol: "k", meaning: "9 × 10⁹ N·m²/C²" },
      { symbol: "q_1, q_2", meaning: "Charges (C)" },
      { symbol: "r", meaning: "Separation (m)" },
    ],
    chapterSlug: "electric-charges-and-fields",
    chapterTitle: "Electric Charges & Fields",
    tags: ["coulomb", "charge", "force"],
  },
  {
    id: "es-2",
    title: "Electric Field of Point Charge",
    latex: "E = \\frac{kq}{r^2}",
    description: "Electric field magnitude at distance r from charge q.",
    variables: [
      { symbol: "E", meaning: "Electric field (N/C)" },
      { symbol: "q", meaning: "Source charge (C)" },
      { symbol: "r", meaning: "Distance (m)" },
    ],
    chapterSlug: "electric-charges-and-fields",
    chapterTitle: "Electric Charges & Fields",
    tags: ["electric field", "charge"],
  },
  {
    id: "es-3",
    title: "Electric Potential",
    latex: "V = \\frac{kq}{r}",
    description: "Electric potential at distance r from point charge q.",
    variables: [
      { symbol: "V", meaning: "Electric potential (V)" },
      { symbol: "q", meaning: "Source charge (C)" },
      { symbol: "r", meaning: "Distance (m)" },
    ],
    chapterSlug: "electrostatic-potential-and-capacitance",
    chapterTitle: "Electrostatic Potential & Capacitance",
    tags: ["potential", "voltage"],
  },
  {
    id: "es-4",
    title: "Capacitance",
    latex: "C = \\frac{Q}{V} = \\varepsilon_0 \\frac{A}{d}",
    description: "Charge stored per unit potential; parallel-plate formula.",
    variables: [
      { symbol: "C", meaning: "Capacitance (F)" },
      { symbol: "Q", meaning: "Charge (C)" },
      { symbol: "V", meaning: "Voltage (V)" },
      { symbol: "A", meaning: "Plate area (m²)" },
      { symbol: "d", meaning: "Plate separation (m)" },
    ],
    chapterSlug: "electrostatic-potential-and-capacitance",
    chapterTitle: "Electrostatic Potential & Capacitance",
    tags: ["capacitance", "capacitor"],
  },

  // ── Current Electricity ──────────────────────────────────────
  {
    id: "ce-1",
    title: "Ohm's Law",
    latex: "V = IR",
    description: "Voltage equals current times resistance.",
    variables: [
      { symbol: "V", meaning: "Voltage (V)" },
      { symbol: "I", meaning: "Current (A)" },
      { symbol: "R", meaning: "Resistance (Ω)" },
    ],
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    tags: ["ohm", "resistance", "current"],
  },
  {
    id: "ce-2",
    title: "Electrical Power",
    latex: "P = VI = I^2 R = \\frac{V^2}{R}",
    description: "Power dissipated in a resistor — three equivalent forms.",
    variables: [
      { symbol: "P", meaning: "Power (W)" },
      { symbol: "V", meaning: "Voltage (V)" },
      { symbol: "I", meaning: "Current (A)" },
      { symbol: "R", meaning: "Resistance (Ω)" },
    ],
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    tags: ["power", "resistance"],
  },
  {
    id: "ce-3",
    title: "Resistivity",
    latex: "R = \\rho \\frac{L}{A}",
    description: "Resistance depends on material resistivity, length, area.",
    variables: [
      { symbol: "R", meaning: "Resistance (Ω)" },
      { symbol: "\\rho", meaning: "Resistivity (Ω·m)" },
      { symbol: "L", meaning: "Length (m)" },
      { symbol: "A", meaning: "Cross-sectional area (m²)" },
    ],
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    tags: ["resistivity", "resistance"],
  },
  {
    id: "ce-4",
    title: "EMF and Terminal Voltage",
    latex: "V = \\varepsilon - Ir",
    description: "Terminal voltage equals EMF minus internal resistance drop.",
    variables: [
      { symbol: "V", meaning: "Terminal voltage (V)" },
      { symbol: "\\varepsilon", meaning: "EMF of cell (V)" },
      { symbol: "I", meaning: "Current (A)" },
      { symbol: "r", meaning: "Internal resistance (Ω)" },
    ],
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    tags: ["emf", "internal resistance"],
  },

  // ── Waves ─────────────────────────────────────────────────────
  {
    id: "wav-1",
    title: "Wave Speed",
    latex: "v = f\\lambda",
    description: "Wave speed equals frequency times wavelength.",
    variables: [
      { symbol: "v", meaning: "Wave speed (m/s)" },
      { symbol: "f", meaning: "Frequency (Hz)" },
      { symbol: "\\lambda", meaning: "Wavelength (m)" },
    ],
    chapterSlug: "waves",
    chapterTitle: "Waves",
    tags: ["wave", "frequency", "wavelength"],
  },
  {
    id: "wav-2",
    title: "Speed of Sound in Medium",
    latex: "v = \\sqrt{\\frac{B}{\\rho}}",
    description: "Speed of longitudinal wave depends on bulk modulus and density.",
    variables: [
      { symbol: "v", meaning: "Speed of sound (m/s)" },
      { symbol: "B", meaning: "Bulk modulus (Pa)" },
      { symbol: "\\rho", meaning: "Density (kg/m³)" },
    ],
    chapterSlug: "waves",
    chapterTitle: "Waves",
    tags: ["sound", "speed", "medium"],
  },
  {
    id: "wav-3",
    title: "Doppler Effect",
    latex: "f' = f \\cdot \\frac{v \\pm v_o}{v \\mp v_s}",
    description: "Apparent frequency shift when source/observer move.",
    variables: [
      { symbol: "f'", meaning: "Observed frequency (Hz)" },
      { symbol: "f", meaning: "Source frequency (Hz)" },
      { symbol: "v", meaning: "Speed of sound (m/s)" },
      { symbol: "v_o", meaning: "Observer speed (m/s)" },
      { symbol: "v_s", meaning: "Source speed (m/s)" },
    ],
    chapterSlug: "waves",
    chapterTitle: "Waves",
    tags: ["doppler", "frequency", "sound"],
  },
  {
    id: "wav-4",
    title: "Beat Frequency",
    latex: "f_{beat} = |f_1 - f_2|",
    description: "Number of beats per second between two close frequencies.",
    variables: [
      { symbol: "f_{beat}", meaning: "Beat frequency (Hz)" },
      { symbol: "f_1, f_2", meaning: "Individual frequencies (Hz)" },
    ],
    chapterSlug: "waves",
    chapterTitle: "Waves",
    tags: ["beats", "frequency"],
  },

  // ── Simple Harmonic Motion ────────────────────────────────────
  {
    id: "shm-1",
    title: "SHM Displacement",
    latex: "x = A\\sin(\\omega t + \\phi)",
    description: "Position of a particle in SHM.",
    variables: [
      { symbol: "A", meaning: "Amplitude (m)" },
      { symbol: "\\omega", meaning: "Angular frequency (rad/s)" },
      { symbol: "\\phi", meaning: "Initial phase (rad)" },
    ],
    chapterSlug: "oscillations",
    chapterTitle: "Oscillations",
    tags: ["shm", "oscillation", "amplitude"],
  },
  {
    id: "shm-2",
    title: "Angular Frequency",
    latex: "\\omega = \\sqrt{\\frac{k}{m}} = \\frac{2\\pi}{T}",
    description: "Angular frequency of spring-mass system.",
    variables: [
      { symbol: "\\omega", meaning: "Angular frequency (rad/s)" },
      { symbol: "k", meaning: "Spring constant (N/m)" },
      { symbol: "m", meaning: "Mass (kg)" },
      { symbol: "T", meaning: "Time period (s)" },
    ],
    chapterSlug: "oscillations",
    chapterTitle: "Oscillations",
    tags: ["shm", "spring", "frequency"],
  },
  {
    id: "shm-3",
    title: "Simple Pendulum Period",
    latex: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
    description: "Time period of a simple pendulum (small angle).",
    variables: [
      { symbol: "T", meaning: "Time period (s)" },
      { symbol: "L", meaning: "Pendulum length (m)" },
      { symbol: "g", meaning: "Gravitational acceleration (m/s²)" },
    ],
    chapterSlug: "oscillations",
    chapterTitle: "Oscillations",
    tags: ["pendulum", "period"],
  },
];

export const FORMULA_CHAPTERS = Array.from(
  new Map(FORMULAS.map((f) => [f.chapterSlug, { slug: f.chapterSlug, title: f.chapterTitle }])).values()
);

export function searchFormulas(query: string): Formula[] {
  const q = query.toLowerCase();
  return FORMULAS.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.tags.some((t) => t.includes(q)) ||
      f.chapterTitle.toLowerCase().includes(q)
  );
}
