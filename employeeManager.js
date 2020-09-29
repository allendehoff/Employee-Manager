const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "zaq11XSW@@1",
    database: "employeeDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // run the start function after the connection is made to prompt the user;
    // connection.end()
    init()
});

const intialize = {
    name: "route",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all employees.",
        "View all departments.",
        "View all roles.",
        "Add an employee.",
        "Exit"
    ]
}

function init() {
    inquirer.prompt(intialize)
        .then(function (response) {
            if (response.route === "View all employees.") {
                viewEmployees()
            } else if (response.route === "View all departments.") {
                viewDepartments()
            } else if (response.route === "View all roles.") {
                viewRoles()
            } else if (response.route === "Add an employee."){
                addEmployee()
            }
            else if (response.route === "Exit") {
                connection.end()
            }
        })
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

const employeeQuestions = [
    {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
    },
    // {
    //     name: "role",
    //     type: "input",
    //     message: "What is this employee's role?"
    // },
    // {
    //     name: "salary",
    //     type: "input",
    //     message: "What is this employee's salary?"
    // },
    // {
    //     name: "manager",
    //     type: "list",
    //     message: "Who is this employee's manager?",
    //     choices: [
    //         ------Array containing list of managers-----
    //     ]
    // }
]
function addEmployee(){
    inquirer.prompt(employeeQuestions)
    .then(function(newEmployee){
        connection.query(
            `INSERT INTO employees (first_name, last_name) VALUES ("${newEmployee.firstName}", "${newEmployee.lastName}")`,
            function(err, res){
                if (err) throw err;
                // res.send()
                init()
            })
    })
}