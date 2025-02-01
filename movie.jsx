import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './style.css';

const Movie = () => {
    // Handling User Search
    const [search, setSearch] = useState('Avenger');
    // Storing the movie Data
    const [data, setData] = useState([]);

    // Fetching Latest movies using useEffect
    useEffect(() => {
        fetchLatest();
    }, []);

    const fetchLatest = async () => {
        const fetchMovie = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=68c38ff`);
        const fetchData = await fetchMovie.json();
        console.log(fetchData.Search);
        setData(fetchData.Search || []); // Ensure data is an array
    };

    const addToFavorites = (movie) => {
        const savedFavorites = localStorage.getItem('favorites');
        const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

        const isAlreadyFavorite = favorites.some(fav => fav.id === movie.imdbID);
        if (!isAlreadyFavorite) {
            favorites.push({ id: movie.imdbID, title: movie.Title });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${movie.Title} added to favorites!`);
        } else {
            alert(`${movie.Title} is already in favorites.`);
        }
    };

    return (
        <>
            <div className='header'>
                <div className='logo'>
                    <h3>View<span>Land</span></h3>
                </div>
                <div className='search'>
                    <input 
                        type="text" 
                        placeholder='search...' 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button onClick={fetchLatest}><FaSearch /></button>
                </div>
            </div>
            <div className='movies'>
                <h3>Movies</h3>
                <div className='container'>
                    {data.map((curFlm) => {
                        return (
                            <div className='box' key={curFlm.imdbID}>
                                <div className='img_box'>
                                    <img 
                                        src={curFlm.Poster !== 'N/A' ? curFlm.Poster : 'http://via.placeholder.com/400'} 
                                        alt={curFlm.Title} 
                                    />
                                </div>
                                <div className='detail'>
                                    <h3>{curFlm.Title}</h3>
                                    <h4>Release date: {curFlm.Year}</h4>
                                    <button onClick={() => addToFavorites(curFlm)}>Add to Favorites</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Movie;
