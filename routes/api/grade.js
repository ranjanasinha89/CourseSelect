const express = require("express");
const router = express.Router();
const passport = require("passport");

const Grade = require("../../models/Grade");

router.get(
  "/:coursenumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Get Api Called", req.params.coursenumber);
    Grade.find({
      coursenumber: req.params.coursenumber
    })
      .then(abc => res.json(abc))
      .catch(err => res.status(404).json({ success: false }));
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Api Called");
    const newGrade = new Grade({
      studentid: req.body.gradeObj.studentid,
      coursenumber: req.body.gradeObj.coursenumber,
      grade: req.body.gradeObj.grade
    });
    Grade.findOne({
      studentid: req.body.gradeObj.studentid,
      coursenumber: req.body.gradeObj.coursenumber
    }).then(abc => {
      console.log("Found: ", abc);
      if (abc) {
        abc.remove().then(() => console.log("Remove Successfull"));
      }
      newGrade
        .save()
        .then(Grade => {
          res.json(Grade);
        })
        .catch(err => res.status(404).json({ success: false }));
    });
  }
);

module.exports = router;
