import { Message } from "discord.js";

export async function queueOptions(message: Message) {
    const queueOptions = {
        metadata: {
            channel: message.channel
        },

        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 >> 25,
        },

        leaveOnStop: false,
        leaveOnEnd: false,
        initialVolume: 25,
    }

    return queueOptions;
}