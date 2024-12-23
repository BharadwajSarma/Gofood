const express=require('express')
const router=express.Router()

router.post('/fooddata',(req,res)=>{
    try{
        //console.log("Food Items:", global.food_items)
        //console.log("Food Categories:", global.foodCategory)
        res.send([global.food_items,global.foodCategory])

    }
    catch(error)
    {
        console.error(error.message);
        res.send("server error")
    }
})
module.exports=router;