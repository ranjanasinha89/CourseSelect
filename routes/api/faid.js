const express = require("express");
const router = express.Router();
const passport = require("passport");

const Faid = require("../../models/faid");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("In get FAID: ", req.params);
    Faid.find({ University_ID: req.params.id })
      .then(Faid => {
        res.json(Faid);
      })
      .catch(err => {
        res.status(404).json({ success: false });
      });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const abc = new Faid({
      University_ID: req.body.faidData.University_ID,
      Name: req.body.faidData.name,
      faid: req.body.faidData.description
    });
    abc
      .save()
      .then(faid => {
        Faid.find({ University_ID: faid.University_ID }).then(Faid => {
          res.json(Faid);
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
    console.log("In delete: ", req.params.id);
    Faid.findById(req.params.id)
      .then(faid => {
        let university_id = faid.University_ID;
        faid.remove().then(() => {
          Faid.find({ University_ID: university_id }).then(Faid => {
            res.json(Faid);
          });
        });
      })
      .catch(err => console.log(err));
  }
);
module.exports = router;
