import React, { Component } from "react";
import ViewCard from "../cards/card";
import SidebarAdmin from "../layout/SidebarAdmin";
import SidebarProf from "../layout/SidebarProf";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class GraphView extends Component {
  state = {
    graphList: [
      {
        id: "C001",
        name: "Students Enrolled",
        description: "View the students enrolled in each of your course",
        imagelink:
          "https://camo.githubusercontent.com/5bc663ff1290e028354eb622dab7f454869f9143/687474703a2f2f692e696d6775722e636f6d2f53634a6b734b682e706e67",
        route: "/bargraph"
      },
      {
        id: "C002",
        name: "Grades of Students",
        description: "View the grades of students in your course",
        imagelink:
          "data:image/png;base64,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",
        route: "/piegraph"
      }
    ]
  };

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">{this.populateSidebar()}</div>
          <div className="col-md-10">
            <div className="row">
              {this.state.graphList.map(graph => (
                <ViewCard key={graph.id} card={graph} />
              ))}
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

GraphView.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(GraphView);
