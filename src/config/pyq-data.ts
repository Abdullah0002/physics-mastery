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
