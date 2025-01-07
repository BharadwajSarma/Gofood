const express =require('express')
const cors=require('cors')
const app =express();
const port = process.env.PORT||5000
app.use(express.json());
app.use(cors());
const mongoDB =require("./db")
mongoDB();
app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
