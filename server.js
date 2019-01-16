const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const courses = require("./routes/api/courses");
const courseprof = require("./routes/api/coursesprof");
const studentsinfo = require("./routes/api/studentsinfo");
const studentinfobyname = require("./routes/api/studentinfobyname");
const todo = require("./routes/api/todo");
const passport = require("passport");
const cors = require("cors");
const app = express();
const path = require("path");
const holds = require("./routes/api/holds");
const faid = require("./routes/api/faid");
const edates = require("./routes/api/edates");
const Chatkit = require("@pusher/chatkit-server");

const postcoursestostudent = require("./routes/api/postcoursestostudent");
const reviews = require("./routes/api/reviews");
const payment = require("./routes/api/payment");
const studentforcourse = require("./routes/api/studentforcourse");
const grade = require("./routes/api/grade");
const gradeforstudent = require("./routes/api/gradeforstudent");

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// DB Config
const db = require("./config/keys").mongoURI;
//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/courses", courses);
app.use("/api/studentsinfo", studentsinfo);
app.use("/api/studentinfobyname", studentinfobyname);
app.use("/api/todo", todo);
app.use("/api/holds", holds);
app.use("/api/faid", faid);
app.use("/api/edates", edates);

app.use("/api/postcoursestostudent", postcoursestostudent);
app.use("/api/reviews", reviews);
app.use("/api", require("./routes/api/payment"));
app.use("/api/courseprof", courseprof);
app.use("/api/studentforcourse", studentforcourse);
app.use("/api/grade", grade);
app.use("/api/gradeforstudent", gradeforstudent);

//Serve  static assets
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:19a57672-026f-4e1c-8f66-e46338bc283c",
  key:
    "c638981a-6f5f-4acd-baf3-37bfc867b747:KinCYGaqQjVf0tLwFjeN7KBVY1Rdv78rCaeyt0xB1lw="
});
app.post("/users", (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
