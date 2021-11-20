import { GuildMember } from "discord.js";
import Client from "../../Client/index";
import { connect, disconnect } from "mongoose";
import volumeSchema from "../../schemas/volumeSchema";

export async function fetchVolume(client: Client, member: GuildMember) {
    let cache = client.volumes;
    let data = cache[member.guild.id];

    if (!data) {
        await connect(client.config.mongoURI).then(async () => {
            try {
                const real = await volumeSchema.exists({
                    _id: member.guild.id,
                });
                
                if (real === false) {
                    const doc = new volumeSchema({
                        _id: member.guild.id,
                        volume: 25,
                    });

                    await doc.save();

                    cache[member.guild.id] = data = [25];
                } else {
                    const volume = await volumeSchema.findOne({
                        _id: member.guild.id,
                    });

                    cache[member.guild.id] = data = [volume.volume];
                }
            } catch (err) {
                console.log(err);
            } finally {
                disconnect();
            }
        });

    }

    const num = parseInt(data);
    return num;
}