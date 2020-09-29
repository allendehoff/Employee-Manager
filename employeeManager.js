var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
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
        "Exit"
    ]
}

function init() {
    inquirer.prompt(intialize)
        .then(function (response) {
            if (response.route === "View all employees."){
                viewEmployees()
            } else if (response.route === "View all departments."){
                viewDepartments()
            } else if (response.route === "View all roles."){
                viewRoles()
            } else if (response.route --- "Exit."){
                connection.end()
            }
        })
}

function viewEmployees(){
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

function viewDepartments(){
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

function viewRoles(){
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}