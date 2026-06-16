import type { ChapterLearnModule } from "../shared/types";

/* SVG diagrams — voltage blue, current red, phasors/axes currentColor. */

const SVG_WAVEFORM = `<svg viewBox='0 0 320 170' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='AC sinusoidal waveform with peak and rms values'><line x1='30' y1='90' x2='310' y2='90' stroke='currentColor' stroke-width='1.3'/><line x1='30' y1='20' x2='30' y2='160' stroke='currentColor' stroke-width='1.3'/><text x='300' y='105' font-size='11' fill='currentColor'>t</text><path d='M30,90 C60,20 90,20 120,90 C150,160 180,160 210,90 C240,20 270,20 300,90' fill='none' stroke='#dc2626' stroke-width='2.5'/><line x1='30' y1='40' x2='300' y2='40' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='2' y='44' font-size='10' fill='currentColor'>I₀</text><line x1='30' y1='55' x2='300' y2='55' stroke='#2563eb' stroke-width='0.8' stroke-dasharray='4 3'/><text x='0' y='59' font-size='10' fill='#2563eb'>I_rms</text><text x='150' y='150' font-size='11' fill='currentColor'>I_rms = I₀/√2</text></svg>`;

const SVG_RESISTOR = `<svg viewBox='0 0 320 150' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Voltage and current in phase across a resistor'><line x1='30' y1='75' x2='310' y2='75' stroke='currentColor' stroke-width='1.2'/><path d='M30,75 C60,25 90,25 120,75 C150,125 180,125 210,75 C240,25 270,25 300,75' fill='none' stroke='#2563eb' stroke-width='2.3'/><path d='M30,75 C60,30 90,30 120,75 C150,120 180,120 210,75 C240,30 270,30 300,75' fill='none' stroke='#dc2626' stroke-width='2.3' stroke-dasharray='5 3'/><text x='130' y='25' font-size='11' fill='#2563eb'>V</text><text x='165' y='128' font-size='11' fill='#dc2626'>I</text><text x='120' y='145' font-size='11' fill='currentColor'>resistor: V and I in phase</text></svg>`;

const SVG_IND_PHASOR = `<svg viewBox='0 0 220 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Phasor: voltage leads current by 90 degrees in an inductor'><line x1='40' y1='150' x2='200' y2='150' stroke='currentColor' stroke-width='1'/><line x1='40' y1='150' x2='40' y2='20' stroke='currentColor' stroke-width='1'/><line x1='40' y1='150' x2='170' y2='150' stroke='#dc2626' stroke-width='2.5'/><polygon points='170,150 161,145 161,155' fill='#dc2626'/><text x='150' y='145' font-size='12' fill='#dc2626'>I</text><line x1='40' y1='150' x2='40' y2='40' stroke='#2563eb' stroke-width='2.5'/><polygon points='40,40 35,49 45,49' fill='#2563eb'/><text x='48' y='55' font-size='12' fill='#2563eb'>V</text><text x='70' y='30' font-size='11' fill='currentColor'>V leads I by 90°  (X_L=ωL)</text></svg>`;

const SVG_CAP_PHASOR = `<svg viewBox='0 0 220 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Phasor: current leads voltage by 90 degrees in a capacitor'><line x1='40' y1='90' x2='200' y2='90' stroke='currentColor' stroke-width='1'/><line x1='40' y1='20' x2='40' y2='160' stroke='currentColor' stroke-width='1'/><line x1='40' y1='90' x2='170' y2='90' stroke='#dc2626' stroke-width='2.5'/><polygon points='170,90 161,85 161,95' fill='#dc2626'/><text x='150' y='82' font-size='12' fill='#dc2626'>I</text><line x1='40' y1='90' x2='40' y2='155' stroke='#2563eb' stroke-width='2.5'/><polygon points='40,155 35,146 45,146' fill='#2563eb'/><text x='48' y='150' font-size='12' fill='#2563eb'>V</text><text x='60' y='30' font-size='11' fill='currentColor'>I leads V by 90°  (X_C=1/ωC)</text></svg>`;

