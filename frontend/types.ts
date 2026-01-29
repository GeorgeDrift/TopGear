
export enum UserRole {
  CLIENT = 'CLIENT',
  AGENT = 'AGENT',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  SALESMAN = 'SALESMAN',
  RENTAL_PROVIDER = 'RENTAL_PROVIDER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  dealershipName?: string;
  dealershipId?: string;
  isSubscriptionActive?: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  listingsManaged: number;
  lastActive: string;
}

export enum VehicleType {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  TRUCK = 'Truck',
  LUXURY = 'Luxury',
  VAN = 'Van',
  MOTORBIKE = 'Motorbike',
}

export enum ListingCategory {
  SALE = 'For Sale',
  RENTAL = 'For Rent',
}

export enum VehicleStatus {
  AVAILABLE = 'Available',
  SOLD = 'Sold',
  ARCHIVED = 'Archived',
  RENTED = 'Rented',
}

export interface Lead {
  id: string;
  userName: string;
  vehicleTitle: string;
  timestamp: number;
  type: 'WhatsApp' | 'Call';
}

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  description: string;
  price: string;
  location: string;
  mileage: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  type: VehicleType;
  category: ListingCategory;
  status: VehicleStatus;
  imageUrl: string;
  images?: string[]; 
  isSponsored?: boolean;
  isPublished?: boolean; // New property for marketplace status
  whatsapp?: string;
  phone?: string;
}
