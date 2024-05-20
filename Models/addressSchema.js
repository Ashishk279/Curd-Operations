const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    addresses:{
        type: [String],
        required: true
    }
},{
    toJSON:{ Virtuals : true}
})

module.exports = mongoose.model("Addresses", addressSchema)