const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
var fs = require(`fs`);
var db = require("quick.db")



client.on('guildMemberAdd', (newmember) => {
    if (newmember.guild.id.startsWith("585511241628516352") && !newmember.user.bot){
            newmember.guild.createChannel(newmember.displayName).then(channel => {
                channel.replacePermissionOverwrites({
                    overwrites: [
                        {
                            id: client.guilds.get("585511241628516352").defaultRole.id,
                            deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
                        },
                        {   id: client.guilds.get("585511241628516352").roles.get("585511864931188856"),
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: newmember.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ],
                });
                
   const embed = new RichEmbed()
  .setColor(0x4cd137)
  .setThumbnail(newmember.guild.iconURL)
  .setTitle("Hey " + newmember.user.username)
  .setDescription(
      "Hey und Willkommen auf " + newmember.guild.name + "! Bitte ließ dir kurz die Regeln durch:\n\n" +
    "**Allgemeine Regeln**\n" +
   "-Treten, Schlagen und Prügeln nur wenn der Lehrer weg schaut!\n" + 
   "-Keine ersthaften Beleidigungen\n" + 
   "-Keine Diskriminierung in jeglichen sinne!\n"+
    "-Kein Spamen\n"+ 
    "-Das senden von schädlichen Inhalten für Hardware oder Software ist zu unterlassen\n" +
   "-Rechnet damit das ihr, wenn ihr in falsche Channel schreibt eure Nachichten gelöscht werden. Allerdings sehen wir das jetzt nicht soo streng\n" +
    "Haltet euch an die [Discord Nutzervereinbarung](https://discordapp.com/guidelines) und an die [Discord Lizenzvereinbarung](https://discordapp.com/terms)")
  .setFooter("Indem du die Regeln akzeptierst bekommst du zugriff auf weitere Teile des Servers. Dazu musst du nur \"✅\" als Reaktion auf diese Nachicht hinzufügen. Solltest du die Regeln nach 48 Stunden immernoch nicht akzeptiert haben wirst du gekickt!")
  channel.send(embed)
  channel.setParent(newmember.guild.channels.get("585860916512423967")).then(
  function react1(){
    channel.lastMessage.react("✅")
    setTimeout(react1, 3000)  
}
  
            )

  fs.writeFile("data/welcome/" + channel.id + ".txt", newmember.id, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
  db.set(`member.xp.${newmember.id}.balance`, 0)
  db.set(`member.level.${newmember.id}.balance`, 0)


            })



}
if (newmember.user.bot){
    db.set(`member.xp.${newmember.id}.balance`, -9999999999999999999999999999999999)
  db.set(`member.level.${newmember.id}.balance`, -9999999999999999999999999999999999)
  newmember.addRole(newmember.guild.roles.get("587375374967767054"))
}
});