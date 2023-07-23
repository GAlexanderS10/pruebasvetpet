import React, { useEffect,createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/FormStyles.css';
import ImgLogin from "../../assets/ImgIniciar.jpg";
import ImgRegistro from "../../assets/ImgRegistro.jpeg";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {
  const containerRef = createRef();
  const formRef = createRef();
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasenia: '',
    nombres: '',
    apellidos: '',
    nacionalidad: '',
    tipoDocumento: '',
    nroIdentidad: '',
    email: '',
    userName: '',
    passwo: '',
    rolId: 2
  });

  const handleSignUpClick = () => {
    containerRef.current.classList.add("sign-up-mode");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("sign-up-mode");
  };

  //-----------------------------------------------------------------------------------------

  //CONSUMO DE API DE PAISES
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    fetchCountries();
  }, []);

  // Ordenar alfabéticamente los países por nombre común
  countries.sort((a, b) => {
    const countryA = a.name.common.toUpperCase();
    const countryB = b.name.common.toUpperCase();
    if (countryA < countryB) {
      return -1;
    }
    if (countryA > countryB) {
      return 1;
    }
    return 0;
  });

    // FIN






















  //------------------------------------------------------------------------------------------------

  const [isRolIdVisible] = useState(false);
  const handleSubmitRegistro = async (event) => {
    event.preventDefault();

    try {

      const requiredFields = ['nombres', 'apellidos','nacionalidad','tipoDocumento','nroIdentidad','email', 'userName', 'passwo'];

      // Verificar si algún campo requerido está vacío
      const isEmptyField = requiredFields.some((field) => !formData[field]);
  
      if (isEmptyField) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos del formulario.'
        });
        return;
      }

      const response = await axios.post('https://localhost:7035/api/Usuario', {
        Nombres: formData.nombres,
        Apellidos: formData.apellidos,
        Nacionalidad: formData.nacionalidad,
        TipoDocumento: formData.tipoDocumento,
        NroIdentidad: formData.nroIdentidad,
        Email: formData.email,
        UserName: formData.userName,
        Passwo: formData.passwo,
        RolId: formData.rolId
      });

      console.log(response.data); // Manejar la respuesta de la API según sea necesario

      // Limpiar el formulario después de registrar el usuario exitosamente
      setFormData({
        ...formData,
        nombres: '',
        apellidos: '',
        nacionalidad: '',
        tipoDocumento: '',
        nroIdentidad: '',
        email: '',
        userName: '',
        passwo: '',
        rolId: 2
      });

      Swal.fire({
        icon: 'success',
        title: 'Registro de usuario exitoso',
        text: 'Ahora puede ingresar al sistema!'
      });

      handleSignInClick();

    } catch (error) {
      console.error(error); // Manejar el error de la API según sea necesario

      Swal.fire({
        icon: 'error',
        title: 'No se logró registrar al usuario',
        text: 'Revise su datos ingresados'
      });

    }
  };

  //-----------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const handleSubmitInicioSesion = async (values) => {
    try {
      const response = await axios.post('https://localhost:7035/api/Usuario/Login', {
        UserName: values.nombreUsuario,
        Passwo: values.contrasenia
      });

      console.log(response.data); // Manejar la respuesta de la API según sea necesario

      // Limpiar el formulario después de iniciar sesión exitosamente
      setFormData({
        ...formData,
        nombreUsuario: '',
        contrasenia: ''
      });

      // Redireccionar a la página de menú
      navigate('/menu');

      // Mostrar la alerta de inicio de sesión exitoso
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido!'
      });
    } catch (error) {
      console.error(error); // Manejar el error de la API según sea necesario
      setFormData({
        ...FormData,
        nombreUsuario: '',
        contrasenia: ''
      });
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos'
      });
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.nombreUsuario) {
      errors.nombreUsuario = 'COMPLETAR ESTE CAMPO';
    }

    if (!values.contrasenia) {
      errors.contrasenia = 'COMPLETAR ESTE CAMPO';
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  return (
    <div className="container-view-user">
      <div className="container" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">


            <Formik
              initialValues={{
                nombreUsuario: '',
                contrasenia: ''
              }}
              onSubmit={handleSubmitInicioSesion}
              validate={validateForm}
            >
              {() => (
                <Form className="sign-in-form" ref={formRef}>
                  <h2 className="title">Iniciar Sesión</h2>

                  <div className="input-field">
                    <i className="fas fa-user"></i>
                    <Field type="text" name="nombreUsuario" placeholder="Username" />
                    <ErrorMessage
                      name="nombreUsuario"
                      component="span"
                      className="error-message"
                    />
                  </div>

                  <div className="input-field">
                    <i className="fas fa-lock"></i>
                    <Field type="password" name="contrasenia" placeholder="Password" />
                    <ErrorMessage
                      name="contrasenia"
                      component="span"
                      className="error-message"
                    />
                  </div>

                  <input type="submit" value="Ingresar" className="btn solid" />
                </Form>
              )}
            </Formik>


            

            <form action="#" className="sign-up-form" onSubmit={handleSubmitRegistro}>
              <h2 className="title">Registro</h2>
              <div className="input-field-grid">
              <div className="input-field">
                <i className="fas fa-person"></i>
                <input
                  type="text"
                  placeholder="Nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-person"></i>
                <input
                  type="text"
                  placeholder="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                />
              </div>


              <div className="input-field">
                <i className="fas fa-earth-americas"></i>
                <select className="input-field-select" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange}>
                  <option value="">Seleccionar Nacionalidad</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-field">
                <i className="fas fa-id-card-clip"></i>
                <select className="input-field-select" name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange}>
                  <option value="">Seleccionar Doc. Identidad</option>
                  <option value="dni">DNI</option>
                  <option value="pasaporte">Pasaporte</option>
                  <option value="carnet">Carnet de identidad</option>
                </select>
              </div>

              <div className="input-field">
                <i className="fas fa-id-card"></i>
                <input
                  type="number"
                  placeholder="NroIdentidad"
                  name="nroIdentidad"
                  value={formData.nroIdentidad}
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="passwo"
                  value={formData.passwo}
                  onChange={handleChange}
                />
              </div>

              {isRolIdVisible && (
              <div className="input-field">
                <i className="fas fa-address-card"></i>
                <input
                  type="number"
                  placeholder="Rol Id"
                  name="rolId"
                  value={formData.rolId}
                  onChange={handleChange}
                />
              </div>
              )}
              </div>
              <input
                type="submit"
                className="btn"
                value="Registrate"
                id="btnRegistrar"
              />
              
            </form>

            
          </div>
        </div>

        <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¡BIENVENIDO!</h3>
            <p>
              ¿Aún no ha Registrado una cuenta con la cual ingresar al Sistema?
            </p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
              Registrate
            </button>
          </div>
          <img src={ImgLogin} className="image" alt="ImgLogin" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>INGRESA AL SISTEMA</h3>
            <p>Ahora puede Iniciar Sesión al Sistema con la cuenta Registrada</p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
              Ingresar
            </button>
          </div>
          <img src={ImgRegistro} className="image" alt="ImgRegistro"  />
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;