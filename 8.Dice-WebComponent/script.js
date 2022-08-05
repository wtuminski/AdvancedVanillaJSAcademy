// @ts-check

class RollDice extends HTMLElement {
  constructor() {
    super();
    const content = this.innerHTML;
    this.innerHTML = `
        <p>
	        <button>${content || "Roll Dice"}</button>
        </p>
        <div aria-live="polite"></div>`;
  }
}

if ("customElements" in window) {
  window.customElements.define("roll-dice", RollDice);
}
