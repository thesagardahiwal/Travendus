if(process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

const ATLUSTDB_URL = process.env.ATLUSTDB_URL;
const MONGO_DB = 'mongodb://127.0.0.1:27017/travendus';
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");


const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");


const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");
const { measureMemory } = require("vm");


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(ATLUSTDB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate); 
app.use(express.static(path.join(__dirname, '/public')));


const store = MongoStore.create({
  mongoUrl: ATLUSTDB_URL,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.fail = req.flash("fail");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  
  next();
})


app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/", userRouter);


app.all("*", (req,res, next)=>{
  next(new ExpressError(404, "Page not Found!"));
})

app.use((err,req,res,next)=> {
  let {statusCode=500, message="Error 500"} = err;
  if (statusCode == 404) {
    req.flash ("success", message);
  } else {
    req.flash ("fail", message);
  }
  res.redirect("/listings");
})

app.listen (8080, ()=>{
  console.log("Server is listing on port 8080")
})