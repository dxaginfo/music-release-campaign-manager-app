const Campaign = require('../models/Campaign');
const mongoose = require('mongoose');

/**
 * Get all campaigns
 * @route GET /api/campaigns
 */
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id })
      .populate('artist', 'name')
      .sort({ createdAt: -1 });
    
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a campaign by ID
 * @route GET /api/campaigns/:id
 */
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('artist', 'name')
      .populate('tasks')
      .populate('assets')
      .populate('team', 'name email');
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is allowed to access this campaign
    if (campaign.createdBy.toString() !== req.user.id && 
        !campaign.team.some(member => member._id.toString() === req.user.id)) {
      return res.status(403).json({ message: 'Not authorized to access this campaign' });
    }
    
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid campaign ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new campaign
 * @route POST /api/campaigns
 */
exports.createCampaign = async (req, res) => {
  try {
    const { 
      title, 
      artist, 
      releaseType, 
      releaseDate, 
      status, 
      platforms, 
      team 
    } = req.body;
    
    // Validate required fields
    if (!title || !artist || !releaseType || !releaseDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Create new campaign
    const newCampaign = new Campaign({
      title,
      artist,
      releaseType,
      releaseDate,
      status: status || 'planning',
      platforms: platforms || [],
      team: team || [],
      createdBy: req.user.id
    });
    
    const savedCampaign = await newCampaign.save();
    
    // Return the created campaign with populated fields
    const populatedCampaign = await Campaign.findById(savedCampaign._id)
      .populate('artist', 'name')
      .populate('team', 'name email');
    
    res.status(201).json(populatedCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a campaign
 * @route PUT /api/campaigns/:id
 */
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to update
    if (campaign.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this campaign' });
    }
    
    // Update fields
    const { 
      title, 
      artist, 
      releaseType, 
      releaseDate, 
      status, 
      platforms, 
      team 
    } = req.body;
    
    if (title) campaign.title = title;
    if (artist) campaign.artist = artist;
    if (releaseType) campaign.releaseType = releaseType;
    if (releaseDate) campaign.releaseDate = releaseDate;
    if (status) campaign.status = status;
    if (platforms) campaign.platforms = platforms;
    if (team) campaign.team = team;
    
    const updatedCampaign = await campaign.save();
    
    // Return the updated campaign with populated fields
    const populatedCampaign = await Campaign.findById(updatedCampaign._id)
      .populate('artist', 'name')
      .populate('team', 'name email');
    
    res.json(populatedCampaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid campaign ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a campaign
 * @route DELETE /api/campaigns/:id
 */
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is authorized to delete
    if (campaign.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this campaign' });
    }
    
    await campaign.remove();
    
    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid campaign ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};