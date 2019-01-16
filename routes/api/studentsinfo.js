const express = require("express");
const router = express.Router();
const passport = require("passport");

// Studentinfo Model
const Studentinfo = require("../../models/Studentinfo");
const validateCourseInput = require("../../validation/studentinfo");

// @route   GET  api/studentsinfo
// @desc    Get all students
// @access  Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Studentinfo.find()
      .sort({ date: -1 })
      .then(studentinfo => res.json(studentinfo));
  }
);

// @route   POST api/studentsinfo
// @desc    Create A new Student Profile
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newStudentinfo = new Studentinfo({
      name: req.body.name,
      major: req.body.major,
      type: req.body.type,
      studentid: req.body.studentid,
      gpa: req.body.gpa,
      coursesselected: req.body.coursesselected,
      coursesincart: req.body.coursesincart
    });

    newStudentinfo.save().then(studentinfo => res.json(studentinfo));
  }
);

// @route   POST api/studentsinfo
// @desc    Update a Student Profile by id
// @access  Public
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newStudentinfo = new Studentinfo({
      name: req.body.name,
      major: req.body.major,
      type: req.body.type,
      studentid: req.body.studentid,
      gpa: req.body.gpa,
      coursesselected: req.body.coursesselected,
      coursesincart: req.body.coursesincart
    });

    newStudentinfo.save().then(studentinfo => res.json(studentinfo));
  }
);

// @route   DELETE api/studentsinfo/:id
// @desc    Delete A Student
// @access  Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Studentinfo.findById(req.params.id)
      .then(studentinfo =>
        studentinfo.remove().then(() => res.json({ success: true }))
      )
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
