import { Event } from "../Interfaces/Event";
import { TextChannel } from "discord.js";
import { fetchWelcome } from "../Util/database/fetchWelcome";

export const event: Event = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        const welcome = await fetchWelcome(client, member);

        const channel = member.guild.channels.cache.get(welcome.channelID) as TextChannel;

        if (channel.type !== 'GUILD_TEXT') return;
        channel.send(welcome.messageText);
    }
}