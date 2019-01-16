import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/todoactions";
import ToDoCard from "./todocard";

class ToDoAdmin extends Component {
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
    if (this.props.users.users) {
      const userList = this.props.users.users.filter(
        user => user.user_type !== "ADMIN"
      );

      return (
        <React.Fragment>
          <div className="display-4 lead text-center">
            <h2>TO-DO</h2>
          </div>
          {userList.map(user => (
            <ToDoCard
              key={user.university_id}
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
)(ToDoAdmin);
