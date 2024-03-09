const express =require('express')
const redis = require("redis")
const app = express();
let publisher = redis.createClient({
    url:"redis://localhost:6379"
});

publisher.on('error',(err)=>console.log('redis error',err))
publisher.on('connect',(err)=>console.log('redis connect',err))
const connect = async()=>{
    await publisher.connect();

}

connect();
app.get('/',(req,res)=>{
    res.send({
        message:"publisher active from port 3001"
    })

})
app.get('/publish',async(req,res)=>{
    const id = Math.floor(Math.random()*100)
    const data = {
        id,
        message:`message - ${id}`
    }
    await publisher.publish('message',JSON.stringify(data))
    res.send({
        message:"publisher "
    })

})
app.listen(3001,()=>{
    console.log("publisher server start on 30001")
})
