// bowling.js - player bowling mechanic (simplified)
import State from './state.js';
export default {
  bowl(){
    const skill = State.data.player.skills.bowling.accuracy || 50;
    const acc = skill/100;
    const wicket = Math.random() < (0.02 + (1-acc)*0.06);
    const runs = Math.floor(Math.random()*7*(1-acc));
    return {runs,wicket}
  }
}
