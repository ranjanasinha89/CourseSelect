import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/faidActions";
import { Link } from "react-router-dom";
import FinancialAidCard from "./faidcard";

class FaidAdmin extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  getName(user) {
    if (user.local) {
      return user.local.name;
    } else {
      return user.google.name;
    }
  }

  render() {
    const userList = this.props.users.users.filter(
      user => user.user_type === "STUDENT"
    );
    if (this.props.users.users) {
      return (
        <React.Fragment>
          <div className="display-4 lead text-center">
            <h2>FINANCIAL AID</h2>
          </div>
          {userList.map(user => (
            <FinancialAidCard
              key={user._id}
              data={user}
              name={this.getName(user)}
            />
          ))}
        </React.Fragment>
      );
    } else {
      return <h3>Loading...</h3>;
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { getUsers }
)(FaidAdmin);
