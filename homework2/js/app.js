import { playSound } from "./audio-engine.js";
import { BeatRecorder } from "./beat-recorder.js";

const drumPads = document.querySelectorAll(".drum-pad");

const recorder = new BeatRecorder();

const recordBtn = document.querySelector("#record-btn");
const stopBtn = document.querySelector("#stop-btn");
const replayBtn = document.querySelector("#replay-btn");
const clearBtn = document.querySelector("#clear-btn");
const recorderStatus = document.querySelector("#recorder-status");

const activeTimers = new WeakMap();

function activatePad(pad) {
  pad.classList.add("active");

  const previousTimer = activeTimers.get(pad);

  if (previousTimer) {
    clearTimeout(previousTimer);
  }

  const timer = setTimeout(() => {
    pad.classList.remove("active");
    activeTimers.delete(pad);
  }, 100);

  activeTimers.set(pad, timer);
}

function triggerPad(pad) {
  const soundPath = pad.dataset.sound;

  if (!soundPath) {
    return;
  }

  activatePad(pad);
  void playSound(soundPath);

  if (recorder.isRecording) {
    recorder.record(soundPath);
  }
}

// Handle mouse clicks
drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const soundPath = pad.dataset.sound;
    triggerPad(pad);
  });
});

// Handle keyboard input
window.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  const pressedKey = event.key.toLowerCase();

  const pad = [...drumPads].find(
    (item) => item.dataset.key === pressedKey
  );

  if (!pad) {
    return;
  }

  triggerPad(pad);
});


// Start recording
recordBtn.addEventListener("click", () => {
  if (!recorder.start()) {
    return;
  }

  recorderStatus.textContent = "Recording...";

  recordBtn.disabled = true;
  stopBtn.disabled = false;
  replayBtn.disabled = true;
  clearBtn.disabled = true;
});

// Stop recording
stopBtn.addEventListener("click", () => {
  recorder.stop();

  const eventCount = recorder.getEvents().length;

  recorderStatus.textContent =
    `Recording stopped. ${eventCount} beats recorded.`;

  recordBtn.disabled = false;
  stopBtn.disabled = true;
  replayBtn.disabled = eventCount === 0;
  clearBtn.disabled = eventCount === 0;
});

// Clear recording
clearBtn.addEventListener("click", () => {
  if (recorder.isRecording || recorder.isReplaying) {
    return;
  }

  recorder.clear();

  recorderStatus.textContent = "Recording cleared.";

  recordBtn.disabled = false;
  stopBtn.disabled = true;
  replayBtn.disabled = true;
  clearBtn.disabled = true;
  
  // Replay recorded beats
  replayBtn.addEventListener("click", async () => {
    if (recorder.isRecording || recorder.isReplaying) {
      return;
    }

    recorderStatus.textContent = "Replaying...";

    recordBtn.disabled = true;
    stopBtn.disabled = true;
    replayBtn.disabled = true;
    clearBtn.disabled = true;

    try {
      const success = await recorder.replay();

      recorderStatus.textContent = success
        ? "Replay completed."
        : "No beats available for replay.";
    } catch (error) {
      console.error("Replay failed:", error);
      recorderStatus.textContent = "Replay failed.";
    } finally {
      recordBtn.disabled = false;
      stopBtn.disabled = true;
      replayBtn.disabled = recorder.getEvents().length === 0;
      clearBtn.disabled = recorder.getEvents().length === 0;
    }
  });

});
