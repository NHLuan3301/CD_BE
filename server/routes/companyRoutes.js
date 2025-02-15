const express = require("express");
const router = express.Router();
const Company = require("../models/Company.js");

// 📜 Lấy danh sách công ty
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách công ty", error });
  }
});

// 🔍 Tìm kiếm công ty theo tên
router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp từ khóa tìm kiếm" });
    }

    const companies = await Company.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm công ty", error });
  }
});

// ➕ Tạo công ty mới
router.post("/", async (req, res) => {
  try {
    const { name, address, email, phone, website } = req.body;
    if (!name || !address || !email || !phone) {
      return res.status(400).json({ message: "Thiếu thông tin công ty" });
    }
    const newCompany = new Company({
      name,
      address,
      email,
      phone,
      website,
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    console.error("Lỗi khi thêm công ty:", error);
    res.status(400).json({ message: "Dữ liệu đầu vào không hợp lệ", error });
  }
});

// ✏️ Cập nhật thông tin công ty
router.put("/:id", async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Công ty không tồn tại" });
    }

    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật công ty", error });
  }
});

// 🗑️ Xóa công ty
router.delete("/:id", async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Công ty không tồn tại" });
    }

    res.json({ message: "Xóa công ty thành công", deletedCompany });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa công ty", error });
  }
});
module.exports = router;
