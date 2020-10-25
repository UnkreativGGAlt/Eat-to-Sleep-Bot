const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')

//Channel Model
const welcomechannel = require("../models/WELCOMECHANNEL")
const MEMBER = require("../models/MEMBER")


client.on("guildMemberAdd",async (user) => {

    if (user.user.bot) return user.addRole("587375374967767054")
    var MemberfromDB = await MEMBER.find({"info.id": user.id})

    //New Member
    if (MemberfromDB.length == 0){

    user.guild.createChannel(user.displayName, "text", [
		{id: user.guild.defaultRole.id,deny: ['VIEW_CHANNEL'],},
		{id: user.id, allow: ['VIEW_CHANNEL'], deny: ["SEND_MESSAGES"],},
    ],).
    then(async channel => {

        channel.setParent("585860916512423967")
            //fetch rules
            var rules = ""
            var rulemsg = channel.send(new RichEmbed().setColor("#00cec9").setTitle("Schau dir mal die Regeln an.").setDescription("```Einen Moment bitte. Ich lade die Regeln herunter... ^^```"))


            user.guild.channels.get("585859881123184645").fetchMessage("596431765359296522").then(m => rules = m.content.replace("Discord Nutzervereinbarung", "[Discord Nutzervereinbarung](https://discordapp.com/terms)"))
            rulemsg.then(m => m.edit(new RichEmbed().setColor("#00cec9").setTitle("Schau dir mal die Regeln an.").setDescription(rules)))
    })
}
    //Rejoined Member
    else {

        async function dosomethingforyourmonay(){

       await MEMBER.findOneAndUpdate({"info.id": user.id}, {"expire": undefined})}
        dosomethingforyourmonay()
        user.guild.channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`<:rejoin:723487019241701477> **${user.user.tag}** ist gerade Eat, Sleep, Nintendo, Repeat beigetreten\n**Willkommen zurück^^**`)
            .setColor("RANDOM")
            .setThumbnail(user.user.displayAvatarURL))
            user.guild.members.get(user.id).addRole("585511864931188856")
    }
})

client.on("messageReactionAdd",async (Reaction, User) => {
    if (Reaction.message.channel.parentID != "585860916512423967") return;
    if (Reaction.emoji.name != "✅") return;
    if (User.bot) return
    var channel = welcomechannel.findOne({"ChannelID": Reaction.message.channel.id})

        var messages = Reaction.message.channel.fetchMessages({limit: 10}).then(m => Reaction.message.channel.bulkDelete(m))

        Reaction.message.channel.send(new RichEmbed().setColor("#55efc4").setTitle("**Wir bereiten deine Ankunft vor:**")
        .setDescription("Bitte warte einen kurzen Moment"))

        
        new MEMBER({
            info:{
                id: User.id,
                name: User.tag
            },
        }).save()
       
        .then(
            
            Reaction.message.guild.channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`<:join:723485426144378913> **${User.tag}**` + " ist gerade Eat, Sleep, Nintendo, Repeat beigetreten")
            .setColor("RANDOM")
            .setThumbnail(User.displayAvatarURL)).then(
                welcomechannel.findOneAndDelete({"ChannelID": Reaction.message.channel.id})
            )
        )
        setTimeout(() => {
            Reaction.message.guild.members.get(User.id).addRole("585511864931188856").then(
                Reaction.message.channel.delete()
            )
        }, 6000)
        
})


client.on("guildMemberRemove", async (user) => {
    if (user.roles.has("585511864931188856") == false){
        if (await welcomechannel.find().length != 1) return;
        var channelid = await welcomechannel.findOne({"MemberID" : user.id}).ChannelID
        if (client.channels.find(channelid)){client.channels.find(channelid).delete()}
    }
    if (user.guild.id != "585511241628516352") return;
    client.guilds.get(user.guild.id).
    channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`<:leafe:723485426169413686> **${user.user.tag}** hat gerade ${user.guild.name} verlassen`).setColor("RANDOM").setThumbnail(user.user.displayAvatarURL))
    
    await MEMBER.findOneAndUpdate({"info.id": user.user.id}, {"expire": Date.now()})
})