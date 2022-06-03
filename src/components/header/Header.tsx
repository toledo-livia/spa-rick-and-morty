import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './style.scss';

export default function Header(): JSX.Element {
    return (
        <header className="header">
            <div className="container_title_logo">
                <Link to="/">
                    <img src={logo} alt="rick-and-morty-logo" />
                </Link>
            </div>
        </header>
    );
}
