import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);

    // Edit states
    const [editTitle, setEditTitle] = useState("");
    const [editBedrooms, setEditBedrooms] = useState("");
    const [editBathrooms, setEditBathrooms] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const apiUrl = "http://localhost:8000";

    const handleSubmit = () => {
        setError("");
        if (title && bedrooms && bathrooms && price && address && description) {
            fetch(apiUrl + "/details", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, bedrooms, bathrooms, price, address, description })
            }).then((res) => {
                if (res.ok) {
                    getItems();
                    setTitle(""); setBedrooms(""); setBathrooms(""); setPrice(""); setAddress(""); setDescription("");
                    setMessage("Item added successfully");
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setError("Unable to create Todo item");
                }
            }).catch(() => setError("Unable to create Todo item"));
        }
    };

    useEffect(() => { getItems(); }, []);

    const getItems = () => {
        fetch(apiUrl + "/details")
            .then(res => res.json())
            .then(res => setTodos(res));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            fetch(apiUrl + '/details/' + id, { method: "DELETE" })
                .then(() => getItems());
        }
    };

    return (
        <div className="container mt-4">
            <div className="text-center text-light bg-dark py-3 rounded">
                <h1>🏡 Property Listings</h1>
            </div>
            <div className="card p-4 mt-3">
                <h3 className="mb-3">Add New Property</h3>
                {message && <p className="alert alert-success">{message}</p>}
                <div className="row g-2">
                    <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className="form-control" type="number" />
                    <input placeholder="Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className="form-control" type="number" />
                    <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" type="number" />
                    <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" type="text" />
                    <button className="btn btn-primary mt-2" onClick={handleSubmit}>Add Property</button>
                </div>
                {error && <p className="alert alert-danger mt-2">{error}</p>}
            </div>
            <div className="mt-4">
                <h3>Available Properties</h3>
                <div className="row">
                    {todos.map((item) => (
                        <div key={item._id} className="col-md-4">
                            <div className="card shadow-sm p-3 mb-3">
                                <h5>{item.title}</h5>
                                <p><strong>Bedrooms:</strong> {item.bedrooms}</p>
                                <p><strong>Bathrooms:</strong> {item.bathrooms}</p>
                                <p><strong>Price:</strong> ${item.price}</p>
                                <p><strong>Address:</strong> {item.address}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
