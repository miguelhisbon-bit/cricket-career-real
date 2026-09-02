// ai.js - simple AI behaviors
export default {
  simulateBallAgainstPlayerBowling(player){
    // simplified AI: random runs, occasional wicket influenced by player's bowling accuracy
    const acc = player.skills.bowling.accuracy/100;
    const wicket = Math.random() < (0.01 + (1-acc)*0.05);
    const runs = Math.random()<0.6?0: (Math.random()<0.8?1: Math.random()<0.95?2:4);
    return {runs,wicket}
  }
}
