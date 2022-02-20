const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'Configuration settings',
    options: [
        {
            name: 'tipo',
            type: 3,
            description: 'Emite el evento guildMemberAdd',
            required: true,
            choices: [
                {
                    name: 'join',
                    value: 'join'
                },
                {
                    name: 'leave',
                    value: 'leave'
                },
                {
                    name: 'emotes',
                    value: 'emotes'
                }
            ]
        },
    ],
    run: async (client, int, args) => {

        const { emotes, colors } = client.config;

        if (args[0] === "join") {
            client.emit("guildMemberAdd", int.member)
            const embed = new MessageEmbed()
            .setDescription(emotes.success+'Evento guildMemberAdd emitido.')
            .setColor(colors.main);
            int.reply({ embeds: [embed] });
        }
        
        if (args[0] === "emotes") {
            const embed = {
                title: 'Lista de Emotes',
                description: "success: "+emotes.success+"\n"+"error: "+emotes.error,
                color: "colors.main"
            }
            int.reply({ embeds: [embed]})
        }
    }
}