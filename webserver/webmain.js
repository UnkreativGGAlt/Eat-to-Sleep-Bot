const { client, config} = require('../index.js')
const { RichEmbed } = require('discord.js')
const Main = require('../index.js')
const fs      = require("fs");

const MEMBER = require("../models/MEMBER")



//Webserver
const Websocket = require("./webinterfacemain")
var WS = new Websocket("1234", 6677, client)
exports.WS = WS

//Routes
// const login = require("./routes/DISCORD-OAUTH")
// WS.app.use("/login", login)


