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
                const response = await axios.get(`http://localhost:8000/api/rooms/${id}`);
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

    if (loading) return <h1 className="text-center text-primary">Loading post details...</h1>;
    if (error) return <h1 className="text-center text-danger">{error}</h1>;
    if (!post) return <h1 className="text-center text-warning">Post not found.</h1>;

    return (
        <div className="container mt-4 p-4 border rounded shadow bg-light" style={{ maxWidth: "800px" }}>
            <h2 className="text-center text-dark">{post.title}</h2>
            
            {/* Main post image */}
            <img 
                src={post.image || "https://via.placeholder.com/600"} 
                alt={post.title} 
                className="img-fluid rounded mb-3"
            />
            
            <p className="text-secondary">{post.description}</p>
            <p className="fw-bold text-success">Price: Rs.{post.price}</p>
            <p><strong>Bedrooms:</strong> {post.bedrooms}</p>
            <p><strong>Bathrooms:</strong> {post.bathrooms}</p>
            <p><strong>Address:</strong> {post.address}</p>
            
            {/* Map Image with link */}
            {post.mapImage && post.mapLink ? (
                <a href={post.mapLink} target="_blank" rel="noopener noreferrer">
                    <img 
                        src="https://i.pinimg.com/736x/18/4b/32/184b32063745dc834166aaafb1f765ec.jpg"
                        alt="Map Location" 
                        className="img-fluid rounded mt-3"
                        style={{ cursor: "pointer",width: "100px", height: "100px" }}	

                    />
                </a>
            ) : (
                <p className="text-center text-muted">Map location not available</p>
            )}

            <button 
                className="btn btn-success w-100 mt-3" 
                onClick={handleConfirm}
                onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
            >
                Confirm
            </button>
        </div>
    );
}