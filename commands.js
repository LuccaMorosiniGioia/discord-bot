const mm = require("./commands/mm.js");
const ping = require("./commands/ping.js");
const comandos = require("./commands/comandos.js");
const x5 = require("./commands/x5.js");
const { Client, User } = require("discord.js");

const commands = {
    ping,
    mm,
    comandos,
    x5
};

/*module.exports = function(msg){
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
        msg.reply("Fala marreco");
    }
}*/