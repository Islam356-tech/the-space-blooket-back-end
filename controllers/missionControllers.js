const Mission = require('../models/Mission');

// Create Mission
exports.createMission = async (req, res) => {
  try {
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Missions
exports.getMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Mission
exports.updateMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Mission
exports.deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Mission deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};