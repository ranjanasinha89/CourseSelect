import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudentInfoByName } from "../../actions/studentinfoActions";
import { getGradeForStudent } from "../../actions/gradesaction";

class ViewGradeStudent extends Component {
  componentDidMount() {
    this.props.getStudentInfoByName(this.props.auth.user.name);

    this.props.getGradeForStudent(this.props.auth.user.university_id);
  }

  getGrade(coursenumber) {
    for (var i = 0; i < this.props.grade.grades.length; i++) {
      if (this.props.grade.grades[i].coursenumber === coursenumber) {
        return this.props.grade.grades[i].grade;
      }
    }
    return "Not Graded Yet";
  }

  render() {
    console.log("Props: ", this.props);

    if (this.props.studentinfobyname.studentinfo.coursesselected) {
      return (
        <React.Fragment>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Course #</th>
                <th scope="col">Class</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            {this.props.studentinfobyname.studentinfo.coursesselected.map(
              course => (
                <tbody key={course.coursenumber}>
                  <tr>
                    <td>
                      <h3>{course.coursenumber}</h3>
                    </td>
                    <td>
                      <h3>{course.name}</h3>
                    </td>
                    <td>
                      <h3>{this.getGrade(course.coursenumber)}</h3>
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>
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
    auth: state.auth,
    studentinfobyname: state.studentsinfo,
    grade: state.grades
  };
};

export default connect(
  mapStateToProps,
  { getStudentInfoByName, getGradeForStudent }
)(ViewGradeStudent);
