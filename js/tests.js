// update tests to include skills/customize/club checks
import State from './state.js';
import SaveLoad from './saveLoad.js';
import Player from './player.js';
import Match from './match.js';
import { renderSkillsArea, upgradeSkill } from './skills.js';
import Customization from './customization.js';
import Club from './club.js';

export default {
  async run(StateModule){
    const results=[];
    try{
      await StateModule.init(); results.push(['State init',true]);
      Player.createNew(); results.push(['Player creation', !!StateModule.data.player]);
      // skills render
      renderSkillsArea(); results.push(['Skills render', true]);
      // attempt a skill upgrade (may fail if no xp) - give player xp
      StateModule.data.player.xp = 200; // ensure
      upgradeSkill('Timing'); results.push(['Skill upgrade', StateModule.data.player.xp < 200]);
      // customize
      Customization.renderCustomizeArea(); results.push(['Customize render', true]);
      // club
      Club.renderClubArea(); Club.renderSquad(); results.push(['Club render', true]);
      SaveLoad.save(); results.push(['Save', true]);
      // start a short match test
      await Match.startT20(); results.push(['Match run', true]);
      // checks
      const pass = results.every(r=>r[1]);
      alert('GAME TESTS: '+(pass? 'PASS':'FAIL')+' — '+results.length+' checks');
      console.table(results);
      return {pass,results};
    }catch(e){console.error('Tests failed',e);return {pass:false,results}}}
}
