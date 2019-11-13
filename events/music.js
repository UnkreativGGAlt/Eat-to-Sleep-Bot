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
  
if (!server || !server.queue){return}
  server.dispatcher = connection.playArbitraryInput(ytdl(
    server.queue[0],
    { filter: 'audioonly', quality: "highestaudio" }));
    server.dispatcher.setVolume(server.ls);
    server.nowplaying = server.queue[0]
    server.queue.shift()

    server.dispatcher.on("end", () => {
        //If Loop is on, Adding last Song again to Queue
      if (server.loop == true){server.queue.unshift(server.nowplaying)}
      //If something is in the Queue, start Play funktion again
      if (server.queue[0]){ 
        
        play(connection, message)}

      else {
        //If queue is empty, disconnect from Channel and set loop to false and lautstärke to 0.5
        connection.disconnect()
        servers[message.guild.id].loop = false
        servers[message.guild.id].ls = 0.5
      }
      
  })

  server.dispatcher.on("error", (err) => {
    console.log("--music dispatcher error--")
    console.log(err)
    console.log("--error ende--")
  })


server.dispatcher.on("debug", (info) => {
    console.log("--music dispatcher info--")
    console.log(info)
    console.log("--info ende--")
  })


}

//Commands and Trigger
client.on("message", (message) => {
 
    //let prefix = config.prefix;
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

    if (message.content.startsWith(prefix) == false){return}

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
        var request = require("request")
        var playlistId = args[0].replace("https://www.youtube.com/playlist?list=", "")
        
        request(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${config.tokens.youtube}`, function (error, response, body) {
        body = JSON.parse(body)
        if (!body["error"]){
          
          body["items"].forEach(Video => {
            var Link = "https://www.youtube.com/watch?v=" + Video["snippet"]["resourceId"]["videoId"]
            server.queue.push(Link)
          })
          message.channel.send(new RichEmbed()
          .setTitle("Youtube Playlist erkannt")
          .setURL(args[0])
          .setColor(colour.rot)
          .setDescription("Ich habe **" + body["items"].length + "** Videos zur Queue hinzugefügt")
          )
          

          

          if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then(connection => {
             play(connection, message)
            })
          }


        }
        
        
        
        else{
          var embed = new RichEmbed().setColor(colour.rot).setTitle(`Youtube Search API Fehler (--  ${body["error"]["message"]}  --)`)
          body["error"]["errors"].forEach(x => {
            embed.addField(x["reason"], x["message"])
          })
          message.channel.send(embed)
        }
 
        });

       }
       //Link
      else if (args[0].startsWith("https://www.youtube.com/watch?v") || args[0].startsWith("https://youtu.be/") || args[0].startsWith("http://www.youtube.com/v/")){
       server.queue.push(args[0])
        message.react("✅")

        if(!message.guild.voiceConnection){
          message.member.voiceChannel.join().then(connection => {
            play(connection, message)
          })
        }

       }
       //Video Search
       else{
        var request = require("request")
        request(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=${config.tokens.youtube}&q=${args.join(" ")}&type=video`, function (error, response, body) {
        body = JSON.parse(body)
        if (!body["error"]){
          var Link, Titel, Thlink, Channelname, Channellink
          Link = "https://www.youtube.com/watch?v=" + body["items"][0]["id"]["videoId"]
          Titel = body["items"][0]["snippet"]["title"]
          Thlink = body["items"][0]["snippet"]["thumbnails"]["medium"]["url"]
          Channelname = body["items"][0]["snippet"]["channelTitle"]
          Channellink = "https://www.youtube.com/channel/" + body["items"][0]["snippet"]["channelId"]
          
          var embed = new RichEmbed()
          .setTitle(`Zur Queue von ${message.guild.name} hinzugefügt`)
          .setColor(colour.rot)
          .addField("Video Titel", `[${Titel}](${Link})`)
          .addField("Channel", `[${Channelname}](${Channellink})`)
          .setThumbnail(Thlink)

          message.channel.send(embed)
          servers[message.guild.id]["queue"].push(Link)

          if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then(connection => {
              play(connection, message)
            })
          }


        }
        
        
        
        else{
          var embed = new RichEmbed().setColor(colour.rot).setTitle(`Youtube Search API Fehler (--  ${body["error"]["message"]}  --)`)
          body["error"]["errors"].forEach(x => {
            embed.addField(x["reason"], x["message"])
          })
          message.channel.send(embed)
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
      if (!message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Laut meiner Database befinde ich mich aktuell nicht in einem Voicechannel. Falls doch ist der Bot wohl abgestürzt und neugestartet"))
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
      var request = require("request")
      var Text = ""
      servers[message.guild.id]["queue"].forEach(Link => {

        Text += Link + "\n"
      
      })
      setTimeout(() => {message.channel.send(new RichEmbed().setDescription(Text))}, 2000)
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

//dc when channel is emty
client.on("voiceStateUpdate", (oldm, newm) => {
  if (oldm.guild.voiceConnection){
    if (oldm.guild.voiceConnection.channel.members.size == 1){
      servers[oldm.guild.id].queue = []
      servers[oldm.guild.id].loop = false
      servers[oldm.guild.id].ls = 0.5
      servers[oldm.guild.id].dispatcher.end();

    }
  }
})


