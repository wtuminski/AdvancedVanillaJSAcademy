// @ts-check
import { shuffle } from "./utils/arrayUtils.js";

export class RollDice extends HTMLElement {
  #dice;

  /**
   * The constructor object
   */
  constructor() {
    // Run this first
    super();

    // Creates a shadow root
    this.root = this.attachShadow({ mode: "closed" });

    // Define properties
    this.#dice = [1, 2, 3, 4, 5, 6];

    // Render HTML
    this.root.innerHTML = `<style>
                  button {
                      background-color: var(--bg-color, #0088cc);
                      border: 1px solid var(--bg-color, #0088cc);
                      border-radius: var(--radius, 0.25em);
                      color: var(--color, #ffffff);
                      font-size: var(--size, 1.5em);
                      padding: 0.5em 1em;
                  }
                  [aria-live] {
                      font-size: var(--msg-size, 1.3125em);
                      font-weight: var(--msg-weight, normal);
                      font-style: var(--msg-style, normal);
                      color: var(--msg-color, inherit);
                  }
              </style>
              <p>
                  <button><slot>Roll Dice</slot></button>
              </p>
              <div aria-live="polite"></div>`;
  }

  /**
   * Shuffle dice array and return first number
   * @return {Number}   The result
   */
  #roll() {
    shuffle(this.#dice);
    return this.#dice[0];
  }

  /**
   * Handle click events
   * @param  {Event} event The event object
   * @return {void}
   */
  #clickHandler = (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    // Get the host component
    const rootNode = event.target.getRootNode();

    if (!(rootNode instanceof ShadowRoot)) return;
    const host = rootNode.host;

    // Get the message element
    const target = host.root.querySelector('[aria-live="polite"]');
    if (!target) return;

    // Roll the dice
    const rollResult = this.#roll();

    // Inject the message into the UI
    target.textContent = `You rolled a ${rollResult}`;
  };

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    // Attach a click event listener to the button
    const btn = this.root.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", this.#clickHandler);
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    // Remove the click event listener from the button
    const btn = this.root.querySelector("button");
    if (!btn) return;
    btn.removeEventListener("click", this.#clickHandler);
  }
}
