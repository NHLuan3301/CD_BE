import React, { useEffect, useState } from "react";
import {
    getCompanies,
    addCompany,
    updateCompany,
    deleteCompany,
} from "../../api/companyApi";

const CompanyManager = () => {
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
    });
    const [editCompany, setEditCompany] = useState(null);
    const [companyToDelete, setCompanyToDelete] = useState(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            setCompanies(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách công ty:", error);
        }
    };

    const handleAddCompany = async () => {
        try {
            await addCompany(newCompany);
            fetchCompanies();
            setNewCompany({ name: "", address: "", email: "", phone: "", website: "" });
        } catch (error) {
            console.error("Lỗi khi thêm công ty:", error);
        }
    };

    const handleEditCompany = async () => {
        try {
            await updateCompany(editCompany._id, editCompany);
            fetchCompanies();
            setEditCompany(null);
        } catch (error) {
            console.error("Lỗi khi cập nhật công ty:", error);
        }
    };

    const handleDeleteCompany = async () => {
        try {
            await deleteCompany(companyToDelete._id);
            fetchCompanies();
            setCompanyToDelete(null);
        } catch (error) {
            console.error("Lỗi khi xóa công ty:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Quản lý công ty</h2>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCompanyModal">
                    Thêm công ty
                </button>
            </div>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Website</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company, index) => (
                        <tr key={index}>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>{company.email}</td>
                            <td>{company.phone}</td>
                            <td>{company.website}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editCompanyModal"
                                    onClick={() => setEditCompany(company)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteCompanyModal"
                                    onClick={() => setCompanyToDelete(company)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal Thêm Công Ty */}
            <div className="modal fade" id="addCompanyModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm công ty</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            {["name", "address", "email", "phone", "website"].map((field) => (
                                <div className="mb-2" key={field}>
                                    <label className="form-label">{field.toUpperCase()}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newCompany[field]}
                                        onChange={(e) => setNewCompany({ ...newCompany, [field]: e.target.value })}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleAddCompany} data-bs-dismiss="modal">
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Sửa Công Ty */}
            <div className="modal fade" id="editCompanyModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Chỉnh sửa công ty</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            {editCompany &&
                                ["name", "address", "email", "phone", "website"].map((field) => (
                                    <div className="mb-2" key={field}>
                                        <label className="form-label">{field.toUpperCase()}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editCompany[field]}
                                            onChange={(e) =>
                                                setEditCompany({ ...editCompany, [field]: e.target.value })
                                            }
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleEditCompany} data-bs-dismiss="modal">
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Xóa Công Ty */}
            <div className="modal fade" id="deleteCompanyModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xác nhận xóa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Bạn có chắc chắn muốn xóa công ty này không?</div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={handleDeleteCompany} data-bs-dismiss="modal">
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyManager;
