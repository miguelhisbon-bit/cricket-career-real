// skills.js - render skill cards and handle upgrades
import State from './state.js';
import SaveLoad from './saveLoad.js';

function renderSkillCard(name, value, container){
  const card = document.createElement('div'); card.className='card';
  card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${name}</strong><div style="font-size:12px;color:var(--muted)">Value: ${value}</div></div><div><button data-skill="${name}" class="upgrade">Upgrade</button></div></div>`;
  container.appendChild(card);
}

export function renderSkillsArea(){
  const s = State.data; const area = document.getElementById('skills-area'); if(!area) return;
  area.innerHTML='';
  const p = s.player; if(!p) return;
  const bat = p.skills.batting; const bowl = p.skills.bowling; const fld = p.skills.fielding;
  const grid = document.createElement('div'); grid.style='display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px';
  // batting
  const bcard = document.createElement('div'); bcard.className='card'; bcard.innerHTML='<h3>Batting</h3>'; grid.appendChild(bcard);
  Object.keys(bat).forEach(k=>{ renderSkillCard(k.charAt(0).toUpperCase()+k.slice(1), bat[k], bcard) });
  // bowling
  const bo = document.createElement('div'); bo.className='card'; bo.innerHTML='<h3>Bowling</h3>'; grid.appendChild(bo);
  Object.keys(bowl).forEach(k=>{ renderSkillCard(k.charAt(0).toUpperCase()+k.slice(1), bowl[k], bo) });
  // fielding
  const f = document.createElement('div'); f.className='card'; f.innerHTML='<h3>Fielding</h3>'; grid.appendChild(f);
  Object.keys(fld).forEach(k=>{ renderSkillCard(k.charAt(0).toUpperCase()+k.slice(1), fld[k], f) });

  area.appendChild(grid);

  // attach upgrade listeners
  area.querySelectorAll('button.upgrade').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const skill = btn.dataset.skill;
      upgradeSkill(skill);
    });
  });
}

export function upgradeSkill(displayName){
  // map displayName back to skill path - simple mapping
  const s = State.data; const p = s.player; if(!p) return;
  // require some XP to upgrade
  const cost = 50;
  if(p.xp < cost){ alert('Not enough XP (need '+cost+')'); return; }
  // pick a plausible attribute to bump - naive approach: find first matching key
  const lname = displayName.toLowerCase();
  let found=false;
  ['batting','bowling','fielding'].forEach(group=>{
    Object.keys(p.skills[group]).forEach(k=>{
      if(!found && k.includes(lname.split(' ')[0])){ p.skills[group][k] = Math.min(99, p.skills[group][k]+3); found=true; }
    })
  });
  if(!found){
    // fallback: increment batting.timing
    p.skills.batting.timing = Math.min(99,p.skills.batting.timing+2);
  }
  p.xp -= cost; SaveLoad.save(); State.emit();
}

export default { renderSkillsArea, upgradeSkill };
