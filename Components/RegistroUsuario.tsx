// general/registro-usuario/page.tsx
'use client'

import React, { useState, useEffect } from 'react';

interface Usuario {
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  fechaNacimiento: string;
  edad: number;
}

export default function RegistroUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    fechaNacimiento: ''
  });
  const [edad, setEdad] = useState<number | null>(null);

  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edadCalculada--;
    }
    return edadCalculada;
  };

  // Actualizar la edad cuando cambia la fecha de nacimiento
  useEffect(() => {
    if (formData.fechaNacimiento) {
      setEdad(calcularEdad(formData.fechaNacimiento));
    }
  }, [formData.fechaNacimiento]);

  // Manejar el cambio de datos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Agregar usuario al arreglo
  const agregarUsuario = () => {
    const nuevoUsuario: Usuario = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      correo: formData.correo,
      fechaNacimiento: formData.fechaNacimiento,
      edad: edad || 0
    };
    setUsuarios([...usuarios, nuevoUsuario]);
    setFormData({ nombre: '', apellido: '', telefono: '', correo: '', fechaNacimiento: '' });
    setEdad(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="fechaNacimiento"
          placeholder="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-lg">Edad: {edad !== null ? `${edad} años` : 'Seleccione una fecha de nacimiento'}</p>
        <button
          type="button"
          onClick={agregarUsuario}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Registrar
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Usuarios Registrados</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Apellido</th>
              <th className="py-2 px-4 border-b">Teléfono</th>
              <th className="py-2 px-4 border-b">Correo</th>
              <th className="py-2 px-4 border-b">Fecha de Nacimiento</th>
              <th className="py-2 px-4 border-b">Edad</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{usuario.nombre}</td>
                <td className="py-2 px-4 border-b">{usuario.apellido}</td>
                <td className="py-2 px-4 border-b">{usuario.telefono}</td>
                <td className="py-2 px-4 border-b">{usuario.correo}</td>
                <td className="py-2 px-4 border-b">{new Date(usuario.fechaNacimiento).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{usuario.edad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
