const jwt = require('jsonwebtoken');

// Dummy user for testing (replace with database logic)
const users = [{ email: 'admin', password: 'password123' }];
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Find user (replace with database logic)
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
};
