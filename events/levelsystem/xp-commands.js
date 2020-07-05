const { client, config} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
const Discord = require('discord.js');

const MEMBER = require("../../models/MEMBER")


client.on("message", async message => {

    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    

    if (message.content.startsWith(prefix)){
    if (client.guilds.get("585511241628516352").roles.get("712830005452865566").members.find(m => m.id === message.author.id)) return;
 
        if (alias == "setrank"){
            if (client.guilds.get(message.channel.guild.id).members.get(message.author.id).hasPermission("BAN_MEMBERS")){
            var operation = args[2]
            var what = args[1]
            var zahl = parseInt(args[3])
            var userid = args[0].replace("<@", "").replace(">", "").replace("!", "")
           

            if (message.channel.guild.members.find(x => x.id === userid)){
                if(operation == "+" || operation == "-"){
                    var member = await MEMBER.find({"info.id": userid})

                    let rank = member[0].ranks.rank
                    let xp = member[0].ranks.xp


                    if (what == "xp" || what == "level" || what == "rank"){
                        if (what == "rank"){what = "level"}
                        if (what == "level"){
                            if (operation == "+"){rank += zahl}
                            if (operation == "-"){rank -= zahl}
                        }
                        if (what == "xp"){
                            if (operation == "+"){xp += zahl}
                            if (operation == "-"){xp -= zahl}
                        }
                        await MEMBER.findOneAndUpdate({"info.id": userid}, {"ranks.xp": xp, "ranks.rank": rank}, (err, res) => {if (err){console.log(err)}})

                        message.reply("Ich habe erfolgreich denn ranking Wert von " + client.users.get(userid).username + " auf " + rank + ":" + xp + " gesetzt.")

                    }
                    else {message.reply("Du kannst nur denn Wert von XP und Level bestimmen")}
                    
                }
                else {message.reply("Du kannst nur + oder - machen")}
            }
            else {message.reply("Kann User nicht finden")}
        }
        else (message.reply("Du hast keine Berechtigung dafür"))
    }
    
    if (alias == "payrank"){
        
        if (!args[0] || !args[1]){
            message.channel.send(
                new RichEmbed().setColor(colour.rot).setTitle("Ehhh")
                .setDescription("Du hast da was falsch gemacht. Lass mich dir helfen```" + config.prefix + "payrank @user#1234 5```Dieser Command würde dem User 5 Level von deinem Konto auf seins übergeben")
            )
    return;}
        if (args[0] && client.users.find(x => x.id == args[0].replace("<@", "").replace(">", "").replace("!", ""))){
            
            const oldm = message.author
            const newm = client.users.get(args[0].replace("<@", "").replace(">", "").replace("!", ""))
            const howmuch = parseInt(args[1])

           if (oldm.id == newm.id) return message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").setDescription("Du kannst nicht an dich selber überweisen.")))                


            var member = await MEMBER.find({"info.id": oldm.id})

                    let rank = member[0].ranks.rank
                    let xp = member[0].ranks.xp

                    var nmember = await MEMBER.find({"info.id": newm.id})

                    let nrank = nmember[0].ranks.rank
                    let nxp = nmember[0].ranks.xp

            if(rank < howmuch){
            message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").addField("Dein Guthaben reicht leider nicht aus", "Sorry. Wir konnten den Nutzer leider nicht die angegebene Summe überweisen da du nicht genügend Level hast"))                
            return;
            }
            
            message.channel.send(
                new RichEmbed().setTitle("Überweisungs wird ausgeführt...").setDescription("Die Überweisung wird in Kürze ausgeführt, nachdem sie vom Banksystem verifiziert wurde")
                ).then(m => {
                    if(howmuch < 1){
                        m.edit(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").addField("Diese Aktion wurde von der Bank abgebrochen", "Der Grund dafür ist unbekannt"))                
                        return;
                    }

                    rank = rank - howmuch
                    nrank = nrank + howmuch
                   async function die() {

                    await MEMBER.findOneAndUpdate({"info.id": oldm.id}, {"ranks.rank": rank}, (err, res) => {if (err){console.log(err)}})
                    await MEMBER.findOneAndUpdate({"info.id": newm.id}, {"ranks.rank": nrank}, (err, res) => {if (err){console.log(err)}})
                }
                die()

                   setTimeout(() => {m.edit(new RichEmbed().setColor(colour.blau).setTitle("Überweisungs wurde ausgeführt").setDescription("Die Überweisung war erfolgreich und wurde ausgeführt"))}, 5000)
                }
            )

                    
            

        }
        else {
            message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Die Eat Sleep Bank hat geantwortet").addField("Member nicht gefunden", "Sorry. Wir konnten den Nutzer nicht finden auf dem wir das Geld überweißen sollen. Also haben wir es einfach abgezogen lol. Das war natürlich ein Spaß Kappa, Kappa"))
        }
    }

    
}   
    
})
