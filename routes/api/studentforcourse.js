const express = require("express");
const router = express.Router();
const passport = require("passport");

const Studentinfo = require("../../models/Studentinfo");
const validateCourseInput = require("../../validation/studentinfo");
const Course = require("../../models/Course");

router.get(
  "/:coursenumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Api for get students for a course:", req.params.coursenumber);
    Studentinfo.find({
      "coursesselected.coursenumber": req.params.coursenumber
    })
      .then(Studentinfo => {
        // console.log(Studentinfo);
        res.json(Studentinfo);
      })
      .catch(err => {
        // console.log(err);
        res.status(404).json({ success: false });
      });
  }
);

module.exports = router;
