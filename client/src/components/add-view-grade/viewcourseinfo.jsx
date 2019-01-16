import React, { Component } from "react";
import { Link } from "react-router-dom";

class ViewCourseInfo extends Component {
  render() {
    console.log("To View: ", this.props);
    let CourseIdentifier =
      this.props.data.coursenumber + " " + this.props.data.name;
    return (
      <React.Fragment>
        <div className="card w-90 m-2">
          <div className="card-body">
            <div className="card-title">
              <h1>{CourseIdentifier}</h1>
            </div>
            <div className="card-text">
              <h2>
                Instructor: <strong>{this.props.data.instructor}</strong>
              </h2>
              <Link to={"/admingradesview/" + this.props.data.coursenumber}>
                <button type="button" className="btn btn-info float-right m-2">
                  View Students
                </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewCourseInfo;
