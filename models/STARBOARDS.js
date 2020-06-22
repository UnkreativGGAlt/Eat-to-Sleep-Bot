const mongoose = require("mongoose")

const schema = mongoose.Schema({
    msgid: String,
    msgchannelid: String,
    userid: String,
    userPBuri: String,
    stars: Number,
    starmsgid: String,
    date: Date
})

module.exports = mongoose.model("starboardmsg", schema)