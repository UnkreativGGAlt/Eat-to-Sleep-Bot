const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");
var schedule = require('node-schedule');

client.on("ready", () => {

  
  if (config["eventcounter"]["E1"] = true){
    function getready(){
var countDownDate = new Date("July 18, 2019 14:00").getTime();

var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes < 0 == false){

  var embed = new RichEmbed().setTitle("Final Splatfest Counter!")
            .setColor("#9b59b6")
            .addField(`Das LETZE Splatfest beginnt in:`,`**${days} Tagen, ${hours} Stunden und ${minutes} Minuten!**`, true)
            .addField("Thema:", "**Chaos VS Order**", true)
            .addField("Daten:", "es beginnt am 18. Juli um 14:00 Uhr und endet am 21. Juli um 14:00 Uhr", true)
            .setThumbnail("https://pic-hoster.net/upload/69706/OfftheHook_alternativelogo.png")
            .setImage("https://pic-hoster.net/upload/69705/DesignohneTitel.png")
            
            client.channels.get("589079900011364373").fetchMessage("589080372478738432").then(message => message.edit(embed))
            
  }
else{
  var embed = new RichEmbed().setTitle("Final Splatfest Counter!")
            .setColor("#9b59b6")
            .addField(`Das LETZE Splatfest hat begonnen. Hör auf diese Message zu lesen und geh zocken!`, "Auf gehts!", true)
            .addField("Thema:", "**Chaos VS Order**", true)
            .addField("Daten:", "es beginnt am 18. Juli um 14:00 Uhr und endet am 21. Juli um 14:00 Uhr", true)
            .setThumbnail("https://pic-hoster.net/upload/69706/OfftheHook_alternativelogo.png")
            .setImage("https://pic-hoster.net/upload/69705/DesignohneTitel.png")
            
            client.channels.get("589079900011364373").fetchMessage("589080372478738432").then(message => message.edit(embed))
}}
  getready()



// Update the count down every 1 second
var k = schedule.scheduleJob("0 * * * * *", function(){ 

  getready()
  
  })}
});