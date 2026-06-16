import type { ChapterLearnModule } from "../shared/types";

/* ------------------------------------------------------------------ *
 *  SVG diagrams (theme-aware). Electrons blue, field/current indigo,
 *  + terminal red.
 * ------------------------------------------------------------------ */

const SVG_DRIFT = `<svg viewBox='0 0 360 160' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Electron drift in a conductor under an applied field'><rect x='40' y='60' width='280' height='42' fill='none' stroke='currentColor' stroke-width='2'/><g fill='#2563eb'><circle cx='80' cy='81' r='6'/><circle cx='130' cy='81' r='6'/><circle cx='180' cy='81' r='6'/><circle cx='230' cy='81' r='6'/><circle cx='280' cy='81' r='6'/></g><g stroke='#2563eb' stroke-width='1.4'><line x1='80' y1='95' x2='66' y2='95'/><line x1='130' y1='95' x2='116' y2='95'/><line x1='180' y1='95' x2='166' y2='95'/><line x1='230' y1='95' x2='216' y2='95'/></g><text x='150' y='135' font-size='12' fill='#2563eb'>v_d (electrons drift ◀)</text><line x1='150' y1='35' x2='250' y2='35' stroke='#6366f1' stroke-width='2'/><polygon points='250,35 241,30 241,40' fill='#6366f1'/><text x='255' y='39' font-size='12' fill='#6366f1'>I, E ▶</text><line x1='40' y1='81' x2='18' y2='81' stroke='currentColor' stroke-width='2'/><line x1='320' y1='81' x2='342' y2='81' stroke='currentColor' stroke-width='2'/><text x='8' y='75' font-size='13' fill='#2563eb'>−</text><text x='336' y='75' font-size='13' fill='#dc2626'>+</text></svg>`;

const SVG_VI = `<svg viewBox='0 0 240 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Voltage versus current graphs: ohmic straight line and non-ohmic curve'><line x1='40' y1='170' x2='220' y2='170' stroke='currentColor' stroke-width='1.5'/><line x1='40' y1='170' x2='40' y2='25' stroke='currentColor' stroke-width='1.5'/><text x='22' y='35' font-size='12' fill='currentColor'>V</text><text x='210' y='188' font-size='12' fill='currentColor'>I</text><line x1='40' y1='170' x2='195' y2='45' stroke='#2563eb' stroke-width='2.5'/><text x='150' y='70' font-size='11' fill='#2563eb'>ohmic (slope = R)</text><path d='M40,170 C90,150 150,120 200,60' fill='none' stroke='#dc2626' stroke-width='2.5'/><text x='95' y='160' font-size='11' fill='#dc2626'>non-ohmic</text></svg>`;

const SVG_SERIES_R = `<svg viewBox='0 0 360 130' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Three resistors in series with a battery'><line x1='30' y1='40' x2='70' y2='40' stroke='currentColor' stroke-width='2'/><path d='M70,40 l6,-9 l10,18 l10,-18 l10,18 l6,-9' fill='none' stroke='#2563eb' stroke-width='2'/><text x='78' y='25' font-size='11' fill='currentColor'>R₁</text><line x1='112' y1='40' x2='150' y2='40' stroke='currentColor' stroke-width='2'/><path d='M150,40 l6,-9 l10,18 l10,-18 l10,18 l6,-9' fill='none' stroke='#2563eb' stroke-width='2'/><text x='158' y='25' font-size='11' fill='currentColor'>R₂</text><line x1='192' y1='40' x2='230' y2='40' stroke='currentColor' stroke-width='2'/><path d='M230,40 l6,-9 l10,18 l10,-18 l10,18 l6,-9' fill='none' stroke='#2563eb' stroke-width='2'/><text x='238' y='25' font-size='11' fill='currentColor'>R₃</text><line x1='272' y1='40' x2='320' y2='40' stroke='currentColor' stroke-width='2'/><line x1='320' y1='40' x2='320' y2='100' stroke='currentColor' stroke-width='2'/><line x1='30' y1='40' x2='30' y2='100' stroke='currentColor' stroke-width='2'/><line x1='30' y1='100' x2='160' y2='100' stroke='currentColor' stroke-width='2'/><line x1='190' y1='100' x2='320' y2='100' stroke='currentColor' stroke-width='2'/><line x1='160' y1='88' x2='160' y2='112' stroke='currentColor' stroke-width='2'/><line x1='190' y1='94' x2='190' y2='106' stroke='currentColor' stroke-width='4'/><text x='150' y='126' font-size='11' fill='currentColor'>same current I</text></svg>`;

