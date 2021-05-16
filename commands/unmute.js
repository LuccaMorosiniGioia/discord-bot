module.exports = async function(msg, args){
    const user = msg.mentions.users.first();
    if (!user) return msg.reply('Comando inválido');
    else {
        let person = msg.guild.member(user);
        await person.edit({mute: false});
    }
}