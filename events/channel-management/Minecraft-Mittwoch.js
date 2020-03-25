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


var openchannels = schedule.scheduleJob("00 19 * * 3", function(){
    client.guilds.get(server).createChannel("Minecraft Mittwoch", "category", client.guilds.get(server).channels.get("585523787408212079").permissionOverwrites).then(categorie =>{
        categorie.setPosition(0)
        categorie.guild.createChannel("minecraft-chat", "text").then(c => {
            c.setParent(categorie)
            c.send(new RichEmbed()
        .setColor("#0984e3")
        .setThumbnail("https://gamepedia.cursecdn.com/minecraft_de_gamepedia/7/7c/Grasblock.png")
        .setTitle("Minecraft Mittwoch").setDescription("Das heutige Minecraft Mittwocht auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
        .addField("Infos:", "Start: 19:00 Uhr\nEnde: 20:00 Uhr")
        .addField("Eure Teilnahme Geschenke:", "2* XP Boost in allen Minecraft Talks")
        )})

        categorie.guild.createChannel("Minecraft Talk 1", "voice").then(c => c.setParent(categorie))
        categorie.guild.createChannel("Minecraft Talk 2", "voice").then(c => c.setParent(categorie))


       
    }
    )
  
   
   });


   var closechannels = schedule.scheduleJob("00 20 * * 3", function(){

    if ( client.guilds.get(server).channels.find(x => x.name === "Minecraft Talk 1").members != null){
   
      client.guilds.get(server).channels.find(x => x.name === "Minecraft Talk 1").members.forEach(m => {
        m.setVoiceChannel("597106290787090467")
      })
    }

    if ( client.guilds.get(server).channels.find(x => x.name === "Minecraft Talk 2").members != null){

      client.guilds.get(server).channels.find(x => x.name === "Minecraft Talk 2").members.forEach(m => {
        m.setVoiceChannel("597106290787090467")
      })

    }

      setTimeout(() => {
        client.guilds.get(server).channels.find(x => x.name === "Minecraft Talk 1").delete()
        client.guilds.get(server).channels.find(x => x.name === "Minecraft Talk 2").delete()
        client.guilds.get(server).channels.find(x => x.name === "minecraft-chat").delete()
        client.guilds.get(server).channels.find(x => x.name === "Minecraft Mittwoch").delete()
      }, 3000);


   }
    
    )

   
   ;