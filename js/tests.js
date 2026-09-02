// tests.js - dev-only automated tests
import State from './state.js';
import SaveLoad from './saveLoad.js';
import Player from './player.js';
import Match from './match.js';
export default {
  async run(StateModule){
    const results=[];
    try{
      await StateModule.init(); results.push(['State init',true]);
      Player.createNew(); results.push(['Player creation', !!StateModule.data.player]);
      SaveLoad.save(); results.push(['Save', true]);
      // start a short match test
      await Match.startT20(); results.push(['Match run', true]);
      // checks
      const pass = results.every(r=>r[1]);
      alert('GAME TESTS PASS: '+(pass?results.length:0)+' / '+results.length);
      console.table(results);
      return {pass,results};
    }catch(e){console.error('Tests failed',e);return {pass:false,results}}}
}