const SVG_PARALLEL_R = `<svg viewBox='0 0 300 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Three resistors in parallel'><line x1='40' y1='30' x2='260' y2='30' stroke='currentColor' stroke-width='2'/><line x1='40' y1='170' x2='260' y2='170' stroke='currentColor' stroke-width='2'/><g stroke='#2563eb' stroke-width='2' fill='none'><path d='M75,30 l0,20 l-9,6 l18,10 l-18,10 l18,10 l-9,6 l0,18'/><path d='M150,30 l0,20 l-9,6 l18,10 l-18,10 l18,10 l-9,6 l0,18'/><path d='M225,30 l0,20 l-9,6 l18,10 l-18,10 l18,10 l-9,6 l0,18'/></g><text x='84' y='105' font-size='11' fill='currentColor'>R₁</text><text x='159' y='105' font-size='11' fill='currentColor'>R₂</text><text x='234' y='105' font-size='11' fill='currentColor'>R₃</text><text x='100' y='192' font-size='11' fill='currentColor'>same voltage V across each</text></svg>`;

const SVG_EMF = `<svg viewBox='0 0 320 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Cell with emf and internal resistance driving an external resistor'><line x1='40' y1='50' x2='110' y2='50' stroke='currentColor' stroke-width='2'/><line x1='110' y1='38' x2='110' y2='62' stroke='currentColor' stroke-width='2'/><line x1='122' y1='44' x2='122' y2='56' stroke='currentColor' stroke-width='4'/><text x='95' y='30' font-size='12' fill='currentColor'>ε</text><path d='M122,50 l8,0' stroke='currentColor' stroke-width='2'/><path d='M130,50 l6,-8 l9,16 l9,-16 l9,16 l6,-8' fill='none' stroke='#6366f1' stroke-width='2'/><text x='150' y='34' font-size='11' fill='#6366f1'>r</text><line x1='179' y1='50' x2='250' y2='50' stroke='currentColor' stroke-width='2'/><line x1='250' y1='50' x2='250' y2='130' stroke='currentColor' stroke-width='2'/><path d='M250,70 l-9,6 l18,10 l-18,10 l18,10 l-9,6' fill='none' stroke='#2563eb' stroke-width='2'/><text x='262' y='100' font-size='12' fill='currentColor'>R</text><line x1='40' y1='50' x2='40' y2='130' stroke='currentColor' stroke-width='2'/><line x1='40' y1='130' x2='250' y2='130' stroke='currentColor' stroke-width='2'/><text x='95' y='158' font-size='11' fill='currentColor'>V = ε − Ir</text></svg>`;

const SVG_KCL = `<svg viewBox='0 0 260 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Kirchhoff junction: currents in equal currents out'><circle cx='130' cy='90' r='4' fill='currentColor'/><line x1='40' y1='90' x2='126' y2='90' stroke='#6366f1' stroke-width='2'/><polygon points='126,90 116,85 116,95' fill='#6366f1'/><text x='60' y='82' font-size='12' fill='#6366f1'>I₁</text><line x1='40' y1='40' x2='127' y2='87' stroke='#6366f1' stroke-width='2'/><polygon points='127,87 116,84 120,94' fill='#6366f1'/><text x='60' y='45' font-size='12' fill='#6366f1'>I₂</text><line x1='134' y1='90' x2='220' y2='50' stroke='#6366f1' stroke-width='2'/><polygon points='220,50 209,52 214,61' fill='#6366f1'/><text x='190' y='45' font-size='12' fill='#6366f1'>I₃</text><line x1='134' y1='92' x2='220' y2='140' stroke='#6366f1' stroke-width='2'/><polygon points='220,140 209,137 213,147' fill='#6366f1'/><text x='190' y='150' font-size='12' fill='#6366f1'>I₄</text><text x='70' y='170' font-size='12' fill='currentColor'>I₁ + I₂ = I₃ + I₄</text></svg>`;

const SVG_WHEATSTONE = `<svg viewBox='0 0 280 240' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Wheatstone bridge with four resistors and a galvanometer'><line x1='140' y1='30' x2='60' y2='100' stroke='#2563eb' stroke-width='2'/><line x1='140' y1='30' x2='220' y2='100' stroke='#2563eb' stroke-width='2'/><line x1='60' y1='100' x2='140' y2='170' stroke='#2563eb' stroke-width='2'/><line x1='220' y1='100' x2='140' y2='170' stroke='#2563eb' stroke-width='2'/><text x='86' y='55' font-size='12' fill='currentColor'>P</text><text x='184' y='55' font-size='12' fill='currentColor'>Q</text><text x='86' y='150' font-size='12' fill='currentColor'>R</text><text x='184' y='150' font-size='12' fill='currentColor'>S</text><circle cx='140' cy='100' r='13' fill='none' stroke='#dc2626' stroke-width='2'/><text x='135' y='105' font-size='12' fill='#dc2626'>G</text><line x1='60' y1='100' x2='127' y2='100' stroke='currentColor' stroke-width='1.5'/><line x1='153' y1='100' x2='220' y2='100' stroke='currentColor' stroke-width='1.5'/><line x1='140' y1='30' x2='140' y2='12' stroke='currentColor' stroke-width='1.5'/><line x1='140' y1='170' x2='140' y2='200' stroke='currentColor' stroke-width='1.5'/><line x1='128' y1='200' x2='152' y2='200' stroke='currentColor' stroke-width='2'/><line x1='134' y1='206' x2='146' y2='206' stroke='currentColor' stroke-width='4'/><text x='150' y='225' font-size='11' fill='currentColor'>Balance: P/Q = R/S</text></svg>`;

