import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi"; // API gọi danh sách sản phẩm

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
    };

    return (
        <div className="container mx-auto mt-5">
            <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border rounded-lg p-4 shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-500">{product.description}</p>
                        <p className="text-red-500 font-bold">{product.price} VND</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Mua ngay</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
