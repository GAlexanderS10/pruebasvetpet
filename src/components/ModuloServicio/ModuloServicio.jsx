import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/Servicio.css';

const Servicio = () => {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [servicioToDelete, setServicioToDelete] = useState(null);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      const response = await axios.get('https://localhost:7035/api/Servicio');
      setServicios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newServicio = {
      nombre,
      descripcion,
      precio,
    };

    try {
      await axios.post('https://localhost:7035/api/Servicio', newServicio);
      console.log('Servicio creado');
      // Realiza alguna acción adicional, como mostrar un mensaje de éxito

      // Reinicia los campos del formulario
      setNombre('');
      setDescripcion('');
      setPrecio('');

      // Obtén la lista actualizada de servicios
      fetchServicios();

      // Cierra el modal después de enviar el formulario
      setShowModal(false);
    } catch (error) {
      console.error('Error al crear el servicio:', error);
      // Maneja el error, como mostrar un mensaje de error
    }
  };

  const handleDelete = (servicio) => {
    setShowConfirmation(true);
    setServicioToDelete(servicio);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:7035/api/Servicio/${servicioToDelete.servicioId}`);
      console.log('Servicio eliminado');
      // Realiza alguna acción adicional, como mostrar un mensaje de éxito

      // Obtén la lista actualizada de servicios
      fetchServicios();
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      // Maneja el error, como mostrar un mensaje de error
    } finally {
      setShowConfirmation(false);
      setServicioToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setServicioToDelete(null);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedServicio(null); // Reinicia el estado del servicio seleccionado al cerrar el modal
  };

  const handleEdit = (servicio) => {
    setSelectedServicio(servicio);
    setNombre(servicio.nombre);
    setDescripcion(servicio.descripcion);
    setPrecio(servicio.precio);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    const updatedServicio = {
      nombre,
      descripcion,
      precio,
    };

    try {
      await axios.put(`https://localhost:7035/api/Servicio/${selectedServicio.servicioId}`, updatedServicio);
      console.log('Servicio actualizado');
      // Realiza alguna acción adicional, como mostrar un mensaje de éxito

      // Reinicia los campos del formulario y el estado del servicio seleccionado
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setSelectedServicio(null);

      // Obtén la lista actualizada de servicios
      fetchServicios();

      // Cierra el modal después de enviar el formulario
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      // Maneja el error, como mostrar un mensaje de error
    }
  };

  return (
    <div className="container-servicio">
      <div className="servicio">
        <div className="contenedor-registrar-servicio">
          <button className="btn-agregar-servicio" onClick={openModal}>
            REGISTRAR SERVICIO
          </button>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
              <form onSubmit={handleSubmit} className="form-servicios">
                <input
                  className="input-servicios"
                  type="text"
                  placeholder="Servicio"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
                />
                <input
                  className="input-servicios"
                  type="text"
                  placeholder="Descripcion"
                  value={descripcion}
                  onChange={(event) => setDescripcion(event.target.value)}
                />
                <input
                  className="input-servicios"
                  type="number"
                  placeholder="Precio"
                  value={precio}
                  onChange={(event) => setPrecio(event.target.value)}
                />
                <div className="button-container">
                  {selectedServicio ? (
                    <button type="button" onClick={handleUpdate}>
                      Actualizar
                    </button>
                  ) : (
                    <button type="submit">Registrar</button>
                  )}
                  <button type="button" onClick={closeModal}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div>
          {servicios.map((servicio) => (
            <div key={servicio.servicioId} className="contenedor-datos-servicios">
              <p className="campo-datos-servicios">Servicio: {servicio.nombre}</p>
              <p className="campo-datos-servicios">Descripción: {servicio.descripcion}</p>
              <p className="campo-datos-servicios">Precio: {servicio.precio}</p>
              <button className="btn-editar-servicio" onClick={() => handleEdit(servicio)}>
                Editar
              </button>
              <button className="btn-eliminar-servicio" onClick={() => handleDelete(servicio)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>¿Estás seguro de que deseas eliminar este servicio?</p>
              <div className="button-container">
                <button onClick={confirmDelete}>Eliminar</button>
                <button onClick={cancelDelete}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Servicio;
