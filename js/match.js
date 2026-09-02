// match.js - T20 match engine & UI hooks
import Batting from './batting.js';
import Bowling from './bowling.js';
import AI from './ai.js';
import State from './state.js';
import SaveLoad from './saveLoad.js';

function rand(n=1){return Math.random()*n}

export default {
  async startT20(){
    const match = {type:'T20',overs:20,score:{runs:0,wickets:0,overs:0,balls:0,ballsThisOver:0},opposition:'Rivals',events:[]}
    State.data.currentMatch = match; State.emit();
    // Toss
    match.toss = Math.random()>0.5?'bat':'bowl';
    // simple flow: player bats first if chose bat
    if(match.toss==='bat'){
      await this.playInnings(match,true);
      await this.playInnings(match,false);
    }else{
      await this.playInnings(match,false);
      await this.playInnings(match,true);
    }
    // finish
    this.finishMatch(match);
  },
  async playInnings(match,playerBatting){
    // reset batting module
    Batting.init(match, playerBatting);
    // loop overs until overs complete or all out
    while(match.score.overs < match.overs && match.score.wickets < 10){
      // simulate one ball
      if(playerBatting){
        const result = await Batting.playBall();
        this.applyResult(match,result);
      }else{
        // AI batting vs player bowling
        const result = AI.simulateBallAgainstPlayerBowling(State.data.player);
        this.applyResult(match,result);
        await new Promise(r=>setTimeout(r,120));
      }
      // minor delay
    }
  },
  applyResult(match,result){
    match.score.runs += result.runs; if(result.wicket) match.score.wickets++;
    match.score.balls++;
    match.score.ballsThisOver++;
    if(match.score.ballsThisOver===6){match.score.overs++;match.score.ballsThisOver=0}
    match.events.push(result);
    State.emit();
  },
  finishMatch(match){
    // compute rewards
    const runs = match.score.runs;
    State.data.career.matches.push(match);
    State.data.career.records.matches++;
    State.data.career.records.runs += runs;
    // simple achievements
    if(runs>=50) State.data.achievements.push({id:'fifty',title:'First Fifty',unlocked:true});
    SaveLoad.save();
    State.emit();
    alert('Match finished: '+match.score.runs+' / '+match.score.wickets);
  }
}
