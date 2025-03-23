import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
                setError("Failed to load post details.");
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
       
    }, [id]);

    const handleConfirm = () => {
        navigate("/register");
    };

    if (loading) return <h1 style={{ textAlign: "center", color: "#007bff" }}>Loading post details...</h1>;
    if (error) return <h1 style={{ textAlign: "center", color: "#dc3545" }}>{error}</h1>;
    if (!post) return <h1 style={{ textAlign: "center", color: "#ffc107" }}>Post not found.</h1>;

    return (
        <div style={{
            maxWidth: "800px",
            margin: "40px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff"
        }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>{post.title}</h2>
            <img 
                src={post.image} 
                alt={post.title} 
                style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    marginBottom: "15px"
                }}
            />
            <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.6" }}>{post.description}</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#28a745" }}>Price: Rs.{post.price}</p>
            <p><strong>Bedrooms:</strong> {post.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {post.bathrooms}</p>
            <p><strong>Address:</strong> {post.address}</p>

            <button 
                style={{
                    display: "block",
                    width: "100%",
                    padding: "12px",
                    marginTop: "20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "18px",
                    cursor: "pointer",
                    transition: "0.3s"
                }}
                onClick={handleConfirm}
                onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
            >
                Confirm
            </button>
        </div>
    );
}