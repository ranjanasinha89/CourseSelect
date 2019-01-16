import React, { Component } from "react";
import SidebarAdmin from "../layout/SidebarAdmin";
import DeleteCourse from "../create-course/deletecourse";

class DeleteAdminCourseWrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <SidebarAdmin />
            </div>
            <div className="col-md-10">
              <DeleteCourse />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteAdminCourseWrapper;
