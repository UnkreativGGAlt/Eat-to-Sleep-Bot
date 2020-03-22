const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");
const Discord = require('discord.js');
const Canvas = require('canvas');

var request = require("request")

var schedule = require('node-schedule');
var fetch = require('node-fetch');
var format = require('date-format');

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
  function unixtotimeconverter(unix){
    var ts = format.asString('dd.MM hh:mm', new Date(unix * 1000));
     return ts + " Uhr"
  }

  var channelid = "685948724030996583",
      timemessage = "685971820892913729"

client.on("ready", () => {
      function refrechdata(){


    

      
    var apiData = fetch('https://fortnite-api.com/shop/br?language=de', {
        method: 'get',
        headers: { 'x-api-key': config.tokens.fortnite },
    })
    .then(res => res.json());
        apiData.then(async function (json) {

          const canvas = Canvas.createCanvas(1920, 1080);
          const ctx = canvas.getContext('2d');

          ctx.fillStyle = '#7289DA';
          ctx.fillRect(0, 0, 1920, 1080);

          var right = 10

          var featureditems = json.data.featured.forEach(i => {
            var itemname = i.items[0].name
            var itemid = i.items[0].id.substring(0, 30);
            var itemicon = i.items[0].images.icon.url
            var itempreis = i.finalPrice
            var itemdisplayRarity = i.items[0].displayRarity

            if (itemdisplayRarity == "Legendär"){ctx.fillStyle = '#ff7605'} else if (itemdisplayRarity == "Selten"){ctx.fillStyle = '#2fd5e8'} else if (itemdisplayRarity == "Episch"){ctx.fillStyle = '#bd3ffa'} else if (itemdisplayRarity == "Ungewöhnlich"){ctx.fillStyle = '#67b02f'} else if (itemdisplayRarity == "Gewöhnlich"){ctx.fillStyle = '#c2c2c2'} else {ctx.fillStyle = '#fcdd79'}
            ctx.fillRect(right + 10, 10, 200, 300);
          right += 200

           
        
       
         })

         setTimeout(() => {
        const attachment = new Discord.Attachment(canvas.toBuffer(), `Fortnite Shop.png`);
          client.channels.get(channelid).fetchMessages({limit: 10}).then(m => client.channels.get(channelid).bulkDelete(m))
          client.channels.get(channelid).send(attachment) 
        }, 3000);

        })

         
        }

   
//         var date = new Date();
            
// var current_hour = date.getHours();
// var current_minutes = date.getMinutes();
// var timeanddate1 = new RichEmbed().setDescription("zuletzt aktualisiert: " + addZero(current_hour) + ":" + addZero(current_minutes) + " Uhr" + "\n[Data received from Fortnite-API.com](https://fortnite-api.com/)")
// client.channels.get(channelid).fetchMessage(timemessage).then(message => message.edit(timeanddate1))



        refrechdata()

var j = schedule.scheduleJob("30 0 1 * * *", function(){

 refrechdata()  //führt denn gesameten oben gezeigten Code aus == Refresht die Map daten in denn Masseges

//  var date1 = new Date();            // Info Message
//  var current_hour1 = date1.getHours();
//  var current_minutes1 = date1.getMinutes();
//  timeanddate1 = new RichEmbed().setDescription("zuletzt aktualisiert: " + addZero(current_hour1) + ":" + addZero(current_minutes1) + " Uhr" + "\n[Data received from Fortnite-API.com](https://fortnite-api.com/)")
//  client.channels.get(channelid).fetchMessage(timemessage).then(message => message.edit(timeanddate1))
 
 




});
    


})