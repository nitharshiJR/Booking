import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        userNIC: "",
        studyOrWork: "",
        parentName: "",
        parentPhone: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full Name is required.";
        if (!formData.address.trim() || formData.address.length < 5) newErrors.address = "Address must be at least 5 characters.";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number.";
        if (!/^[0-9A-Za-z]{10,12}$/.test(formData.userNIC)) newErrors.userNIC = "Enter a valid NIC (10-12 characters).";
        if (!formData.studyOrWork.trim()) newErrors.studyOrWork = "Study/Workplace is required.";
        if (!formData.parentName.trim()) newErrors.parentName = "Parent's Name is required.";
        if (!/^\d{10}$/.test(formData.parentPhone)) newErrors.parentPhone = "Enter a valid 10-digit Parent Phone number.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        try {
            const response = await axios.post("http://localhost:8000/api/register", formData);
            if (response.status === 201) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    
    const handleConfirm= () => {
        navigate("/pay");
    };

    
    

    return (
        <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Registration</h2>
            <form onSubmit={handleSubmit}>
                {[  
                    { label: "Full Name", name: "name" },
                    { label: "Address", name: "address" },
                    { label: "Phone Number", name: "phone", type: "tel" },
                    { label: "Your NIC", name: "userNIC" },
                    { label: "Study/Workplace", name: "studyOrWork" },
                    { label: "Parent's Name", name: "parentName" },
                    { label: "Parent's Phone Number", name: "parentPhone", type: "tel" }
                ].map(({ label, name, type = "text" }) => (
                    <div key={name} style={{ marginBottom: "15px" }}>
                        <label style={{ fontWeight: "bold" }}>{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                fontSize: "16px",
                                marginTop: "5px"
                            }}
                            required
                        />
                        {errors[name] && <small style={{ color: "red", display: "block", marginTop: "5px" }}>{errors[name]}</small>}
                    </div>
                ))}

                <button type="submit" style={{ width: "100%", padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", fontSize: "18px", cursor: "pointer" }}
                 onClick={handleConfirm}>
                    Confirm
                </button>
            </form>
        </div>
    );
}
