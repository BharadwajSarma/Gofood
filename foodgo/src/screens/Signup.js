import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Signup() {
    const [crede, setCrede] = useState({ name: "", email: "", password: "", location: "" });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!crede.name || !crede.email || !crede.password || !crede.location) {
            alert("Please fill out all fields");
            return;
        }

        try {

            const response = await axios.post("https://backend-one-phi-22.vercel.app/api/createuser", {
                name: crede.name,
                email: crede.email,
                password: crede.password,
                location: crede.location,
            });

            console.log(response.data);
            if (!response.data.success) {
                alert("Enter valid details");
            } else {
                alert("User created successfully");
                navigate('/login'); // Redirect to login page after success
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const onChange = (e) => {
        setCrede({ ...crede, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
                <h2 className="text-center mb-4 text-primary fw-bold">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={crede.name}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={crede.email}
                            onChange={onChange}
                            required
                        />
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={crede.password}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="form-label fw-semibold">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            placeholder="Enter your location"
                            value={crede.location}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary fw-bold">
                            Submit
                        </button>
                        <Link to="/login" className="btn btn-success fw-bold text-white">
                            Already a user? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
