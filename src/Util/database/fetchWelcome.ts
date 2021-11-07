import { GuildMember } from 'discord.js';
import Client from '../../Client/index';
import { connect, disconnect } from 'mongoose';
import welcomeSchema from '../../schemas/welcomeSchema';

export async function fetchWelcome(client: Client, member: GuildMember) {
    let cache = client.welcomes;
    let data = cache[member.guild.id];

    if (!data) {
        await connect(client.config.mongoURI).then(async () => {
            try {
                const welcome = await welcomeSchema.findOne({
                    _id: member.guild.id,
                });

                cache[member.guild.id] = data = [welcome.channelID, welcome.message];
            } finally {
                disconnect();
            }
        }, (err) => {
            console.log(err);
        });
    }

    const channelID = await data[0];
    const rawText = await data[1];
    const messageText = rawText.replace(/{user}/g, `<@${member.id}>`)

    const object = { channelID, messageText };
    return object;
}