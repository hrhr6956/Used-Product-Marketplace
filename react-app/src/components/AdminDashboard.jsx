import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css'; // Import the same CSS file used in Home.jsx
import API_URL from "../constants";

function AdminDashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-products`);
                if (response.data.products) {
                    setProducts(response.data.products);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    // Functions for handling product actions (verify, reject) can be defined here if needed
    const handleVerify = async (productId) => {
        try {
            const response = await axios.post(`${API_URL}/verify-product/${productId}`);
            console.log(response.data.message); // Log success message
            // Optionally, you can update the local state to remove the verified product from the list
            setProducts(products.filter(item => item._id !== productId));
        } catch (error) {
            console.error("Error verifying product:", error);
        }
    };

    const handleReject = async (productId) => {
        try {
            const response = await axios.post(`${API_URL}/reject-product/${productId}`);
            console.log(response.data.message); // Log success message
            // Optionally, you can update the local state to remove the rejected product from the list
            setProducts(products.filter(item => item._id !== productId));
        } catch (error) {
            console.error("Error rejecting product:", error);
        }
    };
    // Functions for handling product actions (verify, reject) can be defined here if needed

    return (
        <div>
            <h1 style={{ marginLeft: '5px' }}><i><u>ADMIN DASHBOARD</u></i></h1>

            <div className="d-flex justify-content-center flex-wrap">
                {products.map((item) => (
                    <div key={item._id} className="card m-3">
                        {/* Include product card content similar to Home.jsx */}
                        {/* You can reuse the same JSX structure as in Home.jsx */}
                        <img width="250px" height="150px" src={`${API_URL}/${item.pimage}`} />
                        <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                        <p className="m-2">{item.pname} | {item.category}</p>
                        <p className="m-2 text-success">{item.pdesc}</p>

                        {/* Add buttons for verifying and rejecting */}
                        <div className="m-2">
                            <button onClick={() => handleVerify(item._id)} className="btn btn-success mr-2">Verify</button>
                            <button onClick={() => handleReject(item._id)} className="btn btn-danger" style={{ marginLeft: '10px' }}>Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;

