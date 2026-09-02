// saveLoad.js - localStorage based with migration & corruption handling
const KEY = 'cricket_legends_save_v1';
export default {
  init(State){
    this.State = State;
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return;
      let parsed=JSON.parse(raw);
      if(!parsed.saveVersion){
        // migrate old
        parsed.saveVersion=1;
      }
      // basic validation
      if(typeof parsed.player !== 'object') throw new Error('invalid save');
      State.data = Object.assign(State.data, parsed);
      State.emit();
      console.log('Save loaded');
    }catch(e){
      console.error('Save load failed',e);
      // backup corrupted
      try{localStorage.setItem(KEY+'_corrupt_'+Date.now(), localStorage.getItem(KEY));}catch(e){}
      localStorage.removeItem(KEY);
      // leave default state
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
    const t=document.getElementById('toast');t.textContent=msg;t.hidden=false;setTimeout(()=>t.hidden=true,1800);
  }
}
