import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCoursesByProfessor } from "../../actions/courseActions";
import SidebarProf from "../layout/SidebarProf";

class ViewStudent extends Component {
  componentDidMount() {
    this.props.getCoursesByProfessor(this.props.auth.user.name);
  }

  renderContent() {
    return (
      <React.Fragment>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Course Number</th>
              <th scope="col">Course Name</th>
              <th scope="col" />
            </tr>
          </thead>
          {this.props.courses.courses.map(course => (
            <tbody key={course.coursenumber}>
              <tr>
                <td>
                  <h3>{course.coursenumber}</h3>
                </td>
                <td>
                  <h3>{course.name}</h3>
                </td>
                <td>
                  <Link to={"/viewstudentinfo/" + course.coursenumber}>
                    <button type="button" className="btn btn-info m-2">
                      View Students
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </React.Fragment>
    );
  }

  renderComponent() {
    console.log("View Students");
    if (this.props.courses.courses[0]) {
      return (
        <React.Fragment>
          <h2>Courses: </h2>
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
  render() {
    // if (this.props.courses.courses[0]) {
    //   return (
    //     <React.Fragment>
    //       <h2>Courses: </h2>
    //       {this.renderContent()}
    //     </React.Fragment>
    //   );
    // } else {
    //   return (
    //     <React.Fragment>
    //       <h2>You are not offering any courses yet.</h2>
    //     </React.Fragment>
    //   );
    // }
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SidebarProf />
            </div>
            <div className="col-md-10">{this.renderComponent()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

ViewStudent.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCoursesByProfessor }
)(ViewStudent);
