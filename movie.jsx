import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './style.css'
const Movie = () => {
    //Handling User Search
    const [search,setSearch] = useState('Avenger')
    //storing the movie Data
    const [data, setData] = useState([])

    // Fetching Latest movies using useEffect
    useEffect (() => {
       fetchLatest() 
    },[])
    const fetchLatest = async () => {
        const fetchMovie = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=68c38ff`)
        const fetchData = await fetchMovie.json()
        console.log(fetchData.Search)
        setData(fetchData.Search)

    }
  return (
<>
<div className='header'>
    <div className='logo'>
        <h3>View<span>Land</span></h3>
    </div>
    <div className='search'>
        <input type="text" placeholder='search...' value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={fetchLatest}><FaSearch /></button>

    </div>
</div>
<div className='movies'>
    <h3>Movies</h3>
    <div className='container'>
{
    data.map((curFlm) => {
      return (
        <>
        <div className='box'>
            <div className='img_box'>
<img src={curFlm.Poster !== 'N/A' ? curFlm.Poster : 'http://via.placeholder.com/400'} alt={curFlm.Title} />
            </div>
            <div className='detail'>
                <h3>{curFlm.Title}</h3>
                <h4>Release date:- {curFlm.Year}</h4>

            </div>

        </div>
        </>
      )  
    })
}
    </div>
</div>
</>  )
}

export default Movie