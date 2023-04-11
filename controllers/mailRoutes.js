const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Retrieve email address and password from environment variables
const emailAddress = process.env.EMAIL_ADDRESS;
const emailPassword = process.env.EMAIL_PASSWORD;

// Create a transporter object using a Gmail account
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: emailAddress,
    pass: emailPassword,
  },
});

router.get('/share', (req, res) => {
  const { postTitle, postContent } = req.query;
  res.render('share', { title: postTitle, content: postContent });
});

router.post('/share-post', async (req, res) => {
  try {
    const { postTitle, postContent, userEmail } = req.body;

    // Send the email
    const mailOptions = {
      from: emailAddress,
      to: userEmail,
      subject: `Check out this post: ${postTitle}`,
      text: postContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
