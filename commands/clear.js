const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")


client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

if (message.content.startsWith(prefix)){
        
    
    if (alias == "clear"){
        if (client.guilds.get(message.guild.id).members.get(message.author.id).hasPermission("MANAGE_MESSAGES")){
            if (args[0] < 101){
                if (message.deletable){message.delete()}
            message.channel.fetchMessages({ limit: args[0] }).then(messages => {


                message.channel.bulkDelete(messages).then( () => { 
                    message.channel.send(
                        new RichEmbed().setTitle("Erledigt").setDescription(`Ich habe **${messages.array().length}** Nachichten gelöscht`).setColor(colour.blau)
                    ).then(sendetmessage => {
                        setTimeout(() => {sendetmessage.delete()
                        }, 15000)
                    })
                    })
            }
            )
        }
        else {message.channel.send(`<@${message.author.id}>. Sorry aber die Discord API erlaubt es nicht mehr als 100 Nachichten auf einmal zu löschen`).then(sendetmessage => {
            setTimeout(() => { if (sendetmessage.deletable){sendetmessage.delete()}
                if(message.deletable){message.delete()}}, 15000)})} 
        }
    
else {message.channel.send(`<@${message.author.id}>. Sorry aber du hast nicht die Berechtigung \"MANAGE_MESSAGES\"`).then(sendetmessage => {
    setTimeout(() => {sendetmessage.delete()
        message.delete()}, 15000
        )})}
        db.add(`bot.commands.clear.howoftenuse`, 1)
   
}
    
    
    
    
    }
    

//next command here

})