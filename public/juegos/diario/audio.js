// Sistema de audio procedural con Web Audio API y reproductor musical de banda sonora
class GameAudio {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.ambientOsc = null;
    this.ambientGain = null;

    // Reproductor de banda sonora oficial (archivo MP3)
    this.musicSrc = 'audio/tema-principal.mp3';
    this.bgMusic = null;
    this.isMusicPlaying = false;
    this.musicWanted = false; // Intención del usuario de tener música activa
    this.musicVolume = 0.6;
    this.listeners = [];

    this.initMusicPlayer();
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initMusicPlayer() {
    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      try {
        this.bgMusic = new Audio();
        this.bgMusic.src = this.musicSrc;
        this.bgMusic.loop = false; // Reproduce una sola vez para no fatigar al jugador
        this.bgMusic.volume = this.musicVolume;
        this.bgMusic.preload = 'metadata';

        this.bgMusic.addEventListener('play', () => {
          this.isMusicPlaying = true;
          this.notifyChange();
        });

        this.bgMusic.addEventListener('pause', () => {
          this.isMusicPlaying = false;
          this.notifyChange();
        });

        this.bgMusic.addEventListener('ended', () => {
          this.isMusicPlaying = false;
          this.musicWanted = false;
          this.notifyChange();
        });

        this.bgMusic.addEventListener('error', (e) => {
          // Si el archivo aún no ha sido colocado en la carpeta, no bloquear la experiencia
          console.warn('[Banda Sonora] El archivo tema-principal.mp3 aún no está presente en la carpeta /audio/ o el formato no es compatible:', e);
          this.isMusicPlaying = false;
          this.notifyChange();
        });
      } catch (err) {
        console.warn('Error inicializando el reproductor de música:', err);
      }
    }
  }

  onStateChange(cb) {
    if (typeof cb === 'function') {
      this.listeners.push(cb);
    }
  }

  notifyChange() {
    this.listeners.forEach((cb) => {
      try {
        cb({
          isMuted: this.isMuted,
          isMusicPlaying: this.isMusicPlaying,
          musicWanted: this.musicWanted
        });
      } catch (e) {}
    });
    this.updateUIElements();
  }

  updateUIElements() {
    if (typeof document === 'undefined') return;

    // Actualizar icono de efectos de sonido del HUD
    const soundIcon = document.getElementById('sound-icon');
    const btnSound = document.getElementById('btn-sound');
    if (soundIcon) {
      soundIcon.textContent = this.isMuted ? '🔇' : '🔊';
    }
    if (btnSound) {
      btnSound.title = this.isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos de sonido';
    }

    // Actualizar icono y estado de música del HUD
    const musicIcon = document.getElementById('music-icon');
    const btnMusic = document.getElementById('btn-music');
    if (musicIcon) {
      musicIcon.textContent = this.isMusicPlaying ? '🎵' : '⏸️';
    }
    if (btnMusic) {
      btnMusic.title = this.isMusicPlaying ? 'Pausar música' : 'Reanudar música';
      if (this.isMusicPlaying) {
        btnMusic.classList.add('music-playing');
        btnMusic.classList.remove('music-paused');
      } else {
        btnMusic.classList.remove('music-playing');
        btnMusic.classList.add('music-paused');
      }
    }

    // Actualizar controles de la pantalla de inicio
    const musicStatus = document.getElementById('title-music-status');
    const musicBtnText = document.getElementById('title-music-btn-text');
    const musicBtnIcon = document.getElementById('title-music-btn-icon');

    if (musicStatus) {
      if (this.isMuted) {
        musicStatus.textContent = 'Silenciado';
        musicStatus.className = 'music-status muted';
      } else if (this.isMusicPlaying) {
        musicStatus.textContent = 'Reproduciendo';
        musicStatus.className = 'music-status playing';
      } else {
        musicStatus.textContent = 'En pausa';
        musicStatus.className = 'music-status paused';
      }
    }

    if (musicBtnText) {
      musicBtnText.textContent = this.isMusicPlaying ? 'Pausar Banda Sonora' : 'Reproducir Banda Sonora';
    }

    if (musicBtnIcon) {
      musicBtnIcon.textContent = this.isMusicPlaying ? '⏸' : '▶';
    }
  }

  playMusic() {
    this.init();
    this.musicWanted = true;
    if (this.isMuted || !this.bgMusic) return;

    try {
      const playPromise = this.bgMusic.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isMusicPlaying = true;
            this.notifyChange();
          })
          .catch((err) => {
            // Autoplay bloqueado por el navegador o archivo aún no subido
            console.log('[Banda Sonora] Reproducción en espera de interacción o archivo no encontrado:', err.message);
            this.isMusicPlaying = false;
            this.notifyChange();
          });
      }
    } catch (e) {
      console.warn('Excepción al reproducir música:', e);
    }
  }

  pauseMusic() {
    this.musicWanted = false;
    if (this.bgMusic) {
      try {
        this.bgMusic.pause();
      } catch (e) {}
    }
    this.isMusicPlaying = false;
    this.notifyChange();
  }

  // Reproducir de nuevo entera desde el principio (para pantalla de logros o final)
  replayMusic() {
    this.init();
    this.musicWanted = true;
    if (!this.bgMusic) return;

    try {
      this.bgMusic.currentTime = 0;
      if (this.isMuted) {
        this.toggleMute(); // Asegurar que se escuche en la pantalla de logros
      }
      const playPromise = this.bgMusic.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isMusicPlaying = true;
            this.notifyChange();
          })
          .catch((err) => {
            console.log('[Banda Sonora] Reproducción en espera de interacción:', err.message);
            this.isMusicPlaying = false;
            this.notifyChange();
          });
      }
    } catch (e) {
      console.warn('Excepción al reiniciar música:', e);
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.pauseMusic();
    } else {
      if (this.isMuted) {
        this.toggleMute();
      }
      this.playMusic();
    }
    return this.isMusicPlaying;
  }

  setMusicVolume(vol) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.bgMusic) {
      this.bgMusic.volume = this.musicVolume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.audioCtx.currentTime);
    }

    if (this.bgMusic) {
      if (this.isMuted) {
        try {
          this.bgMusic.pause();
        } catch (e) {}
      } else if (this.musicWanted) {
        try {
          this.bgMusic.play().catch(() => {});
        } catch (e) {}
      }
    }

    this.notifyChange();
    return this.isMuted;
  }

  // Sonido sutil de pulsación o máquina de escribir
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      // Ignorar fallos de interacción no autorizada en navegadores
    }
  }

  // Sonido reconfortante: subida de esperanza o hallazgo positivo
  playHopeUp() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const notes = [261.63, 329.63, 392.00, 523.25]; // Acorde C mayor
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, this.audioCtx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.06, this.audioCtx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(this.audioCtx.currentTime + idx * 0.08);
        osc.stop(this.audioCtx.currentTime + idx * 0.08 + 0.4);
      });
    } catch (e) {}
  }

  // Sonido de tensión o caída de esperanza
  playHopeDown() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(65, this.audioCtx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.48);
    } catch (e) {}
  }

  // Tono fúnebre unificado / Game Over
  playGameOver() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(45, this.audioCtx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 1.35);
    } catch (e) {}
  }

  // Fanfarria unificada de Final de Etapa
  playStageComplete() {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25]; // Progresión triunfal C4 - E4 - G4 - B4 - C5
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        const startTime = this.audioCtx.currentTime + idx * 0.11;
        const duration = idx === notes.length - 1 ? 0.65 : 0.35;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.09, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    } catch (e) {}
  }

  // Zumbido ambiental sutil de aislamiento / estática
  startAtmosphere() {
    if (this.isMuted || this.ambientOsc) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      this.ambientOsc = this.audioCtx.createOscillator();
      this.ambientGain = this.audioCtx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(55, this.audioCtx.currentTime); // 55Hz low hum

      this.ambientGain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.audioCtx.destination);

      this.ambientOsc.start();
    } catch (e) {}
  }
}

const audio = new GameAudio();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameAudio, audio };
}
