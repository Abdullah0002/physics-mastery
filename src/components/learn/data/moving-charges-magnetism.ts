import type { ChapterLearnModule } from "../shared/types";

/* ------------------------------------------------------------------ *
 *  SVG diagrams (theme-aware). Field B indigo, current/force red,
 *  velocity blue. "×" = into page, "•" = out of page.
 * ------------------------------------------------------------------ */

const SVG_LORENTZ = `<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Lorentz force on a positive charge moving in a magnetic field into the page'><g fill='#6366f1' font-size='15'><text x='60' y='50'>×</text><text x='110' y='50'>×</text><text x='160' y='50'>×</text><text x='210' y='50'>×</text><text x='60' y='90'>×</text><text x='110' y='90'>×</text><text x='160' y='90'>×</text><text x='210' y='90'>×</text></g><text x='235' y='55' font-size='12' fill='#6366f1'>B (into page)</text><circle cx='120' cy='140' r='9' fill='#dc2626'/><text x='116' y='145' font-size='11' fill='#fff'>+</text><line x1='129' y1='140' x2='210' y2='140' stroke='#2563eb' stroke-width='2.5'/><polygon points='210,140 201,135 201,145' fill='#2563eb'/><text x='180' y='158' font-size='12' fill='#2563eb'>v</text><line x1='120' y1='131' x2='120' y2='75' stroke='#dc2626' stroke-width='2.5'/><polygon points='120,75 115,84 125,84' fill='#dc2626'/><text x='128' y='100' font-size='12' fill='#dc2626'>F = qv×B</text></svg>`;

const SVG_CIRCULAR = `<svg viewBox='0 0 240 220' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Charged particle moving in a circle in a magnetic field out of the page'><g fill='#6366f1' font-size='9'><circle cx='60' cy='50' r='2'/><circle cx='120' cy='50' r='2'/><circle cx='180' cy='50' r='2'/><circle cx='60' cy='110' r='2'/><circle cx='180' cy='110' r='2'/><circle cx='60' cy='170' r='2'/><circle cx='120' cy='170' r='2'/><circle cx='180' cy='170' r='2'/></g><text x='150' y='30' font-size='12' fill='#6366f1'>B (out of page)</text><circle cx='120' cy='110' r='55' fill='none' stroke='currentColor' stroke-width='1.6' stroke-dasharray='5 4'/><circle cx='120' cy='55' r='7' fill='#dc2626'/><line x1='120' y1='55' x2='165' y2='55' stroke='#2563eb' stroke-width='2.5'/><polygon points='165,55 156,50 156,60' fill='#2563eb'/><text x='150' y='48' font-size='11' fill='#2563eb'>v</text><line x1='120' y1='55' x2='120' y2='95' stroke='#dc2626' stroke-width='2'/><polygon points='120,95 115,86 125,86' fill='#dc2626'/><text x='126' y='82' font-size='11' fill='#dc2626'>F</text><text x='124' y='118' font-size='11' fill='currentColor'>r = mv/qB</text></svg>`;

const SVG_WIRE_FORCE = `<svg viewBox='0 0 300 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Force on a current-carrying wire in a magnetic field'><line x1='90' y1='30' x2='90' y2='175' stroke='#dc2626' stroke-width='3'/><polygon points='90,30 85,42 95,42' fill='#dc2626'/><text x='96' y='45' font-size='12' fill='#dc2626'>I</text><g stroke='#6366f1' stroke-width='1.6'><line x1='130' y1='70' x2='200' y2='70'/><line x1='130' y1='110' x2='200' y2='110'/><line x1='130' y1='150' x2='200' y2='150'/></g><polygon points='200,70 191,65 191,75' fill='#6366f1'/><polygon points='200,110 191,105 191,115' fill='#6366f1'/><polygon points='200,150 191,145 191,155' fill='#6366f1'/><text x='205' y='114' font-size='12' fill='#6366f1'>B</text><line x1='90' y1='100' x2='40' y2='100' stroke='#16a34a' stroke-width='2.5'/><polygon points='40,100 49,95 49,105' fill='#16a34a'/><text x='30' y='90' font-size='12' fill='#16a34a'>F = IL×B</text></svg>`;

