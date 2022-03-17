import { Client, Intents } from 'discord.js'; //import discord.js
import { MessageHandler } from './message-handler/message-handler';
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); //create new client
const messageHander = new MessageHandler();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('$')) {
        const returnMessage = await messageHander.handleMessage(message.content);
        const channel = client.channels.cache.get(message.channelId) as any;
        channel.send(returnMessage);
    }
});

const token = fs.readFileSync('/etc/discord-and-dices/discord-bot-key.key', 'utf8')

//make sure this line is the last line
client.login(token.trim()); //login bot using token