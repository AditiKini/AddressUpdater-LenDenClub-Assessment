import express from 'express';
import { userSignup, userLogin} from '../controller/usercontroller.js';
import {addressStore, getAllAddresses, getAddressById, updateAddress, deleteAddress} from '../controller/addresscontroller.js';

const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/entries',addressStore);
router.get('/addresses', getAllAddresses);
router.get('/entries/:id', getAddressById);
router.put('/entries/:id', updateAddress);
router.delete('/entries/:id', deleteAddress);
export default router;
