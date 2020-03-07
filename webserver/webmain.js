const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");

const MEMBER = require("../models/MEMBER")



//Webserver
const Websocket = require("./webinterfacemain")
var WS = new Websocket("1234", 6677, client)

WS.app.get("/", (req,res) => {
    res.render("memberinfo.ejs")
})

WS.app.get("/ueben", (req, res) => {
    res.render("test.ejs")
})


exports.WS = WS
