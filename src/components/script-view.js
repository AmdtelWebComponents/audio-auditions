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
        .sd {
          color: red;
        }
        #first {
          font-size: 1.5em;
        }
        #second {
          color: grey;
        }
        #third {
          color: lightgrey;
        }
      `
    ];
  }

  render(first=this.dialogue[this.idx], second=this.dialogue[this.idx + 1], third=this.dialogue[this.idx + 2]) {
    return html`
        <section>
          <div class="lines">
            <p id="first" class="${first.character}"><b>${first.character}:</b> ${first.lines}</p>
            ${this.idx + 1 < this.dialogue.length ? html`<p id="second" class="${second.character}"><b>${second.character}:</b> ${second.lines}</p>` : html``}
            ${this.idx + 2 < this.dialogue.length ? html`<p id="third" class="${third.character}"><b>${third.character}:</b> ${third.lines}</p>` : html``}
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
