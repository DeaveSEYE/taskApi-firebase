const TaskModel = require("../models/task");

// Récupérer toutes les tâches
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await TaskModel.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
exports.deleteAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.deleteAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.send(error);
  }
};
// Récupérer une tâche par son ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await TaskModel.getById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Créer une nouvelle tâche
exports.createTask = async (req, res, next) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res, next) => {
  try {
    const task = await TaskModel.update(req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res, next) => {
  try {
    const message = await TaskModel.delete(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
