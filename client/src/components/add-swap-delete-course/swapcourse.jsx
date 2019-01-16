import React, { Component } from "react";
import { connect } from "react-redux";
import { getCourses } from "../../actions/courseActions";
import ViewCourse from "./viewcourse";

class SwapCourses extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  filterCoursesInProfile = course => {
    let flag = true;
    for (var i = 0; i < this.props.coursesselected.length; i++) {
      // Do not show courses that are already in profile
      if (this.props.coursesselected[i].name === course.name) {
        flag = false;
      }
    }

    for (var j = 0; j < this.props.coursesincart.length; j++) {
      //Do not show courses that are already in cart
      if (this.props.coursesincart[j].name === course.name) {
        flag = false;
      }
    }

    if (flag === true) {
      return (
        <ViewCourse
          key={course.name}
          course={course}
          studentid={this.props.studentid}
          status="swapwith"
          onSwap={this.props.onSwap}
          onBack={this.props.onBack}
          swapCourseInfo={this.props.stateInfo.swap}
        />
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <main className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {this.props.courses.courses.map(course =>
                this.filterCoursesInProfile(course)
              )}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  { getCourses }
)(SwapCourses);