const SVG_BIOT = `<svg viewBox='0 0 320 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Biot-Savart law geometry: current element, position vector and field contribution'><line x1='30' y1='150' x2='290' y2='150' stroke='currentColor' stroke-width='1.5'/><line x1='120' y1='150' x2='160' y2='150' stroke='#dc2626' stroke-width='4'/><polygon points='160,150 151,145 151,155' fill='#dc2626'/><text x='128' y='168' font-size='12' fill='#dc2626'>I dl</text><line x1='140' y1='150' x2='240' y2='60' stroke='currentColor' stroke-width='1.5' stroke-dasharray='4 3'/><text x='195' y='95' font-size='12' fill='currentColor'>r</text><circle cx='240' cy='60' r='4' fill='currentColor'/><text x='248' y='58' font-size='12' fill='currentColor'>P</text><path d='M175,150 A35,35 0 0 0 167,127' fill='none' stroke='currentColor' stroke-width='1.2'/><text x='178' y='140' font-size='11' fill='currentColor'>θ</text><circle cx='240' cy='60' r='10' fill='none' stroke='#6366f1' stroke-width='1.6'/><text x='235' y='64' font-size='10' fill='#6366f1'>dB</text></svg>`;

const SVG_STRAIGHT = `<svg viewBox='0 0 260 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Magnetic field circles around a long straight current-carrying wire'><line x1='130' y1='15' x2='130' y2='185' stroke='#dc2626' stroke-width='3'/><polygon points='130,15 125,27 135,27' fill='#dc2626'/><text x='138' y='28' font-size='12' fill='#dc2626'>I</text><g fill='none' stroke='#6366f1' stroke-width='1.6'><ellipse cx='130' cy='100' rx='40' ry='14'/><ellipse cx='130' cy='100' rx='70' ry='24'/><ellipse cx='130' cy='100' rx='100' ry='34'/></g><text x='175' y='130' font-size='12' fill='#6366f1'>B = μ₀I/2πr</text></svg>`;

const SVG_LOOP = `<svg viewBox='0 0 300 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Magnetic field on the axis of a circular current loop'><ellipse cx='110' cy='90' rx='26' ry='62' fill='none' stroke='#dc2626' stroke-width='2.5'/><text x='70' y='90' font-size='12' fill='#dc2626'>I</text><line x1='110' y1='90' x2='260' y2='90' stroke='#6366f1' stroke-width='2'/><polygon points='260,90 251,85 251,95' fill='#6366f1'/><text x='200' y='82' font-size='12' fill='#6366f1'>B (axis)</text><line x1='110' y1='90' x2='200' y2='90' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='150' y='108' font-size='11' fill='currentColor'>x</text></svg>`;

const SVG_SOLENOID = `<svg viewBox='0 0 340 170' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Uniform field inside a solenoid'><g fill='none' stroke='#dc2626' stroke-width='2'><ellipse cx='70' cy='85' rx='8' ry='38'/><ellipse cx='110' cy='85' rx='8' ry='38'/><ellipse cx='150' cy='85' rx='8' ry='38'/><ellipse cx='190' cy='85' rx='8' ry='38'/><ellipse cx='230' cy='85' rx='8' ry='38'/><ellipse cx='270' cy='85' rx='8' ry='38'/></g><g stroke='#6366f1' stroke-width='1.6'><line x1='80' y1='70' x2='260' y2='70'/><line x1='80' y1='100' x2='260' y2='100'/></g><polygon points='260,70 251,65 251,75' fill='#6366f1'/><polygon points='260,100 251,95 251,105' fill='#6366f1'/><text x='150' y='150' font-size='12' fill='#6366f1'>B = μ₀ n I (inside, uniform)</text></svg>`;

