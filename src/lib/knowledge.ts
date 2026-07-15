/** Points clés pédagogiques inspirés de Mark Levine — The Jazz Theory Book (Sher Music).
 *  Contenu paraphrasé pour quiz / révision — pas une copie du livre. */

export type KnowledgeTopic = {
  id: string
  chapter: string
  title: string
  bullets: string[]
  takeaway: string
}

export type TheoryQuizQ = {
  id: string
  topicId: string
  question: string
  answers: string[]
  correct: string
  explain: string
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'intervals',
    chapter: 'Ch. 1 — Theorie de base',
    title: 'Intervalles',
    bullets: [
      'Un intervalle = l\'espace entre deux notes (du demi-ton a l\'octave).',
      'Inversion : majeur <-> mineur, parfait reste parfait, triton <-> triton ; la somme des degres = 9.',
      'Ex. : 3e majeure invertie = 6e mineure ; 4e juste invertie = 5e juste.',
      'Savoir inverser facilite la transposition (monter d\'une 6e maj ~ descendre d\'une 3e min).',
    ],
    takeaway: 'Maitrise les inversions pour transporter une phrase dans n\'importe quelle tonalite.',
  },
  {
    id: 'triads',
    chapter: 'Ch. 1 — Theorie de base',
    title: 'Triades',
    bullets: [
      'Deux 3ces empilees forment une triade.',
      'Majeure = 3e maj + 3e min ; mineure = 3e min + 3e maj.',
      'Diminuee = deux 3ces mineures ; augmentee = deux 3ces majeures.',
    ],
    takeaway: 'Les quatre triades sont la base de toute construction d\'accords.',
  },
  {
    id: 'iiv1',
    chapter: 'Ch. 2 — Gamme majeure & II-V-I',
    title: 'Le II-V-I',
    bullets: [
      'Le II-V-I est la progression la plus courante du jazz.',
      'Exemples celebres : Stella by Starlight, Tune Up, Giant Steps.',
      'En majeur : II = m7 (Dorien), V = 7 (Mixolydien), I = maj7 (Ionien).',
      'Les racines suivent le cycle des quintes (sens antihoraire).',
    ],
    takeaway: 'Apprends le II-V-I dans les 12 tonalites via le cycle des quintes.',
  },
  {
    id: 'modes-major',
    chapter: 'Ch. 2 — Modes majeurs',
    title: 'Les 7 modes de la gamme majeure',
    bullets: [
      'I Ionien -> maj7 · II Dorien -> m7 · III Phrygien · IV Lydien -> maj7(#11) · V Mixolydien -> 7 · VI Eolien · VII Locrien -> m7b5.',
      'Accord de 7e = une note sur deux du mode (1, 3, 5, 7) = chord tones.',
      'Les chord tones fixent la qualite (majeur / mineur / dominant).',
      'Sur maj7 et 7, la 4e naturelle est souvent une avoid note (tend a resoudre sur la 3e).',
    ],
    takeaway: 'Chaque degre de la gamme majeure "contient" un accord et une couleur de mode.',
  },
  {
    id: 'quality',
    chapter: 'Ch. 2 — Qualite d\'accord',
    title: '3e et 7e = qualite',
    bullets: [
      'Les trois accords les plus joues : maj7, m7, dominant 7.',
      'Avec une 5e juste, la 3e + la 7e determinent la qualite.',
      'Maj7 : 3e maj + 7e maj · m7 : 3e min + 7e min · 7 : 3e maj + 7e min.',
    ],
    takeaway: 'En improvise, viser 3e et 7e clarifie immediatement l\'harmonie.',
  },
  {
    id: 'progressions',
    chapter: 'Ch. 2 — Autres progressions',
    title: 'I-VI-II-V et turnarounds',
    bullets: [
      'I-VI-II-V ouvre "I Got Rhythm" (source des Rhythm Changes).',
      'Variante de turnaround : III-VI-II-V.',
      'I-II-III-IV est aussi frequent (ex. "I\'m Old Fashioned").',
      'Chaine de dominantes (V of V...) = enchainement de V qui descendent d\'une quinte.',
    ],
    takeaway: 'Ces progressions forment le socle des standards americains.',
  },
  {
    id: 'chord-scale',
    chapter: 'Ch. 3 — Chord/Scale Theory',
    title: 'Correspondance accord <-> gamme',
    bullets: [
      'Idee centrale de Levine : a chaque accord correspond une (ou plusieurs) gammes.',
      'Quatre grandes familles : majeure, mineure melodique, diminuee, par tons.',
      'La dissonance n\'est pas "mauvaise" : elle cree tension, energie et resolution.',
      'Le contexte (cadence courte vs pedale longue / free) change ce qui est jouable.',
    ],
    takeaway: 'Pense "quel mode sur quel accord ?" plutot que "quelle gamme absolue ?".',
  },
  {
    id: 'melodic-minor',
    chapter: 'Ch. 3 — Mineure melodique',
    title: 'Modes de la mineure melodique',
    bullets: [
      'Famille moderne essentielle (modal jazz, post-bop).',
      'Lydien dominant (4e mode) : majeur + b7 + #11 — ideal sur 7(#11).',
      'Altered / Super-Locrien (7e mode) : b9 #9 #11 b13 — sur V7alt.',
      'Les accords issus de la meme mineure melodique sont souvent interchangeables.',
    ],
    takeaway: 'Sur V7alt, pense Super-Locrien (= mineure melodique 1/2 ton au-dessus du V).',
  },
  {
    id: 'diminished',
    chapter: 'Ch. 3 — Gamme diminuee',
    title: 'Demi-ton / ton et ton / demi-ton',
    bullets: [
      'Seulement 3 collections de gammes diminuees distinctes.',
      'Demi-ton/ton (H-W) : typique sur V7(b9) et tensions dominantes.',
      'Ton/demi-ton (W-H) : sur accords diminues.',
      'Couleurs : b9, #9, #11, 13… sur le dominant.',
    ],
    takeaway: 'Pour un V7(b9), la H-W depuis la fondamentale est une option classique.',
  },
  {
    id: 'whole-tone',
    chapter: 'Ch. 3 — Gamme par tons',
    title: 'Whole-tone',
    bullets: [
      '6 notes, tout en tons — seulement 2 collections distinctes.',
      'Couleur augmentee / flottante, sans resolution naturelle de demi-ton.',
      'Souvent associee aux accords 7(#5) / +.',
    ],
    takeaway: 'Par tons = ambiance flottante ; a doser pour ne pas "laver" la cadence.',
  },
  {
    id: 'bebop-scales',
    chapter: 'Ch. 7 — Bebop scales',
    title: 'Pourquoi ajouter un chromatisme ?',
    bullets: [
      'Gamme a 8 notes : mode classique + note de passage chromatique.',
      'But : faire tomber les chord tones (1-3-5-7) sur les temps forts.',
      'Bebop dominante = Mixolydien + chromatisme entre b7 et 1.',
      'Bebop Dorien = Dorien + chromatisme entre b3 et 4.',
      'Bebop majeure = majeure + chromatisme entre 5 et 6.',
      'Bebop mineure melodique = melodique + chromatisme entre 5 et 6.',
    ],
    takeaway: 'Sans la note bebop, une descente Mixo "cliquette" ; avec elle, ca swingue.',
  },
  {
    id: 'outside',
    chapter: 'Ch. 8 — Playing outside',
    title: 'Jouer "dehors"',
    bullets: [
      'Creer une tonalite claire autre que celle ecrite (inside -> outside -> inside).',
      'Techniques : side-slipping (1/2 ton), triton (penta eloignee), gammes "etrangeres".',
      'Woody Shaw : exemples F <-> B (triton), F <-> E (demi-ton).',
      'L\'auditeur doit comprendre la structure : sortir, puis revenir clairement.',
    ],
    takeaway: 'Outside = contraste organise, pas du hasard.',
  },
  {
    id: 'pentatonics',
    chapter: 'Ch. 9 — Pentatoniques',
    title: 'Pentatoniques jazz',
    bullets: [
      'Majeur : 1 2 3 5 6 · Mineur : 1 b3 4 5 b7.',
      'Utiles pour contourner les avoid notes et pour sortir (superposition).',
      'McCoy Tyner / Woody Shaw : pentas deplacees pour l\'outside.',
    ],
    takeaway: 'Une penta bien choisie peint une tonalite en 5 notes seulement.',
  },
  {
    id: 'blues-rhythm',
    chapter: 'Ch. 10-11 — Blues & Rhythm',
    title: 'Blues et Rhythm Changes',
    bullets: [
      'Blues : forme 12 mesures, blue notes (b3 b5 b7) sur trame dominante.',
      'Rhythm Changes : forme AABA tiree de "I Got Rhythm" — base de nombreux heads bebop.',
      'Le bridge des Rhythm Changes est souvent une chaine de dominantes.',
    ],
    takeaway: 'Blues + Rhythm Changes = deux "gyms" indispensables.',
  },
  {
    id: 'coltrane',
    chapter: 'Ch. 15 — Coltrane Changes',
    title: 'Cycle Coltrane / Giant Steps',
    bullets: [
      'Toniques majeures separees de tierces majeures (C -> Ab -> E -> C…).',
      'Chaque tonique est souvent preparee par son V (ou II-V).',
      'Pense par "ilots" de tonalite plus que mesure par mesure.',
    ],
    takeaway: 'Decoupe Giant Steps en zones tonales (C, Ab, E).',
  },
  {
    id: 'practice',
    chapter: 'Intro & Ch. 12 — Pratique',
    title: 'Comment progresser',
    bullets: [
      'Un grand solo ~ 1 % magie + 99 % de choses analysables et praticables.',
      'Prerequis : oreille / temps / forme, direction (ecoute), mentors, ambition (= volonte de travailler).',
      'Presque tous les grands touchent un peu le piano pour "voir" l\'harmonie.',
      'Chanter les intervalles + jouer avec les disques = ear training quotidien.',
    ],
    takeaway: 'La discipline bat le talent s\'il n\'y a pas de travail.',
  },
]

