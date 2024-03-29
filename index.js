// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import path from "path";bodyParser
// import { fileURLToPath } from "url";
// import nodemailer from "nodemailer";
// import mysql from "mysql2";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const fileURLToPath = require("url");
const nodemailer = require("nodemailer");
const mysql = require('mysql2')




const connection = mysql.createConnection({
  host: "db-mysql-nyc1-16107-do-user-12870397-0.b.db.ondigitalocean.com",
  port: "25060",
  user: "doadmin",
  password: "AVNS_LesTQ8CZzZDD3Eot7yW",
  database: "defaultdb",
});
connection.connect((err) => {
  console.log("Connected!");
});

// const __filename = fileURLToPath(import.meta.url)
// console.log("__filename", __filename);
// const __dirname = path.dirname(__filename);
// console.log("__filename", __dirname);
dotenv.config();
const app = express();
// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/package/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/admin_login_simakey_klara", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/get-all-groups", async (req, res) => {
  connection.query(`SELECT * FROM "groups"`, (err, rews) => {  
    return res.send(rews);
  });
});

app.post("/curs_by_id", async (req, res) => {
  connection.query(
    `SELECT * FROM "groups" WHERE id=${req.body.id}`,
    (err, rews) => {
      return res.send(rews);
    }
  );
});

app.post("/change-group-by-id", async (req, res) => {
  connection.query(
    `UPDATE "groups" 
    SET title = '${req.body.title}',description='${
      req.body.description
    }',workout='${JSON.stringify(req.body.workout)}',packages='${JSON.stringify(
      req.body.packages
    )}' 
      WHERE id = ${req.body.id};`
  );
});

app.post("/admin-login", (req, res) => {
  connection.query(`SELECT * FROM auth`, (err, rews) => {
    if (
      req.body.login === rews[0].login &&
      req.body.password === rews[0].password
    ) {
      return res.send(true);
    }
    res.send(false);
  });
});
app.post("/api/free-curs", (req, res) => {
  const htmlBody = ` 
 Curs Name:${req.body.cursName}   
 Client Name:${req.body.name}   
 Client Phone:${req.body.phone} 
 Client Email:${req.body.email}   
  ${req.body.age} 
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "simakey.klara@gmail.com",
      pass: "fapoqkvdqbgwaipv",
    },
  });

  const mailOptions = {
    from: "simakey.klara@gmail.com",
    to: "simakeyusa@gmail.com",
    subject: "simakey",
    text: htmlBody,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send");
    }
    res.end();
  });
});

app.post("/api/new-payment", (req, res) => {
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
  <p>${
    req.body.workout === "2 workout on week"
      ? req.body.times[0].time +
        " , " +
        req.body.times[0].day +
        "<br/>" +
        req.body.times[2].time +
        " , " +
        req.body.times[2].day
      : req.body.times[0].time +
        " - " +
        req.body.times[0].day +
        "<br/>" +
        req.body.times[1].time +
        " - " +
        req.body.times[1].day +
        "<br/>" +
        req.body.times[2].time +
        " - " +
        req.body.times[2].day
  }</p> 
  </div>`;
  var mailOptions = {
    from: "Simakey.klara@gmail.com",
    to: "simakeyusa@gmail.com",
    subject: "New peyment client",
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: test mail");
    }
    res.end();
  });
});

const port = 9000;

app.listen(port, (error) => {
  if (error) throw error;
});
