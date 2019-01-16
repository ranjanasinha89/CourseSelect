import React, { Component } from "react";
import SidebarAdmin from "../layout/SidebarAdmin";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudentsForCourses } from "../../actions/studentinfoActions";
import { getGrade } from "../../actions/gradesaction";

class AdminGradesView extends Component {
  componentDidMount() {
    const coursenumber = this.props.match.params.coursenumber;

    this.props.getStudentsForCourses(coursenumber);
    this.props.getGrade(coursenumber);
  }

  getGrade(studentid) {
    if (this.props.grade.grades[0]) {
      for (var i = 0; i < this.props.grade.grades.length; i++) {
        if (this.props.grade.grades[i].studentid === studentid) {
          return this.props.grade.grades[i].grade;
        }
      }
    } else {
      return "Not Provided Yet";
    }
  }
  populateContent() {
    if (this.props.student.studentinfo) {
      return (
        <React.Fragment>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">University Id</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            {this.props.student.studentinfo.map(user => (
              <tbody key={user.university_id}>
                <tr>
                  <td>
                    <h3>{user.name}</h3>
                  </td>
                  <td>
                    <h3>{user.studentid}</h3>
                  </td>
                  <td>
                    <h2>{this.getGrade(user.studentid)}</h2>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SidebarAdmin />
            </div>
            <div className="col-md-10">{this.populateContent()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    student: state.studentsinfo,
    grade: state.grades
  };
};

export default connect(
  mapStateToProps,
  { getStudentsForCourses, getGrade }
)(AdminGradesView);
