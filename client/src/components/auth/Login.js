import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, oauthGoogle } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
// import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      method: "local"
    };
    this.props.loginUser(userData);
  };

  responseGoogle = res => {
    this.props.oauthGoogle(res.accessToken);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <div className="shadow-lg p-4 mb-10 bg-grey rounded">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your account</p>

                  {errors.inactive && (
                    <p className="text-danger">{errors.inactive}</p>
                  )}
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input
                      type="submit"
                      className="btn btn-success btn-block mt-4"
                    />
                    <button type="button" className="btn btn-link btn-block">
                      Forgot/Reset Password?
                    </button>

                    <GoogleLogin
                      clientId="498630087136-oorljhuca5lojak119ji46rvn02g764d.apps.googleusercontent.com"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      className="btn btn-outline-danger btn-block mt-4"
                    >
                      <span> Sign In using Google+</span>
                    </GoogleLogin>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  oauthGoogle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser, oauthGoogle }
)(Login);
