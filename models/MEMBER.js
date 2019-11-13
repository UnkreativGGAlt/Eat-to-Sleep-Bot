const mongoose = require("mongoose")

const MemberSchema = mongoose.Schema({
    info:{
        id: String
    },

    ranks:{
        rank: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
    },
    warns: { type: Array, default: [] }
})

module.exports = mongoose.model("Member", MemberSchema)