DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL, 
  title VARCHAR(45) NULL,
  department VARCHAR(45) NOT NULL,
  salary INT(10) NOT NULL,
  manager VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Bob","Smith","Front Desk","Customer Service", 45000, "Dave");
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Eric","Fitzpatrick","Front Desk","Customer Service",55000, "Janeth");
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Joe","Elway","Accountant","Fiance",90000, "Dave");
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Bob","Berry","Event Coordinator","Customer Service",80000, "Jerry");

