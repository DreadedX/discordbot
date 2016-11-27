const Clapp = require('clapp')

module.exports = new Clapp.Command({
	name: "noob",
	desc: "Who is a noob?",
	fn: function(argv, context) {
		return "<@145230828849463296> is a noob!";
	}
});
