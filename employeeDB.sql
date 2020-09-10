DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL, 
  title VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  salary VARCHAR(45) NOT NULL,
  manager VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (name, role, manager)
VALUES ("Human", "Krewella", "Dance");
INSERT INTO employees (name, role, manager)
VALUES ("asdf", "Krewasdvella", "Daavsdvnce");