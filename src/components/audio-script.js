/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the elements needed by this element.
import './script-chooser.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class AudioScript extends PageViewElement {
  static get properties() {
    return {
      _title: {type: String},
      _data: {type: Object},
      _chooser: {type: Boolean},
      act: {type: Number},
      scene: {type: Number},
      idx: {type: Number}
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      ${this._chooser ?
        html`
        <section>
            <script-chooser
                @script-changed="${(e) => this._displayData(e)}">
            </script-chooser>
        </section>
        `
        :html`
        <h2>${this._title}</h2>
        <section>
        ${this._data.act.map((act, idx) => html`<button @click="${() => this.act = idx}">${act.name}</button>`)}
        ${this._data.act[this.act].scene.map((scene, idx) => html`<button @click="${() => this.scene = idx}">${scene.title}</button>`)}
        <h3>Act: ${this.act+1} Scene: ${this.scene}</h3>
        <button @click="${() => this._chooser = true}">Change Script</button>
        </section>
        `
      }
    `;
  }
  constructor() {
    super();
    this._chooser = true;
    this.act=0;
    this.scene=0;
    this.idx=0;
  }

  _displayData(e) {
    fetch(e.detail.script)
    .then(r => r.json())
    .then(data => {this._data=data;this._title = e.detail.title;this._chooser=false})
    .catch(e => console.log("fetch error:", e));
  }
}

window.customElements.define('audio-script', AudioScript);
