const express = require("express");
const router = express.Router();
const passport = require("passport");

// Studentinfo Model
const Studentinfo = require("../../models/Studentinfo");
const validateCourseInput = require("../../validation/studentinfo");
const Course = require("../../models/Course");

//@route POST api/swapcourse
//@desc  POST a course in students cart
//@access Private
router.post(
  "/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("SWAP Course API");
    console.log("Param:", req.params.studentid);
    console.log("Body:", req.body);
    // Studentinfo.findOne({ studentid: req.params.studentid })
    //   .then(Studentinfo => {
    //     console.log("Studentinfo:", Studentinfo);
    //     const newCourse = new Course({
    //       name: req.body.course.name,
    //       coursenumber: req.body.course.coursenumber,
    //       instructor: req.body.course.instructor,
    //       description: req.body.course.description,
    //       link: req.body.course.link,
    //       location: req.body.course.location,
    //       schedule: req.body.course.schedule,
    //       year: req.body.course.year,
    //       semester: req.body.course.semester,
    //       department: req.body.course.department
    //     });
    //     Studentinfo.coursesincart.unshift(newCourse);
    //     Studentinfo.save().then(Studentinfo => res.json(Studentinfo));
    //   })
    //   .catch(err => res.status(404).json({ success: false }));
  }
);
