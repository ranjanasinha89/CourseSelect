import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import Sidebar from "../layout/Sidebar";
import isEmpty from "../../validation/is_empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInput: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bind) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors, displaySocialInput } = this.state;

    let socialInputs;
    if (displaySocialInput) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Intern", value: "Intern" }
    ];
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="create-profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <Link to="/profile" className="btn btn-info">
                      Go Back
                    </Link>
                    <h1 className="display-4 text-center"> Edit Profile</h1>

                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="* Profile Handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile."
                      />
                      <SelectListGroup
                        placeholder="* Status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        error={errors.status}
                        options={options}
                        info="What is your prenure?"
                      />
                      <TextFieldGroup
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Could be your own company or have worked for."
                      />
                      <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="Do you have a website?"
                      />
                      <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="City or state suggested."
                      />
                      <TextFieldGroup
                        placeholder="* Skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info="What are your programming skills (use comma seperated values)"
                      />
                      <TextFieldGroup
                        placeholder="Github Username"
                        name="githubusername"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                        info="Github link goes here."
                      />
                      <TextAreaFieldGroup
                        placeholder="Short bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell us about yourself a little."
                      />
                      <div className="mb-3">
                        <button
                          type="button"
                          onClick={() => {
                            this.setState(prevState => ({
                              displaySocialInput: !prevState.displaySocialInput
                            }));
                          }}
                          className="btn btn-light"
                        >
                          Add social network links
                        </button>
                        <span className="text-muted">Optional</span>
                      </div>
                      {socialInputs}
                      <input
                        type="submit"
                        value="Save Profile"
                        className="btn btn-info btn-block mt-4"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
