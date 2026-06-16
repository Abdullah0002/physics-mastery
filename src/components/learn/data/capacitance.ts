import type { ChapterLearnModule } from "../shared/types";

/* ------------------------------------------------------------------ *
 *  SVG diagrams (theme-aware). + plate red, − plate blue,
 *  field / vectors indigo (#6366f1).
 * ------------------------------------------------------------------ */

const SVG_PARALLEL_PLATE = `<svg viewBox='0 0 340 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Parallel plate capacitor connected to a battery with uniform field between plates'><defs><marker id='caph1' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><line x1='120' y1='40' x2='120' y2='150' stroke='#dc2626' stroke-width='4'/><line x1='220' y1='40' x2='220' y2='150' stroke='#2563eb' stroke-width='4'/><text x='100' y='32' font-size='13' fill='#dc2626'>+Q</text><text x='210' y='32' font-size='13' fill='#2563eb'>−Q</text><g stroke='#6366f1' stroke-width='1.6' marker-end='url(#caph1)'><line x1='128' y1='60' x2='212' y2='60'/><line x1='128' y1='95' x2='212' y2='95'/><line x1='128' y1='130' x2='212' y2='130'/></g><text x='160' y='172' font-size='12' fill='currentColor'>d</text><line x1='120' y1='160' x2='220' y2='160' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><line x1='120' y1='95' x2='60' y2='95' stroke='currentColor' stroke-width='2'/><line x1='220' y1='95' x2='280' y2='95' stroke='currentColor' stroke-width='2'/><line x1='52' y1='80' x2='52' y2='110' stroke='currentColor' stroke-width='2'/><line x1='44' y1='88' x2='44' y2='102' stroke='currentColor' stroke-width='4'/><line x1='288' y1='80' x2='288' y2='110' stroke='currentColor' stroke-width='4'/><line x1='296' y1='88' x2='296' y2='102' stroke='currentColor' stroke-width='2'/><text x='40' y='130' font-size='12' fill='currentColor'>V (battery)</text><text x='150' y='52' font-size='11' fill='#6366f1'>E</text></svg>`;

const SVG_DIELECTRIC = `<svg viewBox='0 0 340 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Dielectric slab polarised between capacitor plates, reducing the net field'><line x1='70' y1='40' x2='70' y2='160' stroke='#dc2626' stroke-width='4'/><line x1='270' y1='40' x2='270' y2='160' stroke='#2563eb' stroke-width='4'/><text x='52' y='32' font-size='13' fill='#dc2626'>+ + +</text><text x='250' y='32' font-size='13' fill='#2563eb'>− − −</text><rect x='120' y='45' width='100' height='110' fill='none' stroke='currentColor' stroke-width='1.5'/><text x='150' y='180' font-size='12' fill='currentColor'>dielectric (K)</text><text x='124' y='90' font-size='14' fill='#2563eb'>−</text><text x='124' y='130' font-size='14' fill='#2563eb'>−</text><text x='208' y='90' font-size='14' fill='#dc2626'>+</text><text x='208' y='130' font-size='14' fill='#dc2626'>+</text><g stroke='currentColor' stroke-width='1' opacity='0.6'><circle cx='150' cy='80' r='9' fill='none'/><line x1='141' y1='80' x2='159' y2='80'/><circle cx='190' cy='110' r='9' fill='none'/><line x1='181' y1='110' x2='199' y2='110'/></g><text x='150' y='205' font-size='10' fill='currentColor'></text></svg>`;

