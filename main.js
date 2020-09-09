const Discord = require("discord.js");
const schedule = require('node-schedule');

const client = new Discord.Client();



const rule = new schedule.RecurrenceRule();

rule.dayOfWeek = [0,1,2,3,4];
rule.hour = 14;
rule.minute = 55;

var j = schedule.scheduleJob(rule, function(){
  
    client.channels.cache.get('752551146748379288').send('<@&752527947209900124> a daily ira começar em 5 minutos!')
});

client.on('ready', () => {
  console.log("Bot iniciado com sucesso")


});

 client.on('message', message => {
  if (message.author.bot) return;
    message.channel.send('pong2');
    
    const canal = client.channels.cache.get("752539833297141841")
    message.member.voice.setChannel(canal, "A dayli começo coroi");
    message.member.voice.setMute(true);
    message.member.voice.setMute(false);

  // );

  //  message.guild.member.setVoiceChannel('752554624451477634');
})
client.login("NzUyNTg1ODQxMTU0NzE5Nzk5.X1ZyLg.wcAD02EERWMUfAw1FoChwtmyKGs");


//----------------------------------------------------------------------------------

//! Lista de usuarios
// const list = client.guilds.fetch("725108344221597778"); 
// (list.then(a => console.log(a.members.cache.map(a => a.user.username))))

//! Responder a um comando, mensagem em canla especifico e fazer menção

// client.on('message', message => {
  // if (message.author.bot) return;
  // if (message.content === 'ping') {
    //   message.delete();
    //   message.channel.send('pong2');
    //   client.channels.cache.get('752551146748379288').send('<@&752527947209900124> Hello here!')
  // }
// });

//! Agendar uma função e reagendar


// j.schedule({hour:10, minute:45});