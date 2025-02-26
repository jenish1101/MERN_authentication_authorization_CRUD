import { useState } from "react";
import "./css/Register.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Login = () => {

  const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log("Form Submitted", formData);

      const res = await axios.post("http://localhost:3000/api/auth/login",formData);
      if(res){
        alert(res.data.message);
      }


      const token = res.data.token;
      localStorage.setItem("token", token); // Store token in local storage

      const decoded = jwtDecode(token); // Decode token to get role (jwtDecode Is Npm Package Which id Used In Frontend For Get Data Form Token)
      console.log("Decoencoded token Login", decoded);
      
      if(decoded.role === "client"){
        navigate("/client");
      }else if(decoded.role === "admin"){
        navigate("/admin");
      }else if(decoded.role === "visitor"){
        navigate("/visitor");
      }
      
    };
  
    return (
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
  
          <button type="submit">Login</button>

          <p>Don not have an account? <Link to="/">Register</Link></p>
        </form>
      </div>
    );
  };
  
  export default Login;