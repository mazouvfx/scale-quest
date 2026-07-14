'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { getAllScales, SCALE_PATTERNS } from '@/lib/scales'
import { LICKS } from '@/lib/licks'
import { useMidi } from '@/lib/midi'

const NOTE_COLORS = ['#5ce1e6','#7c8cff','#e766ff','#f8cf62','#69da8c','#ff7d95']
const WHITE_NOTES = ['C','D','E','F','G','A','B']
const FAMILIES = [
  { value: 'majorPenta', label: 'Penta majeure' },
  { value: 'minorPenta', label: 'Penta mineure' },
  { value: 'diminished', label: 'Diminuee' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'funk', label: 'Funk' },
  { value: 'mixed', label: 'Mix total' },
]
const MODES = [
  { value: 'notes', label: 'Notes de la gamme' },
  { value: 'name', label: 'Nom de la gamme' },
  { value: 'formula', label: 'Formule' },
]
const BADGE_DEFS = [
  { slug: 'first-correct', label: 'Premier correct', cond: (s: GameState) => s.score >= 1 },
  { slug: 'combo-3', label: 'Combo x3', cond: (s: GameState) => s.combo >= 3 },
  { slug: 'combo-5', label: 'Combo x5', cond: (s: GameState) => s.combo >= 5 },
  { slug: 'level-3', label: 'Niveau 3', cond: (s: GameState) => s.level >= 3 },
  { slug: 'midi-play', label: 'MIDI connecte', cond: (s: GameState) => s.midiUsed },
]
interface GameState {
  score: number; combo: number; xp: number; level: number; badges: Set<string>; midiUsed: boolean
}
interface RollNote { note: string; x: number; y: number; w: number; h: number; color: string; id: string }
interface QuizQuestion {
  text: string; answers: string[]; correct: string; scale: { root: string; notes: string[]; label: string; tips: string }
}

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }
function sample<T>(arr: T[], n: number, exclude?: T): T[] { return shuffle(arr.filter(v => v !== exclude)).slice(0, n) }

