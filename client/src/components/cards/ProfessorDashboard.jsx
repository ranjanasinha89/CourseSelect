import React, { Component } from "react";
import ViewCard from "./card";
// import ViewTopic from "./topic";
// import Addswapdelete from "../addswapdelete/addswapdel";

// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { getCurrentProfile } from "../../actions/profileActions";
// import Spinner from "../common/Spinner";
// import CreateProfile from "../create-profile/CreateProfile";

// import { Link } from "react-router-dom";
// import Selection from "../add-swap-delete-course/selection";
// import Navbar from "../layout/Navbar";
import SidebarProf from "../layout/SidebarProf";

class ProfessorDashboard extends Component {
  state = {
    cards: [
      {
        id: "C001",
        name: "Schedule",
        description: "Check out this week's classes and other appointments",
        imagelink:
          "http://oriellycc.com/wp-content/uploads/2016/08/calschedule.jpg",
        route: "/viewschedule"
      },
      {
        id: "C002",
        name: "View Student List",
        description: "Checkout the list of student's enrolled in your course",
        imagelink:
          "https://cdn.ila-france.com/wp-content/uploads/2015/02/our-students.jpg",
        route: "/viewstudents"
      },
      {
        id: "C003",
        name: "Enter Grades",
        description: "Enter the Grades for a student in your course",
        imagelink:
          "https://www.insidehighered.com/sites/default/server_files/media/iStock-172413295.jpg",
        route: "/grade"
      },
      {
        id: "t001",
        name: "Holds",
        description: "Enter Holds for a particular student",
        imagelink:
          "http://wbnaboise.org/wp-content/uploads/2015/07/hold200.gif",
        route: "/holds"
      },
      {
        id: "t002",
        name: "To-Do list",
        description: "What needs to be done this month",
        imagelink:
          "http://straightenyourpaths.com/wp-content/uploads/2013/01/bigstock-Blank-To-Do-List-27249434.jpg",
        route: "/todolist"
      },
      {
        id: "t003",
        name: "Course Analytics",
        description: "View students enrolled for your courses",
        imagelink:
          "https://activegrowth.com/wp-content/uploads/2017/05/ga-alternatives-featured-2.png",
        route: "/viewgraph"
      }
    ]
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <SidebarProf />
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-11">
                <div className="row">
                  {this.state.cards.map(card => (
                    <ViewCard key={card.id} card={card} />
                  ))}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default ProfessorDashboard;
