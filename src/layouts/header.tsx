import logo from './assets/logoimg.webp'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();


    const retornaHome = () => {
        navigate("/pesquisa");
    }


    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            if (location.pathname === '/resultado') {
                header.style.backgroundColor = '#070707';
            }
        }

    }, [location]);

    return (
        <header className="d-flex">

            <div className="col-4 content-Logo">
                <a href='https://seudrink.framer.website'><img alt='logo do site com a escrita SeuDrink e uma imagem ilustrativa de um drink' src={logo} /></a>
            </div>

            <div className="col-8 content-NavHeader ">
                {location.pathname === '/resultado' ? (
                    <button onClick={retornaHome}>Voltar</button>
                ) : null}
            </div>

        </header>
    )
};