// AdminLayout.jsx
import { Routes, Route } from "react-router-dom";
import ProductManager from "../Admin/ProductManager";
import CompanyManager from "../Admin/CompanyManager";
import UserManager from "../Admin/UserManager";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
    return (
        <div className="flex h-screen">
            <AdminNavbar />
            <div className="flex-1 p-6 overflow-auto bg-gray-100">
                <Routes>
                    <Route path="products" element={<ProductManager />} />
                    <Route path="company" element={<CompanyManager />} />
                    <Route path="users" element={<UserManager />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminLayout;
