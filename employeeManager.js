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
        "Add a department.",
        "Add a role.",
        "Remove an employee.",
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
            } else if (response.route === "Add an employee.") {
                addEmployee()
            } else if (response.route === "Add a department.") {
                addDeparment()
            } else if (response.route === "Add a role.") {
                addRole()
            } else if (response.route === "Remove an employee."){
                removeEmployee()
            } else if (response.route === "Exit") {
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
    {
        name: "role",
        type: "list",
        message: "What is this employee's role?",
        choices: findRoles()

    }
    // {
    //     name: "manager",
    //     type: "list",
    //     message: "Who is this employee's manager?",
    //     choices: [
    //         ------Array containing list of managers-----
    //     ]
    // }
]

function findRoles() {
    const roles = []
    connection.query("SELECT * FROM roles", function (err, res) {
        res.forEach(role => {
            roles.push(role.title)
        })
    })
    return roles
};

function addEmployee() {
    connection.query("SELECT * FROM roles", function (err, res) {
        inquirer.prompt(employeeQuestions)
            .then(function (newEmployee) {
                connection.query(
                    `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${newEmployee.firstName}", "${newEmployee.lastName}", ?)`, [res.find(role => role.title === newEmployee.role).id],
                    function (err, res) {
                        if (err) throw err;
                        console.log("Success!")
                        init()
                    })
            })
    })
}

const departmentQuestion = {
    name: "deptName",
    type: "input",
    message: "What department would you like to add?"
}

function addDeparment() {
    inquirer.prompt(departmentQuestion)
        .then(function (newDepartment) {
            connection.query(`INSERT INTO departments (name) VALUES ("${newDepartment.deptName}")`, function (err, res) {
                if (err) throw err
                console.log("Success!")
                init()
            })
        })
}

const roleQuestions = [
    {
        name: "title",
        type: "input",
        message: "What is the new role's title?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is this role's salary?"
    },
    {
        name: "department",
        type: "list",
        message: "What department does this role work in?",
        choices: findDepartments()
    }
]

function findDepartments() {
    const departments = []
    connection.query("SELECT * FROM departments", function (err, res) {
        res.forEach(dept => {
            departments.push(dept.name)
        })
        // console.log(departments)
    })
    return departments
    // console.log(departments)
};

function addRole() {
    connection.query("SELECT * FROM departments", function (err, res) {
        inquirer.prompt(roleQuestions)
            .then(function (newRole) {
                connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${newRole.title}", "${newRole.salary}", ?)`, [res.find(dept => dept.name === newRole.department).id], function (err, res) {
                    if (err) throw err
                    // console.log("Success!")
                    init()
                })
            })
    })
}

const employeeRemoveQuestion = {
    name: "employeeToRemove",
    type: "list",
    message: "Which employee would you like to remove?",
    choices: findEmployees()
}

function findEmployees(){
    const employees = []
    connection.query("SELECT * FROM employees", function (err, res) {
        res.forEach(emp => {
            employees.push(emp.first_name + " " + emp.last_name)
        })
        // console.log(departments)
    })
    return employees
    // console.log(departments)
}

function removeEmployee() {
    connection.query("SELECT * FROM employees", function(err, res){
        if (err) throw err
        inquirer.prompt(employeeRemoveQuestion)
        .then(function(employee){
            const employeeString = employee.employeeToRemove
            const splitEmployee = employeeString.split(" ")
            console.log(splitEmployee)
            connection.query(`DELETE FROM employees WHERE first_name = "${splitEmployee[0]}" AND last_name = "${splitEmployee[1]}"`)
            init()
        })
    })
}