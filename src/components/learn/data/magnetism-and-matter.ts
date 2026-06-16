import type { ChapterLearnModule } from "../shared/types";

/* SVG diagrams — N pole red, S pole blue, field/vectors indigo, force/torque green. */

const SVG_BAR_MAGNET = `<svg viewBox='0 0 340 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Magnetic field lines of a bar magnet from N to S'><rect x='130' y='88' width='40' height='24' fill='#2563eb'/><rect x='170' y='88' width='40' height='24' fill='#dc2626'/><text x='144' y='105' font-size='13' fill='#fff'>S</text><text x='185' y='105' font-size='13' fill='#fff'>N</text><g fill='none' stroke='#6366f1' stroke-width='1.5'><path d='M210,100 C260,100 270,60 240,40 C200,15 140,15 100,40 C70,60 80,100 130,100'/><path d='M210,100 C260,100 275,140 240,160 C200,185 140,185 100,160 C65,140 80,100 130,100'/><path d='M210,95 C245,85 250,70 230,62'/><path d='M210,105 C245,115 250,130 230,138'/></g><polygon points='168,40 160,33 158,44' fill='#6366f1'/><polygon points='168,160 158,156 160,167' fill='#6366f1'/><text x='220' y='30' font-size='11' fill='#6366f1'>field lines N → S (outside)</text></svg>`;

const SVG_DIPOLE_POINTS = `<svg viewBox='0 0 360 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Bar magnet as a magnetic dipole with axial and equatorial points'><rect x='120' y='95' width='40' height='22' fill='#2563eb'/><rect x='160' y='95' width='40' height='22' fill='#dc2626'/><text x='134' y='111' font-size='12' fill='#fff'>S</text><text x='175' y='111' font-size='12' fill='#fff'>N</text><line x1='130' y1='106' x2='250' y2='106' stroke='#6366f1' stroke-width='2.5'/><polygon points='250,106 241,101 241,111' fill='#6366f1'/><text x='215' y='100' font-size='12' fill='#6366f1'>m</text><line x1='200' y1='106' x2='340' y2='106' stroke='currentColor' stroke-width='1'/><circle cx='320' cy='106' r='3' fill='currentColor'/><text x='300' y='98' font-size='11' fill='currentColor'>axial</text><line x1='160' y1='106' x2='160' y2='20' stroke='currentColor' stroke-width='1'/><circle cx='160' cy='30' r='3' fill='currentColor'/><text x='168' y='34' font-size='11' fill='currentColor'>equatorial</text></svg>`;

const SVG_TORQUE = `<svg viewBox='0 0 320 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Bar magnet at an angle in a uniform field experiences a torque'><g stroke='#6366f1' stroke-width='1.4'><line x1='20' y1='40' x2='300' y2='40'/><line x1='20' y1='150' x2='300' y2='150'/></g><polygon points='300,40 291,35 291,45' fill='#6366f1'/><text x='25' y='32' font-size='12' fill='#6366f1'>B</text><g transform='rotate(-30 160 95)'><rect x='120' y='84' width='40' height='22' fill='#2563eb'/><rect x='160' y='84' width='40' height='22' fill='#dc2626'/><text x='133' y='100' font-size='12' fill='#fff'>S</text><text x='176' y='100' font-size='12' fill='#fff'>N</text></g><text x='150' y='178' font-size='11' fill='currentColor'>τ = mB sinθ,  U = −mB cosθ</text></svg>`;

const SVG_GAUSS_MAG = `<svg viewBox='0 0 320 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label="Gauss's law for magnetism: equal field lines enter and leave a closed surface"><rect x='40' y='80' width='34' height='20' fill='#2563eb'/><rect x='74' y='80' width='34' height='20' fill='#dc2626'/><text x='50' y='95' font-size='11' fill='#fff'>S</text><text x='86' y='95' font-size='11' fill='#fff'>N</text><circle cx='200' cy='90' r='55' fill='none' stroke='currentColor' stroke-width='1.8' stroke-dasharray='6 4'/><g stroke='#6366f1' stroke-width='1.5'><path d='M108,86 C150,70 250,70 290,86'/><path d='M108,94 C150,110 250,110 290,94'/></g><polygon points='290,86 280,82 282,90' fill='#6366f1'/><polygon points='290,94 282,90 280,98' fill='#6366f1'/><text x='150' y='168' font-size='12' fill='currentColor'>∮ B·dA = 0  (no monopoles)</text></svg>`;

