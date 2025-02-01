// FavoriteMovie.jsx
import React, { useState, useEffect } from 'react';
import './style.css'

const FavoriteMovie = () => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const addToFavorites = (movie) => {
        setFavorites((prevFavorites) => {
            const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);
            if (!isAlreadyFavorite) {
                return [...prevFavorites, movie];
            }
            return prevFavorites;
        });
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleAddFavorite = () => {
        const movie = { id: 4, title: 'New Favorite Movie' }; // Replace with actual movie selection logic
        addToFavorites(movie);
        alert(`${movie.title} added to favorites!`);
    };

    return (
        <div className="favorite-movies">
            <h2>Favorite Movies</h2>
            <button className="add-favorite-button" onClick={handleAddFavorite}>
                Add a Favorite Movie
            </button>
            {favorites.length === 0 ? (
                <p>No favorite movies added yet.</p>
            ) : (
                favorites.map(fav => (
                    <div key={fav.id} className="favorite-movie">
                        <h3>{fav.title}</h3>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoriteMovie;