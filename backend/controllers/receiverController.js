import Farmer from '../models/farmerModel.js'

// Get all receivers
export const getAllReceivers = async (req, res) => {
  try {
    const receivers = await Farmer.find({ role: 'receiver' });
    res.json(receivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a receiver by ID
export const getReceiverById = async (req, res) => {
  try {
    const receiver = await Farmer.findById(req.params.id);
    if (!receiver || receiver.role !== 'receiver') {
      return res.status(404).json({ msg: 'Receiver not found' });
    }
    res.json(receiver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
