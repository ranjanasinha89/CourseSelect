import React, { Component } from "react";
import SidebarAdmin from "../layout/SidebarAdmin";
import {
  getHoldsByUniId,
  postHoldsByUniId,
  deleteByHoldsId
} from "../../actions/addholdsactions";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class AddHolds extends Component {
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
    this.props.getHoldsByUniId(university_id);
  }
  hendleDelete(holds_id) {
    this.props.deleteByHoldsId(holds_id, this.props.match.params.university_id);
  }
  onSubmit(e) {
    // e.preventDefault();
    const holdsData = {
      University_ID: this.props.match.params.university_id,
      description: this.state.description
    };
    this.props.postHoldsByUniId(holdsData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderHoldsTextBox() {
    return (
      <React.Fragment>
        <div className="display-4 lead text-center">
          <h2>Add a new hold:</h2>
        </div>
        <div className="shadow-lg p-4 mb-10 bg-grey rounded">
          <form onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
              placeholder="* Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              // error={errors.description}
              info="Add a new Hold item"
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
    if (this.props.holds.holds[0]) {
      return (
        <React.Fragment>
          <br />
          <br />
          <div className="display-4 lead text-center">
            <h2>Existing Holds:</h2>
          </div>
          {this.props.holds.holds.map(holds => (
            <div
              className="shadow-lg p-4 mb-10 bg-grey rounded"
              key={holds._id}
            >
              <div className="card w-90 m-2">
                <div className="card-body">
                  <div className="card-title">
                    <div className="row">
                      <div className="col col-md-10">
                        <h4 className="fa fa fa-genderless pr-1">
                          &nbsp;&nbsp;{holds.Holds_Comment}
                        </h4>
                      </div>
                      <div className="col col-md-2">
                        <button
                          onClick={() => this.hendleDelete(holds._id)}
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
              {this.renderHoldsTextBox()}
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
    holds: state.holds
  };
};

export default connect(
  mapStateToProps,
  { getHoldsByUniId, postHoldsByUniId, deleteByHoldsId }
)(AddHolds);
