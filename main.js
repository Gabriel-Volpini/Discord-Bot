const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Bot iniciado com sucesso");
})

client.on('message', message => {
    if (message.content === 'ping') {
      message.channel.send('pong');
    }
});