import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-10">
                <div className="row">
                  <div className="login">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 m-auto">
                          <div className="shadow-lg p-4 mb-10 bg-grey rounded">
                            <h1 className="display-4 text-center">
                              Person name you want to chat with!
                            </h1>

                            <form onSubmit={this.onSubmit}>
                              <input
                                type="text"
                                className="form-control form-control-lg "
                                placeholder="Enter the name"
                                onChange={this.onChange}
                              />{" "}
                              <input
                                className="btn btn-success btn-block mt-4"
                                type="submit"
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
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

export default UsernameForm;
