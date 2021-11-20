import SuccessEmbed from "../../Embeds/SuccessEmbed";
import WarnEmbed from "../../Embeds/WarnEmbed";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: 'join',
    description: 'Call the bot into the current voice call.',
    category: 'Music',
    aliases: ['summon'],
    run: async (client, message, args) => {
        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');
        
        const queue = client.player.createQueue(message.guild);

        if (message.guild.me.voice.channel) {
            return WarnEmbed(message, 'I am already in a voice channel.');
        }

        queue.connect(message.member.voice.channel);
        return SuccessEmbed(message, 'Success', 'I have joined the voice channel.');
    }
}