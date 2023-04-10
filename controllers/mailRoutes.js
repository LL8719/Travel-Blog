const router = require('express').Router();
const nodemailer = require('nodemailer');

router.get('/share', (req, res) => {
  const { postTitle, postContent } = req.query;
  res.render('share', { title: postTitle, content: postContent });
});

router.post('/share-post', async (req, res) => {
  try {
    const { postTitle, postContent, userEmail } = req.body;

    // Send the email
    const mailOptions = {
      from: 'your_email_address',
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
