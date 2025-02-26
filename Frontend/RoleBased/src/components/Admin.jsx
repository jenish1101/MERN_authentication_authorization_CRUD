import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Admin.css"


const Admin = () => {

  const navigate = useNavigate();
  const [UsersInfomations, setUsersInfomations] = useState([]);

  // For show popup menu and updation
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState({ id: "", email: "", role: "" });

  // first 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const DecodedToken = jwtDecode(token);
    console.log("Admin Decode Token:", DecodedToken);

    if (DecodedToken.role !== "admin") {
      navigate("/login");
      return;
    }
  }, [navigate])


  // second 
  const getAdminData = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/api/auth/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res.data.UserData);

    if (res.data.UserData) {
      console.log("Admin Response", res.data.UserData);
      setUsersInfomations(res.data.UserData);
    }

  }

  useEffect(() => {
    getAdminData();
  }, [])


  // delete
  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/api/auth/admin/delete/${id}`,)
    alert(res.data.message);
    getAdminData();
  }


  // Open popup for updating user
  const openPopup = (user) => {
    setEditUser({ id: user._id, email: user.email, role: user.role });  //For Show Data Of User When PopUp is Open
    setShowPopup(true); //For Open Popup
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false); //For Close Popup
    setEditUser({ id: "", email: "", role: "" }); //For Remove User Data Of User When PopUp is Closed
  };


  // update 
  const handleUpdate = async () => {
    const res = await axios.put(`http://localhost:3000/api/auth/admin/update/${editUser.id}`, {
      email: editUser.email,
      role: editUser.role,
    })
    alert(res.data.message);
    closePopup();
    getAdminData();
  }


  return (
    <div>
      <h1>Admin</h1>

      {/* Admin Container  */}
      <div className="admin-container">

        {/* Show All Users  */}
        {UsersInfomations.map((data) => (
          <div key={data._id} className="user-card">
            <h3>User Email: {data.email}</h3>
            <p>User Role: {data.role}</p>
            <div className="buttons">
              <button className="btn-1" onClick={() => openPopup(data)}>UPDATE</button>
              <button className="btn-2" onClick={() => handleDelete(data._id)}>DELETE</button>
            </div>
          </div>
        ))}

      </div>

      {/* Popup Modal for Update */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Update User</h2>
            <label>Email:</label>
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />

            <label>Role:</label>
            <select
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="visitor">Visitor</option>
            </select>

            <div className="popup-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default Admin