import type { ChapterLearnModule } from "../shared/types";

/* SVG diagrams — field indigo, current/EMF red, velocity blue, force green.
   "×" = into page. */

const SVG_FLUX = `<svg viewBox='0 0 320 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Magnetic flux through a loop at angle theta to the field'><defs><marker id='emih1' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><g stroke='#6366f1' stroke-width='1.6' marker-end='url(#emih1)'><line x1='20' y1='50' x2='130' y2='50'/><line x1='20' y1='95' x2='130' y2='95'/><line x1='20' y1='140' x2='130' y2='140'/></g><text x='25' y='40' font-size='12' fill='#6366f1'>B</text><ellipse cx='210' cy='95' rx='26' ry='62' fill='none' stroke='#dc2626' stroke-width='2.5'/><text x='196' y='168' font-size='12' fill='#dc2626'>loop (area A)</text><line x1='210' y1='95' x2='285' y2='75' stroke='currentColor' stroke-width='2'/><polygon points='285,75 275,73 278,83' fill='currentColor'/><text x='288' y='72' font-size='12' fill='currentColor'>n̂</text><line x1='210' y1='95' x2='300' y2='95' stroke='#6366f1' stroke-width='1' stroke-dasharray='4 3'/><text x='250' y='110' font-size='11' fill='currentColor'>θ</text><text x='150' y='20' font-size='11' fill='currentColor'>Φ = BA cosθ</text></svg>`;

const SVG_LENZ = `<svg viewBox='0 0 340 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label="Lenz's law: a magnet approaching a coil induces an opposing current"><rect x='40' y='75' width='40' height='30' fill='#dc2626'/><text x='52' y='95' font-size='13' fill='#fff'>N</text><line x1='80' y1='90' x2='150' y2='90' stroke='#16a34a' stroke-width='2.5'/><polygon points='150,90 141,85 141,95' fill='#16a34a'/><text x='95' y='80' font-size='12' fill='#16a34a'>v</text><ellipse cx='220' cy='90' rx='16' ry='55' fill='none' stroke='#2563eb' stroke-width='2.5'/><ellipse cx='240' cy='90' rx='16' ry='55' fill='none' stroke='#2563eb' stroke-width='2.5'/><ellipse cx='260' cy='90' rx='16' ry='55' fill='none' stroke='#2563eb' stroke-width='2.5'/><text x='205' y='30' font-size='12' fill='#dc2626'>induced N (repels)</text><text x='180' y='168' font-size='11' fill='currentColor'>induced current opposes the approaching flux</text></svg>`;

const SVG_MOTIONAL = `<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Motional EMF: a rod sliding along rails in a field into the page'><g fill='#6366f1' font-size='14'><text x='90' y='60'>×</text><text x='140' y='60'>×</text><text x='190' y='60'>×</text><text x='240' y='60'>×</text><text x='90' y='150'>×</text><text x='140' y='150'>×</text><text x='190' y='150'>×</text><text x='240' y='150'>×</text></g><text x='250' y='100' font-size='11' fill='#6366f1'>B (in)</text><line x1='50' y1='70' x2='270' y2='70' stroke='currentColor' stroke-width='2'/><line x1='50' y1='160' x2='270' y2='160' stroke='currentColor' stroke-width='2'/><line x1='50' y1='70' x2='50' y2='160' stroke='currentColor' stroke-width='2'/><line x1='200' y1='62' x2='200' y2='168' stroke='#dc2626' stroke-width='3'/><line x1='208' y1='115' x2='258' y2='115' stroke='#16a34a' stroke-width='2.5'/><polygon points='258,115 249,110 249,120' fill='#16a34a'/><text x='222' y='108' font-size='12' fill='#16a34a'>v</text><text x='55' y='115' font-size='11' fill='#dc2626'>ε = Bvl</text></svg>`;

