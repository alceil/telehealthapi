const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);



let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ashishshajisrampickal@gmail.com',
    pass: 'watchdogs'
  }
});

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Nodemailer",
    link: "http://localhost:3000/",
  },
});

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

const smsMessage = (req,res)=>{
  const {name, DocName,MobNo,Time,date} = req.body;
  client.messages.create({
  from:"+12058437068",
  to: MobNo,
  body: "Hello " + name +" you have an appointment booked with "+ DocName +" on " + date + " at " + Time +"."
}).then((message) =>{ 
  console.log(message.sid);
  res.json({ msg: "you should receive an email from us" });
});
}


const smsOtp = (req,res)=>{
  const MobNo = req.params.MobNo;
  const OTP = Math.floor(1000 + Math.random() * 9000);
  client.messages.create({
  from:"+12058437068",
  to: MobNo,
  body: "Your TeleHealth OTP code is " + OTP + "."
}).then((message) =>{ 
  console.log(message.sid);
  res.json({ OTP: OTP });
});
}




// const firebasenotif = (req, res)=>{
//   const  registrationToken = req.body.registrationToken
//   const message = req.body.message
//   const options =  notification_options
  
//     admin.messaging().sendToDevice(registrationToken, message, options)
//     .then( response => {

//      res.status(200).send("Notification sent successfully")
     
//     })
//     .catch( error => {
//         console.log(error);
//     });
// }

const signup = (req, res) => {
  const { userEmail, name } = req.body;

  // sign up the user .....

  // then send the email
  let response = {
    body: {
      name,
      intro: "Welcome to Nodemailer! We're very excited to have you on board.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "ashishshajisrampickal@gmail.com",
    to: userEmail,
    subject: "signup successful",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

const getBill = (req, res) => {
  const { name, userEmail } = req.body;

  let response = {
    body: {
      name,
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "MERN stack book",
            description: "A mern stack book",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business with you",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "transaction",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .json({ msg: "you should receive an email from us" });
    })
    .catch((error) => console.error(error));
};

module.exports = {
  signup,
  getBill,
  smsMessage,
  smsOtp
};