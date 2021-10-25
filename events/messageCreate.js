const { MessageEmbed } = require("discord.js");

module.exports = {  
    name: 'messageCreate',
    run: async (client, msg) => {
  
        const prefix = client.config.bot.prefix;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        let command = client.commands.get(cmd);

        /* ---------------------------- MENTION REGEXP ----------------------------*/ 
        if (msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            const embed = new MessageEmbed()
            .setDescription(`Bienvenido <@!${msg.author.id}>, veo que no sabes como ejecutar mis comandos.\nPor aquí te dejo la respuesta.`)
            .addField(`** **`, `Mi prefijo es:  \`${prefix}\``)
            .setColor(client.config.colors.mention);
            return msg.reply({
            embeds: [embed],
            });
        }
        /* ---------------------------- CONDITIONS ----------------------------*/ 
        if (msg.author.bot) return;
        if (!msg.content.startsWith(prefix)) return;
        if (cmd.length === 0) return;

        if (command) {
            try {
                command.run(client, msg, args, prefix);
            } catch (error) {
                console.log(error);
                return msg.reply(`Algo salió mal mientras se ejecutaba: \`${command.name}\` comando.`); 
            }
        }
    }
};