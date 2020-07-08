module.exports = {
	name: 'Private Nachicht vom Bot',
	description: 'Der Bot schreibt dir eine Exklusive Nachicht nur für dich im Privat Chat ',
    amount: 1,
	id: 1,
	canOnlyBuyedOnce: true,
	async execute(member, memberdb) {
       member.user.send("Krass")
	},
};