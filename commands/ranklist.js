module.exports = {
	name: 'ranklist',
        description: 'Schickt dir einen Link zum ansehen der Ranking List',
        usage: `ranklist`,
	execute(message, args) {

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")

        

        message.channel.send("http://server.dustin-dm.de:6677/rankinglist")

	},
};