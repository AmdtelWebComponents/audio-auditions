/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the elements needed by this element.
import './script-chooser.js';
import './script-control.js';
import './script-view.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AudioScript extends PageViewElement {
  static get properties() {
    return {
      _title: {type: String},
      _data: {type: Object},
      _chooser: {type: Boolean},
      _act: {type: Number},
      _scene: {type: Number},
      _idx: {type: Number}
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: grid;
          grid-template-rows: 5vh 5vh 80vh;
        }
        .script {
          overflow-y: auto;
        }
      `
    ];
  }

  render() {
    return html`
      ${this._chooser ?
        html`<script-chooser @script-changed="${(e) => this._displayData(e)}"></script-chooser>`
        :html`
        <button @click="${() => this._chooser = true}">${this._title} Change Script...</button>
        <script-control .script="${this._data.act}" .act="${this._act}" .scene="${this._scene}" .idx="${this._idx}" @update-script="${this._updateScript}"></script-control>
        <script-view .dialogue="${this._data.act[this._act].scene[this._scene].dialogue}" .idx="${this._idx}" @update-index="${this._updateIndex}"></script-view>`
      }
    `;
  }
  constructor() {
    super();
    this._chooser = true;
    this._act = 0;
    this._scene = 0;
    this._idx = 0;
  }

  _displayData(e) {
    fetch(e.detail.script)
    .then(r => r.json())
    .then(data => {this._data=data;this._title = e.detail.title;this._act=0;this._scene=0;this._idx=0;this._chooser=false})
    .catch(e => console.log("fetch error:", e));
  }
  _updateScript(e) {
    this._act = e.detail.act;
    this._scene = e.detail.scene;
    this._idx = e.detail.idx;
  }
  _updateIndex(e) {
    this._idx = e.detail.idx
  }
}

window.customElements.define('audio-script', AudioScript);
