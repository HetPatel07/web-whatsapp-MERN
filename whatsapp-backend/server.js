import express from "express"
import  mongoose  from "mongoose"
import Messages from './dbmessages.js'
import Pusher from "pusher"


const port = process.env.PORT || 9000
const app = express()
const pusher = new Pusher({
    appId: "1261493",
    key: "9ef64557a83c05270202",
    secret: "0345eeb060f47211bbc2",
    cluster: "ap2",
    useTLS: true
  });

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });   
// db config
mongoose.connect('mongodb+srv://HetPatel:5MhghWEfsVOgVlHR@cluster0.zfb5a.mongodb.net/webwhatsappdb?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log("connection successfull")
})
.catch((err) => {
    console.log(err)
})

const db = mongoose.connection
db.once("open",() => {
    console.log("db connected")
    const messageCollection = db.collection("messagecontents")
    const changeStream = messageCollection.watch();

    changeStream.on('change',(change) =>{
        console.log(change)
        if(change.operationType === 'insert') {
            const changedDocument = change.fullDocument;
            pusher.trigger(
              'messages',
              'inserted', 
              {
                name: changedDocument.name,
                message: changedDocument.message
              }
            ); 
          }
          else{
              console.log("error triggering pusher")
          }
    })
})

app.get('/messages/sync', (req,res) => {
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})
app.post('/messages/new' , (req,res) => {
    // console.log(req.body)
    const newMessage = req.body
    Messages.create(newMessage,(err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(`new message has been created ${data}`)
        }
    })
    // console.log(req.body)
    // res.send(req.body)
})


if(process.env.NODE_env === "production"){
    app.use(express.static("whatsapp-frontend/build"))
}
app.listen(port, () => console.log(`app is running on port : ${port}`))