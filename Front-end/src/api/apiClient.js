// src/api/apiClient.js
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Si la respuesta no es OK, leemos el error exacto que manda el backend
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("🔥 Error desde el Backend:", errorData); // <--- ESTO NOS DARÁ LA PISTA
      throw new Error(`Error HTTP: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la petición a la API:", error);
    throw error;
  }
};