export default function Home() {
  const [family, setFamily] = useState('majorPenta')
  const [mode, setMode] = useState('notes')
  const [tempo, setTempo] = useState(110)
  const [question, setQuestion] = useState<QuizQuestion | null>(null)
  const [chosen, setChosen] = useState<string | null>(null)
  const [rollNotes, setRollNotes] = useState<RollNote[]>([])
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [tab, setTab] = useState<'quiz'|'roll'|'licks'>('quiz')
  const [gameState, setGameState] = useState<GameState>({ score:0, combo:0, xp:0, level:1, badges: new Set(), midiUsed:false })
  const animRef = useRef<number>(0)
  const rollOffsetRef = useRef(0)
  const [midiExpected, setMidiExpected] = useState<string[]>([])
  const [midiProgress, setMidiProgress] = useState(0)

  const handleCorrect = useCallback(() => {
    setGameState(prev => {
      const combo = prev.combo + 1
      const xp = prev.xp + 15 + (combo > 2 ? combo * 3 : 0)
      const level = Math.floor(xp / 100) + 1
      const badges = new Set(prev.badges)
      BADGE_DEFS.forEach(b => { if (b.cond({ ...prev, combo, xp, level })) badges.add(b.slug) })
      return { ...prev, score: prev.score + 1, combo, xp, level, badges }
    })
  }, [])

  const onMidiNote = useCallback((midi: { note: number; name: string; velocity: number }) => {
    setGameState(s => ({ ...s, midiUsed: true }))
    setActiveKeys(prev => { const next = [...prev]; if (!next.includes(midi.name)) next.push(midi.name); return next })
    setTimeout(() => setActiveKeys(prev => prev.filter(n => n !== midi.name)), 350)
    setMidiProgress(prev => {
      if (midiExpected.length === 0) return prev
      const expected = midiExpected[prev]
      if (expected && midi.name === expected) {
        const next = prev + 1
        if (next >= midiExpected.length) { handleCorrect(); setMidiExpected([]); return 0 }
        return next
      }
      return prev
    })
  }, [midiExpected, handleCorrect])

  const { connected, deviceName } = useMidi(onMidiNote)

  const xpNeeded = gameState.level * 100
  const xpPct = Math.min(100, (gameState.xp % xpNeeded) / xpNeeded * 100)

  function handleWrong() { setGameState(prev => ({ ...prev, combo: 0 })) }

  function newQuestion() {
    const scales = getAllScales(family) as any[]
    const cur = shuffle(scales)[0]
    let q: QuizQuestion
    if (mode === 'notes') {
      const correct = cur.notes.join(' - ')
      const wrongs = sample(scales.map((s:any) => s.notes.join(' - ')), 3, correct)
      q = { text: 'Notes de ' + cur.root + ' ' + cur.label + ' ?', answers: shuffle([correct, ...wrongs]), correct, scale: cur }
    } else if (mode === 'name') {
      const correct = cur.root + ' ' + cur.label
      const wrongs = sample(scales.map((s:any) => s.root + ' ' + s.label), 3, correct)
      q = { text: 'Nom de cette gamme ? ' + cur.notes.join(' - '), answers: shuffle([correct, ...wrongs]), correct, scale: cur }
    } else {
      const correct = cur.formula
      const wrongs = sample(Object.values(SCALE_PATTERNS).map((p:any) => p.formula), 3, correct)
      q = { text: 'Formule de ' + cur.root + ' ' + cur.label + ' ?', answers: shuffle([correct, ...wrongs]), correct, scale: cur }
    }
    setQuestion(q); setChosen(null)
    setMidiExpected(q.scale.notes ?? []); setMidiProgress(0)
    buildRollNotes(q.scale.notes)
    setActiveKeys(q.scale.notes)
    setTimeout(() => setActiveKeys([]), 1200)
  }

  function answer(a: string) {
    if (chosen) return
    setChosen(a)
    if (a === question?.correct) handleCorrect(); else handleWrong()
  }

  function buildRollNotes(notes: string[]) {
    const w = 900; const laneW = w / 14
    const whiteMap: Record<string,number> = {}
    WHITE_NOTES.forEach((n,i) => { whiteMap[n]=i; whiteMap[n+'2']=i+7 })
    const rn: RollNote[] = notes.map((n,i) => {
      const base = n.replace('b','').replace('#','')
      const lane = (whiteMap[base] ?? i % 14)
      return { note: n, x: lane * laneW + 3, y: -40 - i * 52, w: laneW - 6, h: 38, color: NOTE_COLORS[i % NOTE_COLORS.length], id: n + '-' + i }
    })
    setRollNotes(rn)
  }

  function startRoll(notes: string[]) {
    buildRollNotes(notes)
    rollOffsetRef.current = 0
    const spd = (900 / (tempo / 60 * 4)) / 60
    const step = () => {
      rollOffsetRef.current += spd
      setRollNotes(prev => prev.map(n => ({ ...n, y: n.y + spd })))
      if (rollOffsetRef.current < 1200) animRef.current = requestAnimationFrame(step)
      else setActiveKeys([])
    }
    animRef.current = requestAnimationFrame(step)
  }

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current) }, [])

  const lick = LICKS[lickIdx % LICKS.length]
  const [lickIdx, setLickIdx] = useState(0)

  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#0d1120] via-[#0b0d12] to-[#10131a]">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-pink grid place-items-center shadow-lg text-xl">piano</div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight">Scale Quest</h1>
              <p className="text-slate-400 text-sm">Memorise gammes, licks et patterns</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {connected
              ? <span className="chip border-neon-cyan/40 text-neon-cyan">MIDI: {deviceName ?? 'connecte'}</span>
              : <span className="chip text-slate-500">Aucun MIDI</span>
            }
            <span className="chip">Score {gameState.score}</span>
            <span className="chip border-neon-gold/40 text-neon-gold">XP {gameState.xp}</span>
          </div>
        </header>

        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs text-slate-500">Niv. {gameState.level}</span>
          <div className="flex-1 h-2 bg-panel-2 rounded-full border border-panel-border overflow-hidden">
            <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300" style={{width:xpPct+'%'}}/>
          </div>
          <span className="text-xs text-slate-500">{gameState.xp} XP</span>
        </div>

        <div className="flex gap-2 mb-5">
          {(['quiz','roll','licks'] as const).map(t => (
            <button key={t} className={'btn text-sm ' + (tab===t ? 'btn-primary' : '')} onClick={()=>setTab(t)}>
              {t==='quiz' ? 'Quiz' : t==='roll' ? 'Piano Roll' : 'Licks'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 flex flex-col gap-5">

            {tab === 'quiz' && (
              <section className="panel">
                <div className="flex flex-wrap gap-3 mb-5">
                  <select className="btn text-sm" value={family} onChange={e=>setFamily(e.target.value)}>
                    {FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                  <select className="btn text-sm" value={mode} onChange={e=>setMode(e.target.value)}>
                    {MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                  <button className="btn btn-primary" onClick={newQuestion}>Nouvelle question</button>
                </div>
                {question ? (
                  <>
                    <div className="rounded-2xl bg-panel-2 border border-panel-border p-4 mb-4 font-medium">{question.text}</div>
                    <div className="grid grid-cols-2 gap-3">
                      {question.answers.map((a,i) => {
                        let cls = 'btn text-left text-sm'
                        if (chosen) {
                          if (a === question.correct) cls += ' !border-neon-green !bg-neon-green/10 !text-neon-green'
                          else if (a === chosen) cls += ' !border-neon-red !bg-neon-red/10 !text-neon-red'
                        }
                        return <button key={i} className={cls} onClick={()=>answer(a)}>{a}</button>
                      })}
                    </div>
                    {chosen && (
                      <div className={'mt-4 rounded-2xl p-3 text-sm ' + (chosen===question.correct ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green' : 'bg-neon-red/10 border border-neon-red/30 text-neon-red')}>
                        {chosen===question.correct ? 'Correct!' : 'Rate - bonne reponse: '+question.correct}
                        <div className="text-slate-400 mt-1">{question.scale.tips}</div>
                      </div>
                    )}
                    {connected && midiExpected.length > 0 && (
                      <div className="mt-3 rounded-2xl bg-panel-2 border border-neon-cyan/20 p-3 text-sm">
                        <span className="text-neon-cyan">Joue sur ton clavier: </span>
                        {midiExpected.map((n,i) => (
                          <span key={i} className={'inline-block mr-1 px-2 py-0.5 rounded-full text-xs font-bold ' + (i < midiProgress ? 'bg-neon-green/20 text-neon-green' : i===midiProgress ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-panel border border-panel-border')}>{n}</span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 text-slate-500">Appuie sur Nouvelle question pour commencer.</div>
                )}
              </section>
            )}

            {tab === 'roll' && (
              <section className="panel">
                <div className="flex flex-wrap gap-3 mb-4">
                  <select className="btn text-sm" value={family} onChange={e=>setFamily(e.target.value)}>
                    {FAMILIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                  </select>
                  <select className="btn text-sm" value={tempo} onChange={e=>setTempo(Number(e.target.value))}>
                    {[80,100,120,140].map(t => <option key={t} value={t}>{t} BPM</option>)}
                  </select>
                  <button className="btn btn-primary" onClick={()=>{ const s=shuffle(getAllScales(family) as any[])[0]; startRoll(s.notes) }}>Lire gamme</button>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-panel-border bg-[#080c14]" style={{height:340}}>
                  {rollNotes.map(n => (
                    <div key={n.id} className="absolute rounded-xl" style={{left:n.x,top:n.y,width:n.w,height:n.h,background:'linear-gradient(180deg,'+n.color+','+n.color+'88)',boxShadow:'0 0 10px '+n.color+'66'}}>
                      <span className="text-[10px] font-bold text-black/70 pl-1">{n.note}</span>
                    </div>
                  ))}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-neon-cyan/30"/>
                </div>
                <PianoKeys active={activeKeys}/>
              </section>
            )}

            {tab === 'licks' && (
              <section className="panel">
                <div className="flex flex-wrap gap-3 mb-5">
                  {LICKS.map((l,i) => (
                    <button key={l.id} className={'btn text-sm ' + (lickIdx===i ? 'btn-primary' : '')} onClick={()=>setLickIdx(i)}>{l.title}</button>
                  ))}
                </div>
                <div className="rounded-2xl bg-panel-2 border border-panel-border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-display font-semibold">{lick.title}</div>
                      <div className="text-neon-cyan text-sm">{lick.artist}</div>
                    </div>
                    <span className="chip">{lick.tempo} BPM</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{lick.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {lick.notes.map((n,i) => <span key={i} className="chip" style={{borderColor:NOTE_COLORS[i%NOTE_COLORS.length]+'66',color:NOTE_COLORS[i%NOTE_COLORS.length]}}>{n}</span>)}
                  </div>
                  <div className="rounded-xl p-3 text-sm border border-neon-gold/20 bg-neon-gold/5 text-neon-gold/90">{lick.tip}</div>
                  <div className="flex gap-3 mt-4">
                    <button className="btn btn-primary" onClick={()=>startRoll(lick.notes)}>Lire le lick</button>
                    <button className="btn" onClick={()=>{ setActiveKeys(lick.notes); setTimeout(()=>setActiveKeys([]),1500) }}>Voir clavier</button>
                  </div>
                </div>
                <PianoKeys active={activeKeys}/>
              </section>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <section className="panel">
              <h2 className="font-display text-lg font-semibold mb-3">Progression</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="stat-card"><div className="text-slate-500 text-xs">Score</div><div className="text-2xl font-display font-semibold text-neon-cyan">{gameState.score}</div></div>
                <div className="stat-card"><div className="text-slate-500 text-xs">Combo</div><div className="text-2xl font-display font-semibold text-neon-pink">{gameState.combo}x</div></div>
                <div className="stat-card"><div className="text-slate-500 text-xs">Niveau</div><div className="text-2xl font-display font-semibold text-neon-gold">{gameState.level}</div></div>
                <div className="stat-card"><div className="text-slate-500 text-xs">XP</div><div className="text-2xl font-display font-semibold text-neon-purple">{gameState.xp}</div></div>
              </div>
            </section>
            <section className="panel">
              <h2 className="font-display text-lg font-semibold mb-3">Badges</h2>
              <div className="flex flex-wrap gap-2">
                {BADGE_DEFS.map(b => (
                  <span key={b.slug} className={'badge ' + (gameState.badges.has(b.slug) ? 'badge-earned' : 'opacity-40')}>{b.label}</span>
                ))}
              </div>
            </section>
            <section className="panel">
              <h2 className="font-display text-lg font-semibold mb-2">MIDI</h2>
              <p className="text-slate-400 text-sm mb-3">Connecte ton Roland Juno D7 via USB.</p>
              <div className={'rounded-xl p-3 text-sm border ' + (connected ? 'border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan' : 'border-panel-border bg-panel-2 text-slate-500')}>
                {connected ? ('Connecte: ' + deviceName) : 'Aucun appareil MIDI detecte'}
              </div>
              <p className="text-slate-500 text-xs mt-2">Sur iPad: utilise Web MIDI Browser.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function PianoKeys({ active }: { active: string[] }) {
  const whites = ['C','D','E','F','G','A','B','C','D','E','F','G','A','B']
  return (
    <div className="grid mt-4 gap-0.5" style={{gridTemplateColumns:'repeat('+whites.length+',1fr)'}}>
      {whites.map((n,i) => (
        <div key={i} className={'key-white h-20 ' + (active.includes(n) ? 'key-active' : '')}>
          {(i===0||i===7) && <span className="text-[9px]">{n}</span>}
        </div>
      ))}
    </div>
  )
}
