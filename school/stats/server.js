// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let totalPageViews = 0;
let liveViewers = 0;

// Middleware to log page views
app.use((req, res, next) => {
    totalPageViews++;
    console.log('Page View:', totalPageViews);
    next();
});

// WebSocket connection to track live viewers
io.on('connection', (socket) => {
    liveViewers++;
    console.log('New Viewer. Total Live Viewers:', liveViewers);

    // Decrease live viewers count when a user disconnects
    socket.on('disconnect', () => {
        liveViewers--;
        console.log('Viewer Disconnected. Total Live Viewers:', liveViewers);
    });
});

// Endpoint to get total page views
app.get('/pageviews', (req, res) => {
    res.json({ totalPageViews });
});

// Endpoint to get live viewers count
app.get('/liveviewers', (req, res) => {
    res.json({ liveViewers });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
