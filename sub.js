 const  redis = require('redis')
 (async()=>{
    let subscriber = redis.createClient({
        url:"redis://localhost:6379"
    });
    subscriber.on('error',(err)=>console.log('redis error',err))
    subscriber.on('connect',(err)=>console.log('redis connect',err))
    await subscriber.connect()
 })
 ()