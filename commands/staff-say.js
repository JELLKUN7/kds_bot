const Discord = require('discord.js');
const botsettings = require('../botsettings.json');

module.exports.run = async (bot, message, args) => {
    var text = message.content.split(' ').slice(1).join(' ')
    if(!message.member.roles.cache.some(r=>["Admin Team","Development Team","Moderation Team","CEO","Assistant CEO","Flight Director","Capital Flight Director","Jeju Flight Director","Japan Flight Director"].includes(r.name)) && message.author.id !== '251707192313511947'){
        const ErrorEmbed = new Discord.MessageEmbed()
			.setColor(botsettings.errorColor)
			.setTitle('**[ ❌ Command Error Guidance ]**')
			.setDescription(`${message.member.user}, The command you used is a command that can only be used by the Discord administrator, so please contact the administrator for details.`)
			.setFooter(`${message.author.username}#${message.author.discriminator}`)
            .setTimestamp()
            message.author.send(ErrorEmbed);
			message.delete();
	    return;
	}
    if (!text) {
        const errorEmbed = new Discord.MessageEmbed()
			.setColor(botsettings.errorColor)
			.setTitle('**[ ❌ Command Error Guidance ]**')
            .setDescription(`${message.member.user}, The command is incorrect. Please write the message you want to write with PREFIX.\n`+'``ex) !!say Hello``')
            .setFooter(`${message.author.username}#${message.author.discriminator}`)
            .setTimestamp()
			message.author.send(errorEmbed);
            message.delete();
        return;
    }

    else{
        const embed = new Discord.MessageEmbed()
            .setColor(botsettings.color)
            .setDescription(text);
        message.channel.send({embed});
        message.delete();
    }
}

module.exports.config = {
    name: "say",
    description: "This is a say command!",
    usage: "!!say",
    accessableby: "",
    aliases: ["SAY"]
}
