// Registers the jest-dom matchers (toBeInTheDocument, toBeDisabled, ...) on Vitest's expect.
import '@testing-library/jest-dom/vitest';

// jsdom 30 ships HTMLDialogElement without showModal and close, the e2e suite covers the real behavior.
HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement): void {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function (this: HTMLDialogElement): void {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
};