const SVG_PARTIAL_SLAB = `<svg viewBox='0 0 320 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Capacitor with a dielectric slab of thickness t partially filling the gap'><line x1='80' y1='40' x2='80' y2='150' stroke='#dc2626' stroke-width='4'/><line x1='240' y1='40' x2='240' y2='150' stroke='#2563eb' stroke-width='4'/><rect x='150' y='42' width='40' height='106' fill='none' stroke='currentColor' stroke-width='1.5'/><text x='154' y='100' font-size='12' fill='currentColor'>K</text><line x1='80' y1='165' x2='240' y2='165' stroke='currentColor' stroke-width='1'/><line x1='80' y1='160' x2='80' y2='170' stroke='currentColor' stroke-width='1'/><line x1='240' y1='160' x2='240' y2='170' stroke='currentColor' stroke-width='1'/><text x='155' y='182' font-size='11' fill='currentColor'>d</text><line x1='150' y1='30' x2='190' y2='30' stroke='currentColor' stroke-width='1'/><text x='165' y='24' font-size='11' fill='currentColor'>t</text><text x='250' y='100' font-size='11' fill='currentColor'>⇒ series</text></svg>`;

const SVG_SERIES = `<svg viewBox='0 0 360 110' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Three capacitors in series'><line x1='20' y1='55' x2='70' y2='55' stroke='currentColor' stroke-width='2'/><line x1='70' y1='40' x2='70' y2='70' stroke='#2563eb' stroke-width='3'/><line x1='82' y1='40' x2='82' y2='70' stroke='#2563eb' stroke-width='3'/><text x='66' y='32' font-size='11' fill='currentColor'>C₁</text><line x1='82' y1='55' x2='150' y2='55' stroke='currentColor' stroke-width='2'/><line x1='150' y1='40' x2='150' y2='70' stroke='#2563eb' stroke-width='3'/><line x1='162' y1='40' x2='162' y2='70' stroke='#2563eb' stroke-width='3'/><text x='146' y='32' font-size='11' fill='currentColor'>C₂</text><line x1='162' y1='55' x2='230' y2='55' stroke='currentColor' stroke-width='2'/><line x1='230' y1='40' x2='230' y2='70' stroke='#2563eb' stroke-width='3'/><line x1='242' y1='40' x2='242' y2='70' stroke='#2563eb' stroke-width='3'/><text x='226' y='32' font-size='11' fill='currentColor'>C₃</text><line x1='242' y1='55' x2='300' y2='55' stroke='currentColor' stroke-width='2'/><text x='150' y='98' font-size='11' fill='currentColor'>same charge Q on each</text></svg>`;

const SVG_PARALLEL_COMB = `<svg viewBox='0 0 300 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Three capacitors in parallel'><line x1='40' y1='30' x2='260' y2='30' stroke='currentColor' stroke-width='2'/><line x1='40' y1='170' x2='260' y2='170' stroke='currentColor' stroke-width='2'/><g stroke='#2563eb' stroke-width='3'><line x1='75' y1='30' x2='75' y2='90'/><line x1='60' y1='90' x2='90' y2='90'/><line x1='60' y1='105' x2='90' y2='105'/><line x1='75' y1='105' x2='75' y2='170'/><line x1='150' y1='30' x2='150' y2='90'/><line x1='135' y1='90' x2='165' y2='90'/><line x1='135' y1='105' x2='165' y2='105'/><line x1='150' y1='105' x2='150' y2='170'/><line x1='225' y1='30' x2='225' y2='90'/><line x1='210' y1='90' x2='240' y2='90'/><line x1='210' y1='105' x2='240' y2='105'/><line x1='225' y1='105' x2='225' y2='170'/></g><text x='80' y='102' font-size='11' fill='currentColor'>C₁</text><text x='155' y='102' font-size='11' fill='currentColor'>C₂</text><text x='230' y='102' font-size='11' fill='currentColor'>C₃</text><text x='95' y='192' font-size='11' fill='currentColor'>same voltage V across each</text></svg>`;

const SVG_ENERGY = `<svg viewBox='0 0 240 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Energy stored is the area under the charge versus voltage graph'><line x1='40' y1='170' x2='220' y2='170' stroke='currentColor' stroke-width='1.5'/><line x1='40' y1='170' x2='40' y2='25' stroke='currentColor' stroke-width='1.5'/><text x='20' y='35' font-size='12' fill='currentColor'>Q</text><text x='210' y='188' font-size='12' fill='currentColor'>V</text><polygon points='40,170 190,170 190,50' fill='#6366f1' opacity='0.18'/><line x1='40' y1='170' x2='190' y2='50' stroke='#2563eb' stroke-width='2.5'/><line x1='190' y1='170' x2='190' y2='50' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='95' y='150' font-size='12' fill='#2563eb'>U = ½QV</text><text x='178' y='186' font-size='11' fill='currentColor'>V₀</text></svg>`;

