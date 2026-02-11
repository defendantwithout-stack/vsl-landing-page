const express = require('express');
const { Resend } = require('resend');
const path = require('path');
const app = express();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

// --- THE FIX ---
// This tells the server: "Look for the website files right here in the main folder"
app.use(express.static(__dirname)); 
app.use(express.static('public')); // Checks public folder too, just in case

// Force the server to show index.html when you visit the home page
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (err) {
        res.send("Error: Could not find index.html. Did you name the file exactly 'index.html'?");
    }
});
// ----------------

app.post('/api/send-pack', async (req, res) => {
  const { email, name } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Savr <send@fctoassets.com>',
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
