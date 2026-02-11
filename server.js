const express = require('express');
const { Resend } = require('resend');
const app = express();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

// --- YOUR WEBSITE CONTENT ---
const HTML_PAGE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>High-Ticket Client Acquisition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    </style>
</head>
<body class="bg-black text-white font-sans antialiased flex flex-col items-center min-h-screen p-6">

    <div class="w-full max-w-4xl flex flex-col items-center mt-10">

        <h1 class="text-3xl md:text-5xl font-extrabold text-center mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Stop Relying on Referrals. <br class="hidden md:block" />
            Acquire High-Ticket Clients on Demand.
        </h1>

        <p class="text-lg md:text-xl text-gray-400 text-center mb-10 max-w-2xl">
            The exact visual framework for Fractional Experts to bypass HR filters and go straight to the decision-makers.
        </p>

        <div class="w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-10 border border-gray-800 relative">
            <iframe 
                class="w-full h-full" 
                src="https://www.youtube.com/embed/Oo4xEB5S2TM?rel=0&modestbranding=1&showinfo=0&controls=1" 
                title="VSL" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>

        <div class="w-full max-w-2xl bg-gray-900/50 p-8 rounded-2xl border border-gray-800 mb-10 backdrop-blur-sm">
            <h3 class="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">
                Why this works:
            </h3>
            <ul class="space-y-4">
                <li class="flex items-start">
                    <span class="text-green-400 mr-3 text-xl">✅</span>
                    <span class="text-gray-300"><strong class="text-white">Positions you as a Problem Solver:</strong> Stop being treated like a generic candidate.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-400 mr-3 text-xl">✅</span>
                    <span class="text-gray-300"><strong class="text-white">Translates Complexity into ROI:</strong> Make non-technical Founders understand your value instantly.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-400 mr-3 text-xl">✅</span>
                    <span class="text-gray-300"><strong class="text-white">The "Anti-Referral" System:</strong> Generate your own leads without waiting for your network.</span>
                </li>
                 <li class="flex items-start">
                    <span class="text-green-400 mr-3 text-xl">✅</span>
                    <span class="text-gray-300"><strong class="text-white">The 100x Asset:</strong> One video that powers your entire content strategy.</span>
                </li>
            </ul>
        </div>

        <div class="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl flex flex-col items-center">
            
            <p class="text-white font-medium text-center mb-4">
                Request your Custom Start Pack:
            </p>
            <form id="optinForm" class="w-full space-y-3">
                
                <input type="text" id="name" placeholder="First Name" required 
                    class="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors">
                
                <input type="email" id="email" placeholder="Email Address" required 
                    class="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors">
                
                <input type="url" id="linkedin" placeholder="LinkedIn Profile URL" required 
                    class="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors">

                <button type="submit" class="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 rounded-lg transition duration-200 uppercase tracking-wide">
                    Build My Start Pack
                </button>
            </form>
            <p id="statusMessage" class="text-center text-sm mt-3 text-green-400 hidden"></p>

            <div class="w-full flex items-center justify-between my-6">
                <div class="h-px bg-gray-700 w-full"></div>
                <span class="px-3 text-gray-500 text-sm">OR</span>
                <div class="h-px bg-gray-700 w-full"></div>
            </div>

            <a href="https://calendar.app.google/TnCvtMJDXzcZsz339" target="_blank" class="w-full text-center block px-4 py-3 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-white transition duration-200">
                Book a Strategy Call
            </a>
        </div>
        
        <div class="mt-12 mb-6 text-gray-600 text-sm">
            &copy; 2026 Savr Agency. All rights reserved.
        </div>

    </div>

    <script>
        document.getElementById('optinForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const msg = document.getElementById('statusMessage');
            
            btn.innerText = "Processing...";
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const linkedin = document.getElementById('linkedin').value;

            try {
                const res = await fetch('/api/request-pack', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, linkedin })
                });

                if (res.ok) {
                    msg.innerText = "Request received! I will build your pack and email you shortly.";
                    msg.classList.remove('hidden');
                    btn.innerText = "Request Sent ✅";
                    // Clear form so they don't submit twice
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('linkedin').value = '';
                } else {
                    throw new Error('Server returned error');
                }
            } catch (err) {
                console.error(err);
                msg.innerText = "Something went wrong. Please try again.";
                msg.classList.remove('text-green-400', 'hidden');
                msg.classList.add('text-red-400');
                btn.innerText = "Try Again";
                btn.disabled = false;
                btn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    </script>
</body>
</html>
`;

// --- BACKEND LOGIC ---

app.get('/', (req, res) => {
    res.send(HTML_PAGE);
});

app.post('/api/request-pack', async (req, res) => {
  const { email, name, linkedin } = req.body;

  try {
    // 1. Send Email to the LEAD (Confirmation)
    await resend.emails.send({
      from: 'Savr <send@fctoassets.com>',
      to: [email],
      subject: 'I received your request',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Hi ${name},</h1>
            <p>I've received your request for the Start Pack.</p>
            <p>Because I customize these protocols for each expert's specific niche, I build them manually. I am reviewing your LinkedIn profile now.</p>
            <p>Expect to receive your custom asset in your inbox within 24 hours.</p>
            <br>
            <p>Best,<br>Savr</p>
        </div>
      `
    });

    // 2. Send Email to YOU (Notification)
    // ⚠️ CHANGE THIS EMAIL BELOW TO YOUR ACTUAL EMAIL ⚠️
    await resend.emails.send({
      from: 'Savr System <send@fctoassets.com>',
      to: ['YOUR_PERSONAL_EMAIL@gmail.com'], 
      subject: `🚨 NEW LEAD: ${name}`,
      html: `
        <h1>New Lead Generated</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>
        <br>
        <p><em>Go build their pack and send it to them!</em></p>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
