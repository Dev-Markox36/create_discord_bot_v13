const glob = require('glob');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

async function registerApi(client) {
    await new REST({ version: '9' }).setToken(process.env.BOT_TOKEN).put(Routes.applicationCommands(client.user.id), { body: client.slashCommands })
      .then(() => client.catchError('success', 'TODOS LOS COMANDOS CARGADOS CORRECTAMENTE.'))
      .catch(err => client.catchError('error', err));
    client.slashCommands.forEach(async (value) => {
        await client.guilds.cache.get('776416877765197834')?.commands.create(value);
    })
}

async function registerCommands(client) {
        let commands = { all: 0, include: [], exclude: [] };
        const commandsFiles = await glob.sync(`${__dirname}/../commands/messageCommands/**/*.js`);
        commands.all = commandsFiles.length;
        for (const value of commandsFiles) {
            const file = require(value);
            if (!file.name) commands.excludes.push(value.split('/').pop()?.split('.')[0]);
            else {  
                commands.include.push(file.name)
                client.commands.set(file.name, file);
            }
            if (file.aliases && Array.isArray(file.aliases)) file.aliases.forEach(alias => client.aliases.set(alias, file.name));
        }
        client.catchError('success', `Modulo: commands: ${commands.include.length} / ${commands.all}`);
        if (commands.include.length !== commands.all) client.catchError('error', `Error en ${commands.exclude}`);
}

async function registerSlashCommands(client) {
    let commands = { all: 0, include: [], exclude: [] };
    const commandsFiles = await glob.sync(`${__dirname}/../commands/slashCommands/**/*.js`);
    commands.all = commandsFiles.length;
    for (const value of commandsFiles) {
        const file = await require(value);
        if (!file.name) commands.excludes.push(value.split('/').pop()?.split('.')[0]);
        client.slashCommands.set(file.name, file);
        commands.include.push(file.name);
    }
    client.catchError('success', `Modulo: slashCommands: ${commands.include.length} / ${commands.all}`);
    if (commands.include.length !== commands.all) client.catchError('error', `Error en ${commands.exclude}`);
};

async function registerEvents(client) {
    let events = { all: 0, includes: [], excludes: [] };
    const eventsFiles = await glob.sync(`${__dirname}/../events/**/*.js`);
    events.all = eventsFiles.length;
    for (const value of eventsFiles) {
        const file = require(value);
        if (!file.name) events.excludes.push(value.split('/').pop()?.split('.')[0]);
        client.events.set(file.name, file);
        client.on(file.name, file.run.bind(null, client));
        events.includes.push(file.name);
    }
    client.catchError('success', `Modulo: eventos: ${events.includes.length} / ${events.all}`);
    if (events.includes.length !== events.all) client.catchError('error', `Error en ${events.excludes}`);
};

module.exports = {
    registerApi,
    registerSlashCommands,
    registerCommands,
    registerEvents
}