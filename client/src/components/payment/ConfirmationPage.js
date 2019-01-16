import React, { Component } from "react";
import { connect } from "react-redux";
import { removeCourseFromCart } from "../../actions/studentinfoActions";
import { getStudentInfoByName } from "../../actions/studentinfoActions";
import { getCourses } from "../../actions/courseActions";
import { Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import CourseCart from "../add-swap-delete-course/coursecart";

import PropTypes from "prop-types";
import Cart from  "./Cart";
import { receiptInfo } from  "./Cart";
import Payment from "./Payment";

class ConfirmationPage extends React.Component{



  componentDidMount() {
    this.props.getStudentInfoByName(this.props.auth.user.name);
  }



    printFunction = (e) => {
      e.preventDefault();
      window.print();
    }

    returnDashboardButton = (e) => {
      e.preventDefault();
      this.props.history.push("/viewschedule");
    }


render(){

  console.log(" NOW ON CONFIRMATION PAGE:Inside the props: ", this.props);
  console.log("NOW ON CONFIRMATION PAGE: ");
  console.log(" NOW ON CONFIRMATION PAGE:this.props.studentinfobyname.studentinfo ", this.props.studentinfobyname.studentinfo);

  let printNewAmount = 0;
  if( this.props.location.state.newAmount){
    printNewAmount = this.props.location.state.newAmount;
  }
  else{
    printNewAmount = 1000 * this.props.studentinfobyname.studentinfo.coursesincart.length;
  }


  //console.log("Inside!!", this.state.newpricetotal);


  const theProps = this.props;
  console.log(" THEPROPS VARIABLE ", theProps );

  const theInfo = this.props.receiptInfo;
  console.log("this.props.receiptInfo: ", this.props.receiptInfo);


//  const stateInfo = this.state.receiptInfo;

//  const propsData = this.props.location.state.detail.receiptInfo;



  console.log("theInfo: ", theInfo);
//  console.log("stateInfo: ", stateInfo);
//  console.log("propsData: ", propsData);

//  console.log("receiptInfo: ", receiptInfo);


if (this.props.studentinfobyname.studentinfo.coursesincart) {


  return(

<form onSubmit={this.props.printFunction}>

<div>


    <div className="container"   >
      <div className="row">
        <div className="col-md-6 m-auto">
          <div className="shadow-lg p-4 mb-10 bg-grey rounded">
            <h1 className="display-4 text-center">Confirmation of Checkout</h1>
            <h3 className="lead text-left" style={{ color: "black" }}>Here is your Reciept </h3>

            <React.Fragment>
            <hr />

            <p className="lead text-left" style={{ color: "black" }}> {"Course "} {"Price of each course: $1000"}</p>
                <p className="lead text-left" style={{ color: "black" }}>
                  {" "}
                  Courses Checkout Out :  {this.props.studentinfobyname.studentinfo.coursesincart.length}{" "}
                </p>
                {this.props.studentinfobyname.studentinfo.coursesincart.map(course => (
                  <div>
                    <p className="lead text-left" style={{ color: "black" }}> {course.name}</p>
                  </div>
                ))}

                <hr />
                <h5  className="lead text-right" style={{color: 'black'}} >

                  {"Total Cost Before Financial Aid Deduction: $"} {1000 * this.props.studentinfobyname.studentinfo.coursesincart.length}

                  </h5>

                    <h5 className="lead text-right" style={{color: 'black'} } >
                      {"Total Cost after Deductions:  $"} { printNewAmount}
                </h5>


                </React.Fragment>



            <div class="form-group">
               <button  name="submit" type="submit"  onClick={ this.printFunction }
               class="btn btn-primary">Print PDF of Reciept</button>
             </div>


             <div class="form-group">
                <button   name="submit" type="submit"  onClick={this.returnDashboardButton}
                class="btn btn-primary">See my new Schedule</button>
              </div>


          </div>
        </div>
      </div>
    </div>
</div>


</form>


      );
    }
    else {
     return <h2>Loading...</h2>;
   }
  }

  };

  const mapStateToProps = state => {
    return {
      studentinfo: state.studentinfo,
      receiptInfo: state.receiptInfo,
      auth: state.auth,
      studentinfobyname: state.studentsinfo,
      paymentinfo: state.paymentinfo,



    };
  };

  ConfirmationPage.propTypes = {
    receiptInfo: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired

  };


  export default connect(
    mapStateToProps,
    { getStudentInfoByName, getCourses }
  )(ConfirmationPage);