export const THEORY_QUIZ: TheoryQuizQ[] = [
  {
    id: 'q1',
    topicId: 'iiv1',
    question: 'Quelle est la progression d\'accords la plus courante en jazz ?',
    answers: ['I-IV-V', 'II-V-I', 'I-V-vi-IV', 'vi-IV-I-V'],
    correct: 'II-V-I',
    explain: 'Levine insiste : le II-V-I est partout — standards, bebop, modal.',
  },
  {
    id: 'q2',
    topicId: 'modes-major',
    question: 'Quel mode majeur correspond a un accord Dominant 7 (V7) ?',
    answers: ['Ionien', 'Dorien', 'Mixolydien', 'Lydien'],
    correct: 'Mixolydien',
    explain: 'V = Mixolydien (majeur avec b7).',
  },
  {
    id: 'q3',
    topicId: 'modes-major',
    question: 'Le mode Dorien (II) donne quel type d\'accord de 7e ?',
    answers: ['Maj7', 'Dominant 7', 'm7', 'm7b5'],
    correct: 'm7',
    explain: 'Dorien -> accord mineur 7 (ex. Dm7 en C majeur).',
  },
  {
    id: 'q4',
    topicId: 'quality',
    question: 'Quelles notes determinent surtout la "qualite" d\'un accord (maj / min / dom) ?',
    answers: ['La 9e et la 11e', 'La 3e et la 7e', 'La 5e seulement', 'La 6e et la 9e'],
    correct: 'La 3e et la 7e',
    explain: 'Avec une 5e juste, 3e + 7e fixent majeur, mineur ou dominant.',
  },
  {
    id: 'q5',
    topicId: 'intervals',
    question: 'Une 3e majeure invertie devient…',
    answers: ['Une 3e mineure', 'Une 6e mineure', 'Une 5e juste', 'Une 4e juste'],
    correct: 'Une 6e mineure',
    explain: 'Majeur <-> mineur, et 3+6 = 9.',
  },
  {
    id: 'q6',
    topicId: 'bebop-scales',
    question: 'A quoi sert la note chromatique ajoutee dans une bebop scale ?',
    answers: [
      'A eviter toutes les tensions',
      'A faire tomber les chord tones sur les temps forts',
      'A remplacer la tonique',
      'A supprimer la 5e',
    ],
    correct: 'A faire tomber les chord tones sur les temps forts',
    explain: 'Baker / Levine : la note ajoutee fait que la gamme "tombe juste" rythmiquement.',
  },
  {
    id: 'q7',
    topicId: 'bebop-scales',
    question: 'Ou place-t-on le chromatisme de la bebop dominante ?',
    answers: ['Entre 3 et 4', 'Entre 5 et 6', 'Entre b7 et 1', 'Entre 1 et 2'],
    correct: 'Entre b7 et 1',
    explain: 'Mixolydien + note entre b7 et la fondamentale.',
  },
  {
    id: 'q8',
    topicId: 'melodic-minor',
    question: 'Quel mode de la mineure melodique est typique sur un V7alt ?',
    answers: ['Lydien', 'Dorien', 'Altered / Super-Locrien', 'Eolien'],
    correct: 'Altered / Super-Locrien',
    explain: '7e mode de la mineure melodique = altered (b9 #9 #11 b13).',
  },
  {
    id: 'q9',
    topicId: 'diminished',
    question: 'Combien de gammes diminuees distinctes existent-il ?',
    answers: ['12', '7', '3', '2'],
    correct: '3',
    explain: 'Periodicite de tierce mineure -> seulement 3 collections uniques.',
  },
  {
    id: 'q10',
    topicId: 'whole-tone',
    question: 'Combien de gammes par tons (whole-tone) distinctes y a-t-il ?',
    answers: ['12', '6', '3', '2'],
    correct: '2',
    explain: '6 tons, periodiques -> 2 collections seulement.',
  },
  {
    id: 'q11',
    topicId: 'modes-major',
    question: 'Quel mode est associe a un maj7 avec #11 ?',
    answers: ['Ionien', 'Lydien', 'Mixolydien', 'Locrien'],
    correct: 'Lydien',
    explain: 'Lydien = majeure avec 4e haussee (#11).',
  },
  {
    id: 'q12',
    topicId: 'modes-major',
    question: 'Quel accord correspond au mode Locrien (VII) ?',
    answers: ['Maj7', '7', 'm7', 'm7b5 (half-diminished)'],
    correct: 'm7b5 (half-diminished)',
    explain: 'Locrien -> demi-diminue (ex. Bm7b5 en C).',
  },
  {
    id: 'q13',
    topicId: 'chord-scale',
    question: 'Qu\'est-ce qu\'une "avoid note" typique sur un Cmaj7 ?',
    answers: ['La 9e (D)', 'La 4e naturelle (F)', 'La 6e (A)', 'La 5e (G)'],
    correct: 'La 4e naturelle (F)',
    explain: 'La 4e frotte la 3e ; souvent passante ou resolue (ou remplacee par #11).',
  },
  {
    id: 'q14',
    topicId: 'outside',
    question: 'Quelle strategie "outside" utilise Woody Shaw avec une penta un triton plus loin ?',
    answers: [
      'Rester strictement dans la tonalite ecrite',
      'Side-slip d\'un triton puis retour (inside-outside-inside)',
      'Supprimer toutes les chord tones',
      'Jouer uniquement la 5e',
    ],
    correct: 'Side-slip d\'un triton puis retour (inside-outside-inside)',
    explain: 'Creer une autre tonalite claire, puis revenir — contraste organise.',
  },
  {
    id: 'q15',
    topicId: 'progressions',
    question: 'Les "Rhythm Changes" sont tires de quel standard ?',
    answers: ['Autumn Leaves', 'I Got Rhythm', 'Blue Bossa', 'So What'],
    correct: 'I Got Rhythm',
    explain: 'Forme AABA de Gershwin = base de tres nombreux heads bebop.',
  },
  {
    id: 'q16',
    topicId: 'coltrane',
    question: 'Les Coltrane Changes enchainent des toniques separees de…',
    answers: ['Quintes justes', 'Tierces majeures', 'Secondes mineures', 'Quartes justes'],
    correct: 'Tierces majeures',
    explain: 'Cycle C-Ab-E (Giant Steps) + souvent leurs V / II-V.',
  },
  {
    id: 'q17',
    topicId: 'bebop-scales',
    question: 'Ou est le chromatisme de la bebop majeure ?',
    answers: ['Entre b7 et 1', 'Entre b3 et 4', 'Entre 5 et 6', 'Entre 2 et 3'],
    correct: 'Entre 5 et 6',
    explain: 'Majeure + note entre 5 et 6.',
  },
  {
    id: 'q18',
    topicId: 'iiv1',
    question: 'Dans le cycle des quintes, on pratique souvent les tonalites…',
    answers: [
      'Dans le sens horaire (quintes ascendantes)',
      'Dans le sens antihoraire (quintes descendantes)',
      'Par demi-tons uniquement',
      'Aleatoirement',
    ],
    correct: 'Dans le sens antihoraire (quintes descendantes)',
    explain: 'C -> F -> Bb -> Eb… : meme sens que les racines du II-V-I.',
  },
  {
    id: 'q19',
    topicId: 'practice',
    question: 'Selon Levine, un grand solo jazz est surtout…',
    answers: [
      '100 % magie inexplicable',
      'Environ 1 % magie et 99 % de choses analysables / praticables',
      'Uniquement theorique',
      'Impossible a apprendre',
    ],
    correct: 'Environ 1 % magie et 99 % de choses analysables / praticables',
    explain: 'Introduction du livre : la theorie sert a comprendre et repeter l\'essentiel.',
  },
  {
    id: 'q20',
    topicId: 'triads',
    question: 'Deux 3ces majeures empilees forment…',
    answers: ['Une triade majeure', 'Une triade mineure', 'Une triade diminuee', 'Une triade augmentee'],
    correct: 'Une triade augmentee',
    explain: 'Aug = maj3 + maj3 ; Dim = min3 + min3.',
  },
]

export function getTopic(id: string) {
  return KNOWLEDGE_TOPICS.find(t => t.id === id)
}

export function randomTheoryQuestions(n = 1): TheoryQuizQ[] {
  const copy = [...THEORY_QUIZ]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(n, copy.length))
}
