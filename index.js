const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the database.`)
);
// prompt general questions

function overview() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectedOption',
            message: 'Select an option',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        },
    ]).then(({ selectedOption }) => {
        if (selectedOption === 'View all departments') {
            viewAllDepartments();
        } else if (selectedOption === 'View all roles') {
            viewAllRoles();
        } else if (selectedOption === 'View all employees') {
            viewAllEmployees();
        } else if (selectedOption === 'Add a department') {
            addADepartment();
        } else if (selectedOption === 'Add a role') {
            addARole();
        } else if (selectedOption === 'Add an employee') {
            addAnEmployee();
        } else {
            updateRole();
        }
    })
};

async function viewAllDepartments() {
    const dept = await db.promise().query('SELECT * FROM departments');
    console.table(dept[0]);
    overview();
};

async function viewAllRoles() {
    const role = await db.promise().query('SELECT * FROM roles');
    console.table(role[0]);
    overview();
};

async function viewAllEmployees() {
    const employ = await db.promise().query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id');
    console.table(employ[0]);
    overview();
};

async function addADepartment() {
    const userInput = await inquirer.prompt([{
        type: 'input',
        message: 'What is the department title?',
        name: 'name',
    }]);
    const data = await db.promise().query('INSERT INTO departments SET ?', userInput);
    console.log(data);
    overview();
};

async function addARole() {
    const departments = await db.promise().query('SELECT name AS name, id AS value FROM departments');
    const userInput = await inquirer.prompt([{
        type: 'input',
        message: 'What is the role title?',
        name: 'title',
    },
    {
        type: 'list',
        choices: departments[0],
        message: 'What is the department?',
        name: 'department_id',
    },
    {
        type: 'input',
        message: 'What is the salary?',
        name: 'salary',
    }]);
    const data = await db.promise().query('INSERT INTO roles SET ?', userInput);
    console.log(data)
    overview();
};

async function addAnEmployee() {
    const roles = await db.promise().query('SELECT title AS name, id AS value FROM roles');
    const manager_id = await db.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employees");
    const userInput = await inquirer.prompt([{
        type: 'input',
        message: 'What is the employee first name?',
        name: 'first_name',
    },
    {
        type: 'input',
        message: 'What is the employee last name',
        name: 'last_name',
    },
    {
        type: 'list',
        message: 'What is the employee role?',
        choices: roles[0],
        name: 'role_id',
    },
    {
        type: 'list',
        message: 'Who is the employee direct manager?',
        choices: manager_id[0],
        name: 'manager_id',
    }]);
    
    const data = await db.promise().query('INSERT INTO employees SET ?', userInput);
    console.log(data);
    overview();
};

async function updateRole() {
    const updateEmployee = await db.promise().query("SELECT CONCAT(first_name, ' ', last_name) AS name FROM employees");
    const updateRole = await db.promise().query('SELECT title AS name FROM roles');
    const userInput = await inquirer.prompt([{
        type: 'list',
        message: 'Which employee would you like to change?',
        choices: updateEmployee[0],
        name: 'name',
    },
    {
        type: 'list',
        message: 'What is the new role?',
        choices: updateRole[0],
        name: 'title'
    }]);
    // need to complete updateRole---------------
};
overview();