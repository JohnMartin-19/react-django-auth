import { BrowserRouter as Router,Route,SWitch } from 'react-router-dom';
import './App.css';
import  {PrivateRoute} from './utils/PrivateRoute'
import {auth} from './components/auth.component'
import Homepage from './views/HomePage'
import Register from './views/Registerpage'
import Login from './views/Loginpage'
function App() {
  return (
    <Router>
      <auth/>
    </Router>
  );
}

export default App;
