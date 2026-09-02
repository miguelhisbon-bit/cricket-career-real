// skills.js - simplified skill upgrade calc
import State from './state.js';
export function trainSkill(category, skillKey, amount){
  const s = State.data.player.skills[category]; if(!s) return;
  s[skillKey] = Math.min(99, (s[skillKey]||0)+amount); State.emit();
}
