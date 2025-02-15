const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
const Company = require("../models/Company.js"); // Import Company model

// 🛍️ Lấy danh sách sản phẩm (bao gồm thông tin công ty)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate(
      "company",
      "name email phone"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
  }
});
// ➕ Tạo sản phẩm mới (Kiểm tra company trước khi tạo)
router.post("/", async (req, res) => {
  try {
    const { name, price, image, stock, description, company } = req.body;

    if (!name || !price || !stock || !company) {
      return res.status(400).json({ message: "Thiếu thông tin sản phẩm" });
    }

    // Kiểm tra xem công ty có tồn tại không
    const existingCompany = await Company.findById(company);
    if (!existingCompany) {
      return res.status(400).json({ message: "Công ty không tồn tại" });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      stock,
      description,
      company,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(400).json({ message: "Dữ liệu đầu vào không hợp lệ", error });
  }
});

// ✏️ Cập nhật sản phẩm (Kiểm tra company nếu có cập nhật)
router.put("/:id", async (req, res) => {
  try {
    const { company } = req.body;

    // Nếu người dùng cập nhật company, kiểm tra xem nó có tồn tại không
    if (company) {
      const existingCompany = await Company.findById(company);
      if (!existingCompany) {
        return res.status(400).json({ message: "Công ty không tồn tại" });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm", error });
  }
});

// 🗑️ Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json({ message: "Xóa sản phẩm thành công", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error });
  }
});
//api sort, search,page, limit
router.get("/search", async (req, res) => {
  try {
    let { page, limit, sortBy, order, keyword } = req.query;
    page = parseInt(page) || 1; // Mặc định trang 1
    limit = parseInt(limit) || 10; // Mặc định lấy 10 sản phẩm mỗi trang
    order = order === "asc" ? -1 : 1; // Mặc định tăng dần (asc)

    const skip = (page - 1) * limit;
    const filter = keyword ? { name: { $regex: keyword, $options: "i" } } : {};

    const products = await Product.find(filter)
      .populate("company", "name email phone")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);
    //trả lại cho request của người dùng
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
  }
});
module.exports = router;
