const Clapp = require('clapp')

module.exports = new Clapp.Command({
	name: "ping",
	desc: "Pong!",
	fn: function(argv, context) {
		return "Pong!"
	}
});