const SVG_EARTH = `<svg viewBox='0 0 280 240' xmlns='http://www.w3.org/2000/svg' role='img' aria-label="Earth's magnetism: dip angle and horizontal/vertical components"><circle cx='140' cy='120' r='80' fill='none' stroke='currentColor' stroke-width='1.8'/><line x1='140' y1='25' x2='140' y2='215' stroke='currentColor' stroke-width='1' stroke-dasharray='4 3'/><text x='146' y='24' font-size='10' fill='currentColor'>geo N</text><line x1='118' y1='35' x2='162' y2='205' stroke='#2563eb' stroke-width='1.5' stroke-dasharray='5 3'/><text x='165' y='205' font-size='10' fill='#2563eb'>mag axis</text><circle cx='200' cy='95' r='3' fill='currentColor'/><line x1='200' y1='95' x2='255' y2='95' stroke='#6366f1' stroke-width='2'/><polygon points='255,95 246,90 246,100' fill='#6366f1'/><text x='258' y='98' font-size='11' fill='#6366f1'>B_H</text><line x1='200' y1='95' x2='200' y2='135' stroke='#16a34a' stroke-width='2'/><polygon points='200,135 195,126 205,126' fill='#16a34a'/><text x='205' y='130' font-size='11' fill='#16a34a'>B_V</text><line x1='200' y1='95' x2='248' y2='130' stroke='#dc2626' stroke-width='2'/><text x='235' y='120' font-size='11' fill='#dc2626'>B</text><path d='M225,95 A25,25 0 0 1 222,110' fill='none' stroke='currentColor' stroke-width='1'/><text x='228' y='110' font-size='10' fill='currentColor'>δ</text></svg>`;

const SVG_MATERIALS = `<svg viewBox='0 0 360 160' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Field-line behaviour in diamagnetic, paramagnetic and ferromagnetic materials'><g stroke='#6366f1' stroke-width='1.3'><path d='M30,40 C55,40 55,30 75,30'/><path d='M30,70 L75,70'/><path d='M30,100 C55,100 55,110 75,110'/></g><rect x='40' y='50' width='25' height='40' fill='none' stroke='currentColor' stroke-width='1.5'/><text x='25' y='140' font-size='11' fill='currentColor'>dia (expelled)</text><g stroke='#6366f1' stroke-width='1.3'><line x1='150' y1='40' x2='195' y2='40'/><path d='M150,70 C172,70 172,68 195,66'/><line x1='150' y1='100' x2='195' y2='100'/></g><rect x='160' y='50' width='25' height='40' fill='none' stroke='currentColor' stroke-width='1.5'/><text x='150' y='140' font-size='11' fill='currentColor'>para (slight pull)</text><g stroke='#6366f1' stroke-width='1.3'><path d='M270,40 C292,40 292,62 312,66'/><path d='M270,70 L315,70'/><path d='M270,100 C292,100 292,78 312,74'/></g><rect x='280' y='50' width='25' height='40' fill='none' stroke='currentColor' stroke-width='1.5'/><text x='262' y='140' font-size='11' fill='currentColor'>ferro (strong pull)</text></svg>`;

const SVG_HYSTERESIS = `<svg viewBox='0 0 240 220' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Hysteresis loop of B versus H showing retentivity and coercivity'><line x1='30' y1='110' x2='220' y2='110' stroke='currentColor' stroke-width='1.3'/><line x1='125' y1='25' x2='125' y2='200' stroke='currentColor' stroke-width='1.3'/><text x='210' y='104' font-size='12' fill='currentColor'>H</text><text x='132' y='35' font-size='12' fill='currentColor'>B</text><path d='M125,60 C175,55 200,60 205,65 C190,80 150,95 125,110 C100,140 70,150 45,150 C75,158 110,150 125,160 C95,165 60,160 45,155 C60,140 100,125 125,110 C150,80 190,65 205,65' fill='none' stroke='#dc2626' stroke-width='2'/><circle cx='125' cy='75' r='2.5' fill='#16a34a'/><text x='130' y='75' font-size='10' fill='#16a34a'>retentivity</text><circle cx='80' cy='110' r='2.5' fill='#2563eb'/><text x='40' y='128' font-size='10' fill='#2563eb'>coercivity</text></svg>`;

