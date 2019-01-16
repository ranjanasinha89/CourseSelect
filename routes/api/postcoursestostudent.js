const express = require("express");
const router = express.Router();
const passport = require("passport");

// Studentinfo Model
const Studentinfo = require("../../models/Studentinfo");
const validateCourseInput = require("../../validation/studentinfo");
const Course = require("../../models/Course");

//@route POST api/studentinfobyname
//@desc  POST a course to a specific students cart
//@access Private
router.post(
  "/:studentname",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Post Selected Courses: ", req.params.studentname);
    console.log("Post Selected Courses: ", req.body.courses);
    Studentinfo.findOne({ name: req.params.studentname })
      .then(Studentinfo => {
        console.log("Found student");
        coursesselected = [];
        req.body.courses.forEach(course => {
          const newCourse = new Course({
            name: course.name,
            coursenumber: course.coursenumber,
            instructor: course.instructor,
            description: course.description,
            location: course.location,
            schedule: course.schedule,
            year: course.year,
            semester: course.semester,
            department: course.department
          });
          //   coursesselected.push(newCourse);
          Studentinfo.coursesselected.unshift(newCourse);
        });
        let CoursesInCart = req.body.courses.length;
        console.log("Coursesincart: ", CoursesInCart);
        for (var i = 0; i < CoursesInCart; i++) {
          Studentinfo.coursesincart.pop();
        }
        Studentinfo.save().then(Studentinfo => res.json(Studentinfo));
      })
      .catch(err => {
        console.log(err);
      });
    //   .then(Studentinfo => {
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

module.exports = router;
