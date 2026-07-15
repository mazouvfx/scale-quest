export const NOTES = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'] as const
export type NoteName = typeof NOTES[number]
export const noteIndex: Record<string, number> = Object.fromEntries(NOTES.map((n,i) => [n,i]))

export interface ScaleDef {
  key: string
  label: string
  family: string
  formula: string
  intervals: number[]
  tips: string
  chordHint?: string
}

export const SCALE_PATTERNS: Record<string, Omit<ScaleDef,'key'|'family'>> = {
  majorPenta: {
    label: 'Pentatonique majeure',
    formula: '1 2 3 5 6',
    intervals: [0,2,4,7,9],
    tips: 'Couleur claire sans 4e ni 7e. Utile pour contourner les avoid notes (Levine, ch.9).',
    chordHint: 'Maj / maj6 / maj7',
  },
  minorPenta: {
    label: 'Pentatonique mineure',
    formula: '1 b3 4 5 b7',
    intervals: [0,3,5,7,10],
    tips: 'Base blues / funk. Superposee un triton plus loin = outil "outside" (Woody Shaw).',
    chordHint: 'm7 / blues',
  },
  ionian: {
    label: 'Ionien (majeure)',
    formula: '1 2 3 4 5 6 7',
    intervals: [0,2,4,5,7,9,11],
    tips: 'Mode I -> maj7. La 4e naturelle est souvent avoid note ; souleve-la en #11 (Lydien) pour moderniser.',
    chordHint: 'Imaj7',
  },
  dorian: {
    label: 'Dorien',
    formula: '1 2 b3 4 5 6 b7',
    intervals: [0,2,3,5,7,9,10],
    tips: 'Mode II -> m7. La 6e majeure distingue le Dorien de l\'Eolien. Accord du II dans un II-V-I.',
    chordHint: 'IIm7',
  },
  phrygian: {
    label: 'Phrygien',
    formula: '1 b2 b3 4 5 b6 b7',
    intervals: [0,1,3,5,7,8,10],
    tips: 'Mode III. Couleur espagnole / phrygienne. Structuellement m7 mais utilise autrement (Levine).',
    chordHint: 'III / phrygien',
  },
  lydian: {
    label: 'Lydien',
    formula: '1 2 3 #4 5 6 7',
    intervals: [0,2,4,6,7,9,11],
    tips: 'Mode IV -> maj7(#11). La #4 remplace la 4e avoid ; sonne ouvert et moderne.',
    chordHint: 'IVmaj7(#11) / maj7#11',
  },
  mixolydian: {
    label: 'Mixolydien',
    formula: '1 2 3 4 5 6 b7',
    intervals: [0,2,4,5,7,9,10],
    tips: 'Mode V -> dominant 7. Base des V7 non alters. Ajoute un chromatisme b7-1 pour la bebop dominante.',
    chordHint: 'V7',
  },
  aeolian: {
    label: 'Eolien (mineure naturelle)',
    formula: '1 2 b3 4 5 b6 b7',
    intervals: [0,2,3,5,7,8,10],
    tips: 'Mode VI -> m7. La b6 le distingue du Dorien. Source du VI dans I-VI-II-V.',
    chordHint: 'VIm7',
  },
  locrian: {
    label: 'Locrien',
    formula: '1 b2 b3 4 b5 b6 b7',
    intervals: [0,1,3,5,6,8,10],
    tips: 'Mode VII -> m7b5 (half-diminished). Souvent le II d\'un II-V mineur.',
    chordHint: 'VIIm7b5 / IIm7b5 mineur',
  },
  melodicMinor: {
    label: 'Mineure melodique',
    formula: '1 2 b3 4 5 6 7',
    intervals: [0,2,3,5,7,9,11],
    tips: 'Mere des modes modernes. Son 7e mode = Altered. Accords de la meme MM souvent interchangeables.',
    chordHint: 'Im(maj7) / source V7alt',
  },
  lydianDominant: {
    label: 'Lydien dominant',
    formula: '1 2 3 #4 5 6 b7',
    intervals: [0,2,4,6,7,9,10],
    tips: '4e mode de la mineure melodique. Couleur 7(#11) — vibe modal jazz / fusion.',
    chordHint: '7(#11)',
  },
  altered: {
    label: 'Altered (Super-Locrien)',
    formula: '1 b2 #2 3 b5 #5 b7',
    intervals: [0,1,3,4,6,8,10],
    tips: '7e mode MM. Sur V7alt : b9 #9 #11 b13. Equivalent : MM 1/2 ton au-dessus du V.',
    chordHint: 'V7alt',
  },
  diminished: {
    label: 'Diminuee (H-W)',
    formula: 'H W H W H W H W',
    intervals: [0,1,3,4,6,7,9,10],
    tips: 'Seulement 3 collections. Ideal sur V7(b9) : tensions b9 #9 #11 13.',
    chordHint: 'V7b9 / dim',
  },
  diminishedWH: {
    label: 'Diminuee (W-H)',
    formula: 'W H W H W H W H',
    intervals: [0,2,3,5,6,8,9,11],
    tips: 'Ton / demi-ton : plutot sur accords diminues. Meme famille que H-W (3 collections).',
    chordHint: 'dim7',
  },
  wholeTone: {
    label: 'Par tons (whole-tone)',
    formula: '1 2 3 #4 #5 b7',
    intervals: [0,2,4,6,8,10],
    tips: 'Seulement 2 collections. Couleur 7(#5) / flottante — pas de resolution de demi-ton.',
    chordHint: '7#5 / +',
  },
  bebop: {
    label: 'Bebop dominante',
    formula: '1 2 3 4 5 6 b7 7',
    intervals: [0,2,4,5,7,9,10,11],
    tips: 'Mixo + chromatisme entre b7 et 1. Les chord tones tombent sur les temps forts (Levine ch.7).',
    chordHint: 'V7 / II-V',
  },
  bebopMajor: {
    label: 'Bebop majeure',
    formula: '1 2 3 4 5 #5 6 7',
    intervals: [0,2,4,5,7,8,9,11],
    tips: 'Majeure + chromatisme entre 5 et 6. Smooth sur Imaj7 / I6.',
    chordHint: 'Imaj7',
  },
  bebopDorian: {
    label: 'Bebop Dorien',
    formula: '1 2 b3 3 4 5 6 b7',
    intervals: [0,2,3,4,5,7,9,10],
    tips: 'Dorien + chromatisme entre b3 et 4. Memes notes que la bebop dominante du V du II-V.',
    chordHint: 'IIm7',
  },
  funkMinor: {
    label: 'Funk penta mineure',
    formula: '1 b3 4 5 b7',
    intervals: [0,3,5,7,10],
    tips: 'Meme notes que penta mineure : le feeling vient du rythme (2 et 4), pas des notes.',
    chordHint: 'm7 / funk',
  },
}

