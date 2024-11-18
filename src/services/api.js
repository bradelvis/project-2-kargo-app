// services/api.js

const API_URL = 'https://project-2-kargo-app-2.onrender.com/cargo'; // Replace with your backend URL

// Fetch all cargo items
export const getCargo = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cargo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cargo data:', error);
    throw error;
  }
};

// Add a new cargo item
export const addCargo = async (cargo) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cargo),
    });
    if (!response.ok) {
      throw new Error('Failed to add cargo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding cargo:', error);
    throw error;
  }
};

// Delete cargo item by ID
export const deleteCargo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete cargo');
    }
  } catch (error) {
    console.error('Error deleting cargo:', error);
    throw error;
  }
};

// Update cargo item by ID
export const updateCargo = async (id, updatedCargo) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCargo),
    });
    if (!response.ok) {
      throw new Error('Failed to update cargo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating cargo:', error);
    throw error;
  }
};

// Search for cargo by name or status
export const searchCargo = async (query) => {
  try {
    const response = await fetch(`${API_URL}?search=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search cargo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching cargo:', error);
    throw error;
  }
};
