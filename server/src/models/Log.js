const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  startDate: {
    type: Date,
    // required: true,
  },
  endDate: {
    type: Date,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  dateVisited: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Log = new mongoose.model('Log', LogSchema);

module.exports = Log;
