const express = require("express");
const router = express.Router();
const passport = require("passport");

// Studentinfo Model
const Studentinfo = require("../../models/Studentinfo");
const validateCourseInput = require("../../validation/studentinfo");
const Course = require("../../models/Course");

// @route   GET  api/studentsinfobyname
// @desc    Get all students
// @access  Public
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("Hello????????????");
    Studentinfo.findOne({ name: req.params.name })
      .then(Studentinfo => res.json(Studentinfo))
      .catch(err => res.status(404).json({ success: false }));
  }
);

//@route POST api/studentinfobyname/swapcourse
//@desc  Swap a course for a student
//@access Private
router.post(
  "/swapcourse/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Studentinfo.findOne({ studentid: req.params.studentid })
      .then(Studentinfo => {
        const index = Studentinfo.coursesselected
          .map(item => item.id)
          .indexOf(req.body.swapcourseid);

        Studentinfo.coursesselected.splice(index, 1);

        const newCourse = new Course({
          name: req.body.course.name,
          coursenumber: req.body.course.coursenumber,
          instructor: req.body.course.instructor,
          description: req.body.course.description,
          link: req.body.course.link,
          location: req.body.course.location,
          schedule: req.body.course.schedule,
          year: req.body.course.year,
          semester: req.body.course.semester,
          department: req.body.course.department
        });
        Studentinfo.coursesselected.unshift(newCourse);
        Studentinfo.save()
          .then(Studentinfo => res.json(Studentinfo))
          .catch(err => {
            console.log("Error:", err);
          });
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

//@route POST api/studentinfobyname
//@desc  POST a course to a specific students cart
//@access Private
router.post(
  "/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Studentinfo.findOne({ studentid: req.params.studentid })
      .then(Studentinfo => {
        const newCourse = new Course({
          name: req.body.course.name,
          coursenumber: req.body.course.coursenumber,
          instructor: req.body.course.instructor,
          description: req.body.course.description,
          link: req.body.course.link,
          location: req.body.course.location,
          schedule: req.body.course.schedule,
          year: req.body.course.year,
          semester: req.body.course.semester,
          department: req.body.course.department
        });
        Studentinfo.coursesincart.unshift(newCourse);
        Studentinfo.save().then(Studentinfo => res.json(Studentinfo));
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

//@route DELETE api/studentinfobyname
//@desc  DELETE a course from student cart or student profile
//@access Private

router.delete(
  "/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Studentinfo.findOne({ studentid: req.params.studentid })
      .then(Studentinfo => {
        if (req.body.flag === "cart") {
          const index = Studentinfo.coursesincart
            .map(item => item.id)
            .indexOf(req.body.courseid);

          Studentinfo.coursesincart.splice(index, 1);
        } else if (req.body.flag === "profile") {
          const index = Studentinfo.coursesselected
            .map(item => item.id)
            .indexOf(req.body.courseid);

          Studentinfo.coursesselected.splice(index, 1);
        }

        Studentinfo.save().then(Studentinfo => res.json(Studentinfo));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
