
import { Vehicle, VehicleStatus } from '../../types';
import { mockDb } from '../data/store';

export const fetchVehicles = async (filters: any) => {
  let list = mockDb.vehicles;
  if (filters.category) list = list.filter(v => v.category === filters.category);
  if (filters.type) list = list.filter(v => v.type === filters.type);
  return list.filter(v => v.status === VehicleStatus.AVAILABLE);
};

export const fetchVehicleById = async (id: string) => {
  return mockDb.vehicles.find(v => v.id === id);
};

export const addVehicle = async (data: any, ownerId: string) => {
  const owner = mockDb.users.find(u => u.id === ownerId);
  
  if (owner && !owner.isSubscriptionActive) {
    throw new Error('Subscription required to post listings');
  }

  const newVehicle: Vehicle = {
    ...data,
    id: `v-${Date.now()}`,
    status: VehicleStatus.AVAILABLE,
    isSponsored: false
  };

  mockDb.vehicles.push(newVehicle);
  return newVehicle;
};

export const changeStatus = async (id: string, status: VehicleStatus) => {
  const idx = mockDb.vehicles.findIndex(v => v.id === id);
  if (idx !== -1) {
    mockDb.vehicles[idx].status = status;
    return mockDb.vehicles[idx];
  }
  return null;
};

export const removeVehicle = async (id: string) => {
  mockDb.vehicles = mockDb.vehicles.filter(v => v.id !== id);
};
