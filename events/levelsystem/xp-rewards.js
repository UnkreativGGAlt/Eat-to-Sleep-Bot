const { client, config} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const MEMBER = require("../../models/MEMBER")
const fs      = require("fs");


exports.rewards = async function (db, member, rank){
if (rank > 99 && member.roles.has("619947670496215051") == false){
    member.addRole(member.guild.roles.get("619947670496215051").id)


    client.channels.get("586177035278483466").send(
        new RichEmbed()
        .setColor("#d4af37")
        .setTitle("Herzlichen Glückwunsch " + member.displayName + "#" + member.user.discriminator)
        .setDescription(member.displayName + " gehört nun zu denn wenigen Membern die 100 Stunden in einem Voice Channel auf diesem Server verbracht haben")
        .setFooter("Hier ein Cookie und eine Rolle")
        ).then(m => {m.react("🍪")})

}
}






