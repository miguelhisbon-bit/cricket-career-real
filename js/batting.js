// batting.js - playable batting mechanic (fixed listeners & safe player access)
import State from './state.js';

let resolveBall;
export default {
  init(match, playerBatting){
    this.match = match; this.playerBatting = playerBatting;
  },
  playBall(){
    return new Promise((resolve)=>{
      resolveBall = resolve;
      // show simple timing UI
      const area = document.getElementById('match-area'); if(!area) return resolve({runs:0,wicket:false}); area.innerHTML = '';
      const card = document.createElement('div');card.className='card';
      const info = document.createElement('div');info.textContent='Press SPACE (or tap) to time your shot. Green = perfect';
      const bar = document.createElement('div');bar.style= 'margin-top:12px; height:20px; background:#0b1520; position:relative; border-radius:6px; overflow:hidden';
      const mover = document.createElement('div');mover.style='position:absolute;left:0;top:0;bottom:0;width:6px;background:linear-gradient(90deg,#6ef,#12c2e9)';
      const target = document.createElement('div');target.style='position:absolute;left:55%;width:20%;top:0;bottom:0;background:rgba(18,194,233,0.12)';
      bar.appendChild(mover);bar.appendChild(target);
      card.appendChild(info);card.appendChild(bar);area.appendChild(card);
      let pos=0,dir=1;let running=true;let rafId=null;
      function step(){ if(!running) return; pos+=dir*2; if(pos>100){pos=100;dir=-1} if(pos<0){pos=0;dir=1} mover.style.left = pos+'%'; rafId = requestAnimationFrame(step)}
      step();
      function cleanup(){ running=false; document.removeEventListener('keydown',key); bar.removeEventListener('touchstart', onHit); if(rafId) cancelAnimationFrame(rafId) }
      function onHit(){ cleanup();
        const targetLeft = parseFloat(target.style.left);
        const targetRight = targetLeft + parseFloat(target.style.width);
        const quality = (pos>=targetLeft && pos<=targetRight)?'perfect':(Math.abs(pos - (targetLeft+parseFloat(target.style.width)/2))<15?'good':'poor');
        // compute runs based on quality and player skill
        const batting = State.data.player?.skills?.batting?.timing ?? 50;
        let base= (quality==='perfect'?6:quality==='good'?2:0);
        // skill modifies probability
        const chanceExtra = (batting-50)/50; // -1..1
        const runs = Math.max(0, Math.round(base + chanceExtra*2 + (Math.random()*2-0.5)));
        const wicket = Math.random() < (quality==='poor'?0.08:0.01);
        resolve({runs,wicket,quality});
        resolveBall({runs,wicket,quality});
      }
      function key(e){ if(e.code==='Space' || e.code==='KeyK'){ onHit() } }
      document.addEventListener('keydown',key);
      // touch support
      bar.addEventListener('touchstart', onHit, {once:true});
    })
  }
}
