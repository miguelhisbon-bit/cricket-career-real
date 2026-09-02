// ui.js - UI rendering for multiple screens
import State from './state.js';
import Match from './match.js';
import {doTraining} from './training.js';
export default {
  init(StateModule){
    this.State = StateModule; this.State.onChange(()=>this.refreshAll());
    document.getElementById('screen-career').addEventListener('click',(e)=>{
      if(e.target.dataset.train) doTraining(e.target.dataset.train);
    });
    this.refreshAll();
  },
  refreshAll(){
    const s = this.State.data;
    document.getElementById('player-name').textContent = s.player?.name || 'New Player';
    document.getElementById('player-meta').textContent = s.player? `${s.player.country} • ${s.player.role} • ${s.player.overall}` : '';
    document.getElementById('player-xp').textContent = 'XP: '+(s.player?.xp||0);
    document.getElementById('player-money').textContent = 'Coins: '+(s.player?.money||0);
    // stats
    const grid = document.getElementById('player-stats'); grid.innerHTML=''; if(s.player){
      const createStat=(k,v)=>{const d=document.createElement('div');d.className='stat';d.innerHTML=`<span>${k}</span><strong>${v}</strong>`;grid.appendChild(d)}
      createStat('Bat Timing', s.player.skills.batting.timing);
      createStat('Bow Accuracy', s.player.skills.bowling.accuracy);
      createStat('Fielding', s.player.skills.fielding.catching);
      createStat('Fitness', s.player.fitness);
    }
    // career content
    const career = document.getElementById('career-content'); career.innerHTML='';
    if(s.career){
      const card = document.createElement('div');card.className='card'; card.innerHTML=`<div>Season ${s.career.season}</div><div>Matches: ${s.career.records.matches}</div><div>Runs: ${s.career.records.runs}</div>`;
      career.appendChild(card);
      const trainCard = document.createElement('div');trainCard.className='card'; trainCard.innerHTML=`<h3>Training</h3><button data-train="batting">Batting</button> <button data-train="bowling">Bowling</button>`; career.appendChild(trainCard);
    }
    // match area
    const ma = document.getElementById('match-area'); ma.innerHTML='';
    if(s.currentMatch){
      const m = s.currentMatch; const el = document.createElement('div');el.className='card'; el.innerHTML=`<h4>Current Match</h4><div>Score: ${m.score.runs}/${m.score.wickets} (${m.score.overs}.${m.score.ballsThisOver})</div>`; ma.appendChild(el);
    }else{
      const el = document.createElement('div');el.className='card'; el.innerHTML=`<h4>No match running</h4><button id="btn-start-match">Start T20 Match</button>`; ma.appendChild(el); document.getElementById('btn-start-match').addEventListener('click',()=>Match.startT20());
    }
  },
  openMatchPreview(){
    alert('Match preview: T20 vs Rivals at National Stadium.');
    // go to match route
    document.querySelector('[data-route="match"]').click();
  }
}
