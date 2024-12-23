
import React, { useEffect, useRef, useState } from 'react';

import { useDispatchCart, useCart } from "./ContextReducer";
function Card(props) {
    let data = useCart();
    //console.log("Cart Data:", data);


    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    let dispatch = useDispatchCart();
    

    let priceRef = useRef();

    let options = props.options || {}; // Fallback to empty object if options are undefined
    let priceOptions = Object.keys(options);

    // const handleClick=()=>{
    //     if(!localStorage.getItem("token")){
    //         navigate("/logon");
    //     }
    // }
    const handleQty=(e)=>{
        setQty(e.target.value);
    }
    const handleOptions=(e)=>{
        setSize(e.target.value);
    }
   
    const handleAddToCart = async () => {
        let food=[]
        for(const item of data){
            if(item.id=== props.foodItem._id)
            {
                food=item;
                break;
            }
        }

        console.log(food)
        console.log(new Date())

        if(food.length > 0){
            if(food.size===size)
            {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })   
                return;
            }
            else if(food.size !== size){
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img:props.imgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        console.log(data)
    }
    
    useEffect(() => {
        setSize(priceRef.current.value)  // this is where price value
    }, [])
    // console.log("Options received in Card:", JSON.stringify(options, null, 2)); 
    let finalPrice = qty * parseInt(options[size]);
    return (
        <div>
            <div>
                <div className="card mt-5" style={{ width: "16rem", maxHeight: "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" style={{ height: "120px", objectFit: "fill" }} alt={props.foodName || "Food"} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        {/* <p className="card-text">PAnneeerrr</p> */}
                        <div className="container w-100 " >
                            <select className="m-2 h-100  bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={handleQty}>
                                {Array.from(Array(6), (e, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select className="m-2 h-100  bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef}  onChange={handleOptions}>
                                {priceOptions.length > 0 ? (
                                    priceOptions.map((data) => (
                                        <option key={data} value={data}>
                                            {data}
                                        </option>
                                    ))
                                ) : (
                                    <option>No options available</option>
                                )}
                            </select>
                            <div className='d-inline ms-2'>
                                ₹{finalPrice}/-
                            </div>

                            <hr>
                            </hr>
                            <button className={`btn btn-success justify-center ms-1`} onClick={handleAddToCart}>+</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
