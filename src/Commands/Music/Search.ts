import { Command } from "../../Interfaces/Command";
import ErrorEmbed from "../../Embeds/ErrorEmbed";
import { Message, MessageEmbed } from "discord.js";
import { fetchVolume } from "../../Util/Database/fetchVolume";
import InfoEmbed from "../../Embeds/InfoEmbed";

export const command: Command = {
    name: 'search',
    description: 'Search for a song.',
    category: 'Music',
    aliases: ['src', 'srch'],
    run: async function (client, message, args) {
        const queue = client.player.createQueue(message.guild);

        if (!args.length) return ErrorEmbed(message, 'You must provide a search term.');

        const search = args.join(' ');

        try {
            const results = await client.player.search(search, {
                requestedBy: message.author,
            });

            let index = 1;

            const embed = new MessageEmbed()
                .setAuthor('Search Results')
                .setColor('#81A1C1')
                .setDescription(results.tracks.map(track => `» ${index++} **${track.title}**`).join('\n'))
                .setFooter(`Please send a message with the track number you want to queue.`);
            let resultsMessages = await message.channel.send({ embeds: [embed] });

            const filter = (m: Message) => message.author.id === m.author.id;
            message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                .then(async messages => {
                    // Check if the user prompted to cancel the search.
                    if (messages.first().content === 'cancel') {
                        resultsMessages.delete();
                        messages.first().delete();
                        return InfoEmbed(message, 'Information', 'Search cancelled.');
                    }
                    // Check if the message is a number
                    if (isNaN(parseInt(messages.first().content))) return ErrorEmbed(message, 'You must provide a valid number.');
                    const selection = parseInt(messages.first().content) - 1;
                    if (selection < 0 || selection > results.tracks.length - 1) return ErrorEmbed(message, 'You must provide a valid number.');

                    // Display the track info
                    const embed = new MessageEmbed()
                        .setDescription(`Added **${results.tracks[selection].title}** to the queue.`)
                        .setColor('#81A1C1');
                    resultsMessages.edit({ embeds: [embed] });

                    // Add the track to the queue
                    if (queue.playing) {
                        return queue.addTrack(results.tracks[selection]);
                    } else {
                        // Create a connection
                        try {
                            if (!queue.connection) await queue.connect(message.member.voice.channel);
                        } catch (err) {
                            queue.destroy();
                            return ErrorEmbed(message, 'Could not connect to the voice channel.');
                        }

                        // Fetch the volume and play the track
                        const volume = await fetchVolume(client, message.member);
                        queue.play(results.tracks[selection]);
                        queue.setVolume(volume);
                    }
                });
        } catch (err) {
            ErrorEmbed(message, 'Error searching for a song. Please try again later.');
            return console.log(err);
        }
    }
}