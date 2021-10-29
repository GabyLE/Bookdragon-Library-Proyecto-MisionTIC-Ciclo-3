import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import fondo from '../assets/img/fondo2.jpg';
import logo from '../assets/img/BookDragonLibreria.gif';

const obtenerEstilos = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100vh',
        position: 'relative'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        paddingBottom: theme.spacing(4),
    },
}));

const Inicio = () => {
    const estilos = obtenerEstilos();

    return (
        <section className={estilos.root}>
            
            <img src={fondo} alt='' width="100%" height="100%" />
            <div className={estilos.overlay}>
                <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    color="#fff"
                >
                    
                    <img src={logo} />
                </Box>
            </div>
        </section>
    );
};

export default Inicio;