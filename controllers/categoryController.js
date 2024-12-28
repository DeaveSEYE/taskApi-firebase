const CategoryModel = require("../models/category");

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getAll();
    res.status(200).json(categories);
  } catch (error) {
    res.send(error);
  }
};
exports.deleteAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.deleteAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
// Récupérer une catégorie par son ID
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await CategoryModel.getById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Créer une nouvelle catégorie
exports.createCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.update(req.params.id, req.body);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res, next) => {
  try {
    const message = await CategoryModel.delete(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
