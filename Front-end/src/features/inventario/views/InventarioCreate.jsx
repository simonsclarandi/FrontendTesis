import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack, Inventory } from '@mui/icons-material';
import InventarioForm from '../components/InventarioForm';
import { inventarioService } from "../../../services/inventarioServices";

const InventarioCreate = () => {
  const navigate = useNavigate();

  const initialState = {
    esSerializado: true, // Por defecto asumimos que ingresa un celular
    idSucursal: 1, idProveedor: '', idModeloArticulo: '', imei: '', idColor: '', 
    idMemoria: '', bateria: '', ciclos: '', precioCosto: '', precioMayor: '', 
    precioMenor: '', stock: 1, observaciones: ''
  };

  // FUNCIÓN CONECTADA A LA API (Camino A: Dos pasos)
  const handleSubmit = async (formData) => {
    try {
      // =======================================================
      // PASO 1: CREAR EL ARTÍCULO (El dispositivo en sí)
      // Traducimos de camelCase a PascalCase (como exige Joi en el Back)
      // =======================================================
      const payloadArticulo = {
        Nombre: formData.esSerializado 
          ? `Equipo (Mod: ${formData.idModeloArticulo}) - IMEI: ${formData.imei || 'S/N'}` 
          : `Repuesto/Accesorio (Mod: ${formData.idModeloArticulo}) - ID: ${Date.now()}`, 
        
        EsSerializado: formData.esSerializado,   
        EsVendible: true,      
        EsRepuesto: !formData.esSerializado, 
        
        IdModeloArticulo: Number(formData.idModeloArticulo),
        IdColor: formData.idColor !== "" ? Number(formData.idColor) : null,
        IdMemoria: formData.idMemoria !== "" ? Number(formData.idMemoria) : null,
        
        Imei: formData.esSerializado && formData.imei ? String(formData.imei) : null,
        Bateria: formData.esSerializado && formData.bateria !== "" ? Number(formData.bateria) : null,
        Ciclos: formData.esSerializado && formData.ciclos !== "" ? Number(formData.ciclos) : null,
        Observaciones: formData.observaciones || ""
      };

      console.log("📦 1. Enviando Artículo al back:", payloadArticulo);
      const resArticulo = await inventarioService.createArticulo(payloadArticulo);

      // 👇 AGREGÁ ESTE CONSOLE.LOG PARA VER LA RESPUESTA REAL
      console.log("🕵️‍♂️ Respuesta del backend al crear:", resArticulo);
      
      // 👇 AGREGAMOS resArticulo.id (todo en minúscula) POR LAS DUDAS
      const idArticuloNuevo = resArticulo.data?.Id || resArticulo.Id || resArticulo.data?.id || resArticulo.id;

      if (!idArticuloNuevo) {
        throw new Error("El backend no devolvió el ID del nuevo artículo creado.");
      }

      // =======================================================
      // PASO 2: CREAR EL INVENTARIO (Asignar stock a la sucursal)
      // =======================================================
      const payloadInventario = {
        IdArticulo: Number(idArticuloNuevo),
        IdSucursal: Number(formData.idSucursal),
        Stock: Number(formData.stock),
        // Joi exigió este campo. Asignamos 1 por defecto (ej: 1 = "Disponible" o "Nuevo").
        IdEstadoInventario: 1 
      };

      console.log("🏢 2. Enviando Inventario al back:", payloadInventario);
      await inventarioService.create(payloadInventario);
      
      // =======================================================
      // ¡ÉXITO!
      // =======================================================
      alert("✅ Ingreso y stock guardados exitosamente en la base de datos.");
      navigate('/app/inventario');

    } catch (error) {
      console.error("❌ Error al guardar el producto:", error);
      alert("Hubo un error al guardar. Revisá la consola.");
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Inventory fontSize="large" className="text-blue-600" /> Nuevo Ingreso
          </h2>
        </div>
        <Button variant="outlined" color="inherit" startIcon={<ArrowBack />} onClick={() => navigate('/app/inventario')} className="bg-white">
          Volver
        </Button>
      </div>

      <InventarioForm 
        initialData={initialState} 
        isEdit={false} 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/app/inventario')} 
      />
    </div>
  );
};

export default InventarioCreate;