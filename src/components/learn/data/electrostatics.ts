import type { ChapterLearnModule } from "../shared/types";

/* ------------------------------------------------------------------ *
 *  Professional SVG diagrams (theme-aware via currentColor).
 *  Positive charge = red (#dc2626), negative = blue (#2563eb),
 *  field lines / vectors = indigo (#6366f1).
 * ------------------------------------------------------------------ */

const SVG_FRICTION = `<svg viewBox='0 0 380 170' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Charging by friction: electrons transfer from glass to silk'><rect x='30' y='55' width='110' height='55' rx='6' fill='none' stroke='currentColor' stroke-width='2'/><text x='60' y='40' font-size='13' fill='currentColor'>Glass rod</text><text x='52' y='88' font-size='15' fill='#dc2626'>+ + + +</text><rect x='240' y='55' width='110' height='55' rx='6' fill='none' stroke='currentColor' stroke-width='2'/><text x='280' y='40' font-size='13' fill='currentColor'>Silk</text><text x='262' y='88' font-size='15' fill='#2563eb'>− − − −</text><line x1='150' y1='82' x2='228' y2='82' stroke='#6366f1' stroke-width='2'/><polygon points='228,82 219,77 219,87' fill='#6366f1'/><text x='168' y='74' font-size='13' fill='#6366f1'>e⁻ transfer</text><text x='90' y='135' font-size='11' fill='currentColor'>loses electrons</text><text x='258' y='135' font-size='11' fill='currentColor'>gains electrons</text></svg>`;

const SVG_INDUCTION = `<svg viewBox='0 0 400 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Charging by induction with grounding'><rect x='20' y='70' width='70' height='34' rx='6' fill='none' stroke='currentColor' stroke-width='2'/><text x='34' y='92' font-size='15' fill='#dc2626'>+ + +</text><text x='30' y='60' font-size='12' fill='currentColor'>charged rod</text><circle cx='220' cy='90' r='52' fill='none' stroke='currentColor' stroke-width='2'/><text x='150' y='95' font-size='15' fill='#2563eb'>−−</text><text x='262' y='95' font-size='15' fill='#dc2626'>++</text><text x='196' y='160' font-size='12' fill='currentColor'>conductor</text><line x1='262' y1='128' x2='262' y2='150' stroke='currentColor' stroke-width='2'/><line x1='250' y1='150' x2='274' y2='150' stroke='currentColor' stroke-width='2'/><line x1='254' y1='156' x2='270' y2='156' stroke='currentColor' stroke-width='2'/><line x1='258' y1='162' x2='266' y2='162' stroke='currentColor' stroke-width='2'/><text x='280' y='145' font-size='11' fill='currentColor'>ground</text></svg>`;

const SVG_COULOMB = `<svg viewBox='0 0 380 120' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Coulomb force between two positive charges'><circle cx='80' cy='60' r='16' fill='#dc2626'/><text x='74' y='65' font-size='14' fill='#fff'>q₁</text><circle cx='300' cy='60' r='16' fill='#dc2626'/><text x='294' y='65' font-size='14' fill='#fff'>q₂</text><line x1='96' y1='60' x2='300' y2='60' stroke='currentColor' stroke-width='1' stroke-dasharray='4 4'/><text x='185' y='52' font-size='13' fill='currentColor'>r</text><line x1='60' y1='90' x2='20' y2='90' stroke='#6366f1' stroke-width='2.5'/><polygon points='20,90 29,85 29,95' fill='#6366f1'/><text x='30' y='110' font-size='12' fill='#6366f1'>F on q₁</text><line x1='320' y1='90' x2='360' y2='90' stroke='#6366f1' stroke-width='2.5'/><polygon points='360,90 351,85 351,95' fill='#6366f1'/><text x='300' y='110' font-size='12' fill='#6366f1'>F on q₂</text></svg>`;

const SVG_POINT_FIELD = `<svg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Radial electric field of a positive point charge'><defs><marker id='esah1' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><g stroke='#6366f1' stroke-width='1.6' marker-end='url(#esah1)'><line x1='110' y1='110' x2='110' y2='30'/><line x1='110' y1='110' x2='110' y2='190'/><line x1='110' y1='110' x2='30' y2='110'/><line x1='110' y1='110' x2='190' y2='110'/><line x1='110' y1='110' x2='53' y2='53'/><line x1='110' y1='110' x2='167' y2='53'/><line x1='110' y1='110' x2='53' y2='167'/><line x1='110' y1='110' x2='167' y2='167'/></g><circle cx='110' cy='110' r='15' fill='#dc2626'/><text x='105' y='115' font-size='15' fill='#fff'>+</text></svg>`;

const SVG_FIELD_LINES = `<svg viewBox='0 0 420 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Field lines of a dipole and of two like charges'><defs><marker id='esah2' markerWidth='9' markerHeight='9' refX='5' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><circle cx='55' cy='100' r='12' fill='#dc2626'/><text x='51' y='105' font-size='13' fill='#fff'>+</text><circle cx='165' cy='100' r='12' fill='#2563eb'/><text x='162' y='105' font-size='13' fill='#fff'>−</text><g fill='none' stroke='#6366f1' stroke-width='1.5' marker-end='url(#esah2)'><path d='M67,100 L150,100'/><path d='M62,90 Q110,55 158,90'/><path d='M62,110 Q110,145 158,110'/><path d='M60,82 Q110,30 160,82'/><path d='M60,118 Q110,170 160,118'/></g><text x='80' y='192' font-size='12' fill='currentColor'>Dipole (unlike charges)</text><circle cx='285' cy='100' r='12' fill='#dc2626'/><text x='281' y='105' font-size='13' fill='#fff'>+</text><circle cx='375' cy='100' r='12' fill='#dc2626'/><text x='371' y='105' font-size='13' fill='#fff'>+</text><g fill='none' stroke='#6366f1' stroke-width='1.5' marker-end='url(#esah2)'><path d='M285,88 Q330,60 330,40'/><path d='M375,88 Q330,60 330,40'/><path d='M285,112 Q330,140 330,160'/><path d='M375,112 Q330,140 330,160'/><path d='M273,100 L243,100'/><path d='M387,100 L417,100'/></g><text x='292' y='192' font-size='12' fill='currentColor'>Like charges (repel)</text></svg>`;

const SVG_DIPOLE_GEOM = `<svg viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Electric dipole: axial and equatorial points'><circle cx='150' cy='100' r='13' fill='#2563eb'/><text x='146' y='105' font-size='13' fill='#fff'>−</text><circle cx='250' cy='100' r='13' fill='#dc2626'/><text x='246' y='105' font-size='13' fill='#fff'>+</text><line x1='150' y1='100' x2='250' y2='100' stroke='currentColor' stroke-width='1' stroke-dasharray='3 3'/><text x='192' y='118' font-size='12' fill='currentColor'>2a</text><line x1='200' y1='100' x2='285' y2='100' stroke='#6366f1' stroke-width='2.5'/><polygon points='285,100 276,95 276,105' fill='#6366f1'/><text x='243' y='92' font-size='13' fill='#6366f1'>p</text><line x1='250' y1='100' x2='360' y2='100' stroke='currentColor' stroke-width='1'/><circle cx='350' cy='100' r='3' fill='currentColor'/><text x='330' y='92' font-size='12' fill='currentColor'>axial</text><line x1='200' y1='100' x2='200' y2='20' stroke='currentColor' stroke-width='1'/><circle cx='200' cy='30' r='3' fill='currentColor'/><text x='208' y='34' font-size='12' fill='currentColor'>equatorial</text></svg>`;

const SVG_FLUX = `<svg viewBox='0 0 360 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Electric flux through an area at angle theta to the field'><defs><marker id='esah3' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><g stroke='#6366f1' stroke-width='1.6' marker-end='url(#esah3)'><line x1='20' y1='40' x2='120' y2='40'/><line x1='20' y1='80' x2='120' y2='80'/><line x1='20' y1='120' x2='120' y2='120'/><line x1='20' y1='160' x2='120' y2='160'/></g><text x='30' y='30' font-size='13' fill='#6366f1'>E</text><polygon points='200,30 250,55 250,165 200,140' fill='none' stroke='currentColor' stroke-width='2'/><text x='255' y='110' font-size='12' fill='currentColor'>area A</text><line x1='225' y1='95' x2='300' y2='75' stroke='#dc2626' stroke-width='2.5'/><polygon points='300,75 290,73 293,83' fill='#dc2626'/><text x='305' y='72' font-size='13' fill='#dc2626'>n̂ (A)</text><line x1='225' y1='95' x2='320' y2='95' stroke='#6366f1' stroke-width='1' stroke-dasharray='4 3'/><path d='M275,95 A50,50 0 0 0 285,80' fill='none' stroke='currentColor' stroke-width='1.2'/><text x='288' y='92' font-size='12' fill='currentColor'>θ</text></svg>`;

const SVG_GAUSS = `<svg viewBox='0 0 300 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Gaussian surface enclosing a charge with field lines exiting'><defs><marker id='esah4' markerWidth='9' markerHeight='9' refX='5' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><path d='M150,40 C220,35 265,80 255,120 C248,165 190,175 140,168 C85,160 45,120 60,80 C72,48 105,44 150,40 Z' fill='none' stroke='currentColor' stroke-width='2' stroke-dasharray='6 4'/><circle cx='152' cy='103' r='13' fill='#dc2626'/><text x='148' y='108' font-size='14' fill='#fff'>+</text><g stroke='#6366f1' stroke-width='1.5' marker-end='url(#esah4)'><line x1='152' y1='103' x2='152' y2='30'/><line x1='152' y1='103' x2='250' y2='70'/><line x1='152' y1='103' x2='262' y2='118'/><line x1='152' y1='103' x2='150' y2='180'/><line x1='152' y1='103' x2='55' y2='75'/><line x1='152' y1='103' x2='52' y2='128'/></g><text x='200' y='190' font-size='12' fill='currentColor'>Gaussian surface</text></svg>`;

const SVG_LINE_CHARGE = `<svg viewBox='0 0 300 220' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Infinite line charge with coaxial cylindrical Gaussian surface'><defs><marker id='esah5' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><line x1='150' y1='15' x2='150' y2='205' stroke='#dc2626' stroke-width='3'/><text x='130' y='28' font-size='12' fill='#dc2626'>λ</text><ellipse cx='150' cy='55' rx='70' ry='16' fill='none' stroke='currentColor' stroke-width='1.5'/><ellipse cx='150' cy='165' rx='70' ry='16' fill='none' stroke='currentColor' stroke-width='1.5' stroke-dasharray='5 4'/><line x1='80' y1='55' x2='80' y2='165' stroke='currentColor' stroke-width='1.5'/><line x1='220' y1='55' x2='220' y2='165' stroke='currentColor' stroke-width='1.5'/><g stroke='#6366f1' stroke-width='1.6' marker-end='url(#esah5)'><line x1='150' y1='110' x2='225' y2='110'/><line x1='150' y1='110' x2='75' y2='110'/></g><text x='228' y='108' font-size='12' fill='#6366f1'>E</text><text x='225' y='180' font-size='11' fill='currentColor'>length L, radius r</text></svg>`;

