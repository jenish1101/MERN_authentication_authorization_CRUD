// Admin page Without Updation 



// import { useEffect, useState } from "react"
// import {jwtDecode} from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./css/Admin.css"


// const Admin = () => {

//   const navigate = useNavigate();
//   const [UsersInfomations, setUsersInfomations] = useState([]);

//   // For updation 
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentUser, setCurrentUser] = useState({ id: "", email: "", role: "" });

//   // first 
//   useEffect(()=>{
//     const token = localStorage.getItem("token");
//     if(!token){
//       navigate("/login");
//       return;
//     }

//     const DecodedToken = jwtDecode(token);
//     console.log("Admin Decode Token:",DecodedToken);
    
//     if(DecodedToken.role!== "admin"){
//       navigate("/login");
//       return;
//     }  
//   },[navigate])


//   // second 
//   const getAdminData=async()=>{

//     const token= localStorage.getItem("token");

//     const res = await axios.get("http://localhost:3000/api/auth/admin",{
//       headers:{Authorization:`Bearer ${token}`}
//     });
//     console.log(res.data.UserData);
    
//     if(res.data.UserData){
//       console.log("Admin Response", res.data.UserData);
//       setUsersInfomations(res.data.UserData);
//     }

//   }

//   useEffect(()=>{
//     getAdminData();
//   },[])

  
//   // delete
//   const handleDelete=async(id)=>{
//     const res = await axios.delete(`http://localhost:3000/api/auth/admin/delete/${id}`,)
//     alert(res.data.message);
//     getAdminData();
//   }
  
//   // update 
//   const handleUpdate=async(id)=>{
//     const res = await axios.put(`http://localhost:3000/api/auth/admin/update/${id}`,)
//     alert(res.data.message);
//   }


//   return (
//     <div>
//       <h1>Admin</h1>
//       <div className="admin-container">
        
// {/* Show All Users  */}
//         {UsersInfomations.map((data) => (
//           <div key={data._id} className="user-card">
//             <h3>User Email: {data.email}</h3>
//             <p>User Role: {data.role}</p>
//             <div className="buttons">
//               <button className="btn-1" onClick={()=>handleUpdate(data._id)}>UPDATE</button>
//               <button className="btn-2" onClick={()=>handleDelete(data._id)}>DELETE</button>
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   )
// }

// export default Admin