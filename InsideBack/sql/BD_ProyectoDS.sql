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
	cedula BIGINT UNSIGNED NOT NULL UNIQUE primary key,
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
	cedula BIGINT UNSIGNED NOT NULL UNIQUE primary key,
	rol VARCHAR(20),
    observaciones TEXT NULL,
    direccion VARCHAR(50) NULL
);

create table residente(
	cedula BIGINT UNSIGNED NOT NULL UNIQUE primary key,
    apartamento varchar(20) NULL,
    torre VARCHAR(30) NULL
);	

create table vehiculo(
	placa VARCHAR(10) NOT NULL UNIQUE primary key,
    cedulaDuenio BIGINT UNSIGNED NOT NULL UNIQUE
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
	cedulaPersona BIGINT UNSIGNED NOT NULL,
    idMovimiento  INT NOT NULL,
    primary key(cedulaPersona, idMovimiento)
);

--------------------------------------------------------------------------------
/*Declaración de Constraints*/
--------------------------------------------------------------------------------
alter table empleado add foreign key (cedula) references persona(cedula);

alter table residente add foreign key (cedula) references persona(cedula);

alter table vehiculo add foreign key (cedulaDuenio) references persona(cedula);

alter table movimiento add foreign key (placa) references vehiculo(placa);

alter table persona_movimiento add(
	foreign key (cedulaPersona) references persona(cedula),
    foreign key (idMovimiento) references movimiento(id)
);

-- insert Admin
insert into persona values(1234, 'admin@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Adams', 'Buitrago', 'Gonzales', "4444", 'Administrador');

insert into persona values(4321, 'Juan1@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Jose', 'Estrada', 'Velez', "4441", 'Empleado');
insert into persona values(1111, 'pablo@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Lina', 'Marcela', 'Gonzalez', 'Gil', "5555", 'Empleado');
insert into persona values(2222, 'isac@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Gustavo', 'Francisco', 'Petro', 'Urrego', "7777", 'Empleado');

insert into empleado values(4321, 'Aseador', '*', 'calle falsa 1234');
insert into empleado values(1111, 'Vigilante', 'Habla mucho', 'calle real 1111');
insert into empleado values(2222, 'Portero', 'turno nocturno', 'carrera 1234 numero 5');

insert into persona values(9898, 'Juan1fake@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Juan', 'Pedro', 'Marulanda', 'Garcia', "4441", 'Residente');
insert into persona values(5543, 'pablofake@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Alberto', 'Adolfo', 'Hernandez', 'Gonzales', "5555", 'Residente');
insert into persona values(8888, 'isacfake@gmail.com', '$2b$12$4NJy10lNK4DkUO25Ym1zVewPzZcgRtsfeOQomct5RLnAETh74Idea', 'Arnulfo', '', 'Perez', 'Gutierrez', "7777", 'Residente');

insert into Residente values(9898, 'A-401', 'Torre 1');
insert into Residente values(5543, 'B-502', 'Torre 3');
insert into Residente values(8888, 'B-505', 'Torre 5');

insert into noticia (titulo, linkImg, descripcion, fechaPublicacion) values('Jornada de fumigación', 'https://theressa.net/images/articles/61cfa330e5ec4-fumigacion-saneamiento-ambiental-1200x600.jpg', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, dui vel porta mollis, ligula justo gravida', STR_TO_DATE('2023-11-26 18:06:00', '%Y-%m-%d %H:%i:%s'));
insert into noticia (titulo, linkImg, descripcion, fechaPublicacion) values('Jueves de meditación', 'https://www.webconsultas.com/sites/default/files/styles/wch_image_schema/public/temas/yoga.jpg', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, dui vel porta mollis, ligula justo gravida', STR_TO_DATE('2023-11-27 12:30:00', '%Y-%m-%d %H:%i:%s'));
insert into noticia (titulo, linkImg, descripcion, fechaPublicacion) values('Mantenimiento zonas deportivas', 'https://www.cimelsa.com/wp-content/uploads/2021/12/Instalaciones-deportivas.jpg', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer facilisis, dui vel porta mollis, ligula justo gravida', STR_TO_DATE('2023-11-15 10:25:00', '%Y-%m-%d %H:%i:%s'));

insert into vehiculo values('acb-123', '4321');
insert into vehiculo values('yrg-764', '8888');
insert into vehiculo values('nfy-679', '9898');

insert into movimiento (fecha, porteria, tipo, placa) values(STR_TO_DATE('2023-11-26 20:06:00', '%Y-%m-%d %H:%i:%s'), 'sur', 'S', 'yrg-764');
insert into movimiento (fecha, porteria, tipo, placa) values(STR_TO_DATE('2023-11-28 13:04:00', '%Y-%m-%d %H:%i:%s'), 'sur', 'E', null);
insert into movimiento (fecha, porteria, tipo, placa) values(STR_TO_DATE('2023-11-23 11:11:00', '%Y-%m-%d %H:%i:%s'), 'sur', 'S', 'nfy-679');
insert into movimiento (fecha, porteria, tipo, placa) values(STR_TO_DATE('2023-11-23 23:17:00', '%Y-%m-%d %H:%i:%s'), 'sur', 'E', null);
insert into movimiento (fecha, porteria, tipo, placa) values(STR_TO_DATE('2023-11-23 18:22:00', '%Y-%m-%d %H:%i:%s'), 'sur', 'S', null);
insert into movimiento (fecha, porteria, tipo, placa) values(STR_TO_DATE('2023-11-23 12:43:00', '%Y-%m-%d %H:%i:%s'), 'sur', 'E', null);

insert into persona_movimiento values('4321','1');
insert into persona_movimiento values('8888','2');
insert into persona_movimiento values('9898','3');
insert into persona_movimiento values('1111','4');
insert into persona_movimiento values('2222','5');
insert into persona_movimiento values('5543','6');