const SVG_EDDY = `<svg viewBox='0 0 300 170' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Eddy currents induced in a moving conducting plate'><rect x='60' y='40' width='180' height='90' fill='none' stroke='currentColor' stroke-width='2'/><g fill='#6366f1' font-size='12'><text x='95' y='70'>×</text><text x='130' y='70'>×</text><text x='95' y='110'>×</text><text x='130' y='110'>×</text></g><g fill='none' stroke='#dc2626' stroke-width='1.8'><circle cx='115' cy='85' r='22'/><circle cx='185' cy='85' r='22'/></g><polygon points='137,85 130,78 130,92' fill='#dc2626'/><polygon points='163,85 170,78 170,92' fill='#dc2626'/><text x='90' y='150' font-size='11' fill='currentColor'>swirling eddy currents oppose the change</text></svg>`;

const SVG_SELF = `<svg viewBox='0 0 320 160' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Self-induction in a solenoid with changing current'><g fill='none' stroke='#dc2626' stroke-width='2'><ellipse cx='90' cy='80' rx='7' ry='34'/><ellipse cx='125' cy='80' rx='7' ry='34'/><ellipse cx='160' cy='80' rx='7' ry='34'/><ellipse cx='195' cy='80' rx='7' ry='34'/><ellipse cx='230' cy='80' rx='7' ry='34'/></g><line x1='30' y1='80' x2='83' y2='80' stroke='currentColor' stroke-width='2'/><polygon points='83,80 74,75 74,85' fill='#dc2626'/><text x='40' y='70' font-size='12' fill='#dc2626'>I↑</text><line x1='237' y1='80' x2='290' y2='80' stroke='currentColor' stroke-width='2'/><text x='95' y='140' font-size='11' fill='currentColor'>ε = −L dI/dt,  U = ½LI²</text></svg>`;

const SVG_MUTUAL = `<svg viewBox='0 0 320 160' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Mutual induction between primary and secondary coils'><g fill='none' stroke='#dc2626' stroke-width='2'><ellipse cx='70' cy='80' rx='7' ry='36'/><ellipse cx='100' cy='80' rx='7' ry='36'/><ellipse cx='130' cy='80' rx='7' ry='36'/></g><text x='80' y='135' font-size='11' fill='#dc2626'>primary (I₁)</text><g fill='none' stroke='#2563eb' stroke-width='2'><ellipse cx='200' cy='80' rx='7' ry='36'/><ellipse cx='230' cy='80' rx='7' ry='36'/><ellipse cx='260' cy='80' rx='7' ry='36'/></g><text x='205' y='135' font-size='11' fill='#2563eb'>secondary (ε₂)</text><g stroke='#6366f1' stroke-width='1.4'><line x1='135' y1='66' x2='262' y2='66'/><line x1='135' y1='94' x2='262' y2='94'/></g><text x='150' y='30' font-size='11' fill='#6366f1'>shared flux:  ε₂ = −M dI₁/dt</text></svg>`;

const SVG_GENERATOR = `<svg viewBox='0 0 340 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='AC generator: a coil rotating between magnet poles produces a sinusoidal EMF'><rect x='30' y='55' width='34' height='80' fill='#dc2626'/><text x='40' y='100' font-size='14' fill='#fff'>N</text><rect x='180' y='55' width='34' height='80' fill='#2563eb'/><text x='188' y='100' font-size='14' fill='#fff'>S</text><rect x='95' y='70' width='60' height='50' fill='none' stroke='currentColor' stroke-width='2'/><text x='108' y='100' font-size='11' fill='currentColor'>coil ω</text><path d='M250,95 q15,-45 30,0 q15,45 30,0' fill='none' stroke='#dc2626' stroke-width='2'/><line x1='245' y1='95' x2='320' y2='95' stroke='currentColor' stroke-width='1'/><text x='250' y='140' font-size='11' fill='#dc2626'>ε = NBAω sin ωt</text></svg>`;

const SVG_LR = `<svg viewBox='0 0 280 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Growth and decay of current in an LR circuit'><line x1='40' y1='150' x2='260' y2='150' stroke='currentColor' stroke-width='1.5'/><line x1='40' y1='150' x2='40' y2='25' stroke='currentColor' stroke-width='1.5'/><text x='22' y='35' font-size='12' fill='currentColor'>I</text><text x='250' y='168' font-size='12' fill='currentColor'>t</text><path d='M40,150 C80,70 140,55 250,50' fill='none' stroke='#2563eb' stroke-width='2.5'/><text x='130' y='45' font-size='11' fill='#2563eb'>growth I=I₀(1−e^{−t/τ})</text><path d='M40,50 C80,130 140,145 250,148' fill='none' stroke='#dc2626' stroke-width='2.5'/><text x='130' y='128' font-size='11' fill='#dc2626'>decay I=I₀e^{−t/τ}</text><line x1='40' y1='50' x2='250' y2='50' stroke='currentColor' stroke-width='0.7' stroke-dasharray='3 3'/><text x='20' y='54' font-size='10' fill='currentColor'>I₀</text></svg>`;

