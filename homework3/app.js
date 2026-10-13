
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


/* HW3-04: Registration Form State Machine */

const FORM_STATE = Object.freeze({
    IDLE: "idle",
    SUBMITTING: "submitting",
    SUCCESS: "success",
    ERROR: "error"
});

function initializeRegistrationForm() {
    const form = document.querySelector("#registration-form");
    const submitButton = document.querySelector("#submit-button");
    const status = document.querySelector("#form-status");

    if (!form || !submitButton || !status) {
        return;
    }

    let currentState = FORM_STATE.IDLE;


    function renderState(message = "") {
        const isSubmitting = currentState === FORM_STATE.SUBMITTING;

        status.dataset.state = currentState;
        status.textContent = message;

        submitButton.disabled = isSubmitting;
        submitButton.setAttribute("aria-disabled", String(isSubmitting));

        submitButton.textContent = isSubmitting
            ? "Submitting..."
            : "Register";
    }


    function transitionTo(nextState, message = "") {
        const validTransitions = {
            [FORM_STATE.IDLE]: [FORM_STATE.SUBMITTING],
            [FORM_STATE.SUBMITTING]: [
                FORM_STATE.SUCCESS,
                FORM_STATE.ERROR
            ],
            [FORM_STATE.SUCCESS]: [FORM_STATE.SUBMITTING],
            [FORM_STATE.ERROR]: [FORM_STATE.SUBMITTING]
        };

        if (!validTransitions[currentState].includes(nextState)) {
            return false;
        }

        currentState = nextState;
        renderState(message);
        return true;
    }

    async function simulateRegistration() {
        // Temporary mock: no backend request is sent.
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return { ok: true };
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (currentState === FORM_STATE.SUBMITTING) {
            return;
        }


        const nameInput = form.elements.namedItem("fullName");
        const emailInput = form.elements.namedItem("email");

        if (!(nameInput instanceof HTMLInputElement) ||
            !(emailInput instanceof HTMLInputElement)) {
            status.dataset.state = FORM_STATE.ERROR;
            status.textContent = "Form configuration error.";
            return;
        }

        // Normalize user input before validation.
        nameInput.value = nameInput.value.trim();
        emailInput.value = emailInput.value.trim();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        transitionTo(FORM_STATE.SUBMITTING, "Submitting registration...");


        try {
            const result = await simulateRegistration();

            if (!result.ok) {
                throw new Error("Registration failed");
            }

            transitionTo(
                FORM_STATE.SUCCESS,
                "Registration simulated successfully. No data was saved."
            );
        } catch {
            transitionTo(
                FORM_STATE.ERROR,
                "Unable to submit registration. Please try again."
            );
        }
    });

    renderState();
}

initializeRegistrationForm();
