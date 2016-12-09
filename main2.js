const discord = require('discord.js');
const client = new discord.Client();
const apiai = require('apiai');
const app = apiai('5ef7c29a082241e7ad14145c807285a0');
const wolfram = require('wolfram-alpha').createClient('EP4V2T-WRU897HUXG');

var name = '';

client.on('message', message => {
	if (message.content.startsWith(name) && message.content.replace(name, '') != '') {
		message.channel.startTyping();
		var request = app.textRequest(message.content.replace(name, ''), {
			sessionId: '1234567890'
		});
		request.on('response', function(response) {
			if (typeof response.result.fulfillment.messages != 'undefined') {
				processResponse(response.result, message)
					for(var i = 0; i < response.result.fulfillment.messages.length; i++) {
						message.reply(response.result.fulfillment.messages[i].speech);
					}
			} else if (typeof response.result.fulfillment.speech != 'undefined') {
				message.reply(response.result.fulfillment.speech);
				processResponse(response.result, message);
			} else {
				console.log("SOMETHING WENT WRONG");
				message.reply("SOMETHING WENT WRONG");
				message.channel.stopTyping(true);
			}
		});
		request.on('error', function(error) {
			console.log(error);
			message.channel.stopTyping(true);
		});
		request.end();
	}
});

function processResponse(result, message) {
	if (result.action == 'query.wolfram') {
		queryWolfram(result.parameters.question, message);
	} else {
		message.channel.stopTyping(true);
	}
}

function queryWolfram(question, message) {
	message.channel.startTyping();
	wolfram.query(message.content.replace(name, ''), function (err, result) {
		if (err) {
			throw err;
			message.channel.stopTyping();
		} 
		var answered = false;
		for (var i = 0; i < result.length; i++) {
			if (result[i].primary) {
				message.channel.startTyping();
				message.reply(result[i].subpods[0].text);
				answered  = true;
			}
			// console.log(result[i].subpods);
		}
		if (!answered && result.length > 2) {
			message.channel.sendMessage(result[0].subpods[0].text + "\n" + result[1].subpods[0].text);
		} else if (!answered) {
			message.channel.sendMessage("Failed to answer");
		}
		message.channel.stopTyping(true);
	});
}

client.on('ready', () => {
	console.log("Bot is ready!");

	name = '<@' + client.user.id + '>';

	client.user.setStatus('online');
	
	// Say hello in all channels, terrible idea...
	if (false) {
		var welcome = app.eventRequest({name: 'WELCOME'}, {
			sessionId: '1234567890'
		});
		welcome.on('response', function(response) {
			var channels = client.channels.array();
			for (var i = 0; i < channels.length; i++) {
				if(channels[i].type == 'text') {
					console.log(channels[i].name);
					channels[i].sendMessage(response.result.fulfillment.speech).catch(function(error) {
						// console.log(error);
					});
				}
			}
		});
		welcome.on('error', function(error) {
			console.log(error);
		});
		welcome.end();
	}
});

process.on('SIGINT', function () {
	client.user.setStatus('invisible').then(process.exit(0));
});

client.login('MjUyMjE4Mzg2NzkxMDA2MjA5.Cxu0eQ.euS3A0Gdsk1Q9pVuc7du2_SFVk4');
