const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAPIs = () => {
  const getAllFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/foods`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch foods');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  };

  const deleteFood = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/foods/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete food');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  };

  return {
    getAllFoods,
    deleteFood,
  };
}; 