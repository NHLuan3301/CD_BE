//trang bắt đầu
import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import UserLayout from "./components/Layout/UserLayout.jsx";
import Login from "./components/Layout/Login.jsx";
import Register from "./components/Layout/Register.jsx";
import HomePage from "./components/Layout/HomePage.jsx";
import ProductList from "./pages/user/ProductList.jsx";
function App() {
  const user = JSON.parse(localStorage.getItem("data"));
  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <Routes>
        {/* Các route dành cho admin */}
        {isAdmin && <Route path="/admin/*" element={<AdminLayout />} />}
        {/* Các route dành cho user */}
        <Route path="/*" element={<UserLayout />}>
          {/* Sử dụng index route cho trang chủ */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<ProductList />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
