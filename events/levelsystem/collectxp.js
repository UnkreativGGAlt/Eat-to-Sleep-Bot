const { client, config, database} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
const mongoose = require("mongoose")
const MEMBER = require("../../models/MEMBER")


var k = schedule.scheduleJob("0 * * * * *", function(){ 


    
    client.guilds.forEach(guild => {
        guild.members.forEach(async member => {
                
                
                    if (member.voiceChannel && member.voiceChannel.parentID == "586170548678295583" == false && !member.bot && member.voiceChannel.members.size < 2 == false){
                      var memberdb = await MEMBER.find({"info.id": member.id})
                      var xp = memberdb[0].ranks.xp
                      var rank = memberdb[0].ranks.rank
                      xp = xp + 1
                       
                       if (xp > 59){
                        rank += 1
                        xp = 0
                        var newname = member.user.tag
                       }
                       await MEMBER.findOneAndUpdate({"info.id": member.id}, {"ranks.xp": xp, "ranks.rank": rank, "infos.name": newname}, (err, res) => {if (err){console.log(err)}})
                    }

                    
                    
                
            
        })
    })

})

