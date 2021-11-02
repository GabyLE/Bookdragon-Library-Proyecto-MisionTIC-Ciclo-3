import TextField from '@mui/material/TextField';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { apiBaseUrl } from '../../utils/Api';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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
    { label: 'Disponible', value: 0 },
    { label: 'No Disponible', value: 1 }
];

const Formulario = ({ cerrarFormulario, productoEditado }) => {

    const estilos = obtenerEstilos();

    const [nombre, setNombre] = useState(productoEditado.nombre);
    const [valorUnitario, setValorUnitario] = useState(productoEditado.valorUnitario);
    const [estado, setEstado] = useState(productoEditado.estado);

    const guardar = (e) => {

        fetch(`${apiBaseUrl}/productos`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Id: productoEditado.id,
                    Nombre: nombre,
                    ValorUnitario: valorUnitario,
                    Estado: estado
                })
            })
            .then((res) => res.json())
            .then((json) => {
                //window.alert(`Respuesta: ${json.venta}`);
                cerrarFormulario();
            })
            .catch(function (error) {
                window.alert(`error agregando producto [${error}]`);
            });
    }


    return (
        <form className={estilos.root}  >
            {productoEditado.id == "-1" ? <h3>Agregar Producto</h3> : <h3>Modificar Producto {productoEditado.id}</h3>}
            <TextField
                label="Descripción"
                variant="filled"
                required
                value={nombre}
                onChange={(e) => { setNombre(e.target.value) }}
            />

            <TextField
                label="Valor Unitario"
                variant="filled"
                required
                value={valorUnitario}
                onChange={(e) => { setValorUnitario(e.target.value) }}
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

            <div>
                <Button variant="contained" onClick={cerrarFormulario} color="neutral">
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