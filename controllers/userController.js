const UserModel = require("../models/users");

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Récupérer un utilisateur par son ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.getById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res, next) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.update(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const message = await UserModel.delete(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
