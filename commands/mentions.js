module.exports = function(msg, args){
    var respostas = ["Fala marreco", "Ahhhh ta banido", "Ki abalo", "G? 3? X?"];
    var resposta = respostas[Math.floor(Math.random() * respostas.length)];
    msg.reply(resposta);
}