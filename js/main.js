// main.js - entry
import Router from './router.js';
import State from './state.js';
import SaveLoad from './saveLoad.js';
import ThreeScene from './threeScene.js';
import UI from './ui.js';
import Game from './game.js';

async function init(){
  try{
    Router.init();
    await State.init();
    SaveLoad.init(State);
    await ThreeScene.init();
    UI.init(State);
    Game.init(State);
    document.getElementById('loading').style.display='none';
  }catch(e){
    console.error('Startup error',e);
    document.getElementById('loading').innerHTML = '<div>Something went wrong during startup.</div><button id="btn-retry">Retry</button>';
    document.getElementById('btn-retry').addEventListener('click',()=>location.reload());
  }
}

window.addEventListener('load',()=>{
  // failsafe to avoid permanent loading
  const failsafe = document.getElementById('loading-failsafe');
  failsafe.hidden=false;failsafe.addEventListener('click',()=>{document.getElementById('loading').style.display='none'});
  init();
});

// expose tests
import Tests from './tests.js';
window.runGameTests = ()=>Tests.run(State);

