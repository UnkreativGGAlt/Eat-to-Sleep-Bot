process.env.TZ = 'Europe/Berlin'
const colour = require("./colours.json")
const fs      = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
var request = require('request');
const MEMBER = require("./models/MEMBER")

const Discord = require("discord.js");
const { RichEmbed } = require('discord.js')


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.shop_items = new Discord.Collection();
client.music = {}

exports.client = client;
exports.config = config;


//Database connection
const mongoose = require("mongoose")
mongoose.connect(config.tokens.db,{ useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Database connection active!")
    mongoose.set('useFindAndModify', false);
})


client.on("ready", async () => {
require("./events/splatfest")
require("./events/shop-system")
    //Check for old Members
    var MEMBER = require("./models/MEMBER")
    var memberdata = await MEMBER.find()
    memberdata.forEach(async m => {
        if (m.expire){}
        else if (client.guilds.get("585511241628516352").members.find(mm => m.info.id === mm.id)){}
        else {await MEMBER.findOneAndUpdate({"info.id": m.info.id}, {"expire": Date.now()}).then()
        channels.find(x => x.name === "willkommen").send(new RichEmbed().setDescription(`${m.info.name} hat uns heimlich verlassen als ich nicht hingeschaut habe\n\`Puh... Das wird mir bestimmt vom Gehalt abgezogen\``).setColor("RANDOM").setThumbnail(m.picture))
    }
    })
  
    client.user.setActivity(`Im back`, {type: "PLAYING"});
console.log(`\x1b[32m${client.user.tag}\x1b[33m is now online\x1b[37m`)
setInterval(function(){

    fs.readFile("./data/gamechange.txt", function(err, buf) {
        var Check = buf.toString()
        
    if (Check.startsWith("true")){
let statuses = [
    `Codet by ${client.users.get("330380702505762817").tag}`,
    client.guilds.get("585511241628516352").roles.get("585511864931188856").members.size + " Members on " + client.guilds.get("585511241628516352").name,
    client.guilds.get("585511241628516352").roles.get("587375374967767054").members.size + " Bots on " + client.guilds.get("585511241628516352").name,
    client.guilds.get("585511241628516352").roles.size + " Roles on " + client.guilds.get("585511241628516352").name,
    client.guilds.get("585511241628516352").emojis.size + " Emotes on " + client.guilds.get("585511241628516352").name,
    "Bot Ping: " + Math.round(client.ping),
    `Need some Help? ${config.prefix}help`,
    `Written with Discord.js v.${Discord.version} in Javascript`,
    `Check my health: status.dustin-dm.de`,
    `Check out my Github! https://bit.ly/2vN6ufA`
]

let status = statuses[Math.floor(Math.random() * statuses.length)];
client.user.setActivity(status, {type: "PLAYING"});}
    })

}, 30000)

}); //Game



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
    if (message.content.startsWith(prefix) == false) return require("./events/collectxp").messagexp(message);
    if (!client.commands.has(alias)) return;
    if (client.guilds.get("585511241628516352").roles.get("712830005452865566").members.find(m => m.id === message.author.id)) return message.reply("Du kannst aktuell leider keine Commands benutzen");

    

    try {
        client.commands.get(alias).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Ein Fehler ist beim ausführen des Commands aufgetreten');
    }

})




//require("./events/music")

require("./events/welcome")
require("./events/warn")
require("./events/splatoon-stages")
require("./events/React-to-older-Messages")
require("./events/vote")
require("./events/Serverboosterlistener")
require("./events/invitetracker")

//Turnier
require("./events/Splatoon Turnier/register")
require("./events/Splatoon Turnier/check-in")

//Levelsystem
 require("./events/collectxp")
 require("./events/pushserver")

//
require("./events/channel-management/CM-config")
require("./events/usemyvoice")


//Webserver
require("./webserver/webmain")

client.login(config.tokens.discord)
