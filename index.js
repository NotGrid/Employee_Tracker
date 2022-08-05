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
}
overview();