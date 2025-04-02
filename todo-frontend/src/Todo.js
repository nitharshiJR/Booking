import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [mapImage, setMapImage] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    const apiUrl = "http://localhost:8000/api/rooms";

    useEffect(() => { getItems(); }, []);

    const getItems = async () => {
        try {
            const res = await fetch(apiUrl);
            if (res.ok) {
                const data = await res.json();
                setTodos(data);
            } else {
                setError("Failed to load properties");
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
            setError("Error fetching properties.");
        }
    };

    const handleSubmit = async () => {
        setError("");
        if (title && bedrooms && bathrooms && price && address && description && mapImage && mapLink) {
            try {
                const method = editId ? "PUT" : "POST";
                const url = editId ? `${apiUrl}/${editId}` : apiUrl;

                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, bedrooms, bathrooms, price, address, description, mapImage, mapLink })
                });

                if (response.ok) {
                    getItems();
                    setTitle(""); setBedrooms(""); setBathrooms(""); setPrice(""); setAddress(""); setDescription(""); setMapImage(""); setMapLink("");
                    setEditId(null);
                    setMessage(editId ? "Property updated successfully" : "Property added successfully");
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to save property");
                }
            } catch (error) {
                setError("Error: " + error.message);
            }
        } else {
            setError("All fields are required");
        }
    };

    const handleEdit = (item) => {
        setTitle(item.title);
        setBedrooms(item.bedrooms);
        setBathrooms(item.bathrooms);
        setPrice(item.price);
        setAddress(item.address);
        setDescription(item.description);
        setMapImage(item.mapImage);
        setMapLink(item.mapLink);
        setEditId(item._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            try {
                await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
                getItems();
            } catch (error) {
                console.error("Error deleting property:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="text-center text-light bg-dark py-3 rounded">
                <h1>🏡 Property Listings</h1>
            </div>
            <div className="card p-4 mt-3">
                <h3 className="mb-3">{editId ? "Edit Property" : "Add New Property"}</h3>
                {message && <p className="alert alert-success">{message}</p>}
                <div className="row g-2">
                    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="form-control" type="number" />
                    <input placeholder="Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="form-control" type="number" />
                    <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" type="number" />
                    <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Map Image URL" value={mapImage} onChange={(e) => setMapImage(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Google Map Link" value={mapLink} onChange={(e) => setMapLink(e.target.value)} className="form-control" type="text" />
                    <button className="btn btn-primary mt-2" onClick={handleSubmit}>{editId ? "Update Property" : "Add Property"}</button>
                </div>
                {error && <p className="alert alert-danger mt-2">{error}</p>}
            </div>
            <div className="mt-4">
                <h3>Available Properties</h3>
                <div className="row">
                    {todos.length > 0 ? (
                        todos.map((item) => (
                            <div key={item._id} className="col-md-4">
                                <div className="card shadow-sm p-3 mb-3">
                                    <h5>{item.title}</h5>
                                    <p><strong>Bedrooms:</strong> {item.bedrooms}</p>
                                    <p><strong>Bathrooms:</strong> {item.bathrooms}</p>
                                    <p><strong>Price:</strong> Rs.{item.price}</p>
                                    <p><strong>Address:</strong> {item.address}</p>
                                    <p><strong>Description:</strong> {item.description}</p>
                                    <img src={item.mapImage} alt="Map" className="img-fluid" />
                                    <p>
                                        <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-info mt-2">View on Map</a>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading properties...</p>
                    )}
                </div>
            </div>
        </div>
    );
}