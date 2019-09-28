const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if (message.content.startsWith(prefix)){
        
          if (!message.guild.voiceConnection){  
      if (alias == "rs"){

         if (message.member.id == "330380702505762817"){
const ytdl = require('ytdl-core');
             message.channel.send(
             
             new RichEmbed().setColor(colour.gelb).setDescription("Daten werden in Database gespeichert...")).then(m => {

                    if(client.guilds.get("585511241628516352").members.get("330380702505762817").voiceChannel != null){
                        client.guilds.get("585511241628516352").members.get("330380702505762817").voiceChannel.join().then(connection => {
                            
                           var dispatcher = connection.playArbitraryInput(ytdl(
                                "https://www.youtube.com/watch?v=Gb2jGy76v0Y",
                                { filter: 'audioonly', quality: "highestaudio" }));
                
                                dispatcher.on("end", () => {
                                    connection.disconnect()
                                    m.edit(
                                        new RichEmbed().setColor(colour.grün).setDescription("Bot startet jetzt neu...")
                                    ).then(m => {
                                        process.exit(0);
                                    })

                                })
                            
                          })
                    }
                    else{
                        m.edit(
                            new RichEmbed().setColor(colour.grün).setDescription("Bot startet jetzt neu...")
                        ).then(m => {
                            process.exit(0);
                        })
                    }


                 })
                }}
                
      }
                }
                

            //next command here
    
})