import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      role: "",
      universityid: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    console.log("Target Name: ", e.target.name);
    console.log("Target Value: ", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      role: this.state.role,
      universityid: this.state.universityid,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    // axios;
    // .post("/api/users/register", newUser)
    // .then(res => console.log(res.data))
    // .catch(err => this.setState({ errors: err.response.data }));
  }
  render() {
    const { errors } = this.state;
    const role_options = [
      { label: "* Select Role", value: 0 },
      { label: "Student", value: "STUDENT" },
      { label: "Professor", value: "PROFESSOR" },
      { label: "Administrator", value: "ADMIN" }
    ];
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className="shadow-lg p-3 mb-10 bg-grey rounded">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <SelectListGroup
                    placeholder="Role"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                    error={errors.role}
                    options={role_options}
                    info="Select a role that identifies you the best"
                  />
                  <TextFieldGroup
                    placeholder="University Identification Number"
                    name="universityid"
                    value={this.state.universityid}
                    onChange={this.onChange}
                    error={errors.universityid}
                  />
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
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
                  <TextFieldGroup
                    placeholder="Confirm password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />

                  <input
                    type="submit"
                    className="btn btn-success btn-block mt-4"
                  />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
