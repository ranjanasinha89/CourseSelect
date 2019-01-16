const express = require("express");
const router = express.Router();
const passport = require("passport");

// Course Model
const Course = require("../../models/Course");
const validateCourseInput = require("../../validation/course");

// @route   GET api/courses
// @desc    Get All courses
// @access  Public
router.get("/", (req, res) => {
  Course.find()
    .sort({ date: -1 })
    .then(courses => res.json(courses));
});

// @route   GET api/courses
// @desc    Get a course with coursenumber
// @access  Public

router.get(
  "/:coursenumber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ coursenumber: req.params.coursenumber })
      .then(Course => {
        res.json(Course);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

// @route   GET api/courses/getCourseByProf
// @desc    Get courses for a particular professor
// @access  Public

router.get(
  "/getCourseByProf/:profname",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Here in the proff api", req.params.profname);
    // Course.findOne({ coursenumber: req.params.coursenumber })
    //   .then(Course => {
    //     // console.log("In Api: ", Course);
    //     res.json(Course);
    //   })
    //   .catch(err => res.status(404).json({ success: false }));
  }
);

// @route   POST api/courses
// @desc    Create A new Course
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    console.log("Request: ", req.body);
    const newCourse = new Course({
      name: req.body.name,
      coursenumber: req.body.coursenumber,
      instructor: req.body.instructor,
      description: req.body.description,
      department: req.body.department,
      location: req.body.location,
      schedule: req.body.schedule,
      officehours: req.body.officehours,
      year: "2018",
      semester: "Spring"
    });

    Course.findOne({ coursenumber: newCourse.coursenumber }).then(course => {
      if (course) {
        errors.coursenumber = "That Course Number already exists";
        res.status(400).json(errors);
      }
      //Save profile
      newCourse.save().then(course => res.json(course));
    });

    // newCourse.save().then(course => res.json(course));
  }
);

// @route   DELETE api/courses/:id
// @desc    Delete A Course
// @access  Public
router.delete("/:courseid", (req, res) => {
  // console.log("Choose me");
  // console.log("Parameters: ", req.params);

  Course.findById(req.params.courseid)
    .then(course => {
      // console.log("Found course: ", course);
      course
        .remove()
        .then(() => {
          // console.log("Remove Successful");
          // res.json(Course);
          // res.json({ success: true });
          // router.get("/", (req, res) => {
          Course.find()
            .sort({ date: -1 })
            .then(courses => {
              // console.log("Found Courses: ", courses);
              res.json(courses);
            });
          // });
        })
        .catch(err => {
          // console.log("Still error: ", err);
        });
    })
    .catch(err => {
      // console.log("Error: ", err);
      res.status(404).json({ success: false });
    });
});

module.exports = router;
