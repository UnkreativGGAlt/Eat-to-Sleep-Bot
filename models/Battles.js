const mongoose = require("mongoose")

const BattleSchema = mongoose.Schema({
    Date: { type: Date, default: Date.now() },
    Winner: String
    
   
})

module.exports = mongoose.model("Battle", BattleSchema)