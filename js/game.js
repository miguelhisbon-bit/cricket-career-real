// game.js - high level game systems orchestration
import UI from './ui.js';
import SaveLoad from './saveLoad.js';
import State from './state.js';
import Match from './match.js';
import Player from './player.js';

export default {
  init(StateModule){
    this.State = StateModule;
    // wire up UI buttons
    document.getElementById('btn-continue').addEventListener('click', ()=> UI.openMatchPreview());
    document.getElementById('btn-preview').addEventListener('click', ()=> UI.openMatchPreview());
    document.getElementById('btn-settings').addEventListener('click', ()=> alert('Settings - not fully implemented'));
    SaveLoad.saveStateRef = SaveLoad;
    // if no player, trigger create flow
    if(!StateModule.data.player){
      Player.createNew();
      SaveLoad.save();
    }
    UI.refreshAll();
  }
}
