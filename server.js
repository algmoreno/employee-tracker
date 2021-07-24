const connection = require('./config/connection');
const inquirer = require('inquirer');

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
        connection.query('SELECT * FROM department', results, (err, results) => {
          if (err) {
            console.log(err)
          }
          console.log(results)
        })
      }

      else if (results.option === 'View all Roles') {

      }

      else if (results.option === 'View all Employees') {

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
                message: 'Enter the department id from table above'
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
        inquirer.prompt(
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
            message: "What is this employee's role?"
          },
          {
            type: 'text',
            name: 'manager_id',
            message: "Enter the employee's manager?"
          }
        )
          .then(results => {
            console.log(results)

            connection.query('INSERT INTO role SET ? ', results, (err, results) => {
              if (err) {
                console.log('error')
              }
              console.log('Employee Added')
            })
          })
      }

      else if (results.option === 'Update an Employee Role') {

      }
    })
}

init();