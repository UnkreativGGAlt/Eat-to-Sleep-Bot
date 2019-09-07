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
        
    if (alias == "help"){
        message.channel.send(
            new RichEmbed()
            .setTitle("Command Page von diesem Bot")
            .setDescription(`Prefix: ${config.prefix}\nBot Version: ${config.version}\n\nLegende:\nCommand für alle: 🔵\nCommand für bestimmte User: 🔘\nCommand für Admins: 🔴\n[muss man nicht angeben]\n{muss man angeben}\n(mehrere möglichkeiten/mehr als eine möglichkeit)`)
            
            .addField(`🔵${config.prefix}help`,"Zeigt diese Message an\nbsp: ` " + config.prefix + "help`" + `\nDieser Command wurde ${db.get(`bot.commands.help.howoftenuse`) + 1} mal benutzt`, true)
            .addField(`🔵${config.prefix}rank`,"Zeigt deinen aktuellen Rank und deine aktuellen XP an\nbsp: ` " + config.prefix + "rank [@user#1234]`" + `\nDieser Command wurde ${db.get(`bot.commands.rank.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}payrank`,"Überweißt einen anderem Member Level` " + config.prefix + "payrank [@user#1234] [how much]`" + `\nDieser Command wurde ${db.get(`bot.commands.payrank.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}play`,"Spielt einen Song in einem Voicechannel von Youtube ab oder fügt einen Song zu Server Queue hinzu\nbsp: ` " + config.prefix + "play {link}`" + `\nDieser Command wurde ${db.get(`bot.commands.play.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}skip`,"Überspringt einen Song in der Queue\nbsp: ` " + config.prefix + "skip`" + `\nDieser Command wurde ${db.get(`bot.commands.skip.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}lautstärke(${config.prefix}ls)`,"Stellt die Lautstärke des Bots ein. Normal lautstärke ist 0.5\nbsp: ` " + config.prefix + "ls {0.5}`" + `\nDieser Command wurde ${db.get(`bot.commands.skip.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}stop`,"Stoppt einen Song der vom Bot in einem Voicechannel abgespielt wird\nbsp: ` " + config.prefix + "{(dc/stop)}`" + `\nDieser Command wurde ${db.get(`bot.commands.dc.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}loop`,"Wiederhohlt denn aktuellen Song unabhänging was in der Queue ist\nbsp: ` " + config.prefix + "loop`" + `\nDieser Command wurde ${db.get(`bot.commands.loop.howoftenuse`)} mal benutzt`, true)
            .addField(`🔵${config.prefix}respawn`,"Du möchtest ein neues Leben auf diesem Server beginnen?\nbsp: `" + config.prefix + "respawn`", true)
            
            .addField(`🔘${config.prefix}voicekick`,"Kickt jemanden im selben Talk aus dem Voicechannel\nbsp: ` " + config.prefix + "voicekick {@user#1234}`" + `\nDieser Command wurde ${db.get(`bot.commands.voicekick.howoftenuse`)} mal benutzt`, true)
        
            .addField(`🔴${config.prefix}clear`,"Löscht bis zu 100 Messages aus einem Channel.\nbsp: ` " + config.prefix + "clear {zahl von 1 bis 100}`" + `\nDieser Command wurde ${db.get(`bot.commands.clear.howoftenuse`)} mal benutzt`, true)
            .addField(`🔴${config.prefix}warn`,"Erstellt eine Warnung für einen User\nbsp: ` " + config.prefix + "warn {@user#1234} {warn begründung}`", true)
            .addField(`🔴${config.prefix}setrank`,"Entfernt oder fügt xp oder Level bei einem User hinzu\nbsp: ` " + config.prefix + "setrank {@user#1234} {(rank/level)} {(+/-)} {zahl}`" + `\nDieser Command wurde ${db.get(`bot.commands.setrank.howoftenuse`)} mal benutzt`, true)
            ).then(m => setTimeout(() => {m.edit(new RichEmbed().setTitle("Command Page von diesem Bot").addField("Message in Sleep Mode", "Da diese Message viel Platz benötigt wird sie nach 30 Minuten bearbeitet"))
        }, 1800000))//
        
db.add(`bot.commands.help.howoftenuse`, 1)    
}
   
    
    
}
    

//next command here
})