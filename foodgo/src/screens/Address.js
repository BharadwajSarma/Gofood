import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Address() {
    const [addr, setAddr] = useState({ Address: "", street: "", town: "", state: "" });
    const [payment, setPayment] = useState({ method: "", cardNumber: "", expiry: "", cvv: "" });
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const navigate = useNavigate(); // React Router's navigation hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!payment.method) {
            alert("Please select a payment method.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/address", {
                Address: addr.Address,
                street: addr.street,
                town: addr.town,
                state: addr.state,
                paymentMethod: payment.method,
                cardNumber: payment.cardNumber,
                expiry: payment.expiry,
                cvv: payment.cvv,
            });

            console.log(response.data);
            if (!response.data.success) {
                alert("Enter valid details");
            } else {
                // Show popup on success
                setShowPopup(true);
                // Redirect to "My Orders" page after a delay
                setTimeout(() => {
                    setShowPopup(false); // Hide popup
                    navigate("/myOrder"); // Redirect
                }, 2000); // 2-second delay
            }
        } catch (error) {
            console.error("Error during submission:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleAddressChange = (e) => {
        setAddr({ ...addr, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4 text-primary fw-bold">Enter Details</h2>
                <form onSubmit={handleSubmit}>
                    {/* Address Fields */}
                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label fw-semibold">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Address"
                            name="Address"
                            placeholder="Enter your Address"
                            value={addr.Address}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="street" className="form-label fw-semibold">Street</label>
                        <input
                            type="text"
                            className="form-control"
                            id="street"
                            name="street"
                            placeholder="Enter your street name"
                            value={addr.street}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="town" className="form-label fw-semibold">Town</label>
                        <input
                            type="text"
                            className="form-control"
                            id="town"
                            name="town"
                            placeholder="Enter your Town"
                            value={addr.town}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="state" className="form-label fw-semibold">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            placeholder="Enter your State"
                            value={addr.state}
                            onChange={handleAddressChange}
                            required
                        />
                    </div>

                    {/* Payment Fields */}
                    <div className="mb-3">
                        <label htmlFor="paymentMethod" className="form-label fw-semibold">Payment Method</label>
                        <select
                            className="form-control"
                            id="paymentMethod"
                            name="method"
                            value={payment.method}
                            onChange={handlePaymentChange}
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit/Debit Card">Credit/Debit Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Net Banking">Net Banking</option>
                        </select>
                    </div>

                    {payment.method === "Credit/Debit Card" && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label fw-semibold">Card Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="Enter your card number"
                                    value={payment.cardNumber}
                                    onChange={handlePaymentChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="expiry" className="form-label fw-semibold">Expiry Date</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="expiry"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={payment.expiry}
                                    onChange={handlePaymentChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="cvv" className="form-label fw-semibold">CVV</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="cvv"
                                    name="cvv"
                                    placeholder="Enter CVV"
                                    value={payment.cvv}
                                    onChange={handlePaymentChange}
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary fw-bold">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Popup for successful order */}
            {showPopup && (
                <div
                    className="position-fixed top-50 start-50 translate-middle bg-success text-white p-3 rounded shadow"
                    style={{ zIndex: 1050 }}
                >
                    Order Placed Successfully!
                </div>
            )}
        </div>
    );
}

export default Address;
