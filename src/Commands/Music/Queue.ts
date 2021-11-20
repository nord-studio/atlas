import { Command } from "../../Interfaces/Command";
import WarnEmbed from "../../Embeds/WarnEmbed";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'queue',
    description: 'Display the queue.',
    category: 'Music',
    aliases: ['q'],
    run: async function (client, message, args) {
        const queue = client.player.createQueue(message.guild);

        if (!queue.connection) {
            return WarnEmbed(message, 'There is no music playing in this guild.');
        }

        if (!queue.tracks[0] && !queue.current) return message.channel.send('There are no songs in the queue.');
            
        try {
            let index = 1;
            let string = '';

            if (queue.current) string += `**Currently Playing:** \n ${queue.current.title} \n ${queue.createProgressBar()} \n\n`;
            if (queue.tracks.length > 0) string += `**Up Next:** \n ${queue.tracks.slice(0, 9).map((x) => `» ${index++}. ${x.title} (${x.duration})`).join('\n')}`;

            const embed = new MessageEmbed()
                .setColor('#81A1C1')
                .setThumbnail(queue.current.thumbnail)
                .setDescription(string);
            message.channel.send({ embeds: [embed]});
        } catch (err) {
            ErrorEmbed(message, 'Error fetching queue.');
            return console.log(err);
        }
    }
}