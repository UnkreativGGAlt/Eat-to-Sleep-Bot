const { client } = require("../..");

module.exports = {
	name: 'Farbe - Rot',
	description: 'Rote Farbe für Discord',
    amount: 650,
	id: 3,
	canOnlyBuyedOnce: true,
	async execute(member, memberdb) {
       member.addRole("733657018824523796")
	},
};