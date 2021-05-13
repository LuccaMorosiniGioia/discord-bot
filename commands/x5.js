var players = [["",""]];

function times(){
    playersSorted = players;
    playersSorted.sort((a, b) => a[1] - b[1]);
}

module.exports = function(msg, args){
    if(args.length > 0){
        let comando = args.shift(" ");
        if(comando === "reset"){
            players = [["", ""]];
        } 
        else if(comando === "lista"){
            if(players.length == 1) {
                msg.channel.send("Tem ninguém nessa porra");
            }
            else{
                let buffer  = "";
                for(i = 1; i<players.length; i++){
                    if(i == 11) buffer += "\nEspera: \n";
                    buffer += i + " - " + players[i][0] + ": " + players[i][1] + "\n";
                }
                msg.channel.send(buffer);
            }
        }
        else if(comando === "remove"){
            if(args.length >= 1){
                if(args[0] >= 0 && args[0] <= players.length){
                    players.splice(parseInt(args[0]), 1);
                }
                else{
                    msg.reply("Valor inválido!");
                }
            }
            else{
                msg.reply("Comando inválido!");
            }
        }
        else if(comando === "add"){
            if(args.length >= 2){
                players.push([args[0], args[1]]);
            }
            else{
                msg.reply("Comando inválido!");
            }
        }
    }
    else{
        if(players.length >= 11){
            //let teams = ["", ""];
            //teams = times();
            msg.reply("Tá pronto ainda não :(");
        }
        else{
            msg.reply("Cabeças insuficientes.");
        }
    }
}