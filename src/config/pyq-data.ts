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
