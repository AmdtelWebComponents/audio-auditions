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
      script: {type: Array},
      act: {type: Number},
      scene: {type: Number},
      idx: {type: Number}
    }
  }

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        section {
          display: grid;
          grid-template-columns: 20vw 40vw 40vw;
        }
        select {
          height: 5vh;
        }
      `
    ];
  }

  render() {
    return html`
        <section>
          <select .selectedIndex="${this.act}" @change="${(e) => {this.act = e.path[0].selectedIndex;this.scene=0;this.idx=0;this._updateScript()}}">
            ${this.script.map((act) => html`<option>${act.name}</option>`)}
          </select>
          <select .selectedIndex="${this.scene}" @change="${(e) => {this.scene = e.path[0].selectedIndex;this.idx=0;this._updateScript()}}">
            ${this.script[this.act].scene.map((scene) => html`<option>${scene.title}</option>`)}
          </select>
          <select .selectedIndex="${this.idx}" @change="${(e) => {this.idx = e.path[0].selectedIndex;this._updateScript()}}">
            ${this.script[this.act].scene[this.scene].dialogue.map((line, idx) => html`<option>${idx}: ${line.character} ${line.lines.slice(0,25)}...</option>`)}
          </select>
        </section>
    `;
  }

  constructor() {
    super();
    this.act = 0;
    this.scene = 0;
    this.idx =0;
  }

  _updateScript() {
    this.dispatchEvent(new CustomEvent('update-script', {
      detail: {
        act: this.act,
        scene: this.scene,
        idx: this.idx
      }
    }));
  }
}

window.customElements.define('script-control', ScriptControl);
