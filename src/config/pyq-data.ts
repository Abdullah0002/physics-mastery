// =============================================================================
// PYQ Data — Previous Year Questions with exam metadata.
// Used as the authoritative data source until the database is seeded.
// =============================================================================

import type { ExamType, QuestionType, Difficulty, QuestionOption } from "@/types";

export interface PYQEntry {
  id: string;
  content: string;
  options: QuestionOption[] | null;
  correctAnswer: string | string[] | number | { min: number; max: number };
  solution: string;
  hint: string | null;
  explanation: string | null;
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  negativeMarks: number;
  tags: string[];
  exam: ExamType;
  year: number;
  session: string | null;
  chapterSlug: string;
  chapterTitle: string;
  isRepeat: boolean;
  repeatYears: number[];
}

// Shared matching tables for JEE Advanced 2017 Paper-1 Section 3 (rendered as HTML).
const TD = "border:1px solid #cbd5e1;padding:4px 8px";
const TH = "border:1px solid #cbd5e1;padding:4px 8px;background:#f1f5f9;font-weight:600";

const ADV17_EB_TABLE =
  `<div style='overflow-x:auto'><table style='border-collapse:collapse;font-size:13px;margin:8px 0'>` +
  `<thead><tr><th style='${TH}'>Column 1 (velocity)</th><th style='${TH}'>Column 2 (field E)</th><th style='${TH}'>Column 3 (field B)</th></tr></thead><tbody>` +
  `<tr><td style='${TD}'>(I) Electron, $\\vec{v}=2\\frac{E_0}{B_0}\\hat{x}$</td><td style='${TD}'>(i) $\\vec{E}=E_0\\hat{z}$</td><td style='${TD}'>(P) $\\vec{B}=-B_0\\hat{x}$</td></tr>` +
  `<tr><td style='${TD}'>(II) Electron, $\\vec{v}=\\frac{E_0}{B_0}\\hat{y}$</td><td style='${TD}'>(ii) $\\vec{E}=-E_0\\hat{y}$</td><td style='${TD}'>(Q) $\\vec{B}=B_0\\hat{x}$</td></tr>` +
  `<tr><td style='${TD}'>(III) Proton, $\\vec{v}=0$</td><td style='${TD}'>(iii) $\\vec{E}=-E_0\\hat{x}$</td><td style='${TD}'>(R) $\\vec{B}=B_0\\hat{y}$</td></tr>` +
  `<tr><td style='${TD}'>(IV) Proton, $\\vec{v}=2\\frac{E_0}{B_0}\\hat{x}$</td><td style='${TD}'>(iv) $\\vec{E}=E_0\\hat{x}$</td><td style='${TD}'>(S) $\\vec{B}=B_0\\hat{z}$</td></tr>` +
  `</tbody></table></div>`;

// Mini P–V plots for column 3 (1 = start, 2 = end of path).
const PV_ISOBAR = "<svg width='80' height='56' xmlns='http://www.w3.org/2000/svg'><line x1='14' y1='6' x2='14' y2='46' stroke='#334155'/><line x1='14' y1='46' x2='72' y2='46' stroke='#334155'/><text x='3' y='13' font-size='9'>P</text><text x='66' y='55' font-size='9'>V</text><line x1='24' y1='18' x2='62' y2='18' stroke='#1e40af' stroke-width='2'/><circle cx='24' cy='18' r='2.5' fill='#dc2626'/><circle cx='62' cy='18' r='2.5' fill='#dc2626'/><text x='19' y='14' font-size='8'>1</text><text x='63' y='14' font-size='8'>2</text></svg>";
const PV_ADIABAT = "<svg width='80' height='56' xmlns='http://www.w3.org/2000/svg'><line x1='14' y1='6' x2='14' y2='46' stroke='#334155'/><line x1='14' y1='46' x2='72' y2='46' stroke='#334155'/><text x='3' y='13' font-size='9'>P</text><text x='66' y='55' font-size='9'>V</text><path d='M24,10 Q30,42 66,42' fill='none' stroke='#1e40af' stroke-width='2'/><circle cx='24' cy='10' r='2.5' fill='#dc2626'/><circle cx='66' cy='42' r='2.5' fill='#dc2626'/><text x='27' y='12' font-size='8'>1</text><text x='66' y='38' font-size='8'>2</text></svg>";
const PV_ISOTHERM = "<svg width='80' height='56' xmlns='http://www.w3.org/2000/svg'><line x1='14' y1='6' x2='14' y2='46' stroke='#334155'/><line x1='14' y1='46' x2='72' y2='46' stroke='#334155'/><text x='3' y='13' font-size='9'>P</text><text x='66' y='55' font-size='9'>V</text><path d='M22,14 Q40,40 68,43' fill='none' stroke='#1e40af' stroke-width='2'/><circle cx='22' cy='14' r='2.5' fill='#dc2626'/><circle cx='68' cy='43' r='2.5' fill='#dc2626'/><text x='25' y='15' font-size='8'>1</text><text x='66' y='39' font-size='8'>2</text></svg>";
const PV_ISOCHOR = "<svg width='80' height='56' xmlns='http://www.w3.org/2000/svg'><line x1='14' y1='6' x2='14' y2='46' stroke='#334155'/><line x1='14' y1='46' x2='72' y2='46' stroke='#334155'/><text x='3' y='13' font-size='9'>P</text><text x='66' y='55' font-size='9'>V</text><line x1='40' y1='12' x2='40' y2='42' stroke='#1e40af' stroke-width='2'/><circle cx='40' cy='12' r='2.5' fill='#dc2626'/><circle cx='40' cy='42' r='2.5' fill='#dc2626'/><text x='44' y='15' font-size='8'>1</text><text x='44' y='44' font-size='8'>2</text></svg>";

const ADV17_PV_TABLE =
  `<div style='overflow-x:auto'><table style='border-collapse:collapse;font-size:13px;margin:8px 0'>` +
  `<thead><tr><th style='${TH}'>Column 1 (work $W_{1\\to2}$ on gas)</th><th style='${TH}'>Column 2 (process)</th><th style='${TH}'>Column 3 (P–V plot)</th></tr></thead><tbody>` +
  `<tr><td style='${TD}'>(I) $W_{1\\to2}=\\frac{1}{\\gamma-1}(P_2V_2-P_1V_1)$</td><td style='${TD}'>(i) Isothermal</td><td style='${TD}'>(P) ${PV_ISOBAR}</td></tr>` +
  `<tr><td style='${TD}'>(II) $W_{1\\to2}=-PV_2+PV_1$</td><td style='${TD}'>(ii) Isochoric</td><td style='${TD}'>(Q) ${PV_ADIABAT}</td></tr>` +
  `<tr><td style='${TD}'>(III) $W_{1\\to2}=0$</td><td style='${TD}'>(iii) Isobaric</td><td style='${TD}'>(R) ${PV_ISOTHERM}</td></tr>` +
  `<tr><td style='${TD}'>(IV) $W_{1\\to2}=-nRT\\ln\\frac{V_2}{V_1}$</td><td style='${TD}'>(iv) Adiabatic</td><td style='${TD}'>(S) ${PV_ISOCHOR}</td></tr>` +
  `</tbody></table></div>`;

