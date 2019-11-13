const { client, config} = require("../../index.js")
const { RichEmbed } = require('discord.js')
const Main = require('../../index.js')
const fs      = require("fs");

const MEMBER = require("../../models/MEMBER")

var WS = require("../../webserver/webmain").WS

WS.app.get("/rankinglist", async (req, res) => {
  var memberdb = await MEMBER.find({})
  memberdb.forEach(m => {
    if (client.users.find(u => u.id === m.info.id)){
     memberdb.find(e => e.info.id === u.id).info.name = u.tag
    }
  })
  res.render("rank", {member: memberdb})
  console.log(await MEMBER.find({}))
})


