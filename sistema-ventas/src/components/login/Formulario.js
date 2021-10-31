import { Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GoogleLogin from 'react-google-login';
import { apiBaseUrl } from '../../utils/Api';
import Box from '@mui/material/Box';



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

const Formulario = ({ cerrarFormulario }) => {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');


    const responseSuccessGoogle = (response) => {
        console.log(response);
        fetch(`${apiBaseUrl}/usuarios/auth/google`, {
            method: "POST",
            body: JSON.stringify({
                tokenId: response.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
        .then((json) => {
            //window.alert(json.Nombre);
            const usuarioLogueado = {
                id: json.Id,
                usuario: json.Usuario,
                nombre: json.Nombre,
                idRol: json.IdRol,
                idEstado: json.IdEstado
            }
            console.log(usuarioLogueado);
            if (usuarioLogueado.nombre) {
                //almacenar los datos del usuario para el resto de la aplicacion
                const strUsuarioLogueado = JSON.stringify(usuarioLogueado);
                sessionStorage.setItem("usuarioLogueado", strUsuarioLogueado);
            }
            else {
                window.alert("Las credenciales no son válidas");
                sessionStorage.removeItem("usuarioLogueado");
            }
            cerrarFormulario();
        });
        
        
    }

    const responseErrorGoogle = (response) => {
        console.log(response);
    }

    const enviarFormulario = (e) => {
        //Consumir la API para validar las credenciales
        fetch(`${apiBaseUrl}/usuarios/validaracceso`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Usuario: usuario,
                Clave: clave
            })
        }).then((res) => res.json())
            .then((json) => {
                //window.alert(json.Nombre);
                const usuarioLogueado = {
                    id: json.Id,
                    usuario: json.Usuario,
                    nombre: json.Nombre,
                    idRol: json.IdRol,
                    idEstado: json.IdEstado
                }
                if (usuarioLogueado.nombre) {
                    //almacenar los datos del usuario para el resto de la aplicacion
                    const strUsuarioLogueado = JSON.stringify(usuarioLogueado);
                    sessionStorage.setItem("usuarioLogueado", strUsuarioLogueado);

                }
                else {
                    window.alert("Las credenciales no son válidas");
                    sessionStorage.removeItem("usuarioLogueado");
                }
                cerrarFormulario();
            })

    }

    const estilos = obtenerEstilos();



    return (
        <form className={estilos.root} onSubmit={enviarFormulario}>
            <TextField
                label="Usuario"
                variante="filled"
                required 
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
                label="Clave"
                variante="filled"
                required 
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
            />
            <div>
                {/* <Button onClick={cerrarFormulario}>
                    Cerrar
                </Button> */}
                <GoogleLogin
                    clientId="756843752335-p6ic3f1ahrvn8v6dnfjmmqlov7he46e9.apps.googleusercontent.com"
                    buttonText="Ingresa con Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseErrorGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <Button type="submit" color="primary">
                    Ingresar
                </Button>
            </div>

        </form>
    )
}


export default Formulario;