import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

const PasswordPage = (props) => {
    const history = useHistory()
    const [password,setPassword] = useState('')
    const [userId,setUserId] = useState('')


    useEffect(()=>{
        async function fetchData(){
            const res = await axios.get(`/auth/password/${props.match.params.token}`)
            if(res.data.user){
                setUserId(res.data.user.userId)
            }
        }
        fetchData()
    },[])



    const passwordHandler = async () => {
        await axios.post(`/auth/password`,{password,userId})
        history.push('/auth')
    }

    return(
        <div className="Reset">
            <div className="container">
                <h1>New password</h1>
                <div className="row">
                    <div className="input-field col s12">
                    <input onChange={e => setPassword(e.target.value)} id="password" type="password" className="validate" required/>
                    <label htmlFor="email">Password</label>
                </div>
                <button onClick={passwordHandler} className="btn waves-effect waves-light" type="submit" name="action">new password 
                    <i className="material-icons right">send</i>
                </button>
            </div>
            </div>
        </div>
    )
}

export default PasswordPage