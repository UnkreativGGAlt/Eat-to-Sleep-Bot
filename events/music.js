const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");

prefix = config.prefix


client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
	let args = messageArray.slice(1);
	
	if (alias == "play"){
		
	}
	
})


