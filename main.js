const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production')
	dotenv.config();

const Discord = require("discord.js");
const schedule = require('node-schedule');
const config = require("./config.json");

// const cm = require("./comandosMessages.js");

const client = new Discord.Client();
const { BOT_TOKEN } = process.env;

const HEROKU_TIMESTAMP_DIFF = 3; //horas pro brasil

const firstDailyTime = new schedule.RecurrenceRule();
firstDailyTime.hour = 10 + HEROKU_TIMESTAMP_DIFF;
firstDailyTime.minute = 00;
firstDailyTime.dayOfWeek = [1, 2, 3, 4, 5];

client.on('ready', () => { console.log("Bot iniciado com sucesso") });

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

//ToDo: Refatorar

client.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith("!")) return;
	console.log(message.content)
	try {
		switch (message.content.slice(1).split(' ')[0].toLowerCase()) {
			case "ping":
				const timeTaken = Date.now() - message.createdTimestamp;
				message.reply(`Pong! Essa mensagem teve uma latência de ${timeTaken}ms.`);
				break;
			case "rafa":
				rafaCommand(message);
				break;
			case "rafa2":
				rafa2Command(message);
				break;
			case "rafaqa":
				rafaQACommand(message);
				break;
			case "crossfit":
			case "almoçareirnocross":
			case "cross":
				crossCommand(message);
				break;
			case "vpn":
				vpnCommand(message);
				break;
			case "finalizar":
				finalizarCommand(message);
				break;
			case "vitao":
				vitaoCommand(message);
				break;
			case "vita1":
				vita1Command(message);
				break;
			// ToDo: adicionar mais variacoes de almoco pro lucas errar
			case "almoço":
			case "almoco":
				almocoCommand(message);
				break;
			case 'cafezin':
				cafezinCommand(message);
				break;
			case "afk":
				afkCommand(message);
				break;
			case "send":
				sendCommand(message);
				break;
			case 'daily':
				dailyCommand(message);
				break;
			case 'help':
				helpCommand(message);
				break;
			default:
				console.log(message.content.slice(1).toLowerCase())
				message.channel.send('Comando inválido.');
				break;
		}
	}
	catch (e) {
		console.log(e);
		console.log(JSON.stringify(e));
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



function getAfkVoiceChannelId(message) {
	const discordId = message.url.split('channels')[1].split('/')[1];
	//@ts-ignore
	const chat = client.channels.cache.find(c => c.type == 'voice' && c.name.toLowerCase() == 'afk' && c.guild == discordId)
	//@ts-ignore
	return chat.id
}

function getNotificacoesVoiceChannelId(message) {
	const discordId = message.url.split('channels')[1].split('/')[1];
	//@ts-ignore
	const chat = client.channels.cache.find(c => c.type == 'text' && c.name.toLowerCase() == 'notificações' && c.guild == discordId)
	//@ts-ignore
	return chat.id
}

function getGeneralChannelId(message) {
	const discordId = message.url.split('channels')[1].split('/')[1];
	//@ts-ignore
	const chat = client.channels.cache.find(c => c.type == 'text' && c.name.toLowerCase() == 'general' && c.guild == discordId)
	//@ts-ignore
	return chat.id
}

function getAlmocoVoiceChannelId(message) {
	const discordId = message.url.split('channels')[1].split('/')[1];
	//@ts-ignore
	const chat = client.channels.cache.find(c => c.type == 'voice' && c.name.toLowerCase() == 'almoço' && c.guild == discordId)
	//@ts-ignore
	return chat.id
}

function rafaCommand(message) {
	message.delete();
	message.channel.send("Precisamos de férias!", { files: ['./img/frajuto.png'] });
}

function rafa2Command(message) {
	message.delete();
	message.channel.send("Rafa-Multi-Threads v3.cR0$$!", { files: ['./img/rafa-multi-threads.png'] });
}

function rafaQACommand(message) {
	message.delete();
	message.channel.send("Aprovado pelo rafa! :rafa_QA:", { files: ['./img/selo_rafa_de_qualidade.png'] });
}

function crossCommand(message) {
	message.delete();
	//@ts-ignore
	client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi crossfitar!`);
	//@ts-ignore
	message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function vpnCommand(message) {
	message.delete();
	//@ts-ignore
	client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está usando a VPN!`);
	//@ts-ignore
	message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function finalizarCommand(message) {
	message.delete();
	//@ts-ignore
	client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está finalizando por hoje, até mais!`);

	//@ts-ignore
	message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function vitaoCommand(message) {
	message.delete();
	message.channel.send("Rafa tá de ferias!?", { files: ['./img/rafa_ta_de_ferias.png'] });
}

function vita1Command(message) {
	message.delete();
	message.channel.send("Vita1: futuro arquiteto de software", { files: ['./img/vita1.png'] });
}

function almocoCommand(message) {
	message.delete();
	//@ts-ignore
	client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi almoçar!`);
	//@ts-ignore
	message.member.voice.setChannel(getAlmocoVoiceChannelId(message));
}

function cafezinCommand(message) {
	message.delete();
	//@ts-ignore
	client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi tomar um cafezin e ja volta!`);

	//@ts-ignore
	message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function afkCommand(message) {
	message.delete();
	const notificaoId = getNotificacoesVoiceChannelId(message)
	//@ts-ignore
	client.channels.cache.get(notificaoId).send(`${message.member.displayName} precisou sair e ja volta!`);

	//@ts-ignore
	message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function sendCommand(message) {
	message.delete();
	message.channel.send(message.content.slice(6));
}

function dailyCommand(message) {
	try {
		message.delete();
		message.channel.send("@everyone Daily!");
	} catch (e) {
		console.log(e);
	}
}

function helpCommand(message) {
	message.delete();
	message.channel.send({
		embed: {
			color: 3447003,
			title: "Comandos:",
			fields: [
				{
					name: "Valor",
					value: `!help
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
					value: `Exibe uma lista dos comandos
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
}