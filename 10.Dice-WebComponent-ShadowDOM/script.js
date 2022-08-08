// @ts-check
import { roll } from "./roll.js";

/**
 * takes dLevel {number} as attribute which will be used as dice size
 */
class RollDice extends HTMLElement {
  /** @type {AbortController | undefined} */
  #buttonClickEventAbortController;
  /** @type {()=>number} */
  #rollDiceMethod;
  #blockClassName = "roll-dice";
  #messageClassName = this.#blockClassName + "__message";

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.root.innerHTML = `
	      <button><slot>Roll Dice</slot></button>
        <div aria-live="polite" class="${this.#messageClassName}"></div>`;
    const diceLevel = this.getAttribute("dLevel");
    this.#rollDiceMethod =
      diceLevel !== null ? () => roll.rollInRange(Number(diceLevel)) : roll.d20;
  }

  connectedCallback() {
    const button = this.root.querySelector("button");
    if (!button) return;
    this.#buttonClickEventAbortController = new AbortController();
    button.addEventListener("click", this.#rollOnClick.bind(this), {
      signal: this.#buttonClickEventAbortController.signal,
    });
  }

  disconnectedCallback() {
    this.#buttonClickEventAbortController?.abort();
  }

  /**
   * @param {MouseEvent} event
   * @return {void}
   * @this RollDice
   */
  #rollOnClick = function (event) {
    if (!(event.target instanceof HTMLElement))
      throw new Error("target element is of a wrong type");

    const messageElement = this.root.querySelector(
      `.${this.#messageClassName}`
    );
    if (!messageElement) return;
    messageElement.textContent = "You rolled a " + this.#rollDiceMethod();
  };
}

if ("customElements" in window) {
  window.customElements.define("roll-dice", RollDice);
}