export const electromagneticInduction: ChapterLearnModule = {
  slug: "electromagnetic-induction",
  chapter: "Electromagnetic Induction",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "A changing magnetic flux drives a current: magnetic flux, Faraday's & Lenz's laws, motional EMF, eddy currents, self- and mutual inductance, energy in a field, and the AC generator — first principles to JEE Advanced.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "Oersted showed current makes a field; Faraday asked the reverse — can a field make a current? The answer, **electromagnetic induction**, runs every generator, transformer and induction charger on Earth.",
      topics: [
        {
          id: "overview",
          title: "Change is everything",
          theory:
            "The central discovery: a **steady** magnetic field does nothing, but a **changing** magnetic flux through a circuit drives an EMF. Move a magnet, change a current, or rotate a coil — any change in flux induces a voltage. This converts mechanical energy to electrical (generators) and links circuits without contact (transformers).",
          callouts: [
            {
              kind: "history",
              body:
                "- **Faraday & Henry (1831):** independently discover induction.\n- **Lenz (1834):** gives the direction rule (energy conservation in disguise).\n- **Maxwell:** writes it as ∮E·dl = −dΦ/dt — the third of his equations.",
            },
            {
              kind: "tip",
              title: "Where it shows up",
              body:
                "- **Generators / dynamos** — the source of nearly all electricity.\n- **Transformers** — mutual induction steps voltage up/down.\n- **Induction cooktops, metal detectors, brakes** — eddy currents.\n- **Wireless / inductive charging, microphones, guitar pickups.**",
            },
          ],
        },
      ],
    },
    {
      id: "flux",
      title: "2 · Magnetic Flux",
      topics: [
        {
          id: "flux-theory",
          title: "The quantity that must change",
          theory:
            "**Magnetic flux** through a surface measures the field threading it:\n  Φ = B·A = BA cosθ,\nwhere θ is the angle between B and the area's normal n̂. Unit: **weber (Wb)** = T·m². Flux changes if **B**, **A**, or **θ** changes — each is a route to induction.",
          figures: [{ svg: SVG_FLUX, caption: "Φ = BA cosθ — only the component of B along the normal threads the loop." }],
          formulas: [{ label: "Magnetic flux", expr: "Φ = B·A = BA cosθ", note: "weber = T·m²" }],
          callouts: [
            {
              kind: "intuition",
              body:
                "Flux is the 'amount of field caught' by the loop. Induction cares only about how fast that catch is **changing** — a huge steady flux induces nothing.",
            },
          ],
        },
      ],
    },
    {
      id: "faraday-lenz",
      title: "3 · Faraday's & Lenz's Laws",
      topics: [
        {
          id: "faraday-theory",
          title: "The magnitude and the direction",
          theory:
            "**Faraday's law:** the induced EMF equals the rate of change of flux. For N turns:\n  ε = −N dΦ/dt.\n**Lenz's law** fixes the sign: the induced current flows so as to **oppose the change** that produced it — a direct consequence of energy conservation.",
          derivation:
            "The minus sign is Lenz's law. If the flux through a loop increases, the induced current creates a field **opposing** the increase (and vice-versa). If induced current aided the change, it would grow without limit — violating energy conservation.\nInduced charge over a time interval: q = ∫i dt = ΔΦ·N/R (independent of how fast).",
          figures: [{ svg: SVG_LENZ, caption: "A magnet approaching a coil induces a current whose field repels it (opposes the rising flux)." }],
          formulas: [
            { label: "Faraday's law", expr: "ε = −N dΦ/dt" },
            { label: "Induced charge", expr: "q = NΔΦ/R" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Lenz = energy conservation",
              body:
                "The induced effect always opposes its cause: approach a coil with a magnet and you must do **work against** a repulsion; that work becomes the electrical energy. You never get induced energy for free.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A 200-turn coil of area 0.05 m² is in a field that drops from 0.4 T to 0 in 0.1 s (B ⟂ coil). Find the average induced EMF.",
              solution:
                "|ε| = N|ΔΦ|/Δt = N·A·|ΔB|/Δt = 200 × 0.05 × 0.4 / 0.1 = 40 V.",
              answer: "40 V",
            },
          ],
          mistakes: [
            "Forgetting the factor N (number of turns).",
            "Ignoring the minus sign / Lenz direction when asked for current direction.",
            "Using ΔΦ without noting which of B, A or θ actually changes.",
          ],
        },
      ],
    },
    {
      id: "motional",
      title: "4 · Motional EMF",
      topics: [
        {
          id: "motional-theory",
          title: "EMF from a moving conductor",
          theory:
            "A rod of length l moving with speed v perpendicular to a field B sweeps out area and changes flux, inducing\n  ε = Bvl.\nMicroscopically, the free charges in the rod feel qv×B and pile up until an electric field balances them — that's the EMF.",
          derivation:
            "Flux swept in time dt: dΦ = B·(l·v dt) ⇒ ε = dΦ/dt = Bvl.\nIf the rod closes a circuit of resistance R: I = Bvl/R.\nRetarding force on the rod: F = BIl = B²l²v/R.\nPower dissipated = Fv = B²l²v²/R = ε²/R (mechanical → electrical).\n**Rotating rod** (length l, angular speed ω about one end): ε = ½Bωl².",
          figures: [{ svg: SVG_MOTIONAL, caption: "Rod sliding on rails: ε = Bvl drives a current; a force B²l²v/R opposes the motion." }],
          formulas: [
            { label: "Sliding rod", expr: "ε = Bvl,  I = Bvl/R" },
            { label: "Retarding force", expr: "F = B²l²v/R" },
            { label: "Rotating rod", expr: "ε = ½Bωl²" },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "A rod of length l on frictionless rails (field B into page, resistance R) is given speed v₀ and released. Find its speed as a function of time.",
              solution:
                "Force: m dv/dt = −B²l²v/R.\nSeparate: dv/v = −(B²l²/mR) dt ⇒ v = v₀ e^{−(B²l²/mR)t}.\nThe rod slows exponentially; all its KE ends up dissipated in R.",
              answer: "v = v₀ e^{−B²l²t/mR}",
            },
          ],
        },
      ],
    },
    {
      id: "eddy",
      title: "5 · Eddy Currents",
      topics: [
        {
          id: "eddy-theory",
          title: "Induced currents in bulk conductors",
          theory:
            "A changing flux through a **solid** conductor induces swirling **eddy currents**. By Lenz's law they oppose the change, dissipating energy as heat. Harmful (transformer-core heating — reduced by **laminating** the core) but also useful.",
          figures: [{ svg: SVG_EDDY, caption: "Eddy currents swirl to oppose the flux change, dissipating energy as heat." }],
          callouts: [
            {
              kind: "tip",
              title: "Useful eddy currents",
              body:
                "- **Induction stoves** — eddy currents heat the pan directly.\n- **Magnetic braking** (trains, treadmills) — smooth, contactless.\n- **Metal detectors & induction furnaces.**\nLaminated/slotted cores cut wasteful eddy heating in transformers and motors.",
            },
          ],
        },
      ],
    },
    {
      id: "inductance",
      title: "6 · Self- & Mutual Inductance",
      topics: [
        {
          id: "self-theory",
          title: "Self-induction and energy",
          theory:
            "A changing current in a coil changes its **own** flux, inducing a back-EMF that opposes the change — **self-induction**. The proportionality constant is the **inductance L** (henry, H): an inductor resists changes in current (electrical inertia).",
          derivation:
            "Flux linkage NΦ = L I ⇒ L = NΦ/I.\nBack-EMF: ε = −L dI/dt.\nSolenoid: L = μ₀ n² A l = μ₀ N²A/l.\nEnergy stored: U = ½LI²; energy density u = B²/(2μ₀).",
          figures: [{ svg: SVG_SELF, caption: "A rising current induces a back-EMF ε = −L dI/dt; energy ½LI² is stored in the field." }],
          formulas: [
            { label: "Self-inductance", expr: "ε = −L dI/dt,  L = NΦ/I" },
            { label: "Solenoid", expr: "L = μ₀ n² A l" },
            { label: "Energy", expr: "U = ½LI²,  u = B²/2μ₀" },
          ],
          callouts: [
            {
              kind: "intuition",
              body:
                "An inductor is to current what mass is to velocity: it resists sudden change. Current through an inductor cannot jump instantaneously — it must change smoothly.",
            },
          ],
        },
        {
          id: "mutual-theory",
          title: "Mutual induction",
          theory:
            "A changing current in one coil induces an EMF in a **neighbouring** coil through shared flux — the principle of the transformer.",
          derivation:
            "ε₂ = −M dI₁/dt, where M = N₂Φ₂/I₁ is the **mutual inductance** (henry).\nFor two coupled coils: M = k√(L₁L₂), with coupling constant 0 ≤ k ≤ 1 (k = 1 ideal).",
          figures: [{ svg: SVG_MUTUAL, caption: "Shared flux couples the coils: ε₂ = −M dI₁/dt." }],
          formulas: [
            { label: "Mutual EMF", expr: "ε₂ = −M dI₁/dt" },
            { label: "Coupling", expr: "M = k√(L₁L₂)" },
          ],
        },
      ],
    },
    {
      id: "generator-lr",
      title: "7 · AC Generator & LR Circuits",
      topics: [
        {
          id: "generator-theory",
          title: "The AC generator",
          theory:
            "Rotate a coil (N turns, area A) at angular speed ω in a uniform field B. The flux Φ = NBA cosωt varies sinusoidally, inducing a sinusoidal EMF — this is how almost all electricity is generated.",
          derivation:
            "Φ = NBA cos ωt ⇒ ε = −dΦ/dt = NBAω sin ωt.\nPeak EMF: ε₀ = NBAω. Output is alternating with frequency f = ω/2π.",
          figures: [{ svg: SVG_GENERATOR, caption: "Rotating coil: ε = NBAω sin ωt — a sinusoidal (AC) output." }],
          formulas: [
            { label: "Generator EMF", expr: "ε = NBAω sin ωt" },
            { label: "Peak EMF", expr: "ε₀ = NBAω" },
          ],
        },
        {
          id: "lr-theory",
          title: "Growth & decay in an LR circuit",
          theory:
            "Because an inductor opposes change, current in an LR circuit rises/falls exponentially (not instantly).",
          derivation:
            "Growth (battery connected): I = I₀(1 − e^{−t/τ}), with I₀ = ε/R.\nDecay (battery removed): I = I₀ e^{−t/τ}.\nTime constant τ = L/R — time to reach 63% (growth) or fall to 37% (decay).",
          figures: [{ svg: SVG_LR, caption: "LR circuit: exponential growth and decay with time constant τ = L/R." }],
          formulas: [
            { label: "Growth", expr: "I = I₀(1 − e^{−t/τ})" },
            { label: "Decay", expr: "I = I₀ e^{−t/τ}" },
            { label: "Time constant", expr: "τ = L/R" },
          ],
          mistakes: [
            "Expecting current through an inductor to jump instantly — it changes smoothly.",
            "Using τ = RC (that's for capacitors); inductors use τ = L/R.",
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "8 · Advanced JEE Insights",
      topics: [
        {
          id: "insights",
          title: "Direction rules, energy and limiting cases",
          theory: "Almost every induction problem reduces to 'what flux is changing, and what opposes the change'.",
          callouts: [
            {
              kind: "jee",
              body:
                "- Identify which of **B, A, θ** changes — that sets dΦ/dt.\n- **Lenz = energy conservation**: the agent doing the changing always does positive work.\n- Motional-EMF problems double as **mechanics** problems: F = B²l²v/R gives the equation of motion (often exponential).\n- Induced charge q = NΔΦ/R is independent of the time taken.\n- Inductor: current is continuous (like position); capacitor: voltage is continuous.\n- Energy in the field: ½LI² (magnetic) mirrors ½CV² (electric).",
            },
            {
              kind: "warning",
              body:
                "- Don't forget N in ε = −N dΦ/dt.\n- τ = L/R for inductors (not RC).\n- A steady field/current induces nothing — only **change** matters.\n- Rotating rod: ε = ½Bωl², not Bωl².",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Thinking a steady (large) magnetic field induces an EMF — only a CHANGING flux does.",
    "Dropping the number of turns N in ε = −N dΦ/dt.",
    "Ignoring Lenz's law (the minus sign) when finding the current's direction.",
    "Forgetting flux can change via B, A or θ — not just B.",
    "Using τ = RC for an LR circuit (it's τ = L/R).",
    "Expecting the current through an inductor to change instantaneously.",
    "Writing the rotating-rod EMF as Bωl² instead of ½Bωl².",
    "Forgetting the retarding force F = B²l²v/R in motional-EMF mechanics.",
    "Treating eddy currents as useless — they also enable braking and induction heating.",
    "Confusing self-inductance (one coil) with mutual inductance (two coils).",
    "Forgetting energy density u = B²/2μ₀ (magnetic) parallels ½ε₀E².",
    "Assuming induced charge depends on how fast the flux changes (q = NΔΦ/R is time-independent).",
    "Using L = μ₀nAl instead of μ₀n²Al for a solenoid (the turns appear squared).",
    "Mislabelling generator peak EMF — ε₀ = NBAω.",
    "Forgetting to laminate cores conceptually (why eddy losses are reduced).",
  ],
  revision: {
    formulaSheet: [
      { label: "Flux", expr: "Φ = BA cosθ" },
      { label: "Faraday / Lenz", expr: "ε = −N dΦ/dt" },
      { label: "Induced charge", expr: "q = NΔΦ/R" },
      { label: "Motional EMF", expr: "ε = Bvl ;  rotating ε = ½Bωl²" },
      { label: "Retarding force", expr: "F = B²l²v/R,  P = ε²/R" },
      { label: "Self-inductance", expr: "ε = −L dI/dt,  L_sol = μ₀n²Al" },
      { label: "Mutual inductance", expr: "ε₂ = −M dI₁/dt,  M = k√(L₁L₂)" },
      { label: "Energy", expr: "U = ½LI²,  u = B²/2μ₀" },
      { label: "Generator", expr: "ε = NBAω sin ωt" },
      { label: "LR circuit", expr: "I = I₀(1−e^{−t/τ}),  τ = L/R" },
    ],
    conceptMap:
      "Magnetic flux Φ=BA cosθ ─▶ Faraday (ε=−N dΦ/dt) + Lenz (opposes change)\n  ├─ Motional EMF (ε=Bvl) ─▶ mechanics (F=B²l²v/R)\n  ├─ Eddy currents (braking, heating)\n  ├─ Self-induction (L, ½LI²) & Mutual induction (M)\n  └─ AC generator (ε=NBAω sinωt) ; LR transient (τ=L/R)",
    pyqInsights: [
      "JEE Main: 1–2 questions/shift — Faraday/Lenz, motional EMF, self/mutual inductance and LR time constant are staples.",
      "JEE Advanced: motional-EMF + mechanics (rod on rails, exponential motion), energy accounting, mutual inductance and induced-charge problems.",
      "Numerical answers cluster on induced EMF/charge, inductance, time constant and terminal velocity of a falling/sliding conductor.",
    ],
    lastMinuteTips: [
      "Only CHANGING flux induces — identify which of B, A, θ changes.",
      "Lenz's law = energy conservation; induced effect opposes its cause.",
      "Motional EMF ε = Bvl; rotating rod ε = ½Bωl².",
      "Slide-on-rails: F = B²l²v/R ⇒ usually exponential v(t); terminal speed when net force = 0 (if a driving force exists).",
      "Inductor: current continuous, τ = L/R, energy ½LI².",
      "Induced charge q = NΔΦ/R is independent of the time taken.",
      "Generator peak EMF ε₀ = NBAω.",
    ],
  },
};

export default electromagneticInduction;
