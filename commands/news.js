const { HLTV } = require('hltv')
const Discord = require("discord.js");

// inside a command, event listener, etc.
const embed = new Discord.MessageEmbed()


module.exports = async function(msg, args){
    
    let news = await HLTV.getNews();
    let buffer = "";
    for(let i = 0; i < 5; i++){
        embed.addField(news[i].title, "[Link]" + "(https://hltv.org" + news[i].link + ")");
    }
    msg.channel.send(embed);
}