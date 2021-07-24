const connection = require('./config/connection');
const inquirer = require('inquirer');
const { connect } = require('./config/connection');

function init() {
  startQuestions();
}
function startQuestions() {
  inquirer.prompt(
    {
      type: 'list',
      name: 'option',
      message: 'Please select an option',
      choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role'
      ]
    },
  )
    .then(results => {
      if (results.option === 'View all Departments') {
          connection.query('SELECT * FROM department', (err, deptTable) => {
            console.table(deptTable)
            if (deptTable.length < 1) {
              console.log("Table is empty!")
            }
      })
    }

      else if (results.option === 'View all Roles') {
          connection.query('SELECT * FROM role', (err, roleTable) => {
            console.table(roleTable)
            if (roleTable.length < 1) {
              console.log("Table is empty!")
            }
          })
      }

      else if (results.option === 'View all Employees') {
        connection.query('SELECT * FROM employee', (err, employeeTable) => {
          console.table(employeeTable)
          if (employeeTable.length < 1) {
            console.log("Table is empty!")
          }
        })
      }

      else if (results.option === 'Add a Department') {
        inquirer.prompt(
          {
            type: 'text',
            name: 'name',
            message: 'What department would you like to add?'
          }
        )
          .then(results => {
            console.log(results)

            connection.query('INSERT INTO department SET ? ', results, (err, results) => {
              if (err) {
                console.log('error')
              }
              console.log('Department Added')
            })
          })
      }

      else if (results.option === 'Add a Role') {
        connection.query('SELECT * FROM department', (err, deptTable) => {
          if (deptTable.length > 0) {
            console.table(deptTable)
            inquirer.prompt([
              {
                type: 'text',
                name: 'title',
                message: 'Enter title of the role'
              },
              {
                type: 'text',
                name: 'salary',
                message: 'Enter salary'
              },
              {
                type: 'text',
                name: 'department_id',
                message: 'Enter the department id (see table above)'
              }])
              .then(role => {
                console.log(role)

                connection.query('INSERT INTO role SET ? ', role, (err, row) => {
                  if (err) {
                    console.log(err)
                    return
                  }
                  else {
                    console.log('Role Added')
                  }
                })
              })
          }
          else {
            console.log(`
            ----------------------------------------
            You need to create the department first!
            ----------------------------------------`
            );
            startQuestions();
          }

        })

      }

      else if (results.option === 'Add an Employee') {
        connection.query('SELECT * FROM role', (err, roleTable) => {
          if (roleTable.length > 0) {
            console.table(roleTable)
            inquirer.prompt([
              {
                type: 'text',
                name: 'first_name',
                message: "Enter employee's first name"
              },
              {
                type: 'text',
                name: 'last_name',
                message: "Enter employee's last name"
              },
              {
                type: 'text',
                name: 'role_id',
                message: "Enter id that matches the employee's role (see table above)"
              }
              // {
              //   type: 'text',
              //   name: 'manager_id',
              //   message: "Enter the employee manager's id (see table above)"
              // }
            ])
              .then(employee => {
                console.log(employee)

                connection.query('INSERT INTO employee SET ? ', employee, (err, row) => {
                  if (err) {
                    console.log(err)
                    return
                  }
                  else {
                    console.log('Employee Added')
                  }
                })
              })
          }
          else {
            console.log(`
            ----------------------------------------
            You need to add a role first!
            ----------------------------------------`
            );
            startQuestions();
          }

        })
      }

      else if (results.option === 'Update an Employee Role') {
        connection.query('SELECT * FROM role', (err, roleTable) => {
          console.table(roleTable)
        })
        inquirer.prompt([
          {
            type: 'text',
            name: 'role_id',
            message: "Enter the employee's new role id"
          }
        ])
        .then(newRole => {
          connection.query('UPDATE employee SET role_id = ? WHERE id = ?', newRole, (err, results) => {
            if (err) {
              console.log(err)
              return
            }
            else {
              console.log('Employee role updated')
            }
          })
        })

      }
    })
}

init();