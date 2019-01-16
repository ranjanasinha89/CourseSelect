const express = require("express");
const router = express.Router();
const passport = require("passport");

// Course Model
const Course = require("../../models/Course");
const validateCourseInput = require("../../validation/course");

// @route   GET api/courses/getCourseByProf
// @desc    Get courses for a particular professor
// @access  Public

router.get(
  "/:profname",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("Here in the proff api", req.params.profname);
    Course.find({ instructor: req.params.profname })
      .then(Courses => {
        // console.log("In Api: ", Courses);
        res.json(Courses);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
