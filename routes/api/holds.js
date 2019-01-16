const express = require("express");
const router = express.Router();
const passport = require("passport");

const Holds=require("../../models/holds");

router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Holds.find({ University_ID: req.params.id })
        .then(Holds => {
          res.json(Holds);
        })
        .catch(err => res.status(404).json({ success: false }));
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      console.log("In post", req.body);
      const abc = new Holds({
        University_ID: req.body.holdsData.University_ID,
        Holds_Comment: req.body.holdsData.description
      });
      abc
        .save()
        .then(holds => {
          console.log(holds);
          Holds.find({ University_ID: holds.University_ID }).then(Holds => {
            res.json(Holds);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  );

  router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Holds.findById(req.params.id)
        .then(holds => {
          let university_id = holds.University_ID;
          holds.remove().then(() => {
            Holds.find({ University_ID: university_id }).then(Holds => {
              res.json(Holds);
            });
          });
        })
        .catch(err => console.log(err));
    }
  );
  
  module.exports = router;



