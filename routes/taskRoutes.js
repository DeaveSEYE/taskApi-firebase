const express = require("express");
const { check } = require("express-validator");
const taskController = require("../controllers/taskController");

const router = express.Router();
// export enum Priority {
//   High = 'eleve',
//   Medium = 'moyenne',
//   Low = 'basse',
// }
// Routes CRUD pour les tâches
router.get("/", taskController.getAllTasks);
router.get("/:userId", taskController.getTasksByUserId);
router.post(
  "/",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("categorie").notEmpty().withMessage("categorie is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("priority").notEmpty().withMessage("priority is required"),
    check("isChecked").notEmpty().withMessage("isChecked is required"),
    check("categorieColor")
      .notEmpty()
      .withMessage("categorieColor is required"),
    check("dueDate").notEmpty().withMessage("dueDate is required"),
    check("userId").notEmpty().withMessage("User ID is required"),
  ],
  taskController.createTask
);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
