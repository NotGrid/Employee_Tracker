DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

-- create table for departments, roles, and employees

-- dep needs dep names and ids
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) 
);
-- roles needs job title, rold id, dep where its belongs to, and salary
CREATE TABLE roles(
    title VARCHAR(30),
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE,
    salary DECIMAL
);
-- emp needs ids, first and last names, job titles, dep, salaries, and managers name
CREATE TABLE employees(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees (id) ON DELETE SET NULL
);