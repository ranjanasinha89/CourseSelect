import React, { Component } from "react";
import { getHoldsByUniId } from "../../actions/addholdsactions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StudentCard extends Component {
  componentDidMount() {
    const university_id = this.props.data.studentid;
    this.props.getHoldsByUniId(university_id);
  }
  render() {
    console.log("Card", this.props);
    return (
      <React.Fragment>
        <div className="shadow-lg p-4 mb-10 bg-grey rounded">
          <h1>
            <strong>{this.props.data.name}</strong>
          </h1>
          <div className="row">
            <div className="col-md-6">
              <h3>University ID: {this.props.data.studentid}</h3>
            </div>
            <div className="col-md-6">
              <h3>Grade: {this.props.grade}</h3>
            </div>
          </div>
        </div>
        <br />
      </React.Fragment>
    );
  }
}
StudentCard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    holds: state.holds,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getHoldsByUniId }
)(StudentCard);
