const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")

const clientS = require('soundoftext-js');

var servers = {};


client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if (message.content.startsWith(prefix)){
        
        
        if (alias == "say"){

          if (!args[0]){
            message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst einen Satz angeben"))
            return;
          }
          if(!message.member.voiceChannel){
            message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst in einem Voicechannel sein"))
            return;
          }
        
          message.channel.send(new RichEmbed().setColor(colour.blau).setTitle("📶Bitte warte einen moment").setDescription("Ich sende eine Request zur [Soundoftext API](https://soundoftext.com)")).then(m => {
          
           

          if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
            clientS.sounds.create({ text: args.join(" "), voice: 'de-DE' })
  .then(async soundUrl => {
      

    var dispatcher = connection.playArbitraryInput(soundUrl);
    m.edit(new RichEmbed().setColor(colour.blau).setDescription("▶Spiele Sound im Channel ab"))    
    dispatcher.on("end", () => {
        connection.disconnect()
        m.edit(new RichEmbed().setColor(colour.grün).setDescription("✅Erfolgreich denn Text-Sound abgespielt"))
        setTimeout(() => {
            servers[message.guild.id] = true
            m.delete()
            message.delete()
        }, 30000)
        })
    
    
    
        
      
    
  })
  .catch(e => {
    /* Reasons that the Promise might get rejected:
     * - after 60 seconds, it automatically times out
     * - the API might fail to create the sound or reject it
     * - other miscellaneous network issues
     */
    m.edit(new RichEmbed()
    .setColor(colour.rot)
    .setTitle("❌Die API hat folgendes geantwortet:")
    .setDescription(e))
            servers[message.guild.id] = true
            connection.disconnect()
 
            setTimeout(() => {
                m.delete()
                message.delete()
            }, 30000)
 
        });
  


          
            
          })

            
        })



            
db.add(`bot.commands.play.howoftenuse`, 1)
        }
          
              
              
                
        

                
                
                }
                

            //next command here
    
})

client.on("voiceStateUpdate", (oldm, newm) => {
  if (oldm.guild.voiceConnection){
    if (oldm.guild.voiceConnection.channel.members.size == 1){
      oldm.guild.voiceConnection.disconnect();
    }
  }
})