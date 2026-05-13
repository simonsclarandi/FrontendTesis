import { fetchApi } from '../api/apiClient'; 

export const inventarioService = {
  // GET: Traer todo
  getAll: async () => {
    return await fetchApi('/inventario/inventarios');
  },
  
  // GET: Traer uno
  getById: async (id) => {
    return await fetchApi(`/inventario/inventarios/${id}`);
  },

  // GET: Traer la lista de Modelos (iPhone 11, Moto G84, etc.)
  getModelos: async () => {
    return await fetchApi('/inventario/modelo-articulos');
  },

  // POST: Crear un nuevo Artículo (Características físicas, precios, etc.)
  createArticulo: async (data) => {
    return await fetchApi('/inventario/articulos', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // POST: Crear nuevo Inventario (Stock) - ESTE YA LO TENÍAS
  create: async (data) => {
    return await fetchApi('/inventario/inventarios', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // POST: Crear nuevo
  create: async (data) => {
    return await fetchApi('/inventario/inventarios', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT: Actualizar
  update: async (id, data) => {
    return await fetchApi(`/inventario/inventarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // DELETE: Borrar
  delete: async (id) => {
    return await fetchApi(`/inventario/inventarios/${id}`, {
      method: 'DELETE'
    });
  },

  getColores: async () => {
    return await fetchApi('/inventario/colores');
  },
  
  getMemorias: async () => {
    return await fetchApi('/inventario/memorias');
  },

  getSucursales: async () => {
    return await fetchApi('/usuarios/sucursales');
  },

  getProveedores: async () => {
    return await fetchApi('/compras/proveedores');
  }
};