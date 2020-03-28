// FIX LISTE

// Das Arrey für die antwoten ist ohne count.
// Das abrechen wenn bereits ein vote für diesen channel exsestiert funktioniert nicht
// Das Hochladen zur DB funktioniert aber die MSGID wird nicht hinzugefügt


module.exports = {
	name: 'vote',
	description: 'Erstellt/Beendet einen Vote',
    usage: `vote [create/start Question | Anwser 1 | Awnser 2 | Awnser 3 ...]/[end/remove]` ,
	execute(message, args) {
        

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")
        const VOTEDB = require("../models/VOTES")
        
        if (client.guilds.get(message.guild.id).members.get(message.author.id).hasPermission("ADMINISTRATOR")){

           async function createvote(){
            args = args.join(" ")
            const questionarrey = args.replace(`${config.prefix}vote `, "").replace("start ", ""). replace("create", "").split("|")
            const question = questionarrey[0]
            const awnsers = questionarrey.slice(1)
            awnsers.forEach(a => {
                awnsers[a]= a.count= 0
            })
           var checkvotes = await VOTEDB.find({channel: message.channel.id, open: true})
                console.log(checkvotes)
            if (checkvotes.lenth > 0){
                message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("In diesem Channel läuft bereits aktuell ein Vote. Bitte beende denn aktuellen und eröffne danach einen neuen"))
                return;
            }
            const embed = new RichEmbed().setTitle("**📝Abstimmung:** " + question)
            .setDescription("")
            .setColor("RANDOM")
            .setFooter("Du kannst mit den Reaktionen abstimmen!\nDu kannst nur eine Stimme abgeben!\nDu kannst deine Stimme nicht renommieren!")
            
            awnsers.forEach(a => {
                const number = awnsers.indexOf(a).toString().replace("1", ":two:").replace("2", ":three:").replace("3", ":four:").replace("4", ":five:").replace("5", ":six:").replace("6", ":sevem:").replace("7", ":seven:").replace("8", ":nine:").replace("0", ":one:")
                embed.setDescription(embed.description + `${number} ${a}: \`0 %\`\n\n`)
            })

             var msg = message.channel.send(new RichEmbed().setColor(colour.blau).setDescription("Vote wird erstellt... Bitte warten"))
            message.delete()

            new VOTEDB({q: question, a: awnsers, votet: [], creator: message.author.id, channel: message.channel.id}).save().then(() => {
                msg.then(m => {
                    m.edit(embed)
                    setTimeout(() => {
                    VOTEDB.findOneAndUpdate({q: question, a: awnsers, votet: [], creator: message.author.id, channel: message.channel.id}, {message: m.id})
                        
                    }, 5000);
                })
            })

            
            }



            if (args[0].startsWith("start") || args[0].startsWith("create")) {createvote()}
        }
        else {
            message.channel.send("Du hast leider nicht die Berrechtigungen um Abstimmungen zu erstellen")
        }

	},
};