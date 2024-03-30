const app = require('./app');
const DatabaseConnect = require('./src/database/Database');

// Mongodb Database connection
DatabaseConnect()

app.listen(process.env.PORT, function(){
    console.log("running success")
})