const SVG_SPHERICAL = `<svg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Spherical capacitor: inner sphere +Q, outer shell -Q, radial field between'><defs><marker id='caph2' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><circle cx='110' cy='110' r='90' fill='none' stroke='#2563eb' stroke-width='2.5'/><circle cx='110' cy='110' r='38' fill='none' stroke='#dc2626' stroke-width='2.5'/><text x='100' y='114' font-size='12' fill='#dc2626'>+Q</text><text x='150' y='40' font-size='12' fill='#2563eb'>−Q</text><g stroke='#6366f1' stroke-width='1.5' marker-end='url(#caph2)'><line x1='110' y1='72' x2='110' y2='24'/><line x1='148' y1='110' x2='196' y2='110'/><line x1='83' y1='83' x2='49' y2='49'/></g><text x='120' y='65' font-size='10' fill='currentColor'>a</text><text x='160' y='150' font-size='10' fill='currentColor'>b</text></svg>`;

const SVG_SHARING = `<svg viewBox='0 0 320 160' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Two capacitors connected to share charge until a common potential'><line x1='40' y1='40' x2='40' y2='70' stroke='#2563eb' stroke-width='3'/><line x1='52' y1='40' x2='52' y2='70' stroke='#2563eb' stroke-width='3'/><text x='30' y='30' font-size='11' fill='currentColor'>C₁,V₁</text><line x1='268' y1='40' x2='268' y2='70' stroke='#2563eb' stroke-width='3'/><line x1='280' y1='40' x2='280' y2='70' stroke='#2563eb' stroke-width='3'/><text x='258' y='30' font-size='11' fill='currentColor'>C₂,V₂</text><line x1='46' y1='40' x2='150' y2='40' stroke='currentColor' stroke-width='2'/><line x1='170' y1='40' x2='274' y2='40' stroke='currentColor' stroke-width='2'/><circle cx='150' cy='40' r='3' fill='currentColor'/><line x1='150' y1='40' x2='164' y2='30' stroke='currentColor' stroke-width='2'/><circle cx='170' cy='40' r='3' fill='currentColor'/><text x='148' y='22' font-size='11' fill='currentColor'>switch</text><line x1='46' y1='70' x2='274' y2='70' stroke='currentColor' stroke-width='2'/><text x='95' y='100' font-size='11' fill='currentColor'>common V = (C₁V₁+C₂V₂)/(C₁+C₂)</text></svg>`;

const SVG_RC = `<svg viewBox='0 0 300 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='RC charging and discharging curves of charge versus time'><line x1='40' y1='160' x2='280' y2='160' stroke='currentColor' stroke-width='1.5'/><line x1='40' y1='160' x2='40' y2='25' stroke='currentColor' stroke-width='1.5'/><text x='20' y='35' font-size='12' fill='currentColor'>q</text><text x='270' y='178' font-size='12' fill='currentColor'>t</text><path d='M40,160 C90,70 150,55 270,50' fill='none' stroke='#2563eb' stroke-width='2.5'/><text x='150' y='45' font-size='11' fill='#2563eb'>charging q=Q(1−e^{−t/RC})</text><path d='M40,50 C90,140 150,155 270,158' fill='none' stroke='#dc2626' stroke-width='2.5'/><text x='150' y='130' font-size='11' fill='#dc2626'>discharging q=Q e^{−t/RC}</text><line x1='40' y1='50' x2='270' y2='50' stroke='currentColor' stroke-width='0.7' stroke-dasharray='3 3'/><text x='20' y='54' font-size='10' fill='currentColor'>Q</text></svg>`;

