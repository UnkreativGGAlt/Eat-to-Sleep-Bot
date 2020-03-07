module.exports = {
	name: 'rntalk',
	description: 'Gibt dem aktuellen Voice Channel einen temporären Namen',
    usage: `rntalk (name)` ,
	execute(message, args) {

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")
        const MEMBER = require("../models/MEMBER")
       
       
        async function a() {
            var memberfromdb = await MEMBER.findOne({"info.id": message.member.id})
            if (memberfromdb.ranks.rank < 10){return message.channel.send(new RichEmbed().setColor(colour.rot)
                .setTitle("Halte ein neuling!")
                .setDescription(`Dein aktuelles Level (${memberfromdb.ranks.rank}) ist leider kleiner als 10. Du musst noch ${10 - parseInt(memberfromdb.ranks.rank)} Stunden in einem Voice Channel verbringen um diese Funktion benutzen zu können`))}
        
                

        }
        a()

       


	},
};