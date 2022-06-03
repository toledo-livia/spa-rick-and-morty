import CircleIcon from '@mui/icons-material/Circle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import React from 'react';
import useCollapse from 'react-collapsed';
import './style.scss';

interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    location: {
        name: string;
    };
    episode: Array<string>;
}

export default function Character({
    id,
    name,
    status,
    species,
    gender,
    image,
    location,
    episode,
}: ICharacter): JSX.Element {
    const { getCollapseProps, getToggleProps } = useCollapse();

    const favorite = (idCharacter: number) => {
        const list = JSON.parse(localStorage.getItem('favorites_list') || '[]');

        list.push(idCharacter);
        localStorage.setItem('favorites_list', JSON.stringify(list));
    };

    return (
        <li className="card" key={id}>
            <div
                className="character-photo"
                style={{ backgroundImage: `url(${image})` }}
                {...getToggleProps()}
            >
                <Button
                    variant="contained"
                    endIcon={<StarBorderIcon />}
                    className="button"
                    onClick={() => favorite(id)}
                >
                    Favorite
                </Button>
            </div>
            <div className="informations-character">
                <h1 {...getToggleProps()} className="title">
                    {name}
                </h1>
                <p className="status">
                    <CircleIcon
                        className="circle-icon"
                        style={
                            status === 'Alive'
                                ? { color: 'green' }
                                : { color: 'red' }
                        }
                    />
                    {status} - {species}
                </p>
                <p className="subtitle">Gender:</p>
                <p className="content">{gender}</p>
                <section {...getCollapseProps()}>
                    <p className="subtitle">Last known location:</p>
                    <p className="content">{location.name}</p>
                    <p className="subtitle">Number of episodes:</p>
                    <p className="content">{episode.length}</p>
                </section>
            </div>
        </li>
    );
}
