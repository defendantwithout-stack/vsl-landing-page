const express = require('express');
const { Resend } = require('resend');
const app = express();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

// --- THE WEBSITE CONTENT (Stored directly here to prevent "Not Found" errors) ---
const HTML_PAGE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exclusive Offer</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white font-sans antialiased flex flex-col items-center justify-center min-h-screen p-4">

    <h1 class="text-3xl md:text-5xl font-bold text-center mb-8 max-w-2xl leading-tight">
        How to Scale Without Burnout
    </h1>

    <div class="w-full max-w-3xl aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl mb-8 border border-gray-800">
        <iframe class="w-full h-full" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" title="VSL" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <div class="w-full max-w-md bg-gray-900 p-6 rounded-xl border border-gray-800">
        <p class="text-gray-400 text-center mb-4">Enter your details to get the free Start Pack.</p>
        <form id="optinForm" class="space-y-4">
            <input type="text" id="name" placeholder="First Name" required class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500">
            <input type="email" id="email" placeholder="Email Address" required class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500">
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                Send Me The Pack
            </button>
        </form>
        <p id="statusMessage" class="text-center text-sm mt-3 text-gray-400 hidden"></p>
    </div>

    <div class="mt-6">
        <a href="YOUR_CALENDLY_LINK" class="text-gray-400 hover:text-white underline underline-offset-4 transition">
            Or click here to book a call directly
        </a>
    </div>

    <script>
        document.getElementById('optinForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const msg = document.getElementById('statusMessage');
            
            btn.innerText = "Sending...";
            btn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            try {
                const res = await fetch('/api/send-pack', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email })
                });
                if (res.ok) {
                    msg.innerText = "Success! Check your inbox.";
                    msg.classList.remove('hidden');
                    btn.innerText = "Sent";
                } else {
                    msg.innerText = "Error. Please try again.";
                    msg.classList.remove('hidden');
                    btn.innerText = "Try Again";
                    btn.disabled = false;
                }
            } catch (err) {
                console.error(err);
                msg.innerText = "Error sending data.";
                msg.classList.remove('hidden');
                btn.innerText = "Try Again";
                btn.disabled = false;
            }
        });
    </script>
</body>
</html>
`;

// --- ROUTES ---

// 1. Serve the Website directly from memory
app.get('/', (req, res) => {
    res.send(HTML_PAGE);
});

// 2. Handle the Email Sending
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
