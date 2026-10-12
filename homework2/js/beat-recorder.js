import { playSound } from "./audio-engine.js";

export class BeatRecorder {
  constructor() {
  this.events = [];
  this.isRecording = false;
  this.isReplaying = false;
  this.startTime = 0;
}

  start() {
  if (this.isReplaying) {
    return false;
  }

  this.events = [];
  this.startTime = performance.now();
  this.isRecording = true;

  return true;
}

  record(soundPath) {
    if (!this.isRecording || !soundPath) {
      return;
    }

    const timestamp = performance.now() - this.startTime;

    this.events.push({
      soundPath,
      timestamp
    });
  }

  stop() {
    this.isRecording = false;
  }

  getEvents() {
    return this.events.map((event) => ({ ...event }));
  }


  
async replay() {
  if (
    this.isRecording ||
    this.isReplaying ||
    this.events.length === 0
  ) {
    return false;
  }

  this.isReplaying = true;

  try {
    const events = this.getEvents();
    const replayStart = performance.now();

    for (const event of events) {
      const elapsed = performance.now() - replayStart;
      const delay = Math.max(0, event.timestamp - elapsed);

      await new Promise((resolve) => {
        setTimeout(resolve, delay);
      });

      void playSound(event.soundPath);
    }

    return true;
  } finally {
    this.isReplaying = false;
  }
}

  clear() {
    this.isRecording = false;
    this.events = [];
    this.startTime = 0;
  }
}
