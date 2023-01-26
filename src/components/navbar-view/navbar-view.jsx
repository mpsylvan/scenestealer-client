import React from "react";
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUser} from "../../redux/reducers/users/user";
import { setToken } from "../../redux/reducers/users/token";

export const NavigationBar = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    SceneStealer Database
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id = "basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <> 
                                <Nav.Link as={Link} to ="/login">login</Nav.Link>
                                <Nav.Link as={Link} to="/signup"> signup </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/"> Home</Nav.Link>
                                <Nav.Link as ={Link} to ="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} onClick={()=>dispatch(setUser(null), setToken(null), localStorage.clear())} > Logout </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>    
    )
    
}
// return (
//     <Navbar bg="light" expand="lg">
//         <Container>
//             <Navbar.Brand as={Link} to="/">SceneStealer Database</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav"/>
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="me-auto">
//                     {!user && (
//                         <>
//                             <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                             <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
//                             <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
//                         </>
//                     )} 
//                     {user && (
//                         <>
//                             <Nav.Link as={Link} to="/">Homepage</Nav.Link>
//                             <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
//                         </>
//                     )}
//                 </Nav>
//             </Navbar.Collapse>
//         </Container>
//     </Navbar>
// )