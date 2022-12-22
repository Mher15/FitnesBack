import curs from "../model/curs.js";
import nodemailer  from 'nodemailer';

var smtpConfig = { 
  host: "smtp.sendgrid.net", 
  secure: true, // use SSL 
  auth: { 
    user: "apikey", 
    pass: "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", 
  }, 
}; 
 
var transporter = nodemailer.createTransport(smtpConfig);

export class AdminController {
  static index(req, res) {
    res.send("hello");
  }

  static update(req, res) {
    curs
      .findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            amount: req.body.amount,
            times: req.body.times,
          },
        },
        { new: true }
      )
      .then((item) => {
        console.log(item);
      });
    res.end();
  }

  static delete(req, res) {
    curs
      .deleteOne({ _id: req.body.id })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static freeMail(req, res) {
    
      var mailOptions = {
        from: "noreplysimakey@gmail.com",
        // to: req.body.email,
        to: "klarasimonyans@gmail.com",
        subject: "new student",
        text: 'new student',
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  }
  
  static paymentMail(req, res) {
    var smtpConfig = {
      host: "smtp.sendgrid.net",
      secure: true, // use SSL
      auth: {
        user: "apikey",
        pass: "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",
      },
    };
    
    var transporter = nodemailer.createTransport(smtpConfig);
    
      console.log(req.body)
      function gethtml(){
        return `
          <h1>User Nmae ${req.body.fullName}</h1>
        `
      }
      var mailOptions = {
        from: "noreplysimakey@gmail.com",
        // to: req.body.email,
        to: "klarasimonyans@gmail.com",
        subject: "new student",
        text: 'new student',
        html:gethtml()
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  }
}