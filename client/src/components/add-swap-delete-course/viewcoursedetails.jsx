import React, { Component } from "react";
import { getCoursesByCourseNumber } from "../../actions/courseActions";
import { connect } from "react-redux";
import Sidebar from "../layout/Sidebar";

import Reviews from "../reviews/reviews";

class ViewCourseDetails extends Component {
  componentDidMount() {
    let coursenumber = this.props.match.params.coursenumber;

    this.props.getCoursesByCourseNumber(coursenumber);
  }
  renderContent() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">{this.renderCourses()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  renderCourses() {
    if (this.props.courses.courses._id == null) {
      return <div>Loading..</div>;
    } else {
      return (
        <React.Fragment>

        <div className="container-fluid">
          <div className="row">
          <div className="col-md-9">

          <h1>{this.props.courses.courses.name}</h1>
          <br />
          <h2>
            Instructor: <strong>{this.props.courses.courses.instructor}</strong>
          </h2>
          <h5>{this.props.courses.courses.description}</h5>
          <div className="row">
            <div className="col-md-6">
              <h3>Location: {this.props.courses.courses.location}</h3>
              <h4>Schedule: {this.props.courses.courses.schedule}</h4>
              <button
                onClick={this.props.history.goBack}
                type="button"
                className="btn btn-info"
              >
                Back
              </button>
            </div>
          </div>


          <div> <Reviews courses={this.props.courses.courses} /> </div>

          </div>
        </div>
      </div>

        </React.Fragment>
      );
    }
  }
  render() {
    console.log("This.props: ", this.props);
    return (
      <React.Fragment>
        {/* <div className="container">{this.renderCourses()}</div> */}
        {this.renderContent()}
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
  { getCoursesByCourseNumber }
)(ViewCourseDetails);
