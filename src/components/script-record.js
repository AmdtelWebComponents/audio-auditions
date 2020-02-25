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

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class ScriptRecord extends LitElement {
  static get properties() {
    return {
      _gotMedia: {type: Boolean},
      _stream: {type: Object},
      _counter: {type: Number},
      _media: {type: Object},
      _track: {type: String},
      recordingStatus: {type: Boolean},
      url: {type: Array}
    }
  }
  static get styles() {
    return [
      css`
        section {
          height: 10vh;
        }
      `
    ];
  }
  render() {
    if(!this._gotMedia) {return html`<button @click="${this.getUserMedia}">Get Audio Mic</button>`}
    else {
      return html`
      <section>
        <button id="startButton" @click="${this.startRecording}" ?disabled="${this.recordingStatus}">Record</button>
        <button id="stopButton" @click="${this.stopRecording}" ?disabled="${!this.recordingStatus}">Stop</button>
        <audio controls .src="${this._track}"></audio>
        ${this.url.map((item, idx) => html`<button @click="${()=>this._track = item}">cue</button><button @click="${()=>{URL.revokeObjectURL(item);this.url.splice(idx, 1); this.requestUpdate()}}">delete</button>`)}
      </section>
    `
    }
  }
  constructor() {
    super();
    this._media = { tag: 'audio', type: 'audio/ogg; codecs=opus', ext: '.ogg', gUM: {audio: true}};
    this._gotMedia = false;
    this.recordingStatus = false;
    this._counter = 1;
    this._track = '';
    this.url = [];
  }

  getUserMedia() {
    window._chunks = [];
    navigator.mediaDevices.getUserMedia(this._media.gUM).then(_stream => {
      this._stream = _stream;
      window.scriptAudioRecorder = new MediaRecorder(this._stream);
      window.scriptAudioRecorder.ondataavailable = e => {
        window._chunks.push(e.data);
        if(window.scriptAudioRecorder.state == 'inactive')  this.makeLink();
      };
      this._gotMedia = true;
      console.log('got media successfully');

    }).catch(console.log('media err'));
  }

  startRecording() {
    this.recordingStatus = true;
    window._chunks = [];
    window.scriptAudioRecorder.start()
  }

  stopRecording() {
    window.scriptAudioRecorder.stop()
    this.recordingStatus = false;
  }

  makeLink(){
    console.log('make media file')
    let blob = new Blob(window._chunks, {type: this._media.type});
    this._track = URL.createObjectURL(blob)
    this.url.push(this._track);
    this.requestUpdate();
  }
}

window.customElements.define('script-record', ScriptRecord);
