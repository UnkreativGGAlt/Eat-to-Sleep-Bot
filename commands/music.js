const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")


const ytdl = require('ytdl-core');
const clientS = require('soundoftext-js');

var servers = {}

//Play and Queue
function play(connection, message){
  server = servers[message.guild.id]

  if (server.queue[0].type.key = "yt"){
  server.dispatcher = connection.playArbitraryInput(ytdl(
    server.queue[0].link,
    { filter: 'audioonly', quality: "highestaudio" }));
    server.dispatcher.setVolume(server.ls);
    server.nowplaying = server.queue[0]
    server.queue.shift()
  }
    
    
    server.dispatcher.on("end", () => {
      if (server.loop == true){
        server.queue.unshift(server.nowplaying)
      }
      if (server.queue[0]){ play(connection, message)}
      else {connection.disconnect()
        servers[message.guild.id].loop = false}
      
  })

}

//Commands and Trigger
client.on("message", (message) => {

let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if (alias == "play" || alias == "p"){

    if (!args[0]){
      message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst einen Link oder Suchbegriff angeben"))
      return;
    }  
     if(!message.member.voiceChannel){
      message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du musst in einem Voicechannel sein"))
      return;
     }

     if(!servers[message.guild.id]){
       servers[message.guild.id] = {
         queue: [],
         loop: false,
         ls: 0.5
       }
     }


       var server = servers[message.guild.id]
       if (args[0].startsWith("https://www.youtube.com/watch?v") || args[0].startsWith("https://youtu.be/") || args[0].startsWith("http://www.youtube.com/v/")){
       
        ytdl.getInfo(videoID, (err, info) => {
          if (err) throw err;
          let format = ytdl.chooseFormat(info.formats, { quality: '134' });
          if (format) {
            
       server.queue.push(
         {"type": {"key": "yt", name: "YouTube Link"},
          "link": args[0],
          "name": format.name})
        message.react("✅")
      }
    });

        if(!message.guild.voiceConnection){
          message.member.voiceChannel.join().then(connection => {
            play(connection, message)
          })
        }

       }

      else if (args[0] == "queen"){
        server.queue.push("https://www.youtube.com/watch?v=ODaPVD9aq2g") //Marina
        server.queue.push("https://www.youtube.com/watch?v=ztpINutLlBg") //Katja
        server.queue.push("https://www.youtube.com/watch?v=gl1aHhXnN1k") //Ariana
        server.queue.push("https://www.youtube.com/watch?v=z-N2Y2NC0BM") //Sherin      
        server.queue.push("https://www.youtube.com/watch?v=i0gZaBCR9EI&t=2s") //Kirby
        message.react("👑")

        if(!message.guild.voiceConnection){
          message.member.voiceChannel.join().then(connection => {
           setTimeout(() => { play(connection, message) }, 1000)
          })
        }

       }

       else{
        var search = require('youtube-search');
 
        var opts = {
          maxResults: 1,
          key: config.tokens.youtube
        };
         
        search(args.join(" "), opts, function(err, results) {
          if(err) return console.log(err);

          server.queue.push(
            {"type": {"key": "yt", name: "YouTube Search"},
             "link": results[0].link,
             "name": results[0].title})
        
          server.queue.push(results[0].link)
          message.channel.send(
            new RichEmbed()
            .setColor(colour.rot)
            .setTitle("Zur Queue von " + message.guild.name + " hinzugefügt")
            .addField("Video Titel", results[0].title, true)
            .addField("Channel Name", results[0].channelTitle, true)
            .addField("Video Link", `[Klick mich](${results[0].link})`)
          )

          if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then(connection => {
              play(connection, message)
            })
          }
          
        });
       }

    


    }
    if (alias == "skip"){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
      servers[message.guild.id].loop = false
      servers[message.guild.id].dispatcher.end()
      message.channel.send(new RichEmbed().setDescription("Aktuellen Song übersprungen"))      
    }
    if (alias == "dc"){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
      message.guild.voiceConnection.disconnect();
      message.channel.send(new RichEmbed().setDescription("Wiedergabe beendet"))
      servers[message.guild.id].loop = false      
    }
    if (alias == "ls" && args[0]){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
      servers[message.guild.id].dispatcher.setVolume(args[0]);
      servers[message.guild.id].ls = args[0]
      message.channel.send(new RichEmbed().setDescription(`Lautstärke auf ${args[0]} gesetzt`).setFooter("Der Standartwert beim joinen ist 0.5"))      
    }
    if (alias == "q" || alias == "queue"){
      var search = require('youtube-search');

      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
 
        var opts = {
          maxResults: 1,
          key: config.tokens.youtube
        };
        
          var server = servers[message.guild.id]
        if (server.queue[0]){
        var queue = ""
        server.queue.forEach(element => {
         search(element, opts, function(err, results) {
          queue += "```" + results[0].title + "```"
         })
        })
     setTimeout(() => { message.channel.send(new RichEmbed().setTitle("Server Queue für " + message.guild.name + ` (${server.queue.length})`).setDescription(`${queue}`))    }, 3000)  
    
      }
        

      
      }
    if (alias == "loop"){

      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }

      server = servers[message.guild.id]
      if (server.loop == false){
        server.loop = true
        message.channel.send(new RichEmbed().setDescription("🔂loop aktiviert"))
      }

      else if (server.loop == true){
        server.loop = false
        message.channel.send(new RichEmbed().setDescription("▶loop deaktiviert"))
      }
        
    }

})