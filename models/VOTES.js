const mongoose = require("mongoose")

const schema = mongoose.Schema({
    q: String,
    a: Array,
    voted: Array,
    creator: String,
    channel: String,
    message: String,
    open: {type: Boolean, default: true}
})

module.exports = mongoose.model("vote", schema)