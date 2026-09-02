// player.js - creation and profile
import State from './state.js';
import ThreeScene from './threeScene.js';
export default {
  createNew(){
    const p = {
      id: 'player_'+Date.now(),
      name: 'You', age:18, country:'ENG', role:'Batter',hand:'Right', bowlingStyle:'None',
      overall:55,fitness:90,form:'Normal',morale:80,
      skills:{batting:{timing:55,power:50,technique:50},bowling:{accuracy:40,pace:40},fielding:{catching:50}},
      equipment:{bat:'Classic',shoes:'Grip'},
      money:1000
    };
    State.data.player = p;State.emit();
    ThreeScene.updateAppearance({skin:0xf2d6b3,bat:0x8b5a2b});
  }
}
