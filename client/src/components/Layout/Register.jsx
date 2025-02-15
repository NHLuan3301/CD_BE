import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/userApi";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            await registerUser({ username, email, password, phone });
            setMessage("Đăng ký thành công! Đang chuyển hướng...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            setError("Đăng ký thất bại! Vui lòng thử lại.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Đăng ký</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label>Tên đăng nhập</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Số điện thoại</label>
                    <input type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
