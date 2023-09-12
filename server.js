var express = require('express')
var cors = require('cors')
var app = express()

const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const connection = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
 
});


app.use(cors())

app.get('/sneakers', function (req, res, next) {
connection.query(
'SELECT * FROM `sneakers` ',
  function(err, results, fields) {
    res.json({results});
    console.log(results); 
    
  }
);
})
app.get('/sneakers/:id', function (req, res, next) {
    const id= req.params.id;
      connection.query(
  'SELECT * FROM `sneakers` WHERE `id` = ?',
  [id],
  function(err, results) {
    res.json({results});
  }
);


})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})