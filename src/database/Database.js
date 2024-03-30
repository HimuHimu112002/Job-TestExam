const mongoose = require('mongoose')

function DatabaseConnect() {
    mongoose.connect(process.env.MONGODBURL).then(() =>{
        console.log("Database connect")
    });
}
module.exports = DatabaseConnect;