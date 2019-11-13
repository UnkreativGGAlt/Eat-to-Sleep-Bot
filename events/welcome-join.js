const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
var fs = require(`fs`);

const MEMBER = require("../models/MEMBER")

var Member = {}
exports.member = Member

client.on("message",async message => {
    if (message.content == "_respawn"){
        message.member.roles.forEach(role => {
            message.member.removeRole(role)
        })
        await MEMBER.findOneAndDelete({"info.id": message.member.id}, () => {
            client.emit("guildMemberAdd", message.member)
            message.delete()
        })
    }
    
})
const invites = {};
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


client.on("guildMemberAdd", async (member) => {
    if (!member.user.bot && member.guild.id == "585511241628516352"){
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
            
            
        

    //////////////////Invite Cache
// To compare, we need to load the current invite list.
    member.guild.fetchInvites().then(async guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.find(channel => channel.name === "join-logs");
    // A real basic message with the information we need. 
  
    ///////////////////////////////
    
    var memberdb = await MEMBER.find({"info.id": member.id})
    if (!memberdb[0]){
          var newmember = new MEMBER({
             info:{
                 id: member.id,
                 name: member.user.tag,
                 invitedby: inviter.id
             }
        })
        console.log(newmember)
        newmember.save()
    }
    else{
        var againhereembed = new RichEmbed().setTitle("By the Way. Welcome zurück ^^").setColor("RANDOM").setDescription("Wir freuen uns das du wieder da bist. Deine Daten in der Database sind selbstverständlich noch da")
        .addField("Deine Ränge:", `Level: ${memberdb[0].ranks.rank}\nxp: ${memberdb[0].ranks.rank}`)
        if (memberdb[0].warns){
            memberdb[0].warns.forEach(warn => {
                againhereembed.addField("VERWARNUNG: " + warn.description, `type: ${warn.type}`)
            })
        }
        if (member.guild.members.find(m => m.id === memberdb[0].info.invitedby)){
            againhereembed.addField("Eingeladen von:", `<@${memberdb[0].info.invitedby}>`)
        }
    channel.send(againhereembed)
    }
});
})
}

})

client.on('messageReactionAdd',async (messageReaction, user) => {
    var memberdb = await MEMBER.findOne({"info.id": user.id})
    if (messageReaction.message.guild.id != "585511241628516352"){return;}
    if (!Member[user.id] && messageReaction.message.channel.parentID != "585860916512423967"){return}
    if (messageReaction.emoji == "✅" && user.bot == false){
        console.log("Right")

        try {
        var guild = messageReaction.message.guild

            
        var NMember = messageReaction.message.guild.members.get(user.id)
    
        guild.channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`<@${NMember.id}` + "> ist gerade Eat, Sleep, Nintendo, Repeat beigetreten").setFooter(`von ${messageReaction.message.guild.members.get(memberdb.info.invitedby).user.tag} eingeladen`, messageReaction.message.guild.members.get(memberdb.info.invitedby).user.displayAvatarURL).setColor("RANDOM").setThumbnail(NMember.user.displayAvatarURL))
        NMember.addRole(guild.roles.get("585511864931188856"))
        
            
        client.user.setActivity(">>Willkommen " +NMember.user.username + "<<", {type: "PLAYING"});
        messageReaction.message.channel.delete()
        
        
        
} catch(err) {
  console.error(err)
}
}});


client.on("guildMemberRemove", (user) => {
    if (user.guild.id != "585511241628516352"){return;}
    client.guilds.get(user.guild.id).
    channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`${user.user.tag} hat gerade ${user.guild.name} verlassen`).setColor("RANDOM").setThumbnail(user.user.displayAvatarURL))

})