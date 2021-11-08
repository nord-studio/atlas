import { MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces/Command";

export const command: Command = {
    name: "commands",
    description: "Lists all commands",
    category: "Core",
    aliases: ["cmds"],
    run: async (client, message, args) => {
        if (!args[0]) {
            const core = client.commands.filter(x => x.category === "Core").map((x) => '`' + x.name + '`').join(', ');
            const guild = client.commands.filter(x => x.category === "Guild").map((x) => '`' + x.name + '`').join(', ');

            const embed = new MessageEmbed()
                .setColor('#81A1C1')
                .setAuthor('Commands')
                .addField("Core", core, false)
                .addField("Guild", guild, false)
                .setFooter(`To find more info on a specific command, use ${client.config.prefix}commands [command]`)
            
            message.channel.send({ embeds: [embed] }, );
        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(x => x.aliases && x.aliases.includes(args[0].toLowerCase()));
            if (!command) return message.channel.send('That command does not exist!');

            const embed = new MessageEmbed()
                .setColor('#81A1C1')
                .setAuthor(`Command: ${command.name}`)
                .addField("Description", command.description, false)
                .addField("Category", command.category, false)
                .addField("Aliases", command.aliases ? command.aliases.join(', ') : 'None', false)
                .setFooter(client.config.embedFooter);
            
            message.channel.send({ embeds: [embed] });
        }
    }
}