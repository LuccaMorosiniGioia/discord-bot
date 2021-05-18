require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();


client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', commandHandler);

const mm = require("./commands/mm.js");
const ping = require("./commands/ping.js");
const comandos = require("./commands/comandos.js");
const x5 = require("./commands/x5.js");
const mentions = require("./commands/mentions.js");
const mute = require("./commands/mute.js");
const unmute = require("./commands/unmute.js");
const rank = require("./commands/rank.js");
const team  = require("./commands/team.js");
const playerRank = require("./commands/playerRank.js");
const news = require("./commands/news.js");

const commands = {
    ping,
    mm,
    comandos,
    x5, 
    mentions, 
    mute,
    unmute,
    rank,
    team,
    playerRank,
    news
};

function commandHandler(msg){
    let  tokens = msg.content.split(" ");
    let command = tokens.shift();
    if(command.charAt(0) == "!" && msg.author.username != "Gau"){
        command = command.substring(1);
        if(command in commands){
            commands[command](msg, tokens);
        }
        else{
            msg.reply("Invalid command!")
        }
    }
    if(msg.mentions.has(client.user.id)){
        commands["mentions"](msg);
    }
}
