const express = require('express');
const app = express();

// Home Route
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Welcome to My Node.js Server on AWS EC2!</h1>
        <p>This server is powered by <strong>Node.js</strong> and running on an <strong>Amazon EC2</strong> instance.</p>
        <p>It's configured with <strong>Express.js</strong> for handling web requests efficiently.</p>
        <p>💡 You can add more features like a database connection, authentication, or an API.</p>
        <p>📌 Try accessing <a href="/api/info">/api/info</a> for a JSON response.</p>
        <hr>
        <p>✅ Server Time: ${new Date().toLocaleString()}</p>
        <p>🌍 Your IP Address: ${req.ip}</p>
    `);
});

// Info Route
app.get('/api/info', (req, res) => {
    res.json({
        message: "Welcome to the API",
        server_time: new Date().toISOString(),
        status: "Running smoothly 🚀"
    });
});

// Start Server
app.listen(3000, '0.0.0.0', () => {
    console.log('✅ Server is running on http://your-ec2-public-ip:3000');
});
