

class Player{
    constructor(nome, id, rank){
        this.nome = nome;
        this.id = id;
        this.rank = rank;
    }
}

const maps = {
    mirage: 0,
    overpass: 1,
    dust2: 2,
    ancient: 3,
    nuke: 4,
    inferno: 5,
    vertigo: 6
}

class X5{

    constructor(){
        this.mapPool = ["mirage", "overpass", "dust2", "ancient", "nuke", "inferno", "vertigo"];
        this.mapPick = ["mirage", "overpass", "dust2", "ancient", "nuke", "inferno", "vertigo"];
        this.md3Maps = [];
        this.players = [];
        this.team1 = [];
        this.team2 = [];

        this.pick_ = 1;
        this.count = 0;
        this.ban = 1;
        this.total = 0;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    lista(msg){
        if(this.players.length == 0) {
            msg.channel.send("Tem ninguém nessa porra");
        }
        else{
            let buffer  = "";
            for(let i = 0; i < this.players.length; i++){
                if(i == 11) buffer += "\nEspera: \n";
                buffer += (i+1) + ". " + this.players[i].nome + ": " + this.players[i].rank + "\n";
            }
            msg.channel.send(buffer);
        }
    }

    resetTeams(){
        this.team1 = [];
        this.team2 = [];
    }

    reset(){
        this.players = [];
        this.mapPick = [];
        this.resetTeams();
    }

    remove(msg, args){
        if(args.length >= 1){
            if(parseInt(args[0]-1) >= 0 && parseInt(args[0]-1) <= this.players.length){
                this.players.splice(parseInt(args[0]-1), 1);
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
            //players.push(Player(args[0], ));
            const user = msg.mentions.users.first();
            if(!user) msg.reply("Comando inválido!");
            else{
                let flag = 0;
                for(let i = 0; i < this.players.length; i++){
                    if(this.players[i].id == user.id){
                        flag = 1;
                        break;
                    }
                }
                if(!flag) this.players.push(new Player(user.username, user.id, parseInt(args[1])));
                else msg.reply("Nome já tá na lista");
            }

        }
        else{
            msg.reply("Comando inválido!");
        }
    }

    times(){

        var aux = new Array(11), pick = 1, turn = 1;
    
        for(let i = 0; i < aux.length; i++){
            aux[i] = [];
        }
    
        for(let i = 0; i < this.players.length; i++){
            let index = parseInt(this.players[i].rank);
            if(index <= 10) aux[index].push(this.players[i]);
            else aux[10].push(this.players[i]);
        }
        var count = 0;
        for(let i = 10; i >= 0; i--){
            this.shuffleArray(aux[i]);
            for(let j = 0; j < aux[i].length; j++){
                if(pick){
                    this.team1.push(aux[i][j]);
                    console.log("Team 1 picked " + aux[i][j].nome + " Rank: " + i);
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
                    this.team2.push(aux[i][j]);
                    console.log("Team 2 picked " + aux[i][j].nome + " Rank: " + i);
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

    drawn(msg, args){
        this.resetTeams();
        if(this.players.length >= 2){
            this.times();
            var buffer = "TIME 1:\n";
            for(let i = 0; i < this.team1.length; i++){
                buffer += this.team1[i].nome + "\n";
            }
            buffer += "\nTIME 2:\n";
            for(let i = 0; i < this.team2.length; i++){
                buffer += this.team2[i].nome + "\n";
            }
            msg.channel.send(buffer);
        }
        else{
            msg.reply("Cabeças insuficientes.");
        }
    }

    teams(msg, args){
        if(this.team1.length >= 1 && this.team2.length >= 1){
            var buffer = "TIME 1:\n";
            for(let i = 0; i < this.team1.length; i++){
                buffer += this.team1[i].nome + "\n";
            }
            buffer += "\nTIME 2:\n";
            for(let i = 0; i < this.team2.length; i++){
                buffer += this.team2[i].nome + "\n";
            }
            msg.channel.send(buffer);
        }
        else{
            this.drawn(msg, args);
        }
    }

    async voice(msg, args){
        if(this.team1.length >= 1 && this.team2.length >= 1){
            for(let i = 0; i < this.team1.length; i++){
                await msg.guild.member(this.team1[i].id).voice.setChannel("842519111065141248");
            }
            for(let i = 0; i < this.team2.length; i++){
                await msg.guild.member(this.team2[i].id).voice.setChannel("842519011765518366");
            }
        }
        else{
            msg.reply("Times ainda não foram tirados");
        }
    }

    resetMaps(){
        this.mapPool = ["mirage", "overpass", "dust2", "ancient", "nuke", "inferno", "vertigo"];
        this.mapPick = ["mirage", "overpass", "dust2", "ancient", "nuke", "inferno", "vertigo"]
        this.md3Maps = [];

        this.pick_ = 1;
        this.count = 0;
        this.ban = 1;
        this.total = 0;
    }


    displayMaps(msg){
        let buffer  = "Mapas:\n";
        for(let i = 0; i < this.md3Maps.length; i++){
            if(i == 2) buffer += (i+1) + ". " + this.md3Maps[i][0] + " - Pick: leftover";
            else buffer += (i+1) + ". " + this.md3Maps[i][0] + " - Pick: time " + (i+1);
        }
        msg.channel.send(buffer);
    }

    displayMapsPick(msg){
        let buffer = "Mapas disponíveis: \n";
        for(let i = 0; i < this.mapPick.length; i++){
            if(this.mapPick[i] != ""){
                buffer += this.mapPick[i] + "\n";
            }
        }
        msg.channel.send(buffer);
    }

    pick(msg, args, client){
        console.log(args[0]);
        if(args[0] == "quit"){
            this.resetMaps();
        }
        else if(this.total == 7){
            msg.reply("Mapas já foram escolhidos");
        }
        else if(this.team1.length >= 1 && this.team2.length >= 1){
            if(this.pick_){
                let flag = 0;
                for(let i = 0; i < this.team1.length; i++){
                    if(msg.author.id  == this.team1[i].id){
                        flag = 1;
                        break;
                    }
                }
                console.log(this.ban, flag);
                if(this.ban && flag){
                    console.log(args[0]);
                    if(args[0] == "start"){
                        msg.channel.send("Time 1 - ban");
                        this.displayMapsPick(msg);
                    }
                    else if(args[0] in maps){
                        if(this.mapPick[maps[args[0]]] != ""){
                            this.mapPick[maps[args[0]]] = "";   
                            this.pick_ = 0;
                            this.total++;
                            this.ban = 0;

                            msg.channel.send("Time 2 - ban");
                            this.displayMapsPick(msg);
                            
                        }
                        else{
                            msg.reply("Mapa já foi banido/pickado");
                        }
                    }
                    else{
                        if(args[0] != "start") msg.reply("Mapa inválido/escrito errado");
                    }
                }
                else if(flag){
                    if(args[0] in maps){
                        if(this.mapPick[maps[args[0]]] != ""){
                            this.md3Maps.push(this.mapPick[[maps[args[0]]], this.pick_]);
                            this.mapPick[maps[args[0]]] = "";
                            this.total++;
                            this.pick_ = 0;

                            msg.channel.send("Time 2 - pick");
                            this.displayMapsPick(msg);

                        }
                        else{
                            msg.reply("Mapa já foi banido/pickado");
                        }

                    }
                    else{
                        msg.reply("Mapa inválido/escrito errado");
                    }
                }
            }
            else{
                let flag = 0;
                for(let i = 0; i < this.team2.length; i++){
                    if(msg.author.id == this.team2[i].id){
                        flag = 1;
                        break;
                    }
                }
                if(this.ban && flag){
                    if(args[0] in maps){
                        if(this.mapPick[maps[args[0]]] != ""){
                            this.mapPick[maps[args[0]]] = "";   
                            this.pick_ = 1;
                            this.total++;
                            this.ban = 0;
                            
                            if(this.total == 7){
                                for(let i = 0; i < this.mapPick.length; i++){
                                    if(this.mapPick[i] != ""){
                                        this.md3Maps.push([this.md3Maps[i], -1]);
                                    }
                                }
                                this.displayMaps(msg);
                            }
                            else{
                                msg.channel.send("Time 1 - pick");
                                this.displayMapsPick(msg);
                            }
                        }
                        else{
                            msg.reply("Mapa já foi banido/pickado");
                        }
                    }
                    else{
                        msg.reply("Mapa inválido/escrito errado");
                    }
                }
                else if(flag){
                    if(args[0] in maps){
                        if(this.mapPick[maps[args[0]]] != ""){
                            this.md3Maps.push([this.mapPick[maps[args[0]]], this.pick_]);
                            this.mapPick[maps[args[0]]] = "";
                            this.total++;
                            this.pick_ = 1;
                            this.ban = 1;

                            msg.channel.send("Time 1 - ban");
                            this.displayMapsPick(msg);
                        }
                        else{
                            msg.reply("Mapa já foi banido/pickado");
                        }

                    }
                    else{
                        msg.reply("Mapa inválido/escrito errado");
                    }
                }
            }
        }
        else{
            msg.reply("Times ainda não foram tirados");
        }

        
    }

}

var x5 = new X5();


module.exports = function(msg, args, client){
    if(args.length > 0){
        let comando = args.shift(" ");
        if(comando === "reset"){
            x5.reset();
        } 
        else if(comando === "lista"){
            console.log(client.user);
            x5.lista(msg);
        }
        else if(comando === "remove"){
            x5.remove(msg, args);
        }
        else if(comando === "add"){
            x5.add(msg, args);
        }
        else if(comando === "times"){
            x5.teams(msg, args);
        }
        else if(comando === "voice"){
            x5.voice(msg, args);
        }
        else if(comando === "pick" || comando === "ban"){
            x5.pick(msg, args, client);
        }
        else if(comando === "mapReset"){
            x5.resetMaps();
        }
        else if(comando === "maps"){
            x5.displayMaps();
        }
    }
    else{
        x5.drawn(msg, args);
    }
}