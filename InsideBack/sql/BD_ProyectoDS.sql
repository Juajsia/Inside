/*
tablas:
	- persona
	- vehiculo
	- noticias
	- movimientos
	- persona-Movimiento
*/

--------------------------------------------------------------------------------
/*Creación de la base de Datos*/
--------------------------------------------------------------------------------
Drop database if exists bd_Inside;
create database bd_Inside;
use bd_Inside;

--------------------------------------------------------------------------------
/*Declaración de las Tablas*/
--------------------------------------------------------------------------------
create table persona(
	cedula INT NOT NULL UNIQUE primary key,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    primerNombre VARCHAR(30) NOT NULL,
    segundoNombre VARCHAR(30) NULL,
    primerApellido VARCHAR(30) NOT NULL,
    segundoApellido VARCHAR(30) NOT NULL,
    telefono VARCHAR(10) NULL,
    rol VARCHAR(20) NOT NULL
);

create table empleado(
	cedula INT NOT NULL UNIQUE primary key,
	rol VARCHAR(20),
    observaciones TEXT NULL,
    direccion VARCHAR(50) NULL
);

create table vehiculo(
	placa VARCHAR(10) NOT NULL UNIQUE primary key,
    cedulaDuenio INT NOT NULL UNIQUE
);

create table noticia (
	id INT NOT NULL UNIQUE AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    linkImg TEXT NULL,
    descripcion TEXT NOT NULL,
    fechaPublicacion datetime NOT NULL
);

create table movimiento(
	id INT NOT NULL UNIQUE AUTO_INCREMENT primary key,
    fecha datetime not null,
    porteria VARCHAR(20) NOT NULL,
    tipo CHAR NOT NULL,
    placa VARCHAR(10) NULL
);

create table persona_movimiento(
	cedulaPersona INT NOT NULL,
    idMovimiento  INT NOT NULL,
    primary key(cedulaPersona, idMovimiento)
);

--------------------------------------------------------------------------------
/*Declaración de Constraints*/
--------------------------------------------------------------------------------
alter table empleado add foreign key (cedula) references persona(cedula);

alter table vehiculo add foreign key (cedulaDuenio) references persona(cedula);

alter table movimiento add foreign key (placa) references vehiculo(placa);

alter table persona_movimiento add(
	foreign key (cedulaPersona) references persona(cedula),
    foreign key (idMovimiento) references movimiento(id)
);
