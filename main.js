const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const Clapp = require('clapp');

var app = new Clapp.App({
	name: "DX Bot",
	desc: "Dreaded_X Assistant",
	// prefix: "<@252218386791006209>",
	prefix: "!",
	separator: "",
	version: "1.0",
	onReply: function(message, context) {
		context.message.channel.sendMessage(message);
	}
});

fs.readdirSync('./commands/').forEach(file => {
	app.addCommand(require(`./commands/${file}`));
});

client.on('message', message => {
	if(app.isCliSentence(message.content)) {
		app.parseInput(message.content, {
			message: message
		});
	}
});

client.on('ready', () => {
	console.log("Bot is ready!");
});

client.login('MjUyMjE4Mzg2NzkxMDA2MjA5.Cxu0eQ.euS3A0Gdsk1Q9pVuc7du2_SFVk4');
