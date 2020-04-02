const { client, config} = require("../../index")
const { RichEmbed } = require('discord.js')
const colour = require("../../colours.json")
const fs      = require("fs");
var schedule = require('node-schedule');

var fetch = require('node-fetch');

var server = "585511241628516352"

client.on("messageReactionAdd", (Reaction, User) => {
    var mostneedcall = `https://Dustin_DM:${config.tokens.challonge}@api.challonge.com/v1`
    Reaction.remove(User)

    if (Reaction.message.id != "695315279005220945") return;

    var teilnehmer = fetch(mostneedcall + `/tournaments/${config.tokens["challonge-id"]}/participants.json`, {
        method: 'get',
    })
    .then(res => res.json());
        teilnehmer.then(async function (json) {
        //console.log(json[0].participant.name)
        if (json.find(p => p.participant.name === User.tag)) {User.send("Hey. Schön das du dich mehrmals für das Arms Turnier anmelden willst. Aber du bist schon angemeldet ^^*")}
        else {
        //Create new User
        var newteilnehmer = fetch(mostneedcall + `/tournaments/${config.tokens["challonge-id"]}/participants.json`, {
            method: 'POST',
            body: {"participant": {"name": "dustindf"}},
            
        })
        .then(res => res.json());
            newteilnehmer.then(async function (json2) {
                console.log(json2)
                User.send(new RichEmbed().setTitle("Deine Anmeldung beim Arms Turnier war Erfolgreich")
                .setDescription("Du bist nun Erfolgreich für das Amrs Turnier am 04.04.2020 um 17:00 Uhr angemeldet! Bitte denke an den Check In. Er beginnt eine Stunde vor dem Turnier. Du musst dann einfach nur in einem Channel schreiben das du beim Turnier da bist. Das ist alles.")
                .setColor(colour.grün))
            })


        
        }
    })

})