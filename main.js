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
            case "rafa3":
                rafa3Command(message);
                break;
            case "rafadeploy":
                rafaDeployCommand(message);
                break;
            case "rafaqa":
                rafaQACommand(message);
                break;
            case "cronometro":
                cronometroCommand(message);
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
            case "lanchinho":
            case "lanche":
                cafezinCommand(message);
                break;
            case "afk":
            case "agua":
            case "banheiro":
                afkCommand(message);
                break;
            case "send":
                sendCommand(message);
                break;
            case 'daily':
                dailyCommand(message);
                break;
            case 'updatephp':
                updatephpCommand(message);
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
            case 'deploynasexta':
                deployNaSextaCommand(message);
                break;
            case 'tipoitem':
                tipoItemCommand(message);
                break;
            case 'saladocris':
                sala_do_crisCommand(message);
                break;
            case 'macarrao':
            case 'macarrão':
                macarraoCommand(message);
                break;
            case 'php':
                phpCommand(message);
                break;
            case 'sextouend':
                sextouendCommand(message);
                break;
            case 'baddeploy':
                baddeployCommand(message);
                break;
            case 'gooddeploy':
                gooddeployCommand(message);
                break;
            case 'hollywood':
                hollywoodCommand(message);
                break;
            default:
                console.log(message.content.slice(1).toLowerCase())
                message.channel.send('Comando inválido.');
                break;
        }
    } catch (e) {
        console.log(`Error command: ${message.content}`)
        console.log(e);
        console.log(JSON.stringify(e));
    }
})

client.login(BOT_TOKEN);

//s
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

function deployNaSextaCommand(message) {
    message.channel.send("Pega a Becks pq sextou com deploy!", { files: ['./img/sextou_com_deploy.jpg'] });
}

function academiaCommand(message) {
    // message.delete();
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi pra academia!`);
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function devoltaCommand(message) {
    // message.delete();
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está de volta!`);
}

function reuniaoCommand(message) {
    // message.delete();
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está em reunião!`);
    message.member.voice.setChannel(getReuniaoVoiceChannelId(message));
}

function rafaCommand(message) {
    // message.delete();
    message.channel.send("Precisamos de férias!", { files: ['./img/frajuto.png'] });
}

function sextouendCommand(message) {
    // message.delete();
    message.channel.send("Weekend dev", { files: ['./img/sextouend.png'] });
}

function macarraoCommand(message) {
    // message.delete();
    message.channel.send("Macarroneee ╰(*°▽°*)╯", { files: ['./img/boaSorteMacarrao.jpg'] });
}

function rafa2Command(message) {
    // message.delete();
    message.channel.send("Rafa-Multi-Threads v3.cR0$$!", { files: ['./img/rafa-multi-threads.png'] });
}

function rafa3Command(message) {
    // message.delete();
    message.channel.send("Botando o bug na rede!", { files: ['./img/saiDaquiBug.gif'] });
}

function rafaDeployCommand(message) {
    // message.delete();
    message.channel.send("Quando o bruno pede pra fazer deploy na noite!", { files: ['./img/rafaDeployNaSextaANoite.jpeg'] });
}


function rafaQACommand(message) {
    // message.delete();
    message.channel.send("Aprovado pelo rafa! :rafa_QA:", { files: ['./img/selo_rafa_de_qualidade.png'] });
}

function crossCommand(message) {
    // message.delete();
    //@ts-ignore
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi crossfitar!`);
    //@ts-ignore
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function vpnCommand(message) {
    // message.delete();
    //@ts-ignore
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está usando a VPN!`);
    //@ts-ignore
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function finalizarCommand(message) {
    // message.delete();
    //@ts-ignore
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} está finalizando por hoje, até mais!`);

    //@ts-ignore
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function vitaoCommand(message) {
    // message.delete();
    message.channel.send("Rafa tá de ferias!?", { files: ['./img/rafa_ta_de_ferias.png'] });
}


function hollywoodCommand(message) {
    // message.delete();
    message.channel.send("Bora pra hollywood =) ", { files: ['./img/hollywood.jpeg'] });
}

function tipoItemCommand(message) {
    // message.delete();
    message.channel.send("Everyday I wake up TipoItem", { files: ['./img/everyday_tipo_item.png'] });
}


function baddeployCommand(message) {
    // message.delete();
    message.channel.send("Quando o deploy da ruim", { files: ['./img/deploy_deu_ruim.png'] });
}

function updatephpCommand(message) {
    // message.delete();
    message.channel.send("Update sem where de belo monte.", { files: ['./img/updatephp.jpg'] });
}


