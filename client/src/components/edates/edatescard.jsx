import React, { Component } from "react";
import { Link } from "react-router-dom";

class EDatesCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="shadow-lg p-4 mb-10 bg-grey rounded">
          <div class="row">
            <div class="col-md-10">
              <div class="row">
                <div class="col-md-6">
                  <h1>{this.props.name}</h1>
                  <h4>University Id: {this.props.data.university_id}</h4>
                </div>
                <div class="col-md-6">
                  <h3>Role: {this.props.data.user_type}</h3>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <Link to={"/addedates/" + this.props.data.university_id}>
                <button type="button" className="btn btn-info m-2">
                  Add
                </button>
              </Link>
            </div>
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}

export default EDatesCard;
