import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'

const ProfilePage = () => {

    const [token,setToken] = useState('')
    const [file,setFile] = useState('')
    const [img,setImg] = useState('')
    const [email,setEmail] = useState('')

    useEffect(()=>{
        const store = JSON.parse(localStorage.getItem('login'))
        setToken(store.token)

        async function fetchData (){
            const res = await axios.get('/profile',{headers:{authorization : store.token}})
            setImg(res.data.img)
            setEmail(res.data.email)
        }
        fetchData()
    },[])


    const fileHandler = async (e) => {
        let file = e.target.files[0]
        setFile(file)
    }

    const uploadHandler = async () => {

        const formdata = new FormData()
        formdata.append('avatar',file)


        const res = await axios.post('/profile',formdata,
        {
            headers:{
                authorization:token
            }
        })
        setImg(res.data.img)
        console.log(res)
    }



    return(
        <div className="profile">
            <div className="container">
            <div className="left">
            <h1>Profile photo</h1>
                {img  
                ?<div>
                    <img src={img} alt="img" width="300"/>
                </div>
                :<div>нет фото</div>
                }
            </div>
            <div className="right" style={{marginTop : '100px'}}>
            <span><h5>ваш email</h5>{email}</span>
                <div className="file-field input-field">
                    <div className="btn">
                        <span>File</span>
                        <input onChange={(e) => fileHandler(e)} name="avatar" type="file"/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                    </div>
                <button className="btn waves-effect waves-light" onClick={uploadHandler}>change photo</button>
                <div style={{marginTop:'20px'}}><NavLink to="/users">All Users</NavLink></div>
            </div>
            </div>
            
            
        </div>
    )
}

export default ProfilePage