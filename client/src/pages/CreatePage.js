import React from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

const CreateUser = (props) => {
    
    let history = useHistory()
    const [token,setToken] = useState('')

    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('login'))
        setToken(store.token)
    },[])

    const createHandler = async (e) => {
        e.preventDefault()
        const name = e.target.elements[0].value
        const email = e.target.elements[1].value
        const password = e.target.elements[2].value
        await axios.post('/users/create',{name , email , password},{
            headers:{
                authorization:token
            }
        })
        history.push('/users')
    }
    
    return(
        <div className="createUser">
            <div className="container">
            <h1>Create new user</h1>
            <form onSubmit={(e) => createHandler(e)}>
                <div className="input-field">
                    <input id="name" name="name" type="text" className="validate" required/>
                    <label htmlFor="name">name</label>
                    <span className="helper-text" data-error="input name"></span>
                </div>
                <div className="input-field">
                    <input id="email" name="email" type="text" className="validate" required/>
                    <label htmlFor="email">email</label>
                    <span className="helper-text" data-error="input email"></span>
                </div>
                <div className="input-field">
                    <input id="password" name="password" type="password" className="validate" required/>
                    <label htmlFor="password">password</label>
                    <span className="helper-text" data-error="input password"></span>
                </div>
                <button className="btn waves-effect waves-light" type="submit">
                     Submit
                    <i className="material-icons right">send</i>
                </button>
             </form>
             <div className="link" style={{'marginTop': '10px'}}>
                 <NavLink to="/users">all users</NavLink>
             </div>
            </div>
        </div>
    )
}

export default CreateUser