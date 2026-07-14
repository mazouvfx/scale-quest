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
}

export const SCALE_PATTERNS: Record<string, Omit<ScaleDef,'key'|'family'>> = {
  majorPenta: { label: 'Pentatonique majeure', formula: '1 2 3 5 6', intervals: [0,2,4,7,9], tips: 'Commence sur la tonique, saute la 4e et la 7e. Sonne lumineux sur I et IV.' },
  minorPenta: { label: 'Pentatonique mineure', formula: '1 b3 4 5 b7', intervals: [0,3,5,7,10], tips: 'Base du blues et du funk. La b3 donne toute la couleur.' },
  diminished: { label: 'Diminuee (H-W)', formula: 'H W H W H W H W', intervals: [0,1,3,4,6,7,9,10], tips: 'Seulement 3 collections distinctes. Pense b9, #9, b5 sur un accord dom7.' },
  dorian: { label: 'Dorien', formula: '1 2 b3 4 5 6 b7', intervals: [0,2,3,5,7,9,10], tips: 'La 6e majeure sur fond mineur. Couleur jazz douce, base du funk. Ex: D dorian = D E F G A B C' },
  mixolydian: { label: 'Mixolydien', formula: '1 2 3 4 5 6 b7', intervals: [0,2,4,5,7,9,10], tips: 'Majeur avec une b7. Ideal sur les dominantes. Oscar Peterson aimait les runs mixo.' },
  melodicMinor: { label: 'Mineure melodique', formula: '1 2 b3 4 5 6 7', intervals: [0,2,3,5,7,9,11], tips: 'Super-Locrien (7e mode) = alteree. Tension maximale sur V7alt.' },
  bebop: { label: 'Bebop dominante', formula: '1 2 3 4 5 6 b7 7', intervals: [0,2,4,5,7,9,10,11], tips: 'Gamme a 8 notes. Les accords tombent toujours sur les temps forts.' },
  funkMinor: { label: 'Funk penta mineure', formula: '1 b3 4 5 b7', intervals: [0,3,5,7,10], tips: 'Meme que mineure penta mais pense en syncopes. Accent sur le 2 et le 4.' }
}

export function buildScale(root: string, intervals: number[]): string[] {
  const idx = noteIndex[root] ?? 0
  return intervals.map(i => NOTES[(idx + i) % 12])
}

export function getAllScales(family: string): ScaleDef[] {
  const rootPool = family === 'diminished' ? ['C','Db','D'] : [...NOTES]
  const patternKeys = family === 'jazz' ? ['dorian','mixolydian','melodicMinor','bebop']
    : family === 'funk' ? ['funkMinor','minorPenta']
    : family === 'mixed' ? Object.keys(SCALE_PATTERNS)
    : [family in SCALE_PATTERNS ? family : 'majorPenta']
  return rootPool.flatMap(root =>
    patternKeys.map(pk => ({
      key: `${root}-${pk}`,
      family: pk,
      label: SCALE_PATTERNS[pk].label,
      formula: SCALE_PATTERNS[pk].formula,
      intervals: SCALE_PATTERNS[pk].intervals,
      tips: SCALE_PATTERNS[pk].tips,
      root,
      notes: buildScale(root, SCALE_PATTERNS[pk].intervals)
    } as ScaleDef & { root: string; notes: string[] }))
  )
}
