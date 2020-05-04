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

WS.app.get("/stream", (req, res) => {
    res.render("stream")
})

WS.app.get("/rankcard/:id", async (req, res) => {
var memberinfo = await MEMBER.findOne({"info.id": req.params.id})
memberinfo.info.pic = client.users.get(req.params.id).displayAvatarURL
memberinfo.info.tag = client.users.get(req.params.id).tag
res.render("rankcard", {member:memberinfo})
})


exports.WS = WS
