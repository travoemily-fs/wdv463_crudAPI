const express = require("express");
const passport = require("passport");

const passportService = require("../services/passport");
const requireLogin = passport.authenticate("local", { session: false });

const router = express.Router();

const AuthenticationController = require("../controllers/authentication_controller");

// create a user
router.post("/", AuthenticationController.signup);
// signin user
router.post("/signin", requireLogin, AuthenticationController.signin);

module.exports = router;
