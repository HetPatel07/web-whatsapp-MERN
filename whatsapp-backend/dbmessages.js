import  mongoose  from "mongoose"

const messagesSchema = mongoose.Schema({
    name : String,
    message : String,
    timeStamp : String,
    received : Boolean
})

export default mongoose.model("messagecontents", messagesSchema)