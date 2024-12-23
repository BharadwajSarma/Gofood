import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [crede, setCrede] = useState({ email: "", password: "" });
    const [isBlocked, setIsBlocked] = useState(false); // Track rate limiting state
    const [retryAfter, setRetryAfter] = useState(0); // Time left for retry
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!crede.email || !crede.password) {
            alert("Please fill out all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                email: crede.email,
                password: crede.password
            });

            if (response.status === 429) {
                // Rate limit exceeded, set blocked state and retry time
                const retryTime = parseInt(response.headers['retry-after'], 10) || 60;
                setIsBlocked(true);
                setRetryAfter(retryTime);

                setTimeout(() => {
                    setIsBlocked(false);
                    setRetryAfter(0);
                }, retryTime * 1000);
            } else if (!response.data.success) {
                alert("Enter valid details");
            } else {
                alert("User login successfully");
                localStorage.setItem("userEmail", crede.email);
                localStorage.setItem("authToken", response.data.authToken);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Handle rate limit error
                const retryTime = parseInt(error.response.headers['retry-after'], 10) || 60;
                setIsBlocked(true);
                setRetryAfter(retryTime);

                setTimeout(() => {
                    setIsBlocked(false);
                    setRetryAfter(0);
                }, retryTime * 1000);
            } else {
                console.error("Error during login:", error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    const onChange = (e) => {
        setCrede({ ...crede, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={crede.email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={crede.password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" disabled={isBlocked}>
                            {isBlocked ? `Retry in ${retryAfter} seconds` : "Login"}
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <span>New User? </span>
                        <Link to="/createuser" className="text-success fw-semibold">
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
