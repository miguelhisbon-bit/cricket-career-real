// club.js - simple squad / transfers / contract UI
import State from './state.js';
import SaveLoad from './saveLoad.js';

export function renderClubArea(){
  const area = document.getElementById('club-area'); if(!area) return; area.innerHTML='';
  const p = State.data.player; const card = document.createElement('div'); card.className='card'; card.innerHTML=`<h3>My Club</h3><div>Team: ${p.team || 'Free Agent'}</div><div>Salary: ${p.salary || '—'}</div><button id="btn-view-squad">View Squad</button>`;
  area.appendChild(card);
  document.getElementById('btn-view-squad')?.addEventListener('click', ()=> document.querySelector('[data-route="squad"]').click());
}

export function renderSquad(){ const area = document.getElementById('squad-area'); if(!area) return; area.innerHTML=''; const list = State.data.static.players || []; const container=document.createElement('div'); container.className='card'; container.innerHTML='<h4>Squad</h4>'; (list.slice(0,8)).forEach(pl=>{ const pdiv=document.createElement('div'); pdiv.style='display:flex;justify-content:space-between;padding:6px 0'; pdiv.innerHTML=`<div>${pl.name||'Player'}</div><div>OVR ${pl.overall||50}</div>`; container.appendChild(pdiv) }); area.appendChild(container); }

export function renderTransfers(){ const area = document.getElementById('transfers-area'); if(!area) return; area.innerHTML=''; const c = document.createElement('div'); c.className='card'; c.innerHTML='<h4>Transfer Market</h4><div>Search and shortlist players (stub)</div>'; area.appendChild(c); }

export function renderContract(){ const area = document.getElementById('contract-area'); if(!area) return; area.innerHTML=''; const p = State.data.player; const c = document.createElement('div'); c.className='card'; c.innerHTML=`<h4>Contract</h4><div>Team: ${p.team||'Unattached'}</div><div>Salary: ${p.salary||0}</div><div>Duration: ${p.contractDuration||0} seasons</div><button id="btn-renew">Renew Contract</button>`; area.appendChild(c); document.getElementById('btn-renew')?.addEventListener('click', ()=>{ p.salary = (p.salary||1000)+200; SaveLoad.save(); State.emit(); alert('Contract renewed (stub)') }); }

export function renderTeam(){ const area = document.getElementById('team-area'); if(!area) return; area.innerHTML=''; const c=document.createElement('div'); c.className='card'; c.innerHTML='<h4>Team Management</h4><div>Manage tactics and lineup (stub)</div>'; area.appendChild(c); }

export default { renderClubArea, renderSquad, renderTransfers, renderContract, renderTeam };
