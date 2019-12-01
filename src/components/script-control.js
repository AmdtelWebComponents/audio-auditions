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

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class ScriptControl extends LitElement {
  static get properties() {
    return {
      acts: { type: Array },
      scenes: { type: Array },
      characters: { type: Array}
    }
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        span {
          width: 20px;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
      `
    ];
  }

  render() {
    return html`
      ${this._data.length > 0 ?
        html`
          ${this._data.map((item) => html`
            <section>
              <button @click="${() => {this.value = item; this._changeScript()}}">${item.title}</button>
            </section>`)
          }
        `
        :html`<p>Loading...</p>`
      }
    `;
  }

  constructor() {
    super();
    this._data = [];
  }

  _changeScript() {
    this.dispatchEvent(new CustomEvent('script-control', {
      detail: {
        title: this.value.title,
        script: this.value.script
      }
    }));
  }
}

window.customElements.define('script-control', ScriptControl);
