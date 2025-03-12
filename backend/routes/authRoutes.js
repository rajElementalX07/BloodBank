import { Router } from "express";
const router = Router();

import { farmerRegister, farmerLogin,getAllDonors,getDonorById,getAllReceivers,getReceiverById } from "../controllers/authContoller.js";


//-------------------Registration-------------------------

router.post("/farmer-register", farmerRegister);


//---------------------Login--------------------------

router.post("/farmer-login", farmerLogin);

router.get('/donors',getAllDonors);

// Get donor by ID (protected route)
router.get('/donor/:id', getDonorById);

// Protected route: Get all receivers
router.get('/receivers',getAllReceivers);

// Protected route: Get receiver by ID
router.get('/receiver/:id',getReceiverById);


export default router;
