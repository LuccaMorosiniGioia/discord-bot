var players = [["",""]];

class Player{
    constructor(nome, id, rank){
        this.nome = nome;
        this.id = id;
        this.rank = rank;
    }
}

class X5{

    constructor(){
        this.players = [];
        this.team1 = [];
        this.team2 = []
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    times(){

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
    }

    lista(msg){
        if(players.length == 0) {
            msg.channel.send("Tem ninguém nessa porra");
        }
        else{
            let buffer  = "";
            for(i = 1; i<players.length; i++){
                if(i == 11) buffer += "\nEspera: \n";
                buffer += i + " - " + players[i].nome + ": " + players[i].rank + "\n";
            }
            msg.channel.send(buffer);
        }
    }

    reset(){
        players = [[]];
    }

    remove(msg, args){
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

    add(msg, args){
        if(args.length >= 2){
            players.push([args[0], args[1]]);
        }
        else{
            msg.reply("Comando inválido!");
        }
    }


}

let x5 = new X5();




module.exports = function(msg, args){
    if(args.length > 0){
        let comando = args.shift(" ");
        if(comando === "reset"){
            x5.reset();
        } 
        else if(comando === "lista"){
            x5.lista(msg);
        }
        else if(comando === "remove"){
            x5.remove(msg, args);
        }
        else if(comando === "add"){
            x5.add(msg, args);
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