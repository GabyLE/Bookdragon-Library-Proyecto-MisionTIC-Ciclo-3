import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Usuario, listarUsuarios, theme} from '../services/Global';
import {ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';

const columnas = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "usuario", headerName: "Usuario", width: 300 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "rol", headerName: "Rol", width: 200 },
    { field: "estado", headerName: "Estado", width: 300 },
]




const Usuarios = () => {
    

    // variable que almacenará la lista de monedas
    const [usuarios, setUsuarios] = useState([]);

    const [estadoListado, setEstadoListado] = useState(true);

    async function obtenerUsuarios() {
        const usuariosT = await listarUsuarios();
        setUsuarios(usuariosT);
        setEstadoListado(false);
    }

    if(estadoListado) {
        obtenerUsuarios();
    }

    const modificar = () => {


    }

    const eliminar = () => {

    }

    var usuarioSeleccionado;

    return(
        <div>
            <center>
                <h1>
                    Gestión de Usuarios
                </h1>
            </center>
            <ThemeProvider theme={theme}>
                <div style={{ height: 500, width: '100%' }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                        spacing={1}
                    >
                        
                        <Button variant="contained" startIcon={<EditIcon />} sx={{ m: 0.5 }} onClick={modificar} >
                            Modificar
                        </Button>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ m: 0.5 }} onClick={eliminar} >
                            Eliminar
                        </Button>
                    </Paper>
                    <DataGrid
                        rows={usuarios}
                        columns={columnas}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        sx={{ m: 2 }}
                        onSelectionModelChange={(idUsuarios) => {

                            const usuariosSeleccionados = usuarios.filter(
                                function (fila) {
                                    return fila.id == idUsuarios[0];
                                }
                            )
                            usuarioSeleccionado = usuariosSeleccionados[0];
                        }

                        }


                    />


                    {/* <ModalEditar open={estadoModal} cerrar={cerrarModal} venta={ventaEditada} />

                    <Confirmacion
                        open={estadoConfirmacion}
                        cerrar={cerrarConfirmacion}
                        titulo={"Eliminando Registro de Venta "}
                        mensaje={"¿Está seguro?"}
                        aceptar={confirmarEliminacion}
                    /> */}
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Usuarios;