const SVG_POTENTIOMETER = `<svg viewBox='0 0 360 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Potentiometer: uniform wire with a sliding jockey and galvanometer'><line x1='40' y1='70' x2='320' y2='70' stroke='#2563eb' stroke-width='4'/><text x='30' y='66' font-size='13' fill='currentColor'>A</text><text x='324' y='66' font-size='13' fill='currentColor'>B</text><line x1='40' y1='40' x2='40' y2='70' stroke='currentColor' stroke-width='2'/><line x1='320' y1='40' x2='320' y2='70' stroke='currentColor' stroke-width='2'/><line x1='40' y1='40' x2='150' y2='40' stroke='currentColor' stroke-width='2'/><line x1='210' y1='40' x2='320' y2='40' stroke='currentColor' stroke-width='2'/><line x1='170' y1='34' x2='170' y2='46' stroke='currentColor' stroke-width='2'/><line x1='190' y1='28' x2='190' y2='52' stroke='currentColor' stroke-width='4'/><text x='160' y='22' font-size='11' fill='currentColor'>driver cell</text><line x1='200' y1='70' x2='200' y2='110' stroke='currentColor' stroke-width='1.5'/><polygon points='200,70 194,82 206,82' fill='currentColor'/><text x='208' y='92' font-size='11' fill='currentColor'>jockey (l)</text><circle cx='200' cy='125' r='13' fill='none' stroke='#dc2626' stroke-width='2'/><text x='195' y='130' font-size='12' fill='#dc2626'>G</text><line x1='200' y1='138' x2='200' y2='160' stroke='currentColor' stroke-width='1.5'/><line x1='180' y1='160' x2='220' y2='160' stroke='currentColor' stroke-width='2'/><text x='230' y='130' font-size='11' fill='currentColor'>ε (test)</text></svg>`;

const SVG_RHO_T = `<svg viewBox='0 0 260 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Resistivity versus temperature for a metal and a semiconductor'><line x1='40' y1='160' x2='230' y2='160' stroke='currentColor' stroke-width='1.5'/><line x1='40' y1='160' x2='40' y2='25' stroke='currentColor' stroke-width='1.5'/><text x='18' y='35' font-size='12' fill='currentColor'>ρ</text><text x='220' y='178' font-size='12' fill='currentColor'>T</text><line x1='40' y1='130' x2='220' y2='55' stroke='#dc2626' stroke-width='2.5'/><text x='150' y='80' font-size='11' fill='#dc2626'>metal (α &gt; 0)</text><path d='M50,45 C90,120 150,150 220,150' fill='none' stroke='#2563eb' stroke-width='2.5'/><text x='120' y='145' font-size='11' fill='#2563eb'>semiconductor (α &lt; 0)</text></svg>`;

const SVG_CELLS = `<svg viewBox='0 0 360 170' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Cells in series and in parallel'><text x='40' y='25' font-size='12' fill='currentColor'>Series</text><g stroke='currentColor' stroke-width='2'><line x1='40' y1='60' x2='52' y2='60'/><line x1='52' y1='50' x2='52' y2='70'/><line x1='62' y1='54' x2='62' y2='66'/><line x1='62' y1='60' x2='90' y2='60'/><line x1='90' y1='50' x2='90' y2='70'/><line x1='100' y1='54' x2='100' y2='66'/><line x1='100' y1='60' x2='128' y2='60'/><line x1='128' y1='50' x2='128' y2='70'/><line x1='138' y1='54' x2='138' y2='66'/></g><text x='40' y='92' font-size='10' fill='currentColor'>ε_eq = nε, r_eq = nr</text><text x='240' y='25' font-size='12' fill='currentColor'>Parallel</text><g stroke='currentColor' stroke-width='2'><line x1='240' y1='45' x2='320' y2='45'/><line x1='240' y1='95' x2='320' y2='95'/><line x1='270' y1='45' x2='270' y2='60'/><line x1='262' y1='60' x2='278' y2='60'/><line x1='267' y1='66' x2='273' y2='66'/><line x1='270' y1='66' x2='270' y2='95'/><line x1='300' y1='45' x2='300' y2='60'/><line x1='292' y1='60' x2='308' y2='60'/><line x1='297' y1='66' x2='303' y2='66'/><line x1='300' y1='66' x2='300' y2='95'/></g><text x='235' y='118' font-size='10' fill='currentColor'>ε_eq = ε, r_eq = r/n</text></svg>`;

