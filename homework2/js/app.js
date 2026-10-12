
import { playSound } from "./audio-engine.js";

const drumPads = document.querySelectorAll(".drum-pad");

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const soundPath = pad.dataset.sound;
    playSound(soundPath);
  });
});
