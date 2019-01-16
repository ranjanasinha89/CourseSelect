import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "../layout/Sidebar";
import SidebarAdmin from "../layout/SidebarAdmin";
import SidebarProf from "../layout/SidebarProf";
import ViewSchedule from "./viewschedule";
import ViewScheduleProf from "./viewscheduleprof";

class ViewClassScheduleWrapper extends Component {
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
    if (this.props.auth.user.user_type === "PROFESSOR") {
      return (
        <React.Fragment>
          <ViewScheduleProf />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ViewSchedule
            key={this.props.auth.user.university_id}
            username={this.props.auth.user.name}
          />
        </React.Fragment>
      );
    }
  }

  render() {
    console.log("In the view schedule wrapper: ", this.props);
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

ViewClassScheduleWrapper.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ViewClassScheduleWrapper);
