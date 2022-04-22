const Discord = require("discord.js")

module.exports = bot => { 
    console.log(`${bot.user.username} Bot is Online`)


    let statuses = [
        "Station Systems",
        "Commands : !help"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status);
    }, 5000)


}
