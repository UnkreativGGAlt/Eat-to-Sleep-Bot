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

exports.client = client;
exports.config = config;

//Database connection
const mongoose = require("mongoose")
mongoose.connect(config.tokens.db,{ useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("Database connection active!")
    mongoose.set('useFindAndModify', false);
})



client.on("ready", () => {
    client.user.setActivity(`Codet by ${client.users.get("330380702505762817").tag}`, {type: "PLAYING"});
console.log(`\x1b[32m${client.user.tag}\x1b[33m is now online\x1b[37m`)
setInterval(function(){

    fs.readFile("./data/gamechange.txt", function(err, buf) {
        var Check = buf.toString()
        
    if (Check.startsWith("true")){
let statuses = [
    `Codet by ${client.users.get("330380702505762817").tag}`,
    client.guilds.get("585511241628516352").roles.get("585511864931188856").members.size + " Members on the Server",
    client.guilds.get("585511241628516352").roles.get("587375374967767054").members.size + " Bots on the Server",
    client.guilds.get("585511241628516352").roles.size + " Roles on the Server",
    client.guilds.get("585511241628516352").emojis.size + " Emotes on the Server",
    "Botversion: " + config.version,
    "Bot Ping: " + Math.round(client.ping),
    `${config.prefix}help`,
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
    
    if (!client.commands.has(alias)) return;

    try {
        client.commands.get(alias).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Ein Fehler ist beim ausführen des Commands aufgetreten');
    }

})




require("./events/music")

require("./events/welcome-join")
require("./events/welcome-check")
require("./events/warn")
require("./events/splatoon-stages")




//Levelsystem
 require("./events/levelsystem/collectxp")
 require("./events/levelsystem/xp-commands")
//require("./events/levelsystem/xp-rewards")
require("./events/levelsystem/ranking-list")

//Webserver
require("./webserver/webmain")


// client.on("ready", () => {
//         var oldrepeat = {"xp":{"330380702505762817":{"balance":43},"419227063652974592":{"balance":49},"290580482607939585":{"balance":4},"413759870333091884":{"balance":37},"234395307759108106":{"balance":14},"585521607875756042":{"balance":47},"149488625585750017":{"balance":0},"302782616665325568":{"balance":42},"160116740322361345":{"balance":8},"449580126745919491":{"balance":33},"492764744944582670":{"balance":0},"450339928015110154":{"balance":0},"351801877115043842":{"balance":32},"465155899154104321":{"balance":6},"262215064432410624":{"balance":20},"332220235568644098":{"balance":0},"400395659527585804":{"balance":0},"364118656692781056":{"balance":16},"198451943172079616":{"balance":6},"339021471168987137":{"balance":19},"448177403890630656":{"balance":0},"447826021773737999":{"balance":58},"179254970476920833":{"balance":40},"492764704423542816":{"balance":0},"292671370100342794":{"balance":44},"464052074804412417":{"balance":39},"164303447456350208":{"balance":43},"240850527804588032":{"balance":0},"386490504277393408":{"balance":0},"610052042773364756":{"balance":2},"610047081335357440":{"balance":0},"618792417310670867":{"balance":53},"611404000860045345":{"balance":18},"404036305392107531":{"balance":58},"617823109214371869":{"balance":-1e+34},"366552743034355713":{"balance":18},"624947390821957652":{"balance":-1e+34},"403977358899544074":{"balance":13},"261973915155300352":{"balance":24},"464848298604232714":{"balance":32},"629768116955512857":{"balance":47},"532438635568562176":{"balance":51},"273897973413314560":{"balance":0},"613789090403450890":{"balance":0},"452093816309153802":{"balance":0},"399931765994684417":{"balance":0},"513096941693960223":{"balance":-1e+34}},"level":{"330380702505762817":{"balance":135},"419227063652974592":{"balance":187},"413759870333091884":{"balance":249},"234395307759108106":{"balance":0},"149488625585750017":{"balance":0},"302782616665325568":{"balance":0},"160116740322361345":{"balance":0},"585521607875756042":{"balance":3},"449580126745919491":{"balance":26},"492764744944582670":{"balance":0},"450339928015110154":{"balance":0},"351801877115043842":{"balance":2},"465155899154104321":{"balance":349},"262215064432410624":{"balance":35},"332220235568644098":{"balance":0},"400395659527585804":{"balance":0},"364118656692781056":{"balance":158},"198451943172079616":{"balance":0},"339021471168987137":{"balance":19},"448177403890630656":{"balance":0},"447826021773737999":{"balance":8},"179254970476920833":{"balance":9},"492764704423542816":{"balance":0},"292671370100342794":{"balance":0},"464052074804412417":{"balance":14},"164303447456350208":{"balance":0},"290580482607939585":{"balance":2},"240850527804588032":{"balance":0},"386490504277393408":{"balance":0},"610047081335357440":{"balance":0},"618792417310670867":{"balance":7},"611404000860045345":{"balance":6},"404036305392107531":{"balance":0},"617823109214371869":{"balance":-1e+34},"366552743034355713":{"balance":0},"624947390821957652":{"balance":-1e+34},"403977358899544074":{"balance":2},"261973915155300352":{"balance":1},"464848298604232714":{"balance":1},"629768116955512857":{"balance":1},"532438635568562176":{"balance":2},"273897973413314560":{"balance":0},"613789090403450890":{"balance":0},"452093816309153802":{"balance":0},"399931765994684417":{"balance":0},"513096941693960223":{"balance":-1e+34}},"medials":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,true]}

// client.guilds.get("585511241628516352").members.forEach(m => {
//     if (!oldrepeat.level[m.id] || !oldrepeat.xp[m.id]){return;}
//         var newentry = new MEMBER({
//             info:{
//                 id: m.id
//             },
//             ranks: {rank: oldrepeat.level[m.id].balance,
//                     xp: oldrepeat.xp[m.id].balance}
//        })
//        console.log(newentry)
//        newentry.save()
    
// })
// }) 




client.login(config.tokens.discord)