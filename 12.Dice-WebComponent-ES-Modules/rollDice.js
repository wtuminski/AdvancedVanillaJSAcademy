// @ts-check
import { roll } from "./roll.js";

/**
 * takes dLevel {number} as attribute which will be used as dice size
 */
export class RollDice extends HTMLElement {
  /** @type {AbortController | undefined} */
  #buttonClickEventAbortController;
  /** @type {()=>number} */
  #rollDiceMethod;
  #blockClassName = "roll-dice";
  #messageClassName = this.#blockClassName + "__message";
  #buttonClassName = this.#blockClassName + "__button";

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "closed" });
    this.root.innerHTML = `
        <style>
          :host {
            display: block;
            margin: 0.5rem;
          }
          .${this.#messageClassName} {
            margin-top: 0.5rem;
            font-size: var(--fontSize, 20px);
            color: var(--color, blue);
          }

          .${this.#buttonClassName} {
            border: 1px dashed;
            border-radius: 0.5rem;
            background-color: var(--backgroundColor, #e5e5ed);
            font-size: var(--fontSize, 20px);
            color: var(--color, blue);
          }

          .${this.#buttonClassName}:hover, 
          .${this.#buttonClassName}:focus-visible {
            border-color: #f00;
            background-color: #edd;
            color: #999;
          }

          .${this.#buttonClassName}:active {
            scale: 0.9;
          }

        </style>
	      <button class="${this.#buttonClassName}"><slot>Roll Dice</slot></button>
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
   * @return {void | never}
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
