const colour = require("./colours.json")
const fs      = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
var request = require('request');

const Discord = require("discord.js");
const { RichEmbed } = require('discord.js')

//var db = require("quick.db")
const ytdl = require('ytdl-core');
//const db = require("quick.db")

const client = new Discord.Client();
const bot = client;



exports.client = client;
exports.config = config;



// client.on("ready", () => {

//     db.add(`bot.start.howoften`, 1)
//     client.user.setActivity("Made by Dustin_DM#0759", {type: "PLAYING"});
// console.log(`\x1b[32m${bot.user.tag}\x1b[33m is now online\x1b[37m`)

// console.log('\n');
// console.log(`\t${"\x1b[36m"}╦    ┬ ┬┌─┐┬  ┬┌─┐    ┌─┐    ┌┐ ┌─┐┬ ┬┌─┐┬─┐┬┌─┐┌┐┌┌┬┐`);
// console.log(`\t${"\x1b[32m"}║    ├─┤├─┤└┐┌┘├┤     ├─┤    ├┴┐│ │└┬┘├┤ ├┬┘│├┤ │││ ││`);
// console.log(`\t${"\x1b[31m"}╩    ┴ ┴┴ ┴ └┘ └─┘    ┴ ┴    └─┘└─┘ ┴ └  ┴└─┴└─┘┘└┘─┴┘`);
// console.log('\n');
// console.log(`\x1b[32m${bot.user.tag}\x1b[33m is now online\x1b[37m`)
// setInterval(function(){

//     fs.readFile("./data/gamechange.txt", function(err, buf) {
//         var Check = buf.toString()
        
//     if (Check.startsWith("true")){
// let statuses = [
//     "Made by Dustin_DM#0759",
//     client.guilds.get("585511241628516352").roles.get("585511864931188856").members.size + " Members on the Server",
//     client.guilds.get("585511241628516352").roles.get("587375374967767054").members.size + " Bots on the Server",
//     client.guilds.get("585511241628516352").roles.size + " Roles on the Server",
//     client.guilds.get("585511241628516352").emojis.size + " Emotes on the Server",
//     "Botversion: " + config.version,
//     "Bot Ping: " + Math.round(client.ping),
//     `${config.prefix}help`,
//     `Bot reboots: ${db.get(`bot.start.howoften`)}`                              
// ]

// let status = statuses[Math.floor(Math.random() * statuses.length)];
// client.user.setActivity(status, {type: "PLAYING"});}
//     })

// }, 30000)
// }); //Game

client.on("ready", () => {
    if(client.guilds.get("585511241628516352").members.get("330380702505762817").voiceChannel != null){
        client.guilds.get("585511241628516352").members.get("330380702505762817").voiceChannel.join().then(connection => {
            
           var dispatcher = connection.playArbitraryInput(ytdl(
                "https://www.youtube.com/watch?v=7nQ2oiVqKHw",
                { filter: 'audioonly', quality: "highestaudio" }));

                dispatcher.on("end", () => {
                    connection.disconnect()
                })
            
          })
    }
})




require("./commands/music")
// require("./commands/clear")
// require("./commands/voicekick")
// require("./commands/help")
// require("./commands/say")
require("./commands/restart")

// require("./events/welcome-join")
// require("./events/welcome-check")
// require("./events/splatoon-stages")
// require("./events/warn")



// //Levelsystem
// require("./events/levelsystem/collectxp")
// require("./events/levelsystem/xp-commands")
// require("./events/levelsystem/xp-rewards")

// //Webserver
const Websocket = require("./webserver/webinterfacemain")
var WS = new Websocket("1234", 6677, client)


 




bot.login(config.tokens.discord)