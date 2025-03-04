import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdOutgoingMail } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";

const NavBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      path: "/Show",
      name: "Pagina Principal",
      icon: <FaHome />
    },
    {
      path: "https://mail.google.com/mail/u/0/#inbox?authuser=tombsiteapp@gmail.comhttps://accounts.google.com/signin/v2/identifier?continue=https://mail.google.com/mail/&scc=1&service=mail&ltmpl=default&hl=en&email=tombsiteapp@gmail.com",
      name: "Ir a Gmail",
      icon: <MdOutgoingMail />,
      target: "_blank",
      rel: "noopener noreferrer"
    },
    {
      path: "/Create",
      name: "Añadir Registro",
      icon: <IoMdPersonAdd />
    },
    {
      path: "/",
      name: "Cerrar Sesión",
      icon: <FaSignOutAlt />
    }
  ]
  return (
    <div className='container'>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='top_section'>
          <header className='header'>TOMBSITE </header>
         
          <div className='bars'>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItems.map((item, index) => (
            item.path.startsWith('http') ? (
              <a href={item.path} target="_blank" rel="noopener noreferrer" key={index} className="link">
                <div className='icon'>{item.icon}</div>
                <div style={{ display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
              </a>
            ) : (
              <NavLink to={item.path} key={index} className="link" activeClassName="active">
                <div className='icon'>{item.icon}</div>
                <div style={{ display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
              </NavLink>
            )
          ))
        }
      </div>
      <main>
        {children}
      </main>
    </div>
  );
};
export default NavBar;