// UpcomingBody.js
import React, { useState, useEffect, useRef } from 'react';
import './UpcomingBody.css';

export default function Upcoming() {
  const [movies, setMovies]       = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [cardShift, setCardShift]     = useState(0);
  const trackRef                    = useRef(null);

  
  const endBuffer = 3;

  useEffect(() => {
    fetch('http://localhost:8000/get-movies')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          const up = data.movies.filter(m => +m.upcoming === 1);
          setMovies(up);
          setActiveIndex(0);
          setScrollIndex(0);
        }
      })
      .catch(console.error);
  }, []);

  
  useEffect(() => {
    if (!trackRef.current || !movies.length) return;
    const card = trackRef.current.querySelector('.movieCard');
    const style = getComputedStyle(trackRef.current);
    const gap   = parseInt(style.gap, 10) || 0;
    setCardShift(card.offsetWidth + gap);
  }, [movies]);

  
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform =
        `translateX(-${scrollIndex * cardShift}px)`;
    }
  }, [scrollIndex, cardShift]);

  const maxScroll = Math.max(0, movies.length - (endBuffer + 1));

  const prev = () => {
    setActiveIndex(i => Math.max(i - 1, 0));
    setScrollIndex(s => Math.max(s - 1, 0));
  };
  const next = () => {
    setActiveIndex(i => Math.min(i + 1, movies.length - 1));
    setScrollIndex(s => Math.min(s + 1, maxScroll));
  };

  if (!movies.length) {
    return (
      <p style={{ color:'#fff', textAlign:'center', marginTop:50 }}>
        Loading upcoming movies…
      </p>
    );
  }

  return (
    <div className="upcomingPage">
      <div className="upcomingMoviesCont">
        <div
          className="carousel-bg1"
          style={{ backgroundImage: `url(/${movies[activeIndex].img})` }}
        />
        <button
          className="nav prev"
          onClick={prev}
          disabled={activeIndex === 0}
        >‹</button>
        <button
          className="nav next"
          onClick={next}
          disabled={activeIndex === movies.length - 1}
        >›</button>
      </div>

      <div className="carousel">
        <div className="slider-track" ref={trackRef}>
          {movies.map((m, i) => (
            <div
              key={i}
              className={`movieCard${i === activeIndex ? ' active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={`/${m.img}`} alt={m.title} className="movieImage"/>
              <h2>{m.title}</h2>
              {m.showtimes?.[0]?.date && (
                <p className="releaseDate">
                  Release Date: {m.showtimes[0].date}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
