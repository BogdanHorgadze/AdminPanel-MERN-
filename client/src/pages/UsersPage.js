import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import {useEffect,useState} from 'react'

const Users = () => {
    
    
    const [users,setUsers] = useState([])
    const [token,setToken] = useState('')

   
    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('login'))
        if(store){
          setToken(store.token)
            async function fetchData(){
            const res = await axios.get('/users',{headers:{authorization:store.token}})
            setUsers(res.data)
            }
            fetchData()
        }
    },[])

    const deleteHandler = async (id) => {
        await axios.delete('/users',{data:{id},headers:{authorization:token}})
        const data = users.filter((item) => item._id !== id)
        setUsers(data)
    }

    const dataRender = () => {
        return users.map((item,i) => {
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
                    <td><NavLink to={`/users/${item._id}`}>view profile</NavLink></td>
                    <td>
                    <button type="submit" onClick={() => deleteHandler(item._id)}>delete</button>
                   
                                 
                    </td>
                    </tr>
                    
                </tbody>
            )
        })
    }
    return (
        <div className="users">
             <div className="container">
                 <table>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>user</th>
                    <th>password</th>
                    <th>email</th>
                    <th>profile</th>
                    <th>destroy</th>
                    </tr>
                </thead>
                {dataRender()}
                </table>
            <NavLink to="/users/create">create new user</NavLink>
            <div><NavLink to="/profile">profile</NavLink></div>
            <div><NavLink to="/auth">Auth</NavLink></div>
    </div>
        </div>
    )
}

export default Users