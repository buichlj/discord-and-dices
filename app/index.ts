import { Client, GatewayIntentBits, Guild } from 'discord.js';
import { MessageHandler } from './message-handler/message-handler';
import { EventHandler } from './event-handler/event-handler';
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildScheduledEvents] });
const messageHander = new MessageHandler();
let guilds: Guild[];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // guilds = (await client.guilds.fetch()).map(x => client.guilds.resolve(x.id));
    // new EventHandler().handleEvents(guilds);
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
//login bot using token
client.login(token.trim());