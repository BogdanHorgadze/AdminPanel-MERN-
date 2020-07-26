import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'

const UserPage = (props) => {
    const [user,setUser] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const res = await axios.get(`/users/${props.match.params.id}`)
            setUser([res.data])
        }
        fetchData()
    },[props.match.params.id])


    


    const dataRender = () => {
        return user.map((item,i) => {
            return(
                <tbody key={i}> 
                    <tr>
                    <td>{i+1}</td>
                    <td>{item.name}</td>
                    <td>
                        {item.password}
                    </td>
                    <td>
                        {item.email}
                    </td>
                    <td><NavLink to={`/users/${props.match.params.id}/edit`}>edit user</NavLink></td>
                    </tr>
                </tbody>
            )
        })
    }


    return (
        <div className="user">
             <div className="container">
                <table>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>username</th>
                    <th>password</th>
                    <th>email</th>
                    <th>edit</th>
                    </tr>
                </thead>
                {dataRender()}
                </table>
               <div><NavLink to="/users">all users</NavLink></div>
                <div><NavLink to="/users/create">create user</NavLink></div>
            </div>
        </div>
    )
}

export default UserPage