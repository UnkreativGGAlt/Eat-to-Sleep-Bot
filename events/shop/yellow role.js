const { client } = require("../..");

module.exports = {
	name: 'Farbe - Gelb',
	description: 'Gelbe Farbe für Discord',
    amount: 650,
	id: 1,
	canOnlyBuyedOnce: true,
	async execute(member, memberdb) {
       member.addRole("733656380749119538")
	},
};