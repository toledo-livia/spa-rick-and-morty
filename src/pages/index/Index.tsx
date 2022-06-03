import SearchIcon from '@mui/icons-material/Search';
import {
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Character from '../../components/characterCard/Character';
import Favorites from '../../components/favorites/Favorites';
import Header from '../../components/header/Header';
import IsLoading from '../../components/isLoading/IsLoading';
import api from '../../utils/api';
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

interface IInfo {
    count: string;
    page: string;
    next: string;
    prev: string;
}

export default function Index(): JSX.Element {
    const [characters, setCharacters] = useState<Array<ICharacters>>([]);
    const [info, setInfo] = useState<IInfo>({
        count: '',
        prev: '',
        next: '',
        page: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [characterName, setCharacterName] = useState('');
    const [filterParam, setFilterParam] = useState('');

    const getData = async (url: string | undefined) => {
        try {
            if (typeof url === 'string') {
                setIsLoading(false);
                const response = await api.get<IData>(url);
                const { data } = response;
                setCharacters(data.results);
                setInfo(data.info);
                setIsLoading(true);
            }
        } catch (e) {
            let errorMessage = 'Failed to do something exceptional';
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            toast.error(errorMessage);
            setIsLoading(true);
        }
    };

    const filter = (event: SelectChangeEvent) => {
        setFilterParam(event.target.value);
        getData(`/character/?species=${event.target.value}`);
    };

    useEffect(() => {
        getData('/character/?page=1');
    }, []);

    if (!isLoading) {
        return <IsLoading msg="Loading..." />;
    }

    return (
        <div className="container">
            <Header />
            <div className="section-busca">
                <form className="form">
                    <Paper className="paper" sx={{ p: '2px 4px' }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search character"
                            inputProps={{ 'aria-label': 'search character' }}
                            onChange={(e) => setCharacterName(e.target.value)}
                        />
                        <IconButton
                            type="submit"
                            sx={{ p: '10px' }}
                            aria-label="search"
                            onClick={() =>
                                getData(`/character/?name=${characterName}`)
                            }
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </form>
                <FormControl className="form-control">
                    <InputLabel id="demo-simple-select-label">
                        Search by
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterParam}
                        label="Search by"
                        onChange={filter}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="human">Humans</MenuItem>
                        <MenuItem value="alien">Aliens</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Favorites />
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
            <div className="control-buttons">
                <button
                    type="button"
                    onClick={() => getData(info?.prev)}
                    disabled={!info.prev}
                >
                    Prev
                </button>
                <button
                    type="button"
                    onClick={() => getData(info?.next)}
                    disabled={!info.next}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
