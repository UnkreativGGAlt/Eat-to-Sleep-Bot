const { client } = require("../..");

module.exports = {
	name: 'Farbe - Grün',
	description: 'Grüne Farbe für Discord',
    amount: 650,
	id: 2,
	canOnlyBuyedOnce: true,
	async execute(member, memberdb) {
       member.addRole("733656832991821854")
	},
};