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
var openchannels = schedule.scheduleJob("0 0 18 * * */6", function(){
    client.guilds.get(server).createChannel("Arms Abend", "category", client.guilds.get(server).channels.get("585523787408212079").permissionOverwrites).then(categorie =>{
        categorie.setPosition(0)
        categorie.guild.createChannel("Arms Abend", "text").then(c => {
            c.setParent(categorie)
            })

        categorie.guild.createChannel("Arms Talk 1", "voice").then(c => c.setParent(categorie))
        categorie.guild.createChannel("Arms Talk 2", "voice").then(c => c.setParent(categorie))


       
    }
    )
  
   
   });


   var closechannels = schedule.scheduleJob("0 5 19 * * */6", function(){

    if ( client.guilds.get(server).channels.find(x => x.name === "Arms Talk 1").members != null){
   
      client.guilds.get(server).channels.find(x => x.name === "Arms Talk 1").members.forEach(m => {
        m.setVoiceChannel("597106290787090467")
      })
    }

    if ( client.guilds.get(server).channels.find(x => x.name === "Arms Talk 2").members != null){

      client.guilds.get(server).channels.find(x => x.name === "Arms Talk 2").members.forEach(m => {
        m.setVoiceChannel("597106290787090467")
      })

    }

      setTimeout(() => {
        client.guilds.get(server).channels.find(x => x.name === "Arms Talk 2").delete()
        client.guilds.get(server).channels.find(x => x.name === "Arms Talk 1").delete()
        client.guilds.get(server).channels.find(x => x.name === "Arms").delete()
        client.guilds.get(server).channels.find(x => x.name === "Arms Abend").delete()
      }, 3000);


   }
    
    )

   
   ;