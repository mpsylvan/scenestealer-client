import React from 'react';
import {Card, Button} from 'react-bootstrap';


export const UserInfo = ({email, username, birthdate,  handleDeregister}) =>{

    const bd = birthdate.split("T")[0];

    return(
            <>
                <h4> Username: {username}</h4>   
                <h4> Email: {email}</h4>
                <h4> Birthday: {bd}</h4>
                <Button variant = "danger" type ="submit" onClick={()=>handleDeregister(username)}> Deregister </Button> 
            </>
        )
}