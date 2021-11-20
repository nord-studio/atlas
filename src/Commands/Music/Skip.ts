import { Command } from "../../Interfaces/Command";
import WarnEmbed from "../../Embeds/WarnEmbed";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import SuccessEmbed from "../../Embeds/SuccessEmbed";

export const command: Command = {
    name: 'skip',
    description: 'Skip the current song.',
    category: 'Music',
    aliases: ['next'],
    run: async function (client, message, args) {
        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');

        const queue = client.player.createQueue(message.guild);

        if (!queue.connection) {
            return WarnEmbed(message, 'There is no music playing in this guild.');
        }

        try {
            queue.skip();
            return SuccessEmbed(message, `Skipped!`, `Skipped the current song.`);
        } catch (error) {
            ErrorEmbed(message, 'Failed to skip the current song.');
            return console.log(error);
        }
    }
}