const SVG_SHEET = `<svg viewBox='0 0 320 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Infinite plane sheet with a pillbox Gaussian surface'><defs><marker id='esah6' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><line x1='160' y1='20' x2='160' y2='180' stroke='#dc2626' stroke-width='3'/><text x='140' y='35' font-size='12' fill='#dc2626'>σ</text><ellipse cx='110' cy='100' rx='10' ry='34' fill='none' stroke='currentColor' stroke-width='1.5' stroke-dasharray='5 4'/><ellipse cx='210' cy='100' rx='10' ry='34' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='110' y1='66' x2='210' y2='66' stroke='currentColor' stroke-width='1.5'/><line x1='110' y1='134' x2='210' y2='134' stroke='currentColor' stroke-width='1.5'/><g stroke='#6366f1' stroke-width='1.6' marker-end='url(#esah6)'><line x1='160' y1='90' x2='250' y2='90'/><line x1='160' y1='110' x2='70' y2='110'/></g><text x='250' y='90' font-size='12' fill='#6366f1'>E</text><text x='62' y='112' font-size='12' fill='#6366f1'>E</text></svg>`;

const SVG_COND_SPHERE = `<svg viewBox='0 0 420 180' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Electric field and potential versus distance for a charged conducting sphere'><line x1='30' y1='150' x2='190' y2='150' stroke='currentColor' stroke-width='1.5'/><line x1='30' y1='150' x2='30' y2='30' stroke='currentColor' stroke-width='1.5'/><text x='12' y='40' font-size='12' fill='currentColor'>E</text><text x='178' y='168' font-size='12' fill='currentColor'>r</text><line x1='30' y1='150' x2='90' y2='150' stroke='#2563eb' stroke-width='2.5'/><path d='M90,55 C120,95 150,125 185,140' fill='none' stroke='#2563eb' stroke-width='2.5'/><line x1='90' y1='150' x2='90' y2='30' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='82' y='166' font-size='11' fill='currentColor'>R</text><text x='40' y='45' font-size='10' fill='#2563eb'>E = kQ/r²</text><line x1='240' y1='150' x2='400' y2='150' stroke='currentColor' stroke-width='1.5'/><line x1='240' y1='150' x2='240' y2='30' stroke='currentColor' stroke-width='1.5'/><text x='224' y='40' font-size='12' fill='currentColor'>V</text><text x='388' y='168' font-size='12' fill='currentColor'>r</text><line x1='240' y1='60' x2='300' y2='60' stroke='#dc2626' stroke-width='2.5'/><path d='M300,60 C330,95 360,125 395,140' fill='none' stroke='#dc2626' stroke-width='2.5'/><line x1='300' y1='150' x2='300' y2='30' stroke='currentColor' stroke-width='0.8' stroke-dasharray='3 3'/><text x='292' y='166' font-size='11' fill='currentColor'>R</text><text x='248' y='52' font-size='10' fill='#dc2626'>V = kQ/R</text></svg>`;

const SVG_EQUIPOTENTIAL = `<svg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Equipotential circles and radial field lines around a point charge'><defs><marker id='esah7' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><circle cx='110' cy='110' r='35' fill='none' stroke='currentColor' stroke-width='1.3' stroke-dasharray='5 4'/><circle cx='110' cy='110' r='62' fill='none' stroke='currentColor' stroke-width='1.3' stroke-dasharray='5 4'/><circle cx='110' cy='110' r='88' fill='none' stroke='currentColor' stroke-width='1.3' stroke-dasharray='5 4'/><g stroke='#6366f1' stroke-width='1.5' marker-end='url(#esah7)'><line x1='110' y1='110' x2='110' y2='14'/><line x1='110' y1='110' x2='206' y2='110'/><line x1='110' y1='110' x2='42' y2='42'/><line x1='110' y1='110' x2='178' y2='178'/></g><circle cx='110' cy='110' r='12' fill='#dc2626'/><text x='106' y='115' font-size='13' fill='#fff'>+</text><text x='150' y='30' font-size='11' fill='currentColor'>equipotentials ⟂ field</text></svg>`;

const SVG_DIPOLE_FIELD = `<svg viewBox='0 0 340 200' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Dipole in a uniform field experiencing a torque'><defs><marker id='esah8' markerWidth='9' markerHeight='9' refX='6' refY='3' orient='auto'><path d='M0,0 L6,3 L0,6 Z' fill='#6366f1'/></marker></defs><g stroke='#6366f1' stroke-width='1.4' marker-end='url(#esah8)'><line x1='20' y1='35' x2='320' y2='35'/><line x1='20' y1='165' x2='320' y2='165'/></g><text x='25' y='26' font-size='13' fill='#6366f1'>E</text><circle cx='130' cy='130' r='12' fill='#2563eb'/><text x='126' y='135' font-size='12' fill='#fff'>−</text><circle cx='210' cy='70' r='12' fill='#dc2626'/><text x='206' y='75' font-size='12' fill='#fff'>+</text><line x1='130' y1='130' x2='210' y2='70' stroke='currentColor' stroke-width='1' stroke-dasharray='3 3'/><line x1='210' y1='70' x2='265' y2='70' stroke='#dc2626' stroke-width='2.5'/><polygon points='265,70 256,65 256,75' fill='#dc2626'/><text x='240' y='62' font-size='11' fill='#dc2626'>+qE</text><line x1='130' y1='130' x2='75' y2='130' stroke='#dc2626' stroke-width='2.5'/><polygon points='75,130 84,125 84,135' fill='#dc2626'/><text x='78' y='148' font-size='11' fill='#dc2626'>−qE</text><text x='150' y='112' font-size='12' fill='currentColor'>p</text></svg>`;

