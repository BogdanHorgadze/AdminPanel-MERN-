import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const ResetPage = () => {
    const history = useHistory()
    const [email,setEmail] = useState('')

    const emailHandler = async () => {
        await axios.post('/auth/reset',{email})
        history.push('/auth')
    }

    return(
        <div className="Reset">
            <div className="container">
                <h1>Reset password</h1>
                <div class="row">
                    <div class="input-field col s12">
                    <input onChange={e => setEmail(e.target.value)} id="email" type="email" class="validate"/>
                    <label for="email">Email</label>
                </div>
                <button onClick={emailHandler} class="btn waves-effect waves-light" type="submit" name="action">reset
                    <i class="material-icons right">send</i>
                </button>
            </div>
            </div>
        </div>
    )
}

export default ResetPage