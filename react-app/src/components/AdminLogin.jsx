import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate(); // Initialize useNavigate

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const adminUsername = "admin";
    const adminPassword = "adminp"; // You should use a secure password in a real application

    const handleAdminLogin = () => {
        // Check if the entered username and password match the admin credentials
        if (username === adminUsername && password === adminPassword) {
            // If it's the admin, redirect to the home page
            navigate('/admin/dashboard'); // Redirect to admin dashboard
        } else {
            // If it's not the admin, show an error message or handle it accordingly
            alert("Invalid admin credentials");
        }
    }

    return (
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3>Welcome to Admin Login Page</h3>
                <br />
                USERNAME
                <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                PASSWORD
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="btn btn-primary mr-3" onClick={handleAdminLogin}>LOGIN</button>
            </div>
        </div>
    );
}

export default AdminLogin;
