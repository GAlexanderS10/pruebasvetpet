import React, { useEffect, useState } from 'react';
import axios from 'axios';



const CrudCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://localhost:7035/api/Cliente');
      setClientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const fetchCliente = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://localhost:7035/api/Cliente/${id}`);
      setCliente(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
    }
  };

  const createCliente = async (cliente) => {
    try {
      setLoading(true);
      await axios.post('https://localhost:7035/api/Cliente', cliente);
      setLoading(false);
      setShowCreateModal(false);
      fetchClientes();
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  };

  const updateCliente = async (id, cliente) => {
    try {
      setLoading(true);
      await axios.put(`https://localhost:7035/api/Cliente/${id}`, cliente);
      setLoading(false);
      setShowEditModal(false);
      fetchClientes();
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
    }
  };

  const deleteCliente = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://localhost:7035/api/Cliente/${deleteClientId}`);
      setLoading(false);
      setShowDeleteModal(false);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  const handleEditClick = (id) => {
    fetchCliente(id);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteClientId(id);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Clientes</h1>

      {/* Botón para abrir el modal de creación */}
      <button
        type="button"
        className="btn btn-succcess"
        onClick={() => setShowCreateModal(true)}
      >
        Crear Nuevo Cliente
      </button>

      {/* Tabla de clientes */}
      <table className="table caption-top">
        <caption>Lista de Clientes</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Tipo Documento</th>
            <th scope="col">Nro. Identidad</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.ClienteId}>
              <th scope="row">{cliente.ClienteId}</th>
              <td>{cliente.Nombres}</td>
              <td>{cliente.Apellidos}</td>
              <td>{cliente.TipoDocumento}</td>
              <td>{cliente.NroIdentidad}</td>
              <td>{cliente.Email}</td>
              <td>{cliente.Telefono}</td>
              <td>
                {/* Botón para editar */}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEditClick(cliente.ClienteId)}
                >
                  Editar
                </button>
                {/* Botón para eliminar */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(cliente.ClienteId)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de creación */}
      <div
        className={`modal fade ${showCreateModal ? 'show' : ''}`}
        id="createModal"
        tabIndex="-1"
        aria-labelledby="createModalLabel"
        aria-hidden={!showCreateModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createModalLabel">
                Crear Nuevo Cliente
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowCreateModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {/* Agrega aquí el formulario de creación */}
              <form onSubmit={(e) => {
                e.preventDefault();
                createCliente(cliente);
              }}>
                {/* Campos del formulario */}
                <div className="mb-3">
                  <label htmlFor="nombres" className="form-label">Nombres</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombres"
                    value={cliente.Nombres || ''}
                    onChange={(e) => setCliente({ ...cliente, Nombres: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellidos" className="form-label">Apellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    value={cliente.Apellidos || ''}
                    onChange={(e) => setCliente({ ...cliente, Apellidos: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipoDocumento"
                    value={cliente.TipoDocumento || ''}
                    onChange={(e) => setCliente({ ...cliente, TipoDocumento: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nroIdentidad" className="form-label">Nro. Identidad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nroIdentidad"
                    value={cliente.NroIdentidad || ''}
                    onChange={(e) => setCliente({ ...cliente, NroIdentidad: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={cliente.Email || ''}
                    onChange={(e) => setCliente({ ...cliente, Email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    value={cliente.Telefono || ''}
                    onChange={(e) => setCliente({ ...cliente, Telefono: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div
          className={`modal fade ${showEditModal ? 'show' : ''}`}
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden={!showEditModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Editar Cliente
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Agrega aquí el formulario de edición */}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  updateCliente(cliente.ClienteId, cliente);
                }}>
                  {/* Campos del formulario */}
                  <div className="mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombres"
                      value={cliente.Nombres || ''}
                      onChange={(e) => setCliente({ ...cliente, Nombres: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellidos"
                      value={cliente.Apellidos || ''}
                      onChange={(e) => setCliente({ ...cliente, Apellidos: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipoDocumento" className="form-label">Tipo Documento</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tipoDocumento"
                      value={cliente.TipoDocumento || ''}
                      onChange={(e) => setCliente({ ...cliente, TipoDocumento: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nroIdentidad" className="form-label">Nro. Identidad</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nroIdentidad"
                      value={cliente.NroIdentidad || ''}
                      onChange={(e) => setCliente({ ...cliente, NroIdentidad: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={cliente.Email || ''}
                      onChange={(e) => setCliente({ ...cliente, Email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telefono"
                      value={cliente.Telefono || ''}
                      onChange={(e) => setCliente({ ...cliente, Telefono: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Guardar cambios</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación */}
      {showDeleteModal && (
        <div
          className={`modal fade ${showDeleteModal ? 'show' : ''}`}
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden={!showDeleteModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Confirmar Eliminación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que quieres eliminar este cliente?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteCliente}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudCliente;
