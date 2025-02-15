import axios from "axios";

const API_URL = "http://localhost:5000/api/company";

// Lấy danh sách công ty
export const getCompanies = () => axios.get(`${API_URL}`);

// Thêm công ty mới
export const addCompany = (company) => axios.post(`${API_URL}`, company);

// Cập nhật công ty
export const updateCompany = (id, updatedCompany) => axios.put(`${API_URL}/${id}`, updatedCompany);

// Xóa công ty
export const deleteCompany = (id) => axios.delete(`${API_URL}/${id}`);
