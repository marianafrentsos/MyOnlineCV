const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const sgMail = require("@sendgrid/mail");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static("assets"));
app.use(express.static("models"));

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.post("/email", (req, res) => {
  const { email, name, subject, text } = req.body;

  const msg = {
    to: process.env.MYEMAIL,
    from: email,
    name: name,
    subject: subject,
    text: text
  };
  console.log("data:", req.body);
  sgMail
    .send(msg)
    .then(() => res.json({ message: "email sent" }))
    .catch(err => res.status(500).json({ message: err.message }));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.listen(PORT, () => {
  console.log("server started");
});
