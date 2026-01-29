const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const apiService = {
  // Auth endpoints
  async signup(data: any) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  // Vehicle endpoints
  async fetchVehicles(filters?: any) {
    const query = new URLSearchParams(filters || {});
    const response = await fetch(`${API_BASE_URL}/vehicles?${query}`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return response.json();
  },

  async fetchVehicleById(id: string) {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    return response.json();
  },

  async addVehicle(data: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to add vehicle');
    return response.json();
  },

  async updateVehicle(id: string, data: any, token: string) {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update vehicle');
    return response.json();
  },

  async deleteVehicle(id: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete vehicle');
    return response.json();
  }
};
