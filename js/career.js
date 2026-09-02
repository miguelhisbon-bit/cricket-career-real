// career.js - handles progression
import State from './state.js';
import SaveLoad from './saveLoad.js';
export function addXP(amount){
  State.data.player.xp = (State.data.player.xp||0)+amount;State.emit();SaveLoad.save();
}
