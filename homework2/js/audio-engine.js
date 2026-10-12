
export function playSound(soundPath) {
  if (!soundPath) {
    return Promise.resolve(false);
  }

  const audio = new Audio(soundPath);

  return audio.play()
    .then(() => true)
    .catch((error) => {
      console.error("Audio playback failed:", error);
      return false;
    });
}
