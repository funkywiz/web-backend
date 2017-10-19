(function() {
    var bodyParser = require('body-parser');
    var User = require('../model/usermodel.js');
    module.exports.verification = function (req, res) {
        try {
            var fname = req.body.fname;
            var lname = req.body.lname;
            var email = req.body.email;
            var password = req.body.password;
            User.getUserByEmail(email, function (err, user) {
                if (err) throw err;
                if (user) {
                    console.log("User already exists");
                    res.sendStatus(301);
                }
                else {
                    var newUser = new User({
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: password
                    });

                    User.createUser(newUser, function (err, user) {
                        if (err) {
                            throw err;
                        }
                        console.log(user);
                    });
                    console.log("User created and can login");
                    res.sendStatus(200);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    };
})();