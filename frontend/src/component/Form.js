import * as React from 'react';
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


export default function Form({handleAuth}) {
  const [open, setOpen] = React.useState(false);
  const [sign, setSign] = React.useState(false);
  const [logout, setLogout] = React.useState(false)
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    setLogout(true);
  }
  const handleClickOpenSignup = () => {
    setSign(true);
  };
  const handleLogoutClose = () => {
    setLogout(false);
  }

  const handleClickOpenSignupClose = () => {
    setSign(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const SubmitLogin = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: 'application/json',
      data: {
        email: email,
        password: password
      }
    }).then((data)=> {
      console.log(data);
      handleAuth(data.data.auth);
    })
    setEmail('');
    setPassword('');
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
    await axios({
      method: 'post',
      url: 'http://localhost:3000/logout',
      headers: 'application/json',
      data: {
        email: email,
        password: password
      }
    })
    setLogout(false);
  }

  return (
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
          <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          <Button color="inherit" onClick={handleClickOpenSignup}>signup</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
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
        <BootstrapDialog

          aria-labelledby="customized-dialog-title"
          open={logout}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleLogout}>
            Logout Form
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
          <Button onClick={handleLogoutClose}>close</Button>
          <Button onClick={handleClickOpenLogout}>submit</Button>


        </BootstrapDialog>
      </AppBar>
    </Box>
  );
}