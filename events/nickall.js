const { client, config} = require('../main')
const { RichEmbed } = require('discord.js')
const Main = require('../main')
const fs      = require("fs");

client.on('messageReactionAdd', (messagereaction, member) => {
   //Check if the Splatfest is not endet
   let maindata = fs.readFileSync(`../data/maininfo.json`);


});