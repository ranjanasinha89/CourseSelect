import React, { Component } from "react";
import SidebarAdmin from "../layout/SidebarAdmin";
import CreateCourse from "../create-course/createcourse";

class CreateAdminCourseWrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SidebarAdmin />
            </div>
            <div className="col-md-10">
              <CreateCourse />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateAdminCourseWrapper;
