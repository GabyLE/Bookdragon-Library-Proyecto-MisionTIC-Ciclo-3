import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { apiBaseUrl } from '../../utils/Api';
import { Autocomplete } from "@mui/material";
import { listarProductos, listarUsuarios } from "../../services/Global";
import MenuItem from '@mui/material/MenuItem';

const obtenerEstilos = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));

const estados = [
    { label: 'En Proceso', value: 0 },
    { label: 'Entregado', value: 1 },
    { label: 'Cancelado', value: 2},
];

const Formulario = ({ cerrarFormulario, ventaEditada }) => {

    const estilos = obtenerEstilos();

    const [idProducto, setIdProducto] = useState(ventaEditada.idProducto);
    const [producto, setProducto] = useState(ventaEditada.producto);
    const [cantidad, setCantidad] = useState(ventaEditada.cantidad);
    const [fecha, setFecha] = useState(ventaEditada.fecha);
    const [idCliente, setIdCliente] = useState(ventaEditada.clienteDocumento);
    const [usuario, setUsuario] = useState(ventaEditada.usuario);
    const [estado, setEstado] = useState(ventaEditada.estado);
    const [nombreCliente, setNombreCliente] = useState(ventaEditada.nombreCliente)
    const [estadoListadoU, setEstadoListadoU] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [estadoListadoP, setEstadoListadoP] = useState(true);
    const [productos, setProductos] = useState([]);

    async function obtenerUsuarios() {
        const usuariosT = await listarUsuarios();
        setUsuarios(usuariosT);
        setEstadoListadoU(false);
    }

    if (estadoListadoU) {
        obtenerUsuarios();
    }

    async function obtenerProductos() {
        const productosT = await listarProductos();
        setProductos(productosT);
        setEstadoListadoP(false);
    }

    if (estadoListadoP) {
        obtenerProductos();
    }

    const guardar = (e) => {

        fetch(`${apiBaseUrl}/ventas`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Id: ventaEditada.id,
                    IdCliente: idCliente,
                    NombreCliente: nombreCliente,
                    Fecha: fecha,
                    IdProducto: producto.id,
                    Cantidad: cantidad,
                    IdUsuario: usuario.id,
                    NombreUsuario: usuario.nombre,
                    IdEstado: estado
                })
            })
            .then((res) => res.json())
            .then((json) => {
                //window.alert(`Respuesta: ${json.venta}`);
                cerrarFormulario();
            })
            .catch(function (error) {
                window.alert(`error agregando venta [${error}]`);
            });
    }

    const seleccionarUsuario = (e, usuarioEscogido) => {
        setUsuario(usuarioEscogido);
    }

    const seleccionarProducto = (e, productoEscogido) => {
        setProducto(productoEscogido);
    }

    return (
        <form className={estilos.root}  >
            {ventaEditada.id == "-1" ? <h3>Agregar Venta</h3> : <h3>Modificar Venta {ventaEditada.id}</h3>}

            <Autocomplete
                value={producto}
                options={productos}
                required
                getOptionLabel={(option) => option.nombre}
                onChange={seleccionarProducto}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Producto"

                    />
                )}
            />

            <TextField
                label="Cantidad"
                variant="filled"
                required
                value={cantidad}
                onChange={(e) => { setCantidad(e.target.value) }}
            />
            <TextField
                label="Fecha"
                variant="filled"
                required
                value={fecha}
                placeholder="AAAA-MM-DD"
                onChange={(e) => { setFecha(e.target.value) }}
            />
            <TextField
                label="ID Cliente"
                variant="filled"
                required
                value={idCliente}
                onChange={(e) => { setIdCliente(e.target.value) }}
            />
            <TextField
                label="Nombre Cliente"
                variant="filled"
                required
                value={nombreCliente}
                onChange={(e) => { setNombreCliente(e.target.value) }}
            />
            <TextField

                select
                label="Estado"
                value={estado}
                onChange={(e) => { setEstado(e.target.value) }}
                variant="standard"
                sx={{ ml: 1, flex: 1, width: 200 }}
            >
                {estados.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <Autocomplete
                value={usuario}
                options={usuarios}
                required
                getOptionLabel={(option) => option.nombre}
                onChange={seleccionarUsuario}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Encargado de Venta"

                    />
                )}
            />

            <div>
                <Button variant="contained" onClick={cerrarFormulario}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={guardar} color="primary">
                    Aceptar
                </Button>
            </div>
        </form>
    )
}

export default Formulario;