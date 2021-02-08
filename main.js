const dotenv = require('dotenv');
if(process.env.NODE_ENV !== 'production')
	dotenv.config();	

const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config.json");

const client = new Discord.Client();
const {BOT_TOKEN} = process.env;

const HEROKU_TIMESTAMP_DIFF = 3; //horas pro brasil

const firstDailyTime = new schedule.RecurrenceRule();
firstDailyTime.hour = 10 + HEROKU_TIMESTAMP_DIFF;
firstDailyTime.minute = 00;
firstDailyTime.dayOfWeek = [1,2,3,4,5];

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

client.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith("!")) return

	switch(message.content.slice(1).split(' ')[0].toLowerCase()){
		case "ping":
			message.channel.send('Pong!');
			break;
		case "rafa":
			message.delete();
			message.channel.send("Precisamos de férias!", {files: ['./img/frajuto.png']});
			break;
		case "rafa2":
			message.delete();
			message.channel.send("Rafa-Multi-Threads v3.cR0$$!", {files: ['./img/rafa-multi-threads.png']});
			break;
		case "crossfit":
		case "almoçareirnocross":
		case "cross":
			message.delete();
			client.channels.cache.get(config.AFKTextChannelId).send(`${message.member.displayName} foi crossfitar!`);
			message.member.voice.setChannel(client.channels.cache.get(config.AlmocoVoiceChannelId));
			break;
		case "vpn":
			message.delete();
			client.channels.cache.get(config.AFKTextChannelId).send(`${message.member.displayName} está usando a VPN!`);
			message.member.voice.setChannel(client.channels.cache.get(config.AlmocoVoiceChannelId));
			break;
		case "finalizar":
			message.delete();
			client.channels.cache.get(config.AFKTextChannelId).send(`${message.member.displayName} está finalizando por hoje, até mais!`);
			message.member.voice.setChannel(client.channels.cache.get(config.AlmocoVoiceChannelId));
			break;
		case "vitao":
			message.delete();
			message.channel.send("Rafa tá de ferias!?", {files: ['./img/rafa_ta_de_ferias.png']});
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
		case "send":
			message.channel.send(message.content.slice(6));
			message.delete();
			break;
		case 'daily':
			message.delete();
			mudarUsariosPraDaily();
			break;
		case 'help':
			message.delete();
			message.channel.send({embed: {
				color: 3447003,
				title: "Comandos:",
				fields: [
				{ 
					name: "Valor", 
					value:   `!help
							\n!ping
							\n!rafa
							\n!rafa2
							\n!vitao
							\n!almoco
							\n!afk
							\n!cross
							\n!cafezin
							\n!vpn
							\n!finalizar
							`, 
					inline: true
				},
				{ 	
					name: "Descrição", 
					value:   `Exibe uma lista dos comandos
					  		\nTempo de resposta do bot
					  		\nEnvia uma mensagem precisando de férias
					  		\nNão sei tem quer ver schrödinger
					  		\nRafa está de férias?
					  		\nMensagem padrão de horário de almoço
					  		\nAvisa a todos que você precisou se retirar
							\nAvisa a todos que você foi pro Cross
							\nAvisa a todos que você foi tomar cafe
							\nAvisa a todos que vai utilizar a VPN
							\nAvisa a todos que você está finalizando por hoje
							`, 
					inline: true
				}
				]
			  }
			});
			break;
		default:
			console.log(message.content.slice(1).toLowerCase())
			message.channel.send('Comando inválido.');
			break;
	}

	
  
})

client.login(BOT_TOKEN);

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