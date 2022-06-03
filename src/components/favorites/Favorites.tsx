import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import Character from '../characterCard/Character';
import './style.scss';

interface IData {
    info: {
        count: string;
        page: string;
        next: string;
        prev: string;
    };
    results: Array<{
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
    }>;
}

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
    const [characters, setCharacters] = useState<Array<ICharacters>>([]);
    const favoritesList = useState<Array<ICharacters>>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFavorites = async () => {
        let myFavorites = [];
        myFavorites = (localStorage.getItem('favorites_list') || '[]').split(
            /\s*,\s*/
        );
        myFavorites.forEach(async (item) => {
            try {
                setIsLoading(false);
                const nameCharacter = item.replace(/[^\w\s]/gi, '');
                const response = await api.get<IData>(
                    `/character/?name=${nameCharacter}`
                );
                const { data } = response;
                // setCharacters(data.results);
                setCharacters(characters.concat(data.results));
                setIsLoading(true);
                console.log(characters);
            } catch (e) {
                let errorMessage = 'Failed to do something exceptional';
                if (e instanceof Error) {
                    errorMessage = e.message;
                }
                toast.error(errorMessage);
                setIsLoading(true);
            }
        });
    };

    useEffect(() => {
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
                        {characters.map((character) => (
                            <Character
                                id={character.id}
                                name={character.name}
                                gender={character.gender}
                                species={character.species}
                                status={character.status}
                                type={character.type}
                                image={character.image}
                                location={character.location}
                                episode={character.episode}
                            />
                        ))}
                    </ul>
                </main>
            </AccordionDetails>
        </Accordion>
    );
}
