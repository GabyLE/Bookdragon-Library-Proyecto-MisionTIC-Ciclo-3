USE Comercializadora;

DROP VIEW IF EXISTS vVenta;
DROP VIEW IF EXISTS vProducto;
DROP VIEW IF EXISTS vUsuario;

DROP PROCEDURE IF EXISTS spListarUsuarios;
DROP PROCEDURE IF EXISTS spActualizarUsuario;
DROP PROCEDURE IF EXISTS spValidarAccesoUsuario;
DROP PROCEDURE IF EXISTS spAgregarUsuario;
DROP PROCEDURE IF EXISTS spListarVentas;
DROP PROCEDURE IF EXISTS spActualizarVenta;
DROP PROCEDURE IF EXISTS spBuscarVentas;
DROP PROCEDURE IF EXISTS spListarProductos;
DROP PROCEDURE IF EXISTS spActualizarProducto;
DROP PROCEDURE IF EXISTS spBuscarProductos;
DROP PROCEDURE IF EXISTS spActualizarClaveUsuario;



-- ***** USUARIO *****

-- ** Procedimiento almacenado para listar USUARIOS
DELIMITER //
CREATE VIEW vUsuario
AS
SELECT Usuario.Id, Usuario.Usuario, Usuario.Nombre, Rol.Rol, EstadoUsuario.Estado
    FROM Usuario
        JOIN Rol ON  Usuario.IdRol = Rol.Id
        JOIN EstadoUsuario ON Usuario.IdEstado = EstadoUsuario.Id;
        
CREATE PROCEDURE spListarUsuarios()
BEGIN
	SELECT *
		FROM vUsuario
		ORDER BY Id;
END//
-- ** Procedimiento almacenado para agregar o modificar USUARIO

CREATE PROCEDURE spActualizarUsuario(
IN IdUsuario int,
IN Nombre varchar(50),
IN IdRol int,
IN IdEstado bool
)
BEGIN
		UPDATE Usuario
			SET 
            Nombre = Nombre,
			IdRol = IdRol,
            IdEstado = IdEstado
			WHERE Id =  IdUsuario;
END//

CREATE PROCEDURE spAgregarUsuario(
IN IdUsuario int,
IN UsuarioA varchar(100),
IN ClaveA varchar(8)
)
BEGIN
	IF IdUsuario<=0 THEN
		INSERT INTO Usuario
			(
			Usuario, Nombre, Clave, IdRol, IdEstado
			)
			VALUES(
			UsuarioA, 'Nuevo Usuario', ClaveA, 3 , 1
			);
	END IF;
    SELECT Id, Usuario, Nombre, IdRol, IdEstado
		FROM Usuario
		WHERE Usuario=UsuarioA
			AND Clave=ClaveA;
    
END//

CREATE PROCEDURE spActualizarClaveUsuario(
IN UsuarioA varchar(50),
IN ClaveA varchar(100))
BEGIN
UPDATE Usuario
SET Clave = ClaveA
    WHERE Usuario=UsuarioA;
END//

CREATE PROCEDURE spValidarAccesoUsuario(
IN UsuarioV varchar(50),
IN ClaveV varchar(50)
)
BEGIN
	SELECT Id, Usuario, Nombre, IdRol, IdEstado
		FROM Usuario
		WHERE Usuario=UsuarioV
			AND Clave=ClaveV;
END//

-- ***** VENTA *****

CREATE VIEW vVenta
AS
SELECT Venta.Id, (Producto.ValorUnitario * Venta.Cantidad) as Total, EstadoVenta.Estado, Venta.IdProducto, Producto.Nombre as NombreProducto, Producto.ValorUnitario, Venta.Cantidad, Venta.Fecha, DocCliente as ClienteDocumento, NombreCliente, Usuario.Id as IdUsuario, Usuario.Nombre as NombreUsuario
    FROM Venta
        JOIN Producto ON Producto.Id = Venta.IdProducto
        join Usuario on Usuario.Id = Venta.IdUsuario
        join EstadoVenta ON EstadoVenta.Id = Venta.IdEstado;
    
-- ** Procedimiento almacenado para listar VENTAS

CREATE PROCEDURE spListarVentas()
BEGIN
	SELECT *
		FROM vVenta
		ORDER BY Id desc;
END//

-- ** Procedimiento almacenado para agregar o modificar VENTA y VENTADETALLE

