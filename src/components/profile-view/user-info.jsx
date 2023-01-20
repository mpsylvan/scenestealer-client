import React from 'react';
import {Card, Button} from 'react-bootstrap';


export const UserInfo = ({email, username, handleDeregister}) =>{
    return(
            <>
                <h4> Username: {username}</h4>   
                <h4> Email: {email}</h4>
                <Button variant = "danger" type ="submit" onClick={()=>handleDeregister(username)}> Deregister </Button> 
            </>
        )
}