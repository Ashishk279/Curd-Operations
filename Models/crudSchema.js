const mongoose = require('mongoose');

const curdSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
       type : Number
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phoneNumber: {
        type: Number,
    },
})

module.exports = mongoose.model("User", curdSchema)