const { HLTV } = require('hltv')

module.exports = async function(msg, args){
    const rank = await HLTV.getTeamRanking();
    let i = 1;
    let buffer = "";
    console.log(rank);
    for(x of rank){
        console.log(x.team.name);
        buffer += i + ". " +  x.team.name + " - " + x.points + "\n";
        i++;
        if(i == 11) break;
    }
    msg.channel.send(buffer);
}
