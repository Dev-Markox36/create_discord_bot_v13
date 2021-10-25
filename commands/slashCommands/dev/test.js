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
    run: async (client, int, args, serverModel) => {

        const { COLORS, EMOTES } = client.config.BOT;

        if (args[0] === "join") {
            client.emit("guildMemberAdd", int.member)
            const embed = new MessageEmbed()
            .setDescription(EMOTES.success+'Evento guildMemberAdd emitido.')
            .setColor(COLORS.main);
            int.reply({ embeds: [embed] });
        }
        
        if (args[0] === "emotes") {
            const embed = new MessageEmbed()
            .setTitle('Lista de Emotes')
            .setDescription("success: "+EMOTES.success+"\n"+"error: "+EMOTES.error)
            .setColor(COLORS.main);
            int.reply({ embeds: [embed]})
        }
    }
}