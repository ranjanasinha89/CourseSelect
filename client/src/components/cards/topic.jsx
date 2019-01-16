import React, { Component } from "react";

class ViewTopic extends Component {
  render() {
    return (
      <div>
        <div className="card w-75 m-2">
          <div className="card-body">
            <div className="card-title">
              <p><a href="/">{this.props.topic.name}</a></p>
            </div>
            <div className="card-text">
              <p>{this.props.topic.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTopic;
