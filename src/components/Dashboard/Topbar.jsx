import React from "react";
import '../../Styles/Sidebar.css'
import Perfil from '../../assets/perfildefecto.png'

const Topbar = () => {
  return (
    <div className="top">
      <div className="search-box">
        <i className="bx bx-search"></i>
        <input type="text" placeholder="Buscar" />
      </div>
      <img className="perfil-img" src={Perfil} alt="perfil" />
    </div>
  );
};

export default Topbar;
