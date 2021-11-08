import { Event } from '../Interfaces/Event';
import mongoose from 'mongoose';

export const event: Event = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.tag} is online!`);
        client.user.setActivity(`${client.config.prefix}help | ${client.guilds.cache.size} servers`, { type: 'WATCHING' });

        // Connect to AtlasDB
        await mongoose.connect(client.config.mongoURI).then(() => {
            console.log('Connected to AtlasDB Successfully!');
        }).catch((err) => {
            console.log('Failed to connect to AtlasDB! ' + err);
        });
    }
}