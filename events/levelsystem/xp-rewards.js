const { client, config, database} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")

var k = schedule.scheduleJob("15 * * * * *", function(){ 
    //db.add(`member.xp.${member.id}.balance`, 1)
    
    client.guilds.forEach(guild => {
        guild.members.forEach(member => {
            if (db.get(`member.level.${member.id}.balance`) > 100){
                if (db.get(`member.medials.100`) == true){return}

                client.channels.get("586177035278483466").send(
                    new RichEmbed()
                    .setColor("#d4af37")
                    .setTitle("Herzlichen Glückwunsch " + member.displayName + "#" + member.user.discriminator)
                    .setDescription(member.displayName + " gehört nun zu denn wenigen Membern die 100 Stunden in einem Voice Channel auf diesem Server verbracht haben")
                    .setFooter("Hier ein Cookie und eine Rolle")
                    ).then(
                    m => {

                        member.addRole(member.guild.roles.get("619947670496215051"))



                        
                        m.react("🍪")
                    }
                )
            }
        })
    })

})

