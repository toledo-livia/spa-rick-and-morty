import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import Character from '../characterCard/Character';
import './style.scss';

interface ICharacters {
    id: number;
    name: string;
    status: string;
    type: string;
    gender: string;
    image: string;
    species: string;
    location: {
        name: string;
    };
    episode: Array<string>;
}

export default function Favorites(): JSX.Element {
    const [charactersFavorite, setCharactersFavorite] = useState<
        Array<ICharacters>
    >([]);
    const getFavorites = async () => {
        let myFavorites = [];
        myFavorites = (localStorage.getItem('favorites_list') || '[]').split(
            /\s*,\s*/
        );

        if (myFavorites != null) {
            try {
                myFavorites.forEach(async (item) => {
                    const idItem = item.replace(/[^\w\s]/gi, '');
                    const response = await api.get(`/character/${idItem}`);
                    const { data } = response;
                    setCharactersFavorite((prevCharacter) => [
                        ...prevCharacter,
                        data,
                    ]);
                    console.log(charactersFavorite);
                    // setCharactersFavorite(JSON.parse(favoritesList[2]));
                });
            } catch (e) {
                let errorMessage = 'Failed to do something exceptional';
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                toast.error(errorMessage);
            }
        }
    };

    useLayoutEffect(() => {
        getFavorites();
    }, []);

    return (
        <Accordion className="accordion">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Favorite Characters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <main className="main-wrapper">
                    <ul className="container-cards">
                        <span>{JSON.stringify(charactersFavorite)}</span>
                    </ul>
                </main>
            </AccordionDetails>
        </Accordion>
    );
}
