import React, { Component } from "react";
import SidebarProf from "../layout/SidebarProf";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudentsForCourses } from "../../actions/studentinfoActions";
import { postGrade, getGrade } from "../../actions/gradesaction";
import StudentCard from "./studentcard";

class ViewStudentDesc extends Component {
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
      return "Not Provided Yet";
    } 
  }

  populateContent() {
    if (this.props.student.studentinfo) {
      return (
        <React.Fragment>
          {this.props.student.studentinfo.map(user => (
            <StudentCard
              key={user.university_id}
              data={user}
              grade={this.getGrade(user.studentid)}
            />
          ))}
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

ViewStudentDesc.propTypes = {
  auth: PropTypes.object.isRequired,
  studentinfo: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getStudentsForCourses, postGrade, getGrade }
)(ViewStudentDesc);
