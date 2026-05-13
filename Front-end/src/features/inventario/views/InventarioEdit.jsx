import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack, Edit as EditIcon } from '@mui/icons-material';
import InventarioForm from '../components/InventarioForm';
import { inventarioService } from "../../../services/inventarioServices";

const InventarioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // CARGAR DATOS REALES DE LA API
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const productoReal = await inventarioService.getById(id);
        setData(productoReal);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      }
    };
    
    cargarProducto();
  }, [id]);

  // ENVIAR CAMBIOS A LA API
  const handleSubmit = async (formData) => {
    try {
      await inventarioService.update(id, formData);
      alert(`✅ Cambios guardados para el producto #${id}`);
      navigate('/app/inventario');
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("❌ Hubo un error al actualizar. Revisá la consola.");
    }
  };

  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;
  if (!data) return <div className="p-10 text-center font-bold">Cargando producto desde la base de datos...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <EditIcon fontSize="large" className="text-blue-600" /> Editar #{id}
        </h2>
        <Button variant="outlined" color="inherit" startIcon={<ArrowBack />} onClick={() => navigate('/app/inventario')} className="bg-white">
          Volver
        </Button>
      </div>

      <InventarioForm 
        initialData={data} 
        isEdit={true} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/app/inventario')} 
      />
    </div>
  );
};

export default InventarioEdit;