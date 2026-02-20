const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB Vro!"))
    .catch((err) => console.log("❌ DB Connection Error:", err));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchlist: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);

// --- MIDDLEWARE TO PROTECT ROUTES ---
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { email: user.email, id: user._id, watchlist: user.watchlist }
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// --- WATCHLIST ROUTES (NEW) ---

// 1. Get user watchlist
app.get('/api/user/watchlist', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ message: "Error fetching watchlist" });
    }
});

// 2. Add/Remove from watchlist
app.post('/api/user/watchlist', verifyToken, async (req, res) => {
    try {
        const { movie } = req.body;
        const user = await User.findById(req.user.id);
        
        const isMovieAdded = user.watchlist.find(m => m.id === movie.id);
        
        if (isMovieAdded) {
            // Remove movie
            user.watchlist = user.watchlist.filter(m => m.id !== movie.id);
        } else {
            // Add movie
            user.watchlist.push(movie);
        }

        await user.save();
        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ message: "Error updating watchlist" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server spinning on port ${PORT}`));