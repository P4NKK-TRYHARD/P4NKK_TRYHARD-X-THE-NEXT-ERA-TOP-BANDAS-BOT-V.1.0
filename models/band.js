// En un archivo llamado Band.js
const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: String,
  points: { type: Number, default: 0 }
});

module.exports = mongoose.model('Band', bandSchema);
