const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  complaintID: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  severity: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const complaintDB = mongoose.createConnection('mongodb://localhost:27017/complaints', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Complaint = complaintDB.model('Complaint', ComplaintSchema);

module.exports = Complaint;