const SVG_AMPERE = `<svg viewBox='0 0 260 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label="Amperian loop encircling a straight wire"><circle cx='130' cy='100' r='9' fill='#dc2626'/><circle cx='130' cy='100' r='3' fill='#fff'/><text x='142' y='96' font-size='11' fill='#dc2626'>I (out)</text><circle cx='130' cy='100' r='70' fill='none' stroke='#6366f1' stroke-width='1.8' stroke-dasharray='6 4'/><polygon points='200,100 190,94 190,106' fill='#6366f1'/><text x='150' y='185' font-size='12' fill='#6366f1'>∮B·dl = μ₀ I_enc</text></svg>`;

const SVG_PARALLEL_WIRES = `<svg viewBox='0 0 280 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Two parallel wires carrying currents in the same direction attract'><line x1='90' y1='20' x2='90' y2='180' stroke='#dc2626' stroke-width='3'/><polygon points='90,20 85,32 95,32' fill='#dc2626'/><text x='66' y='30' font-size='12' fill='#dc2626'>I₁</text><line x1='190' y1='20' x2='190' y2='180' stroke='#dc2626' stroke-width='3'/><polygon points='190,20 185,32 195,32' fill='#dc2626'/><text x='196' y='30' font-size='12' fill='#dc2626'>I₂</text><line x1='98' y1='110' x2='150' y2='110' stroke='#16a34a' stroke-width='2.5'/><polygon points='150,110 141,105 141,115' fill='#16a34a'/><line x1='182' y1='110' x2='130' y2='110' stroke='#16a34a' stroke-width='2.5'/><polygon points='130,110 139,105 139,115' fill='#16a34a'/><text x='110' y='100' font-size='11' fill='#16a34a'>F</text><text x='95' y='160' font-size='11' fill='currentColor'>d</text><line x1='90' y1='150' x2='190' y2='150' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='40' y='195' font-size='10' fill='currentColor'>same direction ⇒ attract</text></svg>`;

const SVG_TORQUE_LOOP = `<svg viewBox='0 0 300 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Torque on a rectangular current loop in a magnetic field'><rect x='100' y='50' width='100' height='90' fill='none' stroke='#dc2626' stroke-width='2.5'/><g stroke='#6366f1' stroke-width='1.4'><line x1='30' y1='60' x2='270' y2='60'/><line x1='30' y1='130' x2='270' y2='130'/></g><polygon points='270,60 261,55 261,65' fill='#6366f1'/><text x='35' y='52' font-size='12' fill='#6366f1'>B</text><line x1='100' y1='50' x2='100' y2='30' stroke='#16a34a' stroke-width='2.5'/><polygon points='100,30 95,39 105,39' fill='#16a34a'/><line x1='200' y1='140' x2='200' y2='160' stroke='#16a34a' stroke-width='2.5'/><polygon points='200,160 195,151 205,151' fill='#16a34a'/><text x='150' y='100' font-size='12' fill='#dc2626'>I</text><text x='150' y='182' font-size='11' fill='currentColor'>τ = NIAB sinθ = m × B</text></svg>`;

const SVG_GALVO = `<svg viewBox='0 0 240 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Moving-coil galvanometer: coil in a radial magnetic field'><path d='M60,40 A60,60 0 0 0 60,160' fill='none' stroke='#2563eb' stroke-width='3'/><text x='30' y='105' font-size='14' fill='#2563eb'>N</text><path d='M180,40 A60,60 0 0 1 180,160' fill='none' stroke='#dc2626' stroke-width='3'/><text x='200' y='105' font-size='14' fill='#dc2626'>S</text><rect x='100' y='70' width='40' height='60' fill='none' stroke='currentColor' stroke-width='2'/><text x='108' y='105' font-size='11' fill='currentColor'>coil</text><line x1='120' y1='70' x2='120' y2='25' stroke='currentColor' stroke-width='2'/><polygon points='120,25 115,36 125,36' fill='currentColor'/><text x='128' y='30' font-size='11' fill='currentColor'>pointer</text><text x='70' y='185' font-size='11' fill='currentColor'>I ∝ deflection φ</text></svg>`;

