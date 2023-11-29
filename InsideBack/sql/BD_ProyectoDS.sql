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

insert into persona values(1234, 'admin@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Adams', 'Buitrago', 'Gonzales', "4444", 'Administrador');
insert into persona values(4321, 'Juan1@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Jose', 'Estrada', 'Velez', "4441", 'Empleado');
insert into persona values(1111, 'pablo@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Adams', 'Buitrago', 'Gonzales', "5555", 'Empleado');
insert into persona values(2222, 'isac@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Adams', 'Buitrago', 'Gonzales', "7777", 'Empleado');

insert into empleado values(4321, 'Aseeador', '*', 'calle falsa 1234');
insert into empleado values(1111, 'Vigilante', 'Habla mucho', 'calle real 1111');
insert into empleado values(2222, 'Portero', 'turno nocturno', 'carrera 1234 numero 5');