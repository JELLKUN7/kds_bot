const Discord = require("discord.js")

module.exports = bot => { 
    console.log(`${bot.user.username} Bot is Online`)


    let statuses = [
        "Welcome to KDS",
        "Korea Design Simulations"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status);
    }, 5000)


}
