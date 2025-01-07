import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';


export default function MyOrder() {
    const [orderData, setOrderData] = useState([]); // State to store orders
    const [error, setError] = useState(null); // Handle errors
    console.log("Order Data:", orderData);

    // Function to fetch order data
    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail'); // Retrieve email from localStorage

        try {
<<<<<<< HEAD
            const response = await fetch("https://food-g-bharadwajsarmas-projects.vercel.app/api/auth/myOrderData", {
=======
            const response = await fetch("https://foodgo-backend-r06p.onrender.com", {
>>>>>>> cf9044e8bb385dc6432400bab3e048baab741bb8
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail }), // Send email in request
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();

            if (result && Array.isArray(result.orderData)) {
                setOrderData(result.orderData);
            } else {
                setOrderData([]);
                console.error("Unexpected response format:", result);
            }
        } catch (err) {
            console.error("Error fetching order data:", err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">My Orders</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                {orderData.length > 0 ? (
                    orderData.map((order, index) => (
                        <div key={index} className="mb-4">

                            <hr />
                            <div className="row">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item, itemIndex) => (
                                        <div
                                            className="col-12 col-md-6 col-lg-4 mb-3"
                                            key={itemIndex}
                                        >
                                            <div className="card shadow">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">
                                                        Quantity: {item.qty}
                                                        <br />
                                                        Size: {item.size || "N/A"}
                                                        <br />
                                                        Price: ₹{item.price}
                                                    </p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 text-center">
                                        <p></p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center fs-4">No Orders Found</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
