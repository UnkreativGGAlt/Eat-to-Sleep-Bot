const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
var schedule = require('node-schedule');
const Main = require('../index.js')
var fs = require(`fs`);

const MEMBER = require("../models/MEMBER")

var Member = {}
exports.member = Member

const invites = {};
const wait = require('util').promisify(setTimeout);

////////////////////////////
//INVITE MENAGEMENT
client.on('ready', () => {

    var k = schedule.scheduleJob("*/20 * * * * *",async function(){
        client.guilds.forEach(g => {
          g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
          });
        });
      });
        
      })
////////////

/////New Member -> Add Channel, send Message with Rules, (Welcome Back)
client.on("guildMemberAdd", async (member) => {
setTimeout(() => {    if (!member.user.bot && member.guild.id == "585511241628516352"){
    member.guild.createChannel(member.user.username, "text").then(async channel => {

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

        var rules = ""
        await channel.guild.channels.get("585859881123184645").fetchMessage("596431765359296522").then(rulemessage => {
        rules = rulemessage.cleanContent 
        })


        channel.send(
            new RichEmbed()
            .setColor(0x4cd137)
.setThumbnail(member.guild.iconURL)
.setTitle("Hey " + member.user.username)
.setDescription(
  "Hey und Willkommen auf " + member.guild.name + "! Bitte ließ dir kurz die Regeln durch:\n\n" + rules.replace("Discord Nutzervereinbarung", "[Discord Nutzervereinbarung](https://discordapp.com/guidelines)").replace("Discord Lizenzvereinbarung" , "[Discord Lizenzvereinbarung](https://discordapp.com/terms)") + "\n\n Hmm. Was gibts noch zu sagen...\nNichts?\nWorauf wartest du dann noch? Drück auf das ✅ um die Regeln zu akzeptieren!")
.setFooter("Um die Regeln zu akzeptiren, drücke auf das >✅<. Dann bekommst du Zugriff auf weitere Teile des Servers.")
        ).then(message => message.react("✅"))

        Member[member.id] = {"channel": channel, "acceptet": false, "memberid": member.id}
        exports.member = Member
        
        
    

//////////////////Invite Cache
// To compare, we need to load the current invite list.
member.guild.fetchInvites().then(async guildInvites => {
    var inviter
    try {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
        inviter = client.users.get(invite.inviter.id);
    } catch (error) {
        console.log(error)
        inviter = false
    }


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
    .addField("Deine Ränge:", `Level: ${memberdb[0].ranks.rank}\nxp: ${memberdb[0].ranks.xp}`)
    if (memberdb[0].warns){
        memberdb[0].warns.forEach(warn => {
            againhereembed.addField("VERWARNUNG: " + warn.description, `type: ${warn.type}`)
        })
    }
    if (memberdb[0].info.invitedby != false || member.guild.members.find(m => m.id === memberdb[0].info.invitedby)){
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

    

    try {
    var guild = messageReaction.message.guild

        
    var NMember = messageReaction.message.guild.members.get(user.id)
    NMember.addRole(guild.roles.get("585511864931188856"))
    messageReaction.message.channel.delete()

    var joinedembed = new RichEmbed().setDescription(`<@${NMember.id}` + "> ist gerade Eat, Sleep, Nintendo, Repeat beigetreten")
    .setColor("RANDOM")
    .setThumbnail(user.displayAvatarURL)

   
    if (memberdb.info.invitedby != false && client.guilds.get("585511241628516352").members.find(x => x.id === memberdb.info.invitedby)){
        joinedembed.setFooter(`von ${messageReaction.message.guild.members.get(memberdb.info.invitedby).user.tag} eingeladen`, messageReaction.message.guild.members.get(memberdb.info.invitedby).user.displayAvatarURL)
         }
  

    guild.channels.find(x => x.name === "willkommen").send(joinedembed)

        
    client.user.setActivity(">>Willkommen " +NMember.user.username + "<<", {type: "PLAYING"});
    
    
    
    
} catch(err) {
console.error(err)
}
}}, 3000)
});


client.on("guildMemberRemove", (user) => {
    if (user.roles.has("585511864931188856") == false){return;}
    if (user.guild.id != "585511241628516352"){return;}
    client.guilds.get(user.guild.id).
    channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`${user.user.tag} hat gerade ${user.guild.name} verlassen`).setColor("RANDOM").setThumbnail(user.user.displayAvatarURL))

})