import curs from "../model/curs.js";
import nodemailer  from 'nodemailer';


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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'simakey.klara@gmail.com',
        pass: 'rfyupumwvtglcqth'
      }
    })
    
    const mailOptions = {
      from: "simakey.klara@gmail.com",
      to: "mher15jan@gmail.com",
      subject: "Sending Email using Node.js",
      html: "<h1>That was easy!</h1>",
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