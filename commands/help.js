module.exports = {
	name: 'help',
	description: 'Zeigt alle normalen Commands an',
    usage: `help [command]` ,
	execute (message, args) {

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")

        if (!args[0]){
            message.channel.send(new RichEmbed().setTitle(client.user.username + " Command List").setDescription(client.commands.map(cmd => cmd.name).join(", ")).setFooter(`Du willst mehr Info? ${config.prefix}help [command]`).setColor("#39FF14"))
        }
        else {
           if(client.commands.has(args[0].toLowerCase())){
            cmd = client.commands.get(args[0])
            

            message.channel.send(
                new RichEmbed()
                .setTitle("Command Beschreibung für \"" + config.prefix + cmd.name + "\"")
                .setDescription("Beschreibung: " + cmd.description +
                "\nUsage: " + config.prefix + cmd.usage)
                .setColor("RANDOM"))

           }
        }

        
    
			
	},
};