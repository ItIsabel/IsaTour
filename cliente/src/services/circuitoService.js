const BASE_URL = 'http://localhost:8080';

export const circuitoService = {
  async getCircuitos() {
    try {
      const response = await fetch(`${BASE_URL}/circuitos`);
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
  }
};
