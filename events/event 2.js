const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");
var schedule = require('node-schedule');

client.on("ready", () => {

  
  if (config["eventcounter"]["E2"] = true){
    function getready(){
var countDownDate = new Date("June 28, 2019 00:00").getTime();

var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  var embed = new RichEmbed().setTitle("Super Mario Maker 2")
            .setColor("#FACD00")
            .addField(`Mario Maker 2 Release Date in:`, `**${days} Tagen, ${hours} Stunden und ${minutes} Minuten!**`, true)
            .addField("Günstig Vorbestellen" , "[Instant Gaming => Mario Maker 2](https://www.instant-gaming.com/en/4485-buy-key-nintendo-super-mario-maker-2-switch/?igr=Dustin-DM)", true)
            .setThumbnail("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/28ebb8e4-4c6f-4113-94e0-1dc2288e11ae/dczwdg6-66a69d82-77a1-43cd-9138-0696dbe7892b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI4ZWJiOGU0LTRjNmYtNDExMy05NGUwLTFkYzIyODhlMTFhZVwvZGN6d2RnNi02NmE2OWQ4Mi03N2ExLTQzY2QtOTEzOC0wNjk2ZGJlNzg5MmIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.02miF30cECPNUW-K8KfB3nv9ZUQK5rOZLSJVqpa49OM")
            .setImage("https://cdn03.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_SuperMarioMaker2_image1600w.jpg")
            
            client.channels.get("589079900011364373").fetchMessage("589080373456011264").then(message => message.edit(embed))
            
  }
  getready()



// Update the count down every 1 second
var k = schedule.scheduleJob("0 * * * * *", function(){ 

  getready()
  
  })}
}); 