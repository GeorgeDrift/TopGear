
import { Router } from 'express';
import * as vehicleController from '../controllers/vehicleController';
import { authenticate, authorize } from '../middleware/auth';
import { UserRole } from '../../types';

const router = Router();

router.get('/', vehicleController.getAllVehicles);
router.get('/:id', vehicleController.getVehicleById);

router.post('/', 
  authenticate, 
  authorize([UserRole.SELLER, UserRole.SALESMAN, UserRole.RENTAL_PROVIDER]), 
  vehicleController.createVehicle
);

router.put('/:id/status', 
  authenticate, 
  authorize([UserRole.SELLER, UserRole.SALESMAN]), 
  vehicleController.updateVehicleStatus
);

router.delete('/:id', 
  authenticate, 
  authorize([UserRole.SELLER, UserRole.ADMIN]), 
  vehicleController.deleteVehicle
);

export default router;
