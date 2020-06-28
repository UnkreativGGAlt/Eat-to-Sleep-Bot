const mongoose = require("mongoose")

const schema = mongoose.Schema({
    user: String,
    time: {type: Date, default: new Date()}
})

module.exports = mongoose.model("daily-coin", schema)