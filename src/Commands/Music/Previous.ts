import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'previous',
    description: 'Go back to the previous song.',
    category: 'Music',
    aliases: ['prev'],
    run: async function (client, message, args) {
        const queue = client.player.createQueue(message.guild);

        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');

        if (queue.previousTracks.length === 0) return ErrorEmbed(message, 'There are no previous tracks.');

        try {
            queue.back();
        } catch (error) {
            ErrorEmbed(message, 'Error fetching the previous song.');
            return console.error(error);
        }
    }
}