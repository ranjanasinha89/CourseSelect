import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createCourse } from "../../actions/courseActions";

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      department: "",
      coursenumber: "",
      instructor: "",
      description: "",
      location: "",
      schedule: "",
      officehours: "",
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    // console.log("On submit");
    // console.log("The state: ", this.state);
    let courseNum = "";
    if (this.state.department === "CS") {
      courseNum = this.state.department + "CI" + this.state.coursenumber;
    } else {
      courseNum = this.state.department + this.state.coursenumber;
    }

    console.log("Instructor: ", this.state.instructor);
    console.log("Log: ", this.props);
    let instructorName = "";
    if (this.props.auth.user.user_type == "ADMIN") {
      instructorName = this.state.instructor;
    } else if (this.props.auth.user.user_type == "PROFESSOR") {
      instructorName = this.props.auth.user.name;
    }
    e.preventDefault();
    const courseData = {
      name: this.state.name,
      department: this.state.department,
      coursenumber: courseNum,
      description: this.state.description,
      instructor: instructorName,
      location: this.state.location,
      schedule: this.state.schedule,
      officehours: this.state.officehours
    };
    this.props.createCourse(courseData, this.props.history);
  }

  renderContent() {
    const { errors } = this.state;
    const dept_options = [
      { label: "* Select Department", value: 0 },
      { label: "Computer Science", value: "CS" },
      { label: "Informatics", value: "INFO" },
      { label: "Library Sciences", value: "ILS" },
      { label: "Engineering", value: "ENGG" }
    ];
    if (this.props.auth.user.user_type === "ADMIN") {
      return (
        <div className="container-fluid">
          <h1 className="displau-4 text-center">Create a New Course</h1>
          <p className="lead text-center">
            Fill the form with description of the Course being offered
          </p>
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Course Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              info="Name of the course being offered."
            />
            <SelectListGroup
              placeholder="Department"
              name="department"
              value={this.state.department}
              onChange={this.onChange}
              error={errors.department}
              options={dept_options}
              info="Department that offers the course"
            />
            <TextFieldGroup
              placeholder="* Course Number e.g. XXXX"
              name="coursenumber"
              value={this.state.coursenumber}
              onChange={this.onChange}
              error={errors.coursenumber}
              info="Unique Course Number"
            />
            <TextFieldGroup
              placeholder="* Instructor"
              name="instructor"
              value={this.state.instructor}
              onChange={this.onChange}
              error={errors.instructor}
              info="Name of the instructor"
            />
            <TextAreaFieldGroup
              placeholder="* Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Description of the Course"
            />
            <TextFieldGroup
              placeholder="* Location, Room Number e.g. Luddy Hall, XXXX"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="Location, where the class meets."
            />
            <TextFieldGroup
              placeholder="* Date and Time e.g. Monday, Wednesday HH:MM XM"
              name="schedule"
              value={this.state.schedule}
              onChange={this.onChange}
              error={errors.schedule}
              info="Date and Time of the lecture."
            />
            <TextFieldGroup
              placeholder="* Office Hours e.g. Monday, Wednesday HH:MM XM - HH:MM XM"
              name="officehours"
              value={this.state.officehours}
              onChange={this.onChange}
              error={errors.officehours}
              info="Office Hours."
            />
            <input
              type="submit"
              // value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      );
    } else if (this.props.auth.user.user_type === "PROFESSOR") {
      return (
        <div className="container-fluid">
          <h1 className="displau-4 text-center">Create a New Course</h1>
          <p className="lead text-center">
            Fill the form with description of the Course being offered
          </p>
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Course Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              info="Name of the course being offered."
            />
            <SelectListGroup
              placeholder="Department"
              name="department"
              value={this.state.department}
              onChange={this.onChange}
              error={errors.department}
              options={dept_options}
              info="Department that offers the course"
            />
            <TextFieldGroup
              placeholder="* Course Number e.g. DEPTXXXX"
              name="coursenumber"
              value={this.state.coursenumber}
              onChange={this.onChange}
              error={errors.coursenumber}
              info="Unique Course Number"
            />
            <TextAreaFieldGroup
              placeholder="* Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Description of the Course"
            />
            <TextFieldGroup
              placeholder="* Location, Room Number e.g. Luddy Hall, XXXX"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="Location, where the class meets."
            />
            <TextFieldGroup
              placeholder="* Date and Time e.g. Monday, Wednesday HH:MM XM"
              name="schedule"
              value={this.state.schedule}
              onChange={this.onChange}
              error={errors.schedule}
              info="Date and Time of the lecture."
            />
            <TextFieldGroup
              placeholder="* Office Hours e.g. Monday, Wednesday HH:MM XM - HH:MM XM"
              name="officehours"
              value={this.state.officehours}
              onChange={this.onChange}
              error={errors.officehours}
              info="Office Hours."
            />
            <input
              type="submit"
              // value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      );
    }
  }
  onChange(e) {
    console.log("onchange");
    console.log("target: ", e.target.name);
    console.log("value: ", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { user } = this.props.auth;
    console.log("this.props:", this.props);
    console.log("In create course");

    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}
CreateCourse.propTypes = {
  // course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // course: state.course,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createCourse }
)(withRouter(CreateCourse));
