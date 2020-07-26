import React from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import {useEffect, useState } from 'react'
import axios from 'axios'

const EditUser = (props) => {

    const history = useHistory()
    const [token,setToken] = useState('')
    const [user,setUser] = useState({})

    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('login'))
        if(store){
            setToken(store.token)
            async function fetchData(){
                const res = await axios.post(`/users/${props.match.params.id}/data`,{id:props.match.params.id})
                setUser(res.data)
            }
            fetchData()
        }
    },[props.match.params.id])

    const editHandler = async (e) => {
        e.preventDefault()
        const name = e.target.elements[0].value
        const email = e.target.elements[1].value
        const password = e.target.elements[2].value
        await axios.post(`/users/${props.match.params.id}/edit`,{name,email,password,id:props.match.params.id},
        {headers:{
            authorization:token
        }})
        history.push('/users')
    }

    return(
        <div className="EditUser">
            <div className="container">
            <h1>Editing {user.name} </h1>
            <form onSubmit={(e) => editHandler(e)}>
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
                <button className="btn waves-effect waves-light" type="submit">Submit
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

export default EditUser