CREATE PROCEDURE spActualizarVenta(
IN IdVenta int,
IN IdCliente varchar(15),
IN NombreCliente varchar(50),
IN Fecha date,
IN IdUsuario int,
IN IdProducto int,
IN Cantidad int,
IN IdEstado int
)
BEGIN
	IF IdVenta<=0 THEN
		INSERT INTO Venta
			(
			DocCliente, NombreCliente, Fecha, IdUsuario,IdProducto, Cantidad, IdEstado
			)
			VALUES(
			IdCliente, Nombrecliente, Fecha, IdUsuario,IdProducto, Cantidad, IdEstado
			);
	ELSE
		UPDATE Venta
			SET DocCliente = IdCliente,
            NombreCliente = NombreCliente,
            Fecha = Fecha,
            IdUsuario = IdUsuario,
			IdProducto = IdProducto,
            Cantidad = Cantidad,
			IdEstado = IdEstado
			WHERE Id = IdVenta;
	END IF;
END//

-- ** Procedimiento almacenado para buscar una VENTA
CREATE PROCEDURE spBuscarVentas(
IN Dato varchar(50),
IN Tipo int
)
BEGIN
	DECLARE InstruccionSQL varchar(1000);
	SET Dato=CONCAT(char(39),Dato,'%',char(39));
	SET InstruccionSQL='SELECT * FROM vVenta';
	IF Tipo=0 THEN
		SET InstruccionSQL=CONCAT(InstruccionSQL,' WHERE Id LIKE ',Dato,' AND Id>0');
	ELSEIF Tipo=1 THEN
		SET InstruccionSQL=CONCAT(InstruccionSQL,' WHERE NombreCliente LIKE ',Dato,' AND Id>0');
	ELSEIF Tipo=2 THEN
		SET InstruccionSQL=CONCAT(InstruccionSQL,' WHERE ClienteDocumento LIKE ',Dato,' AND Id>0');
	END IF;
	SET InstruccionSQL=CONCAT(InstruccionSQL,' ORDER BY Id');

	SET @InstruccionSQL=InstruccionSQL;
	PREPARE ejecucion FROM @InstruccionSQL;
	EXECUTE ejecucion;
	DEALLOCATE PREPARE ejecucion;

END//

-- ***** PRODUCTO *****

CREATE VIEW vProducto
AS
SELECT Producto.Id, Producto.Nombre, Producto.ValorUnitario, EstadoProducto.Estado
    FROM Producto
        JOIN EstadoProducto ON  Producto.Estado = EstadoProducto.Id;

    
-- ** Procedimiento almacenado para listar VENTAS

CREATE PROCEDURE spListarProductos()
BEGIN
	SELECT *
		FROM vProducto
		ORDER BY Id;
END//

-- ** Procedimiento almacenado para agregar o modificar VENTA y VENTADETALLE

CREATE PROCEDURE spActualizarProducto(
IN IdProducto int,
IN Nombre varchar(100),
IN ValorUnitario int,
IN Estado int
)
BEGIN
	IF IdProducto<=0 THEN
		INSERT INTO Producto
			(
			Nombre, ValorUnitario, Estado
			)
			VALUES(
			Nombre, ValorUnitario, Estado
			);
	ELSE
		UPDATE Producto
			SET Nombre = Nombre,
            ValorUnitario = ValorUnitario,
            Estado = Estado
			WHERE Id = IdProducto;
	END IF;
END//

-- ** Procedimiento almacenado para buscar una VENTA
CREATE PROCEDURE spBuscarProductos(
IN Dato varchar(50),
IN Tipo int
)
BEGIN
	DECLARE InstruccionSQL varchar(1000);
	SET Dato=CONCAT(char(39),Dato,'%',char(39));
	SET InstruccionSQL='SELECT * FROM vProducto';
	IF Tipo=0 THEN
		SET InstruccionSQL=CONCAT(InstruccionSQL,' WHERE Id LIKE ',Dato,' AND Id>0');
	ELSEIF Tipo=1 THEN
		SET InstruccionSQL=CONCAT(InstruccionSQL,' WHERE Nombre LIKE ',Dato,' AND Id>0');
	END IF;
	SET InstruccionSQL=CONCAT(InstruccionSQL,' ORDER BY Id');

	SET @InstruccionSQL=InstruccionSQL;
	PREPARE ejecucion FROM @InstruccionSQL;
	EXECUTE ejecucion;
	DEALLOCATE PREPARE ejecucion;

END//