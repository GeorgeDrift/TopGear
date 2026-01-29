
import * as vehicleService from '../services/vehicleService';

export const getAllVehicles = async (req: any, res: any) => {
  const filters = req.query;
  const vehicles = await vehicleService.fetchVehicles(filters);
  res.status(200).json(vehicles);
};

export const getVehicleById = async (req: any, res: any) => {
  const vehicle = await vehicleService.fetchVehicleById(req.params.id);
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
  res.status(200).json(vehicle);
};

export const createVehicle = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const vehicle = await vehicleService.addVehicle(req.body, userId);
    res.status(201).json(vehicle);
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const updateVehicleStatus = async (req: any, res: any) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await vehicleService.changeStatus(id, status);
  res.status(200).json(updated);
};

export const deleteVehicle = async (req: any, res: any) => {
  await vehicleService.removeVehicle(req.params.id);
  res.status(204).send();
};
