//Test
const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")

const ytdl = require('ytdl-core');
const clientS = require('soundoftext-js');

var servers = {};



function play(connection, message, args){
  try{
    console.log("In Function")
var server = servers[message.guild.id]
//Youtube
if(server.queue[0].startsWith("https://www.youtube.com/watch?v") || server.queue[0].startsWith("https://youtu.be/") || server.queue[0].startsWith("http://www.youtube.com/v/")){
var dispatcher = connection.playArbitraryInput(ytdl(
  server.queue[0],
  { filter: 'audioonly' }));
  
  server.dispatcher = dispatcher;
  server.dispatcher.setVolume(0.5);

  server.dispatcher.on("end", () => {
    if (server.queue[0]) {play(connection, message, args)}
    else{connection.disconnect();
    message.channel.send(new RichEmbed().setDescription("Keine Songs mehr in der Queue. Meine Arbeit ist erledigt"))}
  })

}



else{
  console.log("Not a Youtube Link")
}
} catch (e){
  message.channel.send(new RichEmbed(
  ).setColor(colour.rot).setTitle("Music Fuction Error:").setDescription("```" + e + "```"))
}
}


client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if (message.content.startsWith(prefix)){
        
        
        if (alias == "play" || alias == "p"){

          if (!args[0]){
            message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst einen Link angeben"))
            return;
          }
          if(!message.member.voiceChannel){
            message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst in einem Voicechannel sein"))
            return;
          }
          if (!servers[message.guild.id]){servers[message.guild.id] = {
            queue: [],
            loop: false
          }
        }

          
          var server = servers[message.guild.id]
         if(!args[1]){ server.queue.push(args[0] ), console.log("no YT Search")
         
        }
          else {

            var search = require('youtube-search');
 
            var opts = {
              maxResults: 1,
              key: config.tokens.youtube
            };
            search(args.join(" "), opts, function(err, results) {
              if(err) return console.log(err);

              console.log(results)
              var embed = new RichEmbed();
              var Link = results[0]["link"]
              var Titel = results[0]["title"]
              var Channelname = results[0]["channelTitle"]
          
              var embed = new RichEmbed();
              server.queue.push(Link)
              message.channel.send(
                embed
                .setTitle("Youtube Search")
                .setDescription("**Zur Queue hinzugefügt**\nVideo Title: " + Titel + `\nChannel Name: ${Channelname}\nLink: [Klick mich](${Link})`)
                
                )
                server.queue.push(results[0]["link"])
                
            })

          }
          message.react("✅")
          console.log("Befir If")
          if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(connection => {
          console.log("After if")            
            play(connection, message, args);
            
          })
          



            
db.add(`bot.commands.play.howoftenuse`, 1)
        }
        if (alias == "skip" || alias == "next"){
          var server = servers[message.guild.id]

            if(server.dispatcher){
              message.channel.send(new RichEmbed().setDescription("Song erfolgreich übersprungen"))
              server.dispatcher.end()}
            else{message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Ich habe keine Queue für diesen Server angelegt. skip nicht möglich"))}
            db.add(`bot.commands.skip.howoftenuse`, 1)
          }
          if (alias == "stop" || alias == "dc"){
            var server = servers[message.guild.id]
            if (message.guild.voiceConnection){message.guild.voiceConnection.disconnect()
                server.queue = []}

                db.add(`bot.commands.dc.howoftenuse`, 1)
              }
              
              if (alias == "lautstärke" || alias == "ls"){
                var server = servers[message.guild.id]
                if (server.dispatcher){
                  if (parseInt(args[0]) > 10){
                    message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Aus gründen der Gesundheit aller Ohren dieser Welt darf der Wert nicht höher als 10 sein").setFooter("Der voreingestellte Wert beim joinen ist 0.5"))
                  return;}
                  message.channel.send(new RichEmbed().setDescription("Lautstärke auf " + args[0] + " gesetzt").setFooter("Der voreingestellte Wert beim joinen ist 0.5"))
                  server.dispatcher.setVolume(args[0])
                }
  
                    db.add(`bot.commands.moresoundcommands.howoftenuse`, 1)
                  }

                  if (alias == "pause" || alias == "pa" || alias == "weiter" || alias == "we"){
                    var server = servers[message.guild.id]
                    if (server.dispatcher && server.dispatcher.paused == false){
                      //Set to Pause
                      server.dispatcher.pause()
                      message.channel.send(
                        new RichEmbed()
                        .setTitle("Wiedergabe agehalten")
                        .setDescription("Wenn du die wiedergabe fortsetzten möchtest, dann führe denn Command erneut aus")
                      )
                     
                    }
                    else{
                      server.dispatcher.resume()
                      message.channel.send(
                        new RichEmbed()
                        .setTitle("Wiedergabe fortgesetzt")
                        .setDescription("Wenn du die wiedergabe erneut anhalten möchtest, dann führe denn Command erneut aus")
                      )
                    }
      
                        db.add(`bot.commands.moresoundcommands.howoftenuse`, 1)
                      }

                      if (alias == "queue" || alias == "q" || alias == "songs"){
                        var server = servers[message.guild.id]
                        if (server && server.dispatcher){
                          //Set to Pause
                          if (server.queue[0]){
                            var queue = ""
                            server.queue.forEach(element => {
                             queue += "```" + element + "```"
                            })
                          message.channel.send(
                            new RichEmbed()
                            .setTitle("Queue")
                            .setDescription(queue)
                          )
                        }
                        else {
                          message.channel.send(
                            new RichEmbed()
                            .setTitle("Queue")
                            .setDescription("nothing in here")
                          )
                        }
                         
                        }
                        

          
                            db.add(`bot.commands.moresoundcommands.howoftenuse`, 1)
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