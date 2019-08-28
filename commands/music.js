const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

const ytdl = require('ytdl-core');
const clientS = require('soundoftext-js');

var servers = {}

function play(connection, message){
  var server = servers[message.guild.id]
  server.dispatcher = connection.playArbitraryInput(ytdl(
    server.queue[0],
    { filter: 'audioonly', quality: "highestaudio" }));
    server.dispatcher.setVolume(0.5);

    server.queue.shift();

    server.dispatcher.on("end", () => {
      if (server.queue[0]){ play(connection, message)}
      else {connection.disconnect()}
      
  })

}

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
         loop: false
       }
     }
     var server = servers[message.guild.id]
     server.queue.push(args[0])
     message.react("✅")

     if(!message.guild.voiceConnection){
       message.member.voiceChannel.join().then(connection => {
         play(connection, message)
       })
     }


    }
    if (alias == "skip"){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
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
    }
    if (alias == "ls" && args[0]){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
      servers[message.guild.id].dispatcher.setVolume(args[0]);
      message.channel.send(new RichEmbed().setDescription(`Lautstärke auf ${args[0]} gesetzt`).setFooter("Der Standartwert beim joinen ist 0.5"))      
    }
    if (alias == "q" || alias == "queue"){
      if (!servers[message.guild.id] || !servers[message.guild.id].dispatcher || !message.guild.voiceConnection){
        message.channel.send(new RichEmbed().setDescription("Auf diesem Server wird gerade kein Song gespielt"))
        return;
      }
      var server = servers[message.guild.id]
      if (server.queue[0]){
        var queue = ""
        server.queue.forEach(element => {
         queue += "```" + element + "```"
        })
      message.channel.send(new RichEmbed().setTitle("Server Queue für " + message.guild.name + ` (${server.queue.length})`).setDescription(`${queue}`))      
    }}

})