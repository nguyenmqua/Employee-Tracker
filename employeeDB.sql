DROP DATABASE IF EXISTS employee;
CREATE DATABASE employee;

USE employee;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary INT NULL,
  department_id INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_RoleDepartment FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT, 
  info VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT  NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_EmployeeRole FOREIGN KEY (role_id)
  REFERENCES role(id),
  CONSTRAINT FK_EmployeeManger FOREIGN KEY (manager_id)
    REFERENCES manager(id)
);


SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
SELECT * FROM manager;


