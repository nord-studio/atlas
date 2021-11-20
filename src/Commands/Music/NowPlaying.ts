import { Command } from "../../Interfaces/Command";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'nowplaying',
    description: 'Shows the current song that is playing.',
    category: 'Music',
    aliases: ['np', 'currentsong', 'current'],
    run: async function (client, message, args) {
        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');

        const queue = client.player.createQueue(message.guild);

        if (!queue.playing) return ErrorEmbed(message, 'There is no music playing in this guild.');

        try {
            const nowplaying = queue.nowPlaying();
            const bar = queue.createProgressBar();
            const embed = new MessageEmbed()
                .setAuthor('Now Playing')
                .setTitle(`${nowplaying.title}`)
                .setColor('#81A1C1')
                .setThumbnail(nowplaying.thumbnail)
                .setDescription(bar);
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            ErrorEmbed(message, 'Error getting the current song. Please try again later.');
            return console.log(err);
        }
    }
}