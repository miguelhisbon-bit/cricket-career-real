// customization.js - simple customization interface
import State from './state.js';
import SaveLoad from './saveLoad.js';
import ThreeScene from './threeScene.js';

const PRESETS = {
  faces: [ {id:'face1',name:'Strong Jaw'}, {id:'face2',name:'Round Face'}, {id:'face3',name:'Sharp'} ],
  hairs: [ {id:'h1',name:'Short'}, {id:'h2',name:'Medium'}, {id:'h3',name:'Long'} ],
  bats: [ {id:'classic',name:'Classic',power:5,control:5}, {id:'pro',name:'Pro',power:7,control:6} ],
  shoes: [ {id:'spike',name:'Spike',speed:3,grip:5}, {id:'runner',name:'Runner',speed:5,grip:3} ],
  kits: [ {id:'home',name:'Home'}, {id:'away',name:'Away'}, {id:'special',name:'Special'} ]
};

export function renderCustomizeArea(){
  const area = document.getElementById('customize-area'); if(!area) return; area.innerHTML='';
  const p = State.data.player; if(!p) return;
  const info = document.createElement('div'); info.className='card'; info.innerHTML=`<h3>Current Equipment</h3><div>Bat: ${p.equipment.bat || 'None'}</div><div>Shoes: ${p.equipment.shoes || 'None'}</div><div>Kit: ${p.equipment.kit || 'None'}</div>`;
  area.appendChild(info);
  // quick selectors
  const sel = document.createElement('div'); sel.className='card'; sel.innerHTML='<h3>Quick Customize</h3>';
  const batSel = document.createElement('div'); batSel.innerHTML = '<div><strong>Bat</strong></div>';
  PRESETS.bats.forEach(b=>{ const btn=document.createElement('button'); btn.textContent=b.name; btn.addEventListener('click', ()=>applyBat(b)); batSel.appendChild(btn) }); sel.appendChild(batSel);
  const shoeSel = document.createElement('div'); shoeSel.innerHTML = '<div><strong>Shoes</strong></div>';
  PRESETS.shoes.forEach(s=>{ const btn=document.createElement('button'); btn.textContent=s.name; btn.addEventListener('click', ()=>applyShoes(s)); shoeSel.appendChild(btn) }); sel.appendChild(shoeSel);
  area.appendChild(sel);
}

function applyBat(b){ const p = State.data.player; if(!p) return; p.equipment.bat = b.name; // update simple attributes: more powerful bat gives small boost
 p.skills.batting.power = Math.min(99, (p.skills.batting.power||50) + (b.power||0)); SaveLoad.save(); State.emit(); ThreeScene.updateAppearance({bat:0x8b5a2b}); alert('Equipped '+b.name); }
function applyShoes(s){ const p = State.data.player; if(!p) return; p.equipment.shoes = s.name; p.speed = (p.speed||50) + (s.speed||0); SaveLoad.save(); State.emit(); alert('Equipped '+s.name); }

export default { renderCustomizeArea };
