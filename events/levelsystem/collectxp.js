const { client, config, database} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
const mongoose = require("mongoose")
const { rewards } = require("./xp-rewards")
const MEMBER = require("../../models/MEMBER")


var k = schedule.scheduleJob("0 * * * * *",async function(){ 


    client.guilds.forEach(guild => {
        guild.members.forEach(async member => {
            if (member.user.bot){return;}
               var memberfromdb = await MEMBER.findOne({"info.id": member.id})
                
                    if (member.voiceChannel && member.voiceChannel.parentID == "586170548678295583" == false && !member.bot && member.voiceChannel.members.size < 2 == false){
                      var xp = memberfromdb.ranks.xp
                      var rank = memberfromdb.ranks.rank
                      xp = xp + 1
                      if (member.voiceChannel.parent.name.startsWith("Monday Mario Kart")){
                          xp = xp + 1
                      }
                       
                       if (xp > 59){
                        rank += 1
                        xp = 0
                        rewards(memberfromdb, member, rank)
                       }
                       await MEMBER.findOneAndUpdate({"info.id": member.id}, {"ranks.xp": xp, "ranks.rank": rank}, (err, res) => {if (err){console.log(err)}})
                    }

                    
                    
                
            
        })
    })

})

