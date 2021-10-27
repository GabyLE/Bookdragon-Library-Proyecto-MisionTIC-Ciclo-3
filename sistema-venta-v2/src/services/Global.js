import {apiBaseUrl} from '../utils/Api';
import React, { useState } from 'react';


export const Usuario = function (id, usuario, nombre, rol, estado) {
    this.id = id;
    this.usuario = usuario;
    this.nombre = nombre;
    this.rol = rol;
    this.estado = estado;
}

export const VentaL = function (id, idProducto, nombreProducto, valorUnitario,
    cantidad, fecha, clienteDocumento, nombreCliente, idUsuario, nombreUsuario) {
    this.id = id;
    this.idProducto = idProducto;
    this.nombreProducto = nombreProducto;
    this.valorUnitario = valorUnitario;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.clienteDocumento = clienteDocumento;
    this.nombreCliente = nombreCliente;
    this.nombreUsuario = nombreUsuario;
    this.usuario = new Usuario(idUsuario, '', nombreUsuario, '', '');
}

export const VentaA = function (id, clienteDocumento,nombreCliente, fecha, idUsuario, nombreUsuario, idProducto, cantidad) {
    this.id = id;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.clienteDocumento = clienteDocumento;
    this.nombreCliente = nombreCliente;
    this.usuario = new Usuario(idUsuario, '', nombreUsuario, '', '');
}



export const listarVentas = () => {
    // Consultar la lista de ventas desde la API
    return fetch(`${apiBaseUrl}/ventas`, { method: "get" })
    .then((res) => {
        if(!res.ok) {
            throw new Error(`HTTP error, estado = ${res.status}`);
        }
        return res.json();
    })
    .then((json) => {
        var ventas = [];
        json.map((item) => {
            const [fecha, hora] = item.Fecha.toString().split('T');
            ventas.push(new VentaL(
                item.Id,
                item.IdProducto,
                item.NombreProducto,
                item.ValorUnitario,
                item.Cantidad,
                fecha,
                item.ClienteDocumento,
                item.NombreCliente,
                item.IdUsuario,
                item.NombreUsuario
            ));
        });
        return ventas;
    })
}

export const listarUsuarios = () => {
    // Consultar la lista de monedas desde la API
    return fetch(`${apiBaseUrl}/usuarios`, { method: "get"})
    .then((res) => res.json())
    .then((json) => {
        var usuarios = [];
        json.map((item) => {
            usuarios.push(new Usuario(
                item.Id,
                item.Usuario,
                item.Nombre,
                item.IdRol,
                item.Activo));
        });
        
        return usuarios;
    });
}
