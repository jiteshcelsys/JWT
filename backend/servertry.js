const express = require('express');
const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt');

app.use(express.json());
app.post('/signup',async(req,res)=>{
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);
    const tokenS = undefined;
    const Insert_user =req.body.email;
    const Insert_Password = hashedPassword;
    
    
  } catch (err) {
    console.log(err.message)
    
  }

})

app.listen(3000,()=>{
  console.log('port is running at port 3000')
})