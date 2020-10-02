INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Allen", "DeHoff", 1);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Andre", "Young", 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Renner", 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jaime", "Meline", 3, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Marshall", "Mathers", 4, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Dave", "Burd", 5, 2);

INSERT INTO departments (name)
VALUES ("Management");

INSERT INTO departments (name)
VALUES ("Tech");

INSERT INTO departments (name)
VALUES ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 200000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Jr. Developer", 100000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 120000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Person", 90000, 1);
