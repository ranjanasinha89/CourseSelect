import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCoursesByProfessor } from "../../actions/courseActions";

class AddGradeProfessor extends Component {
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
                  <Link to={"/addgrades/" + course.coursenumber}>
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
  render() {
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
}

const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses
});

AddGradeProfessor.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getCoursesByProfessor }
)(AddGradeProfessor);
