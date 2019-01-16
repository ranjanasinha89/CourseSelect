import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import SidebarAdmin from "../layout/SidebarAdmin";
import SidebarProf from "../layout/SidebarProf";
import Sidebar from "../layout/Sidebar";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

import { Link } from "react-router-dom";

class Dashboard extends Component {
  populateSidebar() {
    if (this.props.auth.user.user_type === "ADMIN") {
      return (
        <React.Fragment>
          <SidebarAdmin />
        </React.Fragment>
      );
    } else if (this.props.auth.user.user_type === "PROFESSOR") {
      return (
        <React.Fragment>
          <SidebarProf />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Sidebar />
        </React.Fragment>
      );
    }
  }





  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="container-fluid">
            <div className="row">
            <div className="col-md-2">
              {this.populateSidebar()}</div>
                <div className="col-md-10">
                        <h1 className="display-4 text-center"> Edit Profile</h1>

                        <p className="lead text-muted">
                          Welcome{" "}
                          <Link to={`/profile/${profile.handle}`}>
                            {user.name}
                          </Link>
                        </p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />

                        <div style={{ marginBottom: "60px" }} />
                        <button
                          onClick={this.onDeleteClick.bind(this)}
                          className="btn btn-danger"
                        >
                          Delete My Account
                        </button>
                      </div>

                  
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="container-fluid">
            <div className="row">
              {this.populateSidebar()}
              <div className="col-md-2">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-10">
                      <div className="row">
                        <Link
                          to="/create-profile"
                          className="btn btn-lg btn-info"
                        >
                          Create Profile
                        </Link>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return (
       <React.Fragment>
        {dashboardContent}
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
