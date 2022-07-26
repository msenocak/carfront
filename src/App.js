import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Carshop
          </Typography>
        </Toolbar>
      </AppBar>
      {/* To show the login form, we have to render the Login component: */}
      console.log('Before the Login form');
      <Login />
    </div>
  );
}

export default App;
