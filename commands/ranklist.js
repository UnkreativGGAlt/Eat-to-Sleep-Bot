module.exports = {
	name: 'ranklist',
        description: 'Schickt dir einen Link zum ansehen der Ranking List',
        usage: `ranklist`,
	execute(message, args) {

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")

        var dbdata = require("../models/MEMBER")

        async function doit(){
        var rankdata = await dbdata.find().sort({"ranks.rank": -1})
        var top10 = rankdata.slice(0, 9)

        var Embed = new RichEmbed().setTitle("Top 10 der Member Ränge")
        .setColor("RANDOM")

        var embeddescription = ""
        top10.forEach(u => {
        var name = client.users.get(u.info.id).tag
        if (rankdata.indexOf(u) == 0){name = "🥇" + name}
        else if (rankdata.indexOf(u) == 1){name = "🥈" + name}
        else if (rankdata.indexOf(u) == 2){name = "🥉" + name}
        else (name = rankdata.indexOf(u) + 1 + `. ${name}`)

        embeddescription = embeddescription + `**${name}**, Level: ${u.ranks.rank}\n`
        
        })
        var requestetduser = rankdata.find(u => u.info.id === message.member.id)
        var ranklistposition = rankdata.indexOf(requestetduser) + 1

        Embed.setDescription(embeddescription)
        Embed.setFooter(`${message.member.user.tag} ist auf Platz ${ranklistposition}`, message.member.user.avatarURL)

        message.channel.send(Embed)

        }
        doit()
        
	},
};
