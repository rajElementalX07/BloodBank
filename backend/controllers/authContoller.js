import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/farmerModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";



//farmer

export const farmerRegister = catchAsyncError(async (req, res, next) => {

  // const { firstname,lastname,email, role, contactNumber, address,
  //   bloodGroup, age, gender, lastDonation, availability, medicalHistory,
  //   requiredBloodGroup, urgency, units, location, requestDetails } = req.body;
  const farmerExists = await Farmer.findOne({ email: req.body.email });
  if (farmerExists) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  req.body.password = hashedPassword;

  const newfarmer = new Farmer(req.body);

  const token = jwt.sign({ id: newfarmer._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const savedfarmer = await newfarmer.save();

  res.status(200).send({
    message: "User account created successfully",
    success: true,
    token: token,
    user: savedfarmer,
  });
});

export const farmerLogin = catchAsyncError(async (req, res, next) => {
  const farmer = await Farmer.findOne({ email: req.body.email });

  if (!farmer) {
    return next(new ErrorHandler("User does not exist", 404));
  }

  const isMatch = bcrypt.compareSync(req.body.password, farmer.password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = jwt.sign({ id: farmer._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).send({
    message: "Login successful",
    success: true,
    token: token,
    user: farmer,
  });
});

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

