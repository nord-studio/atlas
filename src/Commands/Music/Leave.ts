import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'leave',
    description: 'Command Atlas to destroy the player and leave the voice channel.',
    category: 'Music',
    aliases: ['die', 'destroy'],
    run: async (client, message, args) => {
        const queue = client.player.createQueue(message.guild);

        try {
            queue.destroy(true);
            return message.react('👋');
        } catch (err) {
            ErrorEmbed(message, 'Error destroying the player. Please try again later.');
            return console.log(err);
        }
    }
}