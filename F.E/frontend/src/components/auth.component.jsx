/* eslint-disable no-unused-expressions */
import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';


export const authContext = createContext()
function Auth({children}){
    
    const [authTokens,setAuthTokens] = useState(() => 
        // eslint-disable-next-line no-unused-expressions
        localStorage.getItem( "authToken" ) ?  JSON.parse(localStorage.getItem("authTokens")) : null
    )

    const [user,setUser] = useState(() =>
        localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
    )

    const [loading,setLoading] = useState(true)
    const history = useHistory()

    const loginUser = async (email,password) => {
        const response = await fetch('http://127.0.0.1:8000/api/v1/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email,password
            })
        })
        const data = await response.json()
        console.log(data)

        if(response.status === 200){
            console.log('logged in')
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))

        }else{
            console.log(response.status)
            console.log('Intenal server err')
            alert('Error'+ response.status)
        }
    }
    const registerUser = async(email,username,password,password2) => {
        const response = await fetch('http://127.0.0.1:8000/api/v1/register',{
            method:"POST",
            headers:{
                'Content-Type':'applicxation/json'
            },
            body: JSON.stringify(email, username, password, password2)
        })
        if(response.status === 201){
            history.push('/login')
        }else{
            console.log(response.status)
            console.log('Internal Server err')
            alert("Failed to Register")
        }
    }

    return(
        <div>
        </div>
    )
}

export default Auth;