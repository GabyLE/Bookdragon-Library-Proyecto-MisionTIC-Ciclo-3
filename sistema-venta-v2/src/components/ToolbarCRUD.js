import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';

import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

// const tipos = [
//     { label: 'Id Venta', value: 0 },
//     { label: 'Nombre Cliente', value: 1 },
//     { label: 'Documento Cliente', value: 2 }
// ];



// const ToolbarCRUD = ({agregar, modificar, eliminar}) => {


//     const [tipo, setTipo] = useState(0);

//     const [dato, setDato] = useState('');

//     const [resultadoBusqueda, setResultadoBusqueda] = useState([]);

    

//     const buscar = () => {

//         fetch(`http://localhost:3010/ventas/${tipo}`,
//             {
//                 method: 'post',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     Dato: dato
//                 })
//             })
//             .then((res) => res.json())
//             .then((json) => {
//                 // var ventasT = [];
//                 json.map((item) => {
//                     resultadoBusqueda.push(
//                         item.Id,
//                         item.IdProducto,
//                         item.NombreProducto,
//                         item.ValorUnitario,
//                         item.Cantidad,
//                         item.Fecha,
//                         item.ClienteDocumento,
//                         item.NombreCliente,
//                         item.NombreUsuario
//                     );
//                 });
//                 setResultadoBusqueda(resultadoBusqueda);
//                 //setEstadoListado(false);
//             })
//             .catch(function (error) {
//                 window.alert(`error buscando venta [${error}]`);
//             });
//     }

//     return (
//         <Paper
//             component="form"
//             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
//             spacing = {1}
//         >
//             <TextField

//                 select
//                 label="Seleccione"
//                 value={tipo}
//                 onChange={(e) => { setTipo(e.target.value) }}
//                 variant="standard"
//                 sx={{ ml: 1, flex: 1, width: 200 }}
//             >
//                 {tipos.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                     </MenuItem>
//                 ))}
//             </TextField>
//             <InputBase
//                 sx={{ ml: 1, flex: 1 }}
//                 placeholder="Buscar"
//                 inputProps={{ 'aria-label': 'buscar' }}
//                 onChange = {(e) => { setDato(e.target.value) }}
//             />
//             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//                 <SearchIcon />
//             </IconButton>
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ m: 0.5}} onClick={agregar} >
//                 Agregar
//             </Button>
//             <Button variant="contained" startIcon={<EditIcon />} sx={{ m: 0.5}} onClick={modificar} >
//                 Modificar
//             </Button>
//             <Button variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ m: 0.5}} onClick={eliminar} >
//                 Eliminar
//             </Button>
//         </Paper>
//     );
// }

// export default ToolbarCRUD;