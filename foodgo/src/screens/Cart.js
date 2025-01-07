import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import {loadStripe} from '@stripe/stripe-js'
function Carts() {
    const data = useCart(); // Cart data
    const dispatch = useDispatchCart(); // Dispatcher for cart actions
    const navigate=useNavigate();

    // If cart is empty, display message
    if (data.length === 0) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className="text-center fs-3 bg-light p-5 rounded shadow-sm">
                    The Cart is Empty
                </div>
            </div>
        );
    }

    const userEmail = localStorage.getItem("userEmail"); // Retrieve user's email

    // Checkout handler
    const handleCheckOut = async () => {
        try {
            // Post order data to backend
<<<<<<< HEAD
            const response = await axios.post("https://food-g-bharadwajsarmas-projects.vercel.app/api/auth/orderData", {
=======
            const response = await axios.post("https://foodgo-backend-r06p.onrender.com", {
>>>>>>> cf9044e8bb385dc6432400bab3e048baab741bb8
                order_data: {
                    items: data,
                    total: data.reduce((total, food) => total + food.price * food.qty, 0),
                },
                email: userEmail,
                Order_date: new Date().toISOString() // Use ISO format for better consistency
            });

            if (response.status === 200) {
                console.log("Order placed successfully");
                alert("Order placed successfully!");
                navigate('/address')
                dispatch({ type: "DROP" }); // Clear the cart after successful checkout
            } else {
                console.error("Error placing order:", response.data.error);
                alert(`Error: ${response.data.error}`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Unable to place the order. Please try again later.");
        }
    };
    const makePayment=async()=>{

        const stripe=await loadStripe("pk_test_51QYlPcRsyGk2n7RbRd1PFQiGenyyOVDYQ7GErzgmUWg57esWGdWLkZLzeIOswGfFQvCe7b1yXNHeD00HJf0rKdIw00RVwr7EQm");
        const body={
            products:data
        }
<<<<<<< HEAD
        const response=await fetch("https://food-g-bharadwajsarmas-projects.vercel.app/payment",{
=======
        const response=await fetch("https://foodgo-backend-r06p.onrender.com",{
>>>>>>> cf9044e8bb385dc6432400bab3e048baab741bb8
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
            })
            const session=await response.json();
            const result =stripe.redirectToCheckout({
                sessionId:session.id
            })
            if(result.error)
            {
                console.log(result.error);
            }
    }
    

    const totalPrice = data.reduce((total, food) => total + food.price * food.qty, 0); // Calculate total price

    return (
        <div className="container my-5">
            <div className="table-responsive">
                <table className="table table-hover table-bordered shadow-sm bg-white">
                    <thead className="text-success fs-5">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{userEmail}</td>
                                <td>₹{food.price * food.qty}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0 text-danger"
                                        onClick={() => dispatch({ type: "REMOVE", index })}
                                    >
                                        <Delete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h3 className="fs-4 text-primary">Total Price: ₹{totalPrice}/-</h3>
                <button className="btn btn-success shadow" onClick={handleCheckOut}>
                    Check Out
                </button>
            
            </div>
        </div>
    );
}

export default Carts;
