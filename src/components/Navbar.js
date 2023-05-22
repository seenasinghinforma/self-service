import { useState } from "react";
import './Navbar.css';
import { MenuData } from "./MenuData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Navbar = ()=>{
    const [active,setActive] = useState();
    console.log(active)

    return (
        <div>
        <nav className="navbarItems">
            <h4 className="navbarLogo"></h4>
            <ul>
                {MenuData.map((item, index) => {
                    if (active===index) {
                        return (
                            <li key={index}>
                                <a href={item.path} onClick={()=> setActive(index)} className="active">
                                    {item.title}
                                </a>
                            </li>
                        )
                    }
                    else
                        return (
                            <li key={index}>
                                <a href={item.path} onClick={()=>setActive(index)}>
                                    {item.title}
                                </a>
                            </li>
                        )
                })}

<li>  <FontAwesomeIcon icon={faUser} className="image"/> </li>
            </ul> 
        </nav>
        </div>
    )
}