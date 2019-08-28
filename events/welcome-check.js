const { client, config, gamestatus} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");



client.on('messageReactionAdd', (messageReaction, user) => {
var path = "data/welcome/" + messageReaction.message.channel.id + ".txt"

    if (messageReaction.emoji == "✅" && user.bot == false){
        console.log("Right Emote")

        try {
            if (fs.existsSync(path)) {
        console.log("Check if Data exsist")
    fs.readFile(path, function(err, buf) {
        var Check = buf.toString()
        console.log("Read Data")

        var guild = messageReaction.message.guild
        var member = guild.members.get(Check)

    fs.writeFile(path, Check + "\n-true", function(err, data){
        if (err) console.log(err);
        });
        
    
        member.guild.channels.find(x => x.name === "willkommen").send(`<@${member.id}` + "> ist gerade Eat, Sleep, Nintendo, Repeat beigetreten")
        member.addRole(guild.roles.get("585511864931188856"))
        gamestatus == false;
        function deletechannelafteroonehour(){
            messageReaction.message.channel.delete()
        }
        setTimeout(deletechannelafteroonehour, 60000)
        fs.writeFile("data/gamechange.txt", "false", function(err, data){
            if (err) console.log(err);
            });
        client.user.setActivity(">>Willkommen " + member.displayName + "<<", {type: "PLAYING"});
        function gametoon(arg) {fs.writeFile("data/gamechange.txt", "true", function(err, data){
            if (err) console.log(err);
            });}
        setTimeout(gametoon, 180000); 

        
 })}
} catch(err) {
  console.error(err)
}
}});
client.on("guildMemberRemove", (user) => {
    client.guilds.get(user.guild.id).channels.find(x => x.name === "willkommen").send(`${user.user.username}` + " hat gerade Eat, Sleep, Nintendo, Repeat verlassen")

})

