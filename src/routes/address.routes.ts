import { Router } from 'express';
import { 
  getAddressByUserId, 
  createAddress, 
  updateAddress 
} from '../controllers/address.controller';
import { 
  addressValidation, 
  userIdParamValidation, 
  validateRequest 
} from '../middleware/validation.middleware';

const router = Router();

router.get('/:userId', validateRequest, getAddressByUserId);
router.post('/', addressValidation, validateRequest, createAddress);
router.patch('/:userId', validateRequest, updateAddress);

export default router;
