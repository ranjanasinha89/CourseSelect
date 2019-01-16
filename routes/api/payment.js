const express = require("express");
const router = express.Router();
const passport = require("passport");
// Payment Model
const TheSchemaPayment = require("../../models/Payment");
const validatePaymentInput = require("../../validation/payment");

const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const mailer = require("../../misc/mailer");
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const gravatar = require("gravatar");
const Studentinfo = require("../../models/Studentinfo");

//import { infoUser } from '../../client/src/components/auth/Login';
//------const userCredentials = require("../../client/src/components/auth/Login");
const nodemailer = require('nodemailer');
//const xoauth2 = require('xoauth2');
//const GooglePlusTokenStrategy = require("passport-google-plus-token");
//var smtpTransport = require('nodemailer-smtp-transport');
//const theGoogleInfo = require("../../config/passport");


router.get("/payment",
passport.authenticate("jwt", { session: false }),
 (req, res, next) => {
  // console.log(req.body, req.body.name );
  res.send({
    name: req.body.name,
    email: req.body.email,
    creditcardnumber: req.body.creditcardnumber ///,
  //  expirationmonthyear: req.body.paymentinfo.expirationmonthyear,
    //ccv: req.body.paymentinfo.ccv
  }).catch(next);
});


{/*
router.post("/payment",
passport.authenticate("jwt", { session: false }),
(req, res, next) => {
  const { errors, isValid } = validatePaymentInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("my post request");
  Payment.create(req.body).then(function(payment){ // or  instead of these 2 lines above
     res.send(payment);
   }).catch(next);
 });
*/}



var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "courseselect2018@gmail.com",
    pass: "admin@1234"
  }
});


router.post("/payment",
passport.authenticate("jwt", { session: false }),
//passport.authenticate("googleToken", { session: false }),
(req, res) => {
  console.log("Now Processing the post() method!");

  //Studentinfo.findOne({ name: req.params.name })
  //.then(Studentinfo => {
  //const apayment = new TheSchemaPayment(req.body);

//  Studentinfo.coursesselected.unshift(apayment);
  //Studentinfo.save().then(Studentinfo => res.json(Studentinfo));
  //TheSchemaPayment(apayment);
  //TheSchemaPayment.save().then(TheSchemaPayment => res.json(TheSchemaPayment)); })
//.catch(err => res.status(404).json({ success: false }));

  {/*
  User.findOne({ "local.email": req.body.email }).then(user => {
    if (!user) {
      User.findOne({ "google.email": req.body.email }).then(user => {
        const payload = {
          id: user.id,
          name: user.google.name,
          email: user.google.email
        };
    });}
    else{
    const payload = {
      id: user.id,
      name: user.local.name,
      email: user.local.email
    };
  }
});
*/}

  // const { errors, isValid } = validatePaymentInput(req.body);
  // if (!isValid) {    return res.status(400).json(errors);  }
  console.log("Now Processing the post() method!");

  const newpayment = new TheSchemaPayment( {
    name: req.body.paymentinfo.name,
    email: req.body.paymentinfo.email,
    creditcardnumber: req.body.paymentinfo.creditcardnumber,
    expirationmonthyear: req.body.paymentinfo.expirationmonthyear,
    //expirationyear: req.body.paymentinfo.expirationyear,
    ccv: req.body.paymentinfo.ccv
  }); // req.body);

  //const apayment = new TheSchemaPayment(req.body);
//  apayment.save();
  // console.log(newpayment);








    const costBeforeFinAid = 1000 * req.body.paymentinfo.thecoursesincart.length;

  // Compose an email
          const html = `Hi ${req.body.paymentinfo.name}!


            Thank you for Completing Checkout for your Courses!
            Here is the reciept information of your transaction<br/>

            ___________________________________________________________

            Student Name: ${req.body.paymentinfo.name}
            Student Email: ${req.body.paymentinfo.email}
            Credit Card information: Used for your transaction:
            Credit Card Number:
            ${req.body.paymentinfo.creditcardnumber}
            Card Expiration Date:
            ${req.body.paymentinfo.expirationmonthyear}

            Price of each course: $1000
            Number of Courses Checked Out:  ${req.body.paymentinfo.thecoursesincart.length}

            Total Cost of Courses Before Financial Aid :  ${ costBeforeFinAid }
            Amount of Financial Aid Entered:   ${req.body.paymentinfo.enteredfinancialaid}

            Final Total after Financial Aid Deduction: ${req.body.paymentinfo.newAmountAfterFinAid}
            ___________________________________________________________


            Have a Amazing day!


            Team,

            Course Select
            `;
          //Send the email
          // mailer.sendEmail(
          //   "admin@courseselect.com",
          //   req.body.email,
          //   "Email verification",
          //   html
          // );
          var mailOptions = {
            from: "courseselect2018@gmail.com",
            to: req.body.paymentinfo.email,
            subject: "Checkout Confirmation",
            text: html
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });


newpayment
.save()
.then(newpayment => res.json(newpayment))
.catch(err => console.log(err));




{/*
let transporter = nodemailer.createTransport({
  service: "Gmail",
  //host: 'smtp.gmail.com',
  auth: //passport.authenticate("googleToken", { session: false })
 {
    //xoauth2: xoauth2.createXOAuth2Generator({

    //user: "eguevara1996@gmail.com",
    user: "eguevara1996@gmail.com",
    pass: "E$t eba ngue vara",
    //clientId: '498630087136-oorljhuca5lojak119ji46rvn02g764d.apps.googleusercontent.com',
    //clientSecret: 'IH1d57QjsNoheWIA6SPFdHAM',
    //refreshToken: theGoogleInfo.savedRefreshToken
  //})
}
}
);
console.log('Reached after the transporter, before verify ');


// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
        console.log('Server errorrrr connection in verify');
   } else {
        console.log('Server is ready to take our messages');
   }
});

let HelperOptions = {
  from: "eguevara1996@gmail.com",
  to: "eguevara1996@gmail.com",
  subject: "Confirmation Email",
  text: " Thank you for completing checkout of CourseSelect"
};
console.log('Now past Helper ');

transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(" Could not send message, Error in sendMail")
            return console.log(error)
        }
        console.log('The Message was sent: ');
        console.log(info);
});
console.log('Made it past sendMail() ');

*/}






 //Payment.create(req.body).then(function(payment){ // or  instead of these 2 lines above
  //  res.send(payment);  }
  // Compose an email
  // const html = `Hi ${req.body.name}!
  //   <br/>
  //   <br />
  //   Thank you for using CourseSelect.
  //   Here is the reciept of your transaction:<br/>
  //   Token: <b>${randomSecretToken}</b>
  //   <br />
  //   on the following page:
  //   <a href="http://localhost:3000/verify">Course-Select verifying page</a>
  //
  //   <br /> </br>
  //   Here are the courses you selected to enroll in:
  //   <br /> </br>
  //
  //   <br /> </br>
  //   Have a good day!
  //   <br /> </br>
  //
  //   Team,
  //   <br />
  //   Course Select
  //   `;
  // //Send the email
  // mailer.sendEmail(
  //   "admin@courseselect.com",
  //   req.body.email,
  //   "Reciept of transaction",
  //   html
  // );

});


module.exports = router;
