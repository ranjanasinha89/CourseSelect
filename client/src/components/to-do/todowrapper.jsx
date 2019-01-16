import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SidebarAdmin from "../layout/SidebarAdmin";
import SidebarProf from "../layout/SidebarProf";
import Sidebar from "../layout/Sidebar";
import ToDoAdmin from "./todoadmin";
import ToDoProffStudent from "./todoproffstudent";

class ToDoWrapper extends Component {
  populateSidebar() {
    if (this.props.auth.user.user_type === "ADMIN") {
      return (
        <React.Fragment>
          <SidebarAdmin />
        </React.Fragment>
      );
    } else if (this.props.auth.user.user_type === "PROFESSOR") {
      return (
        <React.Fragment>
          <SidebarProf />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Sidebar />
        </React.Fragment>
      );
    }
  }

  populateContent() {
    if (this.props.auth.user.user_type === "ADMIN") {
      return (
        <React.Fragment>
          <ToDoAdmin />
        </React.Fragment>
      );
    } else if (this.props.auth.user.user_type === "PROFESSOR") {
      return (
        <React.Fragment>
          <ToDoProffStudent />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ToDoProffStudent />
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{this.populateSidebar()}</div>
            <div className="col-md-10">{this.populateContent()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

ToDoWrapper.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ToDoWrapper);