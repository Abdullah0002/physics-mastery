import type { ChapterLearnModule } from "../shared/types";

/* SVG diagrams — E blue, B red, propagation/axes currentColor. */

const SVG_DISPLACEMENT = `<svg viewBox='0 0 340 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Displacement current between charging capacitor plates'><line x1='30' y1='90' x2='130' y2='90' stroke='currentColor' stroke-width='2'/><polygon points='110,90 101,85 101,95' fill='#dc2626'/><text x='55' y='80' font-size='11' fill='#dc2626'>I_c</text><line x1='130' y1='55' x2='130' y2='125' stroke='#2563eb' stroke-width='4'/><line x1='175' y1='55' x2='175' y2='125' stroke='#2563eb' stroke-width='4'/><g stroke='#6366f1' stroke-width='1.4'><line x1='136' y1='75' x2='169' y2='75'/><line x1='136' y1='105' x2='169' y2='105'/></g><polygon points='169,75 160,71 160,79' fill='#6366f1'/><text x='140' y='140' font-size='11' fill='#6366f1'>changing E</text><line x1='175' y1='90' x2='280' y2='90' stroke='currentColor' stroke-width='2'/><polygon points='260,90 251,85 251,95' fill='#dc2626'/><text x='200' y='80' font-size='11' fill='#dc2626'>I_c</text><ellipse cx='152' cy='90' rx='55' ry='42' fill='none' stroke='currentColor' stroke-width='1.4' stroke-dasharray='5 4'/><text x='95' y='30' font-size='11' fill='currentColor'>I_d = ε₀ dΦ_E/dt fills the gap</text></svg>`;

const SVG_EM_WAVE = `<svg viewBox='0 0 340 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Electromagnetic wave: E and B oscillate in phase in perpendicular planes'><line x1='20' y1='95' x2='320' y2='95' stroke='currentColor' stroke-width='1.3'/><polygon points='320,95 311,90 311,100' fill='currentColor'/><text x='300' y='112' font-size='11' fill='currentColor'>c</text><path d='M30,95 C55,45 80,45 105,95 C130,145 155,145 180,95 C205,45 230,45 255,95 C280,145 305,145 320,95' fill='none' stroke='#2563eb' stroke-width='2.3'/><text x='40' y='45' font-size='12' fill='#2563eb'>E</text><path d='M30,95 C55,75 80,75 105,95 C130,115 155,115 180,95 C205,75 230,75 255,95 C280,115 305,115 320,95' fill='none' stroke='#dc2626' stroke-width='2' stroke-dasharray='5 3'/><text x='150' y='130' font-size='12' fill='#dc2626'>B (⟂ plane)</text></svg>`;

const SVG_EM_ORIENT = `<svg viewBox='0 0 220 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='E, B and propagation direction are mutually perpendicular'><line x1='90' y1='150' x2='90' y2='40' stroke='#2563eb' stroke-width='2.5'/><polygon points='90,40 85,50 95,50' fill='#2563eb'/><text x='96' y='48' font-size='13' fill='#2563eb'>E</text><line x1='90' y1='150' x2='190' y2='150' stroke='currentColor' stroke-width='2.5'/><polygon points='190,150 180,145 180,155' fill='currentColor'/><text x='168' y='168' font-size='13' fill='currentColor'>c (E×B)</text><line x1='90' y1='150' x2='30' y2='190' stroke='#dc2626' stroke-width='2.5'/><polygon points='30,190 41,187 35,180' fill='#dc2626'/><text x='15' y='185' font-size='13' fill='#dc2626'>B</text><text x='40' y='30' font-size='11' fill='currentColor'>E ⟂ B ⟂ c</text></svg>`;

const SVG_SPECTRUM = `<svg viewBox='0 0 360 130' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Electromagnetic spectrum from radio to gamma rays'><g font-size='8.5' fill='#fff' text-anchor='middle'><rect x='20' y='40' width='48' height='30' fill='#1d4ed8'/><text x='44' y='59'>Radio</text><rect x='68' y='40' width='44' height='30' fill='#0891b2'/><text x='90' y='59'>Micro</text><rect x='112' y='40' width='40' height='30' fill='#059669'/><text x='132' y='59'>IR</text><rect x='152' y='40' width='30' height='30' fill='#ca8a04'/><text x='167' y='56'>Vis</text><rect x='182' y='40' width='44' height='30' fill='#9333ea'/><text x='204' y='59'>UV</text><rect x='226' y='40' width='52' height='30' fill='#db2777'/><text x='252' y='59'>X-ray</text><rect x='278' y='40' width='62' height='30' fill='#b91c1c'/><text x='309' y='59'>Gamma</text></g><line x1='20' y1='85' x2='340' y2='85' stroke='currentColor' stroke-width='1.2'/><polygon points='340,85 331,80 331,90' fill='currentColor'/><text x='150' y='100' font-size='10' fill='currentColor'>frequency increases  →</text><line x1='340' y1='28' x2='20' y2='28' stroke='currentColor' stroke-width='1.2'/><polygon points='20,28 29,23 29,33' fill='currentColor'/><text x='150' y='20' font-size='10' fill='currentColor'>wavelength increases  ←</text></svg>`;

