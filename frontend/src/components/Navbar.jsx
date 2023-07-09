import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { parseAddress } from "../utils/parseAddress";
import { useSetAccount } from "../hooks";
import { useSelector } from "react-redux";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, metamask } from "../assets";

const Navbar = () => {
  const connectAccount = useSetAccount();
  const account = useSelector((state) => state.accounts.account);
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading,setLoading] = useState(false);
  
  return (
    <nav
      className={`
       ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary
      `}
    >
      <div className="flex items-center max-w-7xl mx-auto justify-between w-full">
        
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} className="flex w-18 h-12 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            BGO Coin &nbsp;
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              
              <Link
                to={`${link.id}`}
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li>
          <button className='bg-tertiary   rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
        onClick={() => connectAccount()}
        >
          
          {account ? parseAddress(account) : "Connect Wallet" }
        </button>
          </li>
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl `}
          >
            
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  }font-poppins font-medium cursor-pointer text-[16px] `}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;