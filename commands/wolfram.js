const Clapp = require('clapp')
const wolfram = require('wolfram-alpha').createClient('EP4V2T-WRU897HUXG');

module.exports = new Clapp.Command({
	name: "wolfram",
	desc: "Searches WolframAlpha",
	fn: function(argv, context) {
		wolfram.query(argv.args.search, function (err, result) {
			if (err) throw err;
			for (var i = 0; i < result.length; i++) {
				if (result[i].primary) {
					context.message.channel.sendMessage(`${argv.args.search}\n${result[i].subpods[0].text}`);
				}
			}
		})
		return `Searching Wolfram|Alpha for: ${argv.args.search}`;
	},
	args: [
		{
			name: "search",
			desc: "What to look for.",
			type: "string",
			required: true
		}
	]
});
