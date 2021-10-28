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
    { label: 'Autorizado', value: 0 },
    { label: 'No Autorizado', value: 1 },
    { label: 'Pendiente', value: 2 }
];

const roles = [
    { label: 'Administrador', value: 1 },
    { label: 'Vendedor', value: 2 },
    { label: 'Pendiente', value: 3 }
];

const Formulario = ({ cerrarFormulario, usuarioEditado }) => {

    const estilos = obtenerEstilos();

    const [nombre, setNombre] = useState(usuarioEditado.nombre);
    const [rol, setRol] = useState(usuarioEditado.rol);
    const [estado, setEstado] = useState(usuarioEditado.estado);

    const guardar = (e) => {

        fetch(`${apiBaseUrl}/usuarios`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Id: usuarioEditado.id,
                    Rol: rol,
                    Estado: estado
                })
            })
            .then((res) => res.json())
            .then((json) => {
                //window.alert(`Respuesta: ${json.venta}`);
                cerrarFormulario();
            })
            .catch(function (error) {
                window.alert(`error actualizando usuario [${error}]`);
            });
    }


    return (
        <form className={estilos.root}  >
            {usuarioEditado.id == "-1" ? <h3>Agregar Usuario</h3>: 
            <div>
            <h3>Actualizar Usuario</h3><br/><h4>{nombre}</h4>
            </div>}
            <TextField

                            select
                            label="Rol"
                            value={rol}
                            onChange={(e) => { setRol(e.target.value) }}
                            variant="standard"
                            sx={{ ml: 1, flex: 1, width: 200 }}
                        >
                            {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
            
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