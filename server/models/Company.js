const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  address: { type: String, required: true, trim: true }, // Địa chỉ công ty
  email: { type: String, required: true, trim: true, unique: true }, // Email công ty
  phone: { type: String, required: true, trim: true, unique: true }, // Số điện thoại
  website: { type: String, trim: true }, // Trang web (nếu có)
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
