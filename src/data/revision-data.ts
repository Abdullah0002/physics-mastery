// =============================================================================
// Revision Center — static data: flashcards, quick notes, exam tips
// =============================================================================

export type Difficulty = "easy" | "medium" | "hard";
export type TipCategory = "strategy" | "mistakes" | "time" | "lastminute";

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARDS
// ─────────────────────────────────────────────────────────────────────────────

export interface FlashCard {
  id: string;
  chapter: string;      // slug — matches content/chapters/<slug>
  chapterName: string;
  topic: string;
  front: string;        // concept / term shown on the face
  back: string;         // formula / explanation (plain text, use \n for lines)
  difficulty: Difficulty;
}

export const FLASHCARDS: FlashCard[] = [
  // ── KINEMATICS ─────────────────────────────────────────────────────────────
  {
    id: "kin-1",
    chapter: "kinematics",
    chapterName: "Kinematics",
    topic: "Equations of Motion",
    front: "Three equations of uniformly accelerated motion (+ sₙ)",
    back: "v = u + at\ns = ut + ½at²\nv² = u² + 2as\nsₙ = u + a(2n−1)/2  (distance in nᵗʰ second)",
    difficulty: "easy",
  },
  {
    id: "kin-2",
    chapter: "kinematics",
    chapterName: "Kinematics",
    topic: "Projectile Motion",
    front: "Projectile: Time of flight, Range, Maximum height",
    back: "T = 2u sinθ / g\nR = u² sin2θ / g   →  max at θ = 45°\nH = u² sin²θ / 2g\nAt any t: v = √(vₓ² + vᵧ²)",
    difficulty: "easy",
  },
  {
    id: "kin-3",
    chapter: "kinematics",
    chapterName: "Kinematics",
    topic: "Relative Motion",
    front: "Relative velocity — river crossing & rain-umbrella",
    back: "v̄_AB = v̄_A − v̄_B\nRiver: drift = v_r × t,  t = d / v_b\nFor zero drift: sinθ = v_r / v_b\nRain umbrella: tilt at angle tan⁻¹(v_man / v_rain) forward",
    difficulty: "medium",
  },

  // ── LAWS OF MOTION ─────────────────────────────────────────────────────────
  {
    id: "lom-1",
    chapter: "laws-of-motion",
    chapterName: "Laws of Motion",
    topic: "Newton's Laws & Impulse",
    front: "Newton's 2nd law, Impulse, and Variable mass",
    back: "F = dp/dt = ma  (constant mass)\nImpulse: J = FΔt = Δp\nVariable mass: F_ext = ma + v_rel(dm/dt)\nThruster force = v_rel × |dm/dt|",
    difficulty: "easy",
  },
  {
    id: "lom-2",
    chapter: "laws-of-motion",
    chapterName: "Laws of Motion",
    topic: "Friction",
    front: "Static friction, Kinetic friction, Angle of repose",
    back: "f_s ≤ μ_s N  (limiting = μ_s N)\nf_k = μ_k N  (μ_k < μ_s always)\nAngle of friction φ: tanφ = μ_s\nAngle of repose θ = φ  (block just slides on incline)\nRolling friction ≪ static friction",
    difficulty: "easy",
  },
  {
    id: "lom-3",
    chapter: "laws-of-motion",
    chapterName: "Laws of Motion",
    topic: "Vertical Circular Motion",
    front: "Minimum speed at top of a vertical circle; speed at bottom",
    back: "At top:  N + mg = mv²/r  →  v_min = √(gR)  (for N = 0)\nAt bottom: by energy conservation:\n   ½mv_b² = ½mv_t² + 2mgR  →  v_b = √(5gR)\nTension at bottom: T = mg + mv_b²/R = 6mg",
    difficulty: "medium",
  },

  // ── WORK, POWER & ENERGY ───────────────────────────────────────────────────
  {
    id: "wpe-1",
    chapter: "work-power-energy",
    chapterName: "Work, Power & Energy",
    topic: "Work-Energy Theorem",
    front: "Work-energy theorem and conservative forces",
    back: "W_net = ΔKE = ½mv² − ½mu²\nW_conservative = −ΔU\nFor gravity: W = −mgΔh\nFor spring: W = −½k(x₂²−x₁²)\nPotential energy only for conservative forces",
    difficulty: "easy",
  },
  {
    id: "wpe-2",
    chapter: "work-power-energy",
    chapterName: "Work, Power & Energy",
    topic: "Elastic Collision",
    front: "1D elastic collision — final velocities",
    back: "v₁ = [(m₁−m₂)u₁ + 2m₂u₂] / (m₁+m₂)\nv₂ = [(m₂−m₁)u₂ + 2m₁u₁] / (m₁+m₂)\nEqual masses: velocities exchange completely\nCoeff. of restitution e = 1 (elastic), 0 (perfectly inelastic)",
    difficulty: "hard",
  },

  // ── SIMPLE HARMONIC MOTION ─────────────────────────────────────────────────
  {
    id: "shm-1",
    chapter: "simple-harmonic-motion",
    chapterName: "Simple Harmonic Motion",
    topic: "SHM Fundamentals",
    front: "SHM: x, v, a, energy as functions of position and time",
    back: "x = A sin(ωt + φ)\nv = ω√(A²−x²);  v_max = ωA at x = 0\na = −ω²x;  a_max = ω²A at x = ±A\nKE = ½mω²(A²−x²);  PE = ½mω²x²\nTotal E = ½mω²A²  (constant, ∝ A²)",
    difficulty: "medium",
  },

  // ── GRAVITATION ────────────────────────────────────────────────────────────
  {
    id: "grav-1",
    chapter: "gravitation",
    chapterName: "Gravitation",
    topic: "Orbital & Escape Speed",
    front: "Orbital velocity, Escape velocity, and Kepler's 3rd law",
    back: "v_o = √(GM/r) = √(gR²/r)  [r from centre]\nv_e = √(2GM/R) = √2 · v_o  (at surface)\nT² ∝ r³  (Kepler 3rd: T² = 4π²r³/GM)\nBinding Energy = −(Total Energy) = GMm/2r",
    difficulty: "medium",
  },

  // ── ELECTROSTATICS ─────────────────────────────────────────────────────────
  {
    id: "es-1",
    chapter: "electrostatics",
    chapterName: "Electrostatics",
    topic: "Coulomb's Law & Electric Field",
    front: "Coulomb's law, Electric field of a point charge",
    back: "F = kq₁q₂/r²  (k = 9×10⁹ N·m²/C²  = 1/4πε₀)\nE = kq/r²  (outward for +q, inward for −q)\nField lines: start at +, end at −; never intersect\nE inside conductor = 0 at equilibrium",
    difficulty: "easy",
  },
  {
    id: "es-2",
    chapter: "electrostatics",
    chapterName: "Electrostatics",
    topic: "Gauss's Law",
    front: "Gauss's law and the key field expressions",
    back: "∮ E·dA = Q_enc/ε₀\nOutside solid sphere: E = kQ/r²\nInside solid sphere: E = kQr/R³  (∝ r)\nInfinite sheet: E = σ/2ε₀  (uniform, both sides)\nInfinite wire: E = λ/2πε₀r",
    difficulty: "medium",
  },
  {
    id: "es-3",
    chapter: "electrostatics",
    chapterName: "Electrostatics",
    topic: "Capacitance & Energy",
    front: "Capacitance, dielectric, and energy stored in capacitor",
    back: "C = Q/V\nParallel plate: C = ε₀A/d\nWith dielectric K: C' = KC;  E' = E/K (isolated plate)\nEnergy: U = ½CV² = Q²/2C\nSeries: 1/C_eq = Σ(1/Cᵢ)\nParallel: C_eq = ΣCᵢ",
    difficulty: "medium",
  },

  // ── CURRENT ELECTRICITY ────────────────────────────────────────────────────
  {
    id: "ce-1",
    chapter: "current-electricity",
    chapterName: "Current Electricity",
    topic: "Drift Velocity & Ohm's Law",
    front: "Drift velocity, conductivity, and Ohm's law",
    back: "v_d = eEτ/m;  μ = v_d/E = eτ/m\nJ = σE = nev_d;  σ = ne²τ/m\nR = ρL/A;  V = iR\nStretching (vol const): R' = k²R if L' = kL",
    difficulty: "easy",
  },
  {
    id: "ce-2",
    chapter: "current-electricity",
    chapterName: "Current Electricity",
    topic: "Bridges & Potentiometer",
    front: "Wheatstone bridge, Meter bridge, Potentiometer",
    back: "Balance: P/Q = R/S  →  i_G = 0\nMeter bridge: X = Rℓ/(100−ℓ)\nPotentiometer EMF: ε₁/ε₂ = ℓ₁/ℓ₂\nInternal resistance: r = R(ℓ₁−ℓ₂)/ℓ₂",
    difficulty: "medium",
  },
  {
    id: "ce-3",
    chapter: "current-electricity",
    chapterName: "Current Electricity",
    topic: "Advanced Networks",
    front: "Infinite ladder, Cube of resistors results",
    back: "Infinite ladder: X = [R₁ + √(R₁²+4R₁R₂)] / 2\nCube — Body diagonal: R_eq = 5R/6\nCube — Face diagonal: R_eq = 3R/4\nCube — Edge: R_eq = 7R/12\nStar-Delta: R_Y = R_Δ/3  (symmetric)",
    difficulty: "hard",
  },

  // ── ELECTROMAGNETIC INDUCTION ──────────────────────────────────────────────
  {
    id: "emi-1",
    chapter: "electromagnetic-induction",
    chapterName: "Electromagnetic Induction",
    topic: "Faraday & Lenz",
    front: "Faraday's law, Lenz's law, Motional EMF",
    back: "ε = −dΦ/dt  (Faraday);  Φ = B·A·cosθ\nLenz: induced current opposes the change in flux\nMotional EMF: ε = BLv (rod in field)\nRotating coil: ε = NBAω sin(ωt)  →  ε_max = NBAω",
    difficulty: "easy",
  },
  {
    id: "emi-2",
    chapter: "electromagnetic-induction",
    chapterName: "Electromagnetic Induction",
    topic: "Inductance",
    front: "Self-inductance L, Mutual inductance M, Energy in inductor",
    back: "ε_L = −L(di/dt);  L_solenoid = μ₀n²Aℓ\nε₁₂ = −M(di₂/dt);  M = k√(L₁L₂)  (k ≤ 1)\nEnergy: U = ½Li²\nSeries: L_eq = ΣLᵢ (no mutual coupling)\nParallel: 1/L_eq = Σ(1/Lᵢ)",
    difficulty: "medium",
  },

  // ── ALTERNATING CURRENT ────────────────────────────────────────────────────
  {
    id: "ac-1",
    chapter: "alternating-current",
    chapterName: "Alternating Current",
    topic: "RLC Series Circuit",
    front: "RLC impedance, resonance, Q-factor, power factor",
    back: "Z = √(R² + (X_L−X_C)²)\nX_L = ωL;  X_C = 1/ωC\nResonance: ω₀ = 1/√(LC);  Z_min = R\nQ-factor = ω₀L/R = (1/R)√(L/C)\ncosφ = R/Z  (power factor);  P = V_rms I_rms cosφ",
    difficulty: "hard",
  },

  // ── RAY OPTICS ─────────────────────────────────────────────────────────────
  {
    id: "ro-1",
    chapter: "ray-optics",
    chapterName: "Ray Optics",
    topic: "Mirror & Lens Formula",
    front: "Mirror formula, lens formula, magnification, power",
    back: "Mirror: 1/v + 1/u = 1/f  (f = R/2)\nLens: 1/v − 1/u = 1/f\nm = −v/u (mirror);  m = v/u (lens)\nPower P = 1/f(metres);  P_total = ΣP (touching lenses)\nLens maker's: 1/f = (n−1)[1/R₁ − 1/R₂]",
    difficulty: "easy",
  },
  {
    id: "ro-2",
    chapter: "ray-optics",
    chapterName: "Ray Optics",
    topic: "Refraction & TIR",
    front: "Snell's law, critical angle, prism deviation",
    back: "n₁sinθ₁ = n₂sinθ₂  (Snell)\nCritical angle: sinθ_c = n₂/n₁  (n₁ > n₂)\nTIR when θ > θ_c\nPrism: δ = (n−1)A for small A\nAt min deviation: r = A/2,  n = sin[(A+D)/2]/sin(A/2)",
    difficulty: "medium",
  },

  // ── WAVE OPTICS ────────────────────────────────────────────────────────────
  {
    id: "wo-1",
    chapter: "wave-optics",
    chapterName: "Wave Optics",
    topic: "Young's Double Slit & Diffraction",
    front: "YDSE fringe width, bright/dark fringes; Single slit diffraction",
    back: "YDSE fringe width: β = λD/d\nBright: y_n = nβ;  Dark: y_n = (n−½)β\nPath diff bright: nλ;  dark: (2n−1)λ/2\nSingle slit: 1st dark at sinθ = λ/a;  width = 2λD/a",
    difficulty: "medium",
  },

  // ── ATOMS ──────────────────────────────────────────────────────────────────
  {
    id: "at-1",
    chapter: "atoms",
    chapterName: "Atoms",
    topic: "Bohr's Model",
    front: "Bohr model: radius, speed, energy for hydrogen-like atoms",
    back: "r_n = a₀n²/Z  (a₀ = 0.529 Å)\nv_n = (2.18×10⁶)Z/n m/s\nE_n = −13.6 Z²/n²  eV\nFrequency of photon: hν = E_f − E_i\nSpectrum: 1/λ = RZ²(1/n₁² − 1/n₂²)  (R = 1.097×10⁷ m⁻¹)",
    difficulty: "medium",
  },

  // ── DUAL NATURE ────────────────────────────────────────────────────────────
  {
    id: "dn-1",
    chapter: "dual-nature",
    chapterName: "Dual Nature of Matter",
    topic: "Photoelectric & de Broglie",
    front: "Photoelectric effect, stopping potential, de Broglie wavelength",
    back: "KE_max = hν − φ = eV₀\nThreshold: ν₀ = φ/h;  λ_max = hc/φ\nStopping potential V₀ = (hν−φ)/e  (independent of intensity)\nde Broglie: λ = h/p = h/mv = h/√(2mK)\nFor electron accelerated through V: λ = 1.227/√V  nm",
    difficulty: "medium",
  },

  // ── NUCLEI ─────────────────────────────────────────────────────────────────
  {
    id: "nuc-1",
    chapter: "nuclei",
    chapterName: "Nuclei",
    topic: "Radioactive Decay",
    front: "Decay law, half-life, mean life, and activity",
    back: "N = N₀e^(−λt);  A = A₀e^(−λt)\nT₁/₂ = 0.693/λ\nMean life τ = 1/λ = T₁/₂/0.693 ≈ 1.44 T₁/₂\nRemaining after n half-lives: N = N₀/2ⁿ\nBinding energy per nucleon → stability indicator",
    difficulty: "easy",
  },

  // ── THERMODYNAMICS ─────────────────────────────────────────────────────────
  {
    id: "td-1",
    chapter: "thermodynamics",
    chapterName: "Thermodynamics",
    topic: "Laws of Thermodynamics",
    front: "First law, processes (iso-), efficiency of Carnot engine",
    back: "ΔU = Q − W  (1st law)\nIsothermal: ΔU=0, W=nRT ln(V₂/V₁)\nAdiabatic: Q=0, TV^(γ−1)=const, PV^γ=const\nIsochoric: W=0, Q=ΔU=nCᵥΔT\nCarnot η = 1 − T_C/T_H  (max possible efficiency)\nCOP (refrigerator) = T_C/(T_H−T_C)",
    difficulty: "medium",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// QUICK REVISION NOTES
// ─────────────────────────────────────────────────────────────────────────────

export interface RevisionNote {
  chapter: string;
  chapterName: string;
  class: 11 | 12;
  keyPoints: string[];
  commonMistakes: string[];
  mustRemember: string[];
}

export const REVISION_NOTES: RevisionNote[] = [
  {
    chapter: "kinematics",
    chapterName: "Kinematics",
    class: 11,
    keyPoints: [
      "Displacement is a vector; distance is a scalar — always distinguish them.",
      "For uniform acceleration the sₙ formula gives displacement in the nᵗʰ second only, not in n seconds.",
      "Projectile motion: horizontal velocity is constant; vertical motion is free fall.",
      "Range is the same for complementary angles (θ and 90°−θ).",
      "Relative velocity v_AB = v_A − v_B; for anti-parallel motion magnitudes add.",
      "Velocity-time graph area = displacement; slope = acceleration.",
    ],
    commonMistakes: [
      "Using s = ut + ½at² for displacement in a specific second instead of sₙ = u + a(2n−1)/2.",
      "Forgetting that v_y = 0 at maximum height but v_x ≠ 0 — the particle still has horizontal velocity.",
      "Applying sin2θ = 1 and concluding range is always maximised at 45° even when the launch and landing levels differ.",
      "Confusing speed and magnitude of velocity — they are equal only when the path is straight.",
    ],
    mustRemember: [
      "Range R = u² sin2θ / g is maximum at θ = 45° ONLY when projectile lands at same height.",
      "Time of flight T = 2u sinθ / g is independent of horizontal velocity.",
      "At highest point: speed = u cosθ (not zero!)",
    ],
  },
  {
    chapter: "laws-of-motion",
    chapterName: "Laws of Motion",
    class: 11,
    keyPoints: [
      "Newton's 1st law defines an inertial frame; pseudo-forces arise only in non-inertial frames.",
      "Static friction is self-adjusting up to its maximum (μ_s N); kinetic friction is fixed at μ_k N.",
      "Free-body diagram: draw one FBD per body, never combine unless the system accelerates as one.",
      "For a block on an incline: normal force N = mg cosθ; friction component = mg sinθ (for sliding).",
      "In the limiting friction state, angle of incline = angle of friction = angle of repose.",
      "Constraint equations: for strings over a pulley, magnitudes of accelerations are related.",
    ],
    commonMistakes: [
      "Adding friction as a fixed force without checking whether it is static or kinetic.",
      "Forgetting to include normal force when calculating friction on an inclined surface.",
      "Applying F = ma without first resolving all forces along and perpendicular to motion.",
      "Treating pseudo-force as real in a ground (inertial) frame.",
    ],
    mustRemember: [
      "μ_k < μ_s always — it takes more force to start sliding than to keep sliding.",
      "Angle of repose θ satisfies tanθ = μ_s; beyond this angle any block slides.",
      "For an Atwood machine: a = (m₁−m₂)g/(m₁+m₂), T = 2m₁m₂g/(m₁+m₂).",
    ],
  },
  {
    chapter: "electrostatics",
    chapterName: "Electrostatics",
    class: 11,
    keyPoints: [
      "Coulomb's law applies between point charges; for distributed charge, integrate or use Gauss.",
      "Electric field is zero inside a conductor under electrostatics; any excess charge resides on the surface.",
      "Gauss's law: ∮E·dA = Q_enc/ε₀ — choose Gaussian surface matching the symmetry.",
      "Potential V is a scalar; potential energy U = qV. Potential decreases in the direction of E.",
      "Capacitance depends only on geometry and dielectric, not on the charge or voltage.",
      "Inserting dielectric at constant V: C increases, Q increases, E unchanged (E = V/d).",
      "Inserting dielectric at constant Q: C increases, V decreases, E decreases.",
    ],
    commonMistakes: [
      "Confusing Electric field (vector) and Electric potential (scalar) — E = −dV/dr.",
      "Using E = σ/ε₀ (conductor surface) vs E = σ/2ε₀ (infinite sheet of charge, both sides).",
      "Forgetting the sign of work: W = q(V_i − V_f) for moving charge q from i to f.",
      "Assuming capacitors in series store the same charge only when they were uncharged to start.",
    ],
    mustRemember: [
      "E inside a uniformly charged solid sphere ∝ r; outside ∝ 1/r².",
      "Equipotential surfaces are always perpendicular to field lines.",
      "Energy stored in capacitor: U = ½CV² = Q²/2C — never write U = CV².",
    ],
  },
  {
    chapter: "current-electricity",
    chapterName: "Current Electricity",
    class: 12,
    keyPoints: [
      "Drift speed v_d ~ 10⁻⁴ m/s — far smaller than thermal speed ~ 10⁵ m/s.",
      "Resistivity ρ = m/(ne²τ) — increases with temperature for metals, decreases for semiconductors.",
      "A stretched wire (volume constant): if length ×k, resistance ×k².",
      "A balanced Wheatstone bridge (P/Q = R/S) has zero galvanometer current — regardless of G.",
      "Potentiometer at balance draws zero current: reads true EMF, not terminal voltage.",
      "Joule heating in series (same i): P ∝ R — higher R burns brighter; in parallel (same V): P ∝ 1/R.",
      "Maximum power delivered to load when R_load = r_internal.",
    ],
    commonMistakes: [
      "Applying the simple series/parallel formula to an unbalanced bridge — need Kirchhoff.",
      "Forgetting sign conventions in KVL: go against current through R → add voltage (+iR).",
      "Treating terminal voltage = EMF; they differ whenever current flows: V = ε − ir.",
      "Confusing meter bridge formula: X = Rℓ/(100−ℓ) not Rℓ/100.",
    ],
    mustRemember: [
      "Cube of resistors: body diagonal = 5R/6; face diagonal = 3R/4; edge = 7R/12.",
      "Infinite ladder: X = [R₁ + √(R₁² + 4R₁R₂)] / 2.",
      "Star-Delta symmetric: R_Y = R_Δ/3 and R_Δ = 3R_Y.",
    ],
  },
  {
    chapter: "electromagnetic-induction",
    chapterName: "Electromagnetic Induction",
    class: 12,
    keyPoints: [
      "Faraday: EMF = −dΦ/dt; the sign gives the direction via Lenz's law.",
      "Lenz's law is a consequence of conservation of energy — the induced effect always opposes its cause.",
      "Motional EMF = BLv for a conductor of length L moving at velocity v perpendicular to B.",
      "Self-inductance L opposes change in its own current: ε_L = −L di/dt.",
      "Energy stored in inductor U = ½Li² (analogous to ½CV² for a capacitor).",
      "Mutual inductance M = k√(L₁L₂) where coupling factor k ≤ 1.",
    ],
    commonMistakes: [
      "Forgetting the negative sign in Faraday's law and hence getting wrong direction of induced current.",
      "Applying motional EMF formula BLv when the rod is not perpendicular to B.",
      "Confusing L (inductance in henry) with ℓ (length) in the solenoid formula.",
      "Using energy ½Li² before current reaches steady state — the formula applies at any instant.",
    ],
    mustRemember: [
      "L_solenoid = μ₀n²Aℓ (n = turns per unit length, not total turns).",
      "Induced EMF in rotating coil: ε = NBAω sin(ωt), peak = NBAω.",
      "Eddy currents cause energy dissipation; reduced by laminating the core.",
    ],
  },
  {
    chapter: "ray-optics",
    chapterName: "Ray Optics",
    class: 12,
    keyPoints: [
      "Sign convention: all distances from pole/centre; incident light direction = positive.",
      "Mirror formula 1/v + 1/u = 1/f and lens formula 1/v − 1/u = 1/f look similar but differ in sign.",
      "Power of a lens P = 1/f (in metres); combined lenses in contact: P = ΣP.",
      "TIR requires: denser to rarer medium AND angle > critical angle (sinθ_c = n₂/n₁).",
      "For a prism at minimum deviation: ray is parallel to base inside; r = A/2.",
      "Magnification for erect image is positive; for inverted image is negative.",
    ],
    commonMistakes: [
      "Using 1/v + 1/u = 1/f for a lens instead of 1/v − 1/u = 1/f.",
      "Forgetting to flip the sign of R for concave vs convex surfaces in the Lens Maker's equation.",
      "Applying mirror magnification formula m = −v/u with the wrong sign convention.",
      "Thinking critical angle applies from rarer to denser medium — TIR is impossible in that direction.",
    ],
    mustRemember: [
      "Lens maker's: 1/f = (n−1)[1/R₁−1/R₂]; for a biconvex lens with equal radii R₁=R, R₂=−R → f=R/(2(n−1)).",
      "A real image is inverted and can be caught on a screen; a virtual image is erect and cannot.",
      "Resolving power ∝ 1/λ — shorter wavelength → sharper image.",
    ],
  },
  {
    chapter: "thermodynamics",
    chapterName: "Thermodynamics",
    class: 11,
    keyPoints: [
      "First law: ΔU = Q − W — heat added to system, work done by system (sign convention matters).",
      "For an ideal gas: ΔU = nCᵥΔT for any process (not just isochoric).",
      "Adiabatic process: Q = 0; work done = −ΔU = nCᵥ(T₁−T₂).",
      "Carnot efficiency η = 1 − T_C/T_H is the maximum possible for any engine between those temperatures.",
      "Second law: entropy of an isolated system never decreases; real processes are irreversible.",
      "COP of refrigerator = Q_C/W = T_C/(T_H−T_C).",
    ],
    commonMistakes: [
      "Treating Cp and Cv as equal; Cp − Cv = R for an ideal gas (Mayer's relation).",
      "Confusing W = PΔV (work done by gas) with −PΔV (work done on gas).",
      "Applying isothermal condition to a fast process — fast processes are nearly adiabatic.",
      "Forgetting that γ = Cp/Cv = 5/3 (monatomic), 7/5 (diatomic), 4/3 (triatomic).",
    ],
    mustRemember: [
      "Carnot η = 1 − T_C/T_H; temperatures must be in Kelvin.",
      "For adiabatic: TV^(γ−1) = const, PV^γ = const, TP^(−γ/(γ−1)) = const.",
      "Isothermal bulk modulus = P; adiabatic bulk modulus = γP.",
    ],
  },
  {
    chapter: "atoms",
    chapterName: "Atoms",
    class: 12,
    keyPoints: [
      "Bohr postulates: electrons orbit in stationary states; angular momentum L = nh/2π.",
      "For hydrogen: E_n = −13.6/n² eV; r_n = 0.529 n² Å; v_n = 2.18×10⁶/n m/s.",
      "For hydrogen-like ions: E_n = −13.6 Z²/n² eV; r_n = 0.529 n²/Z Å.",
      "Photon emission: hν = E_i − E_f (higher to lower orbit).",
      "Spectral series: Lyman (n₁=1, UV), Balmer (n₁=2, visible), Paschen (n₁=3, IR).",
      "Bohr model fails for multi-electron atoms; quantum mechanics needed.",
    ],
    commonMistakes: [
      "Using E_n = −13.6/n² without including Z² for hydrogen-like ions (He⁺, Li²⁺ etc.).",
      "Confusing absorption (lower to higher n) and emission (higher to lower n) spectra.",
      "Forgetting that ionisation energy = 13.6 Z²/n² eV from state n.",
      "Stating that ground state is n = 0; it is n = 1 in Bohr model.",
    ],
    mustRemember: [
      "Number of spectral lines from level n to ground: n(n−1)/2.",
      "Lyman series: first line (n=2→1) = 121.6 nm; limit = 91.2 nm.",
      "Balmer series: first line (n=3→2) = 656.3 nm (red Hα line).",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXAM TIPS
// ─────────────────────────────────────────────────────────────────────────────

export interface ExamTip {
  id: string;
  category: TipCategory;
  categoryLabel: string;
  title: string;
  body: string;
}

export const EXAM_TIPS: ExamTip[] = [
  // ── STRATEGY ───────────────────────────────────────────────────────────────
  {
    id: "str-1",
    category: "strategy",
    categoryLabel: "Strategy",
    title: "Check symmetry before Kirchhoff",
    body: "Before writing KVL equations, always check: (1) is the bridge balanced (P/Q = R/S)? (2) Are there equipotential nodes? Spotting these cuts a 5-minute calculation to 30 seconds.",
  },
  {
    id: "str-2",
    category: "strategy",
    categoryLabel: "Strategy",
    title: "Draw a free-body diagram for every mechanics problem",
    body: "Never solve Newton's law problems in your head. A FBD forces you to identify every force and its direction, making sign errors nearly impossible. Spend 30 seconds drawing — save 3 minutes of re-doing.",
  },
  {
    id: "str-3",
    category: "strategy",
    categoryLabel: "Strategy",
    title: "Dimensional analysis as a quick sanity check",
    body: "If an answer has units of m/s² when it should be m/s, you have an error. Always carry units through your working and check the dimensions of your final answer.",
  },
  {
    id: "str-4",
    category: "strategy",
    categoryLabel: "Strategy",
    title: "Identify the process in thermodynamics first",
    body: "Label the process (isothermal / adiabatic / isobaric / isochoric) before writing any equation. Each process has exactly one constraint that simplifies everything else.",
  },
  {
    id: "str-5",
    category: "strategy",
    categoryLabel: "Strategy",
    title: "Use energy conservation wherever possible",
    body: "Energy methods avoid force-by-force analysis. If the question asks for a speed or height, try energy conservation first. Reserve force/torque methods for questions asking about forces or accelerations.",
  },
  {
    id: "str-6",
    category: "strategy",
    categoryLabel: "Strategy",
    title: "In optics: fix your sign convention first",
    body: "Choose one sign convention (New Cartesian) and use it throughout. The #1 cause of optics errors is mixing conventions mid-problem. Write 'Origin: pole; positive: direction of incident ray' at the top.",
  },

  // ── COMMON MISTAKES ────────────────────────────────────────────────────────
  {
    id: "mis-1",
    category: "mistakes",
    categoryLabel: "Common Mistakes",
    title: "Parallel bulbs: brighter ≠ higher resistance",
    body: "In parallel (same V): P = V²/R, so lower resistance ⟹ more power ⟹ brighter. In series (same i): P = i²R, so higher resistance ⟹ more power ⟹ brighter. These are opposite — know which case you're in.",
  },
  {
    id: "mis-2",
    category: "mistakes",
    categoryLabel: "Common Mistakes",
    title: "Terminal voltage ≠ EMF when current flows",
    body: "V_terminal = ε − ir (discharging) or ε + ir (charging). You only measure the true EMF with a potentiometer at null balance — a voltmeter always shows the loaded terminal voltage.",
  },
  {
    id: "mis-3",
    category: "mistakes",
    categoryLabel: "Common Mistakes",
    title: "Critical angle direction: denser→rarer only",
    body: "TIR occurs only when light travels from a denser medium to a rarer medium AND the angle exceeds θ_c. Light going from rarer to denser never undergoes TIR.",
  },
  {
    id: "mis-4",
    category: "mistakes",
    categoryLabel: "Common Mistakes",
    title: "Projectile at max height: speed ≠ 0",
    body: "At maximum height, v_y = 0 but v_x = u cosθ remains unchanged. The speed at the top is u cosθ. Only a purely vertical throw has zero speed at the highest point.",
  },
  {
    id: "mis-5",
    category: "mistakes",
    categoryLabel: "Common Mistakes",
    title: "Capacitor energy: never use U = CV²",
    body: "The correct formula is U = ½CV². Forgetting the factor of ½ is the single most common capacitor error. Remember: U = ½CV² = Q²/2C = ½QV.",
  },
  {
    id: "mis-6",
    category: "mistakes",
    categoryLabel: "Common Mistakes",
    title: "de Broglie wavelength and intensity",
    body: "In the photoelectric effect, stopping potential V₀ depends only on frequency (ν), NOT on intensity. Intensity changes the rate of electron emission (current), not their maximum kinetic energy.",
  },

  // ── TIME MANAGEMENT ────────────────────────────────────────────────────────
  {
    id: "time-1",
    category: "time",
    categoryLabel: "Time Management",
    title: "60-second rule: stuck? Move on immediately",
    body: "If you are stuck on a question for more than 60 seconds in JEE, mark it and move on. Come back later with fresh eyes. Spending 5 minutes on one question and missing 3 easy ones is a losing strategy.",
  },
  {
    id: "time-2",
    category: "time",
    categoryLabel: "Time Management",
    title: "Do a first pass — collect all easy marks first",
    body: "In the first 20 minutes, scan all questions and solve those you can do in under 2 minutes. On the second pass, attempt medium difficulty. Save complex derivation questions for the third pass.",
  },
  {
    id: "time-3",
    category: "time",
    categoryLabel: "Time Management",
    title: "Reserve 10 minutes for review",
    body: "Stop solving new questions at least 10 minutes before the end. Use this time to re-check sign errors, unit mistakes, and whether you answered what was asked (final velocity vs magnitude, etc.).",
  },
  {
    id: "time-4",
    category: "time",
    categoryLabel: "Time Management",
    title: "Integer-type questions: attempt all (no negative marking)",
    body: "In JEE Advanced, integer-type questions carry no negative marking. Even an educated guess (range 0–9) beats leaving it blank. Always attempt these, even if you're unsure.",
  },

  // ── LAST MINUTE ────────────────────────────────────────────────────────────
  {
    id: "lm-1",
    category: "lastminute",
    categoryLabel: "Last Minute",
    title: "The top 5 topics by marks weightage",
    body: "Mechanics (30%), Electrostatics + Current Electricity (25%), Optics (15%), Modern Physics (15%), Thermal Physics (10%). In the last week, focus revision in this order of priority.",
  },
  {
    id: "lm-2",
    category: "lastminute",
    categoryLabel: "Last Minute",
    title: "Formula sheet: the 15 you cannot forget",
    body: "1) sₙ = u+a(2n−1)/2  2) Range = u²sin2θ/g  3) v_d = eEτ/m  4) P/Q=R/S (bridge)  5) ε=−dΦ/dt  6) Z=√(R²+(XL−XC)²)  7) E_n=−13.6Z²/n²  8) λ=h/p  9) N=N₀e^(−λt)  10) sinθ_c=n₂/n₁  11) η=1−TC/TH  12) TV^(γ−1)=const  13) R_cube body = 5R/6  14) X_ladder=[R₁+√(R₁²+4R₁R₂)]/2  15) v_o=√(GM/r)",
  },
  {
    id: "lm-3",
    category: "lastminute",
    categoryLabel: "Last Minute",
    title: "Night before the exam: what NOT to do",
    body: "Do NOT attempt new chapters or hard problems the night before. Review your formula sheets and flashcards, solve 2–3 easy problems to build confidence, sleep by 10 PM. A rested mind is worth more than one more formula.",
  },
  {
    id: "lm-4",
    category: "lastminute",
    categoryLabel: "Last Minute",
    title: "Mnemonics worth memorising",
    body: "Cube resistors: 7/12 < 3/4 < 5/6 (edge < face < body: closer corners = lower R). Optics: Real images are inverted; Virtual images are erect. TIR: Dense to Rare, angle too Daring. Spectral series: Lyman(UV) Balmer(Visible) Paschen(IR) → 'Let's Buy Popcorn'.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: unique chapter list from flashcards
// ─────────────────────────────────────────────────────────────────────────────

export const FLASHCARD_CHAPTERS = Array.from(
  new Map(FLASHCARDS.map((c) => [c.chapter, c.chapterName])).entries()
).map(([slug, name]) => ({ slug, name }));
