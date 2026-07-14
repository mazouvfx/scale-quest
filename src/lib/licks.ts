export interface Lick {
  id: string
  title: string
  artist: string
  style: string
  tempo: number
  notes: string[]
  desc: string
  tip: string
}

export const LICKS: Lick[] = [
  {
    id: 'op-run-1',
    title: 'Run pentatonique ascendant',
    artist: 'Style Oscar Peterson',
    style: 'jazz',
    tempo: 132,
    notes: ['C','E','G','A','C','E','G','A'],
    desc: 'Montée régulière sur la penta majeure. Travaille la vitesse et la régularité.',
    tip: 'Peterson utilisait des runs très réguliers et bien articulés. Pense à garder le poignet souple.'
  },
  {
    id: 'op-bebop-1',
    title: 'Cellule bebop',
    artist: 'Style bebop',
    style: 'jazz',
    tempo: 120,
    notes: ['G','F','E','Eb','D','C','B','Bb'],
    desc: 'Descente chromatique bebop. L\'approche par demi-ton donne la tension.',
    tip: 'Place les notes d\'accord sur les temps forts. Le chromatisme est entre les degrés.'
  },
  {
    id: 'funk-cell-1',
    title: 'Cellule funk syncopée',
    artist: 'Style funk/soul',
    style: 'funk',
    tempo: 96,
    notes: ['F','Ab','Bb','C','Eb','C','Bb','Ab'],
    desc: 'Pentatonique mineure en F. Accentue les notes sur le 2 et le 4.',
    tip: 'Lock with the bass drum. La main gauche peut doubler en octaves.'
  },
  {
    id: 'jazz-minor-1',
    title: 'Lick mineur mélodique',
    artist: 'Style post-bop',
    style: 'jazz',
    tempo: 110,
    notes: ['D','E','F','G','A','B','C','D'],
    desc: 'Monte sur la mineure mélodique de D. Couleur jazz moderne.',
    tip: 'À partir du 4e degré, ça sonne lydien. Essaie avec la main gauche sur le IVmaj7.'
  },
  {
    id: 'op-swing-1',
    title: 'Swing run',
    artist: 'Style Oscar Peterson / Art Tatum',
    style: 'jazz',
    tempo: 140,
    notes: ['G','A','Bb','C','D','Eb','F','G'],
    desc: 'Run swingué en gamme dorien. Fluidité et swing.',
    tip: 'Tatum et Peterson avaient une fluidité à haute vitesse. Commence lentement à 60 BPM.'
  },
  {
    id: 'funk-chords-1',
    title: 'Phrasé funk accords',
    artist: 'Style Herbie Hancock / Stevie Wonder',
    style: 'funk',
    tempo: 90,
    notes: ['Eb','G','Bb','Eb','Db','Bb','G','Eb'],
    desc: 'Accords plaqués en Eb. Syncope sur le deuxième temps.',
    tip: 'Le feeling funk vient du rythme, pas des notes. Travaille avec un métronome.'
  }
]
