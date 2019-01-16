const express = require("express");
const router = express.Router();
const passport = require("passport");

const Edates=require("../../models/edates");

router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Edates.find({ University_ID: req.params.id })
        .then(Edates => {
          res.json(Edates);
        })
        .catch(err => res.status(404).json({ success: false }));
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      const abc = new Edates({
        University_ID: req.body.edatesData.University_ID,
        Edates: req.body.edatesData.description
      });
      abc
        .save()
        .then(edates => {
          console.log(edates);
          Edates.find({ University_ID: edates.University_ID }).then(Edates => {
            res.json(Edates);
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
        Edates.findById(req.params.id)
        .then(edates => {
          let university_id = edates.University_ID;
          edates.remove().then(() => {
            Edates.find({ University_ID: university_id }).then(Edates => {
              res.json(Edates);
            });
          });
        })
        .catch(err => console.log(err));
    }
  );
  
  module.exports = router;



