module.exports = {
    name: "ping",
    category: "dev",
    aliases: ["test"],
    usage: "c",
    description: "asfg",
    run: async (client, msg, args) => {
        return msg.reply("Pong!" + "\n" + `${client.ws.ping}ms`);
    }
}