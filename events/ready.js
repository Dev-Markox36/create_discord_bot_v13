module.exports = {  
    name: 'ready',
    run: async (client) => {
        const rootdb = require("../database/mongodb.js");
        rootdb.then(() => client.catchError('success', `✔ MongoDB Conectado\n-----------------------------------------`))
        client.catchError('success', `✔ Logeado como: ${client.user.username}`)
        client.user.setActivity(`!help | ${client.user.username}`, {
            type: 'WATCHING'
        });
    }
}