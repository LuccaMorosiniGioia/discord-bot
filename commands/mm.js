const { parse } = require("dotenv");

var players = [];


module.exports = function(msg, args){
    if(args.length > 0){
        let comando = args.shift(" ");
        if(comando === "reset"){
            players = [];
        } 
        else if(comando === "lista"){
            if(players.length == 0) {
                msg.channel.send("Tem ninguém nessa porra");
            }
            else{
                let buffer  = "";
                for(i = 1; i<=players.length; i++){
                    if(i == 6) buffer += "\nEspera: \n";
                    buffer += i + " - " + players[i-1] + "\n";
                }
                msg.channel.send(buffer);
            }
        }
        else if(comando == "sair"){
            let index = -1;
            for(i = 0; i < players.length; i++){
                if(players[i] == msg.author.username){
                    index = i;
                    break;
                }
            }
            if(index == -1){
                msg.reply("Nome não estava na lista.");
            }
            else{
                players.splice(index, 1); 
            }
        }
        else if(comando === "remove"){
            if(args.length >= 1){
                if(args[0] >= 0 && args[0] <= players.length){
                    players.splice(parseInt(args[0])-1, 1);
                }
                else{
                    msg.reply("Valor inválido!");
                }
            }
            else{
                msg.reply("Comando inválido!");
            }
        }
        else{
            msg.reply("Invalid command!");
        }
    }
    else{
        let flag = 0;
        for(i = 0; i < players.length; i++){
            if(players[i] === msg.author.username){
                msg.channel.send("Nome já está na lista.");
                flag = 1;
            }
        }
        if(!flag) players.push(msg.author.username);
    }
};