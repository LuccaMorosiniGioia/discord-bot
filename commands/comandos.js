module.exports = function(msg, args){
    let txt = "!ping : pong!\n\n!mm:\n-Sem argumentos lhe adiciona a lista do mm.\n-!mm reset : Limpa todos os nomes da lista.\n-!mm lista : Mostra a lista atual.\n-!mm sair : Tira seu nome da lista.\n-!mm remove _posição : Remove o nome na posição _posição da lista.\n\n!x5:\n-Sem argumentos gera os dois times para o x5.\n-!x5 remove _posição : Remove o nome na posição _posição da lista.\n-!x5 lista : Mostra a lista atual.\n-!x5 reset : Limpa todos os nomes da lista.\n-!x5 add _nome _rank : Adiciona um jogador de nome _nome e ranking _rank.\n";
    msg.channel.send(txt);
}
