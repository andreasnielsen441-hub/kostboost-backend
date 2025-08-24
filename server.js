import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// SendGrid setup - API key skal sættes som environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'YOUR_API_KEY_HERE');

// PDF URLs - opdateret med Google Drive links
const PDF_URLS = {
  '5 nemme måltider under 30 min': 'https://drive.google.com/file/d/1jWulHYgBtsDEJRSUdgKHkxBF_QlSA31P/view?usp=drive_link',
  'Hold motivationen i gang': 'https://drive.google.com/file/d/1lOkhOheBlKs1aCHyVpTKDX7BRfj96nRR/view?usp=drive_link',
  '3 hjemmetræningsøvelser der virker': 'https://drive.google.com/file/d/1qmfdM02jSd8WWltfsZFm5f2TwF_niYvj/view?usp=drive_link'
};

// Endpoint for gratis ressourcer
app.post('/api/free-resource', async (req, res) => {
  try {
    const { name, email, resourceTitle } = req.body;
    
    if (!name || !email || !resourceTitle) {
      return res.status(400).json({ error: 'Manglende information' });
    }

    // Find PDF URL
    const pdfUrl = PDF_URLS[resourceTitle];
    if (!pdfUrl) {
      return res.status(400).json({ error: 'Ukendt ressource' });
    }

    // Email indhold
    const msg = {
      to: email,
      from: 'hej@kostboost.dk', // Skal være din verificerede email
      subject: `Din gratis ressource: ${resourceTitle}`,
      text: `Hej ${name},\n\nTak for din interesse i ${resourceTitle}!\n\nDu finder din gratis ressource vedhæftet til denne email.\n\nMed venlig hilsen\nKostBoost.dk`,
      html: `
        <h2>Hej ${name}!</h2>
        <p>Tak for din interesse i <strong>${resourceTitle}</strong>!</p>
        <p>Klik på linket nedenfor for at downloade din gratis ressource:</p>
        <br>
        <p><a href="${pdfUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Download ${resourceTitle}</a></p>
        <br>
        <p>Med venlig hilsen<br><strong>KostBoost.dk</strong></p>
      `
    };

    // Send email
    await sgMail.send(msg);
    
    console.log(`Email sendt til ${email} med ${resourceTitle} - PDF link: ${pdfUrl}`);
    res.json({ success: true, message: 'Email sendt!' });
    
  } catch (error) {
    console.error('Fejl ved afsendelse:', error);
    res.status(500).json({ error: 'Kunne ikke sende email' });
  }
});
// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'KostBoost Backend Server kører! 🚀',
    status: 'online',
    endpoints: {
      test: '/api/test',
      freeResource: '/api/free-resource'
    }
  });
});
// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server kører!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server kører på http://localhost:${PORT}`);
  console.log(`📧 SendGrid er klar til at sende emails`);
  console.log(`📚 PDF ressourcer tilgængelige:`);
  Object.keys(PDF_URLS).forEach(resource => {
    console.log(`   - ${resource}`);
  });
});
Fix port configuration for Render deployment
