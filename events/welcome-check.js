const { client, config, gamestatus} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");
var { member } = require("./welcome-join.js")

client.on('messageReactionAdd', (messageReaction, user) => {
    if (messageReaction.message.guild.id != "585511241628516352"){return;}
    if (!member[user.id] && messageReaction.message.channel.parentID != "585860916512423967"){return}
    if (messageReaction.emoji == "✅" && user.bot == false){
        console.log("Right")

        try {
        var guild = messageReaction.message.guild

            
        var NMember = messageReaction.message.guild.members.get(user.id)
    
        guild.channels.find(x => x.name === "willkommen").send(`<@${NMember.id}` + "> ist gerade Eat, Sleep, Nintendo, Repeat beigetreten")
        NMember.addRole(guild.roles.get("585511864931188856"))
        
            
        client.user.setActivity(">>Willkommen " +NMember.user.username + "<<", {type: "PLAYING"});
        messageReaction.message.channel.delete()
        
        
        
} catch(err) {
  console.error(err)
}
}});


client.on("guildMemberRemove", (user) => {
    if (user.guild.id != "585511241628516352"){return;}
    client.guilds.get(user.guild.id).channels.find(x => x.name === "willkommen").send(`${user.user.username}` + " hat gerade Eat, Sleep, Nintendo, Repeat verlassen")

})