function gooddeployCommand(message) {
    // message.delete();
    message.channel.send("Quando o deploy da bom", { files: ['./img/deploy_deu_bom.png'] });
}

function sala_do_crisCommand(message) {
    // message.delete();
    message.channel.send(`Olá ψ(._. )>`, { files: ['./img/sala_do_cris.png'] });
}

function phpCommand(message) {
    // message.delete();
    message.channel.send(`PH~~ili~~P~~i~~`, { files: ['./img/php.png'] });
}

function vita1Command(message) {
    // message.delete();
    message.channel.send("Vita1: futuro arquiteto de software", { files: ['./img/vita1.png'] });
}

function cronometroCommand(message) {
    // message.delete();
    const qtdRounds = Number(message.content.split(" ")[1]);
    if (qtdRounds && Number.isInteger(qtdRounds)) {
        message.channel.send(`Cronometro iniciado! \nRound 1 de ${qtdRounds}! \nTempo: 60s`).then((msgRef) => {
            startCronometro(msgRef, qtdRounds, 1, 60);
        });
    }
}

function startCronometro(msgRef, roundTotal, roundAtual, tempo) {
    if (roundAtual <= roundTotal) {
        //msgRef.edit(`Cronometro iniciado! \n Round ${roundAtual} de ${roundTotal}! \n Tempo: ${tempo}s`)
        cronometrar(msgRef, roundTotal, roundAtual, tempo);
    } else {
        msgRef.edit(`Cronometro finalizado! \nRound ${roundAtual - 1} de ${roundTotal}! \nTempo: Over!`)
    }
}

function cronometrar(msgRef, roundTotal, roundAtual, tempo) {
    if (tempo > 0) {
        msgRef.edit(`Cronometro iniciado! \nRound ${roundAtual} de ${roundTotal}! \nTempo: ${tempo}s`)
        setTimeout(() => {
            cronometrar(msgRef, roundTotal, roundAtual, tempo - 5);
        }, 5000);
    } else {
        startCronometro(msgRef, roundTotal, roundAtual + 1, 60);
    }
}

function almocoCommand(message) {
    // message.delete();
    //@ts-ignore
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi almoçar!`);
    //@ts-ignore
    message.member.voice.setChannel(getAlmocoVoiceChannelId(message));
}

function cafezinCommand(message) {
    // message.delete();
    //@ts-ignore
    client.channels.cache.get(getNotificacoesVoiceChannelId(message)).send(`${message.member.displayName} foi tomar um cafezin e ja volta!`);

    //@ts-ignore
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function afkCommand(message) {
    // message.delete();
    const notificaoId = getNotificacoesVoiceChannelId(message)
        //@ts-ignore
    client.channels.cache.get(notificaoId).send(`${message.member.displayName} precisou sair e ja volta!`);

    //@ts-ignore
    message.member.voice.setChannel(getAfkVoiceChannelId(message));
}

function sendCommand(message) {
    // message.delete();
    message.channel.send(message.content.slice(6));
}

function dailyCommand(message) {
    try {
        // message.delete();
        message.channel.send("@everyone Daily!");
    } catch (e) {
        console.log(e);
    }
}

const helpCommandInfo = {
    help: 'Exibe uma lista dos comandos',
    cronometro: 'Inicia um cronometro de 60s! quantidade de rounds é passada da seguinte forma: !cronometro 5',
    ping: 'Tempo de resposta do bot',
    rafa: 'Envia uma mensagem precisando de férias',
    rafa2: 'Não sei tem quer ver schrödinger',
    rafa3: 'Rafa jogador botando os bugs na rede',
    rafadeploy: 'Quando pedem pra fazer deploy a noite!! :/ :/',
    rafaQA: 'Selo de qualidade do rafa',
    vitao: 'Rafa tá de ferias!?',
    vita1: 'Vita1: futuro arquiteto de software',
    updatephp: 'Update selo de qualidade do php',
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
    deployNaSexta: 'Pega a Becks pq sextou com deploy!',
    tipoItem: 'Everyday I wake up TipoItem',
    saladocris: 'Sala do Cris',
    php: 'PH~~ili~~P~~i~~',
    macarrao: 'Boa tarde, Macarrone!',
    sextouend: 'Backend? No. Frontend? No. Weekend ╰(*°▽°*)╯ !',
    baddeploy: 'Quando o deploy da ruim',
    gooddeploy: 'Quando o deploy da bom',
    hollywood: 'Bora pra hollywwood!',
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