export const movingChargesMagnetism: ChapterLearnModule = {
  slug: "moving-charges-magnetism",
  chapter: "Moving Charges & Magnetism",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "Currents and moving charges create — and feel — magnetic fields: the Lorentz force, Biot–Savart and Ampère's laws, fields of wires/loops/solenoids, forces between currents, current loops as dipoles and the galvanometer.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "In 1820 Oersted saw a compass needle twitch beside a current-carrying wire — proof that **electricity and magnetism are one phenomenon**. Moving charge is both the **source** of magnetic fields and the thing that **feels** a magnetic force.",
      topics: [
        {
          id: "why-magnetism",
          title: "Electricity in motion is magnetism",
          theory:
            "A charge at rest makes only an electric field; a charge in **motion** also makes a **magnetic** field, and a moving charge in an external magnetic field feels a sideways force. This two-way relationship powers motors, generators, loudspeakers, MRI machines, mass spectrometers and particle accelerators.",
          callouts: [
            {
              kind: "history",
              body:
                "- **Oersted (1820):** current deflects a compass — magnetism from electricity.\n- **Biot–Savart, Ampère (1820s):** quantify the field of a current.\n- **Lorentz:** the force law F = q(E + v×B) unifies how charges feel both fields.",
            },
            {
              kind: "tip",
              title: "Where it shows up",
              body:
                "- **Electric motors & loudspeakers** — force on current in a field.\n- **Generators & transformers** — (next chapter) changing fields.\n- **Mass spectrometer & cyclotron** — circular motion in B.\n- **MRI, maglev trains, galvanometers.**",
            },
          ],
        },
      ],
    },
    {
      id: "lorentz",
      title: "2 · Magnetic Force on a Moving Charge",
      topics: [
        {
          id: "lorentz-theory",
          title: "The Lorentz force",
          theory:
            "A charge q moving with velocity v in a magnetic field B feels\n  F = q(v × B),  magnitude F = qvB sinθ.\nThe force is **perpendicular** to both v and B (right-hand rule). Combined with the electric force, the full **Lorentz force** is F = q(E + v × B).",
          figures: [{ svg: SVG_LORENTZ, caption: "F = qv×B is perpendicular to both v and B (shown for B into the page)." }],
          formulas: [
            { label: "Magnetic force", expr: "F = q(v × B),  |F| = qvB sinθ" },
            { label: "Full Lorentz force", expr: "F = q(E + v × B)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Magnetic force does no work",
              body:
                "Because F ⟂ v always, the magnetic force does **zero work** and cannot change a particle's **speed** (or kinetic energy) — it only bends the path. This single fact answers a huge fraction of conceptual questions.",
            },
            {
              kind: "note",
              title: "Velocity selector",
              body:
                "Cross E and B so the electric and magnetic forces cancel: qE = qvB ⇒ only particles with v = E/B pass straight through. Used in mass spectrometers.",
            },
          ],
          mistakes: [
            "Forgetting the sinθ — force is zero when v ∥ B and maximum when v ⟂ B.",
            "Thinking a magnetic field can speed a charge up — it never does work.",
            "Sign errors with the right-hand rule for a **negative** charge (reverse the force).",
          ],
        },
      ],
    },
    {
      id: "circular-motion",
      title: "3 · Motion of a Charge in a Magnetic Field",
      topics: [
        {
          id: "circular-theory",
          title: "Circular and helical paths",
          theory:
            "When v ⟂ B, the magnetic force is centripetal and the charge moves in a **circle**. When v has a component along B, that component is unaffected, giving a **helix**.",
          derivation:
            "Centripetal: qvB = mv²/r ⇒\n  r = mv/(qB) = p/(qB).\nTime period (independent of speed and radius!):\n  T = 2πm/(qB),  f = qB/(2πm),  ω = qB/m.\nHelix: pitch = v∥·T = (v cosθ)·2πm/(qB).",
          figures: [{ svg: SVG_CIRCULAR, caption: "v ⟂ B gives a circle of radius r = mv/qB; the period is independent of speed." }],
          formulas: [
            { label: "Radius", expr: "r = mv/(qB)" },
            { label: "Period / frequency", expr: "T = 2πm/(qB),  f = qB/(2πm)" },
            { label: "Helix pitch", expr: "p = (v cosθ)·2πm/(qB)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Cyclotron",
              body:
                "The speed-independent period is the secret of the **cyclotron**: an oscillator at f = qB/2πm keeps kicking the ion every half-turn. Max energy: E = q²B²R²/2m. (Relativity eventually breaks the constant-T assumption.)",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A proton and an alpha particle enter the same field B with the same kinetic energy, perpendicular to B. Find the ratio of their radii. (m_α = 4m_p, q_α = 2q_p)",
              solution:
                "r = mv/qB and KE = ½mv² ⇒ v = √(2KE/m) ⇒ r = √(2mKE)/(qB).\nSame KE, B: r ∝ √m / q.\nr_p/r_α = (√m_p/q_p) / (√(4m_p)/2q_p) = (√m_p/q_p)·(2q_p/2√m_p) = 1.\nSo r_p : r_α = 1 : 1.",
              answer: "r_p : r_α = 1 : 1",
            },
          ],
        },
      ],
    },
    {
      id: "force-wire",
      title: "4 · Force on a Current-Carrying Conductor",
      topics: [
        {
          id: "force-wire-theory",
          title: "F = I L × B",
          theory:
            "A wire is just moving charges, so it feels a force in a field. For a straight segment of length L carrying current I:\n  F = I (L × B),  |F| = BIL sinθ,\nwhere L points along the current. Direction by the right-hand (or Fleming's left-hand) rule.",
          derivation:
            "Each carrier feels qv_d×B; with n carriers per volume in volume AL the total is\n  F = (nAL)·q v_d × B = I L × B   (since I = nAqv_d).",
          figures: [{ svg: SVG_WIRE_FORCE, caption: "F = I L × B: current up, field right ⇒ force out of the configuration." }],
          formulas: [{ label: "Force on a wire", expr: "F = I(L × B),  |F| = BIL sinθ" }],
          jeeNotes: [
            "A closed current loop in a **uniform** field feels **zero net force** (but a torque).",
            "Force per unit length on a wire: f = BI sinθ.",
          ],
        },
      ],
    },
    {
      id: "biot-savart",
      title: "5 · Biot–Savart Law & Fields of Currents",
      intro:
        "The Biot–Savart law is the magnetic analogue of Coulomb's law: it gives the field of a tiny current element, and you integrate for real geometries.",
      topics: [
        {
          id: "biot-theory",
          title: "The law and the straight wire",
          theory:
            "A current element I dl produces, at displacement r, a field\n  dB = (μ₀/4π)·(I dl × r̂)/r².\nThe field circles the current (right-hand grip rule); μ₀ = 4π × 10⁻⁷ T·m/A.",
          derivation:
            "**Straight wire** (perpendicular distance a, ends subtending θ₁, θ₂ at the foot):\n  B = (μ₀ I)/(4π a)·(sinθ₁ + sinθ₂).\nInfinite wire (θ₁ = θ₂ = 90°):\n  B = μ₀ I/(2π a).\nField lines are concentric circles around the wire.",
          figures: [
            { svg: SVG_BIOT, caption: "dB = (μ₀/4π)(I dl × r̂)/r² — perpendicular to both dl and r." },
            { svg: SVG_STRAIGHT, caption: "Long straight wire: circular field lines, B = μ₀I/2πr." },
          ],
          formulas: [
            { label: "Biot–Savart", expr: "dB = (μ₀/4π)(I dl × r̂)/r²" },
            { label: "Finite wire", expr: "B = (μ₀I/4πa)(sinθ₁ + sinθ₂)" },
            { label: "Infinite wire", expr: "B = μ₀I/(2πa)" },
          ],
        },
        {
          id: "loop-solenoid",
          title: "Circular loop, solenoid and toroid",
          theory: "Standard results worth memorising.",
          derivation:
            "**Circular loop** (radius R, N turns):\n  Centre: B = μ₀NI/(2R).\n  On axis at distance x: B = μ₀NIR²/[2(R²+x²)^{3/2}].\n**Solenoid** (n turns per metre): inside B = μ₀ n I (uniform); at an end B = μ₀ n I /2; outside ≈ 0.\n**Toroid** (N total turns, mean radius r): B = μ₀NI/(2πr) inside; zero outside.",
          figures: [
            { svg: SVG_LOOP, caption: "Circular loop: axial field B = μ₀NIR²/2(R²+x²)^{3/2}; at the centre μ₀NI/2R." },
            { svg: SVG_SOLENOID, caption: "Solenoid: uniform field μ₀nI inside, ~0 outside." },
          ],
          formulas: [
            { label: "Loop centre", expr: "B = μ₀NI/(2R)" },
            { label: "Loop axis", expr: "B = μ₀NIR²/2(R²+x²)^{3/2}" },
            { label: "Solenoid (inside)", expr: "B = μ₀ n I" },
            { label: "Toroid", expr: "B = μ₀NI/(2πr)" },
          ],
          mistakes: [
            "Confusing N (total turns) with n (turns per unit length) in solenoid/loop formulas.",
            "Using the centre formula μ₀NI/2R when the point is on the axis (use the axial form).",
          ],
        },
      ],
    },
    {
      id: "ampere",
      title: "6 · Ampère's Circuital Law",
      topics: [
        {
          id: "ampere-theory",
          title: "Statement and applications",
          theory:
            "Ampère's law is the magnetic analogue of Gauss's law — a shortcut for **symmetric** current distributions:\n  ∮ B·dl = μ₀ I_enc,\nthe line integral of B around any closed loop equals μ₀ times the current threading it.",
          derivation:
            "Choose an **Amperian loop** matching the symmetry so B is constant and parallel to dl:\n  • Straight wire (circle radius r): B·2πr = μ₀I ⇒ B = μ₀I/2πr.\n  • Solenoid (rectangular loop): B·L = μ₀(nL)I ⇒ B = μ₀nI.\n  • Toroid (circle radius r): B·2πr = μ₀NI ⇒ B = μ₀NI/2πr.",
          figures: [{ svg: SVG_AMPERE, caption: "Amperian loop around a wire: ∮B·dl = μ₀ I_enc." }],
          formulas: [{ label: "Ampère's law", expr: "∮ B·dl = μ₀ I_enc" }],
          callouts: [
            {
              kind: "jee",
              title: "Like Gauss's law",
              body:
                "Always true, but only **useful for finding B** when symmetry (long wire, solenoid, toroid, sheet of current) lets you pull B out of the integral. Only the **enclosed** current contributes to ∮B·dl; outside currents still affect B itself.",
            },
          ],
        },
      ],
    },
    {
      id: "parallel-currents",
      title: "7 · Force Between Parallel Currents",
      topics: [
        {
          id: "parallel-theory",
          title: "Attraction, repulsion and the ampere",
          theory:
            "Each wire sits in the other's field, so parallel currents exert forces on each other: **same direction ⇒ attract**, opposite ⇒ repel (the opposite of charges!).",
          derivation:
            "Wire 2 (current I₂) in the field of wire 1 (B₁ = μ₀I₁/2πd):\n  Force per length:  f = F/L = μ₀ I₁ I₂ / (2π d).\n**Definition of the ampere:** 1 A is the current that, in two infinite parallel wires 1 m apart, gives a force of 2 × 10⁻⁷ N/m.",
          figures: [{ svg: SVG_PARALLEL_WIRES, caption: "Currents in the same direction attract; force per length = μ₀I₁I₂/2πd." }],
          formulas: [{ label: "Force per length", expr: "f = μ₀ I₁ I₂ / (2π d)" }],
          mistakes: [
            "Reversing the rule — like **currents attract** (unlike charges, where likes repel).",
          ],
        },
      ],
    },
    {
      id: "torque-dipole",
      title: "8 · Current Loop as a Magnetic Dipole",
      topics: [
        {
          id: "torque-theory",
          title: "Magnetic moment, torque and energy",
          theory:
            "A current loop behaves like a **magnetic dipole** with moment m = NIA (direction by the right-hand rule, ⟂ to the loop). In a field it feels a torque that aligns m with B.",
          derivation:
            "Torque: τ = m × B,  |τ| = NIAB sinθ.\nPotential energy: U = −m·B = −mB cosθ.\n  • θ = 0 (m ∥ B): minimum energy ⇒ stable.\n  • θ = 180°: maximum ⇒ unstable.\nThis is exactly the electric-dipole story with m ↔ p, B ↔ E.",
          figures: [{ svg: SVG_TORQUE_LOOP, caption: "Forces on opposite sides form a couple: τ = NIAB sinθ = m × B." }],
          formulas: [
            { label: "Magnetic moment", expr: "m = NIA" },
            { label: "Torque", expr: "τ = m × B,  |τ| = NIAB sinθ" },
            { label: "Energy", expr: "U = −m·B" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Net force vs torque",
              body:
                "In a **uniform** field a current loop has zero net force but a torque (just like an electric dipole). The orbiting electron's magnetic moment links to angular momentum: m = (q/2m_e)L (gyromagnetic ratio).",
            },
          ],
        },
      ],
    },
    {
      id: "galvanometer",
      title: "9 · Moving-Coil Galvanometer",
      topics: [
        {
          id: "galvo-theory",
          title: "Measuring current — and converting the meter",
          theory:
            "A coil pivoted in a **radial** magnetic field turns by an angle proportional to the current; a spring provides the restoring torque. Radial poles keep the field always parallel to the coil plane, so deflection ∝ I (a linear scale).",
          derivation:
            "Balance magnetic and spring torques: NIAB = kφ ⇒ φ = (NAB/k)·I, so φ ∝ I.\n**Ammeter** (measure large I): add a small **shunt** S in parallel —\n  S = G·I_g/(I − I_g).\n**Voltmeter** (measure V): add a large series resistance R —\n  R = V/I_g − G.",
          figures: [{ svg: SVG_GALVO, caption: "Coil in a radial field: deflection φ ∝ current I." }],
          formulas: [
            { label: "Deflection", expr: "φ = (NAB/k)·I" },
            { label: "Ammeter shunt", expr: "S = G·I_g/(I − I_g)" },
            { label: "Voltmeter series R", expr: "R = V/I_g − G" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Ideal meters",
              body:
                "An **ideal ammeter** has zero resistance (connected in **series**); an **ideal voltmeter** has infinite resistance (connected in **parallel**). A shunt lowers an ammeter's resistance; a series resistor raises a voltmeter's.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A galvanometer (G = 100 Ω, full-scale I_g = 1 mA) is to read up to 1 A. Find the shunt resistance.",
              solution:
                "S = G·I_g/(I − I_g) = 100 × 0.001 / (1 − 0.001) = 0.1/0.999 ≈ 0.1 Ω.",
              answer: "≈ 0.1 Ω",
            },
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "10 · Advanced JEE Insights",
      topics: [
        {
          id: "insights",
          title: "Tricks, traps and limiting cases",
          theory: "Most magnetism problems hinge on right-hand-rule geometry and the 'no work' property.",
          callouts: [
            {
              kind: "jee",
              body:
                "- Magnetic force does **no work** ⇒ speed and |v| are constant; only direction changes.\n- Circular-motion period T = 2πm/qB is **independent of speed** (cyclotron principle).\n- A current loop = magnetic dipole (m = NIA); reuse all electric-dipole results with p→m, E→B.\n- Closed loop in a **uniform** field: zero net force, possible torque.\n- Symmetry: superpose fields of straight segments + arcs for composite wires (arc at centre: B = μ₀Iθ/4πR).\n- Ampère's law needs symmetry to extract B, just like Gauss's law.",
            },
            {
              kind: "warning",
              body:
                "- Like **currents attract** (opposite to like charges).\n- Don't confuse n (turns/length) with N (total turns).\n- For a negative charge, flip the v×B force direction.\n- Use the axial loop formula off-centre, not μ₀NI/2R.",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Thinking a magnetic field can change a charge's speed — it does no work.",
    "Dropping sinθ in F = qvB sinθ or BIL sinθ.",
    "Right-hand-rule sign errors, especially for negative charges.",
    "Believing the circular-motion period depends on speed (it doesn't).",
    "Saying like currents repel — parallel same-direction currents ATTRACT.",
    "Confusing n (turns per metre) with N (total turns) in solenoid/loop formulas.",
    "Using the loop-centre field μ₀NI/2R for an axial (off-centre) point.",
    "Forgetting a closed loop in a uniform field has zero net force (only torque).",
    "Using Ampère's law without sufficient symmetry to pull B out.",
    "Thinking outside currents don't affect B (they affect B, not ∮B·dl).",
    "Mixing the arc-field factor: B = μ₀Iθ/4πR for an arc subtending θ.",
    "Putting an ammeter in parallel or a voltmeter in series.",
    "Forgetting the shunt/series-resistor formulas for meter conversion.",
    "Treating m's direction casually — it is ⟂ to the loop by the right-hand rule.",
    "Ignoring the velocity-selector condition v = E/B in crossed fields.",
  ],
  revision: {
    formulaSheet: [
      { label: "Lorentz force", expr: "F = q(E + v×B)" },
      { label: "Circular motion", expr: "r = mv/qB,  T = 2πm/qB" },
      { label: "Force on wire", expr: "F = I L × B" },
      { label: "Biot–Savart", expr: "dB = (μ₀/4π)(I dl × r̂)/r²" },
      { label: "Straight wire", expr: "B = μ₀I/2πr" },
      { label: "Loop centre / axis", expr: "μ₀NI/2R ;  μ₀NIR²/2(R²+x²)^{3/2}" },
      { label: "Solenoid / Toroid", expr: "μ₀nI ;  μ₀NI/2πr" },
      { label: "Ampère", expr: "∮B·dl = μ₀ I_enc" },
      { label: "Parallel wires", expr: "f = μ₀I₁I₂/2πd" },
      { label: "Loop dipole", expr: "m = NIA,  τ = m×B,  U = −m·B" },
      { label: "Meter conversion", expr: "S = GI_g/(I−I_g),  R = V/I_g − G" },
    ],
    conceptMap:
      "Moving charge ─▶ feels F = qv×B (no work, circular motion) ; ─▶ creates B (Biot–Savart)\nBiot–Savart ─▶ fields of {wire, loop, solenoid, toroid} ; Ampère's law (symmetry shortcut)\nCurrent in B ─▶ force on wire (IL×B) ─▶ parallel wires (attract) & loop torque (m×B)\nGalvanometer (φ∝I) ─▶ ammeter (shunt) / voltmeter (series R)",
    pyqInsights: [
      "JEE Main: 2–3 questions/shift — Lorentz/circular motion, field of wire/loop/solenoid, force on wires and magnetic moment/torque, and meter conversion.",
      "JEE Advanced: composite-wire fields (segments + arcs), helical motion & cyclotron, crossed-field selectors, and loop dynamics/torque with energy.",
      "Numerical answers cluster on B at a point, radius/period of circular motion, force per length, and shunt/series resistances.",
    ],
    lastMinuteTips: [
      "Magnetic force ⟂ v ⇒ no work; speed constant, path bends.",
      "Period T = 2πm/qB is speed-independent (cyclotron).",
      "Like currents attract; opposite repel (mirror of charges).",
      "Loop = dipole: m = NIA, τ = m×B, U = −m·B (reuse electric-dipole results).",
      "Arc at centre: B = μ₀Iθ/4πR; full loop θ = 2π recovers μ₀I/2R.",
      "Ammeter: tiny shunt in series with the line; Voltmeter: big series R in parallel with the element.",
      "Use Ampère only with strong symmetry — otherwise Biot–Savart + integrate.",
    ],
  },
};

export default movingChargesMagnetism;