const FAMILY_KEYS: Record<string, string[]> = {
  majorPenta: ['majorPenta'],
  minorPenta: ['minorPenta'],
  diminished: ['diminished', 'diminishedWH'],
  jazz: ['dorian', 'mixolydian', 'melodicMinor', 'bebop', 'lydian', 'altered', 'lydianDominant', 'bebopMajor', 'bebopDorian', 'locrian', 'ionian'],
  funk: ['funkMinor', 'minorPenta', 'mixolydian', 'dorian'],
  theory: ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian', 'melodicMinor', 'altered', 'lydianDominant', 'diminished', 'wholeTone', 'bebop', 'bebopMajor'],
  mixed: Object.keys(SCALE_PATTERNS),
}

export function buildScale(root: string, intervals: number[]): string[] {
  const idx = noteIndex[root] ?? 0
  return intervals.map(i => NOTES[(idx + i) % 12])
}

export function getAllScales(family: string): (ScaleDef & { root: string; notes: string[] })[] {
  const rootPool = family === 'diminished' ? ['C','Db','D'] : [...NOTES]
  const patternKeys = FAMILY_KEYS[family] ?? ['majorPenta']
  return rootPool.flatMap(root =>
    patternKeys.map(pk => {
      const p = SCALE_PATTERNS[pk]
      return {
        key: `${root}-${pk}`,
        family: pk,
        label: p.label,
        formula: p.formula,
        intervals: p.intervals,
        tips: p.tips,
        chordHint: p.chordHint,
        root,
        notes: buildScale(root, p.intervals),
      }
    })
  )
}
