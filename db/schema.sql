DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

-- create table for departments, roles, and employees

-- dep needs dep names and ids
CREATE TABLE departments (
    id INT NOT NULL,
    name VARCHAR(25), 
);
-- roles needs job title, rold id, dep where its belongs to, and salary
CREATE TABLE roles(
    title VARCHAR(25),
    id INT NOT NULL,
    department INT,
    salary INT,
);
-- emp needs ids, first and last names, job titles, dep, salaries, and managers name
CREATE TABLE employees(
    id INT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    title INT,
    department INT,
    salary INT,
    manager INT,
);