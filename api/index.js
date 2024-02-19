const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql2');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

var bcrypt = require('bcryptjs');

  // DBUtils.js
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'Booking_app',
  });

const jwtSecret = 'aniketpawase';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));





// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get('/test', (req, res) => {
    res.json('test ok')
});


//first EndPOint Register new User EndPoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Insert a new user into the MySQL database
    let sqlQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    connection.query(sqlQuery, [name, email, hashedPassword], (error, results, fields) => {
      if (error) {
        console.error('Error inserting user into MySQL: ' + error.message);
        res.status(500).json({ message: 'Error registering user' });
        return;
      }
      // Respond with the ID of the inserted user
      res.json({ userId: results.insertId ,name ,email ,password});
      
    });
  } catch (error) {
    // If an error occurs, respond with an error status code and message
    res.status(500).json({ message: error.message });
  }
});

//Second EndPoint Login 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let sqlQuery = `SELECT * FROM users WHERE email = ?`;
    connection.query(sqlQuery, [email], async (error, results) => {
      if (error) {
        console.error("Could not find User " + error.message);
        res.status(500).json({ message: "User Not Found" });
        return;
      }
      
      if (results.length === 0) {
        res.status(404).json({ message: "User Not Found" });
        return;
      }

      const user = results[0];
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }else{
    jwt.sign({email: email,
       ID: user.id, 
      },jwtSecret,{},(err,token)=>{
      if(err){
        throw err;
      }
      else{
      // Password is valid, send back user data
      console.log("user matched and logged In");
      res.cookie('token',token).json(user);
      }
    });

      }

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//THird EndPoint getting a profile Info
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) {
        throw err;
      }
      console.log(userData);
      connection.query(`SELECT id, name, email FROM users WHERE id = ?`,
        [userData.ID],
        (error, results) => {
          if (error) {
            throw error;
          } 
          if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
          }

          const { name, email, id } = results[0];
          res.json({ name, email, id });
        }
      );
    });
  } else {
    res.json('Not OK');
  }
});

// Close the MySQL connection when the Node.js process exits
process.on('exit', () => {
  connection.end();
});



app.listen(4000);
console.log("Server running on port 4000");