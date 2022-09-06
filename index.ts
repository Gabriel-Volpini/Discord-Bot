import dotenv  from 'dotenv';
import Discord, { Intents, PresenceData, Message } from 'discord.js';

if (process.env.NODE_ENV !== 'production')
    dotenv.config();

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const { BOT_TOKEN } = process.env;

client.on('ready', () => { console.log("Bot iniciado com sucesso") });

client.on('message', (message: Message) => {
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



function getAfkVoiceChannelId(message: Message) {
    const discordId = message.url.split('channels')[1].split('/')[1];
    const chat = client.channels.cache.find(c => c.type == 'GUILD_VOICE' && c.name.toLowerCase() == 'afk' && c.guild.id == discordId)
    return chat!.id
}

function getReuniaoVoiceChannelId(message: Message) {
    const discordId = message.url.split('channels')[1].split('/')[1];
    const chat = client.channels.cache.find(c => c.type == 'GUILD_VOICE' && (c.name.toLowerCase() == 'reuniao' || c.name.toLowerCase() == 'reunião') && c.guild.id == discordId)
    return chat!.id
}

function getNotificacoesVoiceChannelId(message: Message) {
    const discordId = message.url.split('channels')[1].split('/')[1];
    const chat = client.channels.cache.find(c => c.type == 'GUILD_TEXT' && c.name.toLowerCase() == 'notificações' && c.guild.id == discordId)
    return chat!.id
}

function getGeneralChannelId(message: Message) {
    const discordId = message.url.split('channels')[1].split('/')[1];
    const chat = client.channels.cache.find(c => c.type == 'GUILD_TEXT' && c.name.toLowerCase() == 'general' && c.guild.id == discordId)
    return chat!.id
}

function getAlmocoVoiceChannelId(message: Message) {
    const discordId = message.url.split('channels')[1].split('/')[1];
    const chat = client.channels.cache.find(c => c.type == 'GUILD_VOICE' && c.name.toLowerCase() == 'almoço' && c.guild.id == discordId)
    return chat!.id
}

function deployNaSextaCommand(message: Message) {
    message.channel.send({content: "Pega a Becks pq sextou com deploy!",  files: ['./img/sextou_com_deploy.jpg'] });
}

function academiaCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} foi pra academia!`);
    message.member?.voice.setChannel(getAfkVoiceChannelId(message));
}

function devoltaCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} está de volta!`);
}

function reuniaoCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} está em reunião!`);
    message.member?.voice.setChannel(getReuniaoVoiceChannelId(message));
}

function rafaCommand(message: Message) {
    message.channel.send({content: "Precisamos de férias!",  files: ['./img/frajuto.png'] });
}

function sextouendCommand(message: Message) {
    message.channel.send({content: "Weekend dev", files: ['./img/sextouend.png'] });
}

function macarraoCommand(message: Message) {
    message.channel.send({content: "Macarroneee ╰(*°▽°*)╯", files: ['./img/boaSorteMacarrao.jpg'] });
}

function rafa2Command(message: Message) {
    message.channel.send({content: "Rafa-Multi-Threads v3.cR0$$!",  files: ['./img/rafa-multi-threads.png'] });
}

function rafa3Command(message: Message) {
    message.channel.send({content: "Botando o bug na rede!",  files: ['./img/saiDaquiBug.gif'] });
}

function rafaDeployCommand(message: Message) {
    message.channel.send({content: "Quando o bruno pede pra fazer deploy na noite!",  files: ['./img/rafaDeployNaSextaANoite.jpeg'] });
}


function rafaQACommand(message: Message) {
    message.channel.send({content: "Aprovado pelo rafa! :rafa_QA:",  files: ['./img/selo_rafa_de_qualidade.png'] });
}

function crossCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} foi crossfitar!`);
    message.member?.voice.setChannel(getAfkVoiceChannelId(message));
}

function vpnCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} está usando a VPN!`);
    message.member?.voice.setChannel(getAfkVoiceChannelId(message));
}

function finalizarCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} está finalizando por hoje, até mais!`);
    message.member?.voice.setChannel(getAfkVoiceChannelId(message));
}

