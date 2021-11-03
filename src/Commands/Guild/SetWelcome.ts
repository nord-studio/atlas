import { Command } from '../../Interfaces/Command';
import { connect, disconnect } from 'mongoose';
import welcomeSchema from '../../schemas/welcomeSchema';

export const command: Command = {
    name: 'setwelcome',
    description: 'Set the welcome message for the server',
    aliases: [],
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            message.channel.send('You do not have access to this command.');
            return;
        }

        if (message.content.length < 2) {
            message.channel.send('Please provide a welcome message.');
            return;
        }

        await connect(client.config.mongoURI).then(async () => {
            try {
                let text = message.content;
                const split = text.split(' ');

                split.shift();
                text = split.join(' ');
                
                await welcomeSchema.findOneAndUpdate({
                    _id: message.guild.id,
                }, {
                    _id: message.guild.id,
                    channelID: message.channel.id,
                    message: text,
                }, {
                    upsert: true,
                });

                message.channel.send(`Successfully set the server welcome message to **${text}**!`);
            } finally {
                disconnect();
            }
        }, (err) => {
            console.log(err);
        });
    }
}