const User = require("../models/user");


module.exports.renderSignUpFrom =  (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signUp = async(req, res) => {
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    })
    
    } catch(error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    };
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Login Successsfully");
    let red = res.locals.redirectUrl || "/listings";
    res.redirect(red); 
};

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
     if(err) {
        return next(err);
     }
     req.flash("success", "you are logged out");
     res.redirect("/listings");
    });
};


