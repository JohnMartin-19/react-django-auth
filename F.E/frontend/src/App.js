import { BrowserRouter as Router,Route,SWitch } from 'react-router-dom';
import './App.css';
import  {PrivateRoute} from './utils/PrivateRoute'
import {auth} from './components/auth.component'
import Homepage from './views/HomePage'
import Register from './views/Registerpage'
import Login from './views/Loginpage'
function App() {
  return (
    <div className="App">
      <h3>REACT-DJANGO AUTHENTICATION</h3>
    </div>
  );
}

export default App;
