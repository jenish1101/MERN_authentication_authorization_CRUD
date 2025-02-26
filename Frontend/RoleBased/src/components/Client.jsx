import { useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Client = () => {

  const navigate = useNavigate();
  const [message, setmessage] = useState("");

// First Step 
  useEffect(()=>{

    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
      return;
    }

    const DecodedToken = jwtDecode(token);
    // console.log("Client Decode Token:",DecodedToken);
    
    if(DecodedToken.role!== "client"){
      navigate("/login");
      return;
    }  
  },[navigate]);


// Second Step 

  const getClientData = async() =>{
    
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/api/auth/client",{
      headers:{Authorization: `Bearer ${token}`}
    });
    // console.log("Client Response: " , res.data);
    setmessage(res.data.message);
    
  }

  useEffect(()=>{
    getClientData();
  },[]);


  return (
    <>
    <div>Client</div>
    <p>{message}</p>
    </>
  )
}

export default Client