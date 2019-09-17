const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");


const ytdl = require('ytdl-core');
const clientS = require('soundoftext-js');

var servers = {}


//Play and Queue
function play(connection, message){
  
  server = servers[message.guild.id]
  if (server.queue){

  server.dispatcher = connection.playArbitraryInput(ytdl(
    server.queue[0].url,
    { filter: 'audioonly', quality: "highestaudio" }));
    server.dispatcher.setVolume(server.ls);
    server.nowplaying = server.queue[0]
    server.queue.shift()

    server.dispatcher.on("end", () => {
      if (server.pause == true){return}
      if (server.loop == true){
        server.queue.unshift(server.nowplaying)
      }
      if (server && server.queue && server.queue[0]){ play(connection, message)}
      else {
      delete servers[message.guild.id]}
      
  })

}
else {
  connection.disconnect()
}
}

//Commands and Trigger
client.on("message", (message) => {

    //let prefix = config.prefix;
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
       //Playlist
       if (args[0].startsWith("https://www.youtube.com/playlist?list")){
        const ytlist = require('youtube-playlist');

        ytlist(args[0], ['id', 'name', 'url']).then(res => {
          console.log(res.data.playlist);
          
          message.channel.send(new RichEmbed().setTitle("Youtube Playlist").setURL(args[0])
           .setDescription("Ich habe diese Videos zur Queue hinzugefügt:")).then(m => {

          res.data.playlist.forEach(video => {
       server.queue.push({"url": video.url, "id": video.id})
                m.edit(new RichEmbed().setTitle("Youtube Playlist").setURL(args[0])
                .setDescription(m.embeds[0].description + "```" + video.name + "```"))
                m.embeds[0].description  =  m.embeds[0].description + "```" + video.name + "```"
          })
          
           
          

          if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then(connection => {
              play(connection, message)
            })
          }
        });

      })

       }
       //Normal Video Link
      else if (args[0].startsWith("https://www.youtube.com/watch?v") || args[0].startsWith("https://youtu.be/") || args[0].startsWith("http://www.youtube.com/v/")){
       server.queue.push({"url": args[0], "id": Math.round(Math.random() * 10000000000000000)})
        message.react("✅")

        if(!message.guild.voiceConnection){
          message.member.voiceChannel.join().then(connection => {
            play(connection, message)
          })
        }

       }
       //Video Search
       else{
        var search = require('youtube-search');
 
        var opts = {
          maxResults: 1,
          key: config.tokens.youtube
        };
         
        search(args.join(" "), opts, function(err, results) {
          if(err) return console.log(err);
          server.queue.push({"url": results[0].link, "id": Math.round(Math.random() * 10000000000000000)})
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
      delete servers[message.guild.id]      
    }
    if (alias == "ls" && args[0]){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
      servers[message.guild.id].dispatcher.setVolume(args[0]);
      servers[message.guild.id].ls = parseInt( args[0] )
      message.channel.send(new RichEmbed().setDescription(`Lautstärke auf ${args[0]} gesetzt`).setFooter("Der Standartwert beim joinen ist 0.5"))      
    }
    if (alias == "q" || alias == "queue"){

      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
        
          var server = servers[message.guild.id]
       
        var queue = ""
        ytdl.getInfo(server.nowplaying.url, (err, info) => {
          queue += `▶ **[${info.title}](${info.video_url})**\n`
        }) 
        
       setTimeout(() => { server.queue.forEach(element => {
         ytdl.getInfo(element.url, (err, info) => {
           queue += `*⃣ [${info.title}](${info.video_url})\n`
         })
        })
      }, 500)
  
    
    
     setTimeout(() => { 
       try{
      message.channel.send(new RichEmbed().setTitle("Server Queue für " + message.guild.name + ` (${server.queue.length + 1})`).setDescription(`${queue}`))    
    }
  catch(e) {message.channel.send("Die Queue kann nicht gesendet werden da sie zu lang ist")}}, 3000)  
    
      
        

      
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

