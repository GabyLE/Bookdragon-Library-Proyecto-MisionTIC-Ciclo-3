import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Producto, listarProductos, theme} from '../services/Global';
import { ThemeProvider } from '@mui/material/styles';
//MIS COMPONENTES
import ModalEditar from '../components/EditarProducto/Modal';
import Confirmacion from '../components/Confirmacion';
//TOOLBAR
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// ICONOS
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { apiBaseUrl } from '../utils/Api';

const tipos = [
    { label: 'Id Producto', value: 0 },
    { label: 'Descripción Producto', value: 1 }
];

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nombre", headerName: "Descripción", width: 850 },
    { field: "valorUnitario", headerName: "Valor Unitario", width: 200 },
    { field: "estado", headerName: "Disponibilidad", width: 200 }
]

const Productos = () => {

    // variable que almacenará la lista de productos
    const [productos, setProductos] = useState([]);

    const [estadoListado, setEstadoListado] = useState(true);

    const [tipo, setTipo] = useState(0);

    const [dato, setDato] = useState('');

    const [estadoModal, setEstadoModal] = useState(false);

    const [productoEditado, setProductoEditado] = useState({})

    const [estadoBusqueda, setEstadoBusqueda] = useState(false);

    const [estadoConfirmacion, setEstadoConfirmacion] = useState(false);

    async function obtenerProductos() {
        const productosT = await listarProductos();
        setProductos(productosT);
        setEstadoListado(false);
    }


    const buscar = () => {
        if(dato){
            setEstadoBusqueda(true);
        }
        else{
            setEstadoListado(true);
        }
    }

    async function obtenerBusqueda() {
        const productosT = await buscarProductos();
        setProductos(productosT);
        setEstadoBusqueda(false);
    }

    const buscarProductos = () => {
        return fetch(`${apiBaseUrl}/productos/${tipo}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Dato: dato
                })
            })
            .then((res) => {
                if(!res.ok) {
                    throw new Error(`HTTP error, estado = ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                
                var busquedaT = [];
                json.map((item) => {
                    busquedaT.push( new Producto(
                        item.Id,
                        item.Nombre,
                        item.ValorUnitario,
                        item.Estado)
                    );
                });
               
                return busquedaT;
            })
            .catch(function (error) {
                window.alert(`error buscando producto [${error}]`);
            });
    }

    if (estadoBusqueda) {
        obtenerBusqueda();
    }
    else if (estadoListado) {
        obtenerProductos();
    }


    const cerrarModal = () => {
        setEstadoModal(false);
        setEstadoListado(true);
    }

    const agregar = () => {
        const producto = new Producto(-1, "", "", "");
        setProductoEditado(producto);
        setEstadoModal(true);
    }

    const modificar = () => {
        if (productoSeleccionado) {
            const producto = productoSeleccionado;
            setProductoEditado(producto);
            setEstadoModal(true);
        }
        else {
            window.alert("Por favor seleccione un registro");
        }
    }
    var productoSeleccionado;

    const eliminar = () => {
        if (productoSeleccionado) {
            const producto = productoSeleccionado;
            setProductoEditado(producto);
            setEstadoConfirmacion(true);
        }
        else {
            window.alert("Por favor seleccione un registro");
        }
    }

    const confirmarEliminacion = () => {
        fetch(`${apiBaseUrl}/productos/${productoEditado.id}`,
            {
                method: 'delete',
            })
            .then((res) => {
                if (res.status != 200) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then((json) => {
                //window.alert(json.message);
                setEstadoListado(true);

            })
            .catch(function (error) {
                // Catch captura un error en tiempo de ejecución
                window.alert(`error eliminando producto [${error}]`);
            });
    }

    const cerrarConfirmacion = () => {
        setEstadoConfirmacion(false);
    }


    return (
        <div>
            <center>
                <h1>
                    Gestión de Productos
                </h1>
            </center>
            <ThemeProvider theme={theme}>
                <div style={{ height: 500, width: '100%' }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                        spacing={1}
                    >
                        <TextField

                            select
                            label="Seleccione"
                            value={tipo}
                            onChange={(e) => { setTipo(e.target.value) }}
                            variant="standard"
                            sx={{ ml: 1, flex: 1, width: 200 }}
                        >
                            {tipos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Buscar"
                            inputProps={{ 'aria-label': 'buscar' }}
                            onChange={(e) => { setDato(e.target.value) }}
                        />
                        <IconButton  sx={{ p: '10px' }} aria-label="search" onClick={buscar}>
                            <SearchIcon />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ m: 0.5 }} onClick={agregar} >
                            Agregar
                        </Button>
                        <Button variant="contained" startIcon={<EditIcon />} sx={{ m: 0.5 }} onClick={modificar} >
                            Modificar
                        </Button>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ m: 0.5 }} onClick={eliminar} >
                            Eliminar
                        </Button>
                    </Paper>
                    <DataGrid
                        rows={productos}
                        columns={columnas}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        sx={{ m: 2 }}
                        onSelectionModelChange={(idProducto) => {

                            const productosSeleccionados = productos.filter(
                                function (fila) {
                                    return fila.id == idProducto[0];
                                }
                            )
                            productoSeleccionado = productosSeleccionados[0];
                        }

                        }


                    />


                    <ModalEditar open={estadoModal} cerrar={cerrarModal} producto={productoEditado} />

                    <Confirmacion
                        open={estadoConfirmacion}
                        cerrar={cerrarConfirmacion}
                        titulo={"Eliminando Producto "}
                        mensaje={"¿Está seguro?"}
                        aceptar={confirmarEliminacion}
                    />
                </div>
            </ThemeProvider>
        </div>
    );
}

export default Productos;