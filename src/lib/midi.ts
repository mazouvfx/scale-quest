'use client'
import { useEffect, useRef, useState } from 'react'

export interface MidiNote {
  note: number
  name: string
  velocity: number
}

const MIDI_NOTE_NAMES = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']
export function midiToName(midi: number): string {
  return MIDI_NOTE_NAMES[midi % 12]
}

export function useMidi(onNoteOn?: (note: MidiNote) => void) {
  const [connected, setConnected] = useState(false)
  const [deviceName, setDeviceName] = useState<string | null>(null)
  const cbRef = useRef(onNoteOn)
  cbRef.current = onNoteOn

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('requestMIDIAccess' in navigator)) return
    let inputs: WebMidi.MIDIInput[] = []
    const handler = (msg: WebMidi.MIDIMessageEvent) => {
      const [status, note, vel] = msg.data
      if ((status & 0xf0) === 0x90 && vel > 0) {
        cbRef.current?.({ note, name: midiToName(note), velocity: vel })
      }
    }
    navigator.requestMIDIAccess().then(access => {
      const connect = () => {
        inputs.forEach(i => i.removeEventListener('midimessage', handler as EventListener))
        inputs = [...access.inputs.values()]
        inputs.forEach(i => i.addEventListener('midimessage', handler as EventListener))
        const dev = inputs[0]
        setConnected(inputs.length > 0)
        setDeviceName(dev ? dev.name : null)
      }
      connect()
      access.onstatechange = connect
    }).catch(() => { setConnected(false) })
    return () => { inputs.forEach(i => i.removeEventListener('midimessage', handler as EventListener)) }
  }, [])

  return { connected, deviceName }
}
