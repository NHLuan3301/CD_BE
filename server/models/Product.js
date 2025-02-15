const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  }, // Liên kết với công ty
  description: { type: String, trim: true }, // Mô tả sản phẩm
  image: { type: String, trim: true }, // URL ảnh sản phẩm
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
