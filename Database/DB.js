const mongoose = require('mongoose')
async function main() {
    await mongoose.connect("mongodb://localhost:27017/curdOperation")
    console.log("Database Connected Successfully.")
   
}
main().catch(err => console.log(err))

module.exports = mongoose