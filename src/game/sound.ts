export class Piezo {
  private audioContext = new window.AudioContext();
  private oscillator: OscillatorNode | null = null;

  play(freq: number, lenght: number): void {
    if (this.oscillator) {
      this.oscillator.stop();
    }

    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = "sine"; // You can change the type to 'sine', 'square', 'sawtooth', or 'triangle'
    this.oscillator.frequency.setValueAtTime(
      freq,
      this.audioContext.currentTime
    ); // Initial frequency (440 Hz)
    const gainNode = this.audioContext.createGain();
    this.oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    this.oscillator.start();

    // Increase pitch by doubling the frequency

    // Stop the this.oscillator after 1 second
    this.oscillator.stop(this.audioContext.currentTime + lenght);
  }
}