export const electromagneticWaves: ChapterLearnModule = {
  slug: "electromagnetic-waves",
  chapter: "Electromagnetic Waves",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "Maxwell's completion of electromagnetism: displacement current, the prediction of self-propagating EM waves, their properties (c = 1/√μ₀ε₀, E⟂B⟂c), energy & momentum, and the electromagnetic spectrum.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "Maxwell unified electricity, magnetism and **light**. Adding one missing term to Ampère's law, he found that electric and magnetic fields can sustain each other and travel through empty space as a wave — at exactly the measured speed of light.",
      topics: [
        {
          id: "overview",
          title: "Light is an electromagnetic wave",
          theory:
            "A changing electric field makes a magnetic field (Maxwell's new term), and a changing magnetic field makes an electric field (Faraday). Together they leapfrog through space as an **electromagnetic wave**. The speed came out as 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s — the speed of light — proving light is electromagnetic.",
          callouts: [
            {
              kind: "history",
              body:
                "- **Maxwell (1865):** predicts EM waves from his equations; speed = c.\n- **Hertz (1887):** produces and detects radio waves in the lab — direct confirmation.\n- **Marconi:** turns them into wireless communication.",
            },
            {
              kind: "tip",
              title: "Where it shows up",
              body:
                "- **All wireless** — radio, Wi-Fi, mobile, radar, satellites.\n- **Microwave ovens, IR remotes, thermal imaging.**\n- **Visible light, UV sterilisation, X-ray imaging, gamma therapy.**",
            },
          ],
        },
      ],
    },
    {
      id: "displacement-current",
      title: "2 · Displacement Current",
      topics: [
        {
          id: "disp-theory",
          title: "Maxwell's missing term",
          theory:
            "Ampère's law (∮B·dl = μ₀I) fails for a charging capacitor: no conduction current flows **between** the plates, yet there is clearly a magnetic field there. Maxwell fixed this by adding a **displacement current** from the changing electric field.",
          derivation:
            "Between the plates the electric flux Φ_E changes as charge accumulates. Define the displacement current:\n  I_d = ε₀ dΦ_E/dt.\nThe corrected **Ampère–Maxwell law**:\n  ∮ B·dl = μ₀(I_c + I_d) = μ₀ I_c + μ₀ε₀ dΦ_E/dt.\nNow the law gives the same B whether the Amperian loop is closed by a surface cutting the wire (I_c) or one passing between the plates (I_d) — consistency restored.",
          figures: [{ svg: SVG_DISPLACEMENT, caption: "The conduction current is continued between the plates by the displacement current I_d = ε₀ dΦ_E/dt." }],
          formulas: [
            { label: "Displacement current", expr: "I_d = ε₀ dΦ_E/dt" },
            { label: "Ampère–Maxwell", expr: "∮B·dl = μ₀(I_c + ε₀ dΦ_E/dt)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Why it matters",
              body:
                "Displacement current is **not** a flow of charge — it's a changing E-field that produces a magnetic field exactly like a real current. This symmetry (changing E → B, changing B → E) is what allows self-sustaining EM waves.",
            },
          ],
        },
      ],
    },
    {
      id: "maxwell-equations",
      title: "3 · Maxwell's Equations & Wave Production",
      topics: [
        {
          id: "maxwell-theory",
          title: "The four equations (qualitative)",
          theory:
            "All of electromagnetism compresses into four equations:\n- **Gauss (electric):** ∮E·dA = Q/ε₀ — charges make diverging E fields.\n- **Gauss (magnetic):** ∮B·dA = 0 — no magnetic monopoles.\n- **Faraday:** ∮E·dl = −dΦ_B/dt — changing B makes E.\n- **Ampère–Maxwell:** ∮B·dl = μ₀I_c + μ₀ε₀ dΦ_E/dt — currents and changing E make B.",
          derivation:
            "An **accelerating charge** radiates: its changing field detaches and propagates. A steady current or uniformly moving charge does **not** radiate; acceleration (e.g. oscillation in an antenna at frequency f) is required, producing EM waves of that frequency.",
          callouts: [
            {
              kind: "note",
              title: "Source of EM waves",
              body:
                "Only **accelerated** charges radiate EM waves. An LC oscillator / antenna driven at frequency f emits EM waves of frequency f. Charges at rest (only E) or in uniform motion (steady B) do not radiate.",
            },
          ],
        },
      ],
    },
    {
      id: "properties",
      title: "4 · Nature & Properties of EM Waves",
      topics: [
        {
          id: "properties-theory",
          title: "Transverse, in phase, speed c",
          theory:
            "In an EM wave the electric field E and magnetic field B oscillate **in phase**, **perpendicular to each other** and **perpendicular to the direction of propagation** — a transverse wave. The direction of travel is along E × B.",
          derivation:
            "From Maxwell's equations in vacuum:\n  c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s.\nField magnitudes are linked:\n  E₀/B₀ = c   (so E = cB at every instant).\nIn a medium: v = 1/√(με) = c/n, where n = refractive index. EM waves need **no medium** (they travel through vacuum) and carry energy and momentum.",
          figures: [
            { svg: SVG_EM_WAVE, caption: "E and B oscillate in phase in perpendicular planes, peaking and vanishing together." },
            { svg: SVG_EM_ORIENT, caption: "E ⟂ B ⟂ c: the wave travels along E × B." },
          ],
          formulas: [
            { label: "Speed (vacuum)", expr: "c = 1/√(μ₀ε₀)" },
            { label: "Field ratio", expr: "E₀/B₀ = c,  E = cB" },
            { label: "In a medium", expr: "v = 1/√(με) = c/n" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "In phase, not 90° out",
              body:
                "Unlike a single L or C in AC, the E and B of an EM wave are **in phase** — both reach their maxima and zeros together. And E = cB means B is numerically tiny (E₀ is ~3×10⁸ times B₀).",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "The electric field amplitude of an EM wave in vacuum is E₀ = 60 V/m. Find the magnetic field amplitude.",
              solution:
                "B₀ = E₀/c = 60 / (3 × 10⁸) = 2 × 10⁻⁷ T.",
              answer: "B₀ = 2 × 10⁻⁷ T",
            },
          ],
        },
      ],
    },
    {
      id: "energy-momentum",
      title: "5 · Energy, Intensity & Momentum",
      topics: [
        {
          id: "energy-theory",
          title: "EM waves carry energy and push",
          theory:
            "The wave stores energy equally in its electric and magnetic fields and transports it; it also carries **momentum**, so it exerts **radiation pressure** on surfaces.",
          derivation:
            "Energy density: u = ½ε₀E² + B²/2μ₀ (the two parts are **equal** on average).\nTime-averaged: u_avg = ½ε₀E₀² = B₀²/2μ₀.\nIntensity (power per area): I = u_avg·c = ½ε₀E₀²c.\nMomentum delivered for energy U: p = U/c.\nRadiation pressure: P = I/c (perfect absorber), P = 2I/c (perfect reflector).",
          formulas: [
            { label: "Energy density", expr: "u = ½ε₀E² + B²/2μ₀" },
            { label: "Intensity", expr: "I = ½ε₀E₀²c" },
            { label: "Momentum", expr: "p = U/c" },
            { label: "Radiation pressure", expr: "P = I/c (absorb), 2I/c (reflect)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Equal energy split",
              body:
                "On average, exactly **half** the wave's energy is in the electric field and half in the magnetic field (½ε₀E₀²/2 = B₀²/4μ₀ each). Solar sails and laser tweezers exploit the tiny radiation pressure.",
            },
          ],
        },
      ],
    },
    {
      id: "spectrum",
      title: "6 · The Electromagnetic Spectrum",
      topics: [
        {
          id: "spectrum-theory",
          title: "From radio to gamma rays",
          theory:
            "All EM waves travel at c in vacuum and differ only in frequency/wavelength (c = fλ). In order of **increasing frequency** (decreasing wavelength): radio → microwave → infrared → visible → ultraviolet → X-ray → gamma.",
          figures: [{ svg: SVG_SPECTRUM, caption: "The EM spectrum: same speed c, ordered by frequency (energy E = hf)." }],
          formulas: [
            { label: "Wave relation", expr: "c = fλ" },
            { label: "Photon energy", expr: "E = hf = hc/λ" },
          ],
          callouts: [
            {
              kind: "note",
              title: "Sources & uses (low → high frequency)",
              body:
                "- **Radio** (LC oscillators) — broadcasting, communication.\n- **Microwave** (klystron/magnetron) — radar, ovens, Wi-Fi.\n- **Infrared** (hot bodies, molecular vibrations) — heating, remotes, thermal imaging.\n- **Visible** (atoms, ~400–700 nm) — sight.\n- **Ultraviolet** (Sun, arcs) — sterilisation, vitamin D; ozone absorbs it.\n- **X-rays** (fast-electron impact) — imaging, crystallography.\n- **Gamma** (nuclei) — cancer therapy, sterilisation.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem: "A radio station broadcasts at 100 MHz. Find the wavelength.",
              solution: "λ = c/f = 3×10⁸ / 1×10⁸ = 3 m (radio/FM band).",
              answer: "3 m",
            },
          ],
          mistakes: [
            "Reversing the order — gamma has the **highest** frequency (shortest λ), radio the lowest.",
            "Thinking different EM waves travel at different speeds in vacuum (all travel at c).",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "7 · Advanced JEE Insights",
      topics: [
        {
          id: "insights",
          title: "Key relations and traps",
          theory: "This is a formula- and fact-heavy chapter; the geometry and the c-relations are everything.",
          callouts: [
            {
              kind: "jee",
              body:
                "- E ⟂ B ⟂ c, and propagation is along **E × B**; E = cB always.\n- Displacement current I_d = ε₀ dΦ_E/dt completes Ampère's law and enables EM waves.\n- Energy splits equally between E and B; I = ½ε₀E₀²c.\n- Radiation pressure: I/c (absorbed), 2I/c (reflected); momentum p = U/c.\n- Only **accelerating** charges radiate.\n- Spectrum order (↑ frequency): radio, micro, IR, visible, UV, X-ray, gamma.",
            },
            {
              kind: "warning",
              body:
                "- E and B are **in phase** (not 90° apart).\n- All EM waves share the same speed c in vacuum.\n- B₀ = E₀/c is numerically tiny — don't expect comparable magnitudes.\n- Displacement current is not moving charge.",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Putting E and B 90° out of phase — in an EM wave they are in phase.",
    "Thinking different EM waves travel at different speeds in vacuum (all = c).",
    "Reversing the spectrum order (gamma is highest frequency, radio lowest).",
    "Forgetting E = cB, so B₀ is ~10⁸ times smaller than E₀.",
    "Treating displacement current as a flow of charge.",
    "Omitting the displacement-current term in the Ampère–Maxwell law.",
    "Using I/c for a reflector (it's 2I/c) or 2I/c for an absorber (it's I/c).",
    "Forgetting energy is shared equally between E and B fields.",
    "Saying a steady current or uniformly moving charge radiates (only accelerated charges do).",
    "Using v = c inside a medium (v = c/n there).",
    "Confusing intensity I with energy density u (I = u·c).",
    "Forgetting EM waves carry momentum (p = U/c) hence radiation pressure.",
    "Mixing peak and average energy density (u_avg = ½ε₀E₀²).",
    "Thinking EM waves need a medium — they propagate through vacuum.",
    "Getting the propagation direction wrong — it's along E × B.",
  ],
  revision: {
    formulaSheet: [
      { label: "Displacement current", expr: "I_d = ε₀ dΦ_E/dt" },
      { label: "Ampère–Maxwell", expr: "∮B·dl = μ₀I_c + μ₀ε₀ dΦ_E/dt" },
      { label: "Speed", expr: "c = 1/√(μ₀ε₀);  v = c/n" },
      { label: "Field ratio", expr: "E₀/B₀ = c" },
      { label: "Energy density", expr: "u = ½ε₀E² + B²/2μ₀" },
      { label: "Intensity", expr: "I = ½ε₀E₀²c" },
      { label: "Radiation pressure", expr: "P = I/c (absorb), 2I/c (reflect)" },
      { label: "Spectrum", expr: "c = fλ,  E = hf" },
    ],
    conceptMap:
      "Ampère's law fails for a capacitor ─▶ displacement current (I_d=ε₀dΦ_E/dt) ─▶ Maxwell's 4 equations\nChanging E ↔ changing B ─▶ self-propagating EM wave (c=1/√μ₀ε₀, E⟂B⟂c, E=cB)\nWave carries energy (I=½ε₀E₀²c) & momentum (p=U/c, radiation pressure)\nEM spectrum: radio→micro→IR→visible→UV→X-ray→gamma (↑ frequency)",
    pyqInsights: [
      "JEE Main: ~1 question/shift — displacement current, properties (E=cB, E⟂B⟂c), spectrum order/uses, and intensity/radiation pressure.",
      "JEE Advanced: less frequent standalone; intensity/momentum and displacement-current conceptual questions appear.",
      "Numerical answers cluster on B₀ = E₀/c, intensity, radiation pressure and wavelength from c = fλ.",
    ],
    lastMinuteTips: [
      "E ⟂ B ⟂ c, in phase, propagation along E × B, and E = cB.",
      "c = 1/√(μ₀ε₀); in a medium v = c/n.",
      "Energy splits equally between E and B; I = ½ε₀E₀²c.",
      "Radiation pressure: I/c absorbed, 2I/c reflected; p = U/c.",
      "Spectrum (↑ frequency): radio, micro, IR, visible, UV, X-ray, gamma.",
      "Displacement current I_d = ε₀ dΦ_E/dt completes Ampère's law.",
      "Only accelerated charges radiate.",
    ],
  },
};

export default electromagneticWaves;
