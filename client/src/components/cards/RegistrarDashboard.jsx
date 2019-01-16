import React, { Component } from "react";
import ViewCard from "./card";
import ViewTopic from "./topic";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import CreateProfile from "../create-profile/CreateProfile";

import { Link } from "react-router-dom";
import AddSwapDelete from "../add-swap-delete-course/add-swap-del-wrapper";
import Navbar from "../layout/Navbar";
import SidebarAdmin from "../layout/SidebarAdmin";

class RegistrarDashboard extends Component {
  state = {
    cards: [
      {
        id: "C001",
        name: "View Users",
        description: "View all users in the System",
        imagelink:
          "https://www.recruitguelph.ca/cecs/sites/uoguelph.ca.cecs/files/public/images/what%27s-your-profile_1.jpg",
        route: "/profiles"
      },
      {
        id: "C002",
        name: "Enter Financial Aid",
        description: "Enter Financial Aid for a Student",
        imagelink:
          "https://www.gijobs.com/wp-content/uploads/2014/08/textbooks.resized-1.jpg",
        route: "/faid"
      },
      {
        id: "C003",
        name: "View Student Grades",
        description: "Course grades of students",
        imagelink:
          "https://www.insidehighered.com/sites/default/server_files/media/iStock-172413295.jpg",
        route: "/grade"
      },
      {
        id: "t001",
        name: "Enter/Remove Holds",
        description: "Enter/Remove Holds for Student/Professor",
        imagelink:
          "http://wbnaboise.org/wp-content/uploads/2015/07/hold200.gif",
        route: "/holds"
      },
      {
        id: "t002",
        name: "Enter To-Do",
        description: "To-Do item for Student/Professor",
        imagelink:
          "http://straightenyourpaths.com/wp-content/uploads/2013/01/bigstock-Blank-To-Do-List-27249434.jpg",
        route: "/todolist"
      },
      {
        id: "t003",
        name: "Enter Enrollment Dates",
        description: "Dates to enroll for courses",
        imagelink:
          "data:image/png;base64,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",
        route: "/edates"
      }
    ]
  };
  render() {
    return (
      <div className="container-fluid" >
        <div className="row">
          <div className="col-md-2">
            <SidebarAdmin />
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
export default RegistrarDashboard;
