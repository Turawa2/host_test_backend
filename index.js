const express = require('express');
// const mysql = require('mysql2');
const cors = require('cors');
const Pool = require('pg').Pool
require('dotenv').config(); 


const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});

pool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error', err));
//trying to 


// Define a POST endpoint to handle the incoming data
// app.post('/submitData', (req, res) => {
//   const { name, password } = req.body;

//   // Validate if name and password are present
//   if (!name || !password) {
//     return res.status(400).json({ error: 'Name and password are required' });
//   }

//   // Insert data into the database
//   const insertQuery = 'INSERT INTO test (username, password) VALUES (?, ?)';
//   db.query(insertQuery, [name, password], (err, result) => {
//     if (err) {
//       console.error('Error inserting data into the database:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     const insertedData = {
//       id: result.insertId,
//       name: name,
//       password: password,
//     };

//     console.log('Data inserted successfully:', insertedData);
//     return res.status(200).json({ message: 'Data inserted successfully', data: insertedData });
//   });
// });


// Define a POST endpoint to handle the incoming data
app.post('/submitData', (req, res) => {
  const { name, password } = req.body;

  // Validate if name and password are present
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required' 
});
  }

  // Insert data into the database
  const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  pool.query(insertQuery, [name, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(result)

    const insertedData = {
      name: name,
      password: password,
    };

    // console.log('Data inserted successfully:', insertedData);
    return res.status(200).json({ message: 'Data inserted successfully', 
data: insertedData });
  });
});

// Define a GET endpoint to fetch all data from the database
// app.get('/fetchData', (req, res) => {
//   const selectQuery = 'SELECT * FROM test';
//   db.query(selectQuery, (err, results) => {
//     if (err) {
//       console.error('Error getting data from the database:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     return res.status(200).json(results);
//   });
// });


// Define a GET endpoint to fetch all data from the database
app.get('/fetchData', (req, res) => {
  const selectQuery = 'SELECT * FROM users';
  pool.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error getting data from the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(200).json(results.rows);
  });
});



// starting the port on 5000

app.listen(PORT, () => {
  console.log('App running on port', PORT);
});