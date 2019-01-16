import React, { Component } from "react";
import { connect } from "react-redux";
import { removeCourseFromCart } from "../../actions/studentinfoActions";
import { Link } from "react-router-dom";
class CourseCart extends Component {
  handleRemove = course => {
    this.props.removeCourseFromCart(this.props.studentid, course);
  };
  renderTable() {
    if (this.props.coursesincart.length === 0)
      return <p className="text-center">No courses in the cart yet.</p>;

    return (
      <React.Fragment>
        <table className="table table-dark">
          {this.props.coursesincart.map(course => (
            <tbody key={course._id}>
              <tr>
                <td>{course.name}</td>
                <td>
                  {" "}
                  <button
                    onClick={() => this.handleRemove(course)}
                    className="btn btn-danger btn-sm float-right"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <Link to={"/payment"}>
          <button className="btn btn-success w-100">Pay Now</button>
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h3 className="text-center">Cart</h3>
          {this.renderTable()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    studentinfo: state.studentinfo
  };
};

export default connect(
  mapStateToProps,
  { removeCourseFromCart }
)(CourseCart);
