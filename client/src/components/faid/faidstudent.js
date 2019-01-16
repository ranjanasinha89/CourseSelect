import React, { Component } from "react";
import { getFaidByUniId } from "../../actions/addfaidactions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class FaidStudent extends Component {
  componentDidMount() {
    const university_id = this.props.auth.user.university_id;
    this.props.getFaidByUniId(university_id);
  }
  renderExistingContent() {
    if (this.props.faid.faid[0]) {
      return (
        <React.Fragment>
          <h2>Existing Items on the list:</h2>
          {this.props.faid.faid.map(faid => (
            <div className="card w-90 m-2">
              <div className="card-body">
                <div className="card-title">
                  <div className="row">
                    <div className="col col-md-12">
                      <h4 key={faid._id}>{faid.Faid}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      );
    }
  }

  render() {
    console.log("In FAID front end: ", this.props);
    return (
      <React.Fragment>
        <div className="container-fluid">{this.renderExistingContent()}</div>
      </React.Fragment>
    );
  }
}
FaidStudent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    faid: state.faid,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getFaidByUniId }
)(FaidStudent);