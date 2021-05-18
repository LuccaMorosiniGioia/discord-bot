module.exports = function(msg, args){
    var fs = require('fs');

    try {  
        var data = fs.readFileSync('./miscelaneous/comandos.txt', 'utf8');
        //console.log(data.toString());  
        msg.channel.send(data.toString());  
    } catch(e) {
        console.log('Error:', e.stack);
    }
    
}
