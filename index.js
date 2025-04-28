const express = require('express');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet'); // Import helmet
const app = express();
const port = 3000;

// Define an array of valid API keys (replace with secure storage in production)
const validApiKeys = ['your-first-api-key', 'another-valid-key', 'YOUR_ACTUAL_API_KEY'];

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});

// CORS Configuration
const corsOptions = {
  origin: '*', // Adjust as needed for production (e.g., ['http://localhost:8080', 'https://your-frontend-domain.com'])
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Apply Rate Limiter middleware
app.use(limiter);

// Apply helmet middleware for security headers (including a basic CSP)
app.use(helmet());

// Custom Content Security Policy (more specific)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://trusted-cdn.com'], // Adjust as needed
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      connectSrc: ["'self'", 'ws://localhost:3000'], // Adjust for your needs
      frameSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Strict-Transport-Security (HSTS) - Ensure you have HTTPS configured!
app.use(
  helmet.hsts({
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: false,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// API Key Authentication Middleware
const isValidApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res.status(403).json({ error: 'Forbidden - Invalid API Key' });
  }
  next();
};

// Basic API Route (No API Key Required)
app.get('/api/data', (req, res) => {
  res.json({ message: 'API response (public)' });
});

// Test Route (Requires API Key)
app.get('/api/secure-data', isValidApiKey, (req, res) => {
  res.json({ message: 'This is a secure API response (protected)' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
