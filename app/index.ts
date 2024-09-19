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

var token;
if (fs.existsSync('/etc/discord-and-dices/discord-bot-key.key')) {
    token = fs.readFileSync('/etc/discord-and-dices/discord-bot-key.key', 'utf8');
} else if (fs.existsSync('./token.key')) {
    token = fs.readFileSync('./token.key', 'utf8');
}

// Make sure this line is the last line.
// Login bot using token.
if (token) {
    client.login(token.trim());
} else {
    console.log('ERROR: No token.')
}