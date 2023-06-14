const router = require('express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Retrieve email address and password from environment variables
const emailAddress = process.env.EMAIL_ADDRESS;
const emailPassword = process.env.EMAIL_PASSWORD;

// Create a transporter object using a Gmail account
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: emailAddress,
    pass: emailPassword,
  },
});
// Allows the user to share a post by generating a URL that includes the post's title and content, which can be copied and shared with others.
router.get('/share', (req, res) => {
  const { postTitle, postContent } = req.query;
  res.render('share', { title: postTitle, content: postContent });
});
// extracts the values of 'postTitle', 'postContent', and 'userEmail' from the request's body to construct an email using "Nodemailer"
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
    // The sendMail() method is an asynchronous function that sends an email and returns a Promise that resolves to an object containing information about the sent email.
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.response}`);

    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
