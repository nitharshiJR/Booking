import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/post"; // Import the Post component

export default function RoomList() {
    const [rooms, setRooms] = useState([]);  // Changed state name to 'rooms'
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {  // Changed function name to 'fetchRooms'
            try {
                const response = await axios.get(`http://localhost:8000/api/rooms`);  // Updated endpoint to 'rooms'
                setRooms(response.data);  // Set the response data as 'rooms'
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError("Failed to load rooms.");
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    if (loading) return <h1 style={styles.loading}>Loading properties...</h1>;
    if (error) return <h1 style={styles.error}>{error}</h1>;
    if (rooms.length === 0) return <h2 style={styles.noProperties}>No properties available.</h2>;

    return (
        <main style={styles.container}>
            <h2 style={styles.heading}>Available Properties</h2>
            <div style={styles.gridContainer}>
                {rooms.map((room) => (  // Changed 'posts' to 'rooms'
                    <div key={room._id} style={styles.card}>
                        <Post post={room} />  // Passing 'room' instead of 'post'
                    </div>
                ))}
            </div>
        </main>
    );
}

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#FFFFFF", // White background for a clean look
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "20px auto",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#1E90FF", // Blue color for the heading (professional look)
        marginBottom: "20px",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        padding: "10px",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.15)",
        padding: "15px",
        transition: "transform 0.3s",
    },
    cardHover: {
        transform: "scale(1.05)",
    },
    loading: {
        textAlign: "center",
        color: "#1E90FF", // Blue color for loading text
        fontSize: "20px",
        fontWeight: "bold",
    },
    error: {
        textAlign: "center",
        color: "#FF6347", // Red color for errors to grab attention
        fontSize: "20px",
        fontWeight: "bold",
    },
    noProperties: {
        textAlign: "center",
        color: "#808080", // Gray color for 'no properties' message
        fontSize: "18px",
    },
};

// Hover effect for cards
const hoverStyles = {
    card: {
        backgroundColor: "#f8f9fa", // Light gray background on hover
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    },
};