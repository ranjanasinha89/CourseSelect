const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const randomstring = require("randomstring");
const mailer = require("../../misc/mailer");
const nodemailer = require("nodemailer");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateVerificationUser = require("../../validation/email_verification");

const keys = require("../../config/keys");
const User = require("../../models/User");
const Studentinfo = require("../../models/Studentinfo");

// @route   GET  api/users/
// @desc    Get User Details from User collection
// @access  Public

router.get("/", (req, res) => {
  const User = require("../../models/User");
  // let ReturnUserList = [];
  User.find()
    .sort({ date: -1 })
    .then(users => {
      // console.log("All Users: ", users);
      res.json(users);
    });
});

// @route   POST  api/users/register
// @desc    Tests post route
// @access  Public

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "courseselect2018@gmail.com",
    pass: "admin@1234"
  }
});

router.post("/register", (req, res) => {
  console.log("Parameters: ", req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ "local.email": req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exsist";
      return res.status(400).json(errors);
    } else {
      if (req.body.role === "STUDENT") {
        console.log("For a student: ", req.body.universityid);
        Studentinfo.findOne({ studentid: req.body.universityid })
          .then(Studentinfo => {
            console.log("The result: ", Studentinfo);
            if (Studentinfo) {
              errors.universityid = "University ID already exists";
              return res.status(400).json(errors);
            }
          })
          .catch(err => console.log(err));
      }
      console.log("Now we are here");
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      //Error here coz it has to be stored in local
      const newUser = new User({
        method: "local",
        user_type: req.body.role,
        university_id: req.body.universityid,
        local: {
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        }
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.local.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.local.password = hash;
          //Generate a secret token
          const randomSecretToken = randomstring.generate();
          newUser.local.randomSecretToken = randomSecretToken;
          newUser.local.active = false;
          // Compose an email
          const html = `Hi ${req.body.name}!
            Token: ${randomSecretToken}
            `;

          var mailOptions = {
            from: "courseselect2018@gmail.com",
            to: req.body.email,
            subject: "Email verification",
            text: html
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          newUser
            .save()
            .then(user => {
              // console.log(user);
              res.json(user);
              if (req.body.role === "STUDENT") {
                const newStudentinfo = new Studentinfo({
                  name: req.body.name,
                  studentid: req.body.universityid
                });
                newStudentinfo
                  .save()
                  .then(studentinfo => console.log("Student Created"));
              }
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET  api/users/login
// @desc    Login users/ return JWT Token
// @access  Public

router.post("/login", (req, res) => {
  // console.log("In login");
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ "local.email": email }).then(user => {
    if (!user) {
      errors.email = "User email not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.local.password).then(isMatch => {
      if (isMatch) {
        if (user.local.active === false) {
          errors.inactive = "You need to verify your account";
          return res.status(400).json(errors);
        }
        //user matched
        const payload = {
          id: user.id,
          user_type: user.user_type,
          university_id: user.university_id,
          name: user.local.name,
          avatar: user.local.avatar
        };
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET  api/users/oauth/google
// @desc    Login users with google auth
// @access  Public
router.post(
  "/oauth/google",
  passport.authenticate("googleToken", { session: false }),
  (req, res) => {
    const payload = {
      id: req.user.id,
      name: req.user.google.name,
      avatar: req.user.google.avatar
    };
    //sign token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  }
);

// @route   POST  api/users/verfiy
// @desc    Verify post route
// @access  Public

router.post("/verify", (req, res) => {
  const { errors, isValid } = validateVerificationUser(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ "local.randomSecretToken": req.body.secrettoken })
    .then(user => {
      if (user && user.method === "local" && user.local.active === false) {
        User.findOneAndUpdate({ _id: user._id }, { "local.active": true }).then(
          function() {
            User.findOne({ _id: user._id }).then(function(result) {
              return res.json(result);
            });
          }
        );
      } else if (user.local.active === true) {
        errors.message = "Account has been active already. Please login!";
        return res.status(400).json(errors);
      }
    })
    .catch(err => res.status(404).json({ message: "Invalid token entered" }));
});

// @route   GET  api/users/current
// @desc    Return current user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
