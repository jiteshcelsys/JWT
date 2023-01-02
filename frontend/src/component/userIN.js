import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import SecretPage from "./SecretPage";
export const UserIn = () => {
  const token = localStorage.getItem('token');
  const [value, setValue] = useState([]);
  const history = useNavigate();
  const getAuth = async () => {
    console.log(token);
    if (token) {
      try {
        await axios({
          method: 'GET',
          url: 'http://localhost:3000/auth',
          headers: { "authorization": `bearer ${token}` }
        }).then((data) => {
          console.log(data);
          setValue(data.data);

        }).catch((err) => {
          console.log(err);
        })

      } catch (error) {
        console.log("ERRO occured user not login")

      }
    }

  }
  const styleNavbar = {
    textDecoration: "none",
    padding: '10px',
    fontSize: '600',
    backgroundColor:"#1976d2",
    color:"#fff",
    borderRadius:"10px 0",margin:"5px"
    
   
  }

  return (
    <>
  <h1>User Email</h1>
  <NavLink to='/content' style={styleNavbar}>Homepage</NavLink>
      {value.map((data) => {
        return (
          <>
            <ul key={data.id_}>
              <li> Email: {data.email}</li>
            <SecretPage/>
            </ul></>

        )
      })}

    
      <button onClick={getAuth}>CLick here </button>
    </>
  )
}