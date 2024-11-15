// services/api.js

const API_URL = 'http://localhost:5000/cargo';

// Fetch all cargo items
export const getCargo = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cargo');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cargo data:', error);
    throw error;
  }
};

// Add a new cargo
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
    return response.json();
  } catch (error) {
    console.error('Error adding cargo:', error);
    throw error;
  }
};

// Delete cargo by ID
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

// Update an existing cargo
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
    return response.json();
  } catch (error) {
    console.error('Error updating cargo:', error);
    throw error;
  }
};
