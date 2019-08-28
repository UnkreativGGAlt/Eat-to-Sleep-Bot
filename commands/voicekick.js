const { client, config} = require('../index')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
var db = require("quick.db")

client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);

if (message.content.startsWith(prefix)){
        
    if (alias == "voicekick"){
        if (!message.author.id.startsWith("330380702505762817")){
            
        
        message.delete()
        var userid = args[0].replace("<@", "").replace(">", "")
        var kickmember = message.guild.members.find(x => x.id === userid)
        if (message.guild.members.find(x => x.id === message.author.id) && message.guild.members.get(message.author.id).roles.find(x => x.id === "585511640745771049")){
            kickmember.setVoiceChannel(null)
        }

        else if (message.guild.members.find(x => x.id === userid) && message.guild.members.get(message.author.id).roles.find(x => x.id === "597147938606809098") && message.guild.members.get(message.author.id).voiceChannel == kickmember.voiceChannel){
            var kickdata = fs.readFileSync(`data/voicekick.json`);
            var kick = JSON.parse(kickdata);
            if (!kick[message.author.id] == true){

            
                
            kickmember.setVoiceChannel(null)
            kickmember.user.send(`Hey. ${message.author.username} hat dich aus dem Voice gekickt`)
            kick[message.author.id] = true
            let data2 = JSON.stringify(kick);
            fs.writeFileSync(`data/voicekick.json`, data2)
            
            setTimeout(() => {
               delete kick[message.author.id]
            let data3 = JSON.stringify(kick);
            fs.writeFileSync(`data/voicekick.json`, data3)
            }, 3600000)
        }
        else{
            message.channel.send(new RichEmbed().setDescription("Mitglieder von deiner Art müssen nach jedem Voicekick 60 Minuten warten").setTitle(`Sorry?(${message.author.username})`).setColor(colour.rot).setFooter("Diese Nachicht löscht sich nach 20 Sekunden von alleine")).then(send => {
                setTimeout(() => {send.delete()}, 20000)
            })
        }
    
    }
    else {
        message.channel.send(new RichEmbed().setDescription("Folgende Fehler können für diese Nachicht verantwortlich sein:\n-Du hast denn Voicekick Befehl benutzt und:\n    -Hast nicht die Berechtigungen für diesen Befehl\n    -Du befindest dich nicht mit dem Member denn du kicken willst im selben Talk\n    -Du bist zu blöd für diesen Befehl und hast ein falsches Argument angegeben").setTitle(`Ein Fehler ist aufgetreten`).setColor(colour.rot).setFooter("Diese Nachicht löscht sich nach 20 Sekunden von alleine")).then(send => {
            setTimeout(() => {send.delete()}, 20000)
        })
    }
} 
db.add(`bot.commands.voicekick.howoftenuse`, 1)    
}
   
    
    
}
    

//next command here
})
