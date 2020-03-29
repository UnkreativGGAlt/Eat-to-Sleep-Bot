const mongoose = require("mongoose")

const schema = mongoose.Schema({
    q: String,
    a: Array,
    voted: {type: Array, default: []},
    creator: String,
    channel: String,
    message: String,
    open: {type: Boolean, default: true}
})

module.exports = mongoose.model("vote", schema)