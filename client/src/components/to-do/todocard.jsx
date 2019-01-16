import React, { Component } from "react";
import { Link } from "react-router-dom";

class ToDoCard extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="shadow-lg p-4 mb-10 bg-grey rounded">
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-6">
                  <h1>{this.props.name}</h1>
                  <h4>University Id: {this.props.data.university_id}</h4>
                </div>
                <div className="col-md-6">
                  <h3>Role: {this.props.data.user_type}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <Link to={"/addtodo/" + this.props.data.university_id}>
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

export default ToDoCard;
