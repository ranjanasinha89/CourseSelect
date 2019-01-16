import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { Redirect } from "react-router-dom";
// import CreditCardInput from '../../react-credit-card-input-master/src/index';
import CreditCardInput from "../../react-credit-card-input-master/src/index";

import { Button } from "react-bootstrap";

class NewForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="shadow-lg p-4 h-100 mb-10 bg-grey rounded">
          <h1 className="display-4 text-center">Payment</h1>
          <p className="lead text-center" style={{ color: "black" }}>
            Fill in your Credit Card Information
          </p>

          <form onSubmit={this.props.submitFunction}>
            <TextFieldGroup
              id="nameoncard"
              name="nameoncard"
              placeholder="Full Name"
              type="text"
              required="required"
            />
            <TextFieldGroup
              id="emailaddress"
              name="emailaddress"
              placeholder="Email Address"
              type="text"
              aria-describedby="emailaddressHelpBlock"
              required="required"
            />
            <CreditCardInput
              cardNumberInputProps={{
                value: CreditCardInput.cardNumber,
                onChange: this.handleCardNumberChange,
                id: "creditcardnumber",
                name: "creditcardnumber",
                required: "required"
              }}
              cardExpiryInputProps={{
                value: CreditCardInput.expiry,
                onChange: this.handleCardExpiryChange,
                id: "expirationmonthyear",
                name: "expirationmonthyear",
                required: "required"
              }}
              cardCVCInputProps={{
                value: CreditCardInput.cvc,
                onChange: this.handleCardCVCChange,
                id: "cardcvv",
                name: "cardcvv",
                required: "required"
              }}
              fieldClassName="input"
            />{" "}
            <br /> <br />
            <div className="form-group">
              <span id="emailaddressHelpBlock" className="form-text text-muted">
                {" "}
                <br />
                Receipt will be sent to this email
              </span>
              <br /> <br />
            </div>
            {this.props.formSubmitted && <p> {this.props.formSubmitted} </p>}
            {this.props.error && <p> {this.props.error} </p>}
            <input type="submit" className="btn btn-success btn-block mt-4" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default NewForm;
