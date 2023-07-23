import React, { Component } from "react";
import "../../Styles/NavbarStyles.css";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import LogoNav from "../../assets/LogoNav.png";

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            
            <nav className="BarraNavegacion">
                <a className="NavegacionLogo" href="/">
                    <img src={LogoNav} alt="Logo" />
                </a>
                <div className="OpcionesIconos" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fa-sharp fa-solid fa-xmark" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "OpcionesNavegacion active" : "OpcionesNavegacion"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <i className={item.icon}></i>{item.title}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link to="/ingresar">
                            <button className="btnAbrirForm">Iniciar Sesión</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;