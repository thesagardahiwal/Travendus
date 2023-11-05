const express = require("express");
const router = express.Router();
const { use } = require("passport");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
router
    .route("/")
    .get(userController.home)

router
    .route("/signup")
    .get(userController.signupForm)
    .post(saveRedirectUrl, userController.signup);

router
    .route("/login")    
    .get(userController.loginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

router.get("/logout", userController.logout);


module.exports = router;