var fetch = require('node-fetch');
var channelMclass = require("./channel-management/ChannelM-class")
var format = require('date-format');
const { RichEmbed } = require('discord.js')


var apiData = fetch('https://splatoon2.ink/data/festivals.json').then(res => res.json());
apiData.then(function (json) {
var splatfeststart = new Date( json.eu.festivals[0].times.start * 1000)
var splatfestend = new Date( json.eu.festivals[0].times.end * 1000)
var splatfestresult = new Date( json.eu.festivals[0].times.result * 1000)

var traslatehelp = fetch('https://splatoon2.ink/data/locale/de.json').then(res => res.json());
traslatehelp.then(function (jsonlang) {

var Splatfest = new channelMclass(
    splatfeststart, //start time
    splatfestend, //end time
    `Splatfest! ${jsonlang.festivals[json.eu.festivals[0].festival_id].names.alpha_short} vs ${jsonlang.festivals[json.eu.festivals[0].festival_id].names.bravo_short}`, //Event Name
    "Team Talk", // Talk Name ">>Talk<< 1", ">>Talk<< 2"
    "Splatfest Chat", //Text Channel Name
    new RichEmbed() //Embed wish will be send in the Text Channel 
    .setColor("RANDOM")
    .setImage("https://splatoon2.ink/assets/splatnet" + json.eu.festivals[0].images.panel)
    .setThumbnail("https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/9a/S2_Splatfest_Logo.svg/233px-S2_Splatfest_Logo.svg.png")
    .setTitle("Its Corn.. ähh Splatfest Time!")
    .setDescription(`Ein neues Splatfest hat begonnen! Das Thema lautet\n**${jsonlang.festivals[json.eu.festivals[0].festival_id].names.alpha_long}** \n:vs:\n**${jsonlang.festivals[json.eu.festivals[0].festival_id].names.bravo_long}**`)
    .addField("Zeitplan:", `Splatfest start: ${format.asString('dd.MM hh:mm', splatfeststart)} Uhr\nSplatfest ende: ${format.asString('dd.MM hh:mm', splatfestend)} Uhr\nErgebniss show of: ${format.asString('dd.MM hh:mm', splatfestresult)} Uhr`)
    .addField(`Splatfest-Map:`, `${jsonlang.stages[json.eu.festivals[0].special_stage.id].name}`)
    ,
    "699621462671097857", //Copie Permission from this Categorie ID
    "699621462671097857",  //Send Members back to this Categorie ID
    false, //xp x 2 > true or false
    )

    //Post Splatfest Result
    

})
})