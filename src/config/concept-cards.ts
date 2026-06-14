export type PhysicsArea = "Mechanics" | "Electromagnetism" | "Waves & Optics" | "Modern Physics";

export interface ConceptCard {
  id: string;
  title: string;
  area: PhysicsArea;
  tagline: string;
  intuition: string;
  formula: string | null;
  example: string;
  chapterSlug: string;
  chapterTitle: string;
}

export const CONCEPT_CARDS: ConceptCard[] = [
  // ── Mechanics ────────────────────────────────────────────────
  {
    id: "m-1",
    title: "Newton's Third Law",
    area: "Mechanics",
    tagline: "Every action has an equal and opposite reaction",
    intuition:
      "Forces always come in pairs. When you push against a wall, the wall pushes back on you with the same magnitude — they never cancel because they act on different bodies.",
    formula: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
    example: "A rocket expels gas backward (action). Gas pushes rocket forward (reaction).",
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
  },
  {
    id: "m-2",
    title: "Conservation of Momentum",
    area: "Mechanics",
    tagline: "Total momentum stays constant when no external force acts",
    intuition:
      "Momentum is a conserved quantity. In a collision, whatever momentum one object loses, the other gains. The total never changes — it's one of nature's deepest symmetries.",
    formula: "\\vec{p}_{total} = m_1\\vec{v}_1 + m_2\\vec{v}_2 = \\text{const}",
    example: "In a 1D collision: $m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$",
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
  },
  {
    id: "m-3",
    title: "Conservation of Energy",
    area: "Mechanics",
    tagline: "Total mechanical energy is constant in a conservative system",
    intuition:
      "Energy cannot be created or destroyed — only converted between kinetic and potential forms. A pendulum trading KE for PE and back is the perfect picture.",
    formula: "KE + PE = \\frac{1}{2}mv^2 + mgh = \\text{const}",
    example: "A ball dropped from height $h$ hits the ground with speed $v = \\sqrt{2gh}$.",
    chapterSlug: "work-energy-power",
    chapterTitle: "Work, Energy & Power",
  },
  {
    id: "m-4",
    title: "Simple Harmonic Motion",
    area: "Mechanics",
    tagline: "Restoring force proportional to displacement → oscillation",
    intuition:
      "Whenever the net force on a body is directed toward an equilibrium position and proportional to displacement, the body oscillates sinusoidally. All SHM problems reduce to identifying $\\omega^2 = k_{eff}/m_{eff}$.",
    formula: "a = -\\omega^2 x \\quad \\Rightarrow \\quad x = A\\sin(\\omega t + \\phi)",
    example: "Spring-mass system: $\\omega = \\sqrt{k/m}$. Simple pendulum: $\\omega = \\sqrt{g/L}$.",
    chapterSlug: "oscillations",
    chapterTitle: "Oscillations",
  },
  {
    id: "m-5",
    title: "Centre of Mass Motion",
    area: "Mechanics",
    tagline: "External forces govern how the centre of mass moves",
    intuition:
      "For any system, $\\vec{F}_{ext} = M\\vec{a}_{cm}$. Internal forces (explosions, springs) cannot shift the CM unless an external force acts. A grenade in flight has its CM follow the same parabola even after explosion.",
    formula: "\\vec{r}_{cm} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i}",
    example: "Two blocks connected by a spring on a frictionless surface — CM moves at constant velocity.",
    chapterSlug: "laws-of-motion",
    chapterTitle: "Laws of Motion",
  },

  // ── Electromagnetism ─────────────────────────────────────────
  {
    id: "em-1",
    title: "Superposition of Electric Fields",
    area: "Electromagnetism",
    tagline: "Total field = vector sum of individual fields",
    intuition:
      "Electric fields obey superposition: each charge contributes its own field independently. You add them as vectors. This is what makes dipole, ring, and disc field calculations tractable.",
    formula: "\\vec{E}_{total} = \\vec{E}_1 + \\vec{E}_2 + \\cdots",
    example: "Midpoint of an electric dipole: fields from +q and −q add along the dipole axis.",
    chapterSlug: "electric-charges-and-fields",
    chapterTitle: "Electric Charges & Fields",
  },
  {
    id: "em-2",
    title: "Gauss's Law",
    area: "Electromagnetism",
    tagline: "Net electric flux through a closed surface = enclosed charge / ε₀",
    intuition:
      "The number of field lines crossing any closed surface depends only on the charge inside, not the surface shape. Use it to find E for symmetric charge distributions in seconds.",
    formula: "\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{enc}}{\\varepsilon_0}",
    example: "Infinite line charge: $E = \\lambda / (2\\pi\\varepsilon_0 r)$",
    chapterSlug: "electric-charges-and-fields",
    chapterTitle: "Electric Charges & Fields",
  },
  {
    id: "em-3",
    title: "Faraday's Law of Induction",
    area: "Electromagnetism",
    tagline: "Changing magnetic flux induces an EMF",
    intuition:
      "The EMF induced in a loop equals the rate of change of magnetic flux through it. The minus sign (Lenz's law) tells us the direction opposes the change — nature resisting a change in flux.",
    formula: "\\varepsilon = -\\frac{d\\Phi_B}{dt}",
    example: "Moving a bar magnet into a coil induces current; faster motion → larger EMF.",
    chapterSlug: "electromagnetic-induction",
    chapterTitle: "Electromagnetic Induction",
  },
  {
    id: "em-4",
    title: "Lenz's Law",
    area: "Electromagnetism",
    tagline: "Induced current opposes the change producing it",
    intuition:
      "Lenz's law is conservation of energy in electromagnetic form. If the induced current reinforced the flux change, you'd get runaway current — energy from nothing. Instead, it fights back.",
    formula: "\\text{Direction: oppose change in } \\Phi_B",
    example:
      "Dropping a magnet through a copper tube: eddy currents slow its fall (magnetic braking).",
    chapterSlug: "electromagnetic-induction",
    chapterTitle: "Electromagnetic Induction",
  },

  // ── Waves & Optics ───────────────────────────────────────────
  {
    id: "wo-1",
    title: "Principle of Superposition",
    area: "Waves & Optics",
    tagline: "Waves passing through each other add their displacements",
    intuition:
      "Two waves at the same point add algebraically. Constructive interference (in phase) amplifies; destructive (out of phase) cancels. This is the basis of all interference and diffraction.",
    formula: "y = y_1 + y_2",
    example: "Young's double slit: bright fringe where $\\Delta x = n\\lambda$, dark where $\\Delta x = (n+\\tfrac{1}{2})\\lambda$.",
    chapterSlug: "wave-optics",
    chapterTitle: "Wave Optics",
  },
  {
    id: "wo-2",
    title: "Resonance in Open/Closed Pipes",
    area: "Waves & Optics",
    tagline: "Standing waves form when reflections reinforce the incident wave",
    intuition:
      "Standing waves form at specific frequencies where ends are nodes or antinodes. Open pipe: both ends antinodes → $f_n = nv/2L$. Closed pipe: one node → only odd harmonics.",
    formula: "f_n = \\frac{nv}{2L}\\text{ (open)},\\quad f_n = \\frac{(2n-1)v}{4L}\\text{ (closed)}",
    example: "A 1 m open pipe at 340 m/s: fundamental = 170 Hz, next harmonic = 340 Hz.",
    chapterSlug: "waves",
    chapterTitle: "Waves",
  },
  {
    id: "wo-3",
    title: "Snell's Law (Refraction)",
    area: "Waves & Optics",
    tagline: "Light bends at an interface: n₁ sin θ₁ = n₂ sin θ₂",
    intuition:
      "When light enters a denser medium it slows down and bends toward the normal. The ratio $\\sin\\theta_1/\\sin\\theta_2 = n_2/n_1$ comes from matching wave fronts at the boundary.",
    formula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
    example: "Glass (n=1.5): light at 45° outside enters at $\\sin^{-1}(\\sin 45°/1.5) ≈ 28°$.",
    chapterSlug: "ray-optics",
    chapterTitle: "Ray Optics",
  },

  // ── Modern Physics ───────────────────────────────────────────
  {
    id: "mp-1",
    title: "Photoelectric Effect",
    area: "Modern Physics",
    tagline: "Light ejects electrons only when frequency > threshold",
    intuition:
      "Intensity of light doesn't matter — only frequency. Einstein explained this because light comes in quanta (photons) of energy $hf$. Below threshold, no individual photon has enough energy to liberate an electron.",
    formula: "KE_{max} = hf - \\phi",
    example: "Sodium (φ = 2.3 eV): light at 500 nm (E ≈ 2.5 eV) just ejects electrons with 0.2 eV KE.",
    chapterSlug: "dual-nature-of-radiation-and-matter",
    chapterTitle: "Dual Nature of Radiation & Matter",
  },
  {
    id: "mp-2",
    title: "Bohr's Model of the Atom",
    area: "Modern Physics",
    tagline: "Electrons orbit in quantised shells; jumping shells emits/absorbs photons",
    intuition:
      "Bohr quantised angular momentum: $mvr = n\\hbar$. Combining with Coulomb force gives energy levels $E_n = -13.6/n^2$ eV for hydrogen. Spectral lines come from transitions between these levels.",
    formula: "E_n = -\\frac{13.6}{n^2}\\text{ eV},\\quad r_n = n^2 a_0",
    example:
      "Hydrogen Lyman series: transition $n \\to 1$ emits UV. Balmer series: $n \\to 2$ emits visible.",
    chapterSlug: "atoms",
    chapterTitle: "Atoms",
  },
  {
    id: "mp-3",
    title: "Radioactive Decay Law",
    area: "Modern Physics",
    tagline: "Number of undecayed nuclei falls exponentially",
    intuition:
      "Each nucleus decays independently with a fixed probability per unit time. This leads to an exponential decay: $N = N_0 e^{-\\lambda t}$. The half-life is the time for half the nuclei to decay.",
    formula: "N = N_0 e^{-\\lambda t},\\quad t_{1/2} = \\frac{\\ln 2}{\\lambda}",
    example: "Carbon-14 ($t_{1/2}$ = 5730 yr): after 11,460 yr, only 25% of original nuclei remain.",
    chapterSlug: "nuclei",
    chapterTitle: "Nuclei",
  },
];

export const PHYSICS_AREAS: PhysicsArea[] = [
  "Mechanics",
  "Electromagnetism",
  "Waves & Optics",
  "Modern Physics",
];
