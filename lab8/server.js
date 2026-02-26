const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, JS

// Mock user database (in a real app, use a database like MongoDB)
const users = [
    { username: 'admin', password: bcrypt.hashSync('password', 10) }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.json({ success: false, message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
    res.json({ success: true, token });
});

// Protected route example
app.get('/dashboard', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
    
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).send('Unauthorized');
        res.send('Welcome to the dashboard, ' + decoded.username);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});