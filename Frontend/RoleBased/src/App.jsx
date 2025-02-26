import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Client from "./components/Client";
import Admin from "./components/Admin";
import Visitor from "./components/Visitor";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/visitor" element={<Visitor />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App