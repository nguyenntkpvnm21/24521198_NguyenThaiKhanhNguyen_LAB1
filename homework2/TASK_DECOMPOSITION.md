
# Homework 2: Drum Kit Engine

## Work Breakdown Structure (WBS)

### Task HW2-01: HTML Data-Sound Contract
- **Goal:** Build a semantic and accessible drum pad interface before implementing JavaScript.
- **Contracts:**
  - Use native HTML5 elements.
  - Each drum pad must be a `<button>`.
  - Each pad must define `data-key` and `data-sound`.
  - Sound file paths must be stored in HTML attributes.
  - No inline JavaScript event handlers.
- **Verification:**
  - All drum pads are visible.
  - Every pad has a valid key and sound mapping.
  - Buttons are accessible using Tab and Enter.
- **Commit:** `feat(hw2): define drum pad HTML contract`

### Task HW2-02: Polyphonic Audio Engine
- **Goal:** Implement reusable audio playback logic independently of user input.
- **Contracts:**
  - Use native JavaScript and the Web Audio API or HTMLAudioElement.
  - Read sound paths from `data-sound`.
  - Allow multiple sounds to play simultaneously.
  - Avoid hardcoded key-to-sound switch statements.
  - Handle playback errors.
- **Verification:**
  - Each pad produces the correct sound.
  - Multiple drum sounds can overlap.
- **Commit:** `feat(hw2): implement polyphonic audio engine`

### Task HW2-03: Keyboard Event Handling
- **Goal:** Support keyboard interaction without repeated sound flooding.
- **Contracts:**
  - Use `keydown` and `event.key`.
  - Ignore repeated events using `event.repeat`.
  - Reuse the existing audio playback function.
  - Provide visual feedback for active pads.
- **Verification:**
  - Drum pads respond to their assigned keys.
  - Holding a key does not continuously trigger sounds.
  - Mouse and keyboard use the same audio logic.
- **Commit:** `feat(hw2): implement keyboard controls`

### Task HW2-04: FIFO Beat Recorder
- **Goal:** Record and replay drum events in chronological order.
- **Contracts:**
  - Store recorded events in a FIFO queue.
  - Record each drum event with a relative timestamp.
  - Support Start, Stop, Replay, and Clear.
  - Preserve event order and timing during replay.
  - Avoid recording replayed events.
- **Verification:**
  - [x] Drum events are recorded in order.
  - [x] Replay reproduces the original sequence and timing.
  - [x] Clear removes all recorded events.
- **Commit:** `feat(hw2): implement FIFO beat recorder`

## Final Quality Assurance
- [x] All drum pads work correctly.
- [x] Polyphonic playback works.
- [x] Keyboard controls ignore repeated keydown events.
- [x] FIFO recording and replay work correctly.
- [x] No JavaScript console errors.
- [x] No unauthorized external libraries.
- [x] Keyboard accessibility verified.
- [x] Homework 1 remains unchanged.
