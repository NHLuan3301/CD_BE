import { Link } from "react-router-dom";

const UserNavbar = () => {
    const user = JSON.parse(localStorage.getItem("data"));

    return (
        <nav className="bg-blue-600 p-4 flex justify-between w-full">
            <div className="flex space-x-4">
                <Link to="/" className="text-white text-lg font-bold">Trang chủ</Link>
                <Link to="/products" className="text-white text-lg">Sản phẩm</Link>
            </div>
            <div>
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-white">Xin chào, {user.username}</span>
                        <button className="text-white hover:text-red-400" onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("data");
                            window.location.href = "/login";
                        }}>
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="text-white text-lg">Đăng nhập</Link>
                )}
            </div>
        </nav>
    );
};

export default UserNavbar;
