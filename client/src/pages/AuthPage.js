import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";


const AuthPage = () => {

    let history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [token,setToken] = useState('')
    
    const loginHandler = async () => {
        if(email.length > 0 && password.length > 0){
            const res = await axios.post('/auth/login',{email,password})
            const store = res.data
            setToken(store)
            console.log(store)
            localStorage.setItem('login',JSON.stringify(store))
            if(store.token){
                history.push('/users')
            }
        }
    }

    const registerHandler = async () => {
        if(email.length > 0 && password.length > 0){
            await axios.post('/auth/register',{email,password})
        }
    }

    return (
             <div className="auth">
                 <div className="container">
                 <h1>Login</h1>
                <div className="input-field">
                    <input id="email" onChange={(e) => setEmail(e.target.value)}name="email" type="text" className="validate" required/>
                    <label htmlFor="email">email</label>
                    <span className="helper-text" data-error="input email"></span>
                </div>
                <div className="input-field">
                    <input id="password"  onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="validate" required/>
                    <label htmlFor="password">password</label>
                    <span className="helper-text" data-error="input password"></span>
                </div>
                <button className="btn waves-effect waves-light" onClick={loginHandler} type="submit">login
                    <i className="material-icons right">login</i>
                </button>
                <button style={{'marginLeft':'10px'}} onClick={registerHandler} className="btn waves-effect waves-light" type="submit">register
                </button>
                </div>
             </div>
    )
}

export default AuthPage