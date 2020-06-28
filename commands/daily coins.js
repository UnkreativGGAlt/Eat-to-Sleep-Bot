const MEMBER = require('../models/MEMBER');
const { findByIdAndUpdate } = require('../models/DAILY COINS');

module.exports = {
	name: 'daily',
	description: 'Gibt dir aller 24 Stunden 150 Coins',
    usage: `daily` ,
	async execute(message, args) {
       

        const { client, config} = require('../index')
        const { RichEmbed } = require('discord.js')
        const colour = require("../colours.json")

        var dailyDB = require("../models/DAILY COINS")
        var memberdb = require("../models/MEMBER")

        var memberdata = await memberdb.findOne({"info.id": message.member.id})
        
        var already_clamied = await dailyDB.find({"user": message.member.id})
        if (already_clamied.length > 0) return message.channel.send(new RichEmbed().setColor(colour.rot).setDescription("Du hast deine letzte tägliche Belohnung bereits innerhalb der letzten 24 Stunden abgehohlt"))
    
        await new dailyDB({user: message.member.id}).save()
        await memberdb.findOneAndUpdate({"info.id": message.member.id}, {"coins.amount": memberdata.coins.amount + 150})
        message.channel.send(new RichEmbed().setColor(colour.grün).setDescription("Dir wurden 150<:EatSleepCoin:725823305008939058> gutgeschrieben"))
    },
};