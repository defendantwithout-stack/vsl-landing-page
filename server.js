const express = require('express');
const { Resend } = require('resend');
const path = require('path');
const app = express();

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(express.static('public')); // Serves your HTML file

// The Email Sending Route
app.post('/api/send-pack', async (req, res) => {
  const { email, name } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Savr <send@fctoassets.com>', // I updated this to match your screenshot settings!
      to: [email],
      subject: 'Here is your Start Pack',
      html: `
        <h1>Hi ${name},</h1>
        <p>Thanks for requesting the start pack. Here is the link:</p>
        <p><a href="LINK_TO_YOUR_PDF_HERE">Download Start Pack</a></p>
        <br>
        <p>Best,<br>Savr</p>
      `
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