export const magnetismAndMatter: ChapterLearnModule = {
  slug: "magnetism-and-matter",
  chapter: "Magnetism & Matter",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "Bar magnets as dipoles, Gauss's law for magnetism, the Earth's magnetic field, magnetization & magnetic intensity, and the dia/para/ferromagnetic classification with hysteresis.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "Having seen that currents make magnetic fields, we now treat **permanent magnets** and **magnetic materials**. The unifying idea: a bar magnet is a **magnetic dipole**, mathematically identical to a current loop or an electric dipole.",
      topics: [
        {
          id: "overview",
          title: "Magnets, the Earth and materials",
          theory:
            "Every magnet has two inseparable poles — cut it and each piece is again a complete magnet (no isolated **monopole** exists). The Earth itself is a giant magnet, which is why compasses work. Materials respond to fields in three distinct ways (dia-, para-, ferromagnetic), explaining everything from levitating frogs to hard-disk storage.",
          callouts: [
            {
              kind: "tip",
              title: "Where it shows up",
              body:
                "- **Compasses & navigation** — Earth's field.\n- **Hard disks & magnetic tape** — ferromagnetic hysteresis stores bits.\n- **Transformer cores** — soft iron (thin loop, low loss).\n- **Permanent magnets** — hard ferromagnets (fat loop, high retentivity).",
            },
            {
              kind: "intuition",
              body:
                "A bar magnet ≈ a tightly wound current loop. So you can recycle the entire electric-dipole toolkit: swap p → m and E → B and most formulas carry straight over.",
            },
          ],
        },
      ],
    },
    {
      id: "bar-magnet",
      title: "2 · Bar Magnet as a Magnetic Dipole",
      topics: [
        {
          id: "bar-magnet-theory",
          title: "Magnetic moment, axial and equatorial fields",
          theory:
            "A bar magnet has a **magnetic moment m** pointing from S to N (magnitude m = pole strength × length, or NIA for the equivalent loop). For a short magnet at distance r (r ≫ size), the field mirrors the electric dipole with the constant μ₀/4π in place of 1/4πε₀.",
          derivation:
            "**Axial** (along the magnet's axis): B = (μ₀/4π)·(2m/r³), parallel to m.\n**Equatorial** (perpendicular bisector): B = (μ₀/4π)·(m/r³), anti-parallel to m.\nSo, just like the electric dipole: B_axial = 2·B_equatorial, both ∝ 1/r³.",
          figures: [
            { svg: SVG_BAR_MAGNET, caption: "Field lines emerge from N, loop around, and enter S (continuous inside the magnet)." },
            { svg: SVG_DIPOLE_POINTS, caption: "m points S → N; axial and equatorial reference points." },
          ],
          formulas: [
            { label: "Axial", expr: "B = (μ₀/4π)(2m/r³)" },
            { label: "Equatorial", expr: "B = (μ₀/4π)(m/r³)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Field lines are continuous",
              body:
                "Unlike electric field lines (which start/end on charges), magnetic field lines form **closed loops** — they run N→S outside the magnet and S→N **inside** it. There are no sources or sinks of B.",
            },
          ],
        },
        {
          id: "dipole-in-field",
          title: "Magnet in a uniform field: torque, energy, oscillation",
          theory:
            "Identical to the electric dipole story, with m and B.",
          derivation:
            "Torque: τ = m × B,  |τ| = mB sinθ.\nPotential energy: U = −m·B = −mB cosθ (min at θ=0, stable).\nSmall-angle oscillations (moment of inertia I):\n  T = 2π√(I/(mB)).\nThis is how a vibration magnetometer measures m or the field B_H.",
          figures: [{ svg: SVG_TORQUE, caption: "A tilted magnet feels τ = mB sinθ aligning it with B; it oscillates with T = 2π√(I/mB)." }],
          formulas: [
            { label: "Torque", expr: "τ = mB sinθ" },
            { label: "Energy", expr: "U = −mB cosθ" },
            { label: "Oscillation", expr: "T = 2π√(I/mB)" },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A bar magnet of moment m is rotated from alignment with a field B to 90°. Find the work done.",
              solution:
                "W = ΔU = U(90°) − U(0°) = (−mB cos90°) − (−mB cos0°) = 0 + mB = mB.",
              answer: "W = mB",
            },
          ],
        },
      ],
    },
    {
      id: "gauss-magnetism",
      title: "3 · Gauss's Law for Magnetism",
      topics: [
        {
          id: "gauss-mag-theory",
          title: "No magnetic monopoles",
          theory:
            "Because field lines are closed loops, the net magnetic flux through any **closed** surface is zero:\n  ∮ B·dA = 0.\nEvery line entering a closed surface also leaves it. Equivalently: **isolated magnetic monopoles do not exist** — the simplest magnetic source is the dipole.",
          figures: [{ svg: SVG_GAUSS_MAG, caption: "Equal flux enters and leaves any closed surface ⇒ ∮B·dA = 0." }],
          formulas: [{ label: "Gauss (magnetism)", expr: "∮ B·dA = 0" }],
          callouts: [
            {
              kind: "note",
              title: "Contrast with electricity",
              body:
                "Electric: ∮E·dA = Q/ε₀ (charges are sources). Magnetic: ∮B·dA = 0 (no monopoles). This is the second of Maxwell's equations.",
            },
          ],
        },
      ],
    },
    {
      id: "earth",
      title: "4 · The Earth's Magnetism",
      topics: [
        {
          id: "earth-theory",
          title: "Elements of terrestrial magnetism",
          theory:
            "The Earth behaves like a huge bar magnet tilted ~11° from its rotation axis (with its magnetic **south** near the geographic north!). At a place the field is described by three **magnetic elements**.",
          derivation:
            "- **Declination (D):** angle between geographic and magnetic north (horizontal plane).\n- **Dip / inclination (δ):** angle the total field makes with the horizontal.\n- **Horizontal component:** B_H = B cosδ;  **Vertical:** B_V = B sinδ.\n  ⇒ tanδ = B_V/B_H,  B = √(B_H² + B_V²).\nAt the magnetic equator δ = 0 (field horizontal); at the poles δ = 90° (field vertical).",
          figures: [{ svg: SVG_EARTH, caption: "Dip δ and the horizontal/vertical components: tanδ = B_V/B_H." }],
          formulas: [
            { label: "Components", expr: "B_H = B cosδ,  B_V = B sinδ" },
            { label: "Dip", expr: "tanδ = B_V/B_H" },
            { label: "Total field", expr: "B = √(B_H² + B_V²)" },
          ],
          examples: [
            {
              level: "JEE Main",
              problem: "At a place B_H = B_V. Find the angle of dip.",
              solution: "tanδ = B_V/B_H = 1 ⇒ δ = 45°.",
              answer: "δ = 45°",
            },
          ],
          mistakes: [
            "Forgetting that the Earth's magnetic **south** pole lies near the geographic **north** (so a compass N points north).",
            "Swapping cos/sin: B_H = B cosδ (horizontal uses cosine of the dip).",
          ],
        },
      ],
    },
    {
      id: "magnetization",
      title: "5 · Magnetization & Magnetic Intensity",
      topics: [
        {
          id: "magnetization-theory",
          title: "M, H, susceptibility and permeability",
          theory:
            "Inside a material the field is the applied field plus the material's own response. Three quantities organise this:\n- **Magnetization M** = net magnetic moment per unit volume (A/m).\n- **Magnetic intensity H** = the 'driving' field from free currents (A/m).\n- The total field B = μ₀(H + M).",
          derivation:
            "Define M = χ H, where χ is the **magnetic susceptibility** (dimensionless).\n  B = μ₀(H + M) = μ₀(1 + χ)H = μ₀ μ_r H = μH,\nwith relative permeability μ_r = 1 + χ and permeability μ = μ₀μ_r.",
          formulas: [
            { label: "Total field", expr: "B = μ₀(H + M)" },
            { label: "Susceptibility", expr: "M = χH" },
            { label: "Permeability", expr: "μ_r = 1 + χ,  B = μ₀μ_r H" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "B vs H",
              body:
                "B (tesla) is the actual field that exerts forces; H (A/m) is set by the free (conduction) currents. They differ inside materials by the magnetization. Don't use them interchangeably.",
            },
          ],
        },
      ],
    },
    {
      id: "materials",
      title: "6 · Dia-, Para- and Ferromagnetism",
      topics: [
        {
          id: "materials-theory",
          title: "The three classes",
          theory:
            "Materials are classified by how they respond to an applied field:\n\n**Diamagnetic** (χ small, negative): weakly **repelled**; field lines pushed out. No permanent atomic moments; an induced moment opposes the field (Lenz-like). e.g. Bi, Cu, water, superconductors (perfect: χ = −1).\n\n**Paramagnetic** (χ small, positive): weakly **attracted**; random permanent moments partly align with the field. Obeys **Curie's law** χ ∝ 1/T. e.g. Al, Na, O₂.\n\n**Ferromagnetic** (χ very large, positive): strongly attracted; domains align and stay aligned. Shows hysteresis. Above the **Curie temperature** it becomes paramagnetic. e.g. Fe, Co, Ni.",
          figures: [{ svg: SVG_MATERIALS, caption: "Field lines are expelled (dia), slightly concentrated (para), or strongly concentrated (ferro)." }],
          formulas: [
            { label: "Curie law (para)", expr: "χ = C/T" },
            { label: "Curie–Weiss (ferro)", expr: "χ = C/(T − T_c),  T > T_c" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Quick comparison",
              body:
                "- **χ:** dia (−, tiny) < 0; para (+, small); ferro (+, huge).\n- **μ_r:** dia <1; para >1 (slightly); ferro ≫1.\n- **In a non-uniform field:** dia moves to **weaker** field, para/ferro to **stronger** field.\n- **Temperature:** para χ ∝ 1/T; ferro → para above T_c; dia ~ independent of T.",
            },
          ],
          mistakes: [
            "Saying diamagnetics are attracted — they are weakly **repelled** (move to weaker field).",
            "Applying Curie's law (χ ∝ 1/T) to diamagnets — it's for paramagnets.",
          ],
        },
        {
          id: "hysteresis",
          title: "Hysteresis & soft/hard materials",
          theory:
            "When a ferromagnet is cycled through an H field, B **lags** H — the B–H curve forms a loop (**hysteresis**). Two key intercepts: **retentivity** (B left when H = 0) and **coercivity** (reverse H needed to make B = 0).",
          derivation:
            "Energy lost per cycle (as heat) = **area of the B–H loop** × volume.\n- **Soft** ferromagnets (soft iron): thin loop, low coercivity, low loss → transformer/electromagnet cores.\n- **Hard** ferromagnets (steel, alnico): fat loop, high retentivity & coercivity → permanent magnets and data storage.",
          figures: [{ svg: SVG_HYSTERESIS, caption: "Hysteresis loop: retentivity (B at H=0), coercivity (H at B=0); area = energy lost per cycle." }],
          formulas: [{ label: "Hysteresis loss", expr: "W per cycle ∝ area of B–H loop" }],
          callouts: [
            {
              kind: "tip",
              title: "Soft vs hard — choose by the loop",
              body:
                "Want a temporary, easily-switched magnet with little energy waste (transformer core, electromagnet)? Use a **soft** material (thin loop). Want a permanent magnet / memory? Use a **hard** material (fat loop, high retentivity).",
            },
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
          title: "Analogies, traps and limiting cases",
          theory: "The fastest route through this chapter is the dipole analogy plus careful material classification.",
          callouts: [
            {
              kind: "jee",
              body:
                "- **Reuse the electric dipole**: B_axial = 2B_eq, τ = m×B, U = −m·B with μ₀/4π replacing 1/4πε₀.\n- Field lines are **closed loops** (∮B·dA = 0) — no monopoles.\n- Vibration magnetometer: T = 2π√(I/mB) lets you compare moments or measure B_H.\n- Non-uniform field test: dia → low field, para/ferro → high field.\n- Soft (thin loop) vs hard (fat loop) decides core vs permanent-magnet use.",
            },
            {
              kind: "warning",
              body:
                "- Earth's magnetic south is near geographic north.\n- B_H = B cosδ (cosine), B_V = B sinδ.\n- Diamagnetics are repelled; Curie law is for paramagnets only.\n- Don't conflate B (tesla, real field) with H (A/m, from free currents).",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Believing isolated magnetic monopoles exist — they don't (∮B·dA = 0).",
    "Forgetting field lines are continuous closed loops (S→N inside the magnet).",
    "Saying diamagnetic materials are attracted — they are weakly repelled.",
    "Applying Curie's law χ ∝ 1/T to diamagnets (it's for paramagnets).",
    "Swapping the dip components: B_H = B cosδ, B_V = B sinδ.",
    "Forgetting Earth's magnetic south pole lies near geographic north.",
    "Confusing B (tesla) with H (A/m) inside materials.",
    "Mixing up retentivity (B at H=0) and coercivity (H at B=0).",
    "Choosing a hard material for a transformer core (should be soft — low loss).",
    "Using B_axial = B_equatorial — axial is twice equatorial for a short dipole.",
    "Forgetting a ferromagnet becomes paramagnetic above its Curie temperature.",
    "Treating the bar-magnet field as 1/r² — short-dipole field is 1/r³.",
    "Ignoring the moment of inertia in the oscillation period T = 2π√(I/mB).",
    "Assuming μ_r < 1 for paramagnets (it's slightly > 1).",
    "Forgetting hysteresis-loop area equals the per-cycle energy loss.",
  ],
  revision: {
    formulaSheet: [
      { label: "Axial / Equatorial", expr: "B = μ₀2m/4πr³ ;  B = μ₀m/4πr³" },
      { label: "Torque / Energy", expr: "τ = mB sinθ ;  U = −mB cosθ" },
      { label: "Oscillation", expr: "T = 2π√(I/mB)" },
      { label: "Gauss (magnetism)", expr: "∮ B·dA = 0" },
      { label: "Earth components", expr: "B_H = B cosδ,  B_V = B sinδ,  tanδ = B_V/B_H" },
      { label: "Material relations", expr: "B = μ₀(H+M),  M = χH,  μ_r = 1+χ" },
      { label: "Curie law", expr: "χ = C/T (para)" },
      { label: "Hysteresis", expr: "loss/cycle ∝ loop area" },
    ],
    conceptMap:
      "Bar magnet = magnetic dipole (m) ─▶ axial/equatorial B, torque (m×B), oscillation T=2π√(I/mB)\nField lines closed ⇒ Gauss for magnetism (∮B·dA=0, no monopoles)\nEarth's field ─▶ elements (D, δ, B_H, B_V)\nMaterials: B=μ₀(H+M), M=χH ─▶ dia / para (Curie) / ferro (hysteresis: soft vs hard)",
    pyqInsights: [
      "JEE Main: ~1 question/shift — dip-angle components, susceptibility/permeability, dia/para/ferro classification, and bar-magnet torque/oscillation.",
      "JEE Advanced: less frequent standalone; usually merged with moving charges (dipole moment) or EMI; hysteresis and material properties appear conceptually.",
      "Numerical answers cluster on dip angle, B_H/B_V, magnetic moment and oscillation period.",
    ],
    lastMinuteTips: [
      "Reuse electric-dipole results with p→m, E→B, 1/4πε₀ → μ₀/4π.",
      "Field lines are closed loops; ∮B·dA = 0 (no monopoles).",
      "B_H = B cosδ, B_V = B sinδ, tanδ = B_V/B_H.",
      "Dia: χ<0, repelled, →weak field; Para: χ>0 small, χ∝1/T; Ferro: χ huge, hysteresis.",
      "Soft material (thin loop) for cores; hard (fat loop) for permanent magnets.",
      "Vibration magnetometer: T = 2π√(I/mB).",
    ],
  },
};

export default magnetismAndMatter;
