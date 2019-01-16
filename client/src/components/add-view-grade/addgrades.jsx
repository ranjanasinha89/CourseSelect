import React, { Component } from "react";
import SidebarProf from "../layout/SidebarProf";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudentsForCourses } from "../../actions/studentinfoActions";
import { postGrade, getGrade } from "../../actions/gradesaction";

class AddGrades extends Component {
  componentDidMount() {
    const coursenumber = this.props.match.params.coursenumber;

    this.props.getStudentsForCourses(coursenumber);
    this.props.getGrade(coursenumber);
  }

  editGrade(studentid, coursenumber) {
    let num = "0.00";
    if (this.props.grade.grades[0]) {
      for (var i = 0; i < this.props.grade.grades.length; i++) {
        if (this.props.grade.grades[i].studentid === studentid) {
          num = this.props.grade.grades[i].grade;
        }
      }
    } else {
      num = "0.00";
    }

    var grade;
    var newGrade = prompt("Enter Grade:", num);
    if (newGrade == null || newGrade === "") {
      grade = num;
    } else {
      grade = newGrade;
    }

    const gradeObj = {
      studentid: studentid,
      coursenumber: coursenumber,
      grade: grade
    };

    this.props.postGrade(gradeObj);
    window.location.reload();
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
                <th scope="col" />
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
                  <td>
                    <button
                      type="button"
                      className="btn btn-info m-2"
                      onClick={() =>
                        this.editGrade(
                          user.studentid,
                          this.props.match.params.coursenumber
                        )
                      }
                    >
                      Edit
                    </button>
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
    console.log("Find the students: ", this.props);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SidebarProf />
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

AddGrades.propTypes = {
  auth: PropTypes.object.isRequired,
  studentinfo: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getStudentsForCourses, postGrade, getGrade }
)(AddGrades);
