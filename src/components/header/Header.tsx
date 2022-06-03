import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';
import { HeaderWrapper } from './style';

interface IHeaderProperty {
    title: string;
}

export default function Header(): JSX.Element {
    return (
        <HeaderWrapper>
            <div className="container_title_logo">
                <Link to="/">
                    <img src={logo} alt="rick and morty logo" />
                </Link>
            </div>
        </HeaderWrapper>
    );
}