export const PYQ_ENTRIES: PYQEntry[] = [
  // ══ JEE MAIN 2024 ═══════════════════════════════════════════════════════════
  {
    id: "pyq-jm24-k1",
    exam: "JEE_MAIN",
    year: 2024,
    session: "Session 1",
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A particle moves in a straight line with velocity $v = (3t^2 + 2t)$ m/s. The acceleration at $t = 2$ s is:",
    options: [
      { id: "A", content: "10 m/s²" },
      { id: "B", content: "12 m/s²" },
      { id: "C", content: "14 m/s²" },
      { id: "D", content: "16 m/s²" },
    ],
    correctAnswer: "C",
    solution:
      "$a = \\dfrac{dv}{dt} = 6t + 2$\nAt $t = 2$: $a = 6(2) + 2 = 14$ m/s²",
    hint: "Differentiate $v$ with respect to $t$.",
    explanation: "For $v = 3t^2 + 2t$: $a = dv/dt = 6t + 2$.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["variable-acceleration", "calculus", "kinematics"],
  },
  {
    id: "pyq-jm24-lm1",
    exam: "JEE_MAIN",
    year: 2024,
    session: "Session 1",
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    isRepeat: false,
    repeatYears: [],
    content:
      "A block of mass 5 kg on a frictionless surface is pulled by a force $F = 20$ N at 60° above horizontal. The acceleration of the block is: ($g = 10$ m/s²)",
    options: [
      { id: "A", content: "2 m/s²" },
      { id: "B", content: "4 m/s²" },
      { id: "C", content: "$2\\sqrt{3}$ m/s²" },
      { id: "D", content: "3 m/s²" },
    ],
    correctAnswer: "A",
    solution:
      "Horizontal component of force: $F_x = 20\\cos 60° = 20 \\times 0.5 = 10$ N\n$a = F_x/m = 10/5 = 2$ m/s²",
    hint: "Only the horizontal component of the force causes horizontal acceleration.",
    explanation: "Normal force increases because the vertical component of $F$ lifts the block slightly.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["newton-second-law", "inclined-force", "components"],
  },
  {
    id: "pyq-jm24-wpe1",
    exam: "JEE_MAIN",
    year: 2024,
    session: "Session 2",
    chapterSlug: "work-power-energy",
    chapterTitle: "Work, Power & Energy",
    isRepeat: false,
    repeatYears: [],
    content:
      "A spring of force constant $k = 200$ N/m is compressed by 0.1 m from its natural length. The elastic potential energy stored (in J) is:",
    options: null,
    correctAnswer: 1,
    solution:
      "$U = \\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\times 200 \\times (0.1)^2 = 100 \\times 0.01 = 1$ J",
    hint: "Spring potential energy: $U = \\frac{1}{2}kx^2$",
    explanation: "The elastic PE depends on the square of compression/extension.",
    type: "INTEGER",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 0,
    tags: ["spring", "elastic-pe", "energy"],
  },
  {
    id: "pyq-jm24-mag1",
    exam: "JEE_MAIN",
    year: 2024,
    session: "Session 1",
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism",
    isRepeat: false,
    repeatYears: [],
    content:
      "A straight wire of length $L$ carries current $I$. The magnetic field at a perpendicular distance $r$ from the midpoint of an infinitely long wire is:",
    options: [
      { id: "A", content: "$\\dfrac{\\mu_0 I}{4\\pi r}$" },
      { id: "B", content: "$\\dfrac{\\mu_0 I}{2\\pi r}$" },
      { id: "C", content: "$\\dfrac{\\mu_0 I}{\\pi r}$" },
      { id: "D", content: "$\\dfrac{2\\mu_0 I}{\\pi r}$" },
    ],
    correctAnswer: "B",
    solution:
      "For an infinitely long straight wire, Ampere's law gives:\n$B = \\dfrac{\\mu_0 I}{2\\pi r}$",
    hint: "Apply Ampere's circuital law with a circular Gaussian loop of radius $r$.",
    explanation: "This is the standard result for the magnetic field of an infinite current-carrying wire.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["ampere-law", "magnetic-field", "infinite-wire"],
  },
  {
    id: "pyq-jm24-mp1",
    exam: "JEE_MAIN",
    year: 2024,
    session: "Session 2",
    chapterSlug: "modern-physics",
    chapterTitle: "Modern Physics",
    isRepeat: false,
    repeatYears: [],
    content:
      "In the photoelectric effect, the stopping potential is $V_0 = 2$ V for a metal with work function $\\phi = 1.5$ eV. The frequency of the incident light is: (use $h = 6.6 \\times 10^{-34}$ J·s, $e = 1.6 \\times 10^{-19}$ C)",
    options: [
      { id: "A", content: "$8.7 \\times 10^{14}$ Hz" },
      { id: "B", content: "$6.0 \\times 10^{14}$ Hz" },
      { id: "C", content: "$1.0 \\times 10^{15}$ Hz" },
      { id: "D", content: "$5.5 \\times 10^{14}$ Hz" },
    ],
    correctAnswer: "A",
    solution:
      "$hf = \\phi + eV_0 = 1.5 + 2 = 3.5$ eV $= 3.5 \\times 1.6 \\times 10^{-19}$ J\n$f = \\dfrac{3.5 \\times 1.6 \\times 10^{-19}}{6.6 \\times 10^{-34}} \\approx 8.5 \\times 10^{14}$ Hz",
    hint: "Einstein's equation: $hf = \\phi + eV_0$. Calculate total energy and divide by $h$.",
    explanation: "The stopping potential measures the maximum KE of photoelectrons.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["photoelectric-effect", "einstein", "stopping-potential"],
  },

  // ══ JEE MAIN 2023 ═══════════════════════════════════════════════════════════
  {
    id: "pyq-jm23-rot1",
    exam: "JEE_MAIN",
    year: 2023,
    session: "Session 1",
    chapterSlug: "rotational-mechanics",
    chapterTitle: "Rotational Mechanics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A solid cylinder of mass $M$ and radius $R$ rolls without slipping on a horizontal surface with angular velocity $\\omega$. Its total kinetic energy is:",
    options: [
      { id: "A", content: "$\\dfrac{1}{2}MR^2\\omega^2$" },
      { id: "B", content: "$MR^2\\omega^2$" },
      { id: "C", content: "$\\dfrac{3}{4}MR^2\\omega^2$" },
      { id: "D", content: "$\\dfrac{1}{4}MR^2\\omega^2$" },
    ],
    correctAnswer: "C",
    solution:
      "$KE_{total} = KE_{trans} + KE_{rot} = \\dfrac{1}{2}Mv^2 + \\dfrac{1}{2}I\\omega^2$\nFor cylinder, $I = \\dfrac{1}{2}MR^2$, $v = R\\omega$:\n$= \\dfrac{1}{2}M(R\\omega)^2 + \\dfrac{1}{2} \\cdot \\dfrac{1}{2}MR^2 \\cdot \\omega^2 = \\dfrac{3}{4}MR^2\\omega^2$",
    hint: "Total KE = translational KE + rotational KE. For rolling: $v = R\\omega$.",
    explanation: "Solid cylinder has $I = MR^2/2$. Rolling condition: $v_{cm} = R\\omega$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["rolling-motion", "moment-of-inertia", "kinetic-energy"],
  },
  {
    id: "pyq-jm23-ro1",
    exam: "JEE_MAIN",
    year: 2023,
    session: "Session 2",
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A concave mirror has focal length $f = 15$ cm. An object is placed 45 cm from the pole. The image distance (in cm) is:",
    options: null,
    correctAnswer: 22,
    solution:
      "Using mirror formula: $\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}$\nWith $u = -45$ cm, $f = -15$ cm (concave):\n$\\dfrac{1}{v} = \\dfrac{1}{-15} - \\dfrac{1}{-45} = -\\dfrac{3}{45} + \\dfrac{1}{45} = -\\dfrac{2}{45}$\n$v = -22.5 \\approx -22$ cm (real, in front of mirror)",
    hint: "Mirror formula: $1/v + 1/u = 1/f$. For concave mirror, $f$ is negative (real focus).",
    explanation: "The negative image distance confirms a real inverted image on the same side as the object.",
    type: "INTEGER",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 0,
    tags: ["mirror-formula", "concave-mirror", "image-formation"],
  },
  {
    id: "pyq-jm23-thermo1",
    exam: "JEE_MAIN",
    year: 2023,
    session: "Session 1",
    chapterSlug: "thermodynamics",
    chapterTitle: "Thermodynamics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A Carnot engine operates between temperatures $T_H = 600$ K and $T_C = 300$ K. The efficiency of the engine is:",
    options: [
      { id: "A", content: "25%" },
      { id: "B", content: "33%" },
      { id: "C", content: "50%" },
      { id: "D", content: "75%" },
    ],
    correctAnswer: "C",
    solution:
      "$\\eta = 1 - \\dfrac{T_C}{T_H} = 1 - \\dfrac{300}{600} = 1 - 0.5 = 50\\%$",
    hint: "Carnot efficiency: $\\eta = 1 - T_C/T_H$ (temperatures in Kelvin).",
    explanation:
      "The Carnot engine is the most efficient heat engine possible between two given temperatures.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["carnot-engine", "efficiency", "thermodynamics"],
  },
  {
    id: "pyq-jm23-wo1",
    exam: "JEE_MAIN",
    year: 2023,
    session: "Session 2",
    chapterSlug: "wave-optics",
    chapterTitle: "Wave Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "In Young's double slit experiment, the slit separation is $d = 0.5$ mm and the screen distance is $D = 1$ m. For wavelength $\\lambda = 500$ nm, the fringe width is:",
    options: [
      { id: "A", content: "0.5 mm" },
      { id: "B", content: "1 mm" },
      { id: "C", content: "1.5 mm" },
      { id: "D", content: "2 mm" },
    ],
    correctAnswer: "B",
    solution:
      "$\\beta = \\dfrac{\\lambda D}{d} = \\dfrac{500 \\times 10^{-9} \\times 1}{0.5 \\times 10^{-3}} = \\dfrac{5 \\times 10^{-7}}{5 \\times 10^{-4}} = 10^{-3}$ m $= 1$ mm",
    hint: "Fringe width formula: $\\beta = \\lambda D / d$",
    explanation: "Fringe width is independent of the order number — all fringes have equal width.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["young-double-slit", "fringe-width", "interference"],
  },
  {
    id: "pyq-jm23-grav1",
    exam: "JEE_MAIN",
    year: 2023,
    session: "Session 1",
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    isRepeat: false,
    repeatYears: [],
    content:
      "The escape velocity from Earth is $v_e$. The escape velocity from a planet with the same mass as Earth but twice the radius is:",
    options: [
      { id: "A", content: "$v_e/\\sqrt{2}$" },
      { id: "B", content: "$\\sqrt{2}\\,v_e$" },
      { id: "C", content: "$v_e/2$" },
      { id: "D", content: "$2v_e$" },
    ],
    correctAnswer: "A",
    solution:
      "$v_e = \\sqrt{\\dfrac{2GM}{R}}$. For planet: $R' = 2R$, same $M$.\n$v_e' = \\sqrt{\\dfrac{2GM}{2R}} = \\sqrt{\\dfrac{2GM}{2R}} = \\dfrac{v_e}{\\sqrt{2}}$",
    hint: "Escape velocity $v_e = \\sqrt{2GM/R}$. Doubling $R$ with same $M$ changes $v_e$ by $1/\\sqrt{2}$.",
    explanation: "Escape velocity depends on both mass and radius: $v_e \\propto \\sqrt{M/R}$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["escape-velocity", "gravitation", "proportionality"],
  },

  // ══ JEE MAIN 2022 ═══════════════════════════════════════════════════════════
  {
    id: "pyq-jm22-shm1",
    exam: "JEE_MAIN",
    year: 2022,
    session: "Session 1",
    chapterSlug: "simple-harmonic-motion",
    chapterTitle: "Simple Harmonic Motion",
    isRepeat: true,
    repeatYears: [2021],
    content:
      "A particle in SHM has amplitude $A$ and angular frequency $\\omega$. The ratio of its kinetic energy to total energy when displacement is $x = A/2$ is:",
    options: [
      { id: "A", content: "$1/4$" },
      { id: "B", content: "$1/2$" },
      { id: "C", content: "$3/4$" },
      { id: "D", content: "$2/3$" },
    ],
    correctAnswer: "C",
    solution:
      "$KE = \\dfrac{1}{2}m\\omega^2(A^2 - x^2)$, Total $E = \\dfrac{1}{2}m\\omega^2 A^2$\n$\\dfrac{KE}{E} = \\dfrac{A^2 - x^2}{A^2} = \\dfrac{A^2 - A^2/4}{A^2} = \\dfrac{3}{4}$",
    hint: "$KE/E = (A^2 - x^2)/A^2$ where $x$ is displacement.",
    explanation: "At $x = A/2$: PE is 1/4 of total, so KE is 3/4 of total.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["SHM", "kinetic-energy", "amplitude"],
  },
  {
    id: "pyq-jm22-ce1",
    exam: "JEE_MAIN",
    year: 2022,
    session: "Session 2",
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    isRepeat: false,
    repeatYears: [],
    content:
      "Three resistors $R_1 = 2\\ \\Omega$, $R_2 = 4\\ \\Omega$, $R_3 = 6\\ \\Omega$ are connected in parallel. If a 12 V battery is connected, the total current drawn (in A) is:",
    options: null,
    correctAnswer: 11,
    solution:
      "$\\dfrac{1}{R_{eq}} = \\dfrac{1}{2} + \\dfrac{1}{4} + \\dfrac{1}{6} = \\dfrac{6+3+2}{12} = \\dfrac{11}{12}$\n$R_{eq} = \\dfrac{12}{11}\\ \\Omega$\n$I = \\dfrac{V}{R_{eq}} = \\dfrac{12 \\times 11}{12} = 11$ A",
    hint: "Find equivalent parallel resistance, then use Ohm's law $I = V/R_{eq}$.",
    explanation: "In parallel, all branches have the same voltage (12 V). Sum the individual currents.",
    type: "INTEGER",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 0,
    tags: ["parallel-circuit", "ohm's-law", "current"],
  },
  {
    id: "pyq-jm22-es1",
    exam: "JEE_MAIN",
    year: 2022,
    session: "Session 1",
    chapterSlug: "electrostatics",
    chapterTitle: "Electrostatics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Two identical metallic spheres each of charge $+Q$ are placed at distance $r$. They are brought into contact and then separated to the same distance $r$. The ratio of the new force to the original force is:",
    options: [
      { id: "A", content: "$1:1$" },
      { id: "B", content: "$1:4$" },
      { id: "C", content: "$4:1$" },
      { id: "D", content: "$1:2$" },
    ],
    correctAnswer: "A",
    solution:
      "When identical spheres touch, charge redistributes equally: each gets $Q$.\nOriginal force: $F_1 = kQ^2/r^2$\nNew force: $F_2 = kQ^2/r^2 = F_1$\nRatio: $1:1$",
    hint: "When identical spheres are brought into contact, the total charge is shared equally.",
    explanation:
      "Since both spheres originally had charge $+Q$ and are identical, after contact each still has $+Q$. Force is unchanged.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["charge-sharing", "coulomb-force", "identical-spheres"],
  },
  {
    id: "pyq-jm22-em1",
    exam: "JEE_MAIN",
    year: 2022,
    session: "Session 2",
    chapterSlug: "electromagnetic-induction",
    chapterTitle: "Electromagnetic Induction",
    isRepeat: false,
    repeatYears: [],
    content:
      "A circular loop of radius $r$ lies in the $xy$-plane in a magnetic field $\\vec{B} = B_0\\hat{z}$. The magnetic flux through the loop is:",
    options: [
      { id: "A", content: "$B_0 \\pi r^2$" },
      { id: "B", content: "$B_0 r^2$" },
      { id: "C", content: "$B_0 \\pi r$" },
      { id: "D", content: "Zero" },
    ],
    correctAnswer: "A",
    solution:
      "Area vector $\\vec{A} = \\pi r^2 \\hat{z}$. Flux $= \\vec{B} \\cdot \\vec{A} = B_0 \\pi r^2$.",
    hint: "Flux $= B \\cdot A \\cos\\theta$. Here $\\theta = 0°$ since $\\vec{B}$ is perpendicular to the plane of the loop.",
    explanation: "When the magnetic field is perpendicular to the loop, flux is maximum: $\\Phi = BA$.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["magnetic-flux", "faraday", "circular-loop"],
  },

  // ══ JEE ADVANCED 2023 ════════════════════════════════════════════════════════
  {
    id: "pyq-ja23-mc1",
    exam: "JEE_ADVANCED",
    year: 2023,
    session: "Paper 1",
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A projectile is launched from the ground with speed $u$ at angle $\\theta$. Which of the following statements is/are **always** correct?",
    options: [
      { id: "A", content: "At the maximum height, the speed is $u\\cos\\theta$" },
      { id: "B", content: "The kinetic energy is minimum at maximum height" },
      { id: "C", content: "The speed at any height $h$ is $\\sqrt{u^2 - 2gh}$" },
      { id: "D", content: "The velocity is perpendicular to acceleration at maximum height" },
    ],
    correctAnswer: ["A", "B", "D"],
    solution:
      "A: At max height, $v_y = 0$, speed $= v_x = u\\cos\\theta$. ✓\nB: KE is minimum when speed is minimum, which is at max height. ✓\nC: Wrong — this would be true only for vertical throw. For projectile, $v = \\sqrt{(u\\cos\\theta)^2 + (u\\sin\\theta - gt)^2}$.\nD: At max height, velocity is horizontal ($v_x$) and $g$ is vertical. They are perpendicular. ✓",
    hint: "At maximum height: (1) vertical velocity = 0, (2) horizontal velocity is unchanged, (3) acceleration is still $g$ downward.",
    explanation: "C is the common trap — it applies only to vertical motion, not to the total speed in projectile motion.",
    type: "MCQ_MULTIPLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 2,
    tags: ["projectile-motion", "multi-correct", "conceptual"],
  },
  {
    id: "pyq-ja23-es1",
    exam: "JEE_ADVANCED",
    year: 2023,
    session: "Paper 2",
    chapterSlug: "electrostatics",
    chapterTitle: "Electrostatics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A conducting sphere of radius $R$ has charge $Q$ on it. An identical uncharged sphere is brought into contact and then removed. Which of the following correctly describe the final state?",
    options: [
      { id: "A", content: "Each sphere has charge $Q/2$" },
      { id: "B", content: "The electric field at the surface of each sphere is the same" },
      { id: "C", content: "The potential of each sphere is equal after contact" },
      { id: "D", content: "The force between the two spheres increases after separation" },
    ],
    correctAnswer: ["A", "B", "C"],
    solution:
      "A: Identical conductors share charge equally → $Q/2$ each. ✓\nB: $E = kQ/(2)/R^2$ is same for both. ✓\nC: Same charge, same radius → same potential $V = kQ/2R$. ✓\nD: Before: force $\\propto Q \\cdot 0 = 0$. After: force $\\propto (Q/2)^2$. Force **increases** from 0, so D is TRUE.",
    hint: "Think carefully: what was the force BEFORE contact? Before touching, one sphere was uncharged.",
    explanation: "D is TRUE too — force before is zero (uncharged sphere), after is non-zero. So all four options are correct.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["charge-sharing", "conductor", "potential", "coulomb"],
  },
  {
    id: "pyq-ja23-rot1",
    exam: "JEE_ADVANCED",
    year: 2023,
    session: "Paper 1",
    chapterSlug: "rotational-mechanics",
    chapterTitle: "Rotational Mechanics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A uniform rod of mass $M$ and length $L$ is pivoted at one end. The moment of inertia about the pivot is $I = ML^2/3$. If released from horizontal position, its angular velocity at the lowest point (in rad/s) is: ($M = 1$ kg, $L = 1$ m, $g = 10$ m/s²)",
    options: null,
    correctAnswer: { min: 5.4, max: 5.6 },
    solution:
      "Energy conservation: $Mg(L/2) = \\dfrac{1}{2}I\\omega^2$\n$1 \\times 10 \\times 0.5 = \\dfrac{1}{2} \\times \\dfrac{1}{3} \\times \\omega^2$\n$5 = \\dfrac{\\omega^2}{6}$\n$\\omega^2 = 30$, $\\omega = \\sqrt{30} \\approx 5.48$ rad/s",
    hint: "Use energy conservation. The CM falls by $L/2$. Total PE loss = $Mg(L/2)$.",
    explanation: "The rotational KE at the bottom equals the potential energy lost as the rod swings down.",
    type: "NUMERICAL",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 0,
    tags: ["rotational-motion", "energy-conservation", "pivot"],
  },

  // ══ JEE ADVANCED 2022 ════════════════════════════════════════════════════════
  {
    id: "pyq-ja22-em1",
    exam: "JEE_ADVANCED",
    year: 2022,
    session: "Paper 1",
    chapterSlug: "electromagnetic-induction",
    chapterTitle: "Electromagnetic Induction",
    isRepeat: false,
    repeatYears: [],
    content:
      "A rectangular loop of dimensions $2a \\times b$ moves with velocity $v$ into a uniform magnetic field $B$ perpendicular to the loop. Which of the following are correct?",
    options: [
      { id: "A", content: "The induced EMF is $Bvb$ as the loop enters the field" },
      { id: "B", content: "The induced current opposes the increase in flux (Lenz's law)" },
      { id: "C", content: "Once fully inside the field, the induced EMF is zero" },
      { id: "D", content: "The force required to move the loop at constant velocity is zero once fully inside" },
    ],
    correctAnswer: ["A", "B", "C", "D"],
    solution:
      "A: EMF = rate of change of flux $= Bvb$. ✓\nB: By Lenz's law. ✓\nC: Fully inside → flux is constant → EMF = 0. ✓\nD: No current → no force (F = BIL = 0). ✓",
    hint: "Apply Faraday's law: $\\varepsilon = -d\\Phi/dt$. Consider three stages: entering, fully inside, exiting.",
    explanation: "All four are correct. Once fully inside the field, there's no change in flux, hence no EMF, no current, and no retarding force.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["faraday-law", "lenz-law", "moving-loop", "EMF"],
  },
  {
    id: "pyq-ja22-mp1",
    exam: "JEE_ADVANCED",
    year: 2022,
    session: "Paper 2",
    chapterSlug: "modern-physics",
    chapterTitle: "Modern Physics",
    isRepeat: false,
    repeatYears: [],
    content:
      "In a hydrogen atom, the electron transitions from $n = 4$ to $n = 2$. The number of spectral lines that can be emitted when the electron returns from $n = 4$ to $n = 1$ is:",
    options: null,
    correctAnswer: 6,
    solution:
      "From $n = 4$ to $n = 1$, possible transitions: $4→3$, $4→2$, $4→1$, $3→2$, $3→1$, $2→1$.\nTotal = $\\dfrac{n(n-1)}{2} = \\dfrac{4 \\times 3}{2} = 6$",
    hint: "Number of spectral lines = $n(n-1)/2$ where $n$ is the highest level from which transitions start.",
    explanation: "From level 4, an electron can cascade through multiple paths to level 1, each producing different spectral lines.",
    type: "INTEGER",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 0,
    tags: ["hydrogen-spectrum", "spectral-lines", "energy-levels"],
  },

  // ══ JEE ADVANCED 2021 ════════════════════════════════════════════════════════
  {
    id: "pyq-ja21-cap1",
    exam: "JEE_ADVANCED",
    year: 2021,
    session: "Paper 1",
    chapterSlug: "capacitance",
    chapterTitle: "Capacitance",
    isRepeat: false,
    repeatYears: [],
    content:
      "Three identical capacitors, each of capacitance $C = 2\\ \\mu$F, are connected: two in series and the combination in parallel with the third. The equivalent capacitance (in $\\mu$F) is:",
    options: null,
    correctAnswer: 3,
    solution:
      "Two in series: $C_{series} = \\dfrac{C}{2} = 1\\ \\mu$F\nIn parallel with third: $C_{eq} = 1 + 2 = 3\\ \\mu$F",
    hint: "Series gives $C/2$; adding the third in parallel adds $C$ more.",
    explanation: "Series combination of two equal $C$ capacitors = $C/2$. Then parallel with $C$ = $C/2 + C = 3C/2$.",
    type: "INTEGER",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 0,
    tags: ["capacitor-combination", "series-parallel"],
  },
  {
    id: "pyq-ja21-waves1",
    exam: "JEE_ADVANCED",
    year: 2021,
    session: "Paper 2",
    chapterSlug: "waves",
    chapterTitle: "Waves",
    isRepeat: false,
    repeatYears: [],
    content:
      "A standing wave is formed on a string of length $L$ fixed at both ends. The wavelengths of the allowed modes are:",
    options: [
      { id: "A", content: "$\\lambda_n = \\dfrac{2L}{n}$ for $n = 1, 2, 3\\ldots$" },
      { id: "B", content: "$\\lambda_n = \\dfrac{L}{n}$ for $n = 1, 2, 3\\ldots$" },
      { id: "C", content: "$\\lambda_n = \\dfrac{4L}{n}$ for odd $n$ only" },
      { id: "D", content: "$\\lambda_n = \\dfrac{L}{2n}$ for $n = 1, 2, 3\\ldots$" },
    ],
    correctAnswer: "A",
    solution:
      "For string fixed at both ends, nodes at both ends. Condition: $L = n\\lambda/2$, giving $\\lambda = 2L/n$.",
    hint: "Fixed ends are nodes. The length must accommodate a whole number of half-wavelengths.",
    explanation: "The fundamental mode ($n=1$) has $\\lambda = 2L$; overtones are $\\lambda = 2L/n$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["standing-waves", "boundary-conditions", "harmonics"],
  },

  // ══ NEET 2023 ═══════════════════════════════════════════════════════════════
  {
    id: "pyq-neet23-k1",
    exam: "NEET",
    year: 2023,
    session: null,
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A man can swim with velocity $v$ in still water. He wants to cross a river of width $d$ with current velocity $u$ ($u < v$). The minimum time to cross the river is:",
    options: [
      { id: "A", content: "$d/v$" },
      { id: "B", content: "$d/\\sqrt{v^2 - u^2}$" },
      { id: "C", content: "$d/(v+u)$" },
      { id: "D", content: "$d/(v-u)$" },
    ],
    correctAnswer: "A",
    solution:
      "To minimise crossing time, the swimmer should aim directly across (perpendicular to the bank).\nCrossing speed = $v$ (perpendicular component).\nMinimum time $= d/v$.",
    hint: "Minimum time ≠ shortest path. For minimum time, point perpendicularly across.",
    explanation: "Time = width / perpendicular velocity. Maximum perpendicular velocity = $v$ (swim straight across).",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["relative-motion", "river-crossing", "minimum-time"],
  },
  {
    id: "pyq-neet23-ro1",
    exam: "NEET",
    year: 2023,
    session: null,
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Light enters a glass prism (refractive index $\\mu = 1.5$) at the minimum deviation angle. The angle of prism is $A = 60°$. The minimum angle of deviation $\\delta_m$ is: ($\\sin 30° = 0.5$, $\\sin 48.6° \\approx 0.75$)",
    options: [
      { id: "A", content: "$30°$" },
      { id: "B", content: "$38°$" },
      { id: "C", content: "$37.2°$" },
      { id: "D", content: "$48.6°$" },
    ],
    correctAnswer: "C",
    solution:
      "$\\mu = \\dfrac{\\sin\\left(\\frac{A+\\delta_m}{2}\\right)}{\\sin(A/2)}$\n$1.5 = \\dfrac{\\sin\\left(\\frac{60+\\delta_m}{2}\\right)}{\\sin 30°} = \\dfrac{\\sin\\left(30+\\frac{\\delta_m}{2}\\right)}{0.5}$\n$\\sin\\left(30+\\frac{\\delta_m}{2}\\right) = 0.75$\n$30 + \\delta_m/2 \\approx 48.6°$\n$\\delta_m \\approx 37.2°$",
    hint: "At minimum deviation: $r = A/2$ and $i = (A + \\delta_m)/2$. Use Snell's law at entry face.",
    explanation: "At minimum deviation, the ray inside the prism is parallel to the base.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["prism", "minimum-deviation", "snell's-law"],
  },
  {
    id: "pyq-neet23-mag1",
    exam: "NEET",
    year: 2023,
    session: null,
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism",
    isRepeat: false,
    repeatYears: [],
    content:
      "A proton moving with velocity $v = 10^6$ m/s enters a magnetic field $B = 0.1$ T perpendicular to the field. The radius of the circular path is: ($m_p = 1.67 \\times 10^{-27}$ kg, $e = 1.6 \\times 10^{-19}$ C)",
    options: [
      { id: "A", content: "0.104 m" },
      { id: "B", content: "0.210 m" },
      { id: "C", content: "0.025 m" },
      { id: "D", content: "1.04 m" },
    ],
    correctAnswer: "A",
    solution:
      "$r = \\dfrac{mv}{eB} = \\dfrac{1.67 \\times 10^{-27} \\times 10^6}{1.6 \\times 10^{-19} \\times 0.1} = \\dfrac{1.67 \\times 10^{-21}}{1.6 \\times 10^{-20}} \\approx 0.104$ m",
    hint: "Radius of circular motion in magnetic field: $r = mv/(qB)$.",
    explanation: "The magnetic force provides the centripetal force: $qvB = mv^2/r$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["charged-particle", "magnetic-field", "circular-motion"],
  },
  {
    id: "pyq-neet23-thermo1",
    exam: "NEET",
    year: 2023,
    session: null,
    chapterSlug: "thermodynamics",
    chapterTitle: "Thermodynamics",
    isRepeat: false,
    repeatYears: [],
    content:
      "In a cyclic process, the net heat absorbed by a gas is 500 J and net work done by the gas is 300 J. The change in internal energy of the gas is:",
    options: [
      { id: "A", content: "$-200$ J" },
      { id: "B", content: "$200$ J" },
      { id: "C", content: "$800$ J" },
      { id: "D", content: "Zero" },
    ],
    correctAnswer: "D",
    solution:
      "For a cyclic process, the state returns to its initial state, so $\\Delta U = 0$ by definition.",
    hint: "In a cyclic process, the system returns to its initial state. What is $\\Delta U$ for a complete cycle?",
    explanation: "Internal energy is a state function. For a cyclic process: $\\Delta U = 0$ always.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["cyclic-process", "first-law", "internal-energy"],
  },

  // ══ NEET 2022 ═══════════════════════════════════════════════════════════════
  {
    id: "pyq-neet22-lm1",
    exam: "NEET",
    year: 2022,
    session: null,
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
    isRepeat: false,
    repeatYears: [],
    content:
      "A car of mass 1000 kg moves on a circular road of radius 100 m with speed 20 m/s. The centripetal force required is:",
    options: [
      { id: "A", content: "2000 N" },
      { id: "B", content: "4000 N" },
      { id: "C", content: "1000 N" },
      { id: "D", content: "8000 N" },
    ],
    correctAnswer: "B",
    solution:
      "$F_c = \\dfrac{mv^2}{r} = \\dfrac{1000 \\times (20)^2}{100} = \\dfrac{1000 \\times 400}{100} = 4000$ N",
    hint: "Centripetal force: $F = mv^2/r$.",
    explanation: "This force is provided by friction between tyres and road in horizontal circular motion.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["circular-motion", "centripetal-force"],
  },
  {
    id: "pyq-neet22-mp1",
    exam: "NEET",
    year: 2022,
    session: null,
    chapterSlug: "modern-physics",
    chapterTitle: "Modern Physics",
    isRepeat: false,
    repeatYears: [],
    content:
      "The half-life of a radioactive substance is 30 minutes. Starting with $N_0$ nuclei, the fraction remaining after 2 hours is:",
    options: [
      { id: "A", content: "$1/16$" },
      { id: "B", content: "$1/8$" },
      { id: "C", content: "$1/4$" },
      { id: "D", content: "$1/32$" },
    ],
    correctAnswer: "A",
    solution:
      "Number of half-lives: $n = 2 \\text{ hr} / 0.5 \\text{ hr} = 4$\nFraction remaining: $N/N_0 = (1/2)^4 = 1/16$",
    hint: "Number of half-lives = total time / half-life. Fraction remaining = $(1/2)^n$.",
    explanation: "2 hours = 120 minutes = 4 half-lives. Each half-life reduces the amount by half.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["radioactive-decay", "half-life"],
  },
  {
    id: "pyq-neet22-ce1",
    exam: "NEET",
    year: 2022,
    session: null,
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    isRepeat: false,
    repeatYears: [],
    content:
      "A 100 W, 220 V bulb and a 60 W, 220 V bulb are connected in series to a 220 V supply. Which bulb will glow brighter and why?",
    options: [
      { id: "A", content: "100 W bulb — it has lower resistance" },
      { id: "B", content: "60 W bulb — it has higher resistance, so more voltage across it in series" },
      { id: "C", content: "Both glow equally" },
      { id: "D", content: "100 W bulb — it has higher resistance" },
    ],
    correctAnswer: "B",
    solution:
      "$R = V^2/P$. For 100 W: $R_1 = 220^2/100 = 484\\ \\Omega$. For 60 W: $R_2 = 220^2/60 \\approx 807\\ \\Omega$.\nIn series, same current. Power $P = I^2 R$. Higher $R$ → more power dissipated → **60 W bulb glows brighter**.",
    hint: "Resistance $R = V^2/P$ at rated conditions. In series: same current, so $P = I^2R$ — higher $R$ means more power.",
    explanation: "This is a classic misconception: in series, the higher-rated (100W) bulb has lower resistance and actually glows dimmer.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["power", "series-circuit", "resistance", "conceptual"],
  },

  // ══ NEET 2021 ═══════════════════════════════════════════════════════════════
  {
    id: "pyq-neet21-shm1",
    exam: "NEET",
    year: 2021,
    session: null,
    chapterSlug: "simple-harmonic-motion",
    chapterTitle: "Simple Harmonic Motion",
    isRepeat: true,
    repeatYears: [2022],
    content:
      "A spring of force constant $k$ has a block of mass $m$ attached to it. The time period of oscillation is $T = 2\\pi\\sqrt{m/k}$. If both $m$ and $k$ are doubled, the new time period is:",
    options: [
      { id: "A", content: "$T$" },
      { id: "B", content: "$T\\sqrt{2}$" },
      { id: "C", content: "$T/\\sqrt{2}$" },
      { id: "D", content: "$2T$" },
    ],
    correctAnswer: "A",
    solution:
      "$T = 2\\pi\\sqrt{m/k}$. New: $T' = 2\\pi\\sqrt{2m/2k} = 2\\pi\\sqrt{m/k} = T$.",
    hint: "Doubling both $m$ and $k$ cancels out in $T = 2\\pi\\sqrt{m/k}$.",
    explanation: "Since $T \\propto \\sqrt{m/k}$, doubling both leaves the ratio unchanged.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["SHM", "time-period", "spring-mass"],
  },
  {
    id: "pyq-neet21-waves1",
    exam: "NEET",
    year: 2021,
    session: null,
    chapterSlug: "sound-waves",
    chapterTitle: "Sound Waves",
    isRepeat: false,
    repeatYears: [],
    content:
      "Two tuning forks of frequencies 256 Hz and 260 Hz are sounded together. The number of beats heard per second is:",
    options: [
      { id: "A", content: "2" },
      { id: "B", content: "4" },
      { id: "C", content: "6" },
      { id: "D", content: "8" },
    ],
    correctAnswer: "B",
    solution: "Beat frequency $= |f_1 - f_2| = |256 - 260| = 4$ beats per second.",
    hint: "Beat frequency = |difference in frequencies|",
    explanation: "Beats arise from superposition of two slightly different frequencies; the beat frequency equals their difference.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["beats", "sound-waves", "frequency"],
  },

  // ══ JEE ADVANCED 2017 — Paper 1 ═══════════════════════════════════════════════
  {
    id: "pyq-ja17-p1-q1",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "kinetic-theory-of-gases",
    chapterTitle: "Kinetic Theory of Gases (KTG)",
    isRepeat: false,
    repeatYears: [],
    content:
      "A flat plate is moving normal to its plane through a gas under the action of a constant force $F$. The gas is kept at a very low pressure. The speed of the plate $v$ is much less than the average speed $u$ of the gas molecules. Which of the following options is/are true?",
    options: [
      { id: "A", content: "The pressure difference between the leading and trailing faces of the plate is proportional to $uv$" },
      { id: "B", content: "The resistive force experienced by the plate is proportional to $v$" },
      { id: "C", content: "The plate will continue to move with constant non-zero acceleration, at all times" },
      { id: "D", content: "At a later time the external force $F$ balances the resistive force" },
    ],
    correctAnswer: ["A", "B", "D"],
    solution:
      "Molecules striking the leading face return faster than those leaving the trailing face. The momentum transfer rate gives a pressure difference $\\Delta P \\propto \\rho\\, u\\, v$, so [A] is true and the net resistive force $\\propto v$ [B].\nSince the resistive force grows with $v$, the acceleration decreases over time (not constant), so [C] is false. Eventually $v$ becomes large enough that the resistive force equals $F$ (terminal velocity), so [D] is true.",
    hint: "The drag from molecular collisions on a body moving slowly through a rarefied gas is linear in $v$.",
    explanation: "Net force $= F - kv$; acceleration $\\to 0$ as $v \\to F/k$ (terminal speed).",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["kinetic-theory", "drag", "rarefied-gas", "terminal-velocity"],
  },
  {
    id: "pyq-ja17-p1-q2",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "center-of-mass",
    chapterTitle: "Center of Mass",
    isRepeat: false,
    repeatYears: [],
    content:
      "A block of mass $M$ has a circular cut with a frictionless surface as shown. The block rests on the horizontal frictionless surface of a fixed table. Initially the right edge of the block is at $x = 0$, in a coordinate system fixed to the table. A point mass $m$ is released from rest at the topmost point of the path as shown and it slides down. When the mass loses contact with the block, its position is $x$ and its velocity is $v$. At that instant, which of the following options is/are correct?\n\n<svg width='320' height='200' viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg'><line x1='30' y1='165' x2='300' y2='165' stroke='#334155' stroke-width='2'/><rect x='50' y='80' width='150' height='85' fill='#e8f0fe' stroke='#1e40af' stroke-width='2'/><path d='M120,80 A80,80 0 0,1 200,160' fill='white' stroke='#1e40af' stroke-width='1.5' stroke-dasharray='4 3'/><circle cx='120' cy='80' r='6' fill='#dc2626'/><text x='100' y='77' font-size='12' fill='#dc2626'>m</text><text x='70' y='130' font-size='14' fill='#1e40af'>M</text><line x1='120' y1='66' x2='200' y2='66' stroke='#334155'/><text x='155' y='61' font-size='11'>R</text><line x1='214' y1='80' x2='214' y2='160' stroke='#334155'/><text x='218' y='124' font-size='11'>R</text><line x1='200' y1='80' x2='200' y2='182' stroke='#94a3b8' stroke-dasharray='3 2'/><text x='188' y='194' font-size='11'>x=0</text></svg>",
    options: [
      { id: "A", content: "The position of the point mass $m$ is $x = -\\sqrt{2}\\,\\frac{mR}{M+m}$" },
      { id: "B", content: "The velocity of the point mass $m$ is $v = \\sqrt{\\dfrac{2gR}{1+\\frac{m}{M}}}$" },
      { id: "C", content: "The $x$ component of displacement of the centre of mass of the block $M$ is $-\\dfrac{mR}{M+m}$" },
      { id: "D", content: "The velocity of the block $M$ is $V = -\\dfrac{m}{M}\\sqrt{2gR}$" },
    ],
    correctAnswer: ["B", "C"],
    solution:
      "No external horizontal force acts, so horizontal momentum is conserved: $mv = MV$, and the centre of mass has no horizontal displacement.\nEnergy conservation (drop of height $R$): $mgR = \\frac{1}{2}mv^2 + \\frac{1}{2}MV^2$. Using $V = mv/M$: $mgR = \\frac{1}{2}mv^2\\left(1+\\frac{m}{M}\\right)$, giving $v = \\sqrt{\\dfrac{2gR}{1+m/M}}$ [B].\nBecause the CM stays fixed and $m$ moves a horizontal distance $R$ relative to the block, the block's CM shifts by $-\\dfrac{mR}{M+m}$ [C].\n[D] is wrong: $V = \\dfrac{m}{M}v \\ne \\dfrac{m}{M}\\sqrt{2gR}$.",
    hint: "Horizontal momentum is conserved and the centre of mass does not move horizontally.",
    explanation: "Relative horizontal displacement of $m$ with respect to the block is $R$; splitting by mass ratio gives the block displacement $-mR/(M+m)$.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["momentum-conservation", "centre-of-mass", "energy-conservation"],
  },
  {
    id: "pyq-ja17-p1-q3",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "waves",
    chapterTitle: "Waves",
    isRepeat: false,
    repeatYears: [],
    content:
      "A block $M$ hangs vertically at the bottom end of a uniform rope of constant mass per unit length. The top end of the rope is attached to a fixed rigid support at $O$. A transverse wave pulse (Pulse 1) of wavelength $\\lambda_0$ is produced at point $O$ on the rope. The pulse takes time $T_{OA}$ to reach point $A$. If the wave pulse of wavelength $\\lambda_0$ is produced at point $A$ (Pulse 2) without disturbing the position of $M$, it takes time $T_{AO}$ to reach point $O$. Which of the following options is/are correct?\n\n<svg width='200' height='250' viewBox='0 0 200 250' xmlns='http://www.w3.org/2000/svg'><rect x='55' y='15' width='90' height='12' fill='#94a3b8'/><line x1='100' y1='27' x2='100' y2='200' stroke='#334155' stroke-width='3'/><text x='78' y='42' font-size='13' font-style='italic'>O</text><text x='110' y='44' font-size='11'>Pulse 1</text><rect x='82' y='200' width='36' height='30' fill='#e8f0fe' stroke='#1e40af' stroke-width='2'/><text x='95' y='220' font-size='13' fill='#1e40af'>M</text><text x='66' y='220' font-size='13' font-style='italic'>A</text><text x='110' y='197' font-size='11'>Pulse 2</text></svg>",
    options: [
      { id: "A", content: "The time $T_{AO} = T_{OA}$" },
      { id: "B", content: "The velocities of the two pulses (Pulse 1 and Pulse 2) are the same at the midpoint of rope" },
      { id: "C", content: "The wavelength of Pulse 1 becomes longer when it reaches point $A$" },
      { id: "D", content: "The velocity of any pulse along the rope is independent of its frequency and wavelength" },
    ],
    correctAnswer: ["A", "D"],
    solution:
      "Tension at height $y$ above the block is $T(y) = (M + \\mu y)g$, so the wave speed $v = \\sqrt{T/\\mu}$ depends only on position. The total travel time $\\int dy/v(y)$ is the same in both directions, so $T_{AO} = T_{OA}$ [A].\nA transverse pulse on a string is non-dispersive — its speed depends on tension and linear density, not on frequency or wavelength [D].\n[C] is false: going down from $O$ to $A$ the tension decreases, so $v$ decreases and $\\lambda = v/f$ becomes shorter, not longer.",
    hint: "Wave speed on a rope depends only on the local tension, which varies with height.",
    explanation: "Tension is largest near the support and least near the block, so the pulse slows as it descends.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["transverse-waves", "wave-speed", "tension", "non-dispersive"],
  },
  {
    id: "pyq-ja17-p1-q4",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "thermal-physics",
    chapterTitle: "Thermal Physics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A human body has a surface area of approximately $1\\ \\text{m}^2$. The normal body temperature is $10\\ \\text{K}$ above the surrounding room temperature $T_0$. Take the room temperature to be $T_0 = 300\\ \\text{K}$. For $T_0 = 300\\ \\text{K}$, the value of $\\sigma T_0^4 = 460\\ \\text{Wm}^{-2}$ (where $\\sigma$ is the Stefan–Boltzmann constant). Which of the following options is/are correct?",
    options: [
      { id: "A", content: "The amount of energy radiated by the body in 1 second is close to 60 Joules" },
      { id: "B", content: "If the surrounding temperature reduces by a small amount $\\Delta T_0 \\ll T_0$, then to maintain the same body temperature the same (living) human being needs to radiate $\\Delta W = 4\\sigma T_0^3\\,\\Delta T_0$ more energy per unit time" },
      { id: "C", content: "Reducing the exposed surface area of the body (e.g. by curling up) allows humans to maintain the same body temperature while reducing the energy lost by radiation" },
      { id: "D", content: "If the body temperature rises significantly then the peak in the spectrum of electromagnetic radiation emitted by the body would shift to longer wavelengths" },
    ],
    correctAnswer: ["C"],
    solution:
      "The total power radiated by the body is $\\sigma A T^4 = \\sigma A (310)^4 \\approx 460 \\times (310/300)^4 \\approx 524\\ \\text{W}$, far from 60 J, so [A] is wrong.\n[B] is wrong: the body radiates $\\sigma A T_{body}^4$, which does not change when $T_0$ changes; the extra requirement is on net loss, and the phrasing \"radiate more\" is incorrect.\n[C] is correct: radiated power $\\propto$ exposed area, so curling up lowers the loss.\n[D] is wrong: by Wien's law $\\lambda_{peak} \\propto 1/T$, so a higher temperature shifts the peak to shorter wavelengths.",
    hint: "Distinguish total radiated power ($\\sigma A T^4$) from net loss; recall Wien's displacement law.",
    explanation: "Wien: $\\lambda_{peak} T = \\text{const}$, so hotter bodies peak at shorter wavelengths.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["stefan-boltzmann", "radiation", "wien-law"],
  },
  {
    id: "pyq-ja17-p1-q5",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "electromagnetic-induction",
    chapterTitle: "Electromagnetic Induction (EMI)",
    isRepeat: false,
    repeatYears: [],
    content:
      "A circular insulated copper wire loop is twisted to form two loops of area $A$ and $2A$ as shown. At the point of crossing the wires remain electrically insulated from each other. The entire loop lies in the plane (of the paper). A uniform magnetic field $\\vec{B}$ points into the plane of the paper. At $t = 0$, the loop starts rotating about the common diameter as axis with a constant angular velocity $\\omega$ in the magnetic field. Which of the following options is/are correct?\n\n<svg width='240' height='280' viewBox='0 0 240 280' xmlns='http://www.w3.org/2000/svg'><g fill='#64748b' font-size='12'><text x='45' y='40'>×</text><text x='110' y='40'>×</text><text x='175' y='40'>×</text><text x='45' y='95'>×</text><text x='175' y='95'>×</text><text x='45' y='150'>×</text><text x='175' y='150'>×</text><text x='45' y='205'>×</text><text x='175' y='205'>×</text><text x='110' y='240'>×</text></g><circle cx='120' cy='80' r='45' fill='none' stroke='#1e40af' stroke-width='2'/><text x='98' y='84' font-size='12'>area A</text><circle cx='120' cy='185' r='62' fill='none' stroke='#1e40af' stroke-width='2'/><text x='98' y='189' font-size='12'>area 2A</text><text x='150' y='52' font-size='15' font-weight='bold'>B</text><line x1='120' y1='18' x2='120' y2='258' stroke='#334155' stroke-dasharray='5 4'/><text x='100' y='274' font-size='14'>ω</text></svg>",
    options: [
      { id: "A", content: "The emf induced in the loop is proportional to the sum of the areas of the two loops" },
      { id: "B", content: "The amplitude of the maximum net emf induced due to both the loops is equal to the amplitude of maximum emf induced in the smaller loop alone" },
      { id: "C", content: "The net emf induced due to both the loops is proportional to $\\cos\\omega t$" },
      { id: "D", content: "The rate of change of the flux is maximum when the plane of the loops is perpendicular to plane of the paper" },
    ],
    correctAnswer: ["B", "D"],
    solution:
      "Because the loop is twisted, the two loops are wound in opposite senses, so their emfs subtract: $\\varepsilon_{net} = B(2A)\\omega\\sin\\omega t - BA\\omega\\sin\\omega t = BA\\omega\\sin\\omega t$.\n[A] is wrong — the net emf $\\propto (2A - A) = A$, not the sum $3A$.\n[B] is correct — the net amplitude $BA\\omega$ equals the amplitude of the smaller loop alone.\n[C] is wrong — $\\varepsilon \\propto \\sin\\omega t$, not $\\cos\\omega t$ (flux is maximum at $t = 0$).\n[D] is correct — $d\\Phi/dt$ is maximum when the loop plane contains $\\vec{B}$, i.e. is perpendicular to the paper.",
    hint: "Opposite winding sense means the two emfs subtract.",
    explanation: "$\\Phi = B\\,\\text{area}\\cos\\omega t \\Rightarrow \\varepsilon = -d\\Phi/dt \\propto \\sin\\omega t$; net $\\propto (2A-A)$.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["emi", "rotating-loop", "faraday-law"],
  },
  {
    id: "pyq-ja17-p1-q6",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "alternating-current",
    chapterTitle: "Alternating Current (AC)",
    isRepeat: false,
    repeatYears: [],
    content:
      "In the circuit shown, $L = 1\\ \\mu\\text{H}$, $C = 1\\ \\mu\\text{F}$ and $R = 1\\ \\text{k}\\Omega$. They are connected in series with an a.c. source $V = V_0\\sin\\omega t$ as shown. Which of the following options is/are correct?\n\n<svg width='340' height='120' viewBox='0 0 340 120' xmlns='http://www.w3.org/2000/svg'><line x1='40' y1='30' x2='80' y2='30' stroke='#334155' stroke-width='2'/><path d='M80,30 q5,-12 10,0 q5,-12 10,0 q5,-12 10,0 q5,-12 10,0' fill='none' stroke='#1e40af' stroke-width='2'/><text x='88' y='15' font-size='10'>L</text><line x1='120' y1='30' x2='152' y2='30' stroke='#334155' stroke-width='2'/><line x1='158' y1='17' x2='158' y2='43' stroke='#1e40af' stroke-width='2'/><line x1='166' y1='17' x2='166' y2='43' stroke='#1e40af' stroke-width='2'/><text x='156' y='13' font-size='10'>C</text><line x1='166' y1='30' x2='195' y2='30' stroke='#334155' stroke-width='2'/><path d='M195,30 l6,-9 l8,18 l8,-18 l8,18 l6,-9' fill='none' stroke='#1e40af' stroke-width='2'/><text x='212' y='17' font-size='10'>R</text><line x1='231' y1='30' x2='300' y2='30' stroke='#334155' stroke-width='2'/><line x1='300' y1='30' x2='300' y2='92' stroke='#334155' stroke-width='2'/><line x1='40' y1='30' x2='40' y2='92' stroke='#334155' stroke-width='2'/><circle cx='170' cy='92' r='16' fill='none' stroke='#334155' stroke-width='2'/><text x='163' y='97' font-size='13'>~</text><line x1='40' y1='92' x2='154' y2='92' stroke='#334155' stroke-width='2'/><line x1='186' y1='92' x2='300' y2='92' stroke='#334155' stroke-width='2'/><text x='150' y='114' font-size='10'>V₀ sin ωt</text></svg>",
    options: [
      { id: "A", content: "The current will be in phase with the voltage if $\\omega = 10^4\\ \\text{rad.s}^{-1}$" },
      { id: "B", content: "The frequency at which the current will be in phase with the voltage is independent of $R$" },
      { id: "C", content: "At $\\omega \\sim 0$ the current flowing through the circuit becomes nearly zero" },
      { id: "D", content: "At $\\omega \\gg 10^6\\ \\text{rad.s}^{-1}$, the circuit behaves like a capacitor" },
    ],
    correctAnswer: ["B", "C"],
    solution:
      "Resonance (current in phase with voltage) occurs at $\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = \\dfrac{1}{\\sqrt{10^{-6}\\cdot10^{-6}}} = 10^6\\ \\text{rad.s}^{-1}$.\n[A] is wrong ($10^4 \\ne 10^6$). [B] is correct — $\\omega_0$ does not depend on $R$.\n[C] is correct — as $\\omega \\to 0$, $X_C = 1/(\\omega C) \\to \\infty$ blocks the current.\n[D] is wrong — for $\\omega \\gg \\omega_0$, $X_L = \\omega L$ dominates, so the circuit behaves like an inductor, not a capacitor.",
    hint: "Resonance: $\\omega_0 = 1/\\sqrt{LC}$, independent of $R$.",
    explanation: "Low $\\omega$: capacitor blocks; high $\\omega$: inductor dominates.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["lcr-series", "resonance", "reactance"],
  },
  {
    id: "pyq-ja17-p1-q7",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "For an isosceles prism of angle $A$ and refractive index $\\mu$, it is found that the angle of minimum deviation $\\delta_m = A$. Which of the following options is/are correct?",
    options: [
      { id: "A", content: "For the angle of incidence $i_1 = A$, the ray inside the prism is parallel to the base of the prism" },
      { id: "B", content: "For this prism, the refractive index $\\mu$ and the angle of prism $A$ are related as $A = \\frac{1}{2}\\cos^{-1}\\left(\\frac{\\mu}{2}\\right)$" },
      { id: "C", content: "At minimum deviation, the incident angle $i_1$ and the refracting angle $r_1$ at the first refracting surface are related by $r_1 = (i_1/2)$" },
      { id: "D", content: "For this prism, the emergent ray at the second surface will be tangential to the surface when the angle of incidence at the first surface is $i_1 = \\sin^{-1}\\left[\\sin A\\sqrt{4\\cos^2\\frac{A}{2}-1} - \\cos A\\right]$" },
    ],
    correctAnswer: ["A", "C", "D"],
    solution:
      "With $\\delta_m = A$: $\\mu = \\dfrac{\\sin\\frac{A+\\delta_m}{2}}{\\sin\\frac{A}{2}} = \\dfrac{\\sin A}{\\sin\\frac{A}{2}} = 2\\cos\\frac{A}{2}$.\n[A] correct: at minimum deviation $i_1 = \\frac{A+\\delta_m}{2} = A$, and the ray inside runs parallel to the base.\n[B] wrong: $\\mu = 2\\cos\\frac{A}{2} \\Rightarrow A = 2\\cos^{-1}\\!\\left(\\frac{\\mu}{2}\\right)$, not $\\frac{1}{2}\\cos^{-1}(\\mu/2)$.\n[C] correct: at minimum deviation $r_1 = A/2$ and $i_1 = A$, so $r_1 = i_1/2$.\n[D] correct: setting the second-surface refraction angle to $90^\\circ$ (grazing emergence) and using $\\mu = 2\\cos\\frac{A}{2}$ gives the stated $i_1$.",
    hint: "At minimum deviation the path is symmetric: $i_1 = (A+\\delta_m)/2$ and $r_1 = A/2$.",
    explanation: "$\\mu = 2\\cos(A/2)$ is the key relation for $\\delta_m = A$.",
    type: "MCQ_MULTIPLE",
    difficulty: "ADVANCED",
    marks: 4,
    negativeMarks: 2,
    tags: ["prism", "minimum-deviation", "refraction"],
  },
  {
    id: "pyq-ja17-p1-q8",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "properties-of-matter",
    chapterTitle: "Properties of Matter",
    isRepeat: false,
    repeatYears: [],
    content:
      "A drop of liquid of radius $R = 10^{-2}\\ \\text{m}$ having surface tension $S = \\dfrac{0.1}{4\\pi}\\ \\text{Nm}^{-1}$ divides itself into $K$ identical drops. In this process the total change in the surface energy $\\Delta U = 10^{-3}\\ \\text{J}$. If $K = 10^\\alpha$ then the value of $\\alpha$ is",
    options: null,
    correctAnswer: 6,
    solution:
      "Volume is conserved: $r = R/K^{1/3}$. The increase in surface energy is\n$\\Delta U = S\\,(K\\cdot 4\\pi r^2 - 4\\pi R^2) = 4\\pi S R^2\\left(K^{1/3} - 1\\right)$.\nSubstituting $S = \\frac{0.1}{4\\pi}$ and $R = 10^{-2}$:\n$\\Delta U = 0.1\\times10^{-4}\\left(K^{1/3}-1\\right) = 10^{-5}\\left(K^{1/3}-1\\right)$.\nSetting $\\Delta U = 10^{-3}$: $K^{1/3} - 1 = 100 \\approx K^{1/3}$, so $K = 10^6$ and $\\alpha = 6$.",
    hint: "Surface energy change $= S \\times$ (increase in total surface area).",
    explanation: "Smaller drops have far more total area, raising the surface energy.",
    type: "INTEGER",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 0,
    tags: ["surface-tension", "surface-energy", "drops"],
  },
  {
    id: "pyq-ja17-p1-q9",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "atoms",
    chapterTitle: "Atoms",
    isRepeat: false,
    repeatYears: [],
    content:
      "An electron in a hydrogen atom undergoes a transition from an orbit with quantum number $n_i$ to another with quantum number $n_f$. $V_i$ and $V_f$ are respectively the initial and final potential energies of the electron. If $\\dfrac{V_i}{V_f} = 6.25$, then the smallest possible $n_f$ is",
    options: null,
    correctAnswer: 5,
    solution:
      "The potential energy of the electron is $V_n \\propto -\\dfrac{1}{n^2}$, so $\\dfrac{V_i}{V_f} = \\dfrac{n_f^2}{n_i^2} = 6.25 = \\left(\\dfrac{5}{2}\\right)^2$.\nHence $\\dfrac{n_f}{n_i} = \\dfrac{5}{2}$. The smallest integers satisfying this are $n_i = 2$, $n_f = 5$. So the smallest possible $n_f = 5$.",
    hint: "Potential energy in the Bohr model scales as $1/n^2$.",
    explanation: "$6.25 = (5/2)^2$ forces $n_f : n_i = 5 : 2$.",
    type: "INTEGER",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 0,
    tags: ["bohr-model", "hydrogen-atom", "potential-energy"],
  },
  {
    id: "pyq-ja17-p1-q10",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A monochromatic light is travelling in a medium of refractive index $n = 1.6$. It enters a stack of glass layers from the bottom side at an angle $\\theta = 30^\\circ$. The interfaces of the glass layers are parallel to each other. The refractive indices of different glass layers are monotonically decreasing as $n_m = n - m\\Delta n$, where $n_m$ is the refractive index of the $m^{th}$ slab and $\\Delta n = 0.1$. The ray is refracted out parallel to the interface between the $(m-1)^{th}$ and $m^{th}$ slabs from the right side of the stack. What is the value of $m$?\n\n<svg width='300' height='220' viewBox='0 0 300 220' xmlns='http://www.w3.org/2000/svg'><rect x='60' y='30' width='180' height='22' fill='#eff6ff' stroke='#94a3b8'/><text x='66' y='45' font-size='9'>m      n − mΔn</text><rect x='60' y='52' width='180' height='22' fill='#dbeafe' stroke='#94a3b8'/><text x='66' y='67' font-size='9'>m−1   n − (m−1)Δn</text><rect x='60' y='95' width='180' height='20' fill='#eff6ff' stroke='#94a3b8'/><text x='66' y='109' font-size='9'>2      n − 2Δn</text><rect x='60' y='115' width='180' height='20' fill='#dbeafe' stroke='#94a3b8'/><text x='66' y='129' font-size='9'>1      n − Δn</text><rect x='60' y='135' width='180' height='22' fill='#bfdbfe' stroke='#94a3b8'/><text x='66' y='150' font-size='9'>n</text><line x1='90' y1='205' x2='130' y2='157' stroke='#dc2626' stroke-width='1.5'/><line x1='130' y1='157' x2='152' y2='135' stroke='#dc2626' stroke-width='1.5'/><line x1='152' y1='135' x2='180' y2='95' stroke='#dc2626' stroke-width='1.5' stroke-dasharray='3 2'/><line x1='180' y1='63' x2='245' y2='63' stroke='#dc2626' stroke-width='1.5'/><text x='92' y='200' font-size='10'>θ=30°</text></svg>",
    options: null,
    correctAnswer: 8,
    solution:
      "Snell's law across the parallel interfaces keeps $n_m\\sin\\theta_m$ constant: $n\\sin\\theta = 1.6\\sin 30^\\circ = 0.8$.\nThe ray emerges parallel to an interface when the refraction angle is $90^\\circ$, i.e. $n_m\\sin 90^\\circ = 0.8$, so $n_m = 0.8$.\nWith $n_m = n - m\\Delta n = 1.6 - 0.1\\,m = 0.8 \\Rightarrow m = 8$.",
    hint: "The product $n\\sin\\theta$ is conserved across parallel layers; grazing emergence means the angle is $90^\\circ$.",
    explanation: "Set $n_m = n\\sin\\theta = 0.8$ and solve $1.6 - 0.1m = 0.8$.",
    type: "INTEGER",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 0,
    tags: ["snells-law", "refraction", "layered-medium"],
  },
  {
    id: "pyq-ja17-p1-q11",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "sound-waves",
    chapterTitle: "Sound Waves",
    isRepeat: false,
    repeatYears: [],
    content:
      "A stationary source emits sound of frequency $f_0 = 492\\ \\text{Hz}$. The sound is reflected by a large car approaching the source with a speed of $2\\ \\text{ms}^{-1}$. The reflected signal is received by the source and superposed with the original. What will be the beat frequency of the resulting signal in Hz? (Given that the speed of sound in air is $330\\ \\text{ms}^{-1}$ and the car reflects the sound at the frequency it has received.)",
    options: null,
    correctAnswer: 6,
    solution:
      "The car (a moving observer approaching) receives $f_1 = f_0\\dfrac{c+v}{c}$. It re-emits $f_1$ as a moving source approaching the source, which receives $f_2 = f_1\\dfrac{c}{c-v} = f_0\\dfrac{c+v}{c-v}$.\n$f_2 = 492\\times\\dfrac{332}{328}$. Beat frequency $= f_2 - f_0 = 492\\left(\\dfrac{332}{328}-1\\right) = 492\\times\\dfrac{4}{328} = 6\\ \\text{Hz}$.",
    hint: "Apply the Doppler effect twice — car as observer, then car as source.",
    explanation: "$f_2 = f_0(c+v)/(c-v)$; beats $= f_2 - f_0 = 6$ Hz.",
    type: "INTEGER",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 0,
    tags: ["doppler-effect", "beats", "reflection"],
  },
  {
    id: "pyq-ja17-p1-q12",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "nuclei",
    chapterTitle: "Nuclei",
    isRepeat: false,
    repeatYears: [],
    content:
      "$^{131}\\text{I}$ is an isotope of Iodine that $\\beta$ decays to an isotope of Xenon with a half-life of 8 days. A small amount of a serum labelled with $^{131}\\text{I}$ is injected into the blood of a person. The activity of the amount of $^{131}\\text{I}$ injected was $2.4\\times10^5$ Becquerel (Bq). It is known that the injected serum will get distributed uniformly in the blood stream in less than half an hour. After 11.5 hours, 2.5 ml of blood is drawn from the person's body, and gives an activity of 115 Bq. The total volume of blood in the person's body, in liters is approximately (you may use $e^x \\approx 1+x$ for $|x|\\ll1$ and $\\ln 2 \\approx 0.7$).",
    options: null,
    correctAnswer: 5,
    solution:
      "Decay constant $\\lambda = \\dfrac{\\ln 2}{8\\times24}$ per hour. After $t = 11.5$ h, the surviving fraction is $e^{-\\lambda t} = e^{-0.7\\times11.5/192} \\approx 1 - 0.042 \\approx 0.958$.\nTotal remaining activity $= 2.4\\times10^5\\times0.958 \\approx 2.3\\times10^5$ Bq.\nMeasured concentration $= 115\\ \\text{Bq} / 2.5\\ \\text{ml} = 46\\ \\text{Bq/ml}$.\nTotal blood volume $= \\dfrac{2.3\\times10^5}{46} = 5000\\ \\text{ml} = 5$ litres.",
    hint: "Account for radioactive decay over 11.5 h, then divide total activity by the measured activity per ml.",
    explanation: "Volume $=$ total remaining activity $\\div$ activity per unit volume.",
    type: "INTEGER",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 0,
    tags: ["radioactivity", "half-life", "activity"],
  },
  {
    id: "pyq-ja17-p1-q13",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism & Moving Charges",
    isRepeat: false,
    repeatYears: [],
    content:
      "In which case will the particle move in a straight line with **constant** velocity?\n\nA charged particle (electron or proton) is introduced at the origin with a given initial velocity $\\vec{v}$, in uniform fields $\\vec{E}$ and $\\vec{B}$ ($E_0, B_0 > 0$). Match using the table:\n\n" +
      ADV17_EB_TABLE,
    options: [
      { id: "A", content: "(III) (ii) (R)" },
      { id: "B", content: "(IV) (i) (S)" },
      { id: "C", content: "(III) (iii) (P)" },
      { id: "D", content: "(II) (iii) (S)" },
    ],
    correctAnswer: "D",
    solution:
      "Constant velocity needs zero net force: $q(\\vec{E} + \\vec{v}\\times\\vec{B}) = 0$.\nTake (II) electron $\\vec{v} = \\frac{E_0}{B_0}\\hat{y}$, (iii) $\\vec{E} = -E_0\\hat{x}$, (S) $\\vec{B} = B_0\\hat{z}$:\n$\\vec{v}\\times\\vec{B} = \\frac{E_0}{B_0}\\hat{y}\\times B_0\\hat{z} = E_0\\hat{x}$. For the electron ($q = -e$): $\\vec{F} = -e(-E_0\\hat{x} + E_0\\hat{x}) = 0$. The particle moves with constant velocity. Hence (II)(iii)(S).",
    hint: "Net force zero requires the electric force to cancel the magnetic force $q\\vec{v}\\times\\vec{B}$.",
    explanation: "This is the velocity-selector condition $E = vB$ with the forces opposed.",
    type: "MCQ_SINGLE",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 1,
    tags: ["lorentz-force", "velocity-selector", "matching"],
  },
  {
    id: "pyq-ja17-p1-q14",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism & Moving Charges",
    isRepeat: false,
    repeatYears: [],
    content:
      "In which case will the particle describe a helical path with axis along the positive $z$ direction?\n\nA charged particle (electron or proton) is introduced at the origin with a given initial velocity $\\vec{v}$, in uniform fields $\\vec{E}$ and $\\vec{B}$ ($E_0, B_0 > 0$). Match using the table:\n\n" +
      ADV17_EB_TABLE,
    options: [
      { id: "A", content: "(IV) (i) (S)" },
      { id: "B", content: "(II) (ii) (R)" },
      { id: "C", content: "(III) (iii) (P)" },
      { id: "D", content: "(IV) (ii) (R)" },
    ],
    correctAnswer: "A",
    solution:
      "A helix with axis along $+z$ needs $\\vec{B}$ along $z$ (circular motion in the $xy$-plane) plus an accelerating force along $+z$.\nTake (IV) proton $\\vec{v} = 2\\frac{E_0}{B_0}\\hat{x}$, (i) $\\vec{E} = E_0\\hat{z}$, (S) $\\vec{B} = B_0\\hat{z}$:\n$\\vec{B}\\parallel\\hat{z}$ makes the $x$-velocity circulate in the $xy$-plane, while $\\vec{E} = E_0\\hat{z}$ accelerates the proton along $+z$. The result is a helix of increasing pitch with axis $+z$. Hence (IV)(i)(S).",
    hint: "Helix axis = direction of $\\vec{B}$; an $E$ along that axis gives the forward drift.",
    explanation: "Circular motion (from $\\vec{v}\\perp\\vec{B}$) plus uniform $+z$ acceleration = helix along $+z$.",
    type: "MCQ_SINGLE",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 1,
    tags: ["helical-motion", "lorentz-force", "matching"],
  },
  {
    id: "pyq-ja17-p1-q15",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism & Moving Charges",
    isRepeat: false,
    repeatYears: [],
    content:
      "In which case would the particle move in a straight line along the negative direction of the $y$-axis (i.e. move along $-\\hat{y}$)?\n\nA charged particle (electron or proton) is introduced at the origin with a given initial velocity $\\vec{v}$, in uniform fields $\\vec{E}$ and $\\vec{B}$ ($E_0, B_0 > 0$). Match using the table:\n\n" +
      ADV17_EB_TABLE,
    options: [
      { id: "A", content: "(II) (iii) (Q)" },
      { id: "B", content: "(III) (ii) (R)" },
      { id: "C", content: "(IV) (ii) (S)" },
      { id: "D", content: "(III) (ii) (P)" },
    ],
    correctAnswer: "B",
    solution:
      "Take (III) proton $\\vec{v} = 0$, (ii) $\\vec{E} = -E_0\\hat{y}$, (R) $\\vec{B} = B_0\\hat{y}$:\nInitially $\\vec{v} = 0$, so the magnetic force is zero. The electric force $q\\vec{E} = e(-E_0\\hat{y})$ pushes the proton along $-\\hat{y}$. As it speeds up, its velocity stays parallel to $\\vec{B}\\,(\\parallel\\hat{y})$, so $\\vec{v}\\times\\vec{B} = 0$ throughout. The proton moves in a straight line along $-\\hat{y}$. Hence (III)(ii)(R).",
    hint: "If the velocity stays parallel to $\\vec{B}$, the magnetic force is always zero.",
    explanation: "$\\vec{E}$ along $-\\hat{y}$ and $\\vec{B}$ along $\\hat{y}$: motion stays collinear with $\\vec{B}$, so only $\\vec{E}$ acts.",
    type: "MCQ_SINGLE",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 1,
    tags: ["lorentz-force", "straight-line-motion", "matching"],
  },
  {
    id: "pyq-ja17-p1-q16",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "thermodynamics",
    chapterTitle: "Thermodynamics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Which of the following options is the only correct representation of a process in which $\\Delta U = \\Delta Q - P\\Delta V$?\n\nAn ideal gas undergoes a cyclic process; consider only the path from state 1 to state 2. $W$ is the work done on the gas. Match using the table:\n\n" +
      ADV17_PV_TABLE,
    options: [
      { id: "A", content: "(II) (iv) (R)" },
      { id: "B", content: "(III) (iii) (P)" },
      { id: "C", content: "(II) (iii) (S)" },
      { id: "D", content: "(II) (iii) (P)" },
    ],
    correctAnswer: "D",
    solution:
      "$\\Delta U = \\Delta Q - P\\Delta V$ is the first law with work on the gas $W = -P\\Delta V$ — this is an isobaric (constant-pressure) process.\nColumn 1: (II) $W_{1\\to2} = -PV_2 + PV_1 = -P\\Delta V$. Column 2: (iii) Isobaric. Column 3: (P) the horizontal $P$–$V$ line. Hence (II)(iii)(P).",
    hint: "$W = -P\\Delta V$ (constant $P$) corresponds to an isobaric process.",
    explanation: "Constant pressure $\\Rightarrow$ horizontal line on the $P$–$V$ diagram.",
    type: "MCQ_SINGLE",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 1,
    tags: ["first-law", "isobaric", "matching"],
  },
  {
    id: "pyq-ja17-p1-q17",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "thermodynamics",
    chapterTitle: "Thermodynamics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Which one of the following options is the correct combination?\n\nAn ideal gas undergoes a cyclic process; consider only the path from state 1 to state 2. $W$ is the work done on the gas. Match using the table:\n\n" +
      ADV17_PV_TABLE,
    options: [
      { id: "A", content: "(IV) (ii) (S)" },
      { id: "B", content: "(III) (ii) (S)" },
      { id: "C", content: "(II) (iv) (P)" },
      { id: "D", content: "(II) (iv) (R)" },
    ],
    correctAnswer: "B",
    solution:
      "Column 1: (III) $W_{1\\to2} = 0$ means no work, which happens at constant volume. Column 2: (ii) Isochoric. Column 3: (S) the vertical $P$–$V$ line (constant $V$). Hence (III)(ii)(S).",
    hint: "Zero work on the gas means no change in volume.",
    explanation: "Isochoric $\\Rightarrow$ vertical line on the $P$–$V$ diagram, $W = 0$.",
    type: "MCQ_SINGLE",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 1,
    tags: ["isochoric", "work-done", "matching"],
  },
  {
    id: "pyq-ja17-p1-q18",
    exam: "JEE_ADVANCED",
    year: 2017,
    session: "Paper 1",
    chapterSlug: "thermodynamics",
    chapterTitle: "Thermodynamics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Which one of the following options correctly represents a thermodynamic process that is used as a correction in the determination of the speed of sound in an ideal gas?\n\nAn ideal gas undergoes a cyclic process; consider only the path from state 1 to state 2. $W$ is the work done on the gas. Match using the table:\n\n" +
      ADV17_PV_TABLE,
    options: [
      { id: "A", content: "(I) (ii) (Q)" },
      { id: "B", content: "(IV) (ii) (R)" },
      { id: "C", content: "(III) (iv) (R)" },
      { id: "D", content: "(I) (iv) (Q)" },
    ],
    correctAnswer: "D",
    solution:
      "Laplace's correction to Newton's formula for the speed of sound treats sound propagation as an adiabatic process.\nColumn 1: (I) $W_{1\\to2} = \\frac{1}{\\gamma-1}(P_2V_2 - P_1V_1)$ is the adiabatic work. Column 2: (iv) Adiabatic. Column 3: (Q) the steeper adiabatic curve. Hence (I)(iv)(Q).",
    hint: "Sound propagation in a gas is adiabatic (Laplace correction).",
    explanation: "Adiabatic work $W = \\frac{1}{\\gamma-1}(P_2V_2 - P_1V_1)$; the $P$–$V$ curve is steeper than the isotherm.",
    type: "MCQ_SINGLE",
    difficulty: "ADVANCED",
    marks: 3,
    negativeMarks: 1,
    tags: ["adiabatic", "speed-of-sound", "laplace-correction", "matching"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // JEE MAIN 2019 — 12 January, Shift 1  ·  PHYSICS  ·  Q1–Q30
  // Source: official question paper + answer key. session encodes month + shift.
  // tags[0] = topic, tags[1] = subtopic (for the topic filter / classification).
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pyq-jm19-12jan-s1-q1",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "kinetic-theory-of-gases",
    chapterTitle: "Kinetic Theory of Gases",
    isRepeat: false,
    repeatYears: [],
    content:
      "An ideal gas occupies a volume of $2\\,\\text{m}^3$ at a pressure of $3\\times10^{6}\\,\\text{Pa}$. The energy of the gas is:",
    options: [
      { id: "A", content: "$9\\times10^{6}\\,\\text{J}$" },
      { id: "B", content: "$6\\times10^{4}\\,\\text{J}$" },
      { id: "C", content: "$10^{8}\\,\\text{J}$" },
      { id: "D", content: "$3\\times10^{2}\\,\\text{J}$" },
    ],
    correctAnswer: "A",
    solution:
      "**Step 1 — Internal energy of an ideal gas.** $U=\\dfrac{f}{2}nRT=\\dfrac{f}{2}PV$. With no atomicity stated, JEE takes the translational/monatomic value $f=3$.\n**Step 2 — Substitute.** $U=\\dfrac{3}{2}PV=\\dfrac{3}{2}(3\\times10^{6})(2)=9\\times10^{6}\\,\\text{J}$.\n\n**Shortcut:** Recognise $PV$ has units of energy; multiply by $3/2$.\n**Common mistake:** Using $f=5$ (diatomic) gives $1.5\\times10^{7}$ — not an option; the intended answer is monatomic. Forgetting the $3/2$ factor gives $6\\times10^{6}$.\n**Concept tested:** Equipartition of energy, $U=\\frac{f}{2}PV$.\n**Difficulty:** Easy · **Time:** ~40 s.",
    hint: "Internal energy $U=\\frac{f}{2}PV$; take $f=3$.",
    explanation: "Energy of an ideal gas is $\\frac{3}{2}PV$ for the translational (monatomic) case.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Internal Energy", "Equipartition of Energy", "ideal-gas", "PV"],
  },
  {
    id: "pyq-jm19-12jan-s1-q2",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "waves",
    chapterTitle: "Waves",
    isRepeat: false,
    repeatYears: [],
    content:
      "A travelling harmonic wave is represented by $y(x,t)=10^{-3}\\sin(50t+2x)$, where $x$ and $y$ are in metre and $t$ is in second. Which of the following is a correct statement about the wave?",
    options: [
      { id: "A", content: "Propagating along negative $x$-axis with speed $25\\,\\text{ms}^{-1}$" },
      { id: "B", content: "Propagating along positive $x$-axis with speed $100\\,\\text{ms}^{-1}$" },
      { id: "C", content: "Propagating along positive $x$-axis with speed $25\\,\\text{ms}^{-1}$" },
      { id: "D", content: "Propagating along negative $x$-axis with speed $100\\,\\text{ms}^{-1}$" },
    ],
    correctAnswer: "A",
    solution:
      "**Step 1 — Read off $\\omega$ and $k$.** Comparing with $y=A\\sin(\\omega t+kx)$: $\\omega=50\\,\\text{rad/s}$, $k=2\\,\\text{rad/m}$.\n**Step 2 — Speed.** $v=\\dfrac{\\omega}{k}=\\dfrac{50}{2}=25\\,\\text{ms}^{-1}$.\n**Step 3 — Direction.** The form $(\\omega t+kx)$ — i.e. $+kx$ — means the wave moves along the $-x$ direction.\n\n**Shortcut:** Same sign of $t$ and $x$ ⇒ negative-$x$ travel; opposite signs ⇒ positive-$x$.\n**Common mistake:** Assuming $+x$ direction from the $+2x$ term; the rule is the opposite. Using $v=\\omega k$ instead of $\\omega/k$.\n**Concept tested:** Wave equation, phase velocity, direction of propagation.\n**Difficulty:** Easy · **Time:** ~45 s.",
    hint: "$v=\\omega/k$; the sign of $kx$ relative to $\\omega t$ fixes the direction.",
    explanation: "$(\\omega t+kx)$ travels in $-x$; $v=\\omega/k=25$ m/s.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Travelling Waves", "Wave Speed & Direction", "phase-velocity"],
  },
  {
    id: "pyq-jm19-12jan-s1-q3",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    isRepeat: false,
    repeatYears: [],
    content:
      "An ideal battery of $4\\,\\text{V}$ and resistance $R$ are connected in series in the primary circuit of a potentiometer of length $1\\,\\text{m}$ and resistance $5\\,\\Omega$. The value of $R$, to give a potential difference of $5\\,\\text{mV}$ across $10\\,\\text{cm}$ of potentiometer wire, is:",
    options: [
      { id: "A", content: "$490\\,\\Omega$" },
      { id: "B", content: "$480\\,\\Omega$" },
      { id: "C", content: "$395\\,\\Omega$" },
      { id: "D", content: "$495\\,\\Omega$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Potential across the whole wire.** $5\\,\\text{mV}$ falls across $10\\,\\text{cm}$, so across the full $100\\,\\text{cm}$ wire: $V_{\\text{wire}}=5\\times10=50\\,\\text{mV}=0.05\\,\\text{V}$.\n**Step 2 — Primary current.** All of it flows through the $5\\,\\Omega$ wire: $I=\\dfrac{V_{\\text{wire}}}{R_{\\text{wire}}}=\\dfrac{0.05}{5}=0.01\\,\\text{A}$.\n**Step 3 — Apply Kirchhoff to the primary loop.** $4=I(R+R_{\\text{wire}})=0.01(R+5)$ ⇒ $R+5=400$ ⇒ $R=395\\,\\Omega$.\n\n**Shortcut:** Potential gradient $\\times$ full length = wire drop; the rest of the EMF is across $R$.\n**Common mistake:** Using the $5\\,\\text{mV}$ value directly (forgetting to scale $10\\,\\text{cm}\\to100\\,\\text{cm}$), or dropping the $+5\\,\\Omega$ wire resistance.\n**Concept tested:** Potentiometer potential gradient, series primary circuit.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "Scale the 10 cm drop to the full 1 m, get the wire current, then KVL on the primary.",
    explanation: "$I=0.05/5=0.01$ A; $4=0.01(R+5)\\Rightarrow R=395\\,\\Omega$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Potentiometer", "Potential Gradient", "primary-circuit"],
  },
  {
    id: "pyq-jm19-12jan-s1-q4",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    isRepeat: false,
    repeatYears: [],
    content:
      "In a meter bridge, the wire of length $1\\,\\text{m}$ has a non-uniform cross-section such that the variation $\\dfrac{dR}{dl}$ of its resistance $R$ with length $l$ is $\\dfrac{dR}{dl}\\propto\\dfrac{1}{\\sqrt{l}}$. Two equal resistances are connected as shown. The galvanometer has zero deflection when the jockey is at point $P$. What is the length $AP$?\n\n" +
      "<div style='max-width:300px;margin:14px auto'><svg viewBox='0 0 300 150' style='width:100%;height:auto' font-family='sans-serif' font-size='12'>" +
      "<rect x='40' y='25' width='220' height='55' fill='none' stroke='currentColor' stroke-width='1'/>" +
      "<text x='95' y='20' fill='#2563eb'>R′</text><text x='185' y='20' fill='#2563eb'>R′</text>" +
      "<rect x='70' y='40' width='50' height='14' fill='none' stroke='#2563eb'/><rect x='180' y='40' width='50' height='14' fill='none' stroke='#2563eb'/>" +
      "<line x1='150' y1='47' x2='150' y2='95' stroke='currentColor'/><circle cx='150' cy='105' r='10' fill='none' stroke='#059669'/><text x='146' y='109' fill='#059669'>G</text>" +
      "<line x1='40' y1='120' x2='260' y2='120' stroke='currentColor' stroke-width='2'/>" +
      "<circle cx='40' cy='120' r='3' fill='currentColor'/><circle cx='260' cy='120' r='3' fill='currentColor'/>" +
      "<line x1='150' y1='115' x2='130' y2='120' stroke='#dc2626' stroke-width='1.5'/><text x='128' y='113' fill='#dc2626'>P</text>" +
      "<text x='34' y='135' fill='currentColor'>A</text><text x='256' y='135' fill='currentColor'>B</text>" +
      "<text x='80' y='135' fill='currentColor'>← l →</text><text x='190' y='135' fill='currentColor'>← 1−l →</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$0.2\\,\\text{m}$" },
      { id: "B", content: "$0.3\\,\\text{m}$" },
      { id: "C", content: "$0.25\\,\\text{m}$" },
      { id: "D", content: "$0.35\\,\\text{m}$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Resistance of a length from $A$.** $R(l)=\\displaystyle\\int_0^l \\frac{c}{\\sqrt{l'}}\\,dl'=2c\\sqrt{l}$ (with $c$ the proportionality constant).\n**Step 2 — Balance condition.** Equal arms $R'$ on both gaps ⇒ at balance $R_{AP}=R_{PB}$.\n$2c\\sqrt{l}=2c\\big(\\sqrt{1}-\\sqrt{l}\\big)$.\n**Step 3 — Solve.** $\\sqrt{l}=1-\\sqrt{l}\\Rightarrow 2\\sqrt{l}=1\\Rightarrow \\sqrt{l}=\\tfrac12\\Rightarrow l=0.25\\,\\text{m}$.\n\n**Shortcut:** With equal ratio arms the bridge balances where the two wire segments have equal resistance — integrate the non-uniform $dR/dl$, don't use plain length ratio.\n**Common mistake:** Treating resistance $\\propto$ length (giving $0.5\\,\\text{m}$) instead of $\\propto\\sqrt{l}$. Forgetting the upper limit $\\sqrt{1}=1$.\n**Concept tested:** Wheatstone/meter-bridge balance with position-dependent resistivity (integration).\n**Difficulty:** Hard · **Time:** ~2 min.",
    hint: "Resistance up to length $l$ is $\\int dR=2c\\sqrt{l}$; set $R_{AP}=R_{PB}$.",
    explanation: "$2c\\sqrt{l}=2c(1-\\sqrt{l})\\Rightarrow l=0.25$ m.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["Meter Bridge", "Wheatstone Bridge Balance", "non-uniform-wire"],
  },
  {
    id: "pyq-jm19-12jan-s1-q5",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "kinematics",
    chapterTitle: "Kinematics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A passenger train of length $60\\,\\text{m}$ travels at a speed of $80\\,\\text{km/hr}$. Another freight train of length $120\\,\\text{m}$ travels at a speed of $30\\,\\text{km/hr}$. The ratio of times taken by the passenger train to completely cross the freight train when (i) they are moving in the same direction, and (ii) in the opposite directions, is:",
    options: [
      { id: "A", content: "$\\dfrac{11}{5}$" },
      { id: "B", content: "$\\dfrac{5}{2}$" },
      { id: "C", content: "$\\dfrac{3}{2}$" },
      { id: "D", content: "$\\dfrac{25}{11}$" },
    ],
    correctAnswer: "A",
    solution:
      "**Step 1 — Relative length to cross.** In both cases the passenger train must cover $L=60+120=180\\,\\text{m}$.\n**Step 2 — Relative speeds.** Same direction: $v_{\\text{rel}}=80-30=50\\,\\text{km/hr}$. Opposite: $v_{\\text{rel}}=80+30=110\\,\\text{km/hr}$.\n**Step 3 — Ratio of times.** $t=\\dfrac{L}{v_{\\text{rel}}}\\Rightarrow \\dfrac{t_{\\text{same}}}{t_{\\text{opp}}}=\\dfrac{v_{\\text{opp}}}{v_{\\text{same}}}=\\dfrac{110}{50}=\\dfrac{11}{5}$.\n\n**Shortcut:** Same length to cover both ways, so the time ratio is just the inverse of the speed ratio — no need to compute either time.\n**Common mistake:** Inverting the ratio (writing $5/11$), or using only one train's length.\n**Concept tested:** Relative velocity, crossing time.\n**Difficulty:** Medium · **Time:** ~60 s.",
    hint: "Distance is the sum of lengths both times; time ratio = inverse speed ratio.",
    explanation: "$t\\propto1/v_{\\text{rel}}$; $(80+30)/(80-30)=110/50=11/5$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Relative Velocity", "Crossing / Overtaking Time", "trains"],
  },
  {
    id: "pyq-jm19-12jan-s1-q6",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    isRepeat: false,
    repeatYears: [],
    content:
      "Two electric bulbs, rated at $(25\\,\\text{W},\\,220\\,\\text{V})$ and $(100\\,\\text{W},\\,220\\,\\text{V})$, are connected in series across a $220\\,\\text{V}$ voltage source. If the $25\\,\\text{W}$ and $100\\,\\text{W}$ bulbs draw powers $P_1$ and $P_2$ respectively, then:",
    options: [
      { id: "A", content: "$P_1=16\\,\\text{W},\\,P_2=4\\,\\text{W}$" },
      { id: "B", content: "$P_1=16\\,\\text{W},\\,P_2=9\\,\\text{W}$" },
      { id: "C", content: "$P_1=9\\,\\text{W},\\,P_2=16\\,\\text{W}$" },
      { id: "D", content: "$P_1=4\\,\\text{W},\\,P_2=16\\,\\text{W}$" },
    ],
    correctAnswer: "A",
    solution:
      "**Step 1 — Bulb resistances.** $R=\\dfrac{V^2}{P_{\\text{rated}}}$: $R_1=\\dfrac{220^2}{25}$, $R_2=\\dfrac{220^2}{100}$, so $R_1=4R_2$.\n**Step 2 — Series ⇒ same current ⇒ $P\\propto R$.** Hence $\\dfrac{P_1}{P_2}=\\dfrac{R_1}{R_2}=4$.\n**Step 3 — Total.** $R_{\\text{eq}}=R_1+R_2=5R_2$, $I=\\dfrac{220}{5R_2}$. $P_1=I^2R_1=\\dfrac{220^2}{25R_2^2}\\cdot4R_2=\\dfrac{4\\cdot220^2}{25R_2}$. With $R_2=\\dfrac{220^2}{100}$: $P_1=\\dfrac{4\\cdot100}{25}=16\\,\\text{W}$, and $P_2=P_1/4=4\\,\\text{W}$.\n\n**Shortcut:** In series the **lower-wattage** bulb (higher $R$) glows brighter; $P\\propto R\\propto1/P_{\\text{rated}}$, so the $25\\,\\text{W}$ bulb dissipates $4\\times$ the $100\\,\\text{W}$ bulb.\n**Common mistake:** Assuming the $100\\,\\text{W}$ bulb is always brighter — true only in parallel. Mixing up which bulb is $P_1$.\n**Concept tested:** Power in series vs. rated power, $P=I^2R$.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "Same current in series ⇒ $P\\propto R\\propto 1/P_{\\text{rated}}$.",
    explanation: "$R_1=4R_2\\Rightarrow P_1=16$ W, $P_2=4$ W.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Electric Power", "Bulbs in Series", "power-rating"],
  },
  {
    id: "pyq-jm19-12jan-s1-q7",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    isRepeat: false,
    repeatYears: [],
    content:
      "A straight rod of length $L$ extends from $x=a$ to $x=L+a$. The gravitational force it exerts on a point mass $m$ at $x=0$, if the mass per unit length of the rod is $A+Bx^2$, is given by:",
    options: [
      { id: "A", content: "$Gm\\left[A\\left(\\dfrac{1}{a+L}-\\dfrac{1}{a}\\right)-BL\\right]$" },
      { id: "B", content: "$Gm\\left[A\\left(\\dfrac{1}{a}-\\dfrac{1}{a+L}\\right)-BL\\right]$" },
      { id: "C", content: "$Gm\\left[A\\left(\\dfrac{1}{a+L}-\\dfrac{1}{a}\\right)+BL\\right]$" },
      { id: "D", content: "$Gm\\left[A\\left(\\dfrac{1}{a}-\\dfrac{1}{a+L}\\right)+BL\\right]$" },
    ],
    correctAnswer: "D",
    solution:
      "**Step 1 — Elemental force.** A slice at $x$ of width $dx$ has mass $dm=(A+Bx^2)\\,dx$ and is at distance $x$ from $m$:\n$dF=\\dfrac{Gm\\,dm}{x^2}=Gm\\left(\\dfrac{A}{x^2}+B\\right)dx$.\n**Step 2 — Integrate from $a$ to $a+L$.**\n$F=Gm\\left[-\\dfrac{A}{x}+Bx\\right]_a^{a+L}=Gm\\left[A\\left(\\dfrac{1}{a}-\\dfrac{1}{a+L}\\right)+BL\\right]$.\n\n**Shortcut:** Split the integrand: the $A/x^2$ part gives the difference of reciprocals, the constant $B$ part gives $B\\cdot(\\text{length})=BL$.\n**Common mistake:** Sign slip on $\\int x^{-2}dx=-1/x$, or integrating the density without dividing by $x^2$.\n**Concept tested:** Gravitational field of a continuous mass distribution (integration).\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "$dF=Gm(A/x^2+B)\\,dx$, integrate over $a\\to a+L$.",
    explanation: "$\\int(A/x^2+B)dx=A(1/a-1/(a+L))+BL$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Gravitational Force", "Continuous Mass Distribution", "integration"],
  },
  {
    id: "pyq-jm19-12jan-s1-q8",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "What is the position and nature of the image formed by the lens combination shown ($f_1,f_2$ are focal lengths)? Object $O$ is $20\\,\\text{cm}$ to the left of lens $A$ (convex, $f_1=+5\\,\\text{cm}$); lens $B$ (concave, $f_2=-5\\,\\text{cm}$) is $2\\,\\text{cm}$ to the right of $A$.\n\n" +
      "<div style='max-width:360px;margin:14px auto'><svg viewBox='0 0 360 150' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='10' y1='80' x2='350' y2='80' stroke='currentColor'/>" +
      "<line x1='45' y1='80' x2='45' y2='48' stroke='#dc2626' stroke-width='2'/><polygon points='45,44 41,54 49,54' fill='#dc2626'/><text x='35' y='95' fill='currentColor'>O</text>" +
      "<ellipse cx='190' cy='80' rx='8' ry='34' fill='none' stroke='#2563eb' stroke-width='1.5'/><text x='185' y='40' fill='#2563eb'>A</text>" +
      "<path d='M220,48 q7,32 0,64 M232,48 q-7,32 0,64' fill='none' stroke='#059669' stroke-width='1.5'/><text x='234' y='40' fill='#059669'>B</text>" +
      "<text x='95' y='75' fill='currentColor'>20 cm</text><text x='196' y='66' fill='currentColor'>2 cm</text>" +
      "<text x='150' y='135' fill='#2563eb'>f₁=+5</text><text x='235' y='135' fill='#059669'>f₂=−5</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$70\\,\\text{cm}$ from point $B$ at left; virtual" },
      { id: "B", content: "$40\\,\\text{cm}$ from point $B$ at right; real" },
      { id: "C", content: "$\\dfrac{20}{3}\\,\\text{cm}$ from point $B$ at right; real" },
      { id: "D", content: "$70\\,\\text{cm}$ from point $B$ at right; real" },
    ],
    correctAnswer: "D",
    solution:
      "**Lens A (convex, $f=+5$).** $u=-20$: $\\dfrac{1}{v}=\\dfrac{1}{f}+\\dfrac{1}{u}=\\dfrac{1}{5}-\\dfrac{1}{20}=\\dfrac{3}{20}\\Rightarrow v=\\dfrac{20}{3}\\approx6.67\\,\\text{cm}$ (real, right of $A$).\n**Transfer to B.** $B$ is $2\\,\\text{cm}$ right of $A$, so this image is $\\dfrac{20}{3}-2=\\dfrac{14}{3}\\,\\text{cm}$ to the **right** of $B$ ⇒ a virtual object: $u=+\\dfrac{14}{3}$.\n**Lens B (concave, $f=-5$).** $\\dfrac{1}{v}=-\\dfrac{1}{5}+\\dfrac{3}{14}=\\dfrac{-14+15}{70}=\\dfrac{1}{70}\\Rightarrow v=70\\,\\text{cm}$ (positive ⇒ real, right of $B$).\n\n**Shortcut:** Image of lens 1 becomes object of lens 2 after subtracting the separation; a converging beam hitting the diverging lens can still give a real image.\n**Common mistake:** Forgetting to subtract the $2\\,\\text{cm}$ gap, or mishandling the **virtual object** sign ($u$ positive).\n**Concept tested:** Successive refraction through a lens system, sign convention.\n**Difficulty:** Hard · **Time:** ~2.5 min.",
    hint: "Image of A (at $20/3$ cm) minus 2 cm is a virtual object for B with $u=+14/3$.",
    explanation: "Lens-A image $20/3$; for B $u=+14/3$, $f=-5\\Rightarrow v=+70$ cm, real, right of B.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["Lens Combination", "Successive Refraction", "virtual-object"],
  },
  {
    id: "pyq-jm19-12jan-s1-q9",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A point source of light $S$ is placed at a distance $L$ in front of the centre of a plane mirror of width $d$ hanging vertically on a wall. A man walks in front of the mirror along a line parallel to it, at a distance $2L$. The distance over which the man can see the image of the light source in the mirror is:\n\n" +
      "<div style='max-width:320px;margin:14px auto'><svg viewBox='0 0 320 170' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='30' y1='10' x2='30' y2='160' stroke='currentColor' stroke-width='3'/><text x='8' y='90' fill='currentColor'>wall</text>" +
      "<line x1='30' y1='55' x2='30' y2='115' stroke='#2563eb' stroke-width='5'/><text x='18' y='52' fill='#2563eb'>d</text>" +
      "<circle cx='150' cy='85' r='3' fill='#dc2626'/><text x='155' y='82' fill='#dc2626'>S</text>" +
      "<line x1='280' y1='10' x2='280' y2='160' stroke='#059669' stroke-width='1' stroke-dasharray='4 3'/><polygon points='280,12 276,22 284,22' fill='#059669'/><text x='256' y='150' fill='#059669'>man (2L)</text>" +
      "<line x1='30' y1='165' x2='150' y2='165' stroke='currentColor'/><text x='80' y='162' fill='currentColor'>L</text>" +
      "<line x1='30' y1='150' x2='280' y2='150' stroke='currentColor'/><text x='150' y='147' fill='currentColor'>2L</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$d$" },
      { id: "B", content: "$2d$" },
      { id: "C", content: "$3d$" },
      { id: "D", content: "$\\dfrac{d}{2}$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Locate the image.** The image $S'$ is $L$ **behind** the mirror (object is $L$ in front).\n**Step 2 — Geometry of visibility.** A viewer sees the image only along rays that actually strike the mirror; the visible band on the man's line is bounded by rays from $S'$ grazing the two mirror edges.\n**Step 3 — Similar triangles.** Distance from $S'$ to mirror $=L$; from $S'$ to the man's line $=L+2L=3L$. The band width scales as the distance ratio:\n$W=d\\times\\dfrac{3L}{L}=3d$.\n\n**Shortcut:** Visible width $=$ mirror width $\\times\\dfrac{\\text{(image-to-observer distance)}}{\\text{(image-to-mirror distance)}}=d\\cdot\\dfrac{3L}{L}=3d$.\n**Common mistake:** Using $2L$ (object-to-man) instead of $3L$ (image-to-man), giving $2d$; or thinking the band equals the mirror width $d$.\n**Concept tested:** Plane-mirror image, field of view by edge rays / similar triangles.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "Image is $L$ behind the mirror; band width $=d\\times(3L/L)$.",
    explanation: "Similar triangles from the virtual image give $3d$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Plane Mirror", "Field of View", "similar-triangles"],
  },
  {
    id: "pyq-jm19-12jan-s1-q10",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "wave-optics",
    chapterTitle: "Wave Optics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A light wave is incident normally on a glass slab of refractive index $1.5$. If $4\\%$ of the light gets reflected and the amplitude of the electric field of the incident light is $30\\,\\text{V/m}$, then the amplitude of the electric field for the wave propagating in the glass medium will be:",
    options: [
      { id: "A", content: "$30\\,\\text{V/m}$" },
      { id: "B", content: "$10\\,\\text{V/m}$" },
      { id: "C", content: "$24\\,\\text{V/m}$" },
      { id: "D", content: "$6\\,\\text{V/m}$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Amplitude reflection coefficient.** At normal incidence $r=\\dfrac{n_1-n_2}{n_1+n_2}=\\dfrac{1-1.5}{1+1.5}=-0.2$, so $|r|=0.2$ and reflectance $R=r^2=0.04=4\\%$ ✓ (consistent with the data).\n**Step 2 — Amplitude transmission coefficient.** $t=\\dfrac{2n_1}{n_1+n_2}=\\dfrac{2(1)}{2.5}=0.8$.\n**Step 3 — Transmitted amplitude.** $E_t=t\\,E_i=0.8\\times30=24\\,\\text{V/m}$.\n\n**Shortcut:** $t=1+r=1-0.2=0.8$ (Fresnel relation), then $E_t=0.8E_i$.\n**Common mistake:** Using $E_t=\\sqrt{1-R}\\,E_i=\\sqrt{0.96}\\,(30)\\approx29.4$ — that conserves **energy**, but the field **amplitude** follows the Fresnel transmission coefficient (intensity in a medium also carries the index factor). The intended answer is $24\\,\\text{V/m}$.\n**Concept tested:** Fresnel amplitude coefficients at a dielectric interface.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "$t=\\frac{2n_1}{n_1+n_2}=1+r$; $E_t=tE_i$.",
    explanation: "$t=2/2.5=0.8\\Rightarrow E_t=24$ V/m.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Fresnel Coefficients", "Reflection & Transmission Amplitude", "normal-incidence"],
  },
  {
    id: "pyq-jm19-12jan-s1-q11",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "thermodynamics",
    chapterTitle: "Thermodynamics",
    isRepeat: false,
    repeatYears: [],
    content:
      "For the given cyclic process $CAB$ as shown for a gas, the work done is: ($C=(1,6)$, $A=(5,6)$, $B=(5,1)$ in SI units)\n\n" +
      "<div style='max-width:300px;margin:14px auto'><svg viewBox='0 0 300 220' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='45' y1='20' x2='45' y2='185' stroke='currentColor'/><line x1='45' y1='185' x2='285' y2='185' stroke='currentColor'/>" +
      "<text x='8' y='105' fill='currentColor'>p (Pa)</text><text x='265' y='205' fill='currentColor'>V (m³)</text>" +
      "<text x='30' y='40' fill='currentColor'>6</text><text x='30' y='160' fill='currentColor'>1</text>" +
      "<text x='80' y='200' fill='currentColor'>1</text><text x='230' y='200' fill='currentColor'>5</text>" +
      "<line x1='85' y1='35' x2='235' y2='35' stroke='#2563eb' stroke-width='2'/><polygon points='165,35 155,31 155,39' fill='#2563eb'/>" +
      "<line x1='235' y1='35' x2='235' y2='155' stroke='#2563eb' stroke-width='2'/><polygon points='235,100 231,90 239,90' fill='#2563eb'/>" +
      "<line x1='235' y1='155' x2='85' y2='35' stroke='#2563eb' stroke-width='2'/><polygon points='150,89 158,86 152,80' fill='#2563eb'/>" +
      "<circle cx='85' cy='35' r='3' fill='#dc2626'/><text x='72' y='32' fill='#dc2626'>C</text>" +
      "<circle cx='235' cy='35' r='3' fill='#dc2626'/><text x='240' y='32' fill='#dc2626'>A</text>" +
      "<circle cx='235' cy='155' r='3' fill='#dc2626'/><text x='240' y='160' fill='#dc2626'>B</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$30\\,\\text{J}$" },
      { id: "B", content: "$10\\,\\text{J}$" },
      { id: "C", content: "$1\\,\\text{J}$" },
      { id: "D", content: "$5\\,\\text{J}$" },
    ],
    correctAnswer: "B",
    solution:
      "**Step 1 — Work in a cycle = enclosed area.** The closed path $C\\to A\\to B\\to C$ is a right triangle with legs $\\Delta V=5-1=4\\,\\text{m}^3$ (top $CA$) and $\\Delta p=6-1=5\\,\\text{Pa}$ (side $AB$).\n**Step 2 — Area.** $|W|=\\dfrac12(\\text{base})(\\text{height})=\\dfrac12(4)(5)=10\\,\\text{J}$.\n**Step 3 — Sign.** $C\\to A\\to B\\to C$ is traced **clockwise**, so work done **by** the gas is $+10\\,\\text{J}$.\n\n**Shortcut:** For any closed loop on a $p$–$V$ diagram, $W_{\\text{by gas}}=$ enclosed area (clockwise $=+$).\n**Common mistake:** Forgetting the $\\tfrac12$ (taking the full $4\\times5=20$ or the $CA$ strip $24$), or mis-assigning the sign. $W_{AB}=0$ (isochoric) is a useful check.\n**Concept tested:** Work as area under/enclosed by the $p$–$V$ curve.\n**Difficulty:** Easy · **Time:** ~60 s.",
    hint: "Enclosed triangle area $=\\frac12\\cdot4\\cdot5$; clockwise ⇒ positive.",
    explanation: "Area of triangle $CAB=\\frac12(4)(5)=10$ J.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Work Done by Gas", "Cyclic Process (p–V)", "enclosed-area"],
  },
  {
    id: "pyq-jm19-12jan-s1-q12",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "electrostatics",
    chapterTitle: "Electrostatics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Determine the electric dipole moment of the system of three charges placed on the vertices of an equilateral triangle (side $l$): $+q$ at the origin (bottom-left), $+q$ at the bottom-right vertex (on the $x$-axis), and $-2q$ at the top vertex.\n\n" +
      "<div style='max-width:240px;margin:14px auto'><svg viewBox='0 0 240 170' style='width:100%;height:auto' font-family='sans-serif' font-size='12'>" +
      "<line x1='40' y1='150' x2='40' y2='20' stroke='currentColor'/><polygon points='40,16 36,26 44,26' fill='currentColor'/><text x='28' y='28' fill='currentColor'>y</text>" +
      "<line x1='40' y1='150' x2='220' y2='150' stroke='currentColor'/><polygon points='224,150 214,146 214,154' fill='currentColor'/><text x='208' y='168' fill='currentColor'>x</text>" +
      "<line x1='40' y1='150' x2='190' y2='150' stroke='#2563eb' stroke-width='1.5'/><line x1='40' y1='150' x2='115' y2='40' stroke='#2563eb' stroke-width='1.5'/><line x1='190' y1='150' x2='115' y2='40' stroke='#2563eb' stroke-width='1.5'/>" +
      "<circle cx='40' cy='150' r='4' fill='#dc2626'/><text x='18' y='150' fill='#dc2626'>+q</text>" +
      "<circle cx='190' cy='150' r='4' fill='#dc2626'/><text x='196' y='150' fill='#dc2626'>+q</text>" +
      "<circle cx='115' cy='40' r='4' fill='#059669'/><text x='118' y='38' fill='#059669'>−2q</text>" +
      "<text x='95' y='165' fill='currentColor'>l</text><text x='62' y='100' fill='currentColor'>l</text><text x='160' y='100' fill='currentColor'>l</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$\\sqrt{3}\\,ql\\,\\dfrac{\\hat{j}-\\hat{i}}{\\sqrt{2}}$" },
      { id: "B", content: "$(ql)\\,\\dfrac{\\hat{i}+\\hat{j}}{\\sqrt{2}}$" },
      { id: "C", content: "$2ql\\,\\hat{j}$" },
      { id: "D", content: "$-\\sqrt{3}\\,ql\\,\\hat{j}$" },
    ],
    correctAnswer: "D",
    solution:
      "**Step 1 — Positions.** $+q$ at $(0,0)$, $+q$ at $(l,0)$, $-2q$ at $\\left(\\dfrac{l}{2},\\dfrac{\\sqrt3}{2}l\\right)$.\n**Step 2 — $\\vec p=\\sum q_i\\vec r_i$.**\n$x$: $q(0)+q(l)-2q\\cdot\\dfrac{l}{2}=ql-ql=0$.\n$y$: $q(0)+q(0)-2q\\cdot\\dfrac{\\sqrt3}{2}l=-\\sqrt3\\,ql$.\n**Step 3 — Result.** $\\vec p=-\\sqrt3\\,ql\\,\\hat{j}$ (points from the $-2q$ toward the midpoint of the two $+q$'s, i.e. downward).\n\n**Shortcut:** Net charge is zero, so $\\vec p$ is origin-independent. Treat it as two dipoles ($+q\\!\\to\\!-2q$ along each side); their resultant points straight down with magnitude $\\sqrt3\\,ql$.\n**Common mistake:** Forgetting the factor $2$ on the apex charge, or getting the direction sign wrong ($\\vec p$ points toward negative charge from positive? No — $\\vec p=\\sum q_i\\vec r_i$ here gives $-\\hat j$).\n**Concept tested:** Dipole moment of a discrete charge system.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "$\\vec p=\\sum q_i\\vec r_i$; the $x$-components cancel.",
    explanation: "$p_x=0$, $p_y=-\\sqrt3\\,ql\\Rightarrow \\vec p=-\\sqrt3\\,ql\\,\\hat j$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Electric Dipole", "Dipole Moment of Charge System", "vector-sum"],
  },
  {
    id: "pyq-jm19-12jan-s1-q13",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "center-of-mass",
    chapterTitle: "Center of Mass",
    isRepeat: false,
    repeatYears: [],
    content:
      "The position vector of the centre of mass $\\vec r_{cm}$ of an asymmetric uniform bar of negligible cross-section (shown below) is: (the bar is a top segment from $(0,L)$ to $(L,L)$, a vertical segment from $(L,L)$ to $(L,0)$, and a base from $(L,0)$ to $(3L,0)$)\n\n" +
      "<div style='max-width:300px;margin:14px auto'><svg viewBox='0 0 300 160' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='30' y1='10' x2='30' y2='130' stroke='currentColor'/><line x1='30' y1='130' x2='285' y2='130' stroke='currentColor'/>" +
      "<line x1='30' y1='40' x2='115' y2='40' stroke='#2563eb' stroke-width='3'/>" +
      "<line x1='115' y1='40' x2='115' y2='130' stroke='#2563eb' stroke-width='3'/>" +
      "<line x1='115' y1='130' x2='285' y2='130' stroke='#2563eb' stroke-width='3'/>" +
      "<text x='14' y='44' fill='currentColor'>L</text>" +
      "<text x='111' y='145' fill='currentColor'>L</text><text x='196' y='145' fill='currentColor'>2L</text><text x='280' y='145' fill='currentColor'>3L</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$\\dfrac{13}{8}L\\,\\hat{x}+\\dfrac{5}{8}L\\,\\hat{y}$" },
      { id: "B", content: "$\\dfrac{5}{8}L\\,\\hat{x}+\\dfrac{13}{8}L\\,\\hat{y}$" },
      { id: "C", content: "$\\dfrac{3}{8}L\\,\\hat{x}+\\dfrac{11}{8}L\\,\\hat{y}$" },
      { id: "D", content: "$\\dfrac{11}{8}L\\,\\hat{x}+\\dfrac{3}{8}L\\,\\hat{y}$" },
    ],
    correctAnswer: "D",
    solution:
      "**Step 1 — Break into 3 uniform rods (mass ∝ length, linear density $\\lambda$).**\n• Top rod $(0,L)\\!\\to\\!(L,L)$: length $L$, mass $m$, centre $\\left(\\tfrac{L}{2},\\,L\\right)$.\n• Vertical rod $(L,L)\\!\\to\\!(L,0)$: length $L$, mass $m$, centre $\\left(L,\\,\\tfrac{L}{2}\\right)$.\n• Base rod $(L,0)\\!\\to\\!(3L,0)$: length $2L$, mass $2m$, centre $\\left(2L,\\,0\\right)$.\nTotal mass $=4m$.\n**Step 2 — $x_{cm}$.** $\\dfrac{m\\cdot\\tfrac{L}{2}+m\\cdot L+2m\\cdot2L}{4m}=\\dfrac{\\tfrac12+1+4}{4}L=\\dfrac{11}{8}L$.\n**Step 3 — $y_{cm}$.** $\\dfrac{m\\cdot L+m\\cdot\\tfrac{L}{2}+2m\\cdot0}{4m}=\\dfrac{1+\\tfrac12}{4}L=\\dfrac{3}{8}L$.\n$\\Rightarrow\\vec r_{cm}=\\dfrac{11}{8}L\\,\\hat x+\\dfrac{3}{8}L\\,\\hat y$.\n\n**Shortcut:** Weight each straight piece by its **length** at its midpoint; the base (length $2L$) dominates, pulling $x_{cm}$ toward $2L$ and $y_{cm}$ toward $0$.\n**Common mistake:** Giving every segment equal mass (ignoring that the base is twice as long), or using endpoints instead of midpoints.\n**Concept tested:** Centre of mass of a composite 1-D body.\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "Three rods of mass ratio $1:1:2$ at their midpoints.",
    explanation: "$x_{cm}=11L/8$, $y_{cm}=3L/8$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Centre of Mass", "Composite Bodies", "uniform-bar"],
  },
  {
    id: "pyq-jm19-12jan-s1-q14",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "sound-waves",
    chapterTitle: "Sound Waves",
    isRepeat: false,
    repeatYears: [],
    content:
      "A person standing on open ground hears the sound of a jet aeroplane coming from the north at an angle $60^\\circ$ with ground level. But he finds the aeroplane right vertically above his position. If $v$ is the speed of sound, the speed of the plane is:\n\n" +
      "<div style='max-width:300px;margin:14px auto'><svg viewBox='0 0 300 160' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='20' y1='140' x2='285' y2='140' stroke='currentColor'/><text x='235' y='155' fill='currentColor'>ground</text>" +
      "<circle cx='60' cy='140' r='3' fill='#dc2626'/><text x='40' y='155' fill='#dc2626'>observer</text>" +
      "<line x1='60' y1='140' x2='60' y2='30' stroke='#059669' stroke-dasharray='4 3'/><polygon points='60,26 56,36 64,36' fill='#059669'/><text x='66' y='30' fill='#059669'>plane now</text>" +
      "<line x1='60' y1='140' x2='200' y2='30' stroke='#2563eb' stroke-width='1.5'/><text x='150' y='70' fill='#2563eb'>sound path</text>" +
      "<path d='M95,140 A35,35 0 0 0 82,118' fill='none' stroke='currentColor'/><text x='96' y='128' fill='currentColor'>60°</text>" +
      "<text x='205' y='30' fill='currentColor'>emission point</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$\\dfrac{\\sqrt{3}}{2}v$" },
      { id: "B", content: "$\\dfrac{2v}{\\sqrt{3}}$" },
      { id: "C", content: "$v$" },
      { id: "D", content: "$\\dfrac{v}{2}$" },
    ],
    correctAnswer: "D",
    solution:
      "**Step 1 — Set up.** The plane flies horizontally at height $h$. The sound now heard was emitted earlier from the point seen at $60^\\circ$ elevation. Horizontal distance of that emission point from the observer: $x=\\dfrac{h}{\\tan60^\\circ}=\\dfrac{h}{\\sqrt3}$.\n**Step 2 — Sound travel time.** Sound covers the slant distance $\\dfrac{h}{\\sin60^\\circ}$ at speed $v$: $t=\\dfrac{h/\\sin60^\\circ}{v}=\\dfrac{2h}{\\sqrt3\\,v}$.\n**Step 3 — Plane travel.** In the same time the plane moved the horizontal distance $x$: $u\\,t=x\\Rightarrow u=\\dfrac{h/\\sqrt3}{2h/(\\sqrt3 v)}=\\dfrac{v}{2}$.\n\n**Shortcut:** $\\dfrac{u}{v}=\\dfrac{x}{(\\text{slant})}=\\cos60^\\circ=\\dfrac12\\Rightarrow u=\\dfrac{v}{2}$. (The Mach-angle relation: $\\cos\\theta=u/v$ here.)\n**Common mistake:** Using $\\sin$ instead of $\\cos$ (gives $\\tfrac{\\sqrt3}{2}v$), or equating the slant distance to the horizontal one.\n**Concept tested:** Geometry of sound delay vs. source motion (apparent direction).\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "$u/v=\\cos60^\\circ$ — plane covers the horizontal leg while sound covers the slant leg.",
    explanation: "$u=v\\cos60^\\circ=v/2$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Sound Propagation", "Apparent Direction / Sound Delay", "geometry"],
  },
  {
    id: "pyq-jm19-12jan-s1-q15",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "simple-harmonic-motion",
    chapterTitle: "Simple Harmonic Motion",
    isRepeat: false,
    repeatYears: [],
    content:
      "Two light identical springs of spring constant $k$ are attached horizontally at the two ends of a uniform horizontal rod $AB$ of length $l$ and mass $m$. The rod is pivoted at its centre $O$ and can rotate freely in a horizontal plane. The other ends of the springs are fixed to rigid supports. The rod is gently pushed through a small angle and released. The frequency of resulting oscillation is:\n\n" +
      "<div style='max-width:200px;margin:14px auto'><svg viewBox='0 0 200 180' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='100' y1='30' x2='100' y2='150' stroke='currentColor' stroke-width='4'/><text x='106' y='28' fill='currentColor'>A</text><text x='106' y='162' fill='currentColor'>B</text>" +
      "<circle cx='100' cy='90' r='4' fill='#dc2626'/><text x='84' y='94' fill='#dc2626'>O</text>" +
      "<path d='M100,30 l8,-3 l-8,-3 l8,-3 l-8,-3 l8,-3 l-8,-3' fill='none' stroke='#2563eb'/><line x1='100' y1='9' x2='150' y2='9' stroke='#2563eb'/><line x1='150' y1='4' x2='150' y2='14' stroke='currentColor' stroke-width='2'/>" +
      "<path d='M100,150 l8,3 l-8,3 l8,3 l-8,3 l8,3 l-8,3' fill='none' stroke='#2563eb'/><line x1='100' y1='171' x2='150' y2='171' stroke='#2563eb'/><line x1='150' y1='166' x2='150' y2='176' stroke='currentColor' stroke-width='2'/>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$\\dfrac{1}{2\\pi}\\sqrt{\\dfrac{3k}{m}}$" },
      { id: "B", content: "$\\dfrac{1}{2\\pi}\\sqrt{\\dfrac{2k}{m}}$" },
      { id: "C", content: "$\\dfrac{1}{2\\pi}\\sqrt{\\dfrac{6k}{m}}$" },
      { id: "D", content: "$\\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Displacement of each end.** Rotate by small $\\theta$: each end moves $x=\\dfrac{l}{2}\\theta$.\n**Step 2 — Restoring torque.** Each spring exerts force $kx$ with moment arm $\\dfrac{l}{2}$; both add:\n$\\tau=-2\\left(kx\\right)\\dfrac{l}{2}=-2k\\dfrac{l}{2}\\theta\\cdot\\dfrac{l}{2}=-\\dfrac{kl^2}{2}\\theta$.\n**Step 3 — Moment of inertia of rod about centre.** $I=\\dfrac{ml^2}{12}$.\n**Step 4 — Angular frequency.** $\\omega^2=\\dfrac{|\\tau|/\\theta}{I}=\\dfrac{kl^2/2}{ml^2/12}=\\dfrac{6k}{m}$.\n$\\Rightarrow f=\\dfrac{\\omega}{2\\pi}=\\dfrac{1}{2\\pi}\\sqrt{\\dfrac{6k}{m}}$.\n\n**Shortcut:** Effective torsional constant $\\kappa=2\\cdot k\\cdot(l/2)^2=\\dfrac{kl^2}{2}$; $\\omega=\\sqrt{\\kappa/I}$ with $I=ml^2/12$.\n**Common mistake:** Counting only one spring, or forgetting the second factor of $l/2$ (torque arm), or using $I=ml^2/3$ (end-pivot) instead of $ml^2/12$ (centre).\n**Concept tested:** Angular SHM, torsional restoring torque, rod moment of inertia.\n**Difficulty:** Hard · **Time:** ~2.5 min.",
    hint: "$\\tau=2k(l/2)^2\\theta$, $I=ml^2/12$, $\\omega=\\sqrt{\\tau/(I\\theta)}$.",
    explanation: "$\\omega^2=(kl^2/2)/(ml^2/12)=6k/m$.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["Angular SHM", "Torsional Oscillation", "rod-springs"],
  },
  {
    id: "pyq-jm19-12jan-s1-q16",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "center-of-mass",
    chapterTitle: "Center of Mass",
    isRepeat: false,
    repeatYears: [],
    content:
      "A simple pendulum, made of a string of length $l$ and a bob of mass $m$, is released from a small angle $\\theta_0$. It strikes a block of mass $M$ kept on a horizontal surface at its lowest point of oscillation, elastically. It bounces back and goes up to an angle $\\theta_1$. Then $M$ is given by:",
    options: [
      { id: "A", content: "$\\dfrac{m}{2}\\left(\\dfrac{\\theta_0+\\theta_1}{\\theta_0-\\theta_1}\\right)$" },
      { id: "B", content: "$m\\left(\\dfrac{\\theta_0-\\theta_1}{\\theta_0+\\theta_1}\\right)$" },
      { id: "C", content: "$m\\left(\\dfrac{\\theta_0+\\theta_1}{\\theta_0-\\theta_1}\\right)$" },
      { id: "D", content: "$\\dfrac{m}{2}\\left(\\dfrac{\\theta_0-\\theta_1}{\\theta_0+\\theta_1}\\right)$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Speeds from the swing (small angle).** $v\\propto\\theta\\sqrt{gl}$ since $v=\\sqrt{2gl(1-\\cos\\theta)}\\approx\\theta\\sqrt{gl}$. So $v_0=\\theta_0\\sqrt{gl}$ (before) and the rebound speed $v_1=\\theta_1\\sqrt{gl}$.\n**Step 2 — Elastic collision velocity of $m$.** $v_m'=\\dfrac{m-M}{m+M}\\,v_0$. Since it bounces back, $v_m'<0$ and $|v_m'|=v_1$:\n$\\dfrac{M-m}{M+m}=\\dfrac{v_1}{v_0}=\\dfrac{\\theta_1}{\\theta_0}$.\n**Step 3 — Solve for $M$.** $\\theta_0(M-m)=\\theta_1(M+m)\\Rightarrow M(\\theta_0-\\theta_1)=m(\\theta_0+\\theta_1)$\n$\\Rightarrow M=m\\left(\\dfrac{\\theta_0+\\theta_1}{\\theta_0-\\theta_1}\\right)$.\n\n**Shortcut:** Rebound requires $M>m$; the coefficient $\\dfrac{M-m}{M+m}$ equals the speed (and hence angle) ratio.\n**Common mistake:** Using $v\\propto\\sqrt\\theta$ (energy vs. amplitude confusion), or dropping the sign so $M<m$.\n**Concept tested:** 1-D elastic collision, small-angle pendulum kinematics.\n**Difficulty:** Hard · **Time:** ~2.5 min.",
    hint: "Small-angle ⇒ $v\\propto\\theta$; elastic: $\\frac{M-m}{M+m}=\\theta_1/\\theta_0$.",
    explanation: "$M=m(\\theta_0+\\theta_1)/(\\theta_0-\\theta_1)$.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["Elastic Collision", "Pendulum + Collision", "small-angle"],
  },
  {
    id: "pyq-jm19-12jan-s1-q17",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "communication-systems",
    chapterTitle: "Communication Systems",
    isRepeat: false,
    repeatYears: [],
    content:
      "A $100\\,\\text{V}$ carrier wave is made to vary between $160\\,\\text{V}$ and $40\\,\\text{V}$ by a modulating signal. What is the modulation index?",
    options: [
      { id: "A", content: "$0.3$" },
      { id: "B", content: "$0.5$" },
      { id: "C", content: "$0.6$" },
      { id: "D", content: "$0.4$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Formula.** $\\mu=\\dfrac{V_{\\max}-V_{\\min}}{V_{\\max}+V_{\\min}}$.\n**Step 2 — Substitute.** $\\mu=\\dfrac{160-40}{160+40}=\\dfrac{120}{200}=0.6$.\n\n**Check:** $V_{\\max}+V_{\\min}=200=2\\times100=2A_c$ ✓ (consistent with the $100\\,\\text{V}$ carrier).\n**Shortcut:** $A_m=\\dfrac{V_{\\max}-V_{\\min}}{2}=60$, $A_c=\\dfrac{V_{\\max}+V_{\\min}}{2}=100$, $\\mu=A_m/A_c=0.6$.\n**Common mistake:** Dividing by the carrier $100$ only ($120/100=1.2$), or using $V_{\\max}/V_{\\min}$.\n**Concept tested:** Amplitude modulation index.\n**Difficulty:** Easy · **Time:** ~30 s.",
    hint: "$\\mu=(V_{\\max}-V_{\\min})/(V_{\\max}+V_{\\min})$.",
    explanation: "$120/200=0.6$.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Amplitude Modulation", "Modulation Index", "AM"],
  },
  {
    id: "pyq-jm19-12jan-s1-q18",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "thermal-physics",
    chapterTitle: "Thermal Physics",
    isRepeat: false,
    repeatYears: [],
    content:
      "A cylinder of radius $R$ is surrounded by a cylindrical shell of inner radius $R$ and outer radius $2R$. The thermal conductivity of the material of the inner cylinder is $K_1$ and that of the outer cylinder is $K_2$. Assuming no loss of heat, the effective thermal conductivity of the system for heat flowing along the length of the cylinder is:\n\n" +
      "<div style='max-width:160px;margin:14px auto'><svg viewBox='0 0 160 160' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<circle cx='80' cy='80' r='66' fill='none' stroke='#059669' stroke-width='1.5'/>" +
      "<circle cx='80' cy='80' r='33' fill='none' stroke='#2563eb' stroke-width='1.5'/>" +
      "<text x='72' y='84' fill='#2563eb'>K₁</text><text x='110' y='52' fill='#059669'>K₂</text>" +
      "<line x1='80' y1='80' x2='146' y2='80' stroke='currentColor' stroke-dasharray='3 2'/><text x='100' y='94' fill='currentColor'>2R</text>" +
      "<line x1='80' y1='80' x2='80' y2='47' stroke='currentColor' stroke-dasharray='3 2'/><text x='84' y='66' fill='currentColor'>R</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$\\dfrac{K_1+K_2}{2}$" },
      { id: "B", content: "$K_1+K_2$" },
      { id: "C", content: "$\\dfrac{2K_1+3K_2}{5}$" },
      { id: "D", content: "$\\dfrac{K_1+3K_2}{4}$" },
    ],
    correctAnswer: "D",
    solution:
      "**Step 1 — Heat flows along the length ⇒ the two parts are in parallel** (same length, same $\\Delta T$).\n**Step 2 — Cross-sectional areas.** Inner: $A_1=\\pi R^2$. Shell: $A_2=\\pi(2R)^2-\\pi R^2=3\\pi R^2$.\n**Step 3 — Parallel conductivity (area-weighted).**\n$K_{\\text{eff}}=\\dfrac{K_1A_1+K_2A_2}{A_1+A_2}=\\dfrac{K_1\\pi R^2+K_2\\cdot3\\pi R^2}{\\pi R^2+3\\pi R^2}=\\dfrac{K_1+3K_2}{4}$.\n\n**Shortcut:** Conduction along length ⇒ parallel ⇒ weight conductivities by area; areas are in ratio $1:3$.\n**Common mistake:** Treating them as series (radial flow), which would invert the conductivities; or using $\\pi(2R)^2=4\\pi R^2$ as the shell area (forgetting to subtract the core).\n**Concept tested:** Thermal conduction, parallel combination of conductivities.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "Heat along length ⇒ parallel; $K_{\\text{eff}}=\\frac{\\sum K_iA_i}{\\sum A_i}$ with areas $1:3$.",
    explanation: "$(K_1\\cdot1+K_2\\cdot3)/4=(K_1+3K_2)/4$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Thermal Conduction", "Conductors in Parallel", "coaxial-cylinder"],
  },
  {
    id: "pyq-jm19-12jan-s1-q19",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "units-and-dimensions",
    chapterTitle: "Units, Dimensions & Measurement",
    isRepeat: false,
    repeatYears: [],
    content:
      "The least count of the main scale of a screw gauge is $1\\,\\text{mm}$. The minimum number of divisions on its circular scale required to measure $5\\,\\mu\\text{m}$ diameter of a wire is:",
    options: [
      { id: "A", content: "$50$" },
      { id: "B", content: "$200$" },
      { id: "C", content: "$100$" },
      { id: "D", content: "$500$" },
    ],
    correctAnswer: "B",
    solution:
      "**Step 1 — Pitch.** For one full rotation the spindle advances by one main-scale division $=1\\,\\text{mm}$, so pitch $p=1\\,\\text{mm}$.\n**Step 2 — Required least count.** To resolve $5\\,\\mu\\text{m}=5\\times10^{-3}\\,\\text{mm}$, we need least count $=\\dfrac{p}{N}\\le5\\times10^{-3}\\,\\text{mm}$.\n**Step 3 — Minimum $N$.** $N=\\dfrac{p}{\\text{LC}}=\\dfrac{1}{5\\times10^{-3}}=200$.\n\n**Shortcut:** $N=\\dfrac{\\text{pitch}}{\\text{required resolution}}=\\dfrac{1\\,\\text{mm}}{5\\,\\mu\\text{m}}=200$.\n**Common mistake:** Unit slip ($\\mu$m vs mm) — using $5\\times10^{-6}\\,\\text{m}$ against $10^{-3}\\,\\text{m}$ correctly gives $200$, but mixing units gives $50$ or $500$.\n**Concept tested:** Screw-gauge least count, $\\text{LC}=\\text{pitch}/N$.\n**Difficulty:** Easy · **Time:** ~45 s.",
    hint: "LC $=$ pitch$/N$; set LC $=5\\,\\mu$m, pitch $=1$ mm.",
    explanation: "$N=1\\text{ mm}/5\\,\\mu\\text{m}=200$.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Measurement", "Screw Gauge Least Count", "instruments"],
  },
  {
    id: "pyq-jm19-12jan-s1-q20",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "semiconductors",
    chapterTitle: "Semiconductor Electronics",
    isRepeat: false,
    repeatYears: [],
    content:
      "The output of the given logic circuit (four NAND gates with inputs $A$ and $B$) is:\n\n" +
      "<div style='max-width:340px;margin:14px auto'><svg viewBox='0 0 340 180' style='width:100%;height:auto' font-family='sans-serif' font-size='10'>" +
      "<text x='6' y='44' fill='#dc2626'>A</text><text x='6' y='150' fill='#dc2626'>B</text>" +
      "<line x1='16' y1='40' x2='120' y2='40' stroke='currentColor'/><line x1='16' y1='146' x2='120' y2='146' stroke='currentColor'/>" +
      "<rect x='120' y='75' width='42' height='36' rx='4' fill='none' stroke='#2563eb'/><text x='126' y='97' fill='#2563eb'>NAND</text><circle cx='166' cy='93' r='3' fill='none' stroke='#2563eb'/>" +
      "<line x1='60' y1='40' x2='60' y2='82' stroke='currentColor'/><line x1='60' y1='82' x2='120' y2='82' stroke='currentColor'/>" +
      "<line x1='60' y1='146' x2='60' y2='104' stroke='currentColor'/><line x1='60' y1='104' x2='120' y2='104' stroke='currentColor'/>" +
      "<text x='128' y='70' fill='currentColor'>G2</text>" +
      "<rect x='190' y='22' width='42' height='34' rx='4' fill='none' stroke='#2563eb'/><text x='196' y='43' fill='#2563eb'>NAND</text><circle cx='236' cy='39' r='3' fill='none' stroke='#2563eb'/><text x='198' y='18' fill='currentColor'>G1</text>" +
      "<rect x='190' y='128' width='42' height='34' rx='4' fill='none' stroke='#2563eb'/><text x='196' y='149' fill='#2563eb'>NAND</text><circle cx='236' cy='145' r='3' fill='none' stroke='#2563eb'/><text x='198' y='124' fill='currentColor'>G3</text>" +
      "<line x1='40' y1='40' x2='40' y2='30' stroke='currentColor'/><line x1='40' y1='30' x2='190' y2='30' stroke='currentColor'/>" +
      "<line x1='40' y1='146' x2='40' y2='154' stroke='currentColor'/><line x1='40' y1='154' x2='190' y2='154' stroke='currentColor'/>" +
      "<line x1='169' y1='93' x2='178' y2='93' stroke='currentColor'/><line x1='178' y1='93' x2='178' y2='48' stroke='currentColor'/><line x1='178' y1='48' x2='190' y2='48' stroke='currentColor'/>" +
      "<line x1='178' y1='93' x2='178' y2='138' stroke='currentColor'/><line x1='178' y1='138' x2='190' y2='138' stroke='currentColor'/>" +
      "<rect x='268' y='75' width='42' height='36' rx='4' fill='none' stroke='#059669'/><text x='272' y='97' fill='#059669'>NAND</text><circle cx='314' cy='93' r='3' fill='none' stroke='#059669'/>" +
      "<line x1='239' y1='39' x2='256' y2='39' stroke='currentColor'/><line x1='256' y1='39' x2='256' y2='82' stroke='currentColor'/><line x1='256' y1='82' x2='268' y2='82' stroke='currentColor'/>" +
      "<line x1='239' y1='145' x2='256' y2='145' stroke='currentColor'/><line x1='256' y1='145' x2='256' y2='104' stroke='currentColor'/><line x1='256' y1='104' x2='268' y2='104' stroke='currentColor'/>" +
      "<line x1='317' y1='93' x2='335' y2='93' stroke='#059669'/><text x='322' y='86' fill='#059669'>Y</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$A\\bar{B}+\\bar{A}B$" },
      { id: "B", content: "$AB+\\overline{AB}$" },
      { id: "C", content: "$\\bar{A}\\bar{B}+AB$" },
      { id: "D", content: "$\\overline{AB}$" },
    ],
    correctAnswer: "A",
    solution:
      "**This is the classic XOR built from four NAND gates.**\n**Step 1 — $G_2$.** $G_2=\\overline{AB}=\\bar A+\\bar B$.\n**Step 2 — $G_1=\\overline{A\\cdot G_2}=\\overline{A(\\bar A+\\bar B)}=\\overline{A\\bar B}=\\bar A+B$.**\n**Step 3 — $G_3=\\overline{B\\cdot G_2}=\\overline{B(\\bar A+\\bar B)}=\\overline{\\bar A B}=A+\\bar B$.**\n**Step 4 — Output $Y=\\overline{G_1\\cdot G_3}=\\overline{(\\bar A+B)(A+\\bar B)}$.** Expanding: $(\\bar A+B)(A+\\bar B)=\\bar A\\bar B+AB$, so $Y=\\overline{\\bar A\\bar B+AB}=A\\bar B+\\bar A B$.\n**Result:** $Y=A\\bar B+\\bar A B=A\\oplus B$ (XOR).\n\n**Verify with a truth table:** $A,B=00\\to0$, $01\\to1$, $10\\to1$, $11\\to0$ ✓ (XOR).\n**Shortcut:** Recognise the 4-NAND topology — its output is always XOR.\n**Common mistake:** Treating $G_2$'s output as $AB$ (forgetting the inversion bubble), or stopping at one gate.\n**Concept tested:** Universal NAND gates, Boolean simplification, XOR realisation.\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "Four NANDs in this arrangement give XOR; build the truth table.",
    explanation: "$Y=A\\oplus B=A\\bar B+\\bar A B$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Logic Gates", "NAND / XOR Realisation", "boolean-algebra"],
  },
  {
    id: "pyq-jm19-12jan-s1-q21",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism & Moving Charges",
    isRepeat: false,
    repeatYears: [],
    content:
      "Two infinitely long, identical wires are bent by $90^\\circ$ and placed so that segments $LP$ and $QM$ are along the $x$-axis, while $PS$ and $QN$ are parallel to the $y$-axis. If $OP=OQ=4\\,\\text{cm}$, the magnitude of the magnetic field at $O$ is $10^{-4}\\,\\text{T}$, and the two wires carry equal currents, the magnitude of the current in each wire and the direction of the magnetic field at $O$ will be ($\\mu_0=4\\pi\\times10^{-7}\\,\\text{NA}^{-2}$):\n\n" +
      "<div style='max-width:280px;margin:14px auto'><svg viewBox='0 0 280 170' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='20' y1='90' x2='260' y2='90' stroke='currentColor' stroke-dasharray='2 2'/><text x='250' y='84' fill='currentColor'>x</text>" +
      "<line x1='140' y1='160' x2='140' y2='15' stroke='currentColor' stroke-dasharray='2 2'/><text x='146' y='22' fill='currentColor'>y</text>" +
      "<circle cx='140' cy='90' r='3' fill='#dc2626'/><text x='126' y='86' fill='#dc2626'>O</text>" +
      "<line x1='30' y1='90' x2='100' y2='90' stroke='#2563eb' stroke-width='2'/><polygon points='70,90 60,86 60,94' fill='#2563eb'/><text x='28' y='104' fill='#2563eb'>L</text><text x='96' y='104' fill='#2563eb'>P</text>" +
      "<line x1='100' y1='90' x2='100' y2='25' stroke='#2563eb' stroke-width='2'/><polygon points='100,50 96,60 104,60' fill='#2563eb'/><text x='92' y='22' fill='#2563eb'>S</text>" +
      "<line x1='250' y1='90' x2='180' y2='90' stroke='#059669' stroke-width='2'/><polygon points='210,90 220,86 220,94' fill='#059669'/><text x='252' y='104' fill='#059669'>M</text><text x='168' y='86' fill='#059669'>Q</text>" +
      "<line x1='180' y1='90' x2='180' y2='155' stroke='#059669' stroke-width='2'/><polygon points='180,130 176,120 184,120' fill='#059669'/><text x='174' y='168' fill='#059669'>N</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$20\\,\\text{A}$, perpendicular out of the page" },
      { id: "B", content: "$40\\,\\text{A}$, perpendicular out of the page" },
      { id: "C", content: "$20\\,\\text{A}$, perpendicular into the page" },
      { id: "D", content: "$40\\,\\text{A}$, perpendicular into the page" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Collinear segments give zero.** $LP$ and $QM$ lie along the $x$-axis, which passes through $O$. A straight wire produces **no** field at points on its own line, so these contribute $0$.\n**Step 2 — Each vertical (semi-infinite) segment.** $PS$ starts at $P$ (foot of perpendicular from $O$, distance $d=4\\,\\text{cm}$) and runs to $\\infty$. Field of a semi-infinite wire with the near end at the foot:\n$B=\\dfrac{\\mu_0 I}{4\\pi d}(\\sin90^\\circ-\\sin0^\\circ)=\\dfrac{\\mu_0 I}{4\\pi d}$. The segment $QN$ gives an equal contribution.\n**Step 3 — Add and solve.** $B=2\\cdot\\dfrac{\\mu_0 I}{4\\pi d}=\\dfrac{\\mu_0 I}{2\\pi d}$.\n$10^{-4}=\\dfrac{(4\\pi\\times10^{-7})I}{2\\pi(0.04)}=5\\times10^{-6}\\,I\\Rightarrow I=20\\,\\text{A}$.\n**Step 4 — Direction.** Both currents (up at $PS$, down at $QN$) give $\\vec B$ **into the page** at $O$ (right-hand rule).\n\n**Shortcut:** Only the two vertical half-lines matter; total $B=\\dfrac{\\mu_0 I}{2\\pi d}$ (same as one full infinite wire).\n**Common mistake:** Including the horizontal arms (they're zero), or using $\\dfrac{\\mu_0 I}{4\\pi d}$ for the full field (forgetting the factor $2$) giving $40\\,\\text{A}$.\n**Concept tested:** Biot–Savart for semi-infinite wires, superposition, direction by right-hand rule.\n**Difficulty:** Hard · **Time:** ~2.5 min.",
    hint: "Horizontal arms give 0; two semi-infinite verticals give $B=\\mu_0 I/2\\pi d$, into the page.",
    explanation: "$10^{-4}=\\mu_0 I/(2\\pi\\cdot0.04)\\Rightarrow I=20$ A, into page.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["Biot–Savart Law", "Field of Semi-Infinite Wire", "superposition"],
  },
  {
    id: "pyq-jm19-12jan-s1-q22",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "atoms",
    chapterTitle: "Atoms",
    isRepeat: false,
    repeatYears: [],
    content:
      "A particle of mass $m$ moves in a circular orbit in a central potential field $U(r)=\\dfrac{1}{2}kr^2$. If Bohr's quantization conditions are applied, radii of possible orbits and energy levels vary with quantum number $n$ as:",
    options: [
      { id: "A", content: "$r_n\\propto\\sqrt{n},\\quad E_n\\propto n$" },
      { id: "B", content: "$r_n\\propto\\sqrt{n},\\quad E_n\\propto\\dfrac{1}{n}$" },
      { id: "C", content: "$r_n\\propto n,\\quad E_n\\propto n$" },
      { id: "D", content: "$r_n\\propto n^2,\\quad E_n\\propto\\dfrac{1}{n^2}$" },
    ],
    correctAnswer: "A",
    solution:
      "**Step 1 — Central force.** $F=-\\dfrac{dU}{dr}=-kr$; magnitude $kr$ provides centripetal force: $kr=\\dfrac{mv^2}{r}\\Rightarrow v^2=\\dfrac{kr^2}{m}$, i.e. $v=r\\sqrt{k/m}$.\n**Step 2 — Bohr quantization.** $mvr=n\\hbar\\Rightarrow m\\left(r\\sqrt{k/m}\\right)r=n\\hbar\\Rightarrow r^2\\propto n\\Rightarrow r_n\\propto\\sqrt{n}$.\n**Step 3 — Energy.** $E=\\dfrac12 mv^2+\\dfrac12 kr^2=\\dfrac12 kr^2+\\dfrac12 kr^2=kr^2\\propto r^2\\propto n\\Rightarrow E_n\\propto n$.\n\n**Shortcut:** For $U\\propto r^2$ (3-D SHM), KE $=$ PE on a circular orbit, so $E\\propto r^2\\propto n$, and $L\\propto r^2$ forces $r\\propto\\sqrt n$.\n**Common mistake:** Carrying over Coulomb results ($r\\propto n^2$, $E\\propto1/n^2$) blindly — that's only for $U\\propto-1/r$.\n**Concept tested:** Bohr quantization in a non-Coulomb (harmonic) potential.\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "$kr=mv^2/r$ and $mvr=n\\hbar$; then $E=KE+PE$.",
    explanation: "$r\\propto\\sqrt n$, $E=kr^2\\propto n$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Bohr Model", "Quantization in Harmonic Potential", "central-force"],
  },
  {
    id: "pyq-jm19-12jan-s1-q23",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "magnetism",
    chapterTitle: "Magnetism & Moving Charges",
    isRepeat: false,
    repeatYears: [],
    content:
      "A proton and an $\\alpha$-particle (with their masses in the ratio $1:4$ and charges in the ratio $1:2$) are accelerated from rest through a potential difference $V$. If a uniform magnetic field $B$ is set up perpendicular to their velocities, the ratio of the radii $r_p:r_\\alpha$ of the circular paths described by them will be:",
    options: [
      { id: "A", content: "$1:\\sqrt{2}$" },
      { id: "B", content: "$1:2$" },
      { id: "C", content: "$1:3$" },
      { id: "D", content: "$1:\\sqrt{3}$" },
    ],
    correctAnswer: "A",
    solution:
      "**Step 1 — Radius in terms of accelerating PD.** From $qV=\\dfrac{p^2}{2m}$, momentum $p=\\sqrt{2mqV}$, and $r=\\dfrac{p}{qB}=\\dfrac{\\sqrt{2mqV}}{qB}=\\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}$.\n**Step 2 — Ratio (same $V$, $B$).** $\\dfrac{r_p}{r_\\alpha}=\\sqrt{\\dfrac{m_p/q_p}{m_\\alpha/q_\\alpha}}=\\sqrt{\\dfrac{m_p}{q_p}\\cdot\\dfrac{q_\\alpha}{m_\\alpha}}=\\sqrt{\\dfrac{1}{1}\\cdot\\dfrac{2}{4}}=\\sqrt{\\dfrac12}=\\dfrac{1}{\\sqrt2}$.\n$\\Rightarrow r_p:r_\\alpha=1:\\sqrt2$.\n\n**Shortcut:** $r\\propto\\sqrt{m/q}$ for a fixed accelerating voltage; plug the ratios $m\\,1{:}4$, $q\\,1{:}2$.\n**Common mistake:** Using $r\\propto\\sqrt{m}$ only (forgetting $q$ in both the momentum and the radius), or using $r\\propto m/q$ (valid only at fixed speed, not fixed $V$).\n**Concept tested:** Circular motion in $B$, radius vs. accelerating potential.\n**Difficulty:** Easy · **Time:** ~60 s.",
    hint: "$r=\\frac1B\\sqrt{2mV/q}\\Rightarrow r\\propto\\sqrt{m/q}$.",
    explanation: "$\\sqrt{(1/1)(2/4)}=1/\\sqrt2$.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Charged Particle in Magnetic Field", "Radius vs Accelerating PD", "proton-alpha"],
  },
  {
    id: "pyq-jm19-12jan-s1-q24",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "rotational-mechanics",
    chapterTitle: "Rotational Mechanics",
    isRepeat: false,
    repeatYears: [],
    content:
      "Let the moment of inertia of a hollow cylinder of length $30\\,\\text{cm}$ (inner radius $10\\,\\text{cm}$ and outer radius $20\\,\\text{cm}$), about its axis, be $I$. The radius of a thin cylinder of the same mass such that its moment of inertia about its axis is also $I$, is:",
    options: [
      { id: "A", content: "$12\\,\\text{cm}$" },
      { id: "B", content: "$16\\,\\text{cm}$" },
      { id: "C", content: "$14\\,\\text{cm}$" },
      { id: "D", content: "$18\\,\\text{cm}$" },
    ],
    correctAnswer: "B",
    solution:
      "**Step 1 — Hollow cylinder MOI.** $I=\\dfrac12 M\\left(R_1^2+R_2^2\\right)=\\dfrac12 M\\left(10^2+20^2\\right)=\\dfrac12 M(500)=250M$ (cm²·kg).\n**Step 2 — Thin (ring-like) cylinder.** All mass at radius $R$: $I=MR^2$.\n**Step 3 — Equate (same $M$).** $MR^2=250M\\Rightarrow R=\\sqrt{250}=5\\sqrt{10}\\approx15.8\\approx16\\,\\text{cm}$.\n\n**Shortcut:** Effective ('radius of gyration') $R=\\sqrt{\\dfrac{R_1^2+R_2^2}{2}}=\\sqrt{\\dfrac{100+400}{2}}=\\sqrt{250}\\approx16\\,\\text{cm}$.\n**Common mistake:** Averaging the radii linearly ($\\tfrac{10+20}{2}=15$), or using $\\dfrac12 R^2$ for the thin cylinder (it's a shell ⇒ $R^2$). Length is irrelevant.\n**Concept tested:** Moment of inertia of a thick cylindrical shell, radius of gyration.\n**Difficulty:** Easy · **Time:** ~60 s.",
    hint: "$\\frac12M(R_1^2+R_2^2)=MR^2\\Rightarrow R=\\sqrt{(R_1^2+R_2^2)/2}$.",
    explanation: "$R=\\sqrt{250}\\approx16$ cm.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["Moment of Inertia", "Radius of Gyration", "hollow-cylinder"],
  },
  {
    id: "pyq-jm19-12jan-s1-q25",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "electromagnetic-induction",
    chapterTitle: "Electromagnetic Induction",
    isRepeat: false,
    repeatYears: [],
    content:
      "In the figure shown, a circuit contains two identical resistors with resistance $R=5\\,\\Omega$ and an inductance with $L=2\\,\\text{mH}$. An ideal battery of $15\\,\\text{V}$ is connected in the circuit. What will be the current through the battery long after the switch is closed?\n\n" +
      "<div style='max-width:280px;margin:14px auto'><svg viewBox='0 0 280 150' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='30' y1='30' x2='250' y2='30' stroke='currentColor'/><line x1='30' y1='120' x2='250' y2='120' stroke='currentColor'/>" +
      "<line x1='30' y1='30' x2='30' y2='120' stroke='currentColor'/>" +
      "<line x1='26' y1='66' x2='34' y2='66' stroke='currentColor' stroke-width='3'/><line x1='22' y1='78' x2='38' y2='78' stroke='currentColor'/><text x='6' y='78' fill='currentColor'>15V</text>" +
      "<circle cx='70' cy='30' r='4' fill='none' stroke='#dc2626'/><line x1='70' y1='30' x2='84' y2='20' stroke='#dc2626'/><text x='66' y='16' fill='#dc2626'>S</text>" +
      "<path d='M150,30 q5,8 10,0 q5,8 10,0 q5,8 10,0' fill='none' stroke='#2563eb'/><text x='150' y='22' fill='#2563eb'>L</text>" +
      "<rect x='150' y='60' width='14' height='34' fill='none' stroke='#059669'/><text x='130' y='82' fill='#059669'>R</text>" +
      "<line x1='157' y1='30' x2='157' y2='60' stroke='currentColor'/><line x1='157' y1='94' x2='157' y2='120' stroke='currentColor'/>" +
      "<rect x='223' y='58' width='14' height='34' fill='none' stroke='#059669'/><text x='242' y='82' fill='#059669'>R</text>" +
      "<line x1='230' y1='30' x2='230' y2='58' stroke='currentColor'/><line x1='230' y1='92' x2='230' y2='120' stroke='currentColor'/>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$5.5\\,\\text{A}$" },
      { id: "B", content: "$7.5\\,\\text{A}$" },
      { id: "C", content: "$3\\,\\text{A}$" },
      { id: "D", content: "$6\\,\\text{A}$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Steady state ($t\\to\\infty$).** Long after closing, $\\dfrac{dI}{dt}=0$, so the inductor behaves as a plain wire (short circuit).\n**Step 2 — Effect on the circuit.** The ideal inductor short-circuits the resistor in parallel with it (the middle $R$), so no current flows through that resistor.\n**Step 3 — Remaining circuit.** Only the second $R=5\\,\\Omega$ carries the battery current:\n$I=\\dfrac{V}{R}=\\dfrac{15}{5}=3\\,\\text{A}$.\n\n**Shortcut:** At $t\\to\\infty$ replace $L$ by a wire; at $t=0^+$ replace it by an open switch. Here the wire shorts the parallel $R$, leaving $15/5=3\\,\\text{A}$.\n**Common mistake:** Putting both resistors in parallel ($2.5\\,\\Omega\\Rightarrow6\\,\\text{A}$) — but the inductor shorts one of them out at steady state. ($L$'s value is irrelevant for the final current.)\n**Concept tested:** Transient $LR$ circuit, steady-state inductor as a short.\n**Difficulty:** Medium · **Time:** ~90 s.",
    hint: "At $t\\to\\infty$, $L$ is a wire and shorts the $R$ in parallel with it.",
    explanation: "Steady state: $I=15/5=3$ A.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["LR Circuit", "Steady-State Inductor", "transient"],
  },
  {
    id: "pyq-jm19-12jan-s1-q26",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "capacitance",
    chapterTitle: "Capacitance",
    isRepeat: false,
    repeatYears: [],
    content:
      "In the figure shown, after the switch $S$ is turned from position $A$ to position $B$, the energy dissipated in the circuit in terms of capacitance $C$ and total charge $Q$ is:\n\n" +
      "<div style='max-width:280px;margin:14px auto'><svg viewBox='0 0 280 150' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<text x='95' y='22' fill='currentColor'>A</text><text x='150' y='22' fill='currentColor'>B</text>" +
      "<circle cx='100' cy='35' r='3' fill='none' stroke='currentColor'/><circle cx='155' cy='35' r='3' fill='none' stroke='currentColor'/>" +
      "<circle cx='127' cy='55' r='4' fill='#dc2626'/><line x1='127' y1='55' x2='103' y2='38' stroke='#dc2626'/><text x='133' y='58' fill='#dc2626'>S</text>" +
      "<line x1='40' y1='35' x2='100' y2='35' stroke='currentColor'/><line x1='155' y1='35' x2='240' y2='35' stroke='currentColor'/>" +
      "<line x1='36' y1='66' x2='44' y2='66' stroke='currentColor' stroke-width='3'/><line x1='32' y1='76' x2='48' y2='76' stroke='currentColor'/><text x='18' y='74' fill='currentColor'>ε</text>" +
      "<line x1='40' y1='35' x2='40' y2='60' stroke='currentColor'/><line x1='40' y1='80' x2='40' y2='120' stroke='currentColor'/>" +
      "<line x1='120' y1='70' x2='140' y2='70' stroke='#2563eb' stroke-width='2'/><line x1='120' y1='80' x2='140' y2='80' stroke='#2563eb' stroke-width='2'/><text x='106' y='80' fill='#2563eb'>C</text>" +
      "<line x1='130' y1='55' x2='130' y2='70' stroke='currentColor'/><line x1='130' y1='80' x2='130' y2='120' stroke='currentColor'/>" +
      "<line x1='220' y1='68' x2='240' y2='68' stroke='#059669' stroke-width='2'/><line x1='220' y1='82' x2='240' y2='82' stroke='#059669' stroke-width='2'/><text x='244' y='80' fill='#059669'>3C</text>" +
      "<line x1='230' y1='35' x2='230' y2='68' stroke='currentColor'/><line x1='230' y1='82' x2='230' y2='120' stroke='currentColor'/>" +
      "<line x1='40' y1='120' x2='230' y2='120' stroke='currentColor'/>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$\\dfrac{1}{8}\\dfrac{Q^2}{C}$" },
      { id: "B", content: "$\\dfrac{3}{8}\\dfrac{Q^2}{C}$" },
      { id: "C", content: "$\\dfrac{5}{8}\\dfrac{Q^2}{C}$" },
      { id: "D", content: "$\\dfrac{3}{4}\\dfrac{Q^2}{C}$" },
    ],
    correctAnswer: "B",
    solution:
      "**Step 1 — Initial state (S at A).** $C$ is charged by the source to total charge $Q$, initial voltage $V_0=\\dfrac{Q}{C}$; the $3C$ capacitor is uncharged.\n**Step 2 — Switch to B.** $C$ (charged) is connected to $3C$ (uncharged); charge redistributes until they share a common voltage. The source is disconnected.\n**Step 3 — Energy lost in connecting a charged to an uncharged capacitor.**\n$\\Delta E=\\dfrac12\\cdot\\dfrac{C_1C_2}{C_1+C_2}\\,V_0^2=\\dfrac12\\cdot\\dfrac{C\\cdot3C}{4C}\\left(\\dfrac{Q}{C}\\right)^2=\\dfrac12\\cdot\\dfrac{3C}{4}\\cdot\\dfrac{Q^2}{C^2}=\\dfrac{3}{8}\\dfrac{Q^2}{C}$.\n\n**Shortcut:** Energy dissipated $=\\dfrac12\\dfrac{C_1C_2}{C_1+C_2}(\\Delta V)^2$ with $\\Delta V=V_0-0=Q/C$; the $\\dfrac{C_1C_2}{C_1+C_2}=\\dfrac{3C}{4}$ is the series combination.\n**Common mistake:** Computing final energy of the parallel pair directly and forgetting it equals $\\tfrac34$ of initial (loss $=\\tfrac14$ of $\\tfrac{Q^2}{2C}$)... careful: loss $=\\dfrac{Q^2}{2C}-\\dfrac{Q^2}{2(4C)}=\\dfrac{3Q^2}{8C}$ ✓.\n**Concept tested:** Charge sharing between capacitors, irreversible energy loss.\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "$\\Delta E=\\frac12\\frac{C_1C_2}{C_1+C_2}V_0^2$ with $V_0=Q/C$.",
    explanation: "$\\frac12\\cdot\\frac{3C}{4}\\cdot(Q/C)^2=\\frac{3Q^2}{8C}$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Capacitors", "Charge Sharing Energy Loss", "redistribution"],
  },
  {
    id: "pyq-jm19-12jan-s1-q27",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "gravitation",
    chapterTitle: "Gravitation",
    isRepeat: false,
    repeatYears: [],
    content:
      "A satellite of mass $M$ is in a circular orbit of radius $R$ about the centre of the earth. A meteorite of the same mass, falling towards the earth, collides with the satellite completely inelastically. The speeds of the satellite and the meteorite are the same, just before the collision. The subsequent motion of the combined body will be:",
    options: [
      { id: "A", content: "Such that it escapes to infinity" },
      { id: "B", content: "In an elliptical orbit" },
      { id: "C", content: "In the same circular orbit of radius $R$" },
      { id: "D", content: "In a circular orbit of a different radius" },
    ],
    correctAnswer: "B",
    solution:
      "**Step 1 — Velocities before collision.** Satellite: tangential speed $v=\\sqrt{\\dfrac{GM_e}{R}}$. Meteorite: same **speed** $v$ but directed **radially** (falling inward), perpendicular to the satellite's velocity.\n**Step 2 — Inelastic collision (momentum conservation).** Combined mass $2M$:\n• Tangential: $Mv=2M\\,v_t\\Rightarrow v_t=\\dfrac{v}{2}$.\n• Radial: $Mv=2M\\,v_r\\Rightarrow v_r=\\dfrac{v}{2}$.\nResultant speed $v'=\\sqrt{v_t^2+v_r^2}=\\dfrac{v}{\\sqrt2}$.\n**Step 3 — Nature of orbit.** $v'=\\dfrac{v}{\\sqrt2}<v$ (less than circular-orbit speed) and the velocity now has a radial component (not purely tangential). Check escape: $v'=\\dfrac{v}{\\sqrt2}=\\sqrt{\\dfrac{GM_e}{2R}}<v_{\\text{esc}}=\\sqrt{\\dfrac{2GM_e}{R}}$, so it stays bound. A bound orbit that isn't circular ⇒ **elliptical**.\n\n**Shortcut:** New KE $=\\dfrac12(2M)\\left(\\dfrac{v}{\\sqrt2}\\right)^2=\\dfrac12 Mv^2 = \\tfrac12$(circular KE for $2M$)... it's bound but not circular ⇒ ellipse.\n**Common mistake:** Thinking equal speeds means it continues in the same circle, or that it escapes.\n**Concept tested:** Inelastic collision in orbit, total energy/angular momentum ⇒ orbit shape.\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "Radial + tangential momentum each halve; resultant $v/\\sqrt2$ — bound but non-circular.",
    explanation: "Speed becomes $v/\\sqrt2$ with a radial component ⇒ elliptical orbit.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Orbital Mechanics", "Collision in Orbit", "elliptical-orbit"],
  },
  {
    id: "pyq-jm19-12jan-s1-q28",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "current-electricity",
    chapterTitle: "Current Electricity",
    isRepeat: false,
    repeatYears: [],
    content:
      "The galvanometer deflection, when key $K_1$ is closed but $K_2$ is open, equals $\\theta_0$. On closing $K_2$ also and adjusting $R_2$ to $5\\,\\Omega$, the deflection in the galvanometer becomes $\\dfrac{\\theta_0}{5}$. The resistance of the galvanometer is then given by [neglect the internal resistance of the battery] ($R_1=220\\,\\Omega$):\n\n" +
      "<div style='max-width:280px;margin:14px auto'><svg viewBox='0 0 280 160' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='30' y1='40' x2='250' y2='40' stroke='currentColor'/><line x1='30' y1='40' x2='30' y2='130' stroke='currentColor'/><line x1='250' y1='40' x2='250' y2='130' stroke='currentColor'/><line x1='30' y1='130' x2='250' y2='130' stroke='currentColor'/>" +
      "<rect x='55' y='33' width='34' height='14' fill='none' stroke='#059669'/><text x='52' y='30' fill='#059669'>R₁=220Ω</text>" +
      "<rect x='120' y='55' width='14' height='4' fill='none' stroke='currentColor'/><text x='112' y='52' fill='currentColor'>K₂</text>" +
      "<rect x='150' y='52' width='30' height='12' fill='none' stroke='#2563eb'/><text x='184' y='61' fill='#2563eb'>R₂</text>" +
      "<line x1='110' y1='58' x2='120' y2='58' stroke='currentColor'/><line x1='134' y1='58' x2='150' y2='58' stroke='currentColor'/>" +
      "<line x1='110' y1='40' x2='110' y2='58' stroke='currentColor'/><line x1='180' y1='58' x2='220' y2='58' stroke='currentColor'/><line x1='220' y1='58' x2='220' y2='40' stroke='currentColor'/>" +
      "<circle cx='150' cy='90' r='12' fill='none' stroke='#dc2626'/><text x='145' y='94' fill='#dc2626'>G</text>" +
      "<line x1='110' y1='40' x2='110' y2='90' stroke='currentColor'/><line x1='110' y1='90' x2='138' y2='90' stroke='currentColor'/><line x1='162' y1='90' x2='220' y2='90' stroke='currentColor'/><line x1='220' y1='90' x2='220' y2='40' stroke='currentColor'/>" +
      "<line x1='120' y1='130' x2='130' y2='130' stroke='currentColor' stroke-width='3'/><line x1='133' y1='124' x2='133' y2='136' stroke='currentColor'/><rect x='150' y='124' width='12' height='4' fill='none' stroke='currentColor'/><text x='148' y='148' fill='currentColor'>K₁</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "$5\\,\\Omega$" },
      { id: "B", content: "$22\\,\\Omega$" },
      { id: "C", content: "$25\\,\\Omega$" },
      { id: "D", content: "$12\\,\\Omega$" },
    ],
    correctAnswer: "B",
    solution:
      "**Step 1 — $K_2$ open.** Only $R_1$ and $G$ in series: $I_g^{(1)}=\\dfrac{E}{R_1+G}$, and deflection $\\theta_0\\propto I_g^{(1)}$.\n**Step 2 — $K_2$ closed (shunt $R_2$ across $G$).** Battery current $I=\\dfrac{E}{R_1+\\dfrac{R_2G}{R_2+G}}$; current through $G$: $I_g^{(2)}=I\\cdot\\dfrac{R_2}{R_2+G}=\\dfrac{E\\,R_2}{R_1(R_2+G)+R_2G}$.\n**Step 3 — Deflection ratio $=\\dfrac15$.**\n$\\dfrac{I_g^{(2)}}{I_g^{(1)}}=\\dfrac{R_2(R_1+G)}{R_1(R_2+G)+R_2G}=\\dfrac15$.\nPut $R_1=220,\\,R_2=5$: $\\dfrac{5(220+G)}{220(5+G)+5G}=\\dfrac15$.\n$\\Rightarrow 25(220+G)=1100+225G\\Rightarrow5500+25G=1100+225G\\Rightarrow4400=200G\\Rightarrow G=22\\,\\Omega$.\n\n**Shortcut:** With $R_1\\gg R_2,G$, the battery current barely changes, so $\\dfrac{\\theta_0/5}{\\theta_0}\\approx\\dfrac{R_2}{R_2+G}\\Rightarrow\\dfrac15=\\dfrac{5}{5+G}\\Rightarrow G=20\\,\\Omega$ — close to the exact $22\\,\\Omega$ (good for elimination).\n**Common mistake:** Ignoring the change in total battery current (using only the current-divider), or mishandling the shunt $\\dfrac{R_2G}{R_2+G}$.\n**Concept tested:** Galvanometer + shunt, current divider, circuit algebra.\n**Difficulty:** Hard · **Time:** ~3 min.",
    hint: "Deflection ∝ current through G; equate $I_g^{(2)}/I_g^{(1)}=1/5$ with shunt $R_2$.",
    explanation: "Solving $5(220+G)/[220(5+G)+5G]=1/5$ gives $G=22\\,\\Omega$.",
    type: "MCQ_SINGLE",
    difficulty: "HARD",
    marks: 4,
    negativeMarks: 1,
    tags: ["Galvanometer", "Shunt / Current Divider", "moving-coil"],
  },
  {
    id: "pyq-jm19-12jan-s1-q29",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "dual-nature",
    chapterTitle: "Dual Nature of Matter & Radiation",
    isRepeat: false,
    repeatYears: [],
    content:
      "A particle $A$ of mass $m$ and charge $q$ is accelerated by a potential difference of $50\\,\\text{V}$. Another particle $B$ of mass $4m$ and charge $q$ is accelerated by a potential difference of $2500\\,\\text{V}$. The ratio of de-Broglie wavelengths $\\dfrac{\\lambda_A}{\\lambda_B}$ is close to:",
    options: [
      { id: "A", content: "$10.00$" },
      { id: "B", content: "$0.07$" },
      { id: "C", content: "$14.14$" },
      { id: "D", content: "$4.47$" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — de-Broglie wavelength after acceleration.** $\\lambda=\\dfrac{h}{p}=\\dfrac{h}{\\sqrt{2mqV}}$.\n**Step 2 — Ratio.** $\\dfrac{\\lambda_A}{\\lambda_B}=\\sqrt{\\dfrac{m_B\\,q_B\\,V_B}{m_A\\,q_A\\,V_A}}=\\sqrt{\\dfrac{(4m)(q)(2500)}{(m)(q)(50)}}=\\sqrt{\\dfrac{4\\times2500}{50}}=\\sqrt{200}=10\\sqrt2\\approx14.14$.\n\n**Shortcut:** $\\lambda\\propto\\dfrac{1}{\\sqrt{mqV}}$; with equal charge, $\\dfrac{\\lambda_A}{\\lambda_B}=\\sqrt{\\dfrac{m_BV_B}{m_AV_A}}=\\sqrt{4\\cdot50}=\\sqrt{200}=14.14$.\n**Common mistake:** Inverting the ratio (mass/PD of the wrong particle on top) ⇒ $0.07$; or forgetting the square root ⇒ $200$.\n**Concept tested:** de-Broglie wavelength of accelerated charged particles.\n**Difficulty:** Easy · **Time:** ~60 s.",
    hint: "$\\lambda=h/\\sqrt{2mqV}$; equal charges ⇒ $\\lambda_A/\\lambda_B=\\sqrt{m_BV_B/(m_AV_A)}$.",
    explanation: "$\\sqrt{(4\\cdot2500)/(1\\cdot50)}=\\sqrt{200}=14.14$.",
    type: "MCQ_SINGLE",
    difficulty: "EASY",
    marks: 4,
    negativeMarks: 1,
    tags: ["de-Broglie Wavelength", "Accelerated Charged Particle", "matter-waves"],
  },
  {
    id: "pyq-jm19-12jan-s1-q30",
    exam: "JEE_MAIN",
    year: 2019,
    session: "Jan 2019 · Shift 1",
    chapterSlug: "electrostatics",
    chapterTitle: "Electrostatics",
    isRepeat: false,
    repeatYears: [],
    content:
      "There is a uniform spherically symmetric surface charge density at a distance $R_0$ from the origin. The charge distribution is initially at rest and starts expanding because of mutual repulsion. The figure that best represents the speed $V(R(t))$ of the distribution as a function of its instantaneous radius $R(t)$ is:\n\n" +
      "<div style='max-width:240px;margin:14px auto'><svg viewBox='0 0 240 140' style='width:100%;height:auto' font-family='sans-serif' font-size='11'>" +
      "<line x1='40' y1='15' x2='40' y2='115' stroke='currentColor'/><line x1='40' y1='115' x2='225' y2='115' stroke='currentColor'/>" +
      "<text x='6' y='20' fill='currentColor'>V(R)</text><text x='210' y='132' fill='currentColor'>R(t)</text>" +
      "<line x1='40' y1='45' x2='225' y2='45' stroke='#2563eb' stroke-dasharray='3 3'/><text x='20' y='49' fill='#2563eb'>V₀</text>" +
      "<path d='M70,115 C95,55 150,48 220,46' fill='none' stroke='#dc2626' stroke-width='2'/>" +
      "<line x1='70' y1='112' x2='70' y2='118' stroke='currentColor'/><text x='60' y='132' fill='currentColor'>R₀</text>" +
      "</svg></div>",
    options: [
      { id: "A", content: "Speed rises ever more steeply (concave up) without bound" },
      { id: "B", content: "S-shaped rise saturating at large $R$" },
      { id: "C", content: "Rises from $0$ at $R_0$ and saturates to a constant $V_0$" },
      { id: "D", content: "Rises to a maximum then falls back to zero" },
    ],
    correctAnswer: "C",
    solution:
      "**Step 1 — Energy conservation.** Self-energy of a charged shell of radius $R$: $U(R)=\\dfrac{kQ^2}{2R}\\propto\\dfrac{1}{R}$. As it expands, PE converts to KE:\n$\\dfrac12 MV^2=U(R_0)-U(R)=\\dfrac{kQ^2}{2}\\left(\\dfrac{1}{R_0}-\\dfrac{1}{R}\\right)$.\n**Step 2 — Speed vs. radius.** $V(R)=\\sqrt{\\dfrac{kQ^2}{M}\\left(\\dfrac{1}{R_0}-\\dfrac{1}{R}\\right)}$.\n**Step 3 — Behaviour.** At $R=R_0$: $V=0$ (starts from rest). As $R\\to\\infty$: $\\dfrac1R\\to0$, so $V\\to V_0=\\sqrt{\\dfrac{kQ^2}{MR_0}}$ — a finite **saturation** speed. The curve rises from $0$ and asymptotes to $V_0$.\n\n**Shortcut:** $V\\propto\\sqrt{1-\\dfrac{R_0}{R}}$ — zero at $R_0$, monotonically increasing, asymptote $V_0$ (like a charged particle reaching terminal speed at infinity).\n**Common mistake:** Choosing an unbounded curve (energy is finite, so $V$ can't grow forever) or a curve that falls back (no restoring mechanism — repulsion only accelerates outward).\n**Concept tested:** Electrostatic self-energy of a shell, energy conservation, asymptotic speed.\n**Difficulty:** Medium · **Time:** ~2 min.",
    hint: "$\\frac12MV^2=\\frac{kQ^2}{2}(1/R_0-1/R)$ ⇒ $V\\to$ const as $R\\to\\infty$.",
    explanation: "$V\\propto\\sqrt{1-R_0/R}$: starts at 0, saturates at $V_0$.",
    type: "MCQ_SINGLE",
    difficulty: "MEDIUM",
    marks: 4,
    negativeMarks: 1,
    tags: ["Electrostatic Self-Energy", "Energy Conservation (Expanding Shell)", "graph"],
  },
];

// ── Derived utilities ────────────────────────────────────────────────────────

export const ALL_PYQ_YEARS = [...new Set(PYQ_ENTRIES.map((p) => p.year))].sort(
  (a, b) => b - a
);

export const ALL_PYQ_CHAPTERS = [
  ...new Map(
    PYQ_ENTRIES.map((p) => [p.chapterSlug, { slug: p.chapterSlug, title: p.chapterTitle }])
  ).values(),
].sort((a, b) => a.title.localeCompare(b.title));

export const PYQ_EXAM_COUNTS = PYQ_ENTRIES.reduce<Record<string, number>>(
  (acc, p) => {
    acc[p.exam] = (acc[p.exam] ?? 0) + 1;
    return acc;
  },
  {}
);

export const REPEAT_PYQ_COUNT = PYQ_ENTRIES.filter((p) => p.isRepeat).length;

export function getPYQsByChapter(chapterSlug: string): PYQEntry[] {
  return PYQ_ENTRIES.filter((p) => p.chapterSlug === chapterSlug);
}
