import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
/* import ModalLogin from './login/Login'; */
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

//LOGIN
import { useAuth0 } from "@auth0/auth0-react";



const obtenerEstilos = makeStyles(
    (tema) => ({
        botonMenu: {
            marginRight: tema.spacing(2),
        },
        titulo: {
            flexGrow: 1,
        }
    })
);



const obtenerUsuarioLogueado = () => {
    // obtener los datos del usuario que está logueado
    const strUsuarioLogueado = sessionStorage.getItem("usuarioLogueado");
    return JSON.parse(strUsuarioLogueado);
}

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#FFC107',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

const MenuPrincipal = () => {

    const estilos = obtenerEstilos();

    // Manejo del estado de usuario logueado
    // const [usuarioLogueado, setUsuarioLogueado] = useState(obtenerUsuarioLogueado);

    const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0();
    // const { logout } = useAuth0();
    // const { loginWithRedirect } = useAuth0();
    // const { user, isAuthenticated, isLoading } = useAuth0();

    // Manejo del estod de la ventana modal
    // const [estadoModal, setEstadoModal] = useState(false);
    // rutina que abre la ventana modal
    // const abrirModal = () => {
    //     setEstadoModal(true);
    // }

    // // rutina que cierra la ventana modal
    // const cerraModal = () => {
    //     setEstadoModal(false);
    //     setUsuarioLogueado(obtenerUsuarioLogueado);
    // }

    // Manejo del estado del menú
    const [estadoMenu, setEstadoMenu] = useState(false);

    // rutina que desactiva el despliegue del menú
    const mostrarMenu = (estado) => () => {
        setEstadoMenu(estado);
    }

    // rutina que realiza la salida del usuario
    // const salir = () => {
    //     sessionStorage.removeItem("usuarioLogueado");
    //     setUsuarioLogueado(obtenerUsuarioLogueado);
    // }

    const menu = () => (

        <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={mostrarMenu(false)}
        >
            <List subheader={<ListSubheader>Navegación</ListSubheader>}>
                <ListItem button component="a" href={"/Home"} >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component="a" href={"/Ventas"} >
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ventas" />
                </ListItem>
                <ListItem button component="a" href={"/Productos"} >
                    <ListItemIcon>
                        <StoreMallDirectoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Productos" />
                </ListItem>
                <ListItem button component="a" href={"/Usuarios"} >
                    <ListItemIcon>
                        <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>
            </List>
        </Box>
    )

    return (
        <AppBar position="static">
            <ThemeProvider theme={theme}>
                <Toolbar>
                    {isAuthenticated ? (
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
                        Sistema de Ventas
                    </Typography>
                    <span>
                        {isAuthenticated ? user.name : ""}
                    </span>
                    {isAuthenticated ? (
                        <Button variant="contained" onClick={() => logout({ returnTo: window.location.origin })} sx={{ m: 0.5 }}>
                            Salir
                        </Button>
                    ) : (

                        <Button variant="contained" onClick={() => loginWithRedirect()} sx={{ m: 0.5 }}>
                            Ingresar
                        </Button>
                    )}
                </Toolbar>
                <Drawer
                    anchor="left"
                    open={estadoMenu}
                    onClose={mostrarMenu(false)}
                >
                    {menu()}
                </Drawer>
            </ThemeProvider>
        </AppBar>
    )
}

export default MenuPrincipal;