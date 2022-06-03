import CircleIcon from '@mui/icons-material/Circle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import React from 'react';
import useCollapse from 'react-collapsed';
import { Link } from 'react-router-dom';

import { Card } from './style';

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
    type,
    gender,
    image,
    location,
    episode,
}: ICharacter): JSX.Element {
    const { getCollapseProps, getToggleProps } = useCollapse();

    const favorite = (nameCharacter: string) => {
        const list = JSON.parse(localStorage.getItem('favorites_list') || '[]');

        list.push(nameCharacter);
        localStorage.setItem('favorites_list', JSON.stringify(list));
    };

    return (
        <Card key={id}>
            <div className="character_photo">
                <div
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '20px',
                        height: '100%',
                        width: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                    {...getToggleProps()}
                >
                    <Button
                        variant="contained"
                        endIcon={<StarBorderIcon />}
                        style={{ marginBottom: '20px' }}
                        onClick={(e) => favorite(name)}
                    >
                        Favorite
                    </Button>
                </div>
            </div>
            <div className="informations_character">
                <h1 {...getToggleProps()} style={{ cursor: 'pointer' }}>
                    {name}
                </h1>
                <p
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <CircleIcon
                        style={{
                            width: '15px',
                            height: '15px',
                            marginRight: '5px',
                            color: 'red',
                        }}
                    />
                    {status} - {species}
                </p>
                <p
                    style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'rgb(158, 158, 158)',
                        margin: 0,
                    }}
                >
                    Gender:
                </p>
                <p style={{ margin: 0 }}>{gender}</p>
                <section {...getCollapseProps()}>
                    <p
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'rgb(158, 158, 158)',
                            margin: 0,
                        }}
                    >
                        Last known location:
                    </p>
                    <p style={{ margin: 0 }}>{location.name}</p>
                    <p
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'rgb(158, 158, 158)',
                            margin: 0,
                        }}
                    >
                        Number of episodes:
                    </p>
                    <p style={{ margin: 0 }}>{episode.length}</p>
                </section>
            </div>
        </Card>
    );
}
