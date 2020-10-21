const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')


//Channel Model


client.on("guildMemberAdd",async (user) => {
    if (user.user.bot) return user.addRole("587375374967767054")
    else return user.addRole("585511864931188856")
})


client.on("guildMemberRemove", async (user) => {
    if (user.roles.has("585511864931188856") == false){

    }
    if (user.guild.id != "585511241628516352") return;
    channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`<:leafe:723485426169413686> **${user.user.tag}** hat gerade ${user.guild.name} verlassen`).setColor("RANDOM").setThumbnail(user.user.displayAvatarURL))

})