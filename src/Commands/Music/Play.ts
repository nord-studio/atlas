import ErrorEmbed from "../../Embeds/ErrorEmbed";
import SuccessEmbed from "../../Embeds/SuccessEmbed";
import { Command } from "../../Interfaces/Command";
import { fetchVolume } from "../../Util/Database/fetchVolume";

export const command: Command = {
    name: 'play',
    description: 'Adds the first result to the queue. Supports YouTube, Spotify, SoundCloud, BandCamp, MP4 and more!',
    category: 'Music',
    aliases: ['p'],
    run: async function (client, message, args) {
        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');

        const query = args.join(' ');
        const queue = client.player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            },

            ytdlOptions: {
                quality: 'highestaudio',
                filter: 'audioonly',
                highWaterMark: 1 >> 25,
            },

            leaveOnStop: false,
            initialVolume: 25,
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch (err) {
            queue.destroy();
            return ErrorEmbed(message, 'Could not connect to the voice channel.');
        }

        const track = await client.player.search(query, {
            requestedBy: message.author
        }).then(x => x.tracks[0]);

        if (!track) return ErrorEmbed(message, 'Could not find any tracks.');

        const volume = await fetchVolume(client, message.member);

        queue.play(track);
        queue.setVolume(volume);

        return SuccessEmbed(message, `Success!`, `Added **${track.title}** to the queue.`);
    }
}