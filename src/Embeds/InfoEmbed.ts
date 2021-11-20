import { Message, MessageEmbed } from "discord.js";

function InfoEmbed(message: Message, title: string, value: string) {
    const embed = new MessageEmbed()
        .setColor("#81A1C1")
        .setTitle(`ℹ️ ${title}`)
        .setDescription(value)

    message.channel.send({ embeds: [embed]});
}

export default InfoEmbed;