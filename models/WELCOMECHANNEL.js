const mongoose = require("mongoose")

const wcschema = mongoose.Schema({
    ChannelID: String,
    MemberID: String,
    Date: {type: Date, default: new Date()}
})

module.exports = mongoose.model("Welcomechannel", wcschema)