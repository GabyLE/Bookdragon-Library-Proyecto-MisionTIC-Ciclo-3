import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import ModalEditar from '../components/EditarVenta/Modal';
import Confirmacion from '../components/Confirmacion';
import { ThemeProvider } from '@mui/material/styles';
// import ToolbarCRUD from '../components/ToolbarCRUD';
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
// Globals
import { VentaL, VentaA, listarVentas, theme } from '../services/Global';
import { apiBaseUrl } from '../utils/Api';
import Mensaje from '../components/Mensaje';

const tipos = [
    { label: 'Id Venta', value: 0 },
    { label: 'Nombre Cliente', value: 1 },
    { label: 'Documento Cliente', value: 2 }
];

const columnas = [
    { field: "id", headerName: "ID Venta", width: 135 },
    { field: "total", headerName: "Total Venta", width: 180},
    { field: "estado", headerName: "Estado", width: 130},
    { field: "idProducto", headerName: "ID Producto", width: 160 },
    { field: "nombreProducto", headerName: "Producto", width: 250 },
    { field: "valorUnitario", headerName: "Valor Unitario", width: 170 },
    { field: "cantidad", headerName: "Cantidad", width: 150 },
    { field: "fecha", headerName: "Fecha", width: 150 },
    { field: "clienteDocumento", headerName: "Cliente ID", width: 160 },
    { field: "nombreCliente", headerName: "Cliente", width: 200 },
    { field: "nombreUsuario", headerName: "Encargado", width: 300 },
]





const Ventas = () => {

    const [ventas, setVentas] = useState([]);

    const [estadoListado, setEstadoListado] = useState(true);

    const [estadoModal, setEstadoModal] = useState(false);

    const [ventaEditada, setVentaEditada] = useState({})

    const [estadoConfirmacion, setEstadoConfirmacion] = useState(false);

    const [estadoBusqueda, setEstadoBusqueda] = useState(false);

    const [tipo, setTipo] = useState(0);

    const [dato, setDato] = useState('');

    // Mensaje
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const buscar = () => {
        if (dato) {
            setEstadoBusqueda(true);
        }
        else {
            setEstadoListado(true);
        }
    }

    async function obtenerBusqueda() {
        const ventasT = await buscarVentas();
        setVentas(ventasT);
        setEstadoBusqueda(false);
    }

    const buscarVentas = () => {
        return fetch(`${apiBaseUrl}/ventas/${tipo}`,
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
                if (!res.ok) {
                    throw new Error(`HTTP error, estado = ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {

                var busquedaT = [];
                json.map((item) => {
                    const [fecha, hora] = item.Fecha.toString().split('T');
                    busquedaT.push(new VentaL(
                        item.Id,
                        item.IdProducto,
                        item.NombreProducto,
                        item.ValorUnitario,
                        item.Cantidad,
                        fecha,
                        item.ClienteDocumento,
                        item.NombreCliente,
                        item.IdUsuario,
                        item.NombreUsuario,
                        item.Estado,
                        item.Total)
                    );
                });

                return busquedaT;
            })
            .catch(function (error) {
                window.alert(`error buscando venta [${error}]`);
            });
    }

    async function obtenerVentas() {
        const ventasT = await listarVentas();
        setVentas(ventasT);
        setEstadoListado(false);
    }


    if (estadoBusqueda) {
        obtenerBusqueda();
    }
    else if (estadoListado) {
        obtenerVentas();
    }

    const cerrarModal = () => {
        setEstadoModal(false);
        setEstadoListado(true);
    }

    const agregar = () => {
        const ventaE = new VentaA(-1, "", "", "", "", "", "", "")
        setVentaEditada(ventaE);
        setEstadoModal(true);
    }

    const modificar = () => {
        if (ventaSeleccionada) {
            const ventaE = ventaSeleccionada;
            setVentaEditada(ventaE);
            setEstadoModal(true);
        }
        else {
            handleOpen();
            //window.alert("Por favor seleccione un registro");
        }
    }
    var ventaSeleccionada;

    const eliminar = () => {
        if (ventaSeleccionada) {
            const ventaE = ventaSeleccionada;
            setVentaEditada(ventaE);
            setEstadoConfirmacion(true);
        }
        else {
            //window.alert("Por favor seleccione un registro");
            handleOpen();
        }
    }

    const confirmarEliminacion = () => {
        fetch(`${apiBaseUrl}/ventas/${ventaEditada.id}`,
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
                window.alert(`error eliminando venta [${error}]`);
            });
    }

    const cerrarConfirmacion = () => {
        setEstadoConfirmacion(false);
    }

    return (
        <div>
            <center>
                <h1>
                    Gestión de Ventas
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
                        <IconButton sx={{ p: '10px' }} aria-label="search" onClick={buscar}>
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
                        rows={ventas}
                        columns={columnas}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        sx={{ m: 2 }}
                        onSelectionModelChange={(idVentas) => {

                            const ventasSeleccionadas = ventas.filter(
                                function (fila) {
                                    return fila.id == idVentas[0];
                                }
                            )
                            ventaSeleccionada = ventasSeleccionadas[0];
                        }

                        }


                    />


                    <ModalEditar open={estadoModal} cerrar={cerrarModal} venta={ventaEditada} />

                    <Confirmacion
                        open={estadoConfirmacion}
                        cerrar={cerrarConfirmacion}
                        titulo={"Eliminando Registro de Venta "}
                        mensaje={"¿Está seguro?"}
                        aceptar={confirmarEliminacion}
                    />

                    <Mensaje
                        open={open}
                        titulo=""
                        mensaje="Por favor seleccione un registro"
                        cerrar={handleClose}
                    />
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Ventas;