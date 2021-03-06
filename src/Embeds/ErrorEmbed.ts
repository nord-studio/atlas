import { Message, MessageEmbed } from "discord.js";

function ErrorEmbed(message: Message, value: string) {
    const embed = new MessageEmbed()
        .setColor("#BF616A")
        .setTitle("❌ Something went wrong!")
        .setDescription(value)

    message.channel.send({ embeds: [embed]});
}

export default ErrorEmbed;