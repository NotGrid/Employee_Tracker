const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// prompt general questions

function overview() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selectedOption',
            message: 'Select an option',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
        },
    ]).then(({selectedOption}) => {
        if(selectedOption === 'View all departments') {
            viewAllDepartments();
        } else if(selectedOption === 'View all roles') {
            viewAllRoles();
        } else if(selectedOption === 'View all employees') {
            viewAllEmployees();
        } else if(selectedOption === 'Add a department') {
            addADepartment();
        }else if(selectedOption === 'Add a role') {
            addARole();
        }else if(selectedOption === 'Add an employee') {
            addAnEmployee();
        }else {
            updateRole();
        }
    })
};
overview();