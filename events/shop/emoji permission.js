const { client } = require("../..");

module.exports = {
	name: 'EX Emoji',
	description: 'Gibt dir die Permission serverexterne Emojis zu benutzen',
    amount: 200,
	id: 5,
	canOnlyBuyedOnce: true,
	async execute(member, memberdb) {
       member.addRole("734167371241226331")
	},
};