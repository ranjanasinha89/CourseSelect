import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Col } from "reactstrap";

class ViewCard extends Component {
  render() {
    // console.log(this.props);
    return (
      //<div className="m-2">
      <Col sm="4">
        <Card>
          <CardImg
            top
            width="100%"
            height="150px"
            // src="http://oriellycc.com/wp-content/uploads/2016/08/calschedule.jpg"
            src={this.props.card.imagelink}
            // src="pen-and-calender.jpg"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>
              <a href={this.props.card.route}>{this.props.card.name}</a>
            </CardTitle>
            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
            <CardText>{this.props.card.description}</CardText>
            {/* <Button>Button</Button> */}
          </CardBody>
        </Card>
        <br />
      </Col>
      // </div>
    );
  }
}

export default ViewCard;
