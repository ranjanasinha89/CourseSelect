import React, { Component } from "react";
import { connect } from "react-redux";

import { getStudentInfoByName } from "../../actions/studentinfoActions";
import { getCourses } from "../../actions/courseActions";
import { getFaidByUniId } from "../../actions/addfaidactions";

import TextFieldGroup from "../common/TextFieldGroup";
import ConfirmationPage from "./ConfirmationPage";

class Cart extends React.Component {
  state = {
    totalfianacialaidamount: 0
  };

  handleAddView = () => {
    const selectButtonInfo = this.state.selectButtonInfo;
    selectButtonInfo.add = 1;
    this.setState(selectButtonInfo);
  };

  handleBacktoHome = backFrom => {
    const selectButtonInfo = this.state.selectButtonInfo;
    switch (backFrom) {
      case "add":
        selectButtonInfo.add = 0;
        break;
      case "swap":
        selectButtonInfo.swap.ind = 0;
        break;
      default:
        break;
    }
    this.setState(selectButtonInfo);
  };

  componentDidMount() {
    const university_id = this.props.auth.user.university_id;

    this.props.getFaidByUniId(university_id);
  }

  populateFinancialAid() {
    if (this.props.faid) {
      return (
        <React.Fragment>
          {this.props.faid.faid.map(one => (
            <p>
              {one.Name}: ${one.faid}
            </p>
          ))}
        </React.Fragment>
      );
    }
  }

  render() {
    console.log("In cart: ", this.props);
    let totalfinancialaidamount = 0;
    for (var i = 0; i < this.props.faid.faid.length; i++) {
      totalfinancialaidamount =
        totalfinancialaidamount + this.props.faid.faid[i].faid;
    }
    // const numofcoursesincart = this.state.coursesincart.length;
    if (this.props.coursesincart) {
      const numofcoursesincart = this.props.coursesincart.length;
      //const numofcoursesincart = this.state.coursesincart.length;
      //const numofcoursesincart = this.state.coursesincart.length;
      const costperCourse = 1000;
      const totalcostCourses = 0;

      const receiptInfo = [];
      const a2 = [{ grade: "i am item1" }];
      //receiptInfo.push.apply( receiptInfo , a2 );
      const a3 = ["i am item3"];

      this.props.coursesincart.map(course =>
        receiptInfo.push.apply(receiptInfo, [course.name])
      );

      // console.log("receiptInfo: ", receiptInfo);
      // console.log("a3: ", a3);

      // console.log("receiptInfo: ", this.receiptInfo);

      //  <ConfirmationPage  receiptInfo={receiptInfo} />

      // <div>     <ConfirmationPage receiptInfo={this.receiptInfo} /> </div>

      return (
        <React.Fragment>
          {/* <div className="container-fluid"> */}
          {/* <div className="row"> */}
          {/* <div className="col-md-6 m-auto"> */}
          <div className="shadow-lg p-4 mb-10 bg-grey rounded">
            <h1 className="display-4 text-center">Cart</h1>

            <p className="lead text-left" style={{ color: "black" }}>
              {" "}
              <i className="fa fa-shopping-cart">
                &nbsp;&nbsp;Total Number of Courses in Cart:{" "}
                {numofcoursesincart} <br />
              </i>
              {/* <i className="fa fa-shopping-cart" /> */}
              <hr />
            </p>

            {this.props.coursesincart.map(course => (
              <h4 className="fa fa fa-genderless pr-1">
                &nbsp;&nbsp;{course.name}
              </h4>
            ))}

            <p className="lead text-right" style={{ color: "black" }}>
              {" "}
              <hr />
              {"Price of each course: $1000"}
            </p>

            <h5 className="lead text-right" style={{ color: "black" }}>
              {" "}
              {"Total Cost: $"}{" "}
              {1000 *
                this.props.studentinfobyname.studentinfo.coursesincart.length}
            </h5>
            <hr />

            <h4>Financial Aid:</h4>
            <React.Fragment>{this.populateFinancialAid()}</React.Fragment>
            <form onSubmit={this.props.funcfinaid}>
              <TextFieldGroup
                id="financialAidAmount"
                name="financialAidAmount"
                placeholder="Enter Financial Aid Amount Here"
                type="text"
              />

              <div className="lead text-left" style={{ color: "black" }}>
                Financial Aid Deduction:{" "}
                {this.props.enteredfinancialaid && (
                  <p> {this.props.enteredfinancialaid} </p>
                )}{" "}
              </div>
              {this.props.error && <p> {this.props.error} </p>}

              <div className="lead text-left" style={{ color: "black" }}>
                {" "}
                Total Cost after Financial Aid:{" "}
                {this.props.newpricetotal && (
                  <p> {this.props.newpricetotal} </p>
                )}{" "}
              </div>

              {/* {console.log("length of coursesincart:" + { numofcoursesincart })} */}

      


              <input
                type="submit"
                value="Calculate Financial Aid"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </React.Fragment>
      );
    } else {
      return <h2>Loading...</h2>;
    }
  }
}

//React.render( <Cart  receiptInfo={receiptInfo} /> , document.getElement);

const mapStateToProps = state => {
  return {
    auth: state.auth,
    studentinfo: state.studentinfo,
    studentinfobyname: state.studentsinfo,
    faid: state.faid
  };
};

export default connect(
  mapStateToProps,
  { getStudentInfoByName, getCourses, getFaidByUniId }
)(Cart);
