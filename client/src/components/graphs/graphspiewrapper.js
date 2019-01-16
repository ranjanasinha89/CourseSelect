import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SidebarAdmin from "../layout/SidebarAdmin";
import SidebarProf from "../layout/SidebarProf";
import Sidebar from "../layout/Sidebar";
import ProfPieGraph from "./piestudent";

class graphspiewrapper extends Component {
  populateSidebar() {
    if (this.props.auth.user.user_type === "ADMIN") {
      return (
        <React.Fragment>
          <SidebarAdmin />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <SidebarProf />
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{this.populateSidebar()}</div>
            <div className="col-md-10">
              <ProfPieGraph />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

graphspiewrapper.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(graphspiewrapper);
