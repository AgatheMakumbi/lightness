"use strict";
//importer le module color-convert
import * as convert from "color-convert";


//sera instanciée pour chaque couleur de la palette. Cette classe sera responsable de générer et d’afficher les éléments dans le DOM.
class Color {
  #hsl;
  #hex;
  #element;
  constructor(tab) {
    this.#hsl = tab;
    this.#hex = `${convert.hsl.hex(tab)}`;
    // Crée l'élément
    this.#element = this.#generateElement();
  }
  get hex() {
    return this.#hex;
  }

  //méthode privée qui génère l’élément DOM qui sera ensuite stock dans Color.#element
  #generateElement() {
    const div = document.createElement("div");
    div.style.backgroundColor = this.#hex;
    div.classList.add("color");
    div.dataset.color = this.#hex;
    const text = document.createElement("p");
    text.textContent = this.#hex;
    if (this.#hsl[2] < 60) {
      text.style.color = '#ffffff';
    } else {
      text.style.color = '#000000';
    }

    div.appendChild(text);

    return div;
  }

  display(parent) {
    parent.appendChild(this.#element);
  }
}
//exporter la classe Color
export default Color;