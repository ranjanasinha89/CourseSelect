import React, { Component } from "react";
import { connect } from "react-redux";
import { postCourseToCart } from "../../actions/studentinfoActions";
import { removeCourseFromStudent } from "../../actions/studentinfoActions";
import { swapCourse } from "../../actions/studentinfoActions";
import { removeCourse } from "../../actions/courseActions";
import { Link } from "react-router-dom";
// import { log } from "util";
class ViewCourse extends Component {
  handleAdd = () => {
    console.log("Am I here?");
    let raiseAlert = 0;
    let alertMessage = "The schedule clashes with courses you already have:";

    for (var i = 0; i < this.props.coursesselected.length; i++) {
      if (
        this.props.coursesselected[i].schedule === this.props.course.schedule
      ) {
        raiseAlert = 1;
        alertMessage = alertMessage + " " + this.props.coursesselected[i].name;
      }
    }
    if (raiseAlert === 1) {
      alert(alertMessage);
    } else {
      // console.log("In else, That's good");
      this.props.postCourseToCart(this.props.studentid, this.props.course);
    }
  };

  handleDelete = () => {
    this.props.removeCourseFromStudent(this.props.studentid, this.props.course);
  };

  hendleCourseDelete = () => {
    // console.log("Delete Course: ", this.props.course._id);
    this.props.removeCourse(this.props.course._id);
  };

  hendleSwap = () => {
    this.props.swapCourse(
      this.props.studentid,
      this.props.course,
      this.props.swapCourseInfo.courseId
    );
    let alertMessage =
      'Your course "' +
      this.props.swapCourseInfo.courseName +
      '" is swapped with "' +
      this.props.course.name +
      '".';
    alert(alertMessage);
    window.location.reload();

    this.props.onBack("swap");
  };

  renderAddOrSwapButton() {
    if (this.props.status === "selectedcourses") {
      return (
        <React.Fragment>
          <button
            onClick={() =>
              this.props.onSwap(this.props.course._id, this.props.course.name)
            }
            className="btn btn-info"
          >
            Swap This course{" "}
          </button>
          <Link to={"/coursedetails/" + this.props.course.coursenumber}>
            {/* <span className="float-right">View More</span> */}
            <button type="button" className="btn btn-info m-2">
              View More
            </button>
          </Link>
          <button
            onClick={this.handleDelete}
            className="btn btn-info float-right"
          >
            Delete
          </button>
        </React.Fragment>
      );
    } else if (this.props.status === "addtocart") {
      for (var i = 0; i < this.props.coursesincart.length; i++) {
        if (this.props.coursesincart[i].name === this.props.course.name) {
          return (
            <React.Fragment>
              <button className="btn btn-info m-2" disabled>
                Add
              </button>
              <Link to={"/coursedetails/" + this.props.course.coursenumber}>
                {/* <span className="float-right">View More</span> */}
                <button type="button" className="btn btn-info m-2">
                  View More
                </button>
              </Link>
            </React.Fragment>
          );
        }
      }
      return (
        <React.Fragment>
          <button onClick={this.handleAdd} className="btn btn-info m-2">
            Add
          </button>
          <Link to={"/coursedetails/" + this.props.course.coursenumber}>
            {/* <span className="float-right">View More</span> */}
            <button type="button" className="btn btn-info m-2">
              View More
            </button>
          </Link>
        </React.Fragment>
      );
    } else if (this.props.status === "swapwith") {
      return (
        <React.Fragment>
          <button onClick={this.hendleSwap} className="btn btn-info m-2">
            Swap with this Course
          </button>
          <Link to={"/coursedetails/" + this.props.course.coursenumber}>
            {/* <span className="float-right">View More</span> */}
            <button type="button" className="btn btn-info m-2">
              View More
            </button>
          </Link>
        </React.Fragment>
      );
    } else if (this.props.status === "deletecourse") {
      return (
        <React.Fragment>
          <button
            onClick={this.hendleCourseDelete}
            className="btn btn-info m-2"
          >
            Delete
          </button>
          <Link to={"/coursedetails/" + this.props.course.coursenumber}>
            {/* <span className="float-right">View More</span> */}
            <button type="button" className="btn btn-info m-2">
              View More
            </button>
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <button onClick={this.handleAdd} className="btn btn-info m-2">
            Add
          </button>
          <Link to={"/coursedetails/" + this.props.course.coursenumber}>
            {/* <span className="float-right">View More</span> */}
            <button type="button" className="btn btn-info m-2">
              View More
            </button>
          </Link>
        </React.Fragment>
      );
    }
  }

  render() {
    let CourseIdentifier =
      this.props.course.coursenumber + " " + this.props.course.name;

    return (
      <div className="card w-90 m-2">
        <div className="card-body">
          <div className="card-title">
            <h1>{CourseIdentifier}</h1>
          </div>
          <div className="card-text">
            <h5>{this.props.course.description}</h5>
            <h2>
              Instructor: <strong>{this.props.course.instructor}</strong>
            </h2>
            <h3>{this.props.course.location}</h3>
            <h4>{this.props.course.schedule}</h4>
            {/* <Link to={"/coursedetails/" + this.props.course.coursenumber}> */}
            {/* <span className="float-right">View More</span> */}
            {/* <button type="button" className="btn btn-info"> */}
            {/* View More */}
            {/* </button> */}
            {/* </Link> */}
            <br />
            {this.renderAddOrSwapButton()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentinfo: state.studentinfo
  };
};

export default connect(
  mapStateToProps,
  { postCourseToCart, removeCourseFromStudent, swapCourse, removeCourse }
)(ViewCourse);
