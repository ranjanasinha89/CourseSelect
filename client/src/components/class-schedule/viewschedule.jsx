import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentInfoByName } from "../../actions/studentinfoActions";
import ViewScheduleCard from "./viewschedulecard";

class ViewSchedule extends Component {
  componentDidMount() {
    this.props.getStudentInfoByName(this.props.username);
  }

  render() {
    if (this.props.studentinfobyname.studentinfo.coursesselected) {
      return (
        <React.Fragment>
          <div className="display-4 lead text-center">
            <h2>Your Weekly Schedule</h2>
          </div>
          {this.props.studentinfobyname.studentinfo.coursesselected.map(
            course => (
              <ViewScheduleCard key={course.coursenumber} data={course} />
            )
          )}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3>Loading..</h3>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    studentinfobyname: state.studentsinfo
  };
};

export default connect(
  mapStateToProps,
  { getStudentInfoByName }
)(ViewSchedule);
