import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCoursesByProfessor } from "../../actions/courseActions";
import ViewScheduleCard from "./viewschedulecard";

class ViewScheduleProf extends Component {
  componentDidMount() {
    this.props.getCoursesByProfessor(this.props.auth.user.name);
  }
  renderContent() {
    if (this.props.courses.courses) {
      return (
        <React.Fragment>
          {this.props.courses.courses.map(course => (
            <ViewScheduleCard key={course.coursenumber} data={course} />
          ))}
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
  render() {
    if (this.props.courses.courses[0]) {
      return (
        <React.Fragment>
          <div className="display-4 lead text-center">
            <h2>Your Weekly Schedule</h2>
          </div>

          {this.renderContent()}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h2>You are not offering any courses yet.</h2>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

ViewScheduleProf.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCoursesByProfessor }
)(ViewScheduleProf);
