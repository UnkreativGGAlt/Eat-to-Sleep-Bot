const { client, config} = require("../../index")
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

var fetch = require('node-fetch');

var server = "585511241628516352"

client.on("messageReactionAdd", (Reaction, User) => {
    var mostneedcall = `https://Dustin_DM:${config.tokens.challonge}@api.challonge.com/v1`

    if (Reaction.message.id != "695315279005220945") return;
    if (Reaction.emoji != "✅") return;
    Reaction.remove(User)

    var teilnehmer = fetch(mostneedcall + `/tournaments/${config.tokens["challonge-id"]}/participants.json`, {
        method: 'get',
    })
    .then(res => res.json());
        teilnehmer.then(async function (json) {
        //console.log(json[0].participant.name)
        if (json.find(p => p.participant.name === User.tag)) {User.send("Hey. Schön das du dich mehrmals für das Arms Turnier anmelden willst. Aber du bist schon angemeldet ^^*")}
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
                Reaction.message.guild.members.get(User.id).addRole("695385992487764079")
                User.send(new RichEmbed().setColor(colour.grün)
                .setTitle("Du wurdest erfolgreich zum Turnier angeneldet!")
    
                .setColor(colour.gelb)
                .setThumbnail("https://cdn.worldvectorlogo.com/logos/arms-nintendo-switch.svg")
                .setDescription("Du bist nun ein offizieller Teilnehmer vom Arms Abend Turnier (4.4.2020). Der Check in findet eine Stunde vor dem Turnier statt (16:00 Uhr). Mit dem Check in bestätigst du nochmal deine Teilnahme und lässt uns wissen das du wirklich da bist. 17:00 Uhr geht dann das Turnier los. Wir spielen jeder gegen jeden. Pro Runde bekommt ihr für einen Sieg einen Punkt. Wer am Ende die meisten Punkte hat, gewinnt das Turnier!")
                .addField("Tunier Page:", "https://challonge.com/de/1nvuxzwb")
                )
            }
          })
      
    }})

})
