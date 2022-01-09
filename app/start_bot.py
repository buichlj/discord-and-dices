import asyncio
import discord
from message_handler import MessageHandler

client = discord.Client()


@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))


@client.event
async def on_message(message):
    message_handler = MessageHandler()
    if message.author == client.user:
        return
    else:
        return_message = message_handler.handle_message(message)
        if return_message != '':
            await message.channel.send(return_message)
        return

try:
    file = open('/etc/discord-and-dices/discord-bot-key.key', 'r')
    client.run(file.read())
finally:
    asyncio.run(client.close())
