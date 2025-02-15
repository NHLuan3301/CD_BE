import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem("data", JSON.stringify(response.data.user));
            setMessage("Đăng nhập thành công!");
            setTimeout(() => navigate("/admin/products"), 3000);
        } catch (error) {
            setError("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Đăng nhập</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Đăng nhập</button>
            </form>
        </div>
    );
};

export default Login;
