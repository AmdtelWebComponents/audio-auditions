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

class ScriptChooser extends LitElement {
  static get properties() {
    return {
      _data: { type: Array },
      value: { type: Object }
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
        <section>
          ${this._data.map((item) => html`<button @click="${() => {this._changeScript(item)}}">${item.title}</button>`)}
        </section>
        `
        :html`<p>Loading...</p>`
      }
    `;
  }

  constructor() {
    super();
    this._data = [];
    this.value = {};
  }

  firstUpdated() {
    fetch('https://audio-auditions.glitch.me/data/scriptsDB.json')
    .then(r => r.json())
    .then(data => {this._data = data})
    .catch(e => console.log("fetch error:", e));
  }

  _changeScript(item) {
    this.dispatchEvent(new CustomEvent('script-changed', {
      detail: item
    }));
  }
}

window.customElements.define('script-chooser', ScriptChooser);
