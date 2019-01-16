import React, { Component } from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { verifyUser } from "../../actions/authActions";

class Email_verification extends Component {
  constructor() {
    super();
    this.state = {
      secrettoken: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userActivity = {
      secrettoken: this.state.secrettoken
    };
    this.props.verifyUser(userActivity, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Verify your account</h1>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Secret Token"
                    name="secrettoken"
                    type="text"
                    value={this.state.secrettoken}
                    onChange={this.onChange}
                    error={errors.secrettoken}
                  />
                  {errors.message && (
                    <div className="text-danger">{errors.message}</div>
                  )}
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Email_verification.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { verifyUser }
)(Email_verification);
