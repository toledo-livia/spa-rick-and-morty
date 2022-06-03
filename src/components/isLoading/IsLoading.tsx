import React from 'react';
import './style.scss';

interface IIsLoadind {
    msg: string;
}

export default function IsLoading({ msg }: IIsLoadind): JSX.Element {
    return (
        <div className="loading-container">
            <h1>{msg}</h1>
        </div>
    );
}
