process.env.TZ = 'Europe/Berlin'
const colour = require("./colours.json")
const fs      = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
var request = require('request');

const Discord = require("discord.js");
const { RichEmbed } = require('discord.js')


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.music = {}

exports.client = client;
exports.config = config;

client.on("ready", async () => {
require("./events/splatfest")

    client.user.setActivity(`low mode`, {type: "PLAYING"});
console.log(`\x1b[32m${client.user.tag}\x1b[33m is now online\x1b[37m`)

});

//Command Parser
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
    console.log("Found an command => " + command.name)
}

client.on("message", (message) => {
   
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let alias = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (message.content.startsWith(prefix) == false) return require("./events/levelsystem/collectxp").messagexp(message);
    if (message.content.startsWith(prefix)) return message.reply("Der Bot läuft aktuell auf einem anderen Server. Daher sind so gut wie alle commands und funktionen des Bots deaktiviert bis der Dustins Main Server wieder funktioniert.");


})




//require("./events/music")

require("./events/welcome")
require("./events/splatoon-stages")
require("./events/React-to-older-Messages")
require("./events/invitetracker")

require("./events/channel-management/CM-config")


client.login(config.tokens.discord)
