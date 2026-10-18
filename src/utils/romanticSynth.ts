/**
 * Web Audio API romantic music box synthesizer
 * Plays a warm, sweet acoustic piano / music box chord progression
 * Ensures music plays even if local audio files are missing or blocked.
 */

class RomanticMusicSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [
    // Melody notes in Hz (romantic Pentatonic & Major scale chords)
    // C4, E4, G4, B4, C5, D5, E5, G5, A5
    261.63, 329.63, 392.00, 493.88, 523.25, 587.33, 659.25, 783.99, 880.00
  ];

  private chordProgressions = [
    [261.63, 329.63, 392.00, 523.25], // C major
    [220.00, 261.63, 329.63, 440.00], // A minor
    [174.61, 220.00, 261.63, 349.23], // F major
    [196.00, 246.94, 293.66, 392.00]  // G major
  ];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isPlaying = true;

      let chordIdx = 0;
      let noteStep = 0;

      const playNextArpeggio = () => {
        if (!this.isPlaying || !this.ctx || !this.masterGain) return;

        const currentChord = this.chordProgressions[chordIdx % this.chordProgressions.length];
        const noteFreq = currentChord[noteStep % currentChord.length];

        // Random subtle melody note on top
        const melodyNote = this.notes[(noteStep * 2 + chordIdx) % this.notes.length];

        this.playPluck(noteFreq, 1.2, 0.15);
        if (noteStep % 2 === 0) {
          this.playPluck(melodyNote, 1.6, 0.12);
        }

        noteStep++;
        if (noteStep >= 4) {
          noteStep = 0;
          chordIdx++;
        }

        this.timerId = window.setTimeout(playNextArpeggio, 450);
      };

      playNextArpeggio();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  private playPluck(freq: number, duration: number, volume: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm sine + subtle triangle overtone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Music box envelope: instant attack, exponential decay
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio node cleanup
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {
        // ignore
      }
      this.ctx = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticSynth = new RomanticMusicSynth();
