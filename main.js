const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config.json");

const client = new Discord.Client();


const firstDailyTime = new schedule.RecurrenceRule();
firstDailyTime.hour = 9;
firstDailyTime.minute = 00;
firstDailyTime.dayOfWeek = [0,1,2,3,4];


const secondDailyTime = new schedule.RecurrenceRule();
secondDailyTime.hour = 15;
secondDailyTime.minute = 00;
secondDailyTime.dayOfWeek = [0,1,2,3,4];


client.on('ready', () => {console.log("Bot iniciado com sucesso")});

const mudarUsariosPraDaily = () => {
	try {
	    const canal = client.channels.cache.get(config.DailyVoiceChannelId)
		client.channels.cache.get(config.DailyTextChannelId).send(config.DailyWarnigMessage);
		const list = client.guilds.cache.get("754400810628022302"); 

		// setTimeout(() => { 
			// list.members.cache.forEach(member => {
			// 	if(!member.voice.channelID)return;
			// 	member.voice.setChannel(canal)
			// }) 
		// },50000)

	} catch (e) {
		// client.channels.cache.get(config.ErroChanelId).send(`${e}`);
		console.log(e);
	}
}
const firstDailyReference = schedule.scheduleJob(firstDailyTime, mudarUsariosPraDaily);
const secondDailyReference = schedule.scheduleJob(secondDailyTime, mudarUsariosPraDaily);


client.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith("!")) return

	switch(message.content.slice(1).toLowerCase()){
		case "ping":
			message.channel.send('Pong!');
			break;
		case "rafa":
			message.delete();
			message.channel.send("Precisamos de férias!", {files: ['./img/frajuto.png']});
			break;
		case "almoço":
		case "almoco":
			message.delete();
			client.channels.cache.get(config.AFKTextChannelId).send(`${message.member.displayName} foi almoçar!`);
			message.member.voice.setChannel(client.channels.cache.get(config.AlmocoVoiceChannelId));
			break;
		case 'cafezin':
			message.delete();
			client.channels.cache.get(config.AFKTextChannelId).send(`${message.member.displayName} foi tomar um cafezin e ja volta!`);
			message.member.voice.setChannel(client.channels.cache.get(config.AFKVoiceChannelId));
			break;
		case "afk":
			message.delete();
			client.channels.cache.get(config.AFKTextChannelId).send(`${message.member.displayName} precisou sair e ja volta!`);
			message.member.voice.setChannel(client.channels.cache.get(config.AFKVoiceChannelId));
			break;
		case 'daily':
			mudarUsariosPraDaily();
			break;
		case 'help':
			message.delete();
			message.channel.send({embed: {
				color: 3447003,
				title: "Comandos:",
				fields: [
				  { name: "Valor", value: "!help\n!ping\n!rafa\n!almoco\n!afk\n!cafezin", inline: true},
				  { name: "Descrição", value: "Exibe uma lista dos comandos\nTempo de resposta do bot\nEnvia uma mensagem precisando de férias\nMensagem padrão de horário de almoço\nAvisa a todos que você precisou se retirar\nAvisa a todos que você foi tomar cafe", inline: true}
				]
			  }
			});
			break;
		default:
			message.channel.send('Comando inválido.');
			break;
	}

	
  
})

client.login(config.TokeBot);

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