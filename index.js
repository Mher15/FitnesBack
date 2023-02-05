import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer  from "nodemailer";


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
// app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.get("/test", (req, res) => {
res.send("helllooo")})
app.post("/api/free-curs", (req, res) => {
  var smtpConfig = {
    host: "smtp.sendgrid.net",
    secure: true, // use SSL
    auth: {
      user: "apikey",
      pass: "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",
    },
  };
  var transporter = nodemailer.createTransport(smtpConfig);
  const htmlBody = `<div>
	<h1>Curs Name:${req.body.cursName}</h1>  
	<h1>Client Name:${req.body.name}</h1>  
	<h1>Client Phone:${req.body.phone}</h1>  
	<h1>Client Email:${req.body.email}</h1>  
  <p>${req.body.age}</p>
  </div>`
  var mailOptions = {
    from: "Simakey.klara@gmail.com",
    to: "karen.jamalyan96@gmail.com",
    subject: "New Free curs",
  	html:htmlBody
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send");
    }
	res.end()
  });
});

app.post("/api/new-payment",(req,res)=>{
  console.log(req.body)
  var smtpConfig = {
    host: "smtp.sendgrid.net",
    secure: true, // use SSL
    auth: {
      user: "apikey",
      pass: "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",
    },
  };

  var transporter = nodemailer.createTransport(smtpConfig);
  const htmlBody = `<div>
	<h1>Curs Name:${req.body.cursName}</h1>  
	<h1>Client Name:${req.body.fullName}</h1>  
	<h1>Client Phone:${req.body.phone}</h1>  
	<h1>Client Email:${req.body.email}</h1>  
  <p>${req.body.workout}</p>
  <p>${req.body.age}</p>
  <p>${req.body.workout === '2 workout on week'?  req.body.times[0].time + ' , ' + req.body.times[0].day + '<br/>' +  req.body.times[2].time + ' , ' + req.body.times[2].day :
       req.body.times[0].time + ' - ' + req.body.times[0].day + '<br/>' + 
       req.body.times[1].time + ' - ' + req.body.times[1].day + '<br/>' + 
       req.body.times[2].time + ' - ' + req.body.times[2].day }</p>
  </div>`
  var mailOptions = {
    from: "Simakey.klara@gmail.com",
    to: "simakeyusa@gmail.com",
    subject: "New peyment client",
	  html:htmlBody
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: test mail");
    }
	res.end()
  });
})

const port = 9000;


app.listen(port,error => {
	if (error) throw error;
	console.log("Your server is running on port 9000");
})
