import { useState} from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount is required and must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails

    const cardElement = elements.getElement(CardElement);
    
    // Create Payment Method using Stripe
    const { token, error } = await stripe.createToken(cardElement);
    
    if (error) {
      setErrors({ ...errors, payment: error.message });
      return;
    }

    try {
      // Send token and payment details to your server for payment processing
      const response = await axios.post("http://localhost:8000/api/pay", {
        token: token.id,
        name: formData.name,
        amount: formData.amount,
      });

      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        marginTop: "20px", 
        padding: "20px", 
        height: "100vh" 
      }}>
        <iframe 
          src="https://lottie.host/embed/711cc7a7-1238-4302-ab62-08476f1c7a79/wzN43fODGg.lottie"
          style={{
            width: "400px", 
            height: "400px", 
            border: "none",
            marginRight: "20px"
          }}
          title="Success Animation"
        ></iframe>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              marginTop: "5px",
            }}
            required
          />
          {errors.name && <small style={{ color: "red", display: "block", marginTop: "5px" }}>{errors.name}</small>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "16px",
              marginTop: "5px",
            }}
            required
          />
          {errors.amount && <small style={{ color: "red", display: "block", marginTop: "5px" }}>{errors.amount}</small>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Card Information</label>
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
          {errors.payment && <small style={{ color: "red", display: "block", marginTop: "5px" }}>{errors.payment}</small>}
        </div>

        <button 
          type="submit" 
          disabled={!stripe} 
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
}
