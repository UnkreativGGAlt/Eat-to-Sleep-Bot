const { client, config} = require("../../index")
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

var server = "585511241628516352"

//     30    18    *    *    1
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)


//0 0 18 * * */6 <--- Jeden Sonntag 18:00 Uhr
var openchannels = schedule.scheduleJob("0 0 17 * * */6", function(){
    client.guilds.get(server).createChannel("Arms TURNIER", "category", client.guilds.get(server).channels.get("585523787408212079").permissionOverwrites).then(categorie =>{
        categorie.setPosition(0)
        categorie.guild.createChannel("Turnierhat", "text").then(c => {
            c.setParent(categorie)
            })
            categorie.guild.createChannel("Turnier News", "text").then(c => {
              c.setParent(categorie)
              })

        categorie.guild.createChannel("Arms Talk 1", "voice").then(c => c.setParent(categorie))
        categorie.guild.createChannel("Arms Talk 2", "voice").then(c => c.setParent(categorie))


       
    }
    )
  
   
   });
    
    

   
   ;