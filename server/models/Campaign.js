const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  releaseType: {
    type: String,
    enum: ['single', 'ep', 'album'],
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'active', 'completed'],
    default: 'planning'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  assets: [{
    type: Schema.Types.ObjectId,
    ref: 'Asset'
  }],
  team: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  platforms: [{
    type: String
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
CampaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Campaign', CampaignSchema);