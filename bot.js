require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

const mm = require("./commands/mm.js");

const commands = {
    mm
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const commandHandler = require("./commands");

client.on('message', commandHandler);
  