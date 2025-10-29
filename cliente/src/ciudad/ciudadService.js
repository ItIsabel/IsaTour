const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8080';

export const ciudadService = {
  async getCiudades() {
    try {
      const response = await fetch(`${BASE_URL}/ciudades`); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ciudades:', error);
      throw error;
    }
  },


};
