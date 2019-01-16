import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import SideNavPage from "./components/layout/sideNav";
import Footer from "./components/layout/Footer";
import LandingPage from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import EmailVerification from "./components/auth/Email_verification";
import Dashboard from "./components/dashboard/Dashboard";

import CreateProfile from "./components/create-profile/CreateProfile";
import ViewCourseDetails from "./components/add-swap-delete-course/viewcoursedetails";
import AddSwapDeleteWrapper from "./components/add-swap-delete-course/add-swap-del-wrapper";
import AddCourses from "./components/add-swap-delete-course/addcourses";
import CreateCourseWrapper from "./components/create-course/createcoursewrapper";
import StudentDashboard from "./components/cards/studentdashboard";
import ProfessorDashboard from "./components/cards/ProfessorDashboard";
import RegistrarDashboard from "./components/cards/RegistrarDashboard";

import ViewClassScheduleWrapper from "./components/class-schedule/viewclassschedulewrapper";
import DashBoardLogic from "./components/cards/DashBoardlogic";
import CreateAdminCourseWrapper from "./components/create-course/createadmincoursewrapper";
import DeleteAdminCourseWrapper from "./components/create-course/deleteadmincoursewrapper";
import ToDoWrapper from "./components/to-do/todowrapper";
import AddToDo from "./components/to-do/addtodo";
import AddHolds from "./components/holds/addholds";
import HoldsWrapper from "./components/holds/holdswrapper";
import AddFaid from "./components/faid/addfaid";
import FaidWrapper from "./components/faid/faidwrapper";
import AddEdates from "./components/edates/addedates";
import EdatesWrapper from "./components/edates/edateswrapper";

import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import notFound from "./components/not-found/notFound";

import chat from "./components/chat/Chat";
import GroupChat from "./components/group-chat/Chat";

import Payment from "./components/payment/Payment";
import ConfirmationPage from "./components/payment/ConfirmationPage";
import AddViewGradeWrapper from "./components/add-view-grade/addviewgradewrapper";
import AddGrades from "./components/add-view-grade/addgrades";
import AdminGradesView from "./components/add-view-grade/admingradesview";
import ViewStudents from "./components/viewstudent/viewstudent";
import ViewStudentDesc from "./components/viewstudent/viewstudentdesc";
import ViewGraph from "./components/graphs/graphview";
import Bargraph from "./components/graphs/graphswrapper";
import Piegraph from "./components/graphs/graphspiewrapper";
library.add(faStroopwafel);

//Check for token
if (localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticate
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  // const currentTime = Date.now() / 100;
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  //   // Clear current profile

  //   // Redirect to login
  //   window.location.href = "/login";
  // }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Navbar />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/verify" component={EmailVerification} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/navbar" component={SideNavPage} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />

            <Switch>
              <PrivateRoute exact path="/profile" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/chat" component={chat} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/viewgraph" component={ViewGraph} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/piegraph" component={Piegraph} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/bargraph" component={Bargraph} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/groupchat" component={GroupChat} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard"
                component={DashBoardLogic}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/coursedetails/:coursenumber"
                component={ViewCourseDetails}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/addtodo/:university_id"
                component={AddToDo}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/addfaid/:university_id"
                component={AddFaid}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/grade"
                component={AddViewGradeWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/viewstudents"
                component={ViewStudents}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/viewstudentinfo/:coursenumber"
                component={ViewStudentDesc}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/addholds/:university_id"
                component={AddHolds}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/addgrades/:coursenumber"
                component={AddGrades}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/addedates/:university_id"
                component={AddEdates}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/admingradesview/:coursenumber"
                component={AdminGradesView}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-course"
                component={CreateCourseWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/todolist" component={ToDoWrapper} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/holds" component={HoldsWrapper} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/faid" component={FaidWrapper} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edates" component={EdatesWrapper} />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/addcourses"
                component={AddSwapDeleteWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/ViewSchedule"
                component={ViewClassScheduleWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/CreateCourse"
                component={CreateCourseWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-admin-course"
                component={CreateAdminCourseWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/delete-admin-course"
                component={DeleteAdminCourseWrapper}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/StudentDashboard"
                component={StudentDashboard}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/ProfessorDashboard"
                component={ProfessorDashboard}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/RegistrarDashboard"
                component={RegistrarDashboard}
              />
            </Switch>

            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
            <Route exact path="/not-found" component={notFound} />

            <Switch>
              <PrivateRoute
                exact
                path="/confirmationpage"
                component={ConfirmationPage}
              />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/payment" component={Payment} />
            </Switch>

            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
