// saveLoad.js - localStorage based with migration & corruption handling (improved)
const KEY = 'cricket_legends_save_v1';
import DEFAULT_STATE from './state.js';
export default {
  init(State){
    this.State = State;
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw){
        // no save - keep defaults
        this.State.emit();
        return;
      }
      let parsed=JSON.parse(raw);
      if(!parsed || typeof parsed.saveVersion !== 'number'){
        throw new Error('invalid save version');
      }
      // migrate older versions if needed
      if(parsed.saveVersion < 1){ parsed.saveVersion = 1 }
      // safe merge: do not overwrite static files
      const merged = Object.assign({}, this.State.data, parsed);
      // ensure player exists
      if(!merged.player) merged.player = JSON.parse(JSON.stringify(this.State.data.player));
      this.State.data = merged;
      this.State.emit();
      console.log('Save loaded');
    }catch(e){
      console.error('Save load failed',e);
      // backup corrupted
      try{localStorage.setItem(KEY+'_corrupt_'+Date.now(), localStorage.getItem(KEY));}catch(e){}
      localStorage.removeItem(KEY);
      // friendly user feedback via toast if UI available
      try{const t=document.getElementById('toast'); if(t){ t.textContent='Save corrupted — started fresh'; t.hidden=false; setTimeout(()=>t.hidden=true,2500); }}catch(e){}
      // leave default state
      this.State.data = this.State.data || {};
      this.State.emit();
    }
  },
  save(){
    try{
      localStorage.setItem(KEY, JSON.stringify(this.State.data));
      this._toast('Game saved');
    }catch(e){
      console.error('Save failed',e);
      this._toast('Save failed');
    }
  },
  _toast(msg){
    const t=document.getElementById('toast');
    if(t){t.textContent=msg;t.hidden=false;setTimeout(()=>t.hidden=true,1800)}
  }
}
