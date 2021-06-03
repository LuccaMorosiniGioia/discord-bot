module.exports = async function(msg, args){
    const user = msg.mentions.users.first();
    if (!user) return msg.reply('Comando inválido');
    else {
        msg.channel.send("Cala a boca, marreco");
        let person = msg.guild.member(user);
        await person.edit({mute: true});
        console.log(user);
    }
}