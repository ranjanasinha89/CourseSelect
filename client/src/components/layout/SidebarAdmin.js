import React, { Component } from "react";
// import { Glyphicon } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { getCurrentProfile } from "../../actions/profileActions";
// import Spinner from "../common/Spinner";
// import CreateProfile from "../create-profile/CreateProfile";
// import Radium from 'radium';
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import "./navBar.css";
library.add(faStroopwafel);

class SidebarAdmin extends Component {
  state = {};
  render() {
    // const styles = {
    //   base: {
    //     ":hover": {
    //       color: "#ffffff",
    //       cursor: "pointer"
    //     }
    //   }
    // };

    const { user } = this.props.auth;
    return (
      <React.Fragment>
        <div style={{ display: "flex" }}>
          <div
            style={{
              padding: "20px",
              width: "200%",
              background: "#2F363A",
              marginLeft: "-15px",
              marginTop: "-24px",
              height: "500vh"
            }}
          >
            <div className="sidebar-header">
              <img
                className="rounded-circle"
                src={user.avatar}
                style={{ width: "100px", marginLeft: "25px" }}
              />
              <p className="lead" align="center">
                <b>
                  {" "}
                  Welcome <br />
                  {user.name}
                </b>
              </p>
            </div>

            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="/dashboard"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-home" />
                  &nbsp; Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="/profile"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-user-ninja" />
                  &nbsp;User Details
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/create-course"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-search" />
                  &nbsp; Courses
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="/chat"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fas fa-comments" />
                  &nbsp; Private Chat
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/groupchat"
                  className="nav-link active"
                  style={{ color: "white" }}
                >
                  <i className="fab fa-rocketchat" />
                  &nbsp; Group Chat
                </a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
SidebarAdmin.propTypes = {
  auth: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(SidebarAdmin);
