import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SidebarAdmin from "../layout/SidebarAdmin";
import SidebarProf from "../layout/SidebarProf";
import Sidebar from "../layout/Sidebar";
import ViewGradeAdmin from "./viewgradeadmin";
import ViewGradeStudent from "./viewgradestudent";
import AddGradeProfessor from "./addgradeprofessor";

class AddViewGradeWrapper extends Component {
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
          <ViewGradeAdmin />
        </React.Fragment>
      );
    } else if (this.props.auth.user.user_type === "PROFESSOR") {
      return (
        <React.Fragment>
          <AddGradeProfessor />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ViewGradeStudent />
        </React.Fragment>
      );
    }
  }
  render() {
    console.log("In the Grade wrapper: ", this.props);
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

AddViewGradeWrapper.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AddViewGradeWrapper);
