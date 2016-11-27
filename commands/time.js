const Clapp = require('clapp')

module.exports = new Clapp.Command({
	name: "time",
	desc: "Get the current time.",
	fn: function(argv, context) {
		var d = new Date();
		return `The current time is ${d.getHours()}:${d.getMinutes()}`;
	}
});
