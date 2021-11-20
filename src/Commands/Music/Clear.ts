import ErrorEmbed from "../../Embeds/ErrorEmbed";
import SuccessEmbed from "../../Embeds/SuccessEmbed";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: "clear",
    description: "Clears the queue.",
    category: "Music",
    aliases: ["clr"],
    run: async (client, message, args) => {
        if (!message.member.voice.channelId) return message.channel.send('You must be in a voice channel to use this command.');
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) return message.channel.send('You must be in the same voice channel as me to use this command.');

        const queue = client.player.createQueue(message.guild);

        try {
            queue.clear();
            return SuccessEmbed(message, 'Success!', 'Cleared the queue!');
        } catch (error) {
            ErrorEmbed(message, 'Error clearing the queue, please try again later.');
            return console.log(error);
        }
    }
}