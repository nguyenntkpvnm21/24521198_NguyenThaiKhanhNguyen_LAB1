
import { playSound } from "./audio-engine.js";

const drumPads = document.querySelectorAll(".drum-pad");


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


// Handle mouse clicks
drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const soundPath = pad.dataset.sound;
    activatePad(pad);
    playSound(soundPath);
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

  activatePad(pad);
  playSound(pad.dataset.sound);
});
