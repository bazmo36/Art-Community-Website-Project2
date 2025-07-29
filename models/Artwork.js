const mongoose = require('mongoose')

const artworkSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,ref:'User'
    },
    tilte:{
        type:String,
        require:true
    },
    description:String,
    imageUrl:String,
    collections: [String],
    likes:[{type: mongoose.Schema.Types.ObjectId,ref:'User'}]
})

module.exports = mongoose.model('Aetwork',artworkSchema)