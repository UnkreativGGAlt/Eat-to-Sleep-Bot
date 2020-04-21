const { client, config, database} = require('../../index')
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');
const mongoose = require("mongoose")
const { rewards } = require("./xp-rewards")
const MEMBER = require("../../models/MEMBER")

client.cooldown = []
exports.messagexp = async function messagexp(message) {
    if (client.cooldown.find(x => x == message.member.id)) return;
    if (message.member.user.presence.status == "offline") return;
    client.cooldown.push(message.member.id)
    var random_xp = Math.floor(Math.random() * 6) + 1
 
            var memberdbdata = await MEMBER.findOne({"info.id": message.member.id})
            var data = {rank: memberdbdata.ranks.rank, xp: memberdbdata.ranks.xp + random_xp}
            if  (data.xp > 59){data.xp = 0, data.rank += 1, await message.react("🔺")}

            await MEMBER.findOneAndUpdate({"info.id": message.member.id}, {"ranks.xp": data.xp, "ranks.rank": data.rank}, (err, res) => {if (err){console.log(err)}})
            setTimeout(() => {
                const index = client.cooldown.indexOf(message.member.id);
                if (index > -1) {
                client.cooldown.splice(index, 1);
}
            }, 20000)
}


var voicexp = schedule.scheduleJob("0 * * * * *",async function(){
    console.log("console channel check")
    client.channels.filter(channel => channel.type === "voice").forEach(channel => {
        var illegalvoicechannels = ["597044120384700419", "586178611644596225"]
        if (illegalvoicechannels.filter(f => f === channel.id).length == 1) return; //member is in an channel where he cant collect xp
        if (channel.members.array().length < 2) return; //member alone in voicechannel
        var bots_in_talk = channel.members.filter(m => m.user.bot == true).array().length
        if (bots_in_talk > channel.members.array().length - bots_in_talk || bots_in_talk == channel.members.array().length - bots_in_talk) return; //member is alone with an bot
        
        console.log("console member check")
        channel.members.array().forEach(async member => {
            if (member.user.bot) return;
             if (member.selfMute || member.serverMute) return;
             if (member.selfDeaf || member.serverDeaf) return;
             if (member.user.presence.status == "offline") return;
            var memberdbdata = await MEMBER.findOne({"info.id": member.id})
            var data = {rank: memberdbdata.ranks.rank, xp: memberdbdata.ranks.xp + 1}
            if  (data.xp > 59){data.xp = 0, data.rank += 1}

            await MEMBER.findOneAndUpdate({"info.id": member.id}, {"ranks.xp": data.xp, "ranks.rank": data.rank}, (err, res) => {if (err){console.log(err)}})

        })

    })


})

