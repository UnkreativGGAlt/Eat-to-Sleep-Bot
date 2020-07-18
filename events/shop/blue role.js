const { client } = require("../..");

module.exports = {
	name: 'Farbe - Blau',
	description: 'Blau Farbe für Discord',
    amount: 650,
	id: 4,
	canOnlyBuyedOnce: true,
	async execute(member, memberdb) {
       member.addRole("733656948016283648")
	},
};