export const capacitance: ChapterLearnModule = {
  slug: "capacitance",
  chapter: "Capacitance",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "How conductors store charge and energy: capacitance, parallel-plate & spherical capacitors, dielectrics, combinations, energy and charge sharing — first principles to JEE Advanced.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "A **capacitor** is a device that stores electric charge — and therefore energy — in the field between two conductors. It is the natural sequel to electrostatics: take the field and potential you just learned, and engineer them into a component.",
      topics: [
        {
          id: "why-capacitors",
          title: "Why capacitors matter",
          theory:
            "Any two conductors separated by an insulator form a capacitor. Give them ±Q and a voltage V appears between them. Capacitors smooth power supplies, tune radios, fire camera flashes, store energy in defibrillators, sense your finger on a touchscreen, and form the memory cells (DRAM) of computers.",
          callouts: [
            {
              kind: "tip",
              title: "Everyday capacitors",
              body:
                "- **Power supplies** — smoothing/filtering ripple.\n- **Camera flash & defibrillator** — dump stored energy fast.\n- **Touchscreens** — capacitive sensing.\n- **DRAM** — one capacitor = one bit.\n- **Tuning circuits** — set the resonant frequency with L and C.",
            },
            {
              kind: "intuition",
              body:
                "A capacitor is like a tiny rechargeable 'charge tank'. Voltage is the pressure; capacitance is the size of the tank (how much charge per unit pressure it holds).",
            },
          ],
        },
      ],
    },
    {
      id: "definition",
      title: "2 · Capacitance Defined",
      topics: [
        {
          id: "capacitance-def",
          title: "C = Q/V",
          theory:
            "For an isolated conductor, the charge Q it holds is proportional to its potential V. The constant of proportionality is the **capacitance**:\n  C = Q/V.\nIt depends only on **geometry** and the **medium**, not on Q or V. Unit: **farad (F)** = C/V. A farad is enormous; real capacitors are μF, nF or pF.",
          formulas: [
            { label: "Definition", expr: "C = Q/V", note: "farad = coulomb/volt" },
            { label: "Isolated sphere", expr: "C = 4πε₀R", note: "radius R" },
          ],
          intuition:
            "Capacitance is the 'charge appetite' of a conductor at a given voltage. A bigger or better-shaped conductor (or a dielectric) lets it swallow more charge for the same voltage.",
          examples: [
            {
              level: "JEE Main",
              problem: "What is the capacitance of an isolated conducting sphere of radius 9 cm? (k = 9×10⁹)",
              solution:
                "C = 4πε₀R = R/k = 0.09 / 9×10⁹ = 1.0 × 10⁻¹¹ F = 10 pF.",
              answer: "10 pF",
            },
          ],
        },
      ],
    },
    {
      id: "parallel-plate",
      title: "3 · Parallel-Plate Capacitor",
      topics: [
        {
          id: "ppc-derivation",
          title: "Deriving C = ε₀A/d",
          theory:
            "Two parallel plates of area A separated by a small gap d, carrying ±Q. The field between them is uniform.",
          derivation:
            "Surface density σ = Q/A. Field between the plates (two sheets +σ, −σ):\n  E = σ/ε₀ = Q/(ε₀A).\nPotential difference across the gap:\n  V = E·d = Qd/(ε₀A).\nCapacitance:\n  C = Q/V = ε₀A/d.\nKey features: C ∝ area, C ∝ 1/separation, independent of Q and V.",
          figures: [{ svg: SVG_PARALLEL_PLATE, caption: "Uniform field E = σ/ε₀ between the plates; V = Ed, C = ε₀A/d." }],
          formulas: [
            { label: "Field between plates", expr: "E = σ/ε₀ = Q/ε₀A" },
            { label: "Voltage", expr: "V = Ed" },
            { label: "Capacitance", expr: "C = ε₀A/d" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Edge effects & 'small d'",
              body:
                "C = ε₀A/d assumes the field is uniform and confined between the plates — valid only when d ≪ plate size, so we ignore the fringing field at the edges.",
            },
          ],
        },
      ],
    },
    {
      id: "dielectrics",
      title: "4 · Dielectrics",
      topics: [
        {
          id: "dielectric-theory",
          title: "Polarization and the dielectric constant",
          theory:
            "A **dielectric** is an insulator whose molecules polarise in a field — bound charges shift slightly, producing surface charges that **oppose** the applied field. The internal field drops by a factor K (the **dielectric constant**, K ≥ 1), so for the same charge the voltage falls and the capacitance **rises**.",
          derivation:
            "With a dielectric fully filling the gap:\n  E_inside = E₀/K,  so V = E₀d/K = V₀/K.\n  C = Q/V = K·(Q/V₀) = K·C₀ = K ε₀A/d.\nThe dielectric multiplies capacitance by K.",
          figures: [{ svg: SVG_DIELECTRIC, caption: "Polarised molecules create bound surface charges that reduce the net field by a factor K." }],
          formulas: [
            { label: "With dielectric", expr: "C = K ε₀A/d" },
            { label: "Reduced field", expr: "E = E₀/K" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Battery connected vs disconnected",
              body:
                "Insert a dielectric:\n- **Battery connected (V fixed):** C↑ ⇒ Q↑ (= CV), E unchanged, energy ↑.\n- **Battery disconnected (Q fixed):** C↑ ⇒ V↓ (= Q/C), E↓, energy ↓.\nDeciding which quantity is held constant is the heart of most dielectric problems.",
            },
          ],
        },
        {
          id: "partial-dielectric",
          title: "Partially filled & compound dielectrics",
          theory:
            "A slab of thickness t (< d) and constant K inside the gap splits the capacitor into the slab plus the remaining air gap — **in series**.",
          derivation:
            "Equivalent: an air capacitor with effective separation\n  d_eff = (d − t) + t/K.\n  C = ε₀A / [ (d − t) + t/K ].\nStacked layers (different thickness) → SERIES; side-by-side layers (different area) → PARALLEL.",
          figures: [{ svg: SVG_PARTIAL_SLAB, caption: "A slab of thickness t behaves like a series capacitor with effective gap d − t + t/K." }],
          formulas: [
            { label: "Partial slab", expr: "C = ε₀A/[(d−t) + t/K]" },
            { label: "Slab fills gap (t=d)", expr: "C = Kε₀A/d" },
          ],
          mistakes: [
            "Writing d_eff = (d − t) + tK instead of t/K — the dielectric **reduces** the effective gap.",
            "Treating stacked layers as parallel — they share the same charge, so they are **series**.",
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "A parallel-plate capacitor of gap d has a metal slab of thickness t (a perfect conductor, K → ∞) inserted parallel to the plates. Find the new capacitance.",
              solution:
                "For a conductor K → ∞, so t/K → 0:\n  C = ε₀A/[(d − t) + 0] = ε₀A/(d − t).\nA metal slab just shrinks the effective gap by its thickness (its position doesn't matter).",
              answer: "C = ε₀A/(d − t)",
            },
          ],
        },
      ],
    },
    {
      id: "combinations",
      title: "5 · Combinations of Capacitors",
      topics: [
        {
          id: "series-parallel",
          title: "Series and parallel",
          theory:
            "**Series:** same charge on each; voltages add. The equivalent is smaller than the smallest.\n**Parallel:** same voltage across each; charges add. The equivalent is the sum.",
          derivation:
            "Series (V = V₁ + V₂ + …, same Q):\n  1/C_eq = 1/C₁ + 1/C₂ + …\nParallel (Q = Q₁ + Q₂ + …, same V):\n  C_eq = C₁ + C₂ + …\nTwo in series: C_eq = C₁C₂/(C₁+C₂).",
          figures: [
            { svg: SVG_SERIES, caption: "Series: identical charge Q, voltages add, 1/C_eq = Σ 1/Cᵢ." },
            { svg: SVG_PARALLEL_COMB, caption: "Parallel: identical voltage V, charges add, C_eq = Σ Cᵢ." },
          ],
          formulas: [
            { label: "Series", expr: "1/C_eq = Σ 1/Cᵢ" },
            { label: "Parallel", expr: "C_eq = Σ Cᵢ" },
            { label: "Two in series", expr: "C_eq = C₁C₂/(C₁+C₂)" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Opposite of resistors",
              body:
                "Capacitors combine **opposite** to resistors: capacitors add in **parallel**, reciprocate in **series**. Mixing this up is a classic slip.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem: "Two capacitors 6 μF and 3 μF are joined in series, then the pair is connected in parallel with a 4 μF capacitor. Find the equivalent capacitance.",
              solution:
                "Series of 6 and 3: C_s = 6·3/(6+3) = 18/9 = 2 μF.\nParallel with 4: C_eq = 2 + 4 = 6 μF.",
              answer: "6 μF",
            },
          ],
        },
      ],
    },
    {
      id: "energy",
      title: "6 · Energy Stored",
      topics: [
        {
          id: "energy-theory",
          title: "Energy and energy density",
          theory:
            "Charging a capacitor means pushing charge against a rising voltage; that work is stored in the field.",
          derivation:
            "Bring dq across the current voltage v = q/C:\n  dW = v dq = (q/C) dq.\n  U = ∫₀^Q (q/C) dq = Q²/2C = ½CV² = ½QV.\nEnergy is the **area** under the Q–V line. Stored in the field with **energy density**:\n  u = ½ε₀E²  (½Kε₀E² with a dielectric).",
          figures: [{ svg: SVG_ENERGY, caption: "Energy stored = area under the Q–V graph = ½QV." }],
          formulas: [
            { label: "Energy", expr: "U = ½CV² = ½QV = Q²/2C" },
            { label: "Energy density", expr: "u = ½ε₀E²" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Which formula to use",
              body:
                "- **V constant** (battery connected): use U = ½CV².\n- **Q constant** (battery removed): use U = Q²/2C.\nPick the form whose quantity is held fixed so you don't have to recompute it.",
            },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "A capacitor C charged to V is disconnected and then connected across an identical uncharged capacitor. Find the energy lost.",
              solution:
                "Initial: U_i = ½CV². Charge conserved: Q = CV shared over 2C ⇒ V' = V/2.\nFinal: U_f = ½(2C)(V/2)² = ¼CV².\nLoss = U_i − U_f = ½CV² − ¼CV² = ¼CV² (50% lost, as heat/radiation).",
              answer: "ΔU = ¼CV² (half the energy)",
            },
          ],
        },
      ],
    },
    {
      id: "charge-sharing",
      title: "7 · Charge Sharing",
      topics: [
        {
          id: "sharing-theory",
          title: "Common potential and energy loss",
          theory:
            "Connect two capacitors with conductors and charge flows until both reach a **common potential**. Charge is conserved; energy is not.",
          derivation:
            "Common potential:\n  V = (C₁V₁ + C₂V₂)/(C₁ + C₂) = Q_total/C_total.\nFinal charges: Qᵢ = CᵢV (split in proportion to capacitance).\nEnergy lost:\n  ΔU = ½ · C₁C₂/(C₁+C₂) · (V₁ − V₂)²  (always > 0 if V₁ ≠ V₂).",
          figures: [{ svg: SVG_SHARING, caption: "Closing the switch shares charge to a common potential; some energy is always lost." }],
          formulas: [
            { label: "Common V", expr: "V = (C₁V₁ + C₂V₂)/(C₁ + C₂)" },
            { label: "Energy loss", expr: "ΔU = ½·C₁C₂/(C₁+C₂)·(V₁−V₂)²" },
          ],
          mistakes: [
            "Using energy conservation to find V — use **charge** conservation; energy is lost.",
            "Splitting charge equally — it splits in proportion to capacitance.",
          ],
        },
      ],
    },
    {
      id: "spherical",
      title: "8 · Spherical & Cylindrical Capacitors",
      topics: [
        {
          id: "spherical-theory",
          title: "Concentric conductors",
          theory:
            "Two concentric spheres (radii a < b) with ±Q form a spherical capacitor; coaxial cylinders form a cylindrical one. Use Gauss's law for the field between, then integrate for V.",
          derivation:
            "Spherical, field between (a < r < b): E = kQ/r².\n  V = ∫ₐᵇ E dr = kQ(1/a − 1/b).\n  C = Q/V = 4πε₀·ab/(b − a).\nIsolated sphere (b → ∞): C = 4πε₀a.\nCylindrical (length L): C = 2πε₀L / ln(b/a).",
          figures: [{ svg: SVG_SPHERICAL, caption: "Spherical capacitor: radial field between the shells gives C = 4πε₀ ab/(b−a)." }],
          formulas: [
            { label: "Spherical", expr: "C = 4πε₀·ab/(b−a)" },
            { label: "Cylindrical", expr: "C = 2πε₀L/ln(b/a)" },
          ],
        },
      ],
    },
    {
      id: "circuits",
      title: "9 · Capacitors in Circuits",
      topics: [
        {
          id: "rc-steady",
          title: "Steady state and RC charging",
          theory:
            "In **steady-state DC**, a fully charged capacitor carries **no current** — treat its branch as an open circuit. During charging/discharging through a resistor, charge changes exponentially.",
          derivation:
            "Charging through R from a battery V₀:\n  q(t) = CV₀(1 − e^{−t/RC}),  i(t) = (V₀/R) e^{−t/RC}.\nDischarging:\n  q(t) = Q₀ e^{−t/RC}.\nTime constant τ = RC: time to reach 63% (charging) or fall to 37% (discharging).",
          figures: [{ svg: SVG_RC, caption: "Exponential charging and discharging; time constant τ = RC." }],
          formulas: [
            { label: "Charging", expr: "q = CV₀(1 − e^{−t/RC})" },
            { label: "Discharging", expr: "q = Q₀ e^{−t/RC}" },
            { label: "Time constant", expr: "τ = RC" },
          ],
          callouts: [
            {
              kind: "tip",
              title: "Steady-state shortcut",
              body:
                "For DC steady-state circuit problems: (1) the capacitor branch carries no current; (2) find the voltage across the points the capacitor bridges; (3) Q = C × that voltage.",
            },
          ],
        },
        {
          id: "force-plates",
          title: "Force between the plates",
          theory:
            "The plates attract each other. Computing the force as (energy gradient) avoids the factor-of-2 trap (a plate sits in the field of the *other* plate, σ/2ε₀).",
          derivation:
            "F = −dU/dx at constant Q:\n  U = Q²x/(2ε₀A) ⇒ F = Q²/(2ε₀A) = ½QE = σ²A/(2ε₀).\nNote E here is the **full** field; each plate feels the field of the other (= E/2).",
          formulas: [{ label: "Force between plates", expr: "F = Q²/(2ε₀A) = ½QE" }],
        },
      ],
    },
    {
      id: "advanced",
      title: "10 · Advanced JEE Insights",
      topics: [
        {
          id: "insights",
          title: "Traps, tricks and limiting cases",
          theory: "The decisive idea in most capacitor problems is **what is held constant** and **what is conserved**.",
          callouts: [
            {
              kind: "jee",
              body:
                "- **Battery connected** ⇒ V fixed; **battery removed** ⇒ Q fixed. Decide this first.\n- Charge sharing / inserting a dielectric with battery removed ⇒ use **charge conservation**, expect energy loss.\n- Metal slab ⇒ K → ∞ ⇒ contributes zero to d_eff ⇒ C = ε₀A/(d − t), position-independent.\n- Symmetry / Wheatstone-bridge balance can make a 'bridge' capacitor carry no charge — drop it.\n- Energy is best found by the form whose variable is fixed: ½CV² (V fixed) or Q²/2C (Q fixed).",
            },
            {
              kind: "warning",
              body:
                "- Capacitors add in **parallel** (opposite to resistors).\n- d_eff uses **t/K**, not tK.\n- Inserting a dielectric with the **battery connected** does work (draws charge) — energy increases, it isn't 'free'.\n- Field just outside a conductor plate is σ/ε₀, but the force per plate uses σ/2ε₀ (the *other* plate's field).",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Combining capacitors like resistors (series/parallel swapped).",
    "Forgetting which quantity (Q or V) is held constant when a dielectric is inserted.",
    "Using d_eff = (d − t) + tK instead of (d − t) + t/K.",
    "Treating stacked dielectric layers as parallel (they are series).",
    "Splitting shared charge equally instead of in proportion to capacitance.",
    "Using energy conservation (not charge conservation) for charge sharing.",
    "Using ½CV² when Q is the fixed quantity (use Q²/2C) or vice-versa.",
    "Assuming inserting a dielectric with the battery connected is energy-free.",
    "Forgetting fringing-field assumption: C = ε₀A/d needs d ≪ plate size.",
    "Using the full field E (= σ/ε₀) for the force on a plate instead of σ/2ε₀.",
    "Forgetting a fully-charged capacitor blocks DC (open circuit) in steady state.",
    "Dropping the factor ½ in the energy formulas.",
    "Mishandling a metal slab (K → ∞ ⇒ t/K → 0), C = ε₀A/(d − t).",
    "Confusing capacitance (geometry only) with charge stored (depends on V).",
    "Ignoring that energy is lost as heat when capacitors are connected together.",
  ],
  revision: {
    formulaSheet: [
      { label: "Definition", expr: "C = Q/V" },
      { label: "Parallel plate", expr: "C = ε₀A/d  (Kε₀A/d with dielectric)" },
      { label: "Partial slab", expr: "C = ε₀A/[(d−t)+t/K]" },
      { label: "Spherical", expr: "C = 4πε₀ ab/(b−a)" },
      { label: "Cylindrical", expr: "C = 2πε₀L/ln(b/a)" },
      { label: "Series / Parallel", expr: "1/C = Σ1/Cᵢ ;  C = ΣCᵢ" },
      { label: "Energy", expr: "U = ½CV² = ½QV = Q²/2C" },
      { label: "Energy density", expr: "u = ½ε₀E²" },
      { label: "Charge sharing", expr: "V = (C₁V₁+C₂V₂)/(C₁+C₂)" },
      { label: "RC", expr: "q = CV₀(1−e^{−t/RC}),  τ = RC" },
      { label: "Force / plate", expr: "F = Q²/2ε₀A" },
    ],
    conceptMap:
      "Capacitance C=Q/V ─▶ Parallel plate (C=ε₀A/d) ─▶ Dielectrics (×K, partial slab → series)\nCombinations {series 1/C, parallel ΣC} ─▶ Equivalent C\nEnergy (½CV², u=½ε₀E²) ⇄ Charge sharing (common V, energy loss)\nCircuits: steady-state (open) & RC (τ=RC) ─▶ Force between plates",
    pyqInsights: [
      "JEE Main: 1 question/shift — most often combinations, dielectric (partial/with-or-without battery), and energy.",
      "JEE Advanced: dielectric energy with battery connected/removed, charge sharing & energy loss, slab/metal insertions, and multi-capacitor networks (sometimes bridge symmetry).",
      "Numerical answers cluster on equivalent C, charge in steady state, and the dielectric constant from a charge ratio.",
    ],
    lastMinuteTips: [
      "Decide first: is **V** fixed (battery on) or **Q** fixed (battery off)? Everything follows.",
      "Capacitors: parallel add, series reciprocate — opposite to resistors.",
      "Dielectric slab: effective gap (d − t) + t/K; metal slab: (d − t).",
      "Charge sharing conserves charge, not energy; common V = ΣCV / ΣC.",
      "Energy: ½CV² (V fixed) or Q²/2C (Q fixed) — choose the fixed variable.",
      "Steady-state DC: capacitor branch carries no current; Q = C × bridging voltage.",
    ],
  },
};

export default capacitance;
