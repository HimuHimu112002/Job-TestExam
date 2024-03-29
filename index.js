const app = require('./app')

app.get('/user', (req, res) => {
    res.send("This is get request and first check this code")
});
app.listen(process.env.PORT, function(){
    console.log("Backend project running...!")
})