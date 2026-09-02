// training.js - interactive training with cooldowns
import State from './state.js';
import {trainSkill} from './skills.js';
import SaveLoad from './saveLoad.js';
const COOLDOWN_MS = 1000*20; // short for dev
let last = {};
export function doTraining(type){
  const now = Date.now(); if(last[type] && now-last[type]<COOLDOWN_MS){alert('Training on cooldown');return}
  last[type]=now;
  // grant XP and skill
  if(type==='batting'){ trainSkill('batting','timing', Math.round(1+Math.random()*2)); State.data.player.money += 20; }
  if(type==='bowling'){ trainSkill('bowling','accuracy', Math.round(1+Math.random()*2)); State.data.player.money += 15; }
  State.data.player.fitness = Math.max(0, State.data.player.fitness-5);
  State.emit(); SaveLoad.save();
}
