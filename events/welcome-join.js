const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
var fs = require(`fs`);
var db = require("quick.db")

var Member = {}
exports.member = Member

client.on("message", message => {
    if (message.content == "_respawn"){
        message.member.roles.forEach(role => {
            message.member.removeRole(role)
        })
        client.emit("guildMemberAdd", message.member)
    message.delete()
    }
    
})

client.on("guildMemberAdd", (member) => {
    if (!member.user.bot){
        member.guild.createChannel(member.user.username, "text").then(channel => {

            channel.replacePermissionOverwrites({
                overwrites: [
                    {
                        id: client.guilds.get("585511241628516352").defaultRole.id,
                        deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                    },
                    {   id: client.guilds.get(member.guild.id).roles.get("585511864931188856"),
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: member.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                ],
            });

           
            channel.setParent("585860916512423967")

            channel.send(
                new RichEmbed()
                .setColor(0x4cd137)
  .setThumbnail(member.guild.iconURL)
  .setTitle("Hey " + member.user.username)
  .setDescription(
      "Hey und Willkommen auf " + member.guild.name + "! Bitte ließ dir kurz die Regeln durch:\n\n" +
    "**Allgemeine Regeln**\n" +
   "-Treten, Schlagen und Prügeln nur wenn der Lehrer weg schaut!\n" + 
   "-Keine ersthaften Beleidigungen\n" + 
   "-Keine Diskriminierung in jeglichen sinne!\n"+
    "-Kein Spamen\n"+ 
    "-Das senden von schädlichen Inhalten für Hardware oder Software ist zu unterlassen\n" +
   "-Rechnet damit das ihr, wenn ihr in falsche Channel schreibt eure Nachichten gelöscht werden. Allerdings sehen wir das jetzt nicht soo streng\n" +
    "Haltet euch an die [Discord Nutzervereinbarung](https://discordapp.com/guidelines) und an die [Discord Lizenzvereinbarung](https://discordapp.com/terms)")
  .setFooter("Indem du die Regeln akzeptierst bekommst du zugriff auf weitere Teile des Servers. Dazu musst du nur \"✅\" als Reaktion auf diese Nachicht hinzufügen. Solltest du die Regeln nach 48 Stunden immernoch nicht akzeptiert haben wirst du gekickt!")
            ).then(message => message.react("✅"))

            Member[member.id] = {"channel": channel, "acceptet": false, "memberid": member.id}
            exports.member = Member
            
            db.set(`member.xp.${member.id}.balance`, 0)
            db.set(`member.level.${member.id}.balance`, 0)
        })
    }

    if (member.user.bot){
        db.set(`member.xp.${member.id}.balance`, -9999999999999999999999999999999999)
      db.set(`member.level.${member.id}.balance`, -9999999999999999999999999999999999)
      newmember.addRole(member.guild.roles.get("587375374967767054"))
    }


})
