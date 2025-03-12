import Farmer from '../models/farmerModel.js'

// Controller to get all donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Farmer.find({ role: 'donor' });
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Controller to get a single donor by ID
export const getDonorById = async (req, res) => {
  try {
    const donor = await Farmer.findById(req.params.id);
    if (!donor || donor.role !== 'donor') {
      return res.status(404).json({ msg: 'Donor not found' });
    }
    res.json(donor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
