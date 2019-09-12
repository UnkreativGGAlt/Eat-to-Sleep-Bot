const { client, config} = require('./index.js')
const { RichEmbed } = require('discord.js')

const Datastore = require("nedb")

const database = new Datastore("testdatabase.db")
database.onL
database.loadDatabase((err) => {
    if (err){console.error(err)
         return;}
    console.log("\x1b[35m" + "Database loadet" + "\x1b[0m")
})

exports.db = database

