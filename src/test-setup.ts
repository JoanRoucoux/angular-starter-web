// Registers the jest-dom matchers (toBeInTheDocument, toBeDisabled, ...) on Vitest's expect.
import '@testing-library/jest-dom/vitest';

// jsdom 30 ships HTMLDialogElement without show/showModal/close: the real modal semantics (focus trap, Esc,
// inert background, focus restored on close) are exercised by the Playwright suite, not here.
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement): void {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function (this: HTMLDialogElement): void {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
};
