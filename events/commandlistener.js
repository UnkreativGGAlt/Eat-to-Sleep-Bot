
const { client, config} = require('../main')
const { RichEmbed } = require('discord.js')
const Main = require('../main')
const fs      = require("fs");





client.on('message', (message) => {
let prefix = config.PREFIX;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);

let commandfile = client.commands.get(cmd.slice(prefix.lenght)) || client.commands.get(client.aliases.get(cmd.slice(prefix.lenght)))
if (commandfile) commandfile.run(client,message,args);


})