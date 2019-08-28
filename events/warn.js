const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const colour = require("../colours.json")
const Main = require('../index.js')
const fs      = require("fs");

client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    let permissions = message.guild.members.get(message.author.id).permissions

    if (message.content.startsWith(prefix + "warn")){
        if(permissions.has("BAN_MEMBERS")){
            var badmemberid = args[0].replace("<@", "").replace(">", "").replace("!", "")
            var warngrund = message.content.replace(`${prefix}warn ${args[0]} `, "")
            
                var badmembers = JSON.parse(fs.readFileSync(`data/badmembers.json`))
            
            
                
              if (badmembers[message.author.id] == 1) {
                badmembers[message.author.id] = 2
                message.channel.send(new RichEmbed().setColor(colour.gelb).setTitle("Warnung gespeichert").setDescription(`Der Member <@${badmemberid}> hat eine Verwarnung wegen **${warngrund}** bekommen. Dies ist seine zweite Verwarnung!`))
                message.guild.channels.get("597165525319155749").send(new RichEmbed().setColor(colour.gelb).setTitle("Eine Verwarnung wurde erstellt")
                .addField("Verwarnter Member" ,`<@${badmemberid}>`, true)
                .addField("Angegebener grund", "- " + warngrund, true)
                .addField("Verwarnung ausgestellt von", `<@${message.author.id}>`, true)
                .addField("Jump to Message", `[Klick mich](${message.url})`,))

                var data4 = JSON.stringify(badmembers);
                fs.writeFileSync(`data/badmembers.json`, data4);

             }

             else if (badmembers[message.author.id] > 1) {
                badmembers[message.author.id] = 3
                message.channel.send(new RichEmbed().setColor(colour.rot).setTitle("Warnung gespeichert").setDescription(`Der Member <@${badmemberid}> hat eine Verwarnung wegen **${warngrund}** bekommen. Dies ist seine dritte Verwarnung!\nIch werde diesen nutzer nun vom Server entfernen`))
                message.guild.channels.get("597165525319155749").send(new RichEmbed().setColor(colour.gelb).setTitle("Eine Verwarnung wurde erstellt")
                .addField("Verwarnter Member" ,`<@${badmemberid}>`, true)
                .addField("Angegebener grund", "- " + warngrund, true)
                .addField("Verwarnung ausgestellt von", `<@${message.author.id}>`, true)
                .addField("Jump to Message", `[Klick mich](${message.url})`,))

                client.guilds.get(message.guild.id).members.get(badmemberid).ban({days: 0, reason: "Warn System: Member hatte die maximal Anzahl an Verwarnungen erreicht"})
                client.users.get(badmemberid).send(new RichEmbed().setTitle("Du wurdest von " + message.guild.name + " gebannt").setDescription("Der Grund dafür ist das du die Maximal Anzahl an Verwarnungen erreicht hast").addField("Grund der letzten Verwarnung", warngrund, true).addField("Du denkst der Grund der Verwarnung ist nicht gültig?", `Bitte nimm Kontakt mit mir über [Dustin@Dustin-DM.de](mailto:Dustin@Dustin-DM.de?subject=Ban report System Fehler) auf und wir finden eine Lösung`))

                var data4 = JSON.stringify(badmembers);
                fs.writeFileSync(`data/badmembers.json`, data4);

             }

            else{
                badmembers[message.author.id] = 1
                message.channel.send(new RichEmbed().setColor(colour.gelb).setTitle("Warnung gespeichert").setDescription(`Der Member <@${badmemberid}> hat eine Verwarnung wegen **${warngrund}** bekommen`))
                message.guild.channels.get("597165525319155749").send(new RichEmbed().setColor(colour.gelb).setTitle("Eine Verwarnung wurde erstellt")
                .addField("Verwarnter Member" ,`<@${badmemberid}>`, true)
                .addField("Angegebener grund", "- " + warngrund, true)
                .addField("Verwarnung ausgestellt von", `<@${message.author.id}>`, true)
                .addField("Jump to Message", `[Klick mich](${message.url})`,))

                var data4 = JSON.stringify(badmembers);
                fs.writeFileSync(`data/badmembers.json`, data4);
           
             }

        
        }
    }
    })