const SVG_LCR_PHASOR = `<svg viewBox='0 0 260 210' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Series LCR phasor diagram and impedance triangle'><line x1='40' y1='120' x2='240' y2='120' stroke='currentColor' stroke-width='1'/><line x1='40' y1='30' x2='40' y2='200' stroke='currentColor' stroke-width='1'/><line x1='40' y1='120' x2='150' y2='120' stroke='#dc2626' stroke-width='2.5'/><polygon points='150,120 141,115 141,125' fill='#dc2626'/><text x='130' y='135' font-size='11' fill='#dc2626'>V_R (I)</text><line x1='40' y1='120' x2='40' y2='50' stroke='#2563eb' stroke-width='2.5'/><text x='44' y='60' font-size='11' fill='#2563eb'>V_L</text><line x1='40' y1='120' x2='40' y2='175' stroke='#16a34a' stroke-width='2.5'/><text x='44' y='170' font-size='11' fill='#16a34a'>V_C</text><line x1='40' y1='120' x2='150' y2='85' stroke='currentColor' stroke-width='2.5'/><polygon points='150,85 140,84 144,93' fill='currentColor'/><text x='155' y='82' font-size='11' fill='currentColor'>V</text><path d='M80,120 A40,40 0 0 0 76,108' fill='none' stroke='currentColor' stroke-width='1'/><text x='82' y='112' font-size='10' fill='currentColor'>φ</text><text x='60' y='205' font-size='10' fill='currentColor'>Z=√(R²+(X_L−X_C)²)</text></svg>`;

const SVG_RESONANCE = `<svg viewBox='0 0 280 190' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Resonance curve: current versus frequency for two resistances'><line x1='40' y1='160' x2='260' y2='160' stroke='currentColor' stroke-width='1.3'/><line x1='40' y1='160' x2='40' y2='25' stroke='currentColor' stroke-width='1.3'/><text x='22' y='35' font-size='12' fill='currentColor'>I</text><text x='248' y='178' font-size='12' fill='currentColor'>ω</text><path d='M40,158 C120,150 140,40 150,40 C160,40 180,150 260,158' fill='none' stroke='#dc2626' stroke-width='2.5'/><path d='M40,158 C110,148 140,90 150,90 C160,90 190,148 260,158' fill='none' stroke='#2563eb' stroke-width='2.3'/><line x1='150' y1='160' x2='150' y2='35' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='140' y='176' font-size='11' fill='currentColor'>ω₀</text><text x='160' y='50' font-size='10' fill='#dc2626'>low R (sharp, high Q)</text><text x='165' y='100' font-size='10' fill='#2563eb'>high R</text></svg>`;

const SVG_LC = `<svg viewBox='0 0 300 150' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='LC oscillation: energy shuttles between capacitor and inductor'><line x1='60' y1='40' x2='60' y2='60' stroke='#dc2626' stroke-width='3'/><line x1='50' y1='60' x2='70' y2='60' stroke='#dc2626' stroke-width='3'/><line x1='50' y1='70' x2='70' y2='70' stroke='#dc2626' stroke-width='3'/><line x1='60' y1='70' x2='60' y2='90' stroke='currentColor' stroke-width='1.5'/><text x='75' y='68' font-size='11' fill='#dc2626'>C</text><line x1='60' y1='40' x2='180' y2='40' stroke='currentColor' stroke-width='1.5'/><line x1='60' y1='90' x2='180' y2='90' stroke='currentColor' stroke-width='1.5'/><g fill='none' stroke='#2563eb' stroke-width='2'><circle cx='150' cy='40' r='7'/><circle cx='166' cy='40' r='7'/></g><text x='150' y='28' font-size='11' fill='#2563eb'>L</text><line x1='180' y1='40' x2='180' y2='90' stroke='currentColor' stroke-width='1.5'/><path d='M210,65 q12,-15 24,0' fill='none' stroke='currentColor' stroke-width='1.5'/><path d='M210,65 q12,15 24,0' fill='none' stroke='currentColor' stroke-width='1.5'/><text x='205' y='120' font-size='11' fill='currentColor'>f = 1/(2π√LC)</text></svg>`;

