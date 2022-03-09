const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

//Command not in commands file

//Command in commands file
bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

});

bot.on('guildMemberAdd', guildMember => {
    let role = guildMember.guild.roles.cache.find(role => role.id === '922438415281172480');
    guildMember.roles.add(role);
    let wecomeMsgChannel = guildMember.guild.channels.cache.get('949263610901827614')
    const embed = new Discord.MessageEmbed()
        .setColor(botsettings.welcomeMsgColor)
        .setTitle('**[ WELCOME TO KDS ]**')
        .setDescription(`<@${guildMember.user.id}>, Welcome on Board!`)
    wecomeMsgChannel.send(embed);
});

process.on("uncaughtException", function(err) { console.error("uncaughtException (Node is alive)", err); });

bot.login(process.env.TOKEN);
