import { Command } from "../../Interfaces/Command";
import WarnEmbed from "../../Embeds/WarnEmbed";
import { connect } from "mongoose";
import volumeSchema from "../../schemas/volumeSchema";
import { MessageEmbed } from "discord.js";
import { fetchVolume } from "../../Util/Database/fetchVolume";

export const command: Command = {
    name: 'volume',
    description: 'Change the volume of the music player.',
    category: 'Music',
    aliases: ['vol'],
    run: async (client, message, args) => {
        const { guild, member, channel } = message;

        if (!member.voice.channelId) return channel.send('You must be in a voice channel to use this command.');
        if (guild.me.voice.channelId && member.voice.channelId !== guild.me.voice.channelId) return channel.send('You must be in the same voice channel as me to use this command.');

        if (!args.join(' ')) {
            const volume = await fetchVolume(client, member);
            return channel.send(`Volume: \`${volume}\``);
        }

        const queue = client.player.createQueue(guild);
        const cache = client.volumes;

        if (parseInt(args.join(' ')) > 100) return WarnEmbed(message, 'The volume level must be between 0 and 100.');
        if (parseInt(args.join(' ')) < 0) return WarnEmbed(message, 'The volume level must be between 0 and 100.');

        const newVol = parseInt(args.join(' '));

        const messageToMember = await channel.send('Attempting to send request to AtlasDB...');

        await connect(client.config.mongoURI).then(async () => {
            try {
                cache[guild.id] = newVol;

                await volumeSchema.findOneAndUpdate({
                    _id: guild.id,
                }, {
                    id: guild.id,
                    volume: newVol,
                }, {
                    upsert: true,
                });
            } catch (err) {
                console.log(err);
                return messageToMember.edit('An error occured while attempting to update the volume level. Changing the client volume.');
            }
        });

        queue.setVolume(newVol);
        messageToMember.edit(`Volume set to \`${ newVol }\``);
    }
}