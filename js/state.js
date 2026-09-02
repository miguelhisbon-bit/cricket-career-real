// state.js - central GameState
const DEFAULT = {
  saveVersion:1,
  player:null,
  career:{season:1,matches:[],records:{matches:0,runs:0,wickets:0}},
  teams:[],
  trophies:[],
  achievements:[],
  settings:{sound:true,graphics:'medium'},
};

let GameState = {
  data:JSON.parse(JSON.stringify(DEFAULT)),
  listeners:[],
  async init(){
    // load data files
    try{
      const [teams,players,tours,stadiums,equip,events] = await Promise.all([
        fetch('/data/teams.json').then(r=>r.json()),
        fetch('/data/players.json').then(r=>r.json()),
        fetch('/data/tournaments.json').then(r=>r.json()),
        fetch('/data/stadiums.json').then(r=>r.json()),
        fetch('/data/equipment.json').then(r=>r.json()),
        fetch('/data/events.json').then(r=>r.json()),
      ]);
      this.data.static = {teams,players,tours,stadiums,equip,events};
    }catch(e){
      console.warn('Static data failed, using defaults',e);
      this.data.static = {teams:[],players:[],tours:[],stadiums:[],equip:[],events:[]};
    }
  },
  onChange(fn){this.listeners.push(fn)},
  emit(){this.listeners.forEach(f=>f(this.data))},
  reset(){this.data = JSON.parse(JSON.stringify(DEFAULT)); this.emit()}
}

export default GameState;