export const electrostatics: ChapterLearnModule = {
  slug: "electrostatics",
  chapter: "Electrostatics",
  exams: "JEE Main · JEE Advanced · NEET",
  summary:
    "Charges at rest — from the quantum of charge to Coulomb's law, fields, dipoles, Gauss's law, potential and conductors. Built from first principles to JEE Advanced depth.",
  sections: [
    {
      id: "big-picture",
      title: "1 · The Big Picture",
      intro:
        "Electrostatics studies charges **at rest** and the forces, fields and energies they create. It is the foundation of all of electromagnetism — and of the electronics that run the modern world.",
      topics: [
        {
          id: "why-electrostatics",
          title: "Why this chapter matters",
          theory:
            "Every electrical phenomenon — from a spark of static to the transistors in your phone — begins with electric charge. Electrostatics is where you learn the **rules of the game**: how charges push and pull (Coulomb's law), how they fill space with influence (the electric field), and how energy is stored (potential).\n\nMechanically, electrostatics is a beautiful playground: it reuses vectors, calculus and energy conservation, but adds the new ingredient of the **inverse-square field**. Master it and the rest of electromagnetism (current, magnetism, induction, EM waves) falls into place.",
          callouts: [
            {
              kind: "history",
              title: "A 2500-year story",
              body:
                "- **Thales (~600 BC):** amber (Greek *elektron*) rubbed with fur attracts bits of straw — the word *electricity* is born.\n- **Coulomb (1785):** measures the force law with a torsion balance — F ∝ q₁q₂/r².\n- **Faraday (1830s):** invents the **field** and field-line picture; shielding (the Faraday cage).\n- **Gauss:** recasts the inverse-square law as a flux theorem — Gauss's law.\n- **Maxwell (1860s):** unifies it all into four equations; Gauss's law is the first.",
            },
            {
              kind: "tip",
              title: "Where you meet it in real life",
              body:
                "- **Lightning** — charge separation in clouds → giant spark.\n- **Capacitors** — store charge/energy in every circuit.\n- **Touchscreens** — capacitive sensing of your finger.\n- **Photocopiers & laser printers** — charged drum attracts toner.\n- **Electrostatic precipitators** — clean smoke in power plants.\n- **Semiconductors** — fields control electrons in every chip.",
            },
          ],
        },
      ],
    },
    {
      id: "charge",
      title: "2 · Electric Charge",
      topics: [
        {
          id: "nature-of-charge",
          title: "The fundamental nature of charge",
          theory:
            "**Charge** is an intrinsic property of matter, like mass — but unlike mass it comes in **two kinds**, called positive and negative (Franklin's convention). Like charges repel; unlike charges attract.\n\nCharge resides on the fundamental particles: the **electron** carries −e and the **proton** carries +e, where e = 1.6 × 10⁻¹⁹ C. In ordinary matter the mobile charge carriers are **electrons** (in metals) or **ions** (in electrolytes and gases). Rubbing two bodies transfers electrons — it never creates charge.",
          intuition:
            "Charge is just 'electrical mass'. Mass makes gravity; charge makes the electric force. The big difference: gravity only pulls, but charge can both pull and push — that two-sidedness is what makes electricity so rich.",
          figures: [{ svg: SVG_FRICTION, caption: "Friction transfers electrons; charge is conserved, not created." }],
          callouts: [
            {
              kind: "note",
              title: "SI unit",
              body:
                "Charge is measured in **coulombs (C)**. 1 C is a huge charge — the charge of about 6.25 × 10¹⁸ electrons. In problems you'll usually see μC (10⁻⁶) or nC (10⁻⁹).",
            },
          ],
        },
        {
          id: "properties-of-charge",
          title: "The three properties: additivity, conservation, quantization",
          theory:
            "**1. Additivity** — charge is a scalar; the total charge of a body is the algebraic sum of all its charges: q = q₁ + q₂ + … (with signs).\n\n**2. Conservation** — the total charge of an isolated system is constant. Charge can be transferred or created in ± pairs (e.g. pair production γ → e⁻ + e⁺), but the net charge never changes.\n\n**3. Quantization** — charge always comes in integer multiples of e: **q = ± n e**, n = 1, 2, 3 … You can never isolate a charge of, say, 0.5 e. (Quarks carry ±e/3, ±2e/3 but are permanently confined inside particles, so free charge is still quantized in units of e.)",
          formulas: [
            { label: "Quantization", expr: "q = n·e,  n ∈ ℤ", note: "e = 1.6 × 10⁻¹⁹ C" },
            { label: "Number of electrons", expr: "n = q / e", note: "for a charge of magnitude q" },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A body has a charge of −1.6 μC. How many **excess electrons** does it carry?",
              solution:
                "Quantization: n = q/e = (1.6 × 10⁻⁶)/(1.6 × 10⁻¹⁹) = 1.0 × 10¹³ electrons.\nThe sign is negative, so these are **excess** electrons.",
              answer: "10¹³ electrons",
            },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Quantization in JEE",
              body:
                "At macroscopic scales e is so tiny that charge looks continuous (we happily write 'a charge dq'). Quantization matters only in 'how many electrons' counting problems and in Millikan-type questions.",
            },
          ],
          mistakes: [
            "Forgetting that **gaining electrons makes a body negative** (electrons are negative).",
            "Treating charge as a vector — it is a **scalar**; only the force/field it produces is a vector.",
          ],
        },
      ],
    },
    {
      id: "conductors-insulators",
      title: "3 · Conductors & Insulators",
      topics: [
        {
          id: "conductors-insulators-theory",
          title: "Conductors, insulators and semiconductors",
          theory:
            "Materials differ in how freely charge moves through them:\n\n- **Conductors** (metals, human body, earth) have a sea of **free electrons** — roughly one per atom — that drift easily. Charge given to a conductor spreads over its surface almost instantly.\n- **Insulators / dielectrics** (glass, rubber, plastic) have all electrons tightly bound. Charge stays where you put it.\n- **Semiconductors** (Si, Ge) sit in between: very few free carriers at room temperature, but conductivity rises sharply with temperature, light or doping — the basis of all electronics.",
          intuition:
            "Think of free electrons as water and the material as the pipe. A conductor is an open pipe — charge flows freely. An insulator is a blocked pipe — charge is stuck. A semiconductor is a valve you can open with heat, light or doping.",
          callouts: [
            {
              kind: "note",
              title: "Mobility",
              body:
                "**Mobility** μ = drift speed per unit field. High mobility ⇒ good conductor. Conductivity σ = n e μ, where n is the free-carrier density.",
            },
          ],
          jeeNotes: [
            "Earth is treated as an **infinite reservoir** of charge: connecting a conductor to earth (grounding) brings it to zero potential.",
            "Charge on a conductor lives **only on the outer surface** (proved later with Gauss's law).",
          ],
        },
      ],
    },
    {
      id: "charging-methods",
      title: "4 · Methods of Charging",
      topics: [
        {
          id: "charging-methods-theory",
          title: "Friction, conduction and induction",
          theory:
            "**By friction:** rubbing transfers electrons from one body to the other; one becomes + and the other equally −. (Glass–silk: glass loses electrons → +.)\n\n**By conduction:** touching a charged body to a neutral conductor shares charge; both end up with the **same sign**. The charge divides according to size/capacitance.\n\n**By induction:** bring a charged body **near** (without touching) a conductor. The free charges rearrange — opposite charge on the near face, like charge on the far face. **Ground** the far face so the like charge flows to earth, then remove the ground and finally the inducing body: the conductor is left with charge **opposite** to the inducer — and the inducer keeps its charge (nothing was transferred from it).",
          figures: [{ svg: SVG_INDUCTION, caption: "Induction: near face draws unlike charge; grounding drains the like charge." }],
          callouts: [
            {
              kind: "warning",
              title: "The #1 induction trap",
              body:
                "In **induction**, the inducing charge is **not** consumed — it keeps its full charge. The induced body gains a charge of the **opposite** sign and (for a single grounded conductor) generally **not** equal in magnitude to the inducer.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A positively charged rod is brought near (not touching) an isolated neutral metal sphere. (a) What is the net charge of the sphere? (b) What is the sign of charge on the near side?",
              solution:
                "(a) Nothing is transferred, so the **net charge stays zero**.\n(b) Free electrons are attracted toward the rod, so the **near side is negative** (and the far side positive).",
              answer: "(a) zero  (b) negative on the near side",
            },
          ],
        },
        {
          id: "charging-comparison",
          title: "Comparison table",
          theory:
            "| Method | Contact? | Sign on body | Inducer affected? |\n|---|---|---|---|\n| Friction | Yes (rubbing) | opposite to other body | yes (gets opposite) |\n| Conduction | Yes (touch) | **same** as source | yes (loses some) |\n| Induction | No | **opposite** to inducer | **no** (unchanged) |\n\n(Rendered as plain text; see the bullets below for the key contrasts.)",
          callouts: [
            {
              kind: "tip",
              body:
                "- **Same sign** ⇒ conduction.\n- **Opposite sign, no contact, inducer unchanged** ⇒ induction.\n- **Opposite sign on the two rubbed bodies** ⇒ friction.",
            },
          ],
        },
      ],
    },
    {
      id: "coulomb",
      title: "5 · Coulomb's Law",
      topics: [
        {
          id: "coulomb-law",
          title: "Statement, formula and vector form",
          theory:
            "Coulomb measured the force between two **point charges** with a torsion balance and found it is (i) proportional to each charge, (ii) inversely proportional to the square of their separation, and (iii) directed along the line joining them.",
          derivation:
            "Experimentally:\n  F ∝ q₁q₂   (at fixed r)\n  F ∝ 1/r²   (at fixed charges)\nCombine:\n  F ∝ q₁q₂ / r²\n  F = k · q₁q₂ / r²,  with k = 1/(4πε₀) = 9 × 10⁹ N·m²/C².\n\nVector form (force on charge 2 due to charge 1):\n  F₂₁ = (1/4πε₀)·(q₁q₂/r²)· r̂₂₁\nwhere r̂₂₁ points from 1 to 2. Like charges (q₁q₂ > 0) ⇒ force along r̂ (repulsive); unlike (q₁q₂ < 0) ⇒ opposite (attractive).",
          figures: [{ svg: SVG_COULOMB, caption: "Equal and opposite forces along the line of centres (Newton's third law)." }],
          formulas: [
            { label: "Coulomb's Law", expr: "F = (1/4πε₀)·q₁q₂/r²", note: "1/4πε₀ = 9 × 10⁹ SI" },
            { label: "Vector form", expr: "F₂₁ = k q₁q₂ r̂₂₁ / r²" },
            { label: "In a medium", expr: "F_medium = F_vacuum / K", note: "K = dielectric constant (relative permittivity)" },
          ],
          intuition:
            "Coulomb's law is gravity's electric cousin: same 1/r² shape, but ~10³⁶ times stronger and able to repel as well as attract. The inverse-square comes from influence spreading over a sphere of area 4πr² — double the distance, quarter the force.",
          callouts: [
            {
              kind: "note",
              title: "Coulomb vs Newton's gravity",
              body:
                "- Both ∝ 1/r², both along the line of centres, both obey superposition.\n- Gravity is **always attractive**; Coulomb can attract **or** repel.\n- Electric force is enormously stronger: F_e/F_g ≈ 10³⁶ for two electrons.",
            },
            {
              kind: "jee",
              title: "Why exactly inverse-square?",
              body:
                "Gauss's law and the masslessness of the photon both require the exponent to be exactly 2. Experiments confirm 1/r^(2±δ) with |δ| < 10⁻¹⁶ — one of the most precisely tested laws in physics.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "Two point charges +4 μC and +9 μC are 1 m apart in vacuum. Find the force between them.",
              solution:
                "F = k q₁q₂/r² = 9×10⁹ × (4×10⁻⁶)(9×10⁻⁶) / (1)²\n  = 9×10⁹ × 36×10⁻¹² = 0.324 N (repulsive).",
              answer: "0.324 N, repulsive",
            },
            {
              level: "JEE Advanced",
              problem:
                "Two identical balls each of mass m and charge q hang from a common point by silk threads of length ℓ. At equilibrium each thread makes a small angle θ with the vertical. Show that the separation x ≈ ( q²ℓ / (2πε₀ m g) )^(1/3).",
              solution:
                "Each ball: tension T, weight mg, Coulomb force F = kq²/x² horizontal.\nEquilibrium: T sinθ = F,  T cosθ = mg ⇒ tanθ = F/mg.\nFor small θ, tanθ ≈ sinθ = (x/2)/ℓ.\nSo (x/2ℓ) = kq²/(x²·mg) ⇒ x³ = 2ℓ k q²/(mg) = q²ℓ/(2πε₀ mg).\nHence x = ( q²ℓ / (2πε₀ m g) )^(1/3).",
              answer: "x = ( q²ℓ / 2πε₀ m g )^(1/3)",
            },
          ],
          mistakes: [
            "Plugging the **signs** of charges into the magnitude formula — use magnitudes for |F|, then decide direction by attraction/repulsion.",
            "Forgetting r is the distance **between** the charges, and the formula is only exact for **point** charges (or spherically symmetric bodies, using centre-to-centre distance).",
            "Using F_medium = K·F instead of F/K — a dielectric **reduces** the force.",
          ],
        },
      ],
    },
    {
      id: "superposition",
      title: "6 · Principle of Superposition",
      topics: [
        {
          id: "superposition-theory",
          title: "Adding the effects of many charges",
          theory:
            "Coulomb's law is for **two** charges. For many charges, the **net force** (or field) on a charge is the **vector sum** of the forces (fields) due to each other charge, computed as if the others were absent:\n  F_net = F₁ + F₂ + F₃ + …\nThe interactions are independent — a third charge does not modify the force between the first two.",
          intuition:
            "Superposition is the statement that charges 'don't interfere' with each other's pull. Each pair talks privately; you just add up all the conversations as vectors.",
          callouts: [
            {
              kind: "tip",
              title: "Symmetry first",
              body:
                "Before grinding through components, look for symmetry. Charges placed symmetrically often produce fields/forces that **cancel** along one axis, leaving only a single surviving component. This converts a messy vector sum into a one-line answer.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "Three equal charges +q sit at the corners of an equilateral triangle of side a. Find the net force on any one charge.",
              solution:
                "Each of the other two exerts F = kq²/a². The angle between the two force vectors is 60°.\nResultant = √(F² + F² + 2F²cos60°) = F√3 = √3·kq²/a², directed away from the centroid.",
              answer: "√3 · kq²/a², radially outward",
            },
          ],
        },
      ],
    },
    {
      id: "electric-field",
      title: "7 · Electric Field",
      topics: [
        {
          id: "field-concept",
          title: "From action-at-a-distance to the field",
          theory:
            "How does charge 1 'know' charge 2 is there across empty space? Newton was uneasy about such **action at a distance**. Faraday's answer: a charge fills the space around it with an **electric field** E; a second charge feels a local force from the field at its own location. The field is the real, physical intermediary (it even carries energy and momentum).",
          derivation:
            "Define the field as the **force per unit positive test charge**:\n  E = F / q₀   (take q₀ → 0 so it doesn't disturb the source)\nUnits: N/C = V/m. E is a **vector**, pointing the way a + charge would be pushed.\n\nField of a point charge Q at distance r:\n  E = (1/4πε₀)·Q/r²,  directed radially (outward for +Q, inward for −Q).\nForce on a charge q placed in a field: F = qE.",
          figures: [{ svg: SVG_POINT_FIELD, caption: "Field of a positive point charge: radially outward, weakening as 1/r²." }],
          formulas: [
            { label: "Definition", expr: "E = F/q₀", note: "N/C or V/m" },
            { label: "Point charge", expr: "E = kQ/r²  (r̂)" },
            { label: "Force on a charge", expr: "F = qE" },
          ],
          intuition:
            "The field is a 'force map' of space: stand a +1 C charge anywhere and the arrow E tells you which way and how hard it gets pushed. The source charge paints this map whether or not anyone is there to feel it.",
          callouts: [
            {
              kind: "warning",
              title: "Direction for negative charges",
              body:
                "E always points the way a **positive** charge would move. A **negative** charge feels a force **opposite** to E (F = qE with q < 0).",
            },
          ],
          jeeNotes: [
            "Test charge must be vanishingly small so it doesn't redistribute the source charges — hence the limit q₀ → 0.",
            "Field is defined at **every point** of space, even where there is no charge to feel it.",
          ],
        },
      ],
    },
    {
      id: "field-distributions",
      title: "8 · Field due to Charge Distributions",
      intro:
        "For continuous charge, slice into elements dq, write dE for each, and **integrate** — using symmetry to kill components. Linear density λ (C/m), surface σ (C/m²), volume ρ (C/m³).",
      topics: [
        {
          id: "field-ring",
          title: "Ring of charge (on its axis)",
          theory:
            "A ring of radius R carries total charge Q. Find E at a point P on the axis, distance x from the centre.",
          derivation:
            "Each element dq is at distance √(R²+x²) from P. By symmetry the components perpendicular to the axis cancel around the ring; only the axial component survives.\n  dE_axial = k dq/(R²+x²) · cosθ,  cosθ = x/√(R²+x²)\nIntegrate (∫dq = Q):\n  E = kQx / (R²+x²)^(3/2),  along the axis.\nLimits: x = 0 ⇒ E = 0 (centre). x ≫ R ⇒ E ≈ kQ/x² (looks like a point charge).\nE is maximum at x = R/√2.",
          formulas: [
            { label: "Ring (axis)", expr: "E = kQx/(R²+x²)^{3/2}" },
            { label: "E max at", expr: "x = R/√2" },
          ],
          jeeNotes: [
            "At the **centre** of a uniformly charged ring, E = 0 but V ≠ 0 (V = kQ/R).",
            "A common Advanced twist: a charged particle released on the axis executes **SHM** for small x (since E ∝ x near the centre).",
          ],
        },
        {
          id: "field-line-charge",
          title: "Infinite line charge",
          theory: "A very long straight wire with uniform linear density λ.",
          derivation:
            "By symmetry E is radial (perpendicular to the wire) and depends only on the perpendicular distance r. Integrating Coulomb contributions (or, faster, by Gauss's law later):\n  E = λ / (2πε₀ r) = 2kλ / r.\nNote the **1/r** dependence (not 1/r²) — that's the signature of a line.",
          formulas: [{ label: "Infinite line", expr: "E = λ/(2πε₀ r) = 2kλ/r" }],
        },
        {
          id: "field-sheet-disc",
          title: "Charged disc and infinite sheet",
          theory: "A uniformly charged disc (surface density σ, radius R) on its axis, and its limiting cases.",
          derivation:
            "Treat the disc as nested rings and integrate the ring result:\n  E = (σ/2ε₀)·[ 1 − x/√(R²+x²) ],  on the axis at distance x.\nLimits:\n  • R → ∞ (infinite sheet):  E = σ/(2ε₀), **uniform**, independent of distance.\n  • x ≫ R (far away):  E ≈ kQ/x² (point charge).",
          figures: [{ svg: SVG_SHEET, caption: "An infinite sheet produces a uniform field σ/2ε₀ on each side." }],
          formulas: [
            { label: "Disc (axis)", expr: "E = (σ/2ε₀)[1 − x/√(R²+x²)]" },
            { label: "Infinite sheet", expr: "E = σ/(2ε₀)", note: "uniform, ⟂ to the sheet" },
            { label: "Conductor surface", expr: "E = σ/ε₀", note: "just outside a charged conductor" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "σ/2ε₀ vs σ/ε₀",
              body:
                "An **infinite sheet** (charge on both faces / thin sheet) gives **σ/2ε₀**. The field **just outside a charged conductor's surface** is **σ/ε₀** (the factor 2 difference is a classic trap).",
            },
          ],
        },
      ],
    },
    {
      id: "field-lines",
      title: "9 · Electric Field Lines",
      topics: [
        {
          id: "field-lines-theory",
          title: "Drawing and reading field lines",
          theory:
            "Field lines are Faraday's visual tool: imaginary curves whose **tangent** gives the direction of E and whose **density** (lines per unit area) gives the **magnitude** of E. They start on + charges and end on − charges (or at infinity).",
          figures: [{ svg: SVG_FIELD_LINES, caption: "Dipole field lines run + → −; like charges push their lines apart with a neutral point between." }],
          callouts: [
            {
              kind: "note",
              title: "Properties of field lines",
              body:
                "- Start on +, end on − (or ∞); never form closed loops in electrostatics.\n- **Never intersect** — two tangents would mean two directions of E at one point (impossible).\n- Where lines crowd together, E is strong; where they spread out, E is weak.\n- Lines meet a conductor surface **perpendicularly** (no tangential field).\n- They are not real paths of motion — just a map.",
            },
          ],
          mistakes: [
            "Drawing field lines that **cross** — forbidden.",
            "Forgetting the **arrowhead**: a line from − to + is drawn backwards.",
            "Thinking a charge moves **along** a field line — it follows the **force**, but its path curves only if released from rest; otherwise its velocity carries it across lines.",
          ],
        },
      ],
    },
    {
      id: "dipole",
      title: "10 · Electric Dipole",
      topics: [
        {
          id: "dipole-basics",
          title: "Dipole moment, axial and equatorial fields",
          theory:
            "An **electric dipole** is two equal and opposite charges +q and −q separated by a small distance 2a. Its **dipole moment** is p = q·(2a), a vector pointing from −q **to** +q. Dipoles model polar molecules (H₂O, HCl) and antennas.",
          derivation:
            "**Axial point** (on the line of the dipole, distance r from centre):\n  E_axial = k·2pr/(r²−a²)²  →  (short dipole, r ≫ a)  E_axial = 2kp/r³, parallel to p.\n\n**Equatorial point** (perpendicular bisector, distance r):\n  E_equ = kp/(r²+a²)^{3/2}  →  (r ≫ a)  E_equ = kp/r³, anti-parallel to p.\n\nSo for a short dipole: **E_axial = 2·E_equ**, and both fall as **1/r³** (faster than a point charge's 1/r²).",
          figures: [{ svg: SVG_DIPOLE_GEOM, caption: "p points from −q to +q; axial and equatorial reference points." }],
          formulas: [
            { label: "Dipole moment", expr: "p = q·(2a)", note: "vector, − → +" },
            { label: "Axial (short)", expr: "E = 2kp/r³  (∥ p)" },
            { label: "Equatorial (short)", expr: "E = kp/r³  (anti-∥ p)" },
            { label: "General point", expr: "E = (kp/r³)√(1+3cos²θ)" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Key contrasts",
              body:
                "- Dipole field ∝ **1/r³** (point charge ∝ 1/r²) — dies out faster.\n- Axial is **twice** equatorial and **along** p; equatorial is **opposite** to p.\n- Net charge of a dipole is zero, yet it still makes a field.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "A short dipole of moment 4 × 10⁻⁹ C·m is placed at the origin along +x. Find E at 0.2 m on the axis. (k = 9×10⁹)",
              solution:
                "E_axial = 2kp/r³ = 2 × 9×10⁹ × 4×10⁻⁹ / (0.2)³\n  = 72 / 0.008 = 9000 N/C, along +x.",
              answer: "9000 N/C along the axis",
            },
          ],
          mistakes: [
            "Using point-charge 1/r² for a dipole — it's **1/r³** for a short dipole.",
            "Getting the **direction** wrong: equatorial field is **anti-parallel** to p.",
            "Applying the short-dipole formulas when r is **not** ≫ a.",
          ],
        },
      ],
    },
    {
      id: "dipole-field",
      title: "11 · Dipole in an External Field",
      topics: [
        {
          id: "dipole-torque-energy",
          title: "Torque, energy and equilibrium",
          theory:
            "Place a dipole in a **uniform** field E. The two charges feel equal and opposite forces +qE and −qE — **zero net force**, but a **couple** that tries to align p with E.",
          derivation:
            "Torque (magnitude): τ = (qE)(2a sinθ) = pE sinθ ⇒  τ = p × E.\nWork to rotate from θ₁ to θ₂ against the field is stored as potential energy:\n  U = ∫ τ dθ = −pE cosθ + C.\nChoosing U = 0 at θ = 90°:  U = −p·E = −pE cosθ.\nEquilibria:\n  • θ = 0 (p ∥ E): U = −pE (minimum) ⇒ **stable**.\n  • θ = 180° (p anti-∥ E): U = +pE (maximum) ⇒ **unstable**.\nFor small θ the dipole executes **angular SHM** with T = 2π√(I/pE).",
          figures: [{ svg: SVG_DIPOLE_FIELD, caption: "Equal and opposite forces form a couple — net torque pE sinθ, no net force (uniform field)." }],
          formulas: [
            { label: "Torque", expr: "τ = pE sinθ  (= p × E)" },
            { label: "Potential energy", expr: "U = −pE cosθ  (= −p·E)" },
            { label: "Net force (uniform E)", expr: "F = 0" },
            { label: "Oscillation period", expr: "T = 2π√(I/pE)" },
          ],
          callouts: [
            {
              kind: "warning",
              title: "Uniform vs non-uniform field",
              body:
                "In a **uniform** field the net force is zero (only torque). In a **non-uniform** field there is also a net force F = p·(dE/dx) — this is why a charged comb attracts neutral (polarizable) paper bits.",
            },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "A dipole p is rotated from its stable position to a position making 60° with a uniform field E. Find the work done.",
              solution:
                "W = ΔU = U(60°) − U(0°) = (−pE cos60°) − (−pE cos0°)\n  = −pE(½) + pE = pE(1 − ½) = pE/2.",
              answer: "W = pE/2",
            },
          ],
        },
      ],
    },
    {
      id: "flux",
      title: "12 · Electric Flux",
      topics: [
        {
          id: "flux-theory",
          title: "Flux and the area vector",
          theory:
            "Electric **flux** measures how many field lines thread through a surface. An area is represented by a **vector A** of magnitude equal to the area, pointing along the **normal** n̂.",
          derivation:
            "For a flat area A in a uniform field E:\n  Φ = E·A = EA cosθ,\nwhere θ is the angle between E and the normal n̂.\n  • θ = 0 (field ⟂ surface): Φ = EA (maximum).\n  • θ = 90° (field ∥ surface): Φ = 0 (no lines pierce it).\nFor a curved surface / varying field: Φ = ∮ E·dA.\nUnits: N·m²/C (= V·m).",
          figures: [{ svg: SVG_FLUX, caption: "Only the component of E along the normal n̂ contributes: Φ = EA cosθ." }],
          formulas: [
            { label: "Uniform field", expr: "Φ = E·A = EA cosθ" },
            { label: "General", expr: "Φ = ∮ E·dA" },
          ],
          intuition:
            "Flux is like rain through a window. Hold the window face-on to the rain (θ = 0) and maximum rain enters; turn it edge-on (θ = 90°) and none does. Only the perpendicular component counts.",
          callouts: [
            {
              kind: "note",
              title: "Sign convention",
              body:
                "For a **closed** surface, the normal points **outward**. Lines leaving the surface give **positive** flux; lines entering give **negative** flux.",
            },
          ],
        },
      ],
    },
    {
      id: "gauss",
      title: "13 · Gauss's Law",
      topics: [
        {
          id: "gauss-theory",
          title: "Statement and meaning",
          theory:
            "Gauss's law states that the **net electric flux** through any **closed** surface equals the **charge enclosed** divided by ε₀ — independent of the shape of the surface or where the charge sits inside.",
          derivation:
            "  ∮ E·dA = Q_enc / ε₀.\nWhy it works (for a point charge): flux through a sphere of radius r is\n  Φ = E·(4πr²) = (kQ/r²)(4πr²) = 4πkQ = Q/ε₀  (since k = 1/4πε₀).\nThe r² cancels — the result is independent of r, and (by the solid-angle argument) of the surface shape. Charges **outside** the surface contribute zero net flux (every line that enters also leaves).",
          figures: [{ svg: SVG_GAUSS, caption: "Net outward flux depends only on the enclosed charge, not the surface's shape." }],
          formulas: [{ label: "Gauss's Law", expr: "∮ E·dA = Q_enc/ε₀" }],
          callouts: [
            {
              kind: "jee",
              title: "What Gauss's law does and doesn't say",
              body:
                "- The **flux** depends only on enclosed charge. But the **field E** on the surface depends on **all** charges (inside and outside).\n- Gauss's law is **always true**, but only **useful for finding E** when there is high symmetry (spherical, cylindrical, planar) so E can be pulled out of the integral.",
            },
          ],
          mistakes: [
            "Thinking outside charges don't affect E on the surface — they do; they just contribute **zero net flux**.",
            "Using Gauss's law to get E without enough symmetry.",
          ],
        },
      ],
    },
    {
      id: "gauss-applications",
      title: "14 · Applications of Gauss's Law",
      intro:
        "Pick a Gaussian surface matching the symmetry so E is constant and either ⟂ or ∥ to the surface. Then ∮E·dA reduces to E × (area).",
      topics: [
        {
          id: "gauss-line",
          title: "Infinite line charge",
          theory: "Linear density λ. Use a **coaxial cylinder** of radius r, length L.",
          derivation:
            "Flux through curved side only (ends are parallel to E):\n  E·(2πrL) = Q_enc/ε₀ = (λL)/ε₀\n  ⇒ E = λ/(2πε₀ r) = 2kλ/r,  radial.",
          figures: [{ svg: SVG_LINE_CHARGE, caption: "Coaxial cylinder: flux only through the curved surface." }],
          formulas: [{ label: "Line charge", expr: "E = λ/(2πε₀ r)" }],
        },
        {
          id: "gauss-sheet",
          title: "Infinite plane sheet & two sheets",
          theory: "Surface density σ. Use a **pillbox** (cylinder) piercing the sheet.",
          derivation:
            "Flux through the two end caps (area A each):\n  E·A + E·A = Q_enc/ε₀ = σA/ε₀\n  ⇒ E = σ/(2ε₀),  uniform, ⟂ to the sheet.\n\n**Two parallel sheets** +σ and −σ:\n  • Between them: fields add ⇒ E = σ/ε₀.\n  • Outside: fields cancel ⇒ E = 0.\nThis is the parallel-plate capacitor field.",
          formulas: [
            { label: "Single sheet", expr: "E = σ/(2ε₀)" },
            { label: "Between ±σ sheets", expr: "E = σ/ε₀" },
            { label: "Outside ±σ sheets", expr: "E = 0" },
          ],
        },
        {
          id: "gauss-spheres",
          title: "Spherical shell, conducting & non-conducting sphere",
          theory:
            "Use a **concentric spherical** Gaussian surface of radius r.",
          derivation:
            "**Thin shell / conducting sphere** (charge Q on the surface, radius R):\n  • r < R: Q_enc = 0 ⇒ **E = 0** inside.\n  • r ≥ R: E·4πr² = Q/ε₀ ⇒ E = kQ/r² (acts like a point charge at the centre).\n  Surface is an equipotential; V = kQ/R inside and on it.\n\n**Solid non-conducting sphere** (uniform volume density ρ, total Q, radius R):\n  • r ≤ R: Q_enc = Q(r³/R³) ⇒ E = kQr/R³ (grows **linearly** with r).\n  • r ≥ R: E = kQ/r² (point charge).\n  E is maximum at the surface (r = R).",
          figures: [{ svg: SVG_COND_SPHERE, caption: "Charged conducting sphere: E = 0 inside, kQ/r² outside; V is constant inside, kQ/R at the surface." }],
          formulas: [
            { label: "Shell, r<R", expr: "E = 0" },
            { label: "Shell, r≥R", expr: "E = kQ/r²" },
            { label: "Solid, r≤R", expr: "E = kQr/R³" },
            { label: "Solid, r≥R", expr: "E = kQ/r²" },
          ],
          examples: [
            {
              level: "JEE Advanced",
              problem:
                "A solid non-conducting sphere of radius R has uniform charge density ρ. At what distances from the centre is the field equal to half its maximum value?",
              solution:
                "E is maximum at the surface: E_max = kQ/R² = ρR/3ε₀.\nInside (r ≤ R): E = ρr/3ε₀ = E_max/2 ⇒ r = R/2.\nOutside (r ≥ R): E = ρR³/3ε₀r² = E_max/2 ⇒ r² = 2R² ⇒ r = √2·R.\nSo at **r = R/2** (inside) and **r = √2 R** (outside).",
              answer: "r = R/2 and r = √2 R",
            },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Inside-field summary",
              body:
                "- Hollow shell / conductor: **E = 0** everywhere inside.\n- Solid uniform sphere: **E ∝ r** inside (zero at centre, max at surface).\nThis inside-vs-outside contrast is one of the most-tested ideas in the chapter.",
            },
          ],
        },
      ],
    },
    {
      id: "potential",
      title: "15 · Electrostatic Potential",
      topics: [
        {
          id: "potential-theory",
          title: "Potential and potential difference",
          theory:
            "The electric field stores energy. **Potential** V at a point is the work done **per unit charge** by an external agent to bring a positive test charge from infinity to that point (without acceleration). It is a **scalar** — far easier to add than the vector field.",
          derivation:
            "  V = W/q₀  (joule/coulomb = volt).\nPotential **difference**: V_B − V_A = −∫_A^B E·dl = W_AB/q.\nPotential of a point charge (V = 0 at ∞):\n  V = kQ/r.\nFor several charges, just add scalars:\n  V = k Σ qᵢ/rᵢ.\nDipole: V = kp cosθ / r² (∝ 1/r²; zero on the equatorial plane).\nRing (axis): V = kQ/√(R²+x²).\nShell/conductor: V = kQ/R inside & on surface, kQ/r outside.",
          formulas: [
            { label: "Definition", expr: "V = W/q₀", note: "volt = J/C" },
            { label: "Point charge", expr: "V = kQ/r" },
            { label: "System", expr: "V = k Σ qᵢ/rᵢ" },
            { label: "Dipole", expr: "V = kp cosθ/r²" },
          ],
          intuition:
            "Potential is electrical 'height'. A + charge, like a ball, rolls from high V to low V; a − charge rolls the other way. Potential difference is the 'drop' that does work.",
          callouts: [
            {
              kind: "warning",
              title: "V can be zero where E isn't (and vice-versa)",
              body:
                "At the **centre of a ring/shell**, E = 0 but V ≠ 0. On the **equatorial plane of a dipole**, V = 0 but E ≠ 0. Potential (scalar, adds with sign) and field (vector) are independent — never assume one from the other.",
            },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "Charges +2q and −q sit at x = 0 and x = a. Find the point on the x-axis (beyond the charges) where the potential is zero.",
              solution:
                "Let the point be at x > a. V = k[2q/x − q/(x−a)] = 0 ⇒ 2/x = 1/(x−a) ⇒ 2(x−a) = x ⇒ x = 2a.\n(There is also a zero between the charges.)",
              answer: "x = 2a",
            },
          ],
        },
      ],
    },
    {
      id: "field-potential-relation",
      title: "16 · Field–Potential Relation",
      topics: [
        {
          id: "e-v-relation",
          title: "E = −dV/dr and the gradient",
          theory:
            "Field and potential are two views of the same thing. The field points 'downhill' in potential, and its strength is the steepness of the potential.",
          derivation:
            "From dV = −E·dl, for one dimension:\n  E = −dV/dr   (the field is minus the slope of V).\nIn three dimensions:\n  E = −∇V = −( ∂V/∂x, ∂V/∂y, ∂V/∂z ).\nConsequences:\n  • E points from high to low potential.\n  • Where V is flat (dV/dr = 0), E = 0.\n  • Units check: V/m = N/C. ✓",
          formulas: [
            { label: "1-D", expr: "E = −dV/dr" },
            { label: "3-D", expr: "E = −∇V" },
            { label: "From field", expr: "V_B − V_A = −∫ E·dl" },
          ],
          intuition:
            "If V is a hill, E is the steepest-descent arrow. Closely spaced contour lines (steep hill) ⇒ strong field; flat ground ⇒ no field.",
          mistakes: [
            "Dropping the **minus sign** — E points toward **decreasing** V.",
            "Assuming V = 0 ⇒ E = 0 (false — see the dipole equator).",
          ],
        },
      ],
    },
    {
      id: "equipotential",
      title: "17 · Equipotential Surfaces",
      topics: [
        {
          id: "equipotential-theory",
          title: "Surfaces of constant potential",
          theory:
            "An **equipotential surface** has the same V at every point. Examples: spheres around a point charge; planes for a uniform field; the surface of any conductor.",
          figures: [{ svg: SVG_EQUIPOTENTIAL, caption: "Equipotentials (dashed) are always perpendicular to field lines (solid)." }],
          callouts: [
            {
              kind: "note",
              title: "Properties",
              body:
                "- **No work** is done moving a charge along an equipotential (ΔV = 0 ⇒ W = qΔV = 0).\n- Field lines are **always perpendicular** to equipotentials (else a tangential E would do work).\n- Equipotentials **never intersect**.\n- They are **closer together** where the field is stronger.",
            },
          ],
          mistakes: [
            "Drawing field lines and equipotentials that are not perpendicular.",
            "Thinking a charge needs work to move on an equipotential — it doesn't.",
          ],
        },
      ],
    },
    {
      id: "potential-energy",
      title: "18 · Electrostatic Potential Energy",
      topics: [
        {
          id: "pe-theory",
          title: "Energy of charge configurations",
          theory:
            "The potential energy of a system is the total work needed to assemble the charges from infinity.",
          derivation:
            "Two charges:  U = k q₁q₂ / r.\nMany charges: sum over **all distinct pairs**:\n  U = k Σ_{i<j} qᵢqⱼ/rᵢⱼ.\nA charge in an external potential: U = qV.\nFor 3 charges: U = k( q₁q₂/r₁₂ + q₁q₃/r₁₃ + q₂q₃/r₂₃ ).\nWork–energy: W_external = ΔU;  W_by field = −ΔU.",
          formulas: [
            { label: "Pair", expr: "U = k q₁q₂/r" },
            { label: "System", expr: "U = k Σ_{i<j} qᵢqⱼ/rᵢⱼ" },
            { label: "In external V", expr: "U = qV" },
          ],
          examples: [
            {
              level: "JEE Main",
              problem:
                "Three charges +q, +q, +q are placed at the corners of an equilateral triangle of side a. Find the potential energy of the system.",
              solution:
                "Three pairs, each at separation a:\n  U = k( q²/a + q²/a + q²/a ) = 3kq²/a.",
              answer: "U = 3kq²/a",
            },
          ],
          mistakes: [
            "Counting a pair **twice** (use i < j, i.e. each pair once).",
            "Mishandling signs — keep the sign of each charge in qᵢqⱼ.",
          ],
        },
      ],
    },
    {
      id: "conductors",
      title: "19 · Conductors in Electrostatic Equilibrium",
      topics: [
        {
          id: "conductors-equilibrium",
          title: "Five key results",
          theory:
            "Once a conductor reaches equilibrium (no charge moving), several powerful facts follow directly from the free mobility of its electrons.",
          derivation:
            "1. **E = 0 inside** the conducting material (else free charges would keep moving).\n2. **Net charge resides on the surface** (Gauss's law: any interior Gaussian surface encloses zero charge).\n3. Just **outside the surface**, E = σ/ε₀ and is **perpendicular** to the surface.\n4. The whole conductor (surface + interior) is an **equipotential**.\n5. On an irregular conductor, σ is **largest where the curvature is largest** (sharp points) — hence corona discharge from sharp tips and the action of lightning rods.",
          formulas: [
            { label: "Inside", expr: "E_in = 0" },
            { label: "At surface", expr: "E = σ/ε₀  (⟂ surface)" },
            { label: "Curvature", expr: "σ ∝ 1/R_curvature" },
          ],
          callouts: [
            {
              kind: "jee",
              title: "Cavity results",
              body:
                "- A cavity with **no** charge inside has **E = 0** in the cavity, whatever the outside field (basis of shielding).\n- A charge +q placed **inside a cavity** induces −q on the cavity wall and +q on the outer surface; the outer field looks like q at the centre.",
            },
          ],
          mistakes: [
            "Saying charge is uniform on any conductor — it's uniform only on a **sphere**; on other shapes it concentrates at sharp points.",
            "Forgetting E just outside is **σ/ε₀**, not σ/2ε₀.",
          ],
        },
      ],
    },
    {
      id: "shielding",
      title: "20 · Electrostatic Shielding",
      topics: [
        {
          id: "shielding-theory",
          title: "The Faraday cage",
          theory:
            "Because the field inside a charge-free conducting cavity is **zero**, a conducting enclosure shields its interior from outside electric fields. This is **electrostatic shielding** (the Faraday cage). The enclosure need not be solid — a metal mesh works for low-frequency fields.",
          intuition:
            "External charges push the conductor's electrons around until the surface charge they create exactly cancels the outside field everywhere inside. The interior never 'feels' the storm outside.",
          callouts: [
            {
              kind: "tip",
              title: "Real-world shielding",
              body:
                "- **Cars / aircraft** protect passengers from lightning (the metal shell carries the current on its outside).\n- **Coaxial cable shields and EMI cans** protect sensitive signals.\n- **MRI and lab rooms** use shielded enclosures.\n- Sensitive electronics ship in **conductive bags**.",
            },
          ],
          jeeNotes: [
            "Shielding works **one way**: a cage blocks external fields from getting in, but a charge **inside** the cavity still produces a field outside.",
          ],
        },
      ],
    },
    {
      id: "advanced-insights",
      title: "21 · Advanced JEE Insights",
      topics: [
        {
          id: "insights",
          title: "Hidden assumptions, limits and symmetry",
          theory:
            "The questions that separate top rankers usually hinge on a subtlety, not a longer calculation.",
          callouts: [
            {
              kind: "jee",
              title: "Power tools",
              body:
                "- **Symmetry**: choose Gaussian surfaces / exploit cancellation before integrating.\n- **Superposition trick**: model a sphere-with-a-cavity as (full sphere) + (negative sphere in the cavity). The field inside the cavity comes out **uniform**: E = ρ·d/3ε₀ along the line of centres.\n- **Limiting cases**: every distribution looks like a **point charge** from far away (V → kQ_total/r). Use this to sanity-check answers.\n- **Dimensional checks**: kq/r² is a field; kq/r is a potential; kq²/r is an energy.\n- **Image charges** (Advanced): a charge near a grounded plane behaves as if a mirror charge −q sits behind it.",
            },
            {
              kind: "warning",
              title: "Common conceptual confusions",
              body:
                "- Flux through a closed surface depends only on **enclosed** charge; the **field** depends on all charges.\n- V = 0 ≠ E = 0; E = 0 ≠ V = 0.\n- Uniform field ⇒ dipole feels **torque but no net force**.\n- Field just outside a conductor is **σ/ε₀**; an isolated sheet gives **σ/2ε₀**.",
            },
          ],
        },
      ],
    },
    {
      id: "solved-main",
      title: "22 · Solved Examples — JEE Main",
      intro: "Worked single-concept problems at JEE Main / NEET level. Tap **Show Solution** under each.",
      topics: [
        {
          id: "solved-main-set",
          title: "Set A — JEE Main",
          examples: [
            {
              level: "JEE Main",
              problem: "Two point charges +3 μC and −3 μC are 10 cm apart in vacuum. Find the force between them.",
              solution: "F = k|q₁q₂|/r² = 9×10⁹ × (3×10⁻⁶)(3×10⁻⁶)/(0.1)²\n  = 9×10⁹ × 9×10⁻¹² / 0.01 = 8.1 N (attractive).",
              answer: "8.1 N, attractive",
            },
            {
              level: "JEE Main",
              problem: "Equal charges q sit at all four corners of a square of side a. Find the net Coulomb force on any one charge.",
              solution: "Two adjacent charges: F₁ = kq²/a² each (perpendicular) ⇒ resultant √2·kq²/a² along the diagonal.\nDiagonal charge (distance a√2): F₂ = kq²/2a², same direction.\nTotal = (kq²/a²)(√2 + ½), directed outward along the diagonal.",
              answer: "F = (kq²/a²)(√2 + ½) outward",
            },
            {
              level: "JEE Main",
              problem: "Charges +4q and +q are separated by distance d. Where on the line joining them is the field zero?",
              solution: "Between the charges, distance x from +4q: 4/x² = 1/(d−x)²\n  ⇒ 2(d−x) = x ⇒ x = 2d/3 from the larger charge.",
              answer: "2d/3 from the +4q charge",
            },
            {
              level: "JEE Main",
              problem: "Find the acceleration of an electron in a uniform field E = 1×10⁴ N/C. (e = 1.6×10⁻¹⁹ C, m = 9.1×10⁻³¹ kg)",
              solution: "a = eE/m = (1.6×10⁻¹⁹ × 1×10⁴)/(9.1×10⁻³¹) ≈ 1.76×10¹⁵ m/s² (opposite to E).",
              answer: "≈ 1.76×10¹⁵ m/s²",
            },
            {
              level: "JEE Main",
              problem: "Four equal charges +q are at the corners of a square of side a. Find the electric field and potential at the centre.",
              solution: "By symmetry the four field vectors cancel ⇒ E = 0.\nEach charge is a/√2 from the centre ⇒ V = 4·kq/(a/√2) = 4√2·kq/a.",
              answer: "E = 0, V = 4√2 kq/a",
            },
            {
              level: "JEE Main",
              problem: "A charge q is at the centre of a cube. Find the flux through the whole cube and through one face.",
              solution: "Total flux = q/ε₀ (Gauss). By symmetry each of the 6 faces gets an equal share ⇒ Φ_face = q/6ε₀.",
              answer: "q/ε₀ total, q/6ε₀ per face",
            },
            {
              level: "JEE Main",
              problem: "A charge q is placed at one corner of a cube. What is the flux through the cube?",
              solution: "The corner is shared by 8 cubes, so only 1/8 of the total flux threads this cube: Φ = q/8ε₀.",
              answer: "q/8ε₀",
            },
            {
              level: "JEE Main",
              problem: "An infinite sheet has σ = 2×10⁻⁶ C/m². Find the field just outside it. (ε₀ = 8.85×10⁻¹²)",
              solution: "E = σ/2ε₀ = (2×10⁻⁶)/(2×8.85×10⁻¹²) ≈ 1.13×10⁵ N/C (perpendicular to the sheet).",
              answer: "≈ 1.13×10⁵ N/C",
            },
            {
              level: "JEE Main",
              problem: "A conducting sphere of radius 0.1 m carries 1 nC. Find E and V at its surface.",
              solution: "E = kQ/R² = 9×10⁹×10⁻⁹/0.01 = 900 N/C.\nV = kQ/R = 9×10⁹×10⁻⁹/0.1 = 90 V.",
              answer: "E = 900 N/C, V = 90 V",
            },
            {
              level: "JEE Main",
              problem: "A dipole of moment 2×10⁻⁹ C·m is in a uniform field 1×10⁵ N/C. Find the maximum torque.",
              solution: "τ_max = pE (at θ = 90°) = 2×10⁻⁹ × 1×10⁵ = 2×10⁻⁴ N·m.",
              answer: "2×10⁻⁴ N·m",
            },
            {
              level: "JEE Main",
              problem: "Points A and B are at potentials 10 V and 4 V. Find the work done by the field in moving +2 μC from A to B.",
              solution: "W_field = q(V_A − V_B) = 2×10⁻⁶ × (10 − 4) = 1.2×10⁻⁵ J.",
              answer: "1.2×10⁻⁵ J (by the field)",
            },
            {
              level: "JEE Main",
              problem: "The potential in a region is V(x) = 5x² + 10 (volts, x in metres). Find the field at x = 2 m.",
              solution: "E = −dV/dx = −10x. At x = 2: E = −20 V/m ⇒ 20 V/m along −x.",
              answer: "20 V/m along −x",
            },
            {
              level: "JEE Main",
              problem: "An oil drop of mass 8×10⁻¹⁶ kg carrying 5 excess electrons is held stationary in a vertical field. Find E. (g = 10)",
              solution: "qE = mg ⇒ E = mg/q = (8×10⁻¹⁶×10)/(5×1.6×10⁻¹⁹) = 8×10⁻¹⁵/8×10⁻¹⁹ = 1×10⁴ N/C.",
              answer: "10⁴ N/C",
            },
            {
              level: "JEE Main",
              problem: "Find the ratio of the electric to the gravitational force between two electrons.",
              solution: "F_e/F_g = ke²/(Gm²) = (9×10⁹×(1.6×10⁻¹⁹)²)/(6.67×10⁻¹¹×(9.1×10⁻³¹)²) ≈ 4×10⁴².",
              answer: "≈ 4×10⁴²",
            },
            {
              level: "JEE Main",
              problem: "Two identical +q charges are a distance r apart. Find the potential energy of the system (q = 1 μC, r = 0.1 m).",
              solution: "U = kq²/r = 9×10⁹ × (10⁻⁶)² / 0.1 = 9×10⁻³/0.1 = 0.09 J.",
              answer: "0.09 J",
            },
          ],
        },
      ],
    },
    {
      id: "solved-advanced",
      title: "23 · Solved Examples — JEE Advanced",
      intro: "Multi-step / multi-concept problems at JEE Advanced level.",
      topics: [
        {
          id: "solved-adv-set",
          title: "Set B — JEE Advanced",
          examples: [
            {
              level: "JEE Advanced",
              problem: "Three equal charges +q sit at the corners of an equilateral triangle of side a. What charge Q must be placed at the centroid so that each corner charge is in equilibrium?",
              solution: "Net force on a corner charge from the other two = √3·kq²/a² (outward).\nCentroid-to-vertex distance = a/√3, so force from Q = kQq/(a/√3)² = 3kQq/a².\nFor equilibrium 3k|Q|q/a² = √3·kq²/a² ⇒ |Q| = q/√3, and it must pull inward ⇒ Q = −q/√3.",
              answer: "Q = −q/√3",
            },
            {
              level: "JEE Advanced",
              problem: "A solid sphere of uniform charge density ρ has a spherical cavity. The vector from the sphere's centre to the cavity's centre is d. Show the field inside the cavity is uniform and find it.",
              solution: "Superpose: full sphere (ρ) + a sphere of −ρ filling the cavity.\nInside a uniform sphere E = ρr/3ε₀ (from centre). At a cavity point, position from sphere centre r₁ and from cavity centre r₂, with r₁ − r₂ = d.\nE = ρr₁/3ε₀ − ρr₂/3ε₀ = ρ(r₁−r₂)/3ε₀ = ρd/3ε₀ — constant ⇒ uniform.",
              answer: "E = ρd/3ε₀, uniform (along the line of centres)",
            },
            {
              level: "JEE Advanced",
              problem: "A semicircular wire of radius R carries charge Q uniformly. Find the field at the centre.",
              solution: "λ = Q/(πR). dE = k(λR dθ)/R²; only the component along the symmetry axis survives.\nE = (kλ/R)∫₀^π sinθ dθ = (kλ/R)(2) = 2kλ/R = 2kQ/(πR²).",
              answer: "E = 2kλ/R = 2kQ/(πR²)",
            },
            {
              level: "JEE Advanced",
              problem: "A small charge −q (mass m) is placed on the axis of a fixed ring (radius R, charge +Q) near its centre and released. Show it executes SHM and find the period.",
              solution: "On-axis field for x ≪ R: E = kQx/(R²+x²)^{3/2} ≈ kQx/R³.\nRestoring force on −q toward centre: F = −kQq x/R³ ⇒ ω² = kQq/(mR³).\nT = 2π√(mR³/kQq) = 2π√(4πε₀ mR³/Qq).",
              answer: "T = 2π√(4πε₀ mR³/Qq)",
            },
            {
              level: "JEE Advanced",
              problem: "Charges +q and −2q are separated by d on the x-axis. Find all points on the axis where the potential is zero.",
              solution: "Between (distance x from +q): kq/x − 2kq/(d−x) = 0 ⇒ d−x = 2x ⇒ x = d/3.\nBeyond +q (distance y on the far side): kq/y − 2kq/(d+y) = 0 ⇒ d+y = 2y ⇒ y = d.\nSo V = 0 at d/3 (between) and at distance d beyond the +q charge.",
              answer: "x = d/3 (between) and d beyond +q",
            },
            {
              level: "JEE Advanced",
              problem: "Two concentric conducting shells of radii a < b carry charges Q₁ and Q₂. Find the potential at the common centre.",
              solution: "Potential is additive and constant inside each shell:\n  V_centre = kQ₁/a + kQ₂/b.",
              answer: "V = kQ₁/a + kQ₂/b",
            },
            {
              level: "JEE Advanced",
              problem: "Find the self-energy of a uniformly charged solid sphere of total charge Q and radius R.",
              solution: "Assemble shell by shell: U = ∫₀^R [k q(r)/r] dq with q(r) = Q r³/R³.\nThe integral gives U = (3/5)·kQ²/R = 3Q²/(20πε₀R).",
              answer: "U = 3kQ²/5R",
            },
            {
              level: "JEE Advanced",
              problem: "A charged conducting sphere has surface charge density σ. Find the outward electrostatic force per unit area (electrostatic pressure) and the force splitting it into two hemispheres.",
              solution: "Pressure P = σ²/2ε₀ (the field acting on the surface charge is the average ½·σ/ε₀).\nForce on a hemisphere = P × projected area = (σ²/2ε₀)(πR²) = Q²/(32πε₀R²).",
              answer: "P = σ²/2ε₀; F = Q²/(32πε₀R²)",
            },
            {
              level: "JEE Advanced",
              problem: "A point charge q is at distance d from an infinite grounded conducting plane. Find the force on it.",
              solution: "Image method: replace the plane by a charge −q at distance d on the far side (separation 2d).\nF = k q²/(2d)² = q²/(16πε₀d²), attractive (toward the plane).",
              answer: "F = q²/(16πε₀d²), toward the plane",
            },
            {
              level: "JEE Advanced",
              problem: "Find the field on the perpendicular bisector of a uniformly charged rod of length 2L and linear density λ, at distance r.",
              solution: "By symmetry only the perpendicular component survives:\n  E = (kλ/r)(sinθ₁ + sinθ₂) with both = L/√(L²+r²)\n  ⇒ E = 2kλL / [r√(L²+r²)].\nFor r ≫ L this → 2kλL/r² = kQ/r² (point charge); for r ≪ L → 2kλ/r (infinite line).",
              answer: "E = 2kλL/[r√(L²+r²)]",
            },
            {
              level: "JEE Advanced",
              problem: "Find the work to assemble four equal charges q at the corners of a square of side a.",
              solution: "Pairs: 4 sides (separation a) + 2 diagonals (a√2).\nU = k[4·q²/a + 2·q²/(a√2)] = (kq²/a)(4 + √2).",
              answer: "U = (kq²/a)(4 + √2)",
            },
            {
              level: "JEE Advanced",
              problem: "A short dipole p lies along +x in a non-uniform field E = E₀(1 + αx) x̂. Find the net force on it.",
              solution: "Net force on a dipole in a non-uniform field: F = p dE/dx = p·E₀α (along +x).\n(Contrast: in a uniform field the net force is zero.)",
              answer: "F = pE₀α along +x",
            },
          ],
        },
      ],
    },
    {
      id: "practice",
      title: "24 · Practice Problems (with answers)",
      intro: "Original practice set. Solutions give the final answer with a one-line method — attempt first, then reveal. (This is the first batch of an expanding bank.)",
      topics: [
        {
          id: "practice-main",
          title: "Practice — JEE Main / NEET",
          examples: [
            { level: "JEE Main", problem: "How many electrons make up a charge of −1 C?", solution: "n = q/e = 1/(1.6×10⁻¹⁹) = 6.25×10¹⁸.", answer: "6.25×10¹⁸" },
            { level: "JEE Main", problem: "Force between 2 μC and 3 μC, 30 cm apart?", solution: "F = k·6×10⁻¹²/0.09 = 9×10⁹×6×10⁻¹²/0.09 = 0.6 N.", answer: "0.6 N" },
            { level: "JEE Main", problem: "Field 5 cm from a 10 nC point charge?", solution: "E = kQ/r² = 9×10⁹×10⁻⁸/0.0025 = 3.6×10⁴ N/C.", answer: "3.6×10⁴ N/C" },
            { level: "JEE Main", problem: "Potential 5 cm from a 10 nC point charge?", solution: "V = kQ/r = 9×10⁹×10⁻⁸/0.05 = 1800 V.", answer: "1800 V" },
            { level: "JEE Main", problem: "Flux through a closed surface enclosing 8.85 nC?", solution: "Φ = Q/ε₀ = 8.85×10⁻⁹/8.85×10⁻¹² = 1000 N·m²/C.", answer: "1000 N·m²/C" },
            { level: "JEE Main", problem: "Two equal positive charges: where is the field zero on the line joining them?", solution: "At the midpoint (equal and opposite contributions). Potential there is non-zero.", answer: "midpoint" },
            { level: "JEE Main", problem: "Torque on a dipole p = 2×10⁻⁸ C·m at 30° in E = 3×10⁴ N/C?", solution: "τ = pE sinθ = 2×10⁻⁸×3×10⁴×0.5 = 3×10⁻⁴ N·m.", answer: "3×10⁻⁴ N·m" },
            { level: "JEE Main", problem: "Field deep inside a hollow charged conductor?", solution: "Zero — no charge enclosed; the conductor shields its interior.", answer: "0" },
            { level: "JEE Main", problem: "Ratio of axial to equatorial field of a short dipole at equal distances?", solution: "E_axial = 2kp/r³, E_eq = kp/r³ ⇒ ratio = 2.", answer: "2 : 1" },
            { level: "JEE Main", problem: "Charge needed to raise a sphere of radius 9 cm to 100 V?", solution: "Q = VR/k = 100×0.09/(9×10⁹) = 1×10⁻⁹ C = 1 nC.", answer: "1 nC" },
            { level: "JEE Main", problem: "Work to move a charge along an equipotential surface?", solution: "Zero (ΔV = 0 ⇒ W = qΔV = 0).", answer: "0" },
            { level: "JEE Main", problem: "Surface charge density of a 0.1 m sphere carrying 1 nC?", solution: "σ = Q/4πR² = 10⁻⁹/(4π×0.01) ≈ 7.96×10⁻⁹ C/m².", answer: "≈ 8.0×10⁻⁹ C/m²" },
            { level: "JEE Main", problem: "Field between two large parallel sheets +σ and −σ (σ = 1 μC/m²)?", solution: "E = σ/ε₀ = 10⁻⁶/8.85×10⁻¹² ≈ 1.13×10⁵ N/C.", answer: "≈ 1.13×10⁵ N/C" },
            { level: "JEE Main", problem: "Acceleration of a proton in E = 1×10⁶ N/C? (m_p = 1.67×10⁻²⁷)", solution: "a = eE/m = 1.6×10⁻¹⁹×10⁶/1.67×10⁻²⁷ ≈ 9.6×10¹³ m/s².", answer: "≈ 9.6×10¹³ m/s²" },
            { level: "JEE Main", problem: "Potential energy of a dipole (p = 10⁻⁸, E = 10⁵) at 60° to the field?", solution: "U = −pE cosθ = −10⁻⁸×10⁵×0.5 = −5×10⁻⁴ J.", answer: "−5×10⁻⁴ J" },
            { level: "JEE Main", problem: "Assertion: a charge inside a cavity of a conductor induces charge on the inner wall. Reason: E = 0 inside the conductor material. Are both correct?", solution: "Both true and the reason correctly explains it: E = 0 in the metal forces an induced −q on the cavity wall (and +q on the outer surface).", answer: "Both correct; reason explains assertion" },
          ],
        },
        {
          id: "practice-adv",
          title: "Practice — JEE Advanced",
          examples: [
            { level: "JEE Advanced", problem: "Field at the centre of a quarter-circular arc (radius R, charge Q)?", solution: "Arc field along the bisector: E = 2kλ sin(θ/2)/R with θ = 90°, λ = Q/(πR/2) = 2Q/πR ⇒ E = 2√2·kQ/(πR²).", answer: "E = 2√2 kQ/πR²" },
            { level: "JEE Advanced", problem: "Two +q charges at (±a, 0). At what y on the axis of symmetry is the field maximum?", solution: "E(y) = 2kqy/(a²+y²)^{3/2}; dE/dy = 0 ⇒ y = a/√2.", answer: "y = a/√2" },
            { level: "JEE Advanced", problem: "Potential at the centre of a uniformly charged solid sphere (charge Q, radius R)?", solution: "V_centre = (3/2)·kQ/R = 1.5 × surface potential.", answer: "V = 3kQ/2R" },
            { level: "JEE Advanced", problem: "Self-energy of a charged conducting sphere (charge Q, radius R)?", solution: "U = kQ²/2R = Q²/(8πε₀R) (all energy in the external field).", answer: "U = kQ²/2R" },
            { level: "JEE Advanced", problem: "Work to bring charge q from infinity to distance r₁ from an infinite line λ (reference at r₀)?", solution: "V(r) = −(λ/2πε₀)ln(r/r₀); W = q[V(r₁) − V(∞-ref)] = (qλ/2πε₀)ln(r₀/r₁).", answer: "W = (qλ/2πε₀)ln(r₀/r₁)" },
            { level: "JEE Advanced", problem: "Two concentric shells a<b, charges Q₁,Q₂. Field for a<r<b and r>b?", solution: "a<r<b: E = kQ₁/r². r>b: E = k(Q₁+Q₂)/r².", answer: "kQ₁/r²; k(Q₁+Q₂)/r²" },
            { level: "JEE Advanced", problem: "On a ring's axis, at what x is the field maximum (radius R)?", solution: "E = kQx/(R²+x²)^{3/2}; dE/dx = 0 ⇒ x = R/√2.", answer: "x = R/√2" },
            { level: "JEE Advanced", problem: "A charge q is removed from distance d to infinity from a grounded plane. Find the work done by the external agent.", solution: "Interaction energy U = −kq²/(4d); W_ext = U(∞) − U(d) = 0 − (−kq²/4d) = +kq²/4d.", answer: "W = kq²/4d = q²/16πε₀d" },
            { level: "JEE Advanced", problem: "Flux of a uniform field E through a hemisphere of radius R (flat face perpendicular to E)?", solution: "Through the curved surface = through the projected disc = EπR² (net through closed hemisphere = 0).", answer: "Φ_curved = EπR²" },
            { level: "JEE Advanced", problem: "Multiple-correct: For a uniformly charged non-conducting sphere, which are true? (i) E ∝ r inside (ii) E ∝ 1/r² outside (iii) V is max at centre (iv) E is max at centre.", solution: "(i) true (E = kQr/R³), (ii) true, (iii) true (V_centre = 3kQ/2R), (iv) false (E = 0 at centre, max at surface).", answer: "(i), (ii), (iii)" },
            { level: "JEE Advanced", problem: "Match: (A) infinite line (B) infinite sheet (C) point charge (D) inside solid sphere — with E-dependence (1) const (2) 1/r² (3) 1/r (4) ∝ r.", solution: "A→3 (1/r), B→1 (const), C→2 (1/r²), D→4 (∝ r).", answer: "A-3, B-1, C-2, D-4" },
            { level: "JEE Advanced", problem: "A dipole is released from rest at angle θ₀ in a uniform field E. Find its angular speed when aligned (moment of inertia I).", solution: "Energy: ½Iω² = U(θ₀) − U(0) = (−pE cosθ₀) − (−pE) = pE(1 − cosθ₀) ⇒ ω = √[2pE(1 − cosθ₀)/I].", answer: "ω = √[2pE(1 − cosθ₀)/I]" },
          ],
        },
      ],
    },
    {
      id: "pyq-analysis",
      title: "25 · PYQ Analysis & Trends",
      topics: [
        {
          id: "pyq",
          title: "What the exams actually ask",
          theory: "Electrostatics is among the highest-weight chapters in both JEE Main and Advanced. Patterns repeat year after year.",
          callouts: [
            {
              kind: "jee",
              title: "JEE Main trends",
              body:
                "- 1–2 questions per shift; favourite areas: **Gauss's law** (sphere/shell/sheet), **potential of point-charge systems**, **dipole field & torque**, and **flux** (often integer answers like Q/ε₀ or Q/6ε₀).\n- Direct formula application; speed matters. Memorise the σ/2ε₀ vs σ/ε₀ family and the dipole 1/r³ results.",
            },
            {
              kind: "jee",
              title: "JEE Advanced trends",
              body:
                "- **Sphere-with-cavity** (superposition ⇒ uniform field) appears repeatedly.\n- **Conductors & induced charge** (cavities, image charges, grounding).\n- **Energy of configurations** and work–energy with potential.\n- Multi-concept problems blending field, potential and mechanics (SHM of a charge on a ring axis, charged-bead dynamics).",
            },
            {
              kind: "tip",
              title: "Highest-yield concepts to master",
              body:
                "1. Gauss's law for all standard symmetries (line/sheet/shell/solid sphere).\n2. Field & potential of a dipole and dipole-in-field (torque, energy, SHM).\n3. Conductor properties (E = 0 inside, σ/ε₀ at surface, shielding, induced charges).\n4. Superposition tricks (cavity, removed-charge).\n5. Potential energy of multi-charge systems and work done.",
            },
          ],
        },
      ],
    },
  ],
  topMistakes: [
    "Putting the signs of charges into the |F| or |E| magnitude formula instead of deciding direction separately.",
    "Confusing σ/2ε₀ (isolated sheet) with σ/ε₀ (just outside a conductor).",
    "Using the short-dipole formulas (1/r³) when r is not ≫ a.",
    "Assuming the equatorial dipole field is parallel to p — it is anti-parallel.",
    "Believing charges outside a Gaussian surface don't affect the field on it (they affect E, not the net flux).",
    "Using Gauss's law to find E without sufficient symmetry.",
    "Thinking E = 0 implies V = 0 (centre of a shell) or V = 0 implies E = 0 (dipole equator).",
    "Dropping the minus sign in E = −dV/dr.",
    "Double-counting pairs in the potential-energy sum (use each pair once).",
    "Assuming surface charge is uniform on a non-spherical conductor (it concentrates at sharp points).",
    "Forgetting the field is zero **inside** a conductor / charge-free cavity.",
    "Taking the inducing charge to be reduced during induction — it is unchanged.",
    "Mixing up 1/r (line charge) and 1/r² (point charge) dependences.",
    "Forgetting the dielectric divides the vacuum force/field by K.",
    "Treating field lines as particle trajectories.",
    "Using centre-to-centre r for non-spherical extended bodies in Coulomb's law.",
    "Ignoring that the field of a finite sheet/line is only σ/2ε₀ or λ/2πε₀r in the **infinite** idealisation.",
    "Forgetting that potential is continuous across a charged shell while the field jumps.",
    "Adding potentials as vectors (V is a scalar) or forces as scalars (F is a vector).",
    "Releasing 'from rest' vs 'with velocity' — only a charge released from rest starts along the field line.",
    "Thinking induction transfers charge from the inducer (it does not; the inducer is unchanged).",
    "Assuming the body charged by conduction has the opposite sign (conduction gives the same sign).",
    "Forgetting charge is quantized only matters microscopically; treating macroscopic dq as quantized.",
    "Taking n = 0.04 instead of n² = 1/0.04 in Bohr-style energy-fraction problems (not electrostatics-specific but a frequent number slip).",
    "Using ε₀ and k = 1/4πε₀ inconsistently in the same equation.",
    "Forgetting to convert μC/nC/cm to SI before substituting.",
    "Adding fields from several charges as scalars instead of vectors.",
    "Ignoring symmetry and grinding components when cancellation gives the answer instantly.",
    "Putting a test charge large enough to disturb the source distribution.",
    "Forgetting E = 0 at the centre of a uniformly charged ring (but V ≠ 0 there).",
    "Using the short-dipole 1/r³ result when the point is close to the dipole.",
    "Forgetting the field of a ring is maximum at x = R/√2 on its axis, not at the centre.",
    "Treating a finite line/sheet with the infinite-case formula when the point is not close.",
    "Forgetting flux is zero for field lines tangent to (grazing) a surface.",
    "Using a Gaussian surface that does not match the symmetry, then pulling E out of the integral.",
    "Believing the flux through one face of a cube with an off-centre charge is simply Q/6ε₀.",
    "Forgetting a charge on a face/edge/corner of a cube is shared (Q/2ε₀, Q/4ε₀, Q/8ε₀).",
    "Confusing the field of a charged conducting sphere (kQ/r² outside) with that inside (zero).",
    "Forgetting that for a solid non-conducting sphere E ∝ r inside and ∝ 1/r² outside.",
    "Treating the potential as discontinuous across a charged shell (V is continuous; E jumps).",
    "Taking the potential at infinity as non-zero without saying so (default reference is V(∞) = 0).",
    "Forgetting potential is path-independent (electrostatic field is conservative).",
    "Using V = kQ/r for a point inside a uniformly charged sphere (it is 3kQ/2R at the centre).",
    "Forgetting work done by the field W = q(V_i − V_f), and W_ext = −W_field.",
    "Mixing potential energy U = qV (charge in external field) with self-energy of a configuration.",
    "Double-counting pairs (use i < j) or dropping signs in the potential-energy sum.",
    "Forgetting the equatorial-plane potential of a dipole is zero (so no work to bring a charge there from ∞ along the plane).",
    "Thinking a conductor's surface charge is uniform when it is a sphere only; it peaks at sharp points.",
    "Forgetting the field just outside a conductor is σ/ε₀ but the force per area on the surface is σ²/2ε₀.",
    "Assuming a Faraday cage shields a charge inside it from producing a field outside (it does not).",
    "Forgetting an external field still polarises a cavity-less conductor while the interior stays field-free.",
    "Confusing electrostatic pressure σ²/2ε₀ with the field σ/ε₀ when computing forces on conductors.",
    "Forgetting the image-charge force on a charge near a grounded plane is kq²/(2d)² (half-separation 2d).",
    "Assuming two charged bodies brought together always attract — like charges repel even if one is a conductor only at large separation.",
    "Ignoring induced-charge attraction: a charged body attracts a neutral conductor/dielectric (non-uniform field).",
    "Forgetting that a dipole in a non-uniform field feels a net force, not just a torque.",
    "Taking U = −p·E as the work to rotate without specifying the reference angle (U = 0 at 90°).",
    "Forgetting stable equilibrium of a dipole is at θ = 0 (p ∥ E), unstable at θ = 180°.",
    "Using degrees in calculus (dV/dθ) instead of radians for dipole oscillation periods.",
    "Forgetting the SHM period of a dipole is T = 2π√(I/pE), not 2π√(I/p).",
    "Assuming E and V always rise or fall together — they are independent (one can be zero where the other is not).",
  ],
  revision: {
    formulaSheet: [
      { label: "Coulomb", expr: "F = k q₁q₂/r²,  k = 9×10⁹" },
      { label: "Field (point)", expr: "E = kQ/r²;  F = qE" },
      { label: "Line / Sheet", expr: "E = 2kλ/r ;  E = σ/2ε₀" },
      { label: "Conductor surface", expr: "E = σ/ε₀" },
      { label: "Solid sphere (in)", expr: "E = kQr/R³" },
      { label: "Dipole (short)", expr: "E_ax = 2kp/r³,  E_eq = kp/r³" },
      { label: "Dipole in field", expr: "τ = pE sinθ,  U = −pE cosθ" },
      { label: "Flux / Gauss", expr: "Φ = EA cosθ;  ∮E·dA = Q/ε₀" },
      { label: "Potential", expr: "V = kQ/r;  V = k Σqᵢ/rᵢ" },
      { label: "E–V", expr: "E = −dV/dr = −∇V" },
      { label: "Energy", expr: "U = k q₁q₂/r;  U = qV" },
    ],
    conceptMap:
      "Charge ─▶ Coulomb's Law ─▶ Electric Field (E = F/q) ─▶ {Field lines, Distributions, Dipole}\nElectric Field ─▶ Flux (Φ = E·A) ─▶ Gauss's Law ─▶ Fields of symmetric bodies\nElectric Field ⇄ Potential (E = −∇V, V = −∫E·dl) ─▶ Equipotentials & Energy (U)\nConductors (E_in = 0, surface charge) ─▶ Shielding (Faraday cage)",
    pyqInsights: [
      "JEE Main: 1–2 questions/shift — most often Gauss's law (sphere/shell/sheet), dipole field/torque, and potential of point-charge systems.",
      "JEE Advanced: favours sphere-with-cavity (superposition), conductors & induced charges, energy of configurations, and multi-concept potential/field problems.",
      "Numerical (integer) answers cluster around flux (Q/ε₀), field-zero locations, and potential-energy sums.",
      "Dimensional sanity checks and limiting cases catch most sign/factor errors under exam pressure.",
    ],
    lastMinuteTips: [
      "Always separate **magnitude** (use |q|) from **direction** (attract/repel, along/against E).",
      "Reach for **Gauss** when you see spherical, cylindrical or planar symmetry; otherwise integrate.",
      "Remember the factor-of-2 family: σ/2ε₀ (sheet), σ/ε₀ (conductor), λ/2πε₀r (line).",
      "Dipole fields go as 1/r³; axial = 2 × equatorial; equatorial is anti-parallel to p.",
      "V is a scalar (add with signs); E is a vector (add as components) — and one can be zero where the other isn't.",
      "Inside a conductor / empty cavity: E = 0. On a conductor: equipotential, charge on the surface, peaks at points.",
      "Check every answer in the **far-field limit** (should look like kQ_total/r² or kQ_total/r).",
    ],
  },
};

export default electrostatics;
