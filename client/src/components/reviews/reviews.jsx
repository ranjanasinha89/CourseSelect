import React, { Component } from "react";
import PropTypes from "prop-types";
import AddReviews from "./AddReviews";
import ReviewsProffAdmin from "./reviewsproffadmin";
import { connect } from "react-redux";
import { getStudentInfoByName } from "../../actions/studentinfoActions";


class Reviews extends Component {

  componentDidMount() {

    console.log("Username: ", this.props.auth.user.name);
    this.props.getStudentInfoByName(this.props.auth.user.name);
  }

  // populateContent() {
  //   if (this.props.auth.user.user_type === "STUDENT") {
  //     return (
  //       <React.Fragment>
  //         <AddReviews />
  //       </React.Fragment>
  //     );
  //   }
  // }

  render() {


console.log("inside review----------: ", this.props);

let doesStudentHaveCourse = 0;


if(this.props.studentinfobyname.studentinfo.coursesselected ){
  for(var i= 0; i <this.props.studentinfobyname.studentinfo.coursesselected.length; i++ ){

    if( this.props.studentinfobyname.studentinfo.coursesselected[i].name === this.props.courses.name ){
        doesStudentHaveCourse = 1;
      }
    }

}

//this.props.studentinfobyname.studentinfo.coursesselected.map(function( course ){
//  console.log("course: ", course);




if( doesStudentHaveCourse == 1 ){
  console.log("doesStudentHaveCourse == 1 -----------: ");

  return (
    <React.Fragment>

    <ReviewsProffAdmin/>

    <AddReviews />

    </React.Fragment>
  );
}



else{
  return(<React.Fragment>
    <ReviewsProffAdmin/>
    </React.Fragment>)
}
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  studentinfobyname: state.studentsinfo

});

Reviews.propTypes = {
  auth: PropTypes.object.isRequired
};


export default connect(
  mapStateToProps,
  { getStudentInfoByName }
)(Reviews);
