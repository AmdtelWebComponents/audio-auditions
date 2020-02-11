/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './audio-icons.js';


class ScriptView extends LitElement {
  static get properties() {
    return {
      dialogue: {type: Array},
      idx: {type: Number}
    }
  }

  static get styles() {
    return [
      css`
        section {
          display: grid;
          grid-template-columns: 50vw 50vw;
          grid-template-rows: 60vh 20vh;
        }
        .lines {
          grid-column: 1/3;
          overflow-y: auto;
        }
      `
    ];
  }

  render() {
    return html`
        <section>
          <div class="lines">
            <p><b>${this.dialogue[this.idx].character}:</b> ${this.dialogue[this.idx].lines}</p>

            <p><b>${this.dialogue[this.idx + 1].character}:</b> ${this.dialogue[this.idx + 1].lines}</p>
            <p><b>${this.dialogue[this.idx + 2].character}:</b> ${this.dialogue[this.idx + 2].lines}</p>
          </div>
          <button @click="${() => {this.idx==0?this.idx=this.dialogue.length-1:this.idx--;this._updateIndex()}}" ?disabled="${this.idx == 0}">Previous</button>
          <button @click="${() => {this.idx==this.dialogue.length-1?this.idx=0:this.idx++;this._updateIndex()}}">Next</button>
        </section>
    `;
  }

  constructor() {
    super();
    this.idx = 0;
  }

  _updateIndex() {
    this.dispatchEvent(new CustomEvent('update-index', {
      detail: {
        idx: this.idx
      }
    }));
  }
}

window.customElements.define('script-view', ScriptView);
