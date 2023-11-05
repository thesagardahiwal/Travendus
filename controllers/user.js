const User = require("../models/user.js");
const { use } = require("passport");

module.exports.signup = async(req,res)=>{
    let {username, password,confirm_password,email} = req.body;
    try{
        if (password === confirm_password) {
            let newUser = new User({
                email: email,
                username: username
            });
            let registeredUser = await User.register(newUser, password);
            req.login(registeredUser, (err)=> {
                if (err) {
                    return next ();
                }
                req.flash("success", `Account successfully created for username: ${username}`);
                let redirect = res.locals.redirectUrl || "/listings";
                res.redirect(redirect);
            })
            
        } else {
            req.flash("error", "Password didn't match!");
            res.redirect("/signup")
        }
    } catch (e) {
        req.flash("error", e.message+"!");
        res.redirect("/signup");
    }  
}

module.exports.login = async(req,res) => {
    req.flash("success","Welcome back to Travendus!");
    let redirect = res.locals.redirectUrl || "/listings";
    res.redirect(redirect);
}

module.exports.logout =  (req,res, next) => {
    req.logout((err) => {
        if (err) {
           return next(err);
        }
        req.flash("success", "User logout sucessfully");
        res.redirect("/listings");
    })
}

module.exports.signupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.loginForm = (req,res) => {
    res.render("users/login.ejs");
}

module.exports.home = (req, res) => {
    req.flash("success", "Welcome to Travendus");
    res.redirect("/listings");
}