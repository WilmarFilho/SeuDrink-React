import React from 'react';
import Header from './header';
import Footer from './footer';
import './style.css';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>

            <Header></Header>

            <main>
                <Outlet /> {/* Aqui as páginas serão renderizadas */}
            </main>

            <Footer></Footer>

        </div>
    );
};

