DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL, 
  title VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  salary INT(10) NOT NULL,
  manager VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Bob","Nguyen","Sales","Fiance",70000, "Qua");
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Joen","Nasdfguyen","Salasdfes","Fiasdfance",70000, "Quasdf");
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Jo3","Nasdfguyen","Salafes","Fiance",70000, "Quasdf");
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("J3o3","Nasdfguyen","Salafe235s","Fi25ance",70000, "Quasd2f");5