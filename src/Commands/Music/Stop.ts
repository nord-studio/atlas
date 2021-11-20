import ErrorEmbed from "../../Embeds/ErrorEmbed";
import WarnEmbed from "../../Embeds/WarnEmbed";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'stop',
    description: 'Stops the music',
    category: 'Music',
    aliases: ['st'],
    run: async (client, message, args) => {
        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');

        const queue = client.player.createQueue(message.guild);

        if (!queue.connection) {
            return WarnEmbed(message, 'There is no music playing in this guild.');
        }

        try {
            queue.clear();
            queue.stop();
        } catch (error) {
            ErrorEmbed(message, 'An error occured while trying to stop the music. Destroying the player...');
            queue.destroy();
            return console.log(error);
        }
    }
}