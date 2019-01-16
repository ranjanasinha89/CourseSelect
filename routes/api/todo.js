const express = require("express");
const router = express.Router();
const passport = require("passport");

const Todo = require("../../models/ToDo");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Todo.find({ University_ID: req.params.id })
      .then(Todo => {
        res.json(Todo);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const abc = new Todo({
      University_ID: req.body.todoData.University_ID,
      Todo_Comment: req.body.todoData.description
    });
    abc
      .save()
      .then(todo => {
        console.log(todo);
        Todo.find({ University_ID: todo.University_ID }).then(Todos => {
          res.json(Todos);
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
    Todo.findById(req.params.id)
      .then(todo => {
        let university_id = todo.University_ID;
        todo.remove().then(() => {
          Todo.find({ University_ID: university_id }).then(Todos => {
            res.json(Todos);
          });
        });
      })
      .catch(err => console.log(err));
  }
);
module.exports = router;
