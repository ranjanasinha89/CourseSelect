const express = require("express");
const router = express.Router();
const passport = require("passport");

const Reviews = require("../../models/Reviews");
const nodemailer = require('nodemailer');

router.get(
    "/:coursenumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Reviews.find({ coursenumber: req.params.coursenumber })
        .then(Reviews => {
          res.json(Reviews);
        })
        .catch(err => res.status(404).json({ success: false }));
    }
  );


  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "courseselect2018@gmail.com",
      pass: "admin@1234"
    }
  });


  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("Inside api post", req.body);
      const abc = new Reviews({
        studentname: req.body.reviewsData.studentname,
        coursenumber: req.body.reviewsData.coursenumber,
        Reviews_Comment: req.body.reviewsData.description,
        rating: req.body.reviewsData.rating,

      });
      console.log("abc :  ", abc.body );


      abc
        .save()
        .then(reviews => {
          console.log(reviews);
          Reviews.find({ coursenumber: reviews.coursenumber }).then(Reviews => {
            res.json(Reviews);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  );

  router.delete(
    "/:coursenumber",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Reviews.findByCoursenumber(req.params.coursenumber)
        .then(reviews => {
          let coursenumber = reviews.coursenumber;
          reviews.remove().then(() => {
            Reviews.find({ coursenumber: coursenumber }).then(Reviews => {
              res.json(Reviews);
            });
          });
        })
        .catch(err => console.log(err));
    }
  );

  module.exports = router;
