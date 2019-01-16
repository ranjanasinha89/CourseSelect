import React, { Component } from "react";
import { getToDoByUniId } from "../../actions/addtodoactions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class ToDoProffStudent extends Component {
  componentDidMount() {
    const university_id = this.props.auth.user.university_id;
    this.props.getToDoByUniId(university_id);
  }
  renderExistingContent() {
    // return <h2>In here</h2>;
    if (this.props.todos.todos[0]) {
      return (
        <React.Fragment>
          <div className="display-4 lead text-center">
            <h2>To-Do Items</h2>
          </div>
          {this.props.todos.todos.map(todo => (
            <div className="shadow-lg p-4 mb-10 bg-grey rounded">
              <div className="card w-90 m-2" key={todo._id}>
                <div className="card-body">
                  <div className="card-title">
                    <div className="row">
                      <div className="col col-md-12">
                        <h4 className="fa fa fa-genderless pr-1">
                          &nbsp;&nbsp;{todo.Todo_Comment}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="shadow-lg p-4 mb-10 bg-grey rounded">
            <div className="display-4 lead text-center">
              <h3>You do not have any To-Do items.</h3>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">{this.renderExistingContent()}</div>
      </React.Fragment>
    );
  }
}
ToDoProffStudent.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    todos: state.todos,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { getToDoByUniId }
)(ToDoProffStudent);
