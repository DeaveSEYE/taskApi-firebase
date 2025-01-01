const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage(" password is required"),
  ],
  userController.createUser
);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
