const express = require("express");
const { check } = require("express-validator");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// Routes CRUD pour les catégories
router.get("/", categoryController.getAllCategories);
router.post(
  "/",
  [check("categorie").notEmpty().withMessage("Category name is required")],
  [check("categorieColor").notEmpty().withMessage("Category name is required")],
  [check("createdAt").notEmpty().withMessage("Category name is required")],
  [check("updatedAt").notEmpty().withMessage("Category name is required")],
  categoryController.createCategory
);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
