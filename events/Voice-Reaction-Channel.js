const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");

//Give permission to an Member who Connect to an Channel
client.on('voiceStateUpdate', (oldmember, newmember) => {
    if (!oldmember){
        
    }
});