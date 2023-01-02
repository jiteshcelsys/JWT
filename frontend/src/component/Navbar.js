import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >

        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [sign, setSign] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenSignup = () => {
    setSign(true);
  };


  const handleClickOpenSignupClose = () => {
    setSign(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const SubmitLogin = () => {
    try {
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        headers: 'application/json',
        data: {
          email: email,
          password: password
        }
      }).then((data) => {
        console.log(data);
        return data.data;
      }).then((x) => {
        localStorage.setItem("token", JSON.stringify(x.auth));
        localStorage.setItem('isLoggedIn', JSON.stringify(x.isLoggedIn));
        if (x.sucess) {
          history('/content');
        }
        else {
        
          history('/404');
        }
      })
      
    } catch (err) {
      history('/404');
      
    }

    setOpen(false)
  }

  const SubmitSignup = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:3000/signup',
      headers: 'application/json',
      data: {
        email: email,
        password: password
      }
    })
    setEmail('');
    setPassword('');
    setSign(false);

  }

  const handleClickOpenLogout = async () => {
    console.log(email);
    await axios({
      method: 'post',
      url: 'http://localhost:3000/logout',
      headers: 'application/json',
      data: {
        email: email,
        password: password
      }
    })
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('token', '');
    setEmail('');
    setPassword('');
    history('/');
  }
  const styleNavbar = {
    textDecoration: "none",
    color: "black",
    padding: '10px',
    fontSize: '600'
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >

            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

            </Typography>
            {(isLoggedIn === "false" || isLoggedIn === "undefined") ? <NavLink to='/' color="inherit" onClick={handleClickOpen} style={styleNavbar}>Login</NavLink> : null}
            {isLoggedIn === "false" || isLoggedIn === "undefined" ? <NavLink to='/signup' color="inherit" onClick={handleClickOpenSignup}
              style={styleNavbar}>Signup</NavLink> : null}
            {isLoggedIn === "true" ? <NavLink color="inherit" onClick={handleClickOpenLogout}
              style={styleNavbar}>Logout</NavLink> : null}
            {isLoggedIn === "true" ? <NavLink to='/user' color="inherit" style={styleNavbar}>User</NavLink> : null
            }</Toolbar>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
              Login Form
            </BootstrapDialogTitle>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} />
              <TextField id="filled-basic" label="Password" variant="filled"
                onChange={(e) => { setPassword(e.target.value) }} />
            </Box>
            <Button onClick={handleClose}>close</Button>
            <Button onClick={SubmitLogin}>submit</Button>
          </BootstrapDialog>
          <BootstrapDialog

            aria-labelledby="customized-dialog-title"
            open={sign}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClickOpenSignupClose}>
              Signup Form
            </BootstrapDialogTitle>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => { setEmail(e.target.value) }} />
              <TextField id="filled-basic" label="Password" variant="filled" onChange={(e) => { setPassword(e.target.value) }} />
            </Box>
            <Button onClick={handleClickOpenSignupClose}>close</Button>
            <Button onClick={SubmitSignup}>submit</Button>


          </BootstrapDialog>

        </AppBar>
      </Box>


    </>
  )

}
export default Navbar