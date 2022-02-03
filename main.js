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
            case 'reuniao':
            case 'reunião':
                reuniaoCommand(message);
                break;
            case 'devolta':
            case 'voltei':
            case 'back':
                devoltaCommand(message);
                break;
            case 'academia':
            case 'treinardeverdade':
                academiaCommand(message);
                break;
            default:
                console.log(message.content.slice(1).toLowerCase())
                message.channel.send('Comando inválido.');
                break;
        }
    } catch (e) {
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

function getReuniaoVoiceChannelId(message) {
    const discordId = message.url.split('channels')[1].split('/')[1];
    //@ts-ignore
    const chat = client.channels.cache.find(c => c.type == 'voice' && (c.name.toLowerCase() == 'reuniao' || c.name.toLowerCase() == 'reunião') && c.guild == discordId)
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

function academiaCommand(message) {
    message.delete();
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi pra academia!`);
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function devoltaCommand(message) {
    message.delete();
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está de volta!`);
}

function reuniaoCommand(message) {
    message.delete();
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está em reunião!`);
    message.member.voice.setChannel(getReuniaoVoiceChannelId(message));
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

const helpCommandInfo = {
    help: 'Exibe uma lista dos comandos',
    ping: 'Tempo de resposta do bot',
    rafa: 'Envia uma mensagem precisando de férias',
    rafa2: 'Não sei tem quer ver schrödinger',
    rafaQA: 'Selo de qualidade do rafa',
    vitao: 'Rafa tá de ferias!?',
    vita1: 'Vita1: futuro arquiteto de software',
    almoco: 'Almoçar',
    cafezin: 'Toma um cafézin',
    afk: 'Fica AFK',
    cross: 'Crossfitar',
    vpn: 'Usa a VPN',
    finalizar: 'Até mais!',
    send: 'Envia uma mensagem',
    daily: 'Daily!',
    academia: 'Bora treinar',
    reuniao: 'Estou em reunião',
    devolta: 'Voltei!',
}

function helpCommand(message) {
    message.delete();
    message.channel.send({
        embed: {
            color: 3447003,
            title: "Comandos:",
            fields: [{
                    name: "Valor",
                    value: Object.keys(helpCommandInfo).map(i => `!${i}`).join('\n'),
                    inline: true
                },
                {
                    name: "Descrição",
                    value: Object.values(helpCommandInfo).map(i => `${i}`).join('\n'),
                    inline: true
                }
            ]
        }
    });
}