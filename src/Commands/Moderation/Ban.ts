import { Command } from "../../Interfaces/Command";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import WarnEmbed from "../../Embeds/WarnEmbed";
import SuccessEmbed from "../../Embeds/SuccessEmbed";

export const command: Command = {
    name: 'ban',
    description: 'Bans a user from the server.',
    category: 'Moderation',
    aliases: ['banish'],
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if (!message.member.permissions.has('BAN_MEMBERS')) return ErrorEmbed(message, 'You do not have permission to ban members.');
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) return ErrorEmbed(message, 'I am missing permissions!');
        if (!args[0]) return ErrorEmbed(message, 'Please provide a user to ban.');
        if (!member) return WarnEmbed(message, 'Could not find that member.');
        if (member.id === client.user.id) return message.channel.send('https://i.imgur.com/jDN9AZp.png') && message.guild.leave();
        
        if (!reason) {
            return WarnEmbed(message, 'Please provide a reason for the ban.');
        }

        member.ban({ reason: reason });
        return SuccessEmbed(message, `${member.user.tag} was banned.`, `Reason: \`${reason}\``);
    }
}