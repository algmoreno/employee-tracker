const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlalg23',
  database: 'employee_tracker'
});

module.exports = connection;