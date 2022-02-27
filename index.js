require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const { registerApi, registerCommands, registerSlashCommands, registerEvents } = require('./utils/functions.js');
const Models = require('./database/models.js');

class ExtendedClient extends Client {

  commands = new Collection();
  aliases = new Collection();
  slashCommands = new Collection();
  events = new Collection();
  db = Models;
  config = require('./config.js');
  
  constructor() {
    super({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ]
    });
  } 
  async run() {
    if (!process.env.BOT_TOKEN) return console.log('❌ Token no configurado');
    await this.login(process.env.BOT_TOKEN);
    await registerEvents(this);
    await registerCommands(this);
    await registerSlashCommands(this);
    await registerApi(this);
  }
  catchError(type, error) {
    if (type === 'success') console.log('🟢 [SUCCESS] =>', error);
    if (type === 'warning') console.log('🟠 [WARNING] =>', error);
    if (type === 'error') return console.log('🔴 [ERROR] =>', error);
  }
}
new ExtendedClient().run();