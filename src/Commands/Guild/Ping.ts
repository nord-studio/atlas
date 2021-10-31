import { Command } from '../../Interfaces/Command';

export const command: Command = {
    name: 'ping',
    description: 'Check if the bot is alive.',
    aliases: ['p'],
    run: async (client, message, args) => {
        message.channel.send(`\`${client.ws.ping}\`ms ping!`);
    }
}