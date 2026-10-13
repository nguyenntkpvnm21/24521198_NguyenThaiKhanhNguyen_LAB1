
"use strict";

// HW3-03: Drift-Free Countdown Engine

function initializeCountdown() {
  const countdown = document.querySelector("#countdown");
  const status = document.querySelector("#countdown-status");

  if (!countdown || !status) {
    return;
  }

  const deadlineText = countdown.dataset.deadline;
  const deadline = Date.parse(deadlineText);

  if (
  !deadlineText ||
  !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(deadlineText) ||
  !Number.isFinite(deadline)
) {
  status.textContent = "Invalid event deadline.";
  return;
}

  const daysElement = countdown.querySelector('[data-unit="days"]');
  const hoursElement = countdown.querySelector('[data-unit="hours"]');
  const minutesElement = countdown.querySelector('[data-unit="minutes"]');
  const secondsElement = countdown.querySelector('[data-unit="seconds"]');

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    status.textContent = "Countdown elements are missing.";
    return;
  }

  let intervalId = null;

  function updateCountdown() {
    const remaining = Math.max(0, deadline - Date.now());
    const totalSeconds = Math.ceil(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

    if (remaining === 0) {
      status.textContent = "The event has started!";

      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  }

  updateCountdown();

  if (Date.now() < deadline) {
    intervalId = setInterval(updateCountdown, 1000);
  }
}

initializeCountdown();
