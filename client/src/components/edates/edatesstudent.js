import React, { Component } from "react";
import { getEdatesByUniId } from "../../actions/addedatesactions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EdatesStudent extends Component {
  componentDidMount() {
    const university_id = this.props.auth.user.university_id;
    this.props.getEdatesByUniId(university_id);
  }
  renderExistingContent() {
    if (this.props.edates.edates[0]) {
      return (
        <React.Fragment>
          <h2>Enrollment Date:</h2>
          {this.props.edates.edates.map(edates => (
            <div className="shadow-lg p-4 mb-10 bg-grey rounded">
              <div className="card w-90 m-2" key={edates._id}>
                <div className="card-body">
                  <div className="card-title">
                    <div className="row">
                      <div className="col col-md-12">
                        <h4 className="fa fa fa-genderless pr-1">
                          &nbsp;&nbsp;{edates.Edates}
                        </h4>
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
              <h3>Enrollment Dates have not been published yet.</h3>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">{this.renderExistingContent()}</div>
      </React.Fragment>
    );
  }
}
EdatesStudent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    edates: state.edates,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getEdatesByUniId }
)(EdatesStudent);
