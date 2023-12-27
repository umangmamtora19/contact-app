const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { userRegister, userLogin, getCurrentUser } = require("../controllers/user_controller");

const router = express.Router();

router.post("/register", userRegister)

router.post("/login", userLogin)

router.get("/current", validateToken, getCurrentUser)

module.exports = router