function vitaoCommand(message: Message) {
    message.channel.send({content: "Rafa tá de ferias!?",  files: ['./img/rafa_ta_de_ferias.png'] });
}


function hollywoodCommand(message: Message) {
    message.channel.send({content: "Bora pra hollywood =) ",  files: ['./img/hollywood.jpeg'] });
}

function tipoItemCommand(message: Message) {
    message.channel.send({content: "Everyday I wake up TipoItem",  files: ['./img/everyday_tipo_item.png'] });
}


function baddeployCommand(message: Message) {
    message.channel.send({content: "Quando o deploy da ruim",  files: ['./img/deploy_deu_ruim.png'] });
}

function updatephpCommand(message: Message) {
    message.channel.send({content: "Update sem where de belo monte.", files: ['./img/updatephp.jpg'] });
}


function gooddeployCommand(message: Message) {
    message.channel.send({content: "Quando o deploy da bom",  files: ['./img/deploy_deu_bom.png'] });
}

function sala_do_crisCommand(message: Message) {
    message.channel.send({content: `Olá ψ(._. )>`,  files: ['./img/sala_do_cris.png'] });
}

function phpCommand(message: Message) {
    message.channel.send({content: `PH~~ili~~P~~i~~`,  files: ['./img/php.png'] });
}

function vita1Command(message: Message) {
    message.channel.send({content: "Vita1: futuro arquiteto de software", files: ['./img/vita1.png'] });
}

function cronometroCommand(message: Message) {
    const qtdRounds = Number(message.content.split(" ")[1]);
    if (qtdRounds && Number.isInteger(qtdRounds)) {
        message.channel.send(`Cronometro iniciado! \nRound 1 de ${qtdRounds}! \nTempo: 60s`).then((msgRef) => {
            startCronometro(msgRef, qtdRounds, 1, 60);
        });
    }
}

function startCronometro(msgRef:Message, roundTotal:number, roundAtual:number, tempo:number) {
    if (roundAtual <= roundTotal) {
        cronometrar(msgRef, roundTotal, roundAtual, tempo);
    } else {
        msgRef.edit(`Cronometro finalizado! \nRound ${roundAtual - 1} de ${roundTotal}! \nTempo: Over!`)
    }
}

function cronometrar(msgRef:Message, roundTotal:number, roundAtual:number, tempo:number) {
    if (tempo > 0) {
        msgRef.edit(`Cronometro iniciado! \nRound ${roundAtual} de ${roundTotal}! \nTempo: ${tempo}s`)
        setTimeout(() => {
            cronometrar(msgRef, roundTotal, roundAtual, tempo - 5);
        }, 5000);
    } else {
        startCronometro(msgRef, roundTotal, roundAtual + 1, 60);
    }
}

function almocoCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} foi almoçar!`);
    message.member?.voice.setChannel(getAlmocoVoiceChannelId(message));
}

function cafezinCommand(message: Message) {
    (client.channels.cache.get(getNotificacoesVoiceChannelId(message))as any).send(`${message.member?.displayName} foi tomar um cafezin e ja volta!`);
    message.member?.voice.setChannel(getAfkVoiceChannelId(message));
}

function afkCommand(message: Message) {
    const notificaoId = getNotificacoesVoiceChannelId(message);
    (client.channels.cache.get(notificaoId)as any).send(`${message.member?.displayName} precisou sair e ja volta!`);
    message.member?.voice.setChannel(getAfkVoiceChannelId(message));
}

function sendCommand(message: Message) {
    message.channel.send(message.content.slice(6));
}

function dailyCommand(message: Message) {
    try {

        message.channel.send("@everyone Daily!");
    } catch (e) {
        console.log(e);
    }
}

const helpCommandInfo = {
    help: 'Exibe uma lista dos comandos',
    cronometro: 'Inicia um cronometro de 60s -> !cronometro 5',
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

function helpCommand(message: Message) {
    message.channel.send({
        embeds: [{
            color: 3447003,
            title: "Comandos:",
            fields: [
                {
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
        }]
    });
}