const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const circuitoService = {
  async getCircuitos(filters = {}) {
    try {
      const hasFilters = Object.keys(filters).length > 0;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (hasFilters) {
        requestOptions.body = JSON.stringify(filters);
      }
      const response = await fetch(`${BASE_URL}/circuitos`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching circuitos:', error);
      throw error;
    }
  },

  async getExtensiones(circuitoId) {
    try {
      const response = await fetch(`${BASE_URL}/extensiones/${circuitoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching extensiones:', error);
      throw error;
    }
  },

  
  async getCountryList(filters = {}) {
    try {
      const hasFilters = Object.keys(filters).length > 0;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (hasFilters) {
        requestOptions.body = JSON.stringify(filters);
      }
      const response = await fetch(`${BASE_URL}/ciudades/paises`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching country list:', error);
      throw error;
    }
  }


};
