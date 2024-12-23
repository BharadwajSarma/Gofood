const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place Order
router.post('/auth/orderData', async (req, res) => {
    const data = req.body.order_data;
    //console.log(data)
  //  await data.splice(0,0,{Order_date:req.body.Order_date})
    console.log(data)

    try {
        const existingOrder = await Order.findOne({ email: req.body.email });
        if (!existingOrder) {
            await Order.create({
                
                email: req.body.email,
                order_data: [data],
            });
            res.json({ success: true })
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            
            res.json({ success: true });
        }

    }
    catch (error) {
        console.error("Order Error:", error.message);
        res.status(500).json({ error: "Server Error" });
    }

});


//Retrieve Orders
router.post('/auth/myorderData', async (req, res) => {
    try {
        const orders = await Order.findOne({ email: req.body.email });
        if (!orders) {
            return res.status(404).json({ error: "No orders found for this user" });
        }
        res.json({ orderData: orders.order_data });
        console.log(orders)
        
    } catch (error) {
        console.error("Order Retrieval Error:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
});


 
module.exports=router;
