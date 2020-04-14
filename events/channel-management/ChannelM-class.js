class EventChannel {

    constructor(start, end, eventname, talkname, chatname, embeddata, permcopie, redirect) {
        var server = "585511241628516352"

        const { client, config} = require("../../index")
        const { RichEmbed } = require('discord.js')
        const colour = require("../../colours.json")
        const fs      = require("fs");
        var schedule = require('node-schedule');

        var openchannels = schedule.scheduleJob(start, function(){
            client.guilds.get(server).createChannel(eventname, "category", client.guilds.get(server).channels.get(permcopie).permissionOverwrites).then(async categorie =>{
               await categorie.setPosition(0)
               await categorie.guild.createChannel(chatname, "text").then(async c => {
                   await c.setParent(categorie)
                   await c.lockPermissions()
                   await c.send(embeddata )})
        
                categorie.guild.createChannel(talkname + " 1", "voice").then(async c => {
                   await c.setParent(categorie)
                   await c.lockPermissions()})
                categorie.guild.createChannel( talkname + " 2", "voice").then(async c => {
                   await c.setParent(categorie)
                   await c.lockPermissions()
                })
        
        
               
            }
            )
          
           
           });

        var closechannels = schedule.scheduleJob(end, async function(){
            var checkoutchannel = await client.guilds.get(server).createChannel("📤" + talkname + " moveout", "voice").then(async c => await c.setParent(redirect))

            if ( client.guilds.get(server).channels.find(x => x.name === talkname + " 1").members != null){
           
              client.guilds.get(server).channels.find(x => x.name === talkname + " 1").members.forEach(m => {
                m.setVoiceChannel(checkoutchannel)
              })
            }
        
            if ( client.guilds.get(server).channels.find(x => x.name === talkname + " 2").members != null){
        
              client.guilds.get(server).channels.find(x => x.name === talkname + " 2").members.forEach(m => {
                m.setVoiceChannel(checkoutchannel)
              })
        
            }
        
              setTimeout(async () => {
                client.guilds.get(server).channels.find(x => x.name === eventname).children.forEach(async c => {
                    await c.delete()
                })
                    await client.guilds.get(server).channels.find(x => x.name === eventname).delete()
              }, 3000);

              var checkmoveout = setInterval(async () => {
                  var moveoutsize = client.channels.get(checkoutchannel.id).members.array().length
                  if (moveoutsize != 0) return;
                 await checkoutchannel.delete()
                 clearInterval(checkmoveout)
              }, 10000)
        
        
           })



}
}

module.exports = EventChannel