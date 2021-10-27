import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import imgProductos from '../assets/img/1.png';
import imgVentas from '../assets/img/2.png';
import imgUsuarios from '../assets/img/3.png';
import { makeStyles } from "@material-ui/core";

function HomePage() {

    return (


        <Fragment>

            <div id="content-wrapper" className="w-100">
                <div id="content" className="container-fluid d-flex flex-column ">
                <center>
                    <h1>
                        Inicio
                    </h1>

                    <div class="row row-cols-1 row-cols-md-2 g-4 align-items-center">
                        <div class="col">


                            <div className='card bg-dark text-white' style={{ width: '25rem', border: '#303f9f' }}>
                                <Link to="/Productos">
                                    <img src={imgProductos} class="card-img" alt="..." />

                                    <div class="card-img-overlay">
                                        <h5 class="card-title">Productos</h5>
                                        <p class="card-text">Registro y actualización de productos</p>
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div class="col">

                            <div class="card bg-dark text-white" style={{ width: '25rem', border: '#303f9f' }}>
                                <Link to="/Ventas">
                                    <img src={imgVentas} class="card-img" alt="..." />

                                    <div class="card-img-overlay">
                                        <h5 class="card-title">Ventas</h5>
                                        <p class="card-text">Registro y estado de ventas</p>
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div class="col">

                            <div class="card bg-dark text-white" style={{ width: '25rem', border: '#303f9f' }}>
                                <Link to="/Usuarios">
                                    <img src={imgUsuarios} class="card-img" alt="..." />

                                    <div class="card-img-overlay">
                                        <h5 class="card-title">Usuarios</h5>
                                        <p class="card-text">Visualización y actualización de roles y estdo de usuarios</p>
                                    </div>
                                </Link>
                            </div>

                        </div>

                    </div>
                    </center>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;