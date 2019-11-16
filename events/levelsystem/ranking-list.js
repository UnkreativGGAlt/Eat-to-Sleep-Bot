const { client, config} = require("../../index.js")
const { RichEmbed } = require('discord.js')
var schedule = require('node-schedule');
const Main = require('../../index.js')
const fs      = require("fs");

const MEMBER = require("../../models/MEMBER")

var WS = require("../../webserver/webmain").WS

//Safe names and Profile Pictures from all Members to DB

var k = schedule.scheduleJob("0 * * *",async function(){
  var mongodb = await MEMBER.find({})
  mongodb.forEach( async m => {
      if (client.users.find(x => x.id === m.info.id)){
       var name =  client.users.find(x => x.id === m.info.id).tag
       var pb =  client.users.find(x => x.id === m.info.id).avatarURL

      await MEMBER.findOneAndUpdate({"info.id": m.info.id}, {"info.name": name, "info.picture": pb})
      }
  })
})




WS.app.get("/rankinglist", async (req, res) => {
  // db.Member.find({country_id : 10}).sort({score : -1}).limit(1)
  var memberdb2 = await MEMBER.find({}).sort({"ranks.rank": -1})
  console.log(memberdb2)
  var rank = 1
  memberdb2.forEach(e => {

  if (rank == 1){memberdb2.find(x => x.info.id === e.info.id).first = true}
  if (rank == 2){memberdb2.find(x => x.info.id === e.info.id).second = true}
  if (rank == 3){memberdb2.find(x => x.info.id === e.info.id).third = true}

  memberdb2.find(x => x.info.id === e.info.id).ranking = rank
  
  rank += 1
  })


  res.render("rank", {member: memberdb2})
})


