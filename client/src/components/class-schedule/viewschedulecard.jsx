import React, { Component } from "react";

class ViewScheduleCard extends Component {
  render() {
    console.log("In the card: ", this.props);
    let CourseIdentifier =
      this.props.data.coursenumber + " " + this.props.data.name;
    return (
      <React.Fragment>
        <div className="shadow-lg p-4 mb-10 bg-grey rounded">
          <div class="row">
            <div class="col-md-7">
              <h1>{CourseIdentifier}</h1>
              <h3>
                Instructor: <strong>{this.props.data.instructor}</strong>
              </h3>
            </div>
            <div class="col-md-5">
              <h4>
                <strong>Schedule:</strong> {this.props.data.schedule}
              </h4>
              <h4>
                <strong>Location:&nbsp;</strong> {this.props.data.location}
              </h4>
              <h4>
                <strong>Office Hours:</strong> {this.props.data.officehours}
              </h4>
            </div>
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}

export default ViewScheduleCard;
