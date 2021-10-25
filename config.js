require('dotenv').config();

module.exports = {
    bot: {
        token: process.env.BOT_TOKEN,
        prefix: "!"
    },
    colors: {
        default: "#fffff1",
    },
    emotes: {
        error: "⚠️",
        success: "✅"
    }
};