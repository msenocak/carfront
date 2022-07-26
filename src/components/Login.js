import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Carlist from './Carlist';
import Snackbar from '@mui/material/Snackbar';

import { SERVER_URL } from '../constants.js';

function Login() {
  console.log('Inside the Login.js, beginning of login() function');
  const [user, setUser] = useState({
    username: '', 
    password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
  }
  
  const login = () => {
    console.log('Inside the Login.js, before the fetch(SERVER_URL.... call. body: ', JSON.stringify(user));
    fetch(SERVER_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => {
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        console.log('Inside the Login.js, inside fetch().then(), (jwtToken !== null). before setAuth(true)');
        setAuth(true);
      }
      else {
        console.log('Inside the Login.js, inside fetch().then(), (jwtToken == null). before setOpen(true)');
        setOpen(true);
      }
    })
    .catch(err => console.error(err))
  }

  if (isAuthenticated) {
    console.log('Inside the Login.js, isAuthenticated = true');
    return <Carlist />;
  }
  else {
    console.log('Inside the Login.js, isAuthenticated = false'); 
    return(
      <div>
        <h2>SERVER_URL: {SERVER_URL}</h2>	
        <Stack spacing={2} alignItems='center' mt={2}>
          <TextField 
            name="username"
            label="Username" 
            onChange={handleChange} />
          <TextField 
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}/>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={login}>
              Login
          </Button>
        </Stack>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username and password"
        />
      </div>
    );
  }
}

export default Login;
