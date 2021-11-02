import React, { useState } from 'react';
import { IconButton, Box, Drawer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ModalLogin from './login/ModalLogin';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { theme, obtenerUsuarioLogueado } from '../services/Global';
import Navegacion from './Navegacion';
import Mensaje from './Mensaje';



const obtenerEstilos = makeStyles(
    (tema) => ({
        botonMenu: {
            marginRight: tema.spacing(2),
        },
        titulo: {
            flexGrow: 1,
        },
        rol: {
            color: "#F3F3F3",
            fontSize: "0.9em"
        }
    })
);


const MenuPrincipal = () => {

    const estilos = obtenerEstilos();

    const [openPendiente, setOpenPendiente] = useState(false);
    const handleOpenP = () => setOpenPendiente(true);
    const handleCloseP = () => setOpenPendiente(false);

    const [openNA, setOpenNA] = useState(false);
    const handleOpenNA = () => setOpenNA(true);
    const handleCloseNA = () => setOpenNA(false);

    // Manejo del estado de usuario logueado
    const [usuarioLogueado, setUsuarioLogueado] = useState(obtenerUsuarioLogueado);
    // Manejo del estado del menú
    const [estadoMenu, setEstadoMenu] = useState(false);
    const [estadoVentas, setEstadoVentas] = useState(true);
    const [estadoHome, setEstadoHome] = useState(true);
    const [estadoProductos, setEstadoProductos] = useState(true);
    const [estadoUsuarios, setEstadoUsuarios] = useState(true);


    //Manejo del estodo de la ventana modal
    const [estadoModal, setEstadoModal] = useState(false);

    if (usuarioLogueado && usuarioLogueado.idEstado == 1) {
        handleOpenP();
        sessionStorage.removeItem("usuarioLogueado");
        setUsuarioLogueado(obtenerUsuarioLogueado);
    } 
    else if (usuarioLogueado && usuarioLogueado.idEstado == 2) {
        handleOpenNA();
        sessionStorage.removeItem("usuarioLogueado");
        setUsuarioLogueado(obtenerUsuarioLogueado);
    }
    //rutina que abre la ventana modal
    const abrirModal = () => {
        setEstadoModal(true);
    }

    // rutina que cierra la ventana modal
    const cerraModal = () => {
        setEstadoModal(false);
        setUsuarioLogueado(obtenerUsuarioLogueado);
    }

    // rutina que desactiva el despliegue del menú
    const mostrarMenu = (estado) => () => {
        setEstadoMenu(estado);

        if (usuarioLogueado.idRol == 2) {

            setEstadoVentas(false);
            setEstadoHome(false);
            setEstadoProductos(true);
            setEstadoUsuarios(true);
        }
        else if (usuarioLogueado.idRol == 1) {
            setEstadoVentas(false);
            setEstadoHome(false);
            setEstadoProductos(false);
            setEstadoUsuarios(false);
        }
    }

    // rutina que realiza la salida del usuario
    const salir = () => {
        sessionStorage.removeItem("usuarioLogueado");
        setUsuarioLogueado(obtenerUsuarioLogueado);
    }




    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="secondary">

                <Toolbar>
                    {(usuarioLogueado && usuarioLogueado.idEstado != 1) ? (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria_label="Menu Principal"
                            className={estilos.botonMenu}
                            onClick={mostrarMenu(true)}

                        >
                            <MenuIcon />
                        </IconButton>

                    ) : ''}
                    <Typography variant="h6" className={estilos.titulo}>
                        Librería BookDragon
                    </Typography>
                    <span sx={{ m: 0.5 }}>
                        <h6>{usuarioLogueado ? usuarioLogueado.nombre : ""}</h6>
                    </span>
                    {usuarioLogueado ? (
                        <Button variant="contained" onClick={salir} sx={{ m: 0.5 }} href={"/"} >
                            Salir
                        </Button>
                    ) : (

                        <Button variant="contained" onClick={abrirModal} sx={{ m: 0.5 }}>
                            Iniciar Sesión
                        </Button>
                    )}
                </Toolbar>
                <ModalLogin open={estadoModal} cerrar={cerraModal} />
                <Drawer
                    anchor="left"
                    open={estadoMenu}
                    onClose={mostrarMenu(false)}
                >
                    <Box
                        sx={{ width: 300 }}
                        role="presentation"
                        onClick={mostrarMenu(false)}
                    >
                        <Navegacion
                            estadoHome={estadoHome}
                            estadoVentas={estadoVentas}
                            estadoProductos={estadoProductos}
                            estadoUsuarios={estadoUsuarios}
                        />
                    </Box>
                </Drawer>
                <Mensaje
                    open={openPendiente}
                    titulo="Usuario Pendiente"
                    mensaje="Por favor espere a ser autorizado por el administrador"
                    cerrar={handleCloseP}
                />
               <Mensaje
                    open={openNA}
                    titulo="Acceso Restringido"
                    mensaje="Usuario no autorizado"
                    cerrar={handleCloseNA}
                />

            </AppBar>
        </ThemeProvider>
    )
}

export default MenuPrincipal;