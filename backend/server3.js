const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const jwtKey = 'secretKey';
app.use(express.json());
app.use(cors());



const bcrypt = require('bcrypt');


app.post('/signup', async (req, res) => {
  console.log(req.body);
  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const tokenS = undefined;
    const Insert_user = req.body.email;
    const Insert_Password = hashedPassword;
    const NewLogin = await pool.query("INSERT INTO details(email,password) VALUES($1,$2 ) RETURNING *  ", [Insert_user, Insert_Password])
    console.log(NewLogin);
    res.status(201).send('Added')
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/login', async (req, res) => {

  const userInfo = req.body.email;
  const userPassword = req.body.password;
  // console.log(userInfo)
  let accessToken;
  // const updateUser = await pool.query("UPDATE details  set token =$1 where email=$2  ", [true, userInfo]);
  const hash = await pool.query("SELECT email,password from DETAILS WHERE email = $1", [userInfo]);
  // console.log(hash.rows[0]?.email);
  const hashedUser = hash.rows[0]?.email
  const hashedPassword = hash?.rows[0]?.password;
  // console.log(hashedPassword);
  if (hashedPassword&&hashedUser) {
    bcrypt.compare(userPassword, hashedPassword, async (err, response) => {
      if (err) {
        console.log(err);
        return err;
      }
      if (response) {
        if (hashedUser === userInfo) {
          accessToken = jwt.sign(userInfo, jwtKey);
          res.status(200).json({ sucess: true, auth: accessToken, isLoggedIn: true });
          console.log('login request');
        }
      
      }
      else {
        return res.json({ sucess: false, message: 'password not valid' })
      }
    });
  }
  else{
    return res.json({ sucess: false, message: 'Email is not valid' })

  }
})

app.get('/auth', autheticateToken, async (req, res) => {
  console.log(req.authUser)
  try {
    const user = await pool.query("SELECT * FROM Details");
    const verifiedUser = user.rows.filter(value => value.email === req.authUser);
    if (verifiedUser[0].token === "false") {
      return res.status(200).json('Need To Login first');
    }
    else {
      res.status(200).json(verifiedUser);
    }
  } catch (err) {
    res.status(401).json('logout')
    console.log(err.message)
  }
})

app.post('/logout', async (req, res) => {
  try {
  //   const emailR = req.body.email;
  //   const user = await pool.query(`UPDATE details  set token=$1 where email=$2`, [false, emailR]);
    res.status(200).send('Logout successfull');

  } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send(err);
  }
})


function autheticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token === undefined || token === null) {
    return res.status(404);
  }
  const parsedToken = JSON.parse(token);
  jwt.verify(parsedToken, jwtKey, (err, data1) => {
    if (err) {
      return res.status(403).json('token tampered');

    }
    console.log(data1);
    req.authUser = data1;
    next();
  })
  // req.token = token;
}

app.listen(3000, () => {
  console.log('server is running at port 3000');
})