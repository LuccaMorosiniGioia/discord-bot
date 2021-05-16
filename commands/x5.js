var players = [["",""]];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function times(){

    var aux = new Array(11), pick = 1, turn = 1;
    var team1 = [], team2 = [];

    for(let i = 0; i < aux.length; i++){
        aux[i] = [];
    }

    for(let i = 1; i < 11; i++){
        let index = parseInt(players[i][1]);
        if(index <= 10) aux[index].push(players[i][0]);
        else aux[10].push(players[i][0]);
    }
    var count = 0;
    for(let i = 10; i >= 0; i--){
        shuffleArray(aux[i]);
        for(let j = 0; j < aux[i].length; j++){
            if(pick){
                team1.push(aux[i][j]);
                console.log("Team 1 picked " + aux[i][j] + " Rank: " + i);
                if(turn == 1 || turn == 5){
                    pick = 0;
                }
                else{
                    count++;
                    if(count == 2){
                        count = 0;
                        pick = 0;
                    }
                }
            }
            else{
                team2.push(aux[i][j]);
                console.log("Team 2 picked " + aux[i][j] + " Rank: " + i);
                if(turn == 1 || turn == 10){
                    pick = 1;
                }
                else{
                    count++;
                    if(count == 2){
                        count = 0;
                        pick = 1;
                    }
                }
            }
            turn++;
        }
    }
    return [team1, team2];
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
            var team1 = [], team2 = [];
            [team1, team2] = times();
            var buffer = "TIME 1:\n";
            for(let i = 0; i < 5; i++){
                buffer += team1[i] + "\n";
            }
            buffer += "\nTIME 2:\n";
            for(let i = 0; i < 5; i++){
                buffer += team2[i] + "\n";
            }
            msg.channel.send(buffer);
        }
        else{
            msg.reply("Cabeças insuficientes.");
        }
    }
}