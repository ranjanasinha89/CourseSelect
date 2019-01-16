import React, { Component } from "react";
import { connect } from "react-redux";
import CourseCart from "./coursecart";
import { getCourses } from "../../actions/courseActions";
import ViewCourse from "./viewcourse";
import Spinner from "../common/Spinner";

class AddCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Department: "None",
      SearchString: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.props.getCourses();
  }

  handleSetButton = dept => {
    this.setState({
      Department: dept
    });
  };

  filterCoursesInProfile = course => {
    let flag = true;
    for (var i = 0; i < this.props.coursesselected.length; i++) {
      if (this.props.coursesselected[i].name === course.name) {
        flag = false;
      }
    }
    if (flag === true) {
      if (course.id !== null) {
        if (
          course.name
            .toLowerCase()
            .includes(this.state.SearchString.toLowerCase()) ||
          course.instructor
            .toLowerCase()
            .includes(this.state.SearchString.toLowerCase()) ||
          course.department
            .toLowerCase()
            .includes(this.state.SearchString.toLowerCase()) ||
          course.coursenumber
            .toLowerCase()
            .includes(this.state.SearchString.toLowerCase())
        ) {
          return (
            <ViewCourse
              key={course.name}
              course={course}
              studentid={this.props.studentid}
              onAdd={this.handleAddToCart}
              coursesincart={this.props.coursesincart}
              coursesselected={this.props.coursesselected}
              status="addtocart" //add these courses to cart
            />
          );
        }
      } else {
        return (
          <ViewCourse
            key={course.name}
            course={course}
            studentid={this.props.studentid}
            onAdd={this.handleAddToCart}
            coursesincart={this.props.coursesincart}
            coursesselected={this.props.coursesselected}
            status="addtocart" //add these courses to cart
          />
        );
      }
    }
  };
  renderAddCoursesForDepartment = () => {
    let chosenCourses = this.props.courses.courses.filter(
      c => c.department === this.state.Department
    );

    if (this.props.courses.courses.length > 0) {
      return (
        <React.Fragment>
          <main className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                {chosenCourses.map(course =>
                  this.filterCoursesInProfile(course)
                )}
              </div>
              <div className="col-md-4">
                <CourseCart
                  studentid={this.props.studentid}
                  coursesincart={this.props.coursesincart}
                />
                <button
                  onClick={() => this.props.onBack("add")}
                  className="btn btn-info float-right m-2"
                >
                  Back
                </button>
              </div>
            </div>
          </main>
        </React.Fragment>
      );
    } else {
      return <div>Nothing Offered yet</div>;
    }
  };

  renderCourses() {
    if (this.state.Department === "None")
      // return <div>{this.renderAddCourses()}</div>;
      return <h2 className="m-3">Select a department to view courses.</h2>;
    else {
      return <div>{this.renderAddCoursesForDepartment()}</div>;
    }
  }

  renderAddCourses() {
    if (this.props.courses.courses.length > 0) {
      return (
        <React.Fragment>
          <main className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                {this.props.courses.courses.map(course =>
                  this.filterCoursesInProfile(course)
                )}
              </div>
              <div className="col-md-4">
                <CourseCart
                  studentid={this.props.studentid}
                  coursesincart={this.props.coursesincart}
                />
                <button
                  onClick={() => this.props.onBack("add")}
                  className="btn btn-info float-right m-2"
                >
                  Back
                </button>
              </div>
            </div>
          </main>
        </React.Fragment>
      );
    } else {
      return <div>Nothing Offered yet</div>;
    }
  }
  onInputChange(event) {
    this.setState({ SearchString: event.target.value.substr(0, 20) });
  }

  render() {
    let searchButtonName = "";
    switch (this.state.Department) {
      case "None":
        searchButtonName = "Select Department";
        break;
      case "CS":
        searchButtonName = "Computer Science";
        break;
      case "INFO":
        searchButtonName = "Informatics";
        break;
      case "ILS":
        searchButtonName = "Library Sciences";
        break;
      case "ENGG":
        searchButtonName = "Engineering";
        break;
      default:
        searchButtonName = "Select Department";
    }
    // let serachBoxWidth = 40;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="dropdown">
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {searchButtonName}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    onClick={() => this.handleSetButton("CS")}
                    className="dropdown-item"
                    type="button"
                  >
                    Computer Science
                  </button>
                  <button
                    onClick={() => this.handleSetButton("INFO")}
                    className="dropdown-item"
                    type="button"
                  >
                    Informatics
                  </button>
                  <button
                    onClick={() => this.handleSetButton("ILS")}
                    className="dropdown-item"
                    type="button"
                  >
                    Library Sciences
                  </button>
                  <button
                    onClick={() => this.handleSetButton("ENGG")}
                    className="dropdown-item"
                    type="button"
                  >
                    Engineering
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="search-container">
                <form>
                  <input
                    onChange={this.onInputChange.bind(this)}
                    className="form-control form-control-lg float-left"
                    type="text"
                    placeholder="Search Here.."
                    name="search"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>{this.renderCourses()}</div>
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
)(AddCourses);
