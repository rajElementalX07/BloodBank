import { Router } from "express";
const router = Router();
// import {auth} from "../middlewares/authMiddleware"

// const donorController = require('../controllers/donorController');
import {getAllDonors,getDonorById} from '../controllers/donorController'

router.get('/', getAllDonors);

router.get('/:id', getDonorById);

export default router
