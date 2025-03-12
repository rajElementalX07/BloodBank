import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    address: { type: String },
    role: { type: String, enum: ["donor", "receiver"], required: true },
    // Donor specific fields
    bloodGroup: { type: String },
    age: { type: Number },
    gender: { type: String },
    lastDonation: { type: Date },
    availability: { type: Boolean, default: true },
    medicalHistory: { type: String },
    // Receiver specific fields
    requiredBloodGroup: { type: String },
    urgency: { type: String },
    units: { type: Number },
    location: { type: String },
    requestDetails: { type: String },
  },
  {
    timestamps: true,
  }
);

const farmerModel = mongoose.model("User", farmerSchema);

export default farmerModel;
