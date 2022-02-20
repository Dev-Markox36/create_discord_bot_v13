const glob = require('glob');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

async function registerApi(client) {
    await new REST({ version: '9' }).setToken(process.env.BOT_TOKEN).put(Routes.applicationCommands(client.user.id), { body: client.slashCommands })
      .then(() => client.catchError('success', 'TODOS LOS COMANDOS CARGADOS CORRECTAMENTE.'))
}

async function registerCommands(client) {
        let commands = { all: 0, included: [], excluded: [] };
        const commandsFiles = await glob.sync(`${__dirname}/../commands/messageCommands/**/*.js`);
        commands.all = commandsFiles.length;
        for (const value of commandsFiles) {
            const file = require(value);
            if (!file.name) commands.excluded.push(value.split('/').pop()?.split('.')[0]);
            else {  
                commands.included.push(file.name)
                client.commands.set(file.name, file);
            }
            if (file.aliases && Array.isArray(file.aliases)) file.aliases.forEach(alias => client.aliases.set(alias, file.name));
        }
        client.catchError('success', `Modulo: commands: ${commands.included.length} / ${commands.all}`);
        if (commands.included.length !== commands.all) client.catchError('error', `Error en ${commands.excluded}`);
}

async function registerSlashCommands(client) {
    let commands = { all: 0, included: [], excluded: [] };
    const commandsFiles = await glob.sync(`${__dirname}/../commands/slashCommands/**/*.js`);
    commands.all = commandsFiles.length;
    for (const value of commandsFiles) {
        const file = await require(value);
        if (!file.name) commands.excluded.push(value.split('/').pop()?.split('.')[0]);
        client.slashCommands.set(file.name, file);
        commands.included.push(file.name);
    }
    client.catchError('success', `Modulo: slashCommands: ${commands.included.length} / ${commands.all}`);
    if (commands.included.length !== commands.all) client.catchError('error', `Error en ${commands.excluded}`);
};

async function registerEvents(client) {
    let events = { all: 0, included: [], excluded: [] };
    const eventsFiles = await glob.sync(`${__dirname}/../events/**/*.js`);
    events.all = eventsFiles.length;
    for (const value of eventsFiles) {
        const file = require(value);
        if (!file.name) events.excluded.push(value.split('/').pop()?.split('.')[0]);
        client.events.set(file.name, file);
        client.on(file.name, file.run.bind(null, client));
        events.included.push(file.name);
    }
    client.catchError('success', `Modulo: eventos: ${events.included.length} / ${events.all}`);
    if (events.included.length !== events.all) client.catchError('error', `Error en ${events.excluded}`);
};

module.exports = {
    registerApi,
    registerSlashCommands,
    registerCommands,
    registerEvents
}