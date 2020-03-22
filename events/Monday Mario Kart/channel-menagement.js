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


//0 30 18 * * */1 <--- Jeden Montag 18:30 Uhr
var openchannels = schedule.scheduleJob("30 18 * * 1", function(){
    client.guilds.get(server).createChannel("Monday Mario Kart", "category", client.guilds.get(server).channels.get("585523787408212079").permissionOverwrites).then(categorie =>{
        categorie.setPosition(0)
        categorie.guild.createChannel("MMK Chat", "text").then(c => {
            c.setParent(categorie)
            c.send(new RichEmbed()
        .setColor("#0984e3")
        .setThumbnail("https://www.mariowiki.com/images/thumb/7/71/Crazy8MK8.png/1200px-Crazy8MK8.png")
        .setTitle("Monday Mario Kart").setDescription("Das heutige Monday Mario Kart auf Eat, Sleep, Nintendo, Repeat hat nun begonnen")
        .addField("Infos:", "Start: 18:30 Uhr\nEnde: 19:30 Uhr\nTurnier Code: 2442-6453-9691")
        .addField("Eure Teilnahme Geschenke:", "2* XP Boost in MMK Talks")
        .addField("Der Stream:", "Das heutige MMK wird auf Youtube gestreamt. Alle Talks die mit 🔴 gekenzeichnet sind werden für den Stream benutzt! Eure Stimmen werden in solchen Talks aufgenommen. Verhaltet euch ganz natürlich. Solltet ihr etwas sagen was ihr in der Stream Aufnahme die man später auf Youtube sehen kann nicht drin haben wollt werde ich dies selbsverständlich raus schneiden. ICH NEHME EURER RECHT FÜR EURE STIMME SEHR ERNST. Ihr könnt selbstverständlich auch ohne Streaming Talk am MMK teilnehmen^^")
        )})

        categorie.guild.createChannel("MMK Talk 1 ⚫", "voice").then(c => c.setParent(categorie))
        categorie.guild.createChannel("MMK Talk 2 ⚫", "voice").then(c => c.setParent(categorie))


       
    }
    )
  
   
   });


   var closechannels = schedule.scheduleJob("30 19 * * 1", function(){

    if ( client.guilds.get(server).channels.find(x => x.name === "MMK Talk 1").members != null){
   
      client.guilds.get(server).channels.find(x => x.name === "MMK Talk 1").members.forEach(m => {
        m.setVoiceChannel("597106290787090467")
      })
    }

    if ( client.guilds.get(server).channels.find(x => x.name === "MMK Talk 2").members != null){

      client.guilds.get(server).channels.find(x => x.name === "MMK Talk 2").members.forEach(m => {
        m.setVoiceChannel("597106290787090467")
      })

    }

      setTimeout(() => {
        client.guilds.get(server).channels.find(x => x.name === "MMK Talk 1").delete()
        client.guilds.get(server).channels.find(x => x.name === "MMK Talk 2").delete()
        client.guilds.get(server).channels.find(x => x.name === "mmk-chat").delete()
        client.guilds.get(server).channels.find(x => x.name === "Monday Mario Kart").delete()
      }, 3000);


   }
    
    )

   
   ;