// state.js - central GameState (updated: ensure default player exists)
const DEFAULT = {
  saveVersion:1,
  player:{
    id: 'new_player_0',
    name: 'New Player',
    age:18,
    country:'Bangladesh',
    role:'Batter',
    battingHand:'Right',
    bowlingStyle:'None',
    overall:50,
    xp:0,
    money:100,
    fitness:85,
    popularity:10,
    team:null,
    skills:{
      batting: {timing:50,power:50,technique:50,footwork:50,defense:50,aggressiveness:50,placement:50,running:50},
      bowling: {pace:40,swing:40,seam:40,spin:40,accuracy:40,variation:40,control:40,stamina:50},
      fielding:{catching:45,throwing:45,reflex:45,ground:45,wk:30}
    },
    equipment:{batId:null,shoesId:null,kitId:null}
  },
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
        fetch('/data/teams.json').then(r=>r.ok? r.json():[]).catch(()=>[]),
        fetch('/data/players.json').then(r=>r.ok? r.json():[]).catch(()=>[]),
        fetch('/data/tournaments.json').then(r=>r.ok? r.json():[]).catch(()=>[]),
        fetch('/data/stadiums.json').then(r=>r.ok? r.json():[]).catch(()=>[]),
        fetch('/data/equipment.json').then(r=>r.ok? r.json():[]).catch(()=>[]),
        fetch('/data/events.json').then(r=>r.ok? r.json():[]).catch(()=>[]),
      ]);
      this.data.static = {teams,players,tours,stadiums,equip,events};
    }catch(e){
      console.warn('Static data failed, using defaults',e);
      this.data.static = {teams:[],players:[],tours:[],stadiums:[],equip:[],events:[]};
    }

    // ensure required game fields exist (in case of migration)
    if(!this.data.player) this.data.player = JSON.parse(JSON.stringify(DEFAULT.player));
    if(!this.data.career) this.data.career = JSON.parse(JSON.stringify(DEFAULT.career));
    if(!this.data.career.records) this.data.career.records = {matches:0,runs:0,wickets:0};

    this.emit();
  },
  onChange(fn){this.listeners.push(fn)},
  emit(){try{this.listeners.forEach(f=>f(this.data))}catch(e){console.error('State listener error',e)}},
  reset(){this.data = JSON.parse(JSON.stringify(DEFAULT)); this.emit()}
}

export default GameState;
