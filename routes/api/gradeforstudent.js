const express = require("express");
const router = express.Router();
const passport = require("passport");

const Grade = require("../../models/Grade");

router.get(
  "/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Get Api Called", req.params.studentid);
    Grade.find({
      studentid: req.params.studentid
    })
      .then(abc => res.json(abc))
      .catch(err => res.status(404).json({ success: false }));
  }
);

module.exports = router;