export const currentElectricity: ChapterLearnModule = {
  slug: "current-electricity",
  chapter: "Current Electricity",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "Charge in motion: current and drift, Ohm's law and resistivity, EMF and internal resistance, Kirchhoff's laws, Wheatstone bridge, potentiometer, power and grouping of cells — first principles to JEE Advanced.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "Electrostatics dealt with charges **at rest**. Now we let them **flow**. A steady stream of charge — electric **current** — powers every device you own, and the rules governing it (Ohm, Kirchhoff) are the grammar of all circuit analysis.",
      topics: [
        {
          id: "why-current",
          title: "From static charge to flowing charge",
          theory:
            "Connect a conductor across a battery and the small field inside drives its free electrons into a slow, organised drift — a current. The battery's chemical energy is converted to electrical energy and then to heat, light or motion. This chapter builds the toolkit to predict current, voltage and power anywhere in a circuit.",
          callouts: [
            {
              kind: "tip",
              title: "Where it shows up",
              body:
                "- **Every circuit** — phones, computers, appliances.\n- **Power transmission** — why we use high voltage (lower I²R loss).\n- **Heating** (Joule effect) — kettles, bulbs, fuses.\n- **Measurement** — ammeters, voltmeters, Wheatstone bridge, potentiometer.",
            },
            {
              kind: "intuition",
              body:
                "Think of current as water in a pipe. Voltage is the pressure difference, resistance is the pipe's narrowness, and current is the flow rate. Ohm's law (I = V/R) is just 'more pressure, more flow; narrower pipe, less flow'.",
            },
          ],
        },
      ],
    },
    {
      id: "current",
      title: "2 · Electric Current & Current Density",
      topics: [
        {
          id: "current-def",
          title: "Definition, direction and current density",
          theory:
            "**Electric current** is the rate of flow of charge through a cross-section:\n  I = q/t  (steady),  I = dq/dt (instantaneous). Unit: ampere (A) = C/s. It is a **scalar** (it has direction along the wire but adds algebraically, not by the vector triangle law).\n\n**Conventional current** is taken in the direction a **positive** charge would move — opposite to the electron drift. **Current density** J = I/A is a vector along the flow: J = σE.",
          formulas: [
            { label: "Current", expr: "I = q/t = dq/dt", note: "ampere = C/s" },
            { label: "Current density", expr: "J = I/A = σE", note: "vector, along flow" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Current is a scalar",
              body:
                "Despite having a direction, current does **not** add like vectors — at a junction currents add algebraically (Kirchhoff). Only **current density J** is a true vector.",
            },
          ],
        },
      ],
    },
    {
      id: "drift",
      title: "3 · Drift Velocity & the Microscopic Model",
      topics: [
        {
          id: "drift-theory",
          title: "Drift velocity, relaxation time, mobility",
          theory:
            "Free electrons move randomly at high speed (~10⁶ m/s) but with **zero average** velocity. An applied field superimposes a tiny **drift velocity** v_d (~10⁻⁴ m/s) opposite to E. Between collisions an electron accelerates for an average **relaxation time** τ.",
          derivation:
            "Acceleration a = eE/m. Average drift gained in time τ:\n  v_d = aτ = eEτ/m.\nCurrent in terms of drift (n = free-electron density, A = area):\n  I = n e A v_d.\n**Mobility** μ = v_d/E = eτ/m, so J = neμE = σE with σ = neμ.",
          figures: [{ svg: SVG_DRIFT, caption: "Electrons drift opposite to E; conventional current I is in the field's direction." }],
          formulas: [
            { label: "Drift velocity", expr: "v_d = eEτ/m" },
            { label: "Current", expr: "I = n e A v_d" },
            { label: "Mobility", expr: "μ = v_d/E = eτ/m" },
            { label: "Conductivity", expr: "σ = neμ = ne²τ/m" },
          ],
          intuition:
            "Drift is glacially slow — millimetres per second — yet a lamp lights instantly because the **field** propagates near light-speed, nudging electrons everywhere along the wire at once. (Like opening a tap: water already in the pipe moves immediately, even though each molecule travels slowly.)",
          examples: [
            {
              level: "JEE Main",
              problem:
                "A copper wire carries 1 A. If n = 8.5 × 10²⁸ /m³ and A = 1 mm², find the drift speed. (e = 1.6 × 10⁻¹⁹ C)",
              solution:
                "v_d = I/(neA) = 1 / (8.5×10²⁸ × 1.6×10⁻¹⁹ × 10⁻⁶)\n  = 1 / (1.36×10⁴) ≈ 7.4 × 10⁻⁵ m/s.\nA fraction of a millimetre per second — extremely slow.",
              answer: "≈ 7.4 × 10⁻⁵ m/s",
            },
          ],
          mistakes: [
            "Confusing the random thermal speed (~10⁶ m/s) with the drift speed (~10⁻⁴ m/s).",
            "Thinking the slow drift means the bulb lights slowly — the field (signal) travels near c.",
          ],
        },
      ],
    },
    {
      id: "ohm",
      title: "4 · Ohm's Law & Resistance",
      topics: [
        {
          id: "ohm-theory",
          title: "V = IR, resistivity and conductivity",
          theory:
            "For many conductors (at constant temperature) current is proportional to voltage — **Ohm's law**: V = IR. **Resistance** R measures opposition to current; it depends on material and geometry.",
          derivation:
            "From J = σE with E = V/L and I = JA:\n  I = σA·(V/L) ⇒ V = (L/σA)·I = IR.\nSo R = L/(σA) = ρL/A, where resistivity ρ = 1/σ = m/(ne²τ).\n  • R ∝ length L,  R ∝ 1/area A.\n  • ρ is a material property (independent of size).",
          figures: [{ svg: SVG_VI, caption: "Ohmic conductor: V–I is a straight line (slope R). Non-ohmic devices (diode) curve." }],
          formulas: [
            { label: "Ohm's law", expr: "V = IR" },
            { label: "Resistance", expr: "R = ρL/A" },
            { label: "Resistivity", expr: "ρ = 1/σ = m/(ne²τ)" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Resistance vs resistivity",
              body:
                "**Resistivity ρ** is intrinsic to the material (independent of shape). **Resistance R** depends on shape (L, A). Stretching a wire keeps ρ fixed but changes R (R ∝ L², since volume is conserved).",
            },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "A wire of resistance R is stretched uniformly to twice its length. Find the new resistance.",
              solution:
                "Volume constant: A·L = A'·(2L) ⇒ A' = A/2.\nR' = ρ(2L)/(A/2) = 4·ρL/A = 4R.\nStretching to n× length multiplies R by n².",
              answer: "R' = 4R",
            },
          ],
        },
        {
          id: "temperature",
          title: "Temperature dependence",
          theory:
            "Resistivity varies with temperature: ρ_T = ρ₀[1 + α(T − T₀)], where α is the temperature coefficient.\n  • **Metals:** α > 0 — heating increases collisions (τ↓), so ρ rises.\n  • **Semiconductors / electrolytes:** α < 0 — heating frees more carriers (n↑), so ρ falls.",
          figures: [{ svg: SVG_RHO_T, caption: "Metals: ρ rises with T (α > 0). Semiconductors: ρ falls (α < 0)." }],
          formulas: [{ label: "Temp coefficient", expr: "ρ_T = ρ₀[1 + α(T − T₀)]" }],
          jeeNotes: [
            "Superconductors have ρ = 0 below a critical temperature.",
            "For metals the dominant effect is τ decreasing with temperature; n is nearly constant.",
          ],
        },
      ],
    },
    {
      id: "combinations",
      title: "5 · Combinations of Resistors",
      topics: [
        {
          id: "series-parallel",
          title: "Series and parallel",
          theory:
            "**Series:** same current; voltages add ⇒ R_eq = ΣRᵢ (larger than the largest).\n**Parallel:** same voltage; currents add ⇒ 1/R_eq = Σ1/Rᵢ (smaller than the smallest).",
          figures: [
            { svg: SVG_SERIES_R, caption: "Series: one current path; R_eq = R₁ + R₂ + R₃." },
            { svg: SVG_PARALLEL_R, caption: "Parallel: shared voltage; 1/R_eq = Σ 1/Rᵢ." },
          ],
          formulas: [
            { label: "Series", expr: "R_eq = Σ Rᵢ" },
            { label: "Parallel", expr: "1/R_eq = Σ 1/Rᵢ" },
            { label: "Two in parallel", expr: "R_eq = R₁R₂/(R₁+R₂)" },
          ],
          callouts: [
            {
              kind: "tip",
              title: "Opposite to capacitors",
              body:
                "Resistors add in **series** and reciprocate in **parallel** — the mirror image of capacitors. Keep the two straight.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem: "Find the equivalent resistance of three 6 Ω resistors all connected in parallel.",
              solution: "1/R_eq = 1/6 + 1/6 + 1/6 = 3/6 = 1/2 ⇒ R_eq = 2 Ω.\n(n equal resistors R in parallel give R/n.)",
              answer: "2 Ω",
            },
          ],
        },
      ],
    },
    {
      id: "emf",
      title: "6 · EMF, Internal Resistance & Terminal Voltage",
      topics: [
        {
          id: "emf-theory",
          title: "Real cells",
          theory:
            "A cell's **EMF (ε)** is the energy it gives per unit charge (the open-circuit voltage). Real cells have **internal resistance r**, so the **terminal voltage** is less than ε while delivering current.",
          derivation:
            "Driving current I through external R:\n  ε = I(R + r) ⇒ I = ε/(R + r).\nTerminal voltage:\n  V = ε − Ir  (discharging);  V = ε + Ir  (while being charged).\nPower delivered to R is maximum when **R = r** (P_max = ε²/4r).",
          figures: [{ svg: SVG_EMF, caption: "Terminal voltage V = ε − Ir falls below the EMF as current flows." }],
          formulas: [
            { label: "Current", expr: "I = ε/(R + r)" },
            { label: "Terminal V (discharge)", expr: "V = ε − Ir" },
            { label: "Max power transfer", expr: "R = r,  P_max = ε²/4r" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Reading V",
              body:
                "- Open circuit (I = 0): V = ε.\n- Discharging: V < ε.\n- Charging: V > ε.\nA voltmeter across the terminals reads V, not ε, unless I = 0.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem: "A cell of EMF 12 V and internal resistance 2 Ω is connected to a 4 Ω resistor. Find the terminal voltage.",
              solution: "I = ε/(R+r) = 12/(4+2) = 2 A.\nV = ε − Ir = 12 − 2×2 = 8 V (= IR = 2×4 ✓).",
              answer: "8 V",
            },
          ],
        },
        {
          id: "grouping-cells",
          title: "Grouping of cells",
          theory:
            "Cells can be grouped to boost voltage or current.",
          derivation:
            "**Series (n cells):** ε_eq = nε, r_eq = nr ⇒ I = nε/(R + nr). Best when R ≫ r.\n**Parallel (n cells):** ε_eq = ε, r_eq = r/n ⇒ I = ε/(R + r/n). Best when R ≪ r.\n**Mixed (m rows of n in series):** maximum current when external R = (n/m)·r.",
          figures: [{ svg: SVG_CELLS, caption: "Series boosts EMF (nε); parallel lowers internal resistance (r/n)." }],
          formulas: [
            { label: "Series", expr: "ε_eq = nε,  r_eq = nr" },
            { label: "Parallel", expr: "ε_eq = ε,  r_eq = r/n" },
          ],
        },
      ],
    },
    {
      id: "kirchhoff",
      title: "7 · Kirchhoff's Laws",
      topics: [
        {
          id: "kirchhoff-theory",
          title: "Junction and loop rules",
          theory:
            "For circuits too complex for simple series/parallel, use Kirchhoff's two rules:\n\n**KCL (junction rule):** the algebraic sum of currents at any junction is zero — Σ I = 0 (charge conservation).\n\n**KVL (loop rule):** the algebraic sum of potential changes around any closed loop is zero — Σ ΔV = 0 (energy conservation).",
          figures: [{ svg: SVG_KCL, caption: "KCL: current in equals current out at every junction." }],
          formulas: [
            { label: "Junction (KCL)", expr: "Σ I = 0" },
            { label: "Loop (KVL)", expr: "Σ ΔV = 0" },
          ],
          callouts: [
            {
              kind: "tip",
              title: "Sign convention for KVL",
              body:
                "- Across a resistor: drop −IR if you traverse **with** the current, +IR if **against**.\n- Across a cell: + to − inside is −ε if you go from − to +... fix one consistent rule: rise +ε going − → +, and −IR along the assumed current. A negative answer just means your assumed current direction was reversed.",
            },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "In a single loop, a 10 V cell (r = 1 Ω) and a 4 V cell (r = 1 Ω) oppose each other across an external 3 Ω resistor. Find the current.",
              solution:
                "Net EMF = 10 − 4 = 6 V (cells oppose). Total resistance = 3 + 1 + 1 = 5 Ω.\nKVL: I = 6/5 = 1.2 A, in the direction of the 10 V cell.",
              answer: "1.2 A",
            },
          ],
          mistakes: [
            "Inconsistent sign convention around the loop — pick one and apply it everywhere.",
            "Forgetting internal resistances in the loop equation.",
          ],
        },
      ],
    },
    {
      id: "bridge",
      title: "8 · Wheatstone Bridge & Meter Bridge",
      topics: [
        {
          id: "wheatstone-theory",
          title: "Balanced bridge",
          theory:
            "The Wheatstone bridge measures an unknown resistance by **balancing** — adjusting until no current flows through the galvanometer.",
          derivation:
            "At balance, no current through G ⇒ the bridge points are at equal potential:\n  P/Q = R/S.\nThis condition is **independent** of the galvanometer resistance and the supply EMF. The **meter bridge** is its practical form: with a 1 m wire, R/S = l/(100 − l), where l is the balance length.",
          figures: [{ svg: SVG_WHEATSTONE, caption: "At balance (no galvanometer current): P/Q = R/S." }],
          formulas: [
            { label: "Balance condition", expr: "P/Q = R/S" },
            { label: "Meter bridge", expr: "R/S = l/(100 − l)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Why balance is powerful",
              body:
                "At balance the galvanometer branch carries no current, so you can **remove it** (or treat it as open) when reducing the network — and the result doesn't depend on G or the battery. This null method is very precise.",
            },
          ],
        },
      ],
    },
    {
      id: "potentiometer",
      title: "9 · Potentiometer",
      topics: [
        {
          id: "potentiometer-theory",
          title: "A voltage ruler",
          theory:
            "A potentiometer is a long uniform wire carrying a steady current; potential falls **uniformly** along it (potential gradient k = V/L). By finding the balance length where the galvanometer reads zero, it measures EMF/voltage **without drawing current** — so it reads true EMF (unlike a voltmeter).",
          derivation:
            "Potential gradient k = (driver voltage)/(length). At balance length l:\n  ε = k·l.\nComparing two cells: ε₁/ε₂ = l₁/l₂.\nInternal resistance of a cell: r = R(l₁ − l₂)/l₂, where l₁ (open) and l₂ (with R across the cell) are the balance lengths.",
          figures: [{ svg: SVG_POTENTIOMETER, caption: "At the balance point the galvanometer reads zero — the cell draws no current, so its true EMF is measured." }],
          formulas: [
            { label: "EMF", expr: "ε = k·l  (k = V/L)" },
            { label: "Compare EMFs", expr: "ε₁/ε₂ = l₁/l₂" },
            { label: "Internal resistance", expr: "r = R(l₁ − l₂)/l₂" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Potentiometer vs voltmeter",
              body:
                "A voltmeter draws a little current, so it reads terminal voltage (< ε). A potentiometer at balance draws **zero** current from the test cell, so it reads the **true EMF** — its key advantage. Longer wire ⇒ smaller gradient ⇒ greater sensitivity.",
            },
          ],
          mistakes: [
            "Forgetting the driver-cell EMF must exceed the EMF being measured (else no balance point exists).",
            "Using a voltmeter's reading as the true EMF.",
          ],
        },
      ],
    },
    {
      id: "power",
      title: "10 · Electrical Power & Heating",
      topics: [
        {
          id: "power-theory",
          title: "Power, Joule heating and transmission",
          theory:
            "Power delivered to a resistor is P = VI; with Ohm's law it has three equivalent forms. Energy dissipated as heat is the **Joule effect**.",
          derivation:
            "  P = VI = I²R = V²/R.\nHeat produced in time t: H = I²Rt (Joule's law).\nFor a fixed device rated (P, V): R = V²/P.\n**Transmission:** to deliver power P at voltage V, the line current is I = P/V, so line loss = I²R_line = (P/V)²R_line — hence high-voltage transmission to cut losses.",
          formulas: [
            { label: "Power", expr: "P = VI = I²R = V²/R" },
            { label: "Joule heating", expr: "H = I²Rt" },
            { label: "Device resistance", expr: "R = V²/P_rated" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Series vs parallel for bulbs",
              body:
                "For bulbs rated at the same voltage, R = V²/P, so a **lower-power** bulb has **higher** resistance. In **series** (same I), the higher-R (lower-watt) bulb glows brighter; in **parallel** (same V), each runs at its rated power. This reversal is a favourite trap.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "Two bulbs rated 60 W and 100 W (both 220 V) are connected in series across 220 V. Which glows brighter?",
              solution:
                "R = V²/P ⇒ R₆₀ = 220²/60 (larger), R₁₀₀ = 220²/100 (smaller).\nIn series the current is the same; power = I²R, so the **larger R (60 W) bulb** dissipates more and glows brighter.",
              answer: "The 60 W bulb glows brighter",
            },
          ],
        },
      ],
    },
    {
      id: "advanced",
      title: "11 · Advanced JEE Insights",
      topics: [
        {
          id: "insights",
          title: "Symmetry, balanced bridges and limiting cases",
          theory:
            "Hard network problems usually crack open with symmetry, not brute force.",
          callouts: [
            {
              kind: "jee",
              body:
                "- **Balanced Wheatstone** (P/Q = R/S): the central branch carries no current — delete it and simplify.\n- **Symmetry / equipotential nodes:** points at the same potential can be merged (or the connecting branch removed). Classic for cube-of-resistors problems.\n- **Ammeter** ideally has 0 resistance (in series); **voltmeter** ideally infinite (in parallel). Real meters shift readings slightly.\n- **Max power transfer:** external R = internal r.\n- **Stretched wire:** R ∝ L² (volume conserved).\n- Convert a real cell (ε, r) to its Thevenin/Norton equivalent for fast network reduction.",
            },
            {
              kind: "warning",
              body:
                "- Current is a **scalar** (adds algebraically), current density J is the vector.\n- Terminal voltage ≠ EMF whenever current flows.\n- For same-voltage-rated bulbs, lower wattage ⇒ higher resistance (counter-intuitive in series).\n- Drift speed is tiny; the signal speed is not.",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Treating current as a vector — it adds algebraically; only J is a vector.",
    "Confusing thermal speed (~10⁶ m/s) with drift speed (~10⁻⁴ m/s).",
    "Mixing up resistance (depends on shape) with resistivity (material only).",
    "Forgetting R ∝ L² when a wire is stretched (volume conserved).",
    "Combining resistors like capacitors (series/parallel swapped).",
    "Using EMF instead of terminal voltage when current flows (V = ε − Ir).",
    "Dropping internal resistance r in I = ε/(R + r).",
    "Inconsistent sign convention in KVL loops.",
    "Forgetting that a balanced Wheatstone bridge's middle branch carries no current.",
    "Thinking the Wheatstone balance depends on the galvanometer or battery (it doesn't).",
    "Treating a potentiometer reading like a voltmeter (it reads true EMF, drawing no current).",
    "Driver EMF smaller than the measured EMF ⇒ no balance point (overlooked).",
    "Assuming the higher-wattage bulb always glows brighter (false in series).",
    "Using α > 0 for semiconductors (their resistivity falls with temperature).",
    "Ideal-meter confusion: ammeter ~0 Ω in series, voltmeter ~∞ Ω in parallel.",
  ],
  revision: {
    formulaSheet: [
      { label: "Current", expr: "I = q/t = neAv_d" },
      { label: "Drift / mobility", expr: "v_d = eEτ/m,  μ = eτ/m" },
      { label: "Ohm / Resistance", expr: "V = IR,  R = ρL/A" },
      { label: "Conductivity", expr: "σ = neμ = 1/ρ" },
      { label: "Temp coeff.", expr: "ρ_T = ρ₀[1 + α(T−T₀)]" },
      { label: "Series / Parallel", expr: "R = ΣRᵢ ;  1/R = Σ1/Rᵢ" },
      { label: "Cell", expr: "I = ε/(R+r),  V = ε − Ir" },
      { label: "Max power", expr: "R = r,  P_max = ε²/4r" },
      { label: "Kirchhoff", expr: "ΣI = 0 ;  ΣΔV = 0" },
      { label: "Wheatstone", expr: "P/Q = R/S" },
      { label: "Potentiometer", expr: "ε₁/ε₂ = l₁/l₂" },
      { label: "Power", expr: "P = VI = I²R = V²/R" },
    ],
    conceptMap:
      "Charge flow ─▶ Current I (= neAv_d) ─▶ Ohm's Law (V=IR, R=ρL/A) ─▶ Combinations {series, parallel}\nReal cells (ε, r; V=ε−Ir) ─▶ Grouping of cells\nComplex networks ─▶ Kirchhoff (KCL, KVL) ─▶ {Wheatstone bridge, Potentiometer}\nEnergy ─▶ Power (VI, I²R, V²/R) & Joule heating",
    pyqInsights: [
      "JEE Main: 1–2 questions/shift — Ohm's law/resistance combinations, drift velocity, cells & internal resistance, and power are the staples.",
      "JEE Advanced: Kirchhoff networks, balanced/unbalanced Wheatstone, potentiometer (EMF & internal resistance), symmetry (cube of resistors), and meter-bridge errors.",
      "Numerical answers cluster on equivalent resistance, balance length, terminal voltage and dissipated power.",
    ],
    lastMinuteTips: [
      "Resistors: series add, parallel reciprocate (opposite to capacitors).",
      "Stretched wire: R ∝ L² (volume fixed).",
      "When current flows, use V = ε − Ir, not ε.",
      "Balanced Wheatstone (P/Q = R/S): delete the middle branch.",
      "Potentiometer reads TRUE EMF (zero current at balance); voltmeter reads less.",
      "Same-rated bulbs: lower watt ⇒ higher R ⇒ brighter in series.",
      "Max power to load when R = r.",
    ],
  },
};

export default currentElectricity;