const SVG_TRANSFORMER = `<svg viewBox='0 0 320 170' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Transformer: primary and secondary coils on a common core'><rect x='130' y='30' width='60' height='110' fill='none' stroke='currentColor' stroke-width='3'/><g fill='none' stroke='#dc2626' stroke-width='2'><ellipse cx='130' cy='55' rx='14' ry='8'/><ellipse cx='130' cy='75' rx='14' ry='8'/><ellipse cx='130' cy='95' rx='14' ry='8'/><ellipse cx='130' cy='115' rx='14' ry='8'/></g><text x='80' y='90' font-size='11' fill='#dc2626'>N_p</text><g fill='none' stroke='#2563eb' stroke-width='2'><ellipse cx='190' cy='65' rx='14' ry='8'/><ellipse cx='190' cy='90' rx='14' ry='8'/><ellipse cx='190' cy='115' rx='14' ry='8'/></g><text x='210' y='90' font-size='11' fill='#2563eb'>N_s</text><text x='150' y='22' font-size='10' fill='currentColor'>core</text><text x='60' y='160' font-size='11' fill='currentColor'>V_s/V_p = N_s/N_p = I_p/I_s</text></svg>`;

export const alternatingCurrent: ChapterLearnModule = {
  slug: "alternating-current",
  chapter: "Alternating Current",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "Sinusoidal voltages and currents: rms values, reactance, the series LCR circuit and phasors, resonance and Q-factor, power & power factor, LC oscillations and the transformer — first principles to JEE Advanced.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "Mains electricity is **alternating** — it reverses 50 times a second. AC won the 'war of currents' because transformers can step its voltage up for efficient transmission and down for safe use. This chapter is the physics of circuits driven sinusoidally.",
      topics: [
        {
          id: "why-ac",
          title: "Why the world runs on AC",
          theory:
            "An alternating EMF reverses direction periodically, typically as V = V₀ sin ωt. Its killer advantage is the **transformer**: only a *changing* current can be stepped up/down by mutual induction, so AC can be transmitted at very high voltage (low current ⇒ low I²R loss) and then dropped to safe levels. DC can't do this simply.",
          callouts: [
            {
              kind: "tip",
              title: "Where it shows up",
              body:
                "- **Power grid** — generation, transmission, distribution.\n- **Transformers & adaptors** — voltage conversion.\n- **Radio / TV tuning** — LCR resonance selects a station.\n- **Induction motors, chokes, filters.**",
            },
            {
              kind: "intuition",
              body:
                "Resistors, inductors and capacitors each 'react' differently to the back-and-forth of AC: a resistor just obeys, an inductor fights *changes* in current, and a capacitor fights *changes* in voltage. The whole chapter is bookkeeping these phase differences.",
            },
          ],
        },
      ],
    },
    {
      id: "ac-quantities",
      title: "2 · AC Quantities & RMS",
      topics: [
        {
          id: "rms-theory",
          title: "Peak, rms and average",
          theory:
            "For i = i₀ sin ωt the value is constantly changing, so we use the **root-mean-square** — the equivalent DC that delivers the same average power.",
          derivation:
            "Average over a full cycle = 0 (equal + and − halves).\nMean of the square: <i²> = i₀²/2 ⇒\n  I_rms = i₀/√2 ≈ 0.707 i₀,  V_rms = V₀/√2.\nMean over a half cycle: i_avg = 2i₀/π ≈ 0.637 i₀.\nForm factor = I_rms/i_avg = π/(2√2) ≈ 1.11.\n'220 V mains' means V_rms = 220 V, so V₀ ≈ 311 V.",
          figures: [{ svg: SVG_WAVEFORM, caption: "AC waveform: rms value I₀/√2 is the DC-equivalent for power." }],
          formulas: [
            { label: "RMS", expr: "I_rms = I₀/√2,  V_rms = V₀/√2" },
            { label: "Half-cycle mean", expr: "i_avg = 2i₀/π" },
            { label: "Form factor", expr: "I_rms/i_avg = π/2√2 ≈ 1.11" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "RMS is the default",
              body:
                "Meters read **rms**; ratings (220 V, 5 A) are rms. The full-cycle **average** of a pure sinusoid is zero, so 'average' there refers to the half-cycle or to power. For non-sinusoidal waveforms use I_rms = √(<i²>) directly.",
            },
          ],
        },
      ],
    },
    {
      id: "single-elements",
      title: "3 · AC Through R, L and C",
      topics: [
        {
          id: "single-theory",
          title: "Phase and reactance of each element",
          theory:
            "Each passive element responds with a characteristic phase and 'resistance to AC':\n\n**Resistor:** V and I **in phase**; opposition = R (frequency-independent).\n**Inductor:** voltage **leads** current by 90°; opposition = inductive reactance X_L = ωL (grows with frequency).\n**Capacitor:** current **leads** voltage by 90°; opposition = capacitive reactance X_C = 1/ωC (falls with frequency).",
          figures: [
            { svg: SVG_RESISTOR, caption: "Resistor: V and I rise and fall together (in phase)." },
            { svg: SVG_IND_PHASOR, caption: "Inductor: V leads I by 90°; X_L = ωL." },
            { svg: SVG_CAP_PHASOR, caption: "Capacitor: I leads V by 90°; X_C = 1/ωC." },
          ],
          formulas: [
            { label: "Resistor", expr: "V = IR  (in phase)" },
            { label: "Inductive reactance", expr: "X_L = ωL  (V leads I)" },
            { label: "Capacitive reactance", expr: "X_C = 1/ωC  (I leads V)" },
          ],
          callouts: [
            {
              kind: "tip",
              title: "Mnemonic: 'CIVIL'",
              body:
                "In a **C**, **I** leads **V**; in an **L**, **V** leads **I**. Read 'CIV — VIL'. At very high ω an inductor blocks (X_L→∞) and a capacitor passes (X_C→0); at DC (ω=0) it's the reverse.",
            },
          ],
          mistakes: [
            "Adding X_L and X_C arithmetically — they are 180° apart, so the net reactance is the difference.",
            "Treating reactance like resistance for power — pure L and C dissipate no average power.",
            "Forgetting reactances are frequency-dependent.",
          ],
        },
      ],
    },
    {
      id: "lcr",
      title: "4 · Series LCR Circuit",
      topics: [
        {
          id: "lcr-theory",
          title: "Impedance and phase by phasors",
          theory:
            "In a series LCR circuit the same current flows through all elements, so we add the **voltage phasors**: V_R along I, V_L 90° ahead, V_C 90° behind.",
          derivation:
            "Net reactive voltage = V_L − V_C ⇒ total\n  V = √(V_R² + (V_L − V_C)²).\nDivide by I:\n  Z = √(R² + (X_L − X_C)²)  (impedance).\n  tan φ = (X_L − X_C)/R,  I₀ = V₀/Z.\nIf X_L > X_C the circuit is inductive (V leads I); if X_C > X_L, capacitive.",
          figures: [{ svg: SVG_LCR_PHASOR, caption: "Phasor sum: Z = √(R² + (X_L − X_C)²), phase tan φ = (X_L − X_C)/R." }],
          formulas: [
            { label: "Impedance", expr: "Z = √(R² + (X_L − X_C)²)" },
            { label: "Phase angle", expr: "tan φ = (X_L − X_C)/R" },
            { label: "Current", expr: "I_rms = V_rms/Z" },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "In a series LCR circuit R = 60 Ω, X_L = 70 Ω, X_C = 150 Ω. Find Z and the power factor.",
              solution:
                "Net reactance X = X_C − X_L = 80 Ω. Z = √(60² + 80²) = √10000 = 100 Ω.\nPower factor cos φ = R/Z = 60/100 = 0.6 (current leads, capacitive).",
              answer: "Z = 100 Ω, cos φ = 0.6",
            },
          ],
        },
      ],
    },
    {
      id: "resonance",
      title: "5 · Resonance & Quality Factor",
      topics: [
        {
          id: "resonance-theory",
          title: "Maximum current and selectivity",
          theory:
            "As frequency varies, X_L (∝ω) and X_C (∝1/ω) change oppositely. At **resonance** they cancel — the circuit behaves purely resistive and the current peaks.",
          derivation:
            "X_L = X_C ⇒ ω₀L = 1/(ω₀C) ⇒\n  ω₀ = 1/√(LC),  f₀ = 1/(2π√(LC)).\nAt resonance: Z = R (minimum), I = V/R (maximum), φ = 0, power factor = 1.\n**Quality factor** (sharpness):\n  Q = ω₀L/R = (1/R)√(L/C) = ω₀/Δω.\nBandwidth Δω = R/L. High Q ⇒ sharp, selective resonance.",
          figures: [{ svg: SVG_RESONANCE, caption: "Resonance: current peaks at ω₀; smaller R ⇒ sharper curve (higher Q)." }],
          formulas: [
            { label: "Resonant frequency", expr: "ω₀ = 1/√(LC)" },
            { label: "At resonance", expr: "Z = R,  I_max = V/R,  cos φ = 1" },
            { label: "Quality factor", expr: "Q = ω₀L/R = (1/R)√(L/C)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Why your radio tunes",
              body:
                "A tuning circuit is sharply resonant (high Q): only the station at f₀ produces a large current; others are suppressed. Adjusting C shifts f₀ to pick a station. Series LCR resonance = 'acceptor' circuit (max current); parallel LCR = 'rejector' (min current).",
            },
          ],
        },
      ],
    },
    {
      id: "power",
      title: "6 · Power in AC Circuits",
      topics: [
        {
          id: "power-theory",
          title: "Average power, power factor, wattless current",
          theory:
            "Because V and I are generally out of phase, average power is not simply V_rms·I_rms.",
          derivation:
            "Average power over a cycle:\n  P = V_rms · I_rms · cos φ,\nwhere **cos φ = R/Z** is the **power factor**.\n  • Pure R: cos φ = 1 (max power).\n  • Pure L or C: cos φ = 0 ⇒ P = 0 (**wattless current**).\nOnly the resistance dissipates: P = I²_rms R.",
          formulas: [
            { label: "Average power", expr: "P = V_rms I_rms cos φ" },
            { label: "Power factor", expr: "cos φ = R/Z" },
            { label: "Dissipation", expr: "P = I²_rms R" },
          ],
          callouts: [
            {
              kind: "tip",
              title: "Choke coil",
              body:
                "To limit AC current without wasting power, use a **choke** (large inductance, negligible resistance): it adds reactance (limits I) but cos φ ≈ 0, so almost no power is lost — unlike a resistor, which would dissipate heat. Used in tube-light ballasts.",
            },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "An LCR circuit draws current from a 220 V, 50 Hz supply with a power factor of 0.6, dissipating 132 W. Find the rms current.",
              solution:
                "P = V_rms I_rms cos φ ⇒ 132 = 220 × I × 0.6 ⇒ I = 132/132 = 1.0 A.",
              answer: "I_rms = 1 A",
            },
          ],
        },
      ],
    },
    {
      id: "lc-transformer",
      title: "7 · LC Oscillations & Transformer",
      topics: [
        {
          id: "lc-theory",
          title: "LC oscillations",
          theory:
            "Connect a charged capacitor across an inductor and energy sloshes back and forth between the electric field (C) and magnetic field (L) — an electrical analogue of a mass on a spring (ideally undamped).",
          derivation:
            "Charge oscillates: q = q₀ cos ω₀t with ω₀ = 1/√(LC).\nFrequency f = 1/(2π√(LC)).\nEnergy: capacitor energy ∝ cos²ω₀t, inductor energy ∝ sin²ω₀t; total constant = q₀²/2C.",
          figures: [{ svg: SVG_LC, caption: "Energy oscillates between C and L at f = 1/(2π√LC)." }],
          formulas: [
            { label: "Frequency", expr: "f = 1/(2π√(LC))" },
            { label: "Charge", expr: "q = q₀ cos ω₀t" },
          ],
        },
        {
          id: "transformer-theory",
          title: "Transformer",
          theory:
            "A transformer uses **mutual induction** between two coils on a common iron core to change AC voltage. It works only with AC (a changing flux).",
          derivation:
            "Ideal transformer (no losses): the same flux links both coils, so\n  V_s/V_p = N_s/N_p = I_p/I_s.\nStep-up: N_s > N_p (V↑, I↓). Step-down: N_s < N_p.\nPower conserved: V_p I_p = V_s I_s. Real losses: copper (I²R), iron/eddy (laminated core), hysteresis and flux leakage.",
          figures: [{ svg: SVG_TRANSFORMER, caption: "Turns ratio sets the voltage ratio; power (ideally) is conserved." }],
          formulas: [
            { label: "Turns ratio", expr: "V_s/V_p = N_s/N_p = I_p/I_s" },
            { label: "Efficiency", expr: "η = P_out/P_in" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Transformers need AC",
              body:
                "A transformer cannot step DC up or down — steady current gives no changing flux, so no induced secondary EMF. This is the deepest reason power grids use AC.",
            },
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
          title: "Phasor thinking, resonance and power traps",
          theory: "Draw the phasor diagram first; almost every series-AC question falls out of it.",
          callouts: [
            {
              kind: "jee",
              body:
                "- Add **voltages as phasors** (series) or **currents as phasors** (parallel) — never as scalars.\n- Reactances oppose: net reactance = |X_L − X_C|.\n- At resonance Z = R, I is max, cos φ = 1; max current with a variable-frequency source ⇒ use C = 1/(ω²L).\n- Pure L or C ⇒ wattless current (no average power); only R dissipates.\n- A **choke** limits current with negligible power loss.\n- rms is the default for meters/ratings; power uses rms × rms × cos φ.",
            },
            {
              kind: "warning",
              body:
                "- Don't add X_L and X_C — subtract.\n- Don't use peak values in power formulas (use rms).\n- Transformers and induction work on **changing** flux — never DC.\n- Power factor is R/Z, not X/Z.",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Adding X_L and X_C instead of subtracting (they are 180° apart).",
    "Using peak values where rms is required (meters/ratings/power are rms).",
    "Taking average power as V_rms·I_rms (forgetting cos φ).",
    "Using cos φ = X/Z instead of R/Z for the power factor.",
    "Assuming a pure inductor or capacitor dissipates power (it doesn't — wattless).",
    "Adding element voltages arithmetically instead of as phasors.",
    "Forgetting reactances depend on frequency (X_L ∝ ω, X_C ∝ 1/ω).",
    "Thinking a transformer can work on DC.",
    "Confusing series resonance (max current) with parallel resonance (min current).",
    "Forgetting that at resonance Z = R and the current is maximum.",
    "Mislabelling the phase: in L, V leads I; in C, I leads V (use 'CIVIL').",
    "Using a resistor instead of a choke to limit AC (a resistor wastes power).",
    "Taking the full-cycle average of a sinusoid as nonzero (it's zero).",
    "Forgetting Q = (1/R)√(L/C) and that smaller R ⇒ sharper resonance.",
    "Mixing rms and peak in i₀ = V₀/Z vs I_rms = V_rms/Z.",
  ],
  revision: {
    formulaSheet: [
      { label: "RMS", expr: "I_rms = I₀/√2,  V_rms = V₀/√2" },
      { label: "Reactances", expr: "X_L = ωL,  X_C = 1/ωC" },
      { label: "Impedance", expr: "Z = √(R² + (X_L − X_C)²)" },
      { label: "Phase", expr: "tan φ = (X_L − X_C)/R" },
      { label: "Resonance", expr: "ω₀ = 1/√(LC),  Z = R" },
      { label: "Quality factor", expr: "Q = (1/R)√(L/C) = ω₀/Δω" },
      { label: "Power", expr: "P = V_rms I_rms cos φ,  cos φ = R/Z" },
      { label: "LC oscillation", expr: "f = 1/(2π√(LC))" },
      { label: "Transformer", expr: "V_s/V_p = N_s/N_p = I_p/I_s" },
    ],
    conceptMap:
      "AC source ─▶ rms values (I₀/√2) ─▶ elements {R in-phase ; L: V leads I, X_L ; C: I leads V, X_C}\nSeries LCR (phasors) ─▶ Z, phase φ ─▶ Resonance (ω₀=1/√LC, Q) \nPower = V_rms I_rms cosφ (wattless L/C, choke)\nLC oscillations (f=1/2π√LC) ; Transformer (mutual induction, AC only)",
    pyqInsights: [
      "JEE Main: 1–2 questions/shift — reactance/impedance, resonance & resonant frequency, power factor, and transformer ratios.",
      "JEE Advanced: phasor analysis of LCR, resonance/Q & bandwidth, power & choke, and LC oscillation energy.",
      "Numerical answers cluster on impedance, resonant C or f, power/power-factor and rms current.",
    ],
    lastMinuteTips: [
      "rms is the default; V₀ = √2·V_rms.",
      "X_L = ωL grows with f; X_C = 1/ωC falls; net reactance = |X_L − X_C|.",
      "Z = √(R²+(X_L−X_C)²); power factor cos φ = R/Z.",
      "Resonance: ω₀ = 1/√(LC), Z = R, I max, cos φ = 1.",
      "Pure L/C are wattless; use a choke to limit current without loss.",
      "'CIVIL': in C, I leads V; in L, V leads I.",
      "Transformer & induction need AC (changing flux) — never DC.",
    ],
  },
};

export default alternatingCurrent;
