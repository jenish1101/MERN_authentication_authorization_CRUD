import { useEffect } from "react"
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";


const Visitor = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");

    // Check Jwt TokenAvaliable Or Not (Authorization)
    if(!token){
      navigate("/login");
      return;
    }

    // Check Role is Visiotr Or Not (Authentication)
    const DecodeToken = jwtDecode(token);
    if(DecodeToken.role !== "visitor"){
      navigate("/login");
      return;
    }
  },[navigate]);

  return (
    <div>Visitor</div>
  )
}

export default Visitor