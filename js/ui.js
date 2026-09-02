// ui.js - UI rendering for multiple screens (robust, safe event handling)
import State from './state.js';
import Match from './match.js';
import {doTraining} from './training.js';

export default {
  init(StateModule){
    this.State = StateModule; this.State.onChange(()=>this.refreshAll());
    // delegate match-area clicks
    const matchArea = document.getElementById('match-area');
    if(matchArea) matchArea.addEventListener('click', (e)=>{
      if(e.target && e.target.id==='btn-start-match') Match.startT20();
    });
    // preview button
    const preview = document.getElementById('btn-preview'); if(preview) preview.addEventListener('click', ()=>this.openMatchPreview());
    // continue career
    const cont = document.getElementById('btn-continue'); if(cont) cont.addEventListener('click', ()=>document.querySelector('[data-route="match"]').click());
    // settings
    const settings = document.getElementById('btn-settings'); if(settings) settings.addEventListener('click', ()=>alert('Settings dialog (stub)'));

    // career training buttons (delegated)
    const careerScreen = document.getElementById('screen-career');
    if(careerScreen) careerScreen.addEventListener('click',(e)=>{
      const train = e.target && e.target.dataset && e.target.dataset.train;
      if(train) doTraining(train);
    });

    this.refreshAll();
  },
  refreshAll(){
    const s = this.State.data;
    document.getElementById('player-name').textContent = s.player?.name || 'New Player';
    document.getElementById('player-meta').textContent = s.player? `${s.player.country} • ${s.player.role} • OVR ${s.player.overall}` : '';
    document.getElementById('player-xp').textContent = 'XP: '+(s.player?.xp||0);
    document.getElementById('player-money').textContent = 'Coins: '+(s.player?.money||0);
    // stats
    const grid = document.getElementById('player-stats'); if(grid){ grid.innerHTML=''; if(s.player){
      const createStat=(k,v)=>{const d=document.createElement('div');d.className='stat';d.innerHTML=`<span>${k}</span><strong>${v}</strong>`;grid.appendChild(d)}
      createStat('Bat Timing', s.player.skills.batting.timing);
      createStat('Bow Accuracy', s.player.skills.bowling.accuracy);
      createStat('Fielding', s.player.skills.fielding.catching);
      createStat('Fitness', s.player.fitness);
    }}
    // career content
    const career = document.getElementById('career-content'); if(career){ career.innerHTML='';
      if(s.career){
        const card = document.createElement('div');card.className='card'; card.innerHTML=`<div>Season ${s.career.season}</div><div>Matches: ${s.career.records.matches}</div><div>Runs: ${s.career.records.runs}</div>`;
        career.appendChild(card);
        const trainCard = document.createElement('div');trainCard.className='card'; trainCard.innerHTML=`<h3>Training</h3><button data-train="batting">Batting</button> <button data-train="bowling">Bowling</button> <button data-train="fielding">Fielding</button>`;
        career.appendChild(trainCard);
      }
    }
    // match area
    const ma = document.getElementById('match-area'); if(ma){ ma.innerHTML='';
      if(s.currentMatch){
        const m = s.currentMatch; const el = document.createElement('div');el.className='card'; el.innerHTML=`<h4>Current Match</h4><div>Score: ${m.score.runs}/${m.score.wickets} (${m.score.overs}.${m.score.ballsThisOver})</div>`; ma.appendChild(el);
      }else{
        const el = document.createElement('div');el.className='card'; el.innerHTML=`<h4>No match running</h4><button id="btn-start-match">Start T20 Match</button>`; ma.appendChild(el);
      }
    }

    // next match card
    const nm = document.getElementById('next-match'); if(nm){
      if(s.nextMatch){ nm.innerHTML = `${s.nextMatch.home} vs ${s.nextMatch.away} — ${s.nextMatch.type}` }
      else nm.textContent = 'No scheduled match';
    }

    // update 3D appearance if possible
    try{ if(window.ThreeScene && s.player && s.player.equipment){ window.ThreeScene.updateAppearance({skin: s.player.skinColor || 0xf2d6b3, bat: s.player.batColor || 0x8b5a2b}) } }catch(e){}
  },
  openMatchPreview(){
    alert('Match preview: T20 vs Rivals at National Stadium.');
    document.querySelector('[data-route="match"]').click();
  }
}
