const { client, config} = require("../../index")
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

var fetch = require('node-fetch');

var server = "585511241628516352"
var message = "723183825571545168"
var role = "723184025979715604"
var reaction = "✅"
var Gamename = "Splatoon 2"
var GameDatum = "27.Juni 2020"
var GameTime = "17:00 Uhr"
var tlink = "https://challonge.com/de/splatoon2esnr"

client.on("messageReactionAdd", (Reaction, User) => {
    var mostneedcall = `https://Dustin_DM:${config.tokens.challonge}@api.challonge.com/v1`

    if (Reaction.message.id != message) return;
    if (Reaction.emoji !=  reaction) return;
        Reaction.remove(User)
        if (client.guilds.get("585511241628516352").roles.get("712830005452865566").members.find(m => m.id === User.id)) return;

    var teilnehmer = fetch(mostneedcall + `/tournaments/${config.tokens["challonge-id"]}/participants.json`, {
        method: 'get',
    })
    .then(res => res.json());
        teilnehmer.then(async function (json) {
        //console.log(json[0].participant.name)
        if (json.find(p => p.participant.name === User.tag)) {User.send(`Hey. Schön das du dich mehrmals für das ${Gamename} Turnier anmelden willst. Aber du bist schon angemeldet ^^*`)}
        else {
        ////Register new Member

        const request = require("request");
        request.post(mostneedcall + `/tournaments/${config.tokens["challonge-id"]}/participants.json`, {
            json: {
              participant: {name: User.tag}
            }
          }, (error, res, body) => {
            if (error) {
              console.error(error)
              return User.send("Du konntest nicht zu dem Turnier angemeldet werden. Dies ist aber nicht deine schuld. Bitte kontaktiere einen Admin oder versuche es später erneut")
            }
            else {
                Reaction.message.guild.members.get(User.id).addRole(role)
                User.send(new RichEmbed().setColor(colour.grün)
                .setTitle("Du wurdest erfolgreich zum Turnier angeneldet!")
    
                .setColor("#2ecc71")
                .setThumbnail("https://cdn.worldvectorlogo.com/logos/arms-nintendo-switch.svg")
                .setDescription(`Du bist nun ein offizieller Teilnehmer vom ${Gamename} Turnier (${GameDatum}). Der Check in findet eine Stunde vor dem Turnier statt. Mit dem Check in bestätigst du nochmal deine Teilnahme und lässt uns wissen das du wirklich da bist. ${GameTime} geht dann das Turnier los.`)
                .addField("Tunier Page:", tlink)
                )
            }
          })
      
    }})

})
