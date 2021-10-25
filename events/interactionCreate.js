module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
		const { COLORS, EMOTES } = client.config.BOT;
		if (interaction.isCommand()) {
		const command = client.slashCommands.get(interaction.commandName);
		const args = [];
        if (!command) return;
        for (const option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        command.run(client, interaction, args);
		}
	}
};