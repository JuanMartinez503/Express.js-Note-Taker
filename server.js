const express =require('express')
const path = require('path')
const app = express()
const api = require('./routes/index.js')
const Port = 3001


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', api)
app.use(express.static('public'))

app.get('/notes',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})
app.use('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'))

})
app.listen(Port, ()=>{
    console.log('app is listening');
})