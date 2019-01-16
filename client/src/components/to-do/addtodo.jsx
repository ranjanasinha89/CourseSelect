import React, { Component } from "react";
import SidebarAdmin from "../layout/SidebarAdmin";
import {
  getToDoByUniId,
  postToDoByUniId,
  deleteByToDoId
} from "../../actions/addtodoactions";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const university_id = this.props.match.params.university_id;
    this.props.getToDoByUniId(university_id);
  }
  hendleDelete(todo_id) {
    this.props.deleteByToDoId(todo_id, this.props.match.params.university_id);
  }
  onSubmit(e) {
    // e.preventDefault();
    const todoData = {
      University_ID: this.props.match.params.university_id,
      description: this.state.description
    };
    this.props.postToDoByUniId(todoData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderToDoTextBox() {
    return (
      <React.Fragment>
        <div className="display-4 lead text-center">
          <h2>Add new To-Do:</h2>
        </div>
        <div className="shadow-lg p-4 mb-10 bg-grey rounded">
          <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
              placeholder="* Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              // error={errors.description}
              info="Add a new To Do item"
            />
            <input
              type="submit"
              // value="Submit"
              className="btn btn-info"
            />
          </form>
        </div>
      </React.Fragment>
    );
  }

  renderExistingContent() {
    if (this.props.todos.todos[0]) {
      return (
        <React.Fragment>
          <br />
          <br />
          <div className="display-4 lead text-center">
            <h2>Existing To-Do:</h2>
          </div>
          {this.props.todos.todos.map(todo => (
            <div className="shadow-lg p-4 mb-10 bg-grey rounded" key={todo._id}>
              <div className="card w-90 m-2">
                <div className="card-body">
                  <div className="card-title">
                    <div className="row">
                      <div className="col col-md-10">
                        <h4>{todo.Todo_Comment}</h4>
                      </div>
                      <div className="col col-md-2">
                        <button
                          onClick={() => this.hendleDelete(todo._id)}
                          className="btn btn-info m-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SidebarAdmin />
            </div>
            <div className="col-md-10">
              {this.renderToDoTextBox()}
              {this.renderExistingContent()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(
  mapStateToProps,
  { getToDoByUniId, postToDoByUniId, deleteByToDoId }
)(AddToDo);
