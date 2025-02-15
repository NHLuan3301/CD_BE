import { useState, useEffect } from "react";
import {
  getProductsSearch,
  searchProduct,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../../api/productApi";
import { getCompanies } from "../../api/companyApi";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [company, setCompany] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("name");
  const [totalPages, setTotalPages] = useState();
  const [order, setOrder] = useState("asc");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    stock: 0,
    company: "",
    description: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [keyword, setKeyword] = useState("");
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      // api phân trang, sort (xắp xếp)
      const response = await getProductsSearch(
        page,
        limit,
        sortBy,
        order,
        keyword
      );

      setProducts(response.data);

      // Nếu số lượng sản phẩm trả về nhỏ hơn limit, có thể đây là trang cuối
      if (response.data.length < limit) {
        setTotalPages(page);
      } else {
        setTotalPages(page + 1); // Giả định có thêm trang tiếp theo
      }
    };
    fetch();
  }, [page, sortBy, order, keyword, limit]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompanies();
      setCompany(response.data);
    };
    fetchCompanies();
  }, []);

  const handleAddProduct = () => {
    addProduct(newProduct)
      .then(() => {
        setNewProduct({
          name: "",
          price: "",
          image: "",
          category: "",
          stock: 0,
          company: "",
          description: "",
        });
        setPage(1);
      })
      .catch((error) => console.error("Lỗi khi thêm sản phẩm:", error));
  };

  const handleEditProduct = () => {
    updateProduct(editProduct._id, editProduct)
      .then(() => setEditProduct(null))
      .catch((error) => console.error("Lỗi khi cập nhật sản phẩm:", error));
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      deleteProduct(productToDelete._id)
        .then(() => {
          setProducts(products.filter((p) => p._id !== productToDelete._id));
          setProductToDelete(null);
        })
        .catch((error) => console.error("Lỗi khi xóa sản phẩm:", error));
    }
  };

  return (
    <div className="container mt-4 max-h-screen">
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProductModal"
        >
          Thêm sản phẩm
        </button>
      </div>
      <select
        class="form-select my-2 "
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="desc">Sắp xếp A-Z</option>
        <option value="asc">Sắp xếp Z-A</option>
      </select>
      <select
        class="form-select my-2 "
        onChange={(e) => setLimit(e.target.value)}
      >
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Hình ảnh</th>
            <th>Giá</th>
            <th>Công ty</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, key) => (
            <tr key={key}>
              <td>{product.name}</td>
              <td>
                <img src={product.image} alt="" width={50} height={50} />
              </td>
              <td>{product.price}</td>
              <td>{product.company.name}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editProductModal"
                  onClick={() => setEditProduct(product)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteProductModal"
                  onClick={() => setProductToDelete(product)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Thêm sản phẩm */}
      <div className="modal fade" id="addProductModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thêm sản phẩm</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Giá sản phẩm</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập giá sản phẩm"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label className="form-label">URL hình ảnh</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập URL hình ảnh"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Số lượng trong kho</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập số lượng"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Mô tả sản phẩm</label>
                <textarea
                  className="form-control"
                  placeholder="Nhập mô tả sản phẩm"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Công ty</label>
                <select
                  className="form-control"
                  value={newProduct.company}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, company: e.target.value })
                  }
                >
                  <option value="">Chọn công ty</option>
                  {company.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleAddProduct}
                data-bs-dismiss="modal"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sửa sản phẩm */}
      <div className="modal fade" id="editProductModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Chỉnh sửa sản phẩm</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Tên sản phẩm"
                value={editProduct?.name || ""}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleEditProduct}
                data-bs-dismiss="modal"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xóa sản phẩm */}
      <div className="modal fade" id="deleteProductModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận xóa</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={handleDeleteProduct}
                data-bs-dismiss="modal"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="primary btn"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          className="primary btn"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ProductManager;
