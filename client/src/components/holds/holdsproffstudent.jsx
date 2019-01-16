import React, { Component } from "react";
import { getHoldsByUniId } from "../../actions/addholdsactions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HoldsProffStudent extends Component {
  componentDidMount() {
    const university_id = this.props.auth.user.university_id;
    this.props.getHoldsByUniId(university_id);
  }
  renderExistingContent() {
    // return <h2>In here</h2>;
    if (this.props.holds.holds[0]) {
      return (
        <React.Fragment>
          <div className="display-4 lead text-center">
            <h2>Holds:</h2>
          </div>
          {this.props.holds.holds.map(holds => (
            <div className="shadow-lg p-4 mb-10 bg-grey rounded">
              <div className="card w-90 m-2">
                <div className="card-body">
                  <div className="card-title">
                    <div className="row">
                      <div className="col col-md-12">
                        <h4 key={holds._id}>{holds.Holds_Comment}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="shadow-lg p-4 mb-10 bg-grey rounded">
            <div className="display-4 lead text-center">
              <h3>You do not have any holds.</h3>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <h2>Hello</h2> */}
        <div className="container-fluid">{this.renderExistingContent()}</div>
      </React.Fragment>
    );
  }
}
HoldsProffStudent.propTypes = {
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
)(HoldsProffStudent);
