const { client, config, database} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")

var k = schedule.scheduleJob("0 * * * * *", function(){ 

    
    client.guilds.forEach(guild => {
        guild.members.forEach(member => {
            if (member.voiceChannel){
                if (member.selfMute == false){
                    async function justrunit(){
                    if (member.voiceChannel.parentID == "586170548678295583" == false && !member.bot && member.voiceChannel.members.size < 2 == false){
                       //await database.set(`member.xp.${member.id}.balance`, await database.get(`member.xp.${member.id}.balance`) + 1)
                        db.add(`member.xp.${member.id}.balance`, 1)
                        console.log(member.user.username + " gets an XP => " + db.get(`member.xp.${member.id}.balance`))
                       if (db.get(`member.xp.${member.id}.balance`) > 59){
                        db.set(`member.xp.${member.id}.balance`, 0)
                       //await database.set(`member.xp.${member.id}.balance`, 0)
                        db.add(`member.level.${member.id}.balance`, 1)
                       //await database.set(`member.level.${member.id}.balance`, await database.get(`member.level.${member.id}.balance`) + 1)
                       }
                    }

                    }
                    justrunit()
                }
            }
        })
    })

})

