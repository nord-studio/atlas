import { Command } from '../../Interfaces/Command';
import { connect, disconnect } from 'mongoose';
import welcomeSchema from '../../schemas/welcomeSchema';

export const command: Command = {
    name: 'setwelcome',
    description: 'Set the welcome message for the server',
    category: 'Guild',
    aliases: [],
    run: async (client, message, args) => {

        const cache = client.welcomes;
        const { guild, member, channel } = message;

        if (!member.permissions.has('ADMINISTRATOR')) {
            channel.send('You do not have access to this command.');
            return;
        }

        if (!args) {
            channel.send('Please provide a welcome message.');
            return;
        }

        await connect(client.config.mongoURI).then(async () => {
            try {
                let text = message.content;
                const split = text.split(' ');

                split.shift();
                text = split.join(' ');

                cache[guild.id] = [channel.id, text];
                
                await welcomeSchema.findOneAndUpdate({
                    _id: guild.id,
                }, {
                    _id: guild.id,
                    channelID: channel.id,
                    message: text,
                }, {
                    upsert: true,
                });

                channel.send(`Successfully set the server welcome message to **${text}**!`);
            } finally {
                disconnect();
            }
        }, (err) => {
            console.log(err);
        });
    }
}