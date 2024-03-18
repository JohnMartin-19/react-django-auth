import {Route,Redirect} from 'react-router-dom';
import { useContext } from 'react';
import authContext from '../components/auth.component';

function PrivateRoute({children, ...rest}){
    let {user} = useContext(authContext)
    //using ternary operator, check if user is authenticated. else append children
    return <Route {...rest}>
        {!user ? 
            <Redirect to={{pathname: '/login',}} /> :
            children}
        
    </Route>
            
    
}
export default PrivateRoute