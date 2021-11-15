import { Link } from "react-router-dom";
import React from "react";
 const Navbar =({icon, title}) =>{

   

        return (
            <nav className ='navbar bg-primary'>
                <h1>
                    <i className ={icon}/>  {title}
                    </h1>
                    <ul>
                        <li> <Link to = '/'> Home</Link>
                        </li>
                        <li> <Link to = '/about'> About</Link>
                        </li>
                    </ul>
                   
                </nav>
        )
    }
    Navbar.defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
      };

export default Navbar
