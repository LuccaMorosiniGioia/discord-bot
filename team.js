const { HLTV } = require('hltv')
const Discord = require("discord.js");
const { parse } = require('dotenv');

function parseToStr(result, name, stats){
    let buffer = name + "\n\n";
    buffer += "mapsPlayed: " + result.mapsPlayed + "\n";
    buffer += "totalKills: " + result.totalKills + "\n";
    buffer += "totalDeaths: " + result.totalDeaths + "\n";
    buffer += "roundsPlayed: " + result.roundsPlayed + "\n";
    buffer += "kdRatio: " + result.kdRatio + "\n";
    buffer += "wins: " + result.wins + "\n";
    buffer += "losses: " + result.losses + "\n\n";
    buffer += "Current lineup: \n";
    for(x of stats.currentLineup){
        buffer += x.name + "\n";
    }
    buffer += "\nLast events: \n";
    for(let i = 0; i < 5; i++){
        buffer += stats.events[i].event.name + " - place: " + stats.events[i].place + "\n";
    }
    

    return buffer;
}


module.exports = async function(msg, args){
    let teamName = args[0];
    try{
        const team = await HLTV.getTeamByName({ name: teamName }, true);
        const name = team.name;
        const rank = await HLTV.getTeamStats({ id: team.id });
        console.log(team);
        buffer = parseToStr(rank.overview, name, rank);
        buffer += "\nhttps://hltv.org/stats/teams/" + team.id + "/" + team.name;
        msg.channel.send(buffer);
    }
    catch(err) {
        msg.channel.send("Nome do time escrito errado");
    }

}
