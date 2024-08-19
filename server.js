const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Setup multer for file uploads
const upload = multer({
  dest: 'uploads/', // Directory where uploaded files will be stored
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
});

// Connect to MongoDB for Users and Admins
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });
const userDB = mongoose.connection;

// Connect to MongoDB for Complaints
const complaintDB = mongoose.createConnection('mongodb://localhost:27017/complaints', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB for Worker Details
const workerDB = mongoose.createConnection('mongodb://localhost:27017/workerDetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connect to MongoDB for Admin Details
const adminDB = mongoose.createConnection('mongodb://localhost:27017/admindetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handle connection errors
userDB.on('error', console.error.bind(console, 'User DB connection error:'));
userDB.once('open', () => { console.log('Connected to User DB'); });
complaintDB.on('error', console.error.bind(console, 'Complaint DB connection error:'));
complaintDB.once('open', () => { console.log('Connected to Complaint DB'); });
workerDB.on('error', console.error.bind(console, 'Worker DB connection error:'));
workerDB.once('open', () => { console.log('Connected to Worker DB'); });
adminDB.on('error', console.error.bind(console, 'Admin DB connection error:'));
adminDB.once('open', () => { console.log('Connected to Admin DB'); });

// Define User and Admin schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  locality: String // Added locality field
});

// Define Worker schema
const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  designation: String,
  domain: String,
  photoUrl: String,
  proofUrl: String,
});

// Define Complaint schema
const ComplaintSchema = new mongoose.Schema({
  complaintID: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  severity: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  userEmail: { type: String }, // User email
  photo: { type: String } // Path to the photo
});

// Create models
const User = userDB.model('User', UserSchema);
const Admin = adminDB.model('Admin', AdminSchema); // Using adminDB for admin data
const Worker = workerDB.model('Worker', workerSchema); // Using workerDB for worker data
const Complaint = complaintDB.model('Complaint', ComplaintSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.json({ token, userEmail: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Admin Registration
app.post('/admin/register', async (req, res) => {
  try {
    const { name, email, password, locality } = req.body;

    if (!name || !email || !password || !locality) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashedPassword, locality });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Error registering admin', error: error.message });
  }
});

// Admin Login
app.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.json({ token, adminEmail: admin.email });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Register Complaint
app.post('/register-complaint', verifyToken, upload.single('photo'), async (req, res) => {
  const { type, description, severity } = req.body;
  const photo = req.file ? req.file.path : null;
  const userID = req.userId; // Use the userID from JWT

  try {
    // Fetch user email
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate a unique complaint ID
    const complaintID = new mongoose.Types.ObjectId().toString();

    // Create a new complaint object
    const newComplaint = new Complaint({
      complaintID,
      type,
      description,
      severity,
      status: 'Pending',
      userID,
      userEmail: user.email, // Include the user's email
      photo
    });

    // Save the new complaint to the complaints database
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint registered successfully', complaint: newComplaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Complaints Specific to the Logged-In User
app.get('/complaints', verifyToken, async (req, res) => {
    try {
      const userId = req.userId; // Get the userId from the JWT token
      const complaints = await Complaint.find({ userID: userId });
      res.json(complaints);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
  });
  

// Update Complaint Status
app.put('/update-complaint/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Error updating complaint', error: error.message });
  }
});

// Register Worker
app.post('/register-worker', upload.fields([{ name: 'photo' }, { name: 'proof' }]), async (req, res) => {
  const { name, phone, email, designation, domain } = req.body;
  const photo = req.files['photo'] ? req.files['photo'][0].path : null;
  const proof = req.files['proof'] ? req.files['proof'][0].path : null;

  try {
    const newWorker = new Worker({
      name,
      phone,
      email,
      photoUrl: photo,
      proofUrl: proof,
      designation,
      domain,
    });
    await newWorker.save();
    res.status(201).json({ message: 'Worker details saved successfully', worker: newWorker });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Fetch All Workers
app.get('/workers', async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workers', error: error.message });
  }
});

// Delete File from Disk
const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting file: ${err}`);
  });
};

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
