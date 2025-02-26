import { useState } from "react";
import "./css/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    const res = await axios.post("http://localhost:3000/api/auth/register",formData);
    alert(res.data.message);

  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
          <option value="visitor">Visitor</option>
        </select>

        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};
export default Register