const mongoose = require("mongoose")

const schema = mongoose.Schema({
    code: String,
    tag: String
})

module.exports = mongoose.model("invite", schema)