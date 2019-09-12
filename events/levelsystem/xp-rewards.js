const { client, config, database} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")

var enabled = []

var k = schedule.scheduleJob("15 * * * * *", function(){ 

    
    
        client.guilds.get("585511241628516352").members.forEach(member => {
                        if (enabled.includes(member.id)){return;}
                       if (db.get(`member.level.${member.id}.balance`) == 100){
                        enabled.push(member.id)
                        member.addRole(member.guild.roles.get("619947670496215051").id)
client.channels.get("586177035278483466").send(
    new RichEmbed()
    .setColor("#d4af37")
    .setTitle("Herzlichen Glückwunsch " + member.displayName + "#" + member.user.discriminator)
    .setDescription(member.displayName + " gehört nun zu denn wenigen Membern die 100 Stunden in einem Voice Channel auf diesem Server verbracht haben")
    .setFooter("Hier ein Cookie und eine Rolle")
    ).then(
    m => {m.react("🍪")}
)

                       }
                    

        
        })
    

})





