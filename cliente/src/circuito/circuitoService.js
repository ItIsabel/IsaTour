const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8080';

export const circuitoService = {
  async getCircuitos(filters = {}) {
    try {
      const response = await fetch(`${BASE_URL}/circuitos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });
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

  async getCountryList(filters = {}) {
    try {
      const tours = await this.getCircuitos(filters);
      const countries = [...new Set(tours.map(tour => tour.nombrePais))].filter(Boolean);
      return countries;
    } catch (error) {
      console.error('Error fetching country list:', error);
      throw error;
    }
  },

  async getCircuitosOperador(touroperador, token) {
    try {
      const response = await fetch(`${BASE_URL}/circuitos/${touroperador}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching circuitos operador:', error);
      throw error;
    }
  },

  async deleteCircuito(touroperador, circuitoId, token) {
    try {
      const response = await fetch(`${BASE_URL}/circuitos/${touroperador}/${circuitoId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting circuito:', error);
      throw error;
    }
  },

  async getCiudadesByCircuito(touroperador, circuitoId, token) {
    try {
      const response = await fetch(`${BASE_URL}/ciudades/${touroperador}/${circuitoId}/ciudades`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ciudades by circuito:', error);
      throw error;
    }
  },

  async getMesesByCircuito(circuitoId, token) {
    try {
      const response = await fetch(`${BASE_URL}/meses/${circuitoId}/meses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching meses by circuito:', error);
      throw error;
    }
  },

  async createCircuito(touroperador, circuitoData, token) {
    const url = `${BASE_URL}/circuitos/${touroperador}`;
    console.log('BASE_URL:', BASE_URL);
    console.log('Full URL:', url);
    console.log('Creating circuito:', { touroperador, circuitoData });

    try {
      console.log('Making fetch request...');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(circuitoData)
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        throw new Error(`${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Circuito created successfully:', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  async updateCircuito(touroperador, circuitoId, circuitoData, token) {
    try {
      const response = await fetch(`${BASE_URL}/circuitos/${touroperador}/${circuitoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(circuitoData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating circuito:', error);
      throw error;
    }
  }
};
