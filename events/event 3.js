const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");
var schedule = require('node-schedule');

client.on("ready", () => {

  
  if (config["eventcounter"]["E3"] = "true"){
    function getready(){
var countDownDate = new Date("March 20, 2020 00:00").getTime();

var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24))
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (minutes < 0 == false){

  var embed = new RichEmbed().setTitle("Animal Crossing: New Horizons")
            .setColor("#63AC56")
            .addField(`Animal Crossing: New Horizons Release Date in:`, `**${days} Tagen, ${hours} Stunden und ${minutes} Minuten!**`, true)
            .addField("Günstig Vorbestellen" , "[Instant Gaming => Animal Crossing: New Horizons](https://www.instant-gaming.com/en/4809-buy-key-nintendo-animal-crossing-new-horizons-switch/?igr=Dustin-DM)", true)
            .setThumbnail("https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Animal_Crossing_New_Horizons_logo.png/220px-Animal_Crossing_New_Horizons_logo.png")
            .setImage("https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F999929%252Fa6417497-a4fc-485b-86d0-88450eaebf40.png%252F950x534__filters%253Aquality%252880%2529.png?signature=1TuPMzsnCKxGMHbbAk1MYBFIz18=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com")
            
            client.channels.get("589079900011364373").fetchMessage("589782206503845901").then(message => message.edit(embed))
            
  }else{

    var embed = new RichEmbed().setTitle("Animal Crossing: New Horizons")
    .setColor("#63AC56")
    .addField(`Animal Crossing: New Horizons wurde Released**` , "Viel Spaß mit dem Game", true)
    .addField("Günstig Kaufen" , "[Instant Gaming => Animal Crossing: New Horizons](https://www.instant-gaming.com/en/4809-buy-key-nintendo-animal-crossing-new-horizons-switch/?igr=Dustin-DM)", true)
    .setThumbnail("https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Animal_Crossing_New_Horizons_logo.png/220px-Animal_Crossing_New_Horizons_logo.png")
    .setImage("https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F999929%252Fa6417497-a4fc-485b-86d0-88450eaebf40.png%252F950x534__filters%253Aquality%252880%2529.png?signature=1TuPMzsnCKxGMHbbAk1MYBFIz18=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com")
    
    client.channels.get("589079900011364373").fetchMessage("589782206503845901").then(message => message.edit(embed))
    


  }}
  getready()



// Update the count down every 1 second
var k = schedule.scheduleJob("0 * * * * *", function(){ 

  getready()
  
  })}
}); 