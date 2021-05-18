const { HLTV } = require('hltv')

module.exports = async function(msg, args){
    const rank = await HLTV.getPlayerRanking();
    let i = 1;
    let buffer = "";
    //console.log(rank[0].teams[0]);
    for(x of rank){
        buffer += i + ". " +  x.player.name + " - Team: " + x.teams[0].name + "\n";
        /*buffer += " maps: " + x.maps + "\n";
        buffer += " kd: " + x.kd + "\n";
        buffer += " ratin1: " + x.rating1 + "\n";*/
        i++;
        if(i == 11) break;
    }
    buffer += "\nhttps://hltv.org/stats/players";
    msg.channel.send(buffer);
}
