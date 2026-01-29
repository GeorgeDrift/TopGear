import { Vehicle, VehicleType, ListingCategory, VehicleStatus } from '../types';

export const generateVehicles = async (): Promise<Vehicle[]> => {
  try {
    const mockVehicles: Vehicle[] = [
      {
        id: 'feat-001',
        title: 'Nissan Magnite Turbo',
        brand: 'Nissan',
        model: 'Magnite',
        year: 2024,
        price: 'MWK 32,000,000',
        mileage: '0 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Compact SUV perfection. The all-new Nissan Magnite with turbo performance and premium features.',
        imageUrl: '/assets/magnite.jpg',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: ['/assets/magnite.jpg']
      },
      {
        id: 'feat-002',
        title: 'Bentley Flying Spur V8',
        brand: 'Bentley',
        model: 'Flying Spur',
        year: 2023,
        price: 'MWK 420,000,000',
        mileage: '0 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'The definitive luxury sedan. Unrivalled performance and handcrafted luxury in every detail.',
        imageUrl: '/assets/bentley.jpg',
        type: VehicleType.LUXURY,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: ['/assets/bentley.jpg']
      },
      {
        id: 'feat-003',
        title: 'Range Rover SV',
        brand: 'Land Rover',
        model: 'Range Rover',
        year: 2024,
        price: 'MWK 350,000,000',
        mileage: '0 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        description: 'The world\'s most desirable SUV. New Range Rover SV with executive seating and bespoke finishes.',
        imageUrl: '/assets/rangerover1.jpg',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: ['/assets/rangerover1.jpg']
      },
      {
        id: 'feat-004',
        title: 'Range Rover Vogue L405',
        brand: 'Land Rover',
        model: 'Range Rover',
        year: 2022,
        price: 'MWK 180,000,000',
        mileage: '15,000 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        description: 'Prestige and capability. Well-maintained Range Rover Vogue with full service history.',
        imageUrl: '/assets/rangerover2.jpg',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: ['/assets/rangerover2.jpg']
      },
      {
        id: 'feat-005',
        title: 'BMW 3 Series Gran Turismo',
        brand: 'BMW',
        model: '3 Series GT',
        year: 2021,
        price: 'MWK 45,000,000',
        mileage: '35,000 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Sporty versatility. BMW 3 Series GT in Estoril Blue with M Sport package and panoramic roof.',
        imageUrl: '/assets/bmwgt.jpg',
        type: VehicleType.SEDAN,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: ['/assets/bmwgt.jpg']
      },
      {
        id: 'tg-001',
        title: 'Toyota Land Cruiser 300 VXR',
        brand: 'Toyota',
        model: 'Land Cruiser',
        year: 2024,
        price: 'MWK 185,000,000',
        mileage: '0 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Diesel',
        description: 'The ultimate luxury off-roader. Brand new Toyota Land Cruiser 300 VXR with full specs, JBL sound system, and ceramic coating.',
        imageUrl: 'https://images.unsplash.com/photo-1621932953912-0b6d8ba2159e?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1621932953912-0b6d8ba2159e?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1594976612710-d492476b701d?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1621243450917-7a7407ca4827?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-002',
        title: 'Range Rover Autobiography LWB',
        brand: 'Land Rover',
        model: 'Range Rover',
        year: 2023,
        price: 'MWK 250,000,000',
        mileage: '1,200 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Executive mobility at its finest. Long wheel base Autobiography with executive rear seating and champagne cooler.',
        imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.LUXURY,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1606148316121-665e77b6706e?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-003',
        title: 'Mercedes-Benz G63 AMG',
        brand: 'Mercedes-Benz',
        model: 'G-Class',
        year: 2023,
        price: 'MWK 310,000,000',
        mileage: '2,500 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'The legendary G-Wagon in AMG G63 trim. Night package, 22-inch forged wheels, and red leather interior.',
        imageUrl: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.LUXURY,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-004',
        title: 'BMW X7 xDrive40i M-Sport',
        brand: 'BMW',
        model: 'X7',
        year: 2024,
        price: 'MWK 145,000,000',
        mileage: '0 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Luxury three-row SUV. The new facelift BMW X7 with curved display and sky lounge panoramic roof.',
        imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: true,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-005',
        title: 'Lexus LX 600 Ultra Luxury',
        brand: 'Lexus',
        model: 'LX',
        year: 2023,
        price: 'MWK 195,000,000',
        mileage: '5,000 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Refined performance and unmatched reliability. Four-seat Ultra Luxury configuration with rear massage seats.',
        imageUrl: '/assets/lexus_lx600.png',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: true,
        whatsapp: '265888000000',
        images: [
          '/assets/lexus_lx600.png'
        ]
      },
      {
        id: 'tg-006',
        title: 'Porsche 911 Turbo S',
        brand: 'Porsche',
        model: '911',
        year: 2024,
        price: 'MWK 380,000,000',
        mileage: '0 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'The pinnacle of sportscars. Porsche 911 Turbo S with aerodynamic upgrades and heritage interior.',
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.LUXURY,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-007',
        title: 'Audi RS Q8 Performance',
        brand: 'Audi',
        model: 'RS Q8',
        year: 2024,
        price: 'MWK 165,000,000',
        mileage: '0 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Super-SUV performance with daily usability. RS Q8 in Nardo Gray with carbon ceramics.',
        imageUrl: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-008',
        title: 'Cadillac Escalade-V',
        brand: 'Cadillac',
        model: 'Escalade',
        year: 2024,
        price: 'MWK 220,000,000',
        mileage: '500 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'Supercharged power in a full-size luxury SUV. Escalade-V with 682 HP and AKG Studio Reference system.',
        imageUrl: 'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-009',
        title: 'Lamborghini Urus Performante',
        brand: 'Lamborghini',
        model: 'Urus',
        year: 2024,
        price: 'MWK 450,000,000',
        mileage: '0 km',
        location: 'Blantyre, Malawi',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        description: 'The Super Sports Utility Vehicle. Urus Performante with carbon fiber hood and titanium exhaust.',
        imageUrl: 'https://images.unsplash.com/photo-1544636331-e268592033bc?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: false,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1544636331-e268592033bc?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1607603007221-47321990c047?auto=format&fit=crop&q=80&w=600'
        ]
      },
      {
        id: 'tg-012',
        title: 'Tesla Model X Plaid',
        brand: 'Tesla',
        model: 'Model X',
        year: 2024,
        price: 'MWK 135,000,000',
        mileage: '0 km',
        location: 'Lilongwe, Malawi',
        transmission: 'Automatic',
        fuelType: 'Electric',
        description: 'Beyond Ludicrous. Model X Plaid with falcon wing doors and three-motor powertrain.',
        imageUrl: 'https://images.unsplash.com/photo-1561580119-2a9e1710370b?auto=format&fit=crop&q=80&w=1200',
        type: VehicleType.SUV,
        category: ListingCategory.SALE,
        status: VehicleStatus.AVAILABLE,
        isSponsored: true,
        whatsapp: '265888000000',
        images: [
          'https://images.unsplash.com/photo-1561580119-2a9e1710370b?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600',
          'https://images.unsplash.com/photo-1617719113554-7043831804f3?auto=format&fit=crop&q=80&w=600'
        ]
      },
    ];

    return mockVehicles;
  } catch (error) {
    console.error('Error generating vehicles:', error);
    return [];
  }
};

export const generateVehicleDescription = async (vehicleData: any): Promise<string> => {
  try {
    // Mock description generation - replace with actual Gemini API call
    return `A well-maintained ${vehicleData.year} ${vehicleData.make} ${vehicleData.model} with ${vehicleData.mileage} km mileage. Features include ${vehicleData.transmission} transmission and ${vehicleData.fuelType} fuel type. Perfect for your transportation needs.`;
  } catch (error) {
    console.error('Error generating description:', error);
    return '';
  }
};
