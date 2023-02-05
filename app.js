

const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

const FilterRoutes = require('./routes/filter-routes')
const FollowRoutes = require('./routes/follow-routes')
const SkillRoutes = require('./routes/skill-routes')
const UserRoutes = require('./routes/user-routes')


app.post("/free-curs", (req, res) => {
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
	  to: "simakeyusa@gmail.com",
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


app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (getProtocol(req) !== 'https'){
            return res.redirect('https://' + req.headers.host + req.url);}
            else
            return next();
        } else
        return next();
    });
function getProtocol(req) {
    var proto = req.connection.encrypted ? 'https' : 'http';
    proto = req.headers['x-forwarded-proto'] || proto;
    return proto.split(/\s*,\s*/)[0];
}

app.get('/*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.get('/verify_email', (req, res, next) => {
  const token = req.query.token
  let valid = false;
  jwt.verify(token, 'usernameEmail', async (err, decoded) => {
      if (err) {
      }
      else {
          const userManager = new UserManager()
          let result = await userManager.verifyUserEmail(decoded.username);
          valid = true
      }
      res.redirect(process.env.PUBLIC_CLIENT_URL + "?email_verification=" + valid)
  });
});
/*
* Exporting of module.exports.app is required.
* we mount it automaticaly to the Parse Server Deployment.
*/
module.exports = app