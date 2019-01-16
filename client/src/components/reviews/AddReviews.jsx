import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getHoldsByUniId,
  postHoldsByUniId,
  deleteByHoldsId
} from "../../actions/addholdsactions";

import {
  getReviewsByCourseNumber,
  postReviewsByCourseNumber,
  deleteReviewsByCourseNumber
} from "../../actions/reviewsActions";
import { getCoursesByCourseNumber } from "../../actions/courseActions";

class AddReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      rating: ""
      //    name: "",
      //    coursenumber: this.props.courses.courses.coursenumber
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const coursenumber = this.props.courses.courses.coursenumber;
    this.props.getReviewsByCourseNumber(coursenumber);
    //this.props.getCoursesByCourseNumber(coursenumber);

    //this.props.findCheckboxvalue(this.props.auth.user.name);
  }

  onSubmit(e) {
    console.log("On submit");
    console.log("The state: ", this.state);
    console.log("Checking for the user:", this.props.auth.user.name);

    //  const therating = e.target.elements.rating.checked;
    //console.log("this.state.rating: ", this.state.rating);

    //////////////////////////////////////////////////////

    const inputElementSt1 = document.getElementById("st5");
    const inputElementSt2 = document.getElementById("st4");
    const inputElementSt3 = document.getElementById("st3");
    const inputElementSt4 = document.getElementById("st2");
    const inputElementSt5 = document.getElementById("st1");

    console.log("inputElementSt1.checked: ", inputElementSt1.checked);
    console.log("inputElementSt2.checked: ", inputElementSt2.checked);
    console.log("inputElementSt3.checked: ", inputElementSt3.checked);
    console.log("inputElementSt4.checked: ", inputElementSt4.checked);
    console.log("inputElementSt5.checked: ", inputElementSt5.checked);

    var ratingStar = "no rating";
    const whichId = "";

    if (inputElementSt1.checked) {
      ratingStar = "1";
      console.log("The star rating is:  = ", ratingStar);
      console.log("inputElementSt1.checked: ", inputElementSt1.checked);
    } else if (inputElementSt2.checked) {
      ratingStar = "2";
      console.log("The star rating is:  = ", ratingStar);
      console.log("inputElementSt2.checked: ", inputElementSt2.checked);
    } else if (inputElementSt3.checked) {
      ratingStar = "3";
      console.log("The star rating is:  = ", ratingStar);
      console.log("inputElementSt3.checked: ", inputElementSt3.checked);
    } else if (inputElementSt4.checked) {
      ratingStar = "4";
      console.log("The star rating is:  = ", ratingStar);
      console.log("inputElementSt4.checked: ", inputElementSt4.checked);
    } else if (inputElementSt5.checked) {
      ratingStar = "5";
      console.log("The star rating is:  = ", ratingStar);
      console.log("inputElementSt5.checked: ", inputElementSt5.checked);
    } else {
      ratingStar = "no rating";
      console.log("No star rating given");
    }

    this.setState({ rating: ratingStar });
    console.log("this.state.rating: ", this.state.rating);
    //   therating = e.target.elements.rating.checked;

    //  alert(starname.length);

    //////////////////////////////////////////////////////

    const reviewsData = {
      //  University_ID: "1996",
      studentname: this.props.auth.user.name,
      coursenumber: this.props.courses.courses.coursenumber,
      description: this.state.description,
      rating: ratingStar
      //  name: this.state.name,
    };

    console.log("reviewsData: ", reviewsData);
    //this.props.reviews.reviews.push( reviewsData );
    console.log("this.props: ", this.props);
    //  console.log("this.props.history: ", this.props.history);
    this.props.postReviewsByCourseNumber(reviewsData, this.props.history);
    //console.log("after: this.props.history: ", this.props.history);
}

  onChange(e) {
    console.log("onchange");
    console.log("target: ", e.target.name);
    console.log("value: ", e.target.value);
    this.setState({ [e.target.name]: e.target.value });

    //this.setState({ ["rating"]: this.state.rating});
  }

  renderReviewsTextBox() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <br />

        <div className="card w-90 m-2">
          <div className="card-body">
            <div className="card-title">
              <div className="row">
                <div className="col col-md-12">
                  <h2>Write a Review</h2>
                  <form onSubmit={this.onSubmit}>
                    {/*
            <label for="nameReviewer" class="control-label" >Enter Your Name  (Optional)</label>
            <input id="nameReviewer" name="nameReviewer" type="text" class="form-control"
            placeholder="Leave name entry blank to leave an anonymous review"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            info="Leave name entry blank to leave an anonymous review"
            />
      */}
                    <br />

                    <TextAreaFieldGroup
                      placeholder="* Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                      // error={errors.description}
                      info="Add a new Review"
                    />

                    <React.Fragment>
                      <form>
                        <div>
                          <meta charSet="utf-8" />
                          <meta
                            httpEquiv="X-UA-Compatible"
                            content="IE=edge,chrome=1"
                          />
                          <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1"
                          />

                          <link
                            href="http://www.cssscript.com/wp-includes/css/sticky.css"
                            rel="stylesheet"
                            type="text/css"
                          />
                          <link
                            rel="stylesheet"
                            href="http://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          />
                          <link
                            rel="stylesheet"
                            href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                          />

                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\nbody { background-color:#fafafa;}\n.content {\n  text-align: center;\n  margin-top:150px;\n}\n.content h1 {\n  font-family: 'Sansita', sans-serif;\n  letter-spacing: 1px;\n  font-size: 50px;\n  color: #282828;\n  margin-bottom: 10px;\n}\n.content  i {\n  color: #FFC107;\n}\n.content span {\n  position: relative;\n  display: inline-block;\n}\n.content  span:before, .content  span:after {\n  position: absolute;\n  content: \"\";\n  background-color: #282828;\n  width: 40px;\n  height: 2px;\n  top: 40%;\n}\n.content  span:before {\n  left: -45px;\n}\n.content  span:after {\n  right: -45px;\n}\n.content p {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 18px;\n  letter-spacing: 1px;\n}\n.wrapper {\n  position: relative;\n  display: inline-block;\n  border: none;\n  font-size: 14px;\n  margin: 50px auto;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.wrapper input {\n  border: 0;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  position: absolute !important;\n  clip: rect(1px 1px 1px 1px);\n  clip: rect(1px, 1px, 1px, 1px);\n  opacity: 0;\n}\n\n.wrapper label {\n  position: relative;\n  float: right;\n  color: #C8C8C8;\n}\n\n.wrapper label:before {\n  margin: 5px;\n  content: \"\\f005\";\n  font-family: FontAwesome;\n  display: inline-block;\n  font-size: 1.5em;\n  color: #ccc;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\n\n.wrapper input:checked ~ label:before {\n  color: #FFC107;\n}\n\n.wrapper label:hover ~ label:before {\n  color: #ffdb70;\n}\n\n.wrapper label:hover:before {\n  color: #FFC107;\n}\n"
                            }}
                          />

                          <div className="wrapper">
                            <h4>Rate this course out of 5 stars</h4>
                            <input
                              type="checkbox"
                              id="st1"
                              defaultValue={1}
                              name="rating"
                            />
                            <label htmlFor="st1" />
                            <input
                              type="checkbox"
                              id="st2"
                              defaultValue={2}
                              name="rating"
                            />
                            <label htmlFor="st2" />
                            <input
                              type="checkbox"
                              id="st3"
                              defaultValue={3}
                              name="rating"
                            />
                            <label htmlFor="st3" />
                            <input
                              type="checkbox"
                              id="st4"
                              defaultValue={4}
                              name="rating"
                            />
                            <label htmlFor="st4" />
                            <input
                              type="checkbox"
                              id="st5"
                              defaultValue={5}
                              name="rating"
                            />
                            <label htmlFor="st5" />
                          </div>
                        </div>
                      </form>
                    </React.Fragment>

                    <input
                      type="submit"
                      value="Submit Review"
                      className="btn btn-info"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }

  render() {
    console.log("In Reviews", this.props);
    console.log("THIS.STATE.RATING: ", this.state.rating);

    return <React.Fragment>{this.renderReviewsTextBox()}</React.Fragment>;
  }
}

AddReviews.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    reviews: state.reviews,
    name: state.name,
    courses: state.courses,
    auth: state.auth,
    rating: state.rating
  };
};

export default connect(
  mapStateToProps,
  {
    getHoldsByUniId,
    postHoldsByUniId,
    deleteByHoldsId,
    getReviewsByCourseNumber,
    postReviewsByCourseNumber,
    deleteReviewsByCourseNumber,
    getCoursesByCourseNumber
  }
